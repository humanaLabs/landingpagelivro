// src/app/api/lead/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Garanta runtime Node (Nodemailer não roda no Edge)
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { nome, email, telefone } = await request.json();

    // validação básica
    if (!nome || !email || !telefone) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // transporter via env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,                 // ex: "smtp.gmail.com" ou do seu provedor
      port: Number(process.env.SMTP_PORT || 587),  // 465 = secure true
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,               // usuário/conta
        pass: process.env.SMTP_PASS,               // senha / app password
      },
    });

    // opcional: verificar conexão/credenciais
    // await transporter.verify();

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; border-bottom: 1px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">Economia guiada por IA</h1>
          <p style="color: #ccc; margin: 5px 0 0 0;">Novo lead interessado no livro</p>
        </div>
        <div style="background-color: #111; padding: 25px; border-radius: 8px; border: 1px solid #333;">
          <h2 style="color: #fff; margin-top: 0; font-size: 18px; border-bottom: 1px solid #333; padding-bottom: 10px;">
            📋 Dados do Interessado
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>👤 Nome:</strong> <span style="color: #ccc;">${nome}</span></p>
            <p style="margin: 10px 0;"><strong>📧 E-mail:</strong> <span style="color: #ccc;">${email}</span></p>
            <p style="margin: 10px 0;"><strong>📱 Telefone:</strong> <span style="color: #ccc;">${telefone}</span></p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #888; font-size: 12px; margin: 5px 0;">📅 <strong>Data:</strong> ${new Date().toLocaleString("pt-BR")}</p>
            <p style="color: #888; font-size: 12px; margin: 5px 0;">🌐 <strong>Origem:</strong> Página "Quero meu exemplar"</p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px;">
            Este e-mail foi gerado automaticamente pelo sistema de captação de leads.<br>
            Para responder ao interessado, use: <strong style="color: #fff;">${email}</strong>
          </p>
        </div>
      </div>
    `;

    const text = `
Novo interesse no livro "Economia guiada por IA"

Dados do interessado:
Nome: ${nome}
E-mail: ${email}
Telefone: ${telefone}

Data: ${new Date().toLocaleString("pt-BR")}
Origem: Página "Quero meu exemplar"
    `.trim();

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER, // remetente (deve ser do seu domínio/conta SMTP)
      to: "matheus.rodrigues@humana.ai",                               // <- DESTINO fixo
      replyTo: email,                                        // responder direto para o lead
      subject: '📚 Novo interesse no livro "Economia guiada por IA"',
      html,
      text,
    });

    // opcional: log id
    console.log("Email sent:", info.messageId);

    return NextResponse.json({ message: "Enviado com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao processar solicitação:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
