"use client";

export default function TestFontsPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl mb-8 text-black">Teste de Fontes - Landing Page</h1>
      
      <div className="space-y-8">
        {/* Teste do título mega */}
        <div className="border p-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Título Mega (122px)</h2>
          <div className="text-design-mega text-black" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: "122px", fontWeight: "600", lineHeight: "61px" }}>ECONOMIA GUIADA POR IA</div>
          <p className="text-sm text-gray-600 mt-2">Deve ser: Poppins, 122px, font-weight 600</p>
        </div>

        {/* Teste do título principal */}
        <div className="border p-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Título Principal (55px)</h2>
          <div className="text-design-title text-black" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: "55px", fontWeight: "600", lineHeight: "61px" }}>O futuro da economia é cognitivo</div>
          <p className="text-sm text-gray-600 mt-2">Deve ser: Poppins, 55px, font-weight 600</p>
        </div>

        {/* Teste do subtítulo */}
        <div className="border p-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Subtítulo (26px)</h2>
          <div className="text-design-subtitle text-black" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: "26px", fontWeight: "600", lineHeight: "138%" }}>Perguntas Frequentes</div>
          <p className="text-sm text-gray-600 mt-2">Deve ser: Poppins, 26px, font-weight 600</p>
        </div>

        {/* Teste do texto corpo */}
        <div className="border p-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Texto Corpo (22px)</h2>
          <div className="text-design-body text-black" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: "22px", fontWeight: "400", lineHeight: "138%" }}>
            Descubra como a inteligência artificial está mudando a lógica do valor, 
            do trabalho e da tomada de decisões nas empresas.
          </div>
          <p className="text-sm text-gray-600 mt-2">Deve ser: Poppins, 22px, font-weight 400</p>
        </div>

        {/* Teste do botão */}
        <div className="border p-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Texto Botão (19px)</h2>
          <div className="text-design-button text-black" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: "19px", fontWeight: "600", lineHeight: "28px" }}>Quero meu exemplar</div>
          <p className="text-sm text-gray-600 mt-2">Deve ser: Poppins, 19px, font-weight 600</p>
        </div>

        {/* Informações sobre fontes carregadas */}
        <div className="border p-4 bg-blue-50">
          <h2 className="text-lg font-bold mb-2">Informações de Debug</h2>
          <p className="text-sm">Abra o DevTools do navegador e verifique:</p>
          <ul className="text-sm list-disc ml-4">
            <li>Se a fonte Poppins está carregada na aba Network</li>
            <li>Se as classes CSS estão sendo aplicadas corretamente</li>
            <li>Se há algum erro no console</li>
          </ul>
        </div>
      </div>
    </div>
  );
}