// lib/i18n.ts
import React, { useState, useEffect } from 'react';

interface Translations {
  [key: string]: any;
}

interface I18nConfig {
  defaultLocale: string;
  locales: string[];
  translations: Record<string, Translations>;
}

class I18n {
  private config: I18nConfig;
  private currentLocale: string;
  private listeners: Set<() => void> = new Set();
  private isClient: boolean = false;
  private isHydrated: boolean = false;

  constructor(config: I18nConfig) {
    this.config = config;
    this.currentLocale = this.config.defaultLocale;
    
    if (typeof window !== 'undefined') {
      this.isClient = true;
    }
  }

  // ✅ Método para hidratar APENAS uma vez, após o componente montar
  hydrate() {
    if (this.isHydrated || !this.isClient) {
      return;
    }
    
    const detectedLocale = this.detectLocale();
    if (detectedLocale !== this.currentLocale) {
      this.currentLocale = detectedLocale;
      this.isHydrated = true;
      this.notifyListeners();
    } else {
      this.isHydrated = true;
    }
  }

  private detectLocale(): string {
    if (!this.isClient) {
      return this.config.defaultLocale;
    }
    
    // Tentar pegar do localStorage primeiro
    try {
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale && this.config.locales.includes(savedLocale)) {
        return savedLocale;
      }
    } catch (e) {
      // Ignorar erros de localStorage
    }

    // Tentar detectar do navegador
    try {
      if (navigator && navigator.language) {
        const browserLocale = navigator.language.split('-')[0];
        if (this.config.locales.includes(browserLocale)) {
          return browserLocale;
        }
      }
    } catch (e) {
      // Ignorar erros de navegador
    }

    return this.config.defaultLocale;
  }

  setLocale(locale: string) {
    if (this.config.locales.includes(locale)) {
      console.log('🔄 Changing locale from', this.currentLocale, 'to', locale);
      this.currentLocale = locale;
      
      // Salvar no localStorage de forma segura
      if (this.isClient) {
        try {
          localStorage.setItem('locale', locale);
          console.log('💾 Saved locale to localStorage:', locale);
        } catch (e) {
          console.error('❌ Error saving to localStorage:', e);
        }
      }
      
      this.notifyListeners();
    } else {
      console.warn('⚠️ Invalid locale:', locale);
    }
  }

  getLocale(): string {
    return this.currentLocale;
  }

  t(key: string, variables?: Record<string, string | number>): any {
    const translation = this.getNestedValue(this.config.translations[this.currentLocale], key);
    
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in locale: ${this.currentLocale}`);
      return key;
    }

    if (typeof translation === 'string') {
      return this.interpolate(translation, variables);
    }

    if (Array.isArray(translation)) {
      return translation;
    }

    return translation;
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private interpolate(text: string, variables?: Record<string, string | number>): string {
    if (!variables) return text;

    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key]?.toString() || match;
    });
  }

  subscribe(callback: () => void) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners() {
    console.log('🔔 Notifying', this.listeners.size, 'listeners');
    this.listeners.forEach(callback => callback());
  }

  // ✅ Método para verificar se já foi hidratado
  getIsHydrated(): boolean {
    return this.isHydrated;
  }
}

// Traduções (mantidas iguais)
const translations: Record<string, Translations> = {
  pt: {
    common: {
      loading: "Carregando...",
      error: "Erro",
      success: "Sucesso",
      cancel: "Cancelar",
      confirm: "Confirmar",
      save: "Salvar",
      edit: "Editar",
      delete: "Excluir",
      back: "Voltar",
      next: "Próximo",
      previous: "Anterior",
      close: "Fechar"
    },
    navigation: {
      home: "Início",
      about: "Sobre",
      services: "Serviços",
      contact: "Contato",
      blog: "Blog"
    },
      hero: {
        titleLine1: "Descubra como a",
        titleLine2: "inteligência artificial está",
        titleLine3: "transformando a economia",
        titleLine4: " e mudando as regras",
        titleLine5: "dos negócios.",
        cta: "Quero meu exemplar"
      },
    features: {
      aiTitleLine1: "A inteligência artificial não está",
      aiTitleLine2: "apenas otimizando processos.",
      aiTitleLine3: "Ela está redefinindo o que é valor.",
      bookDescriptionLine1: "\"Economia Guiada por IA\", de Eduardo Ibrahim, apresenta uma visão",
      bookDescriptionLine2: "estratégica e realista sobre como a IA está transformando a estrutura",
      bookDescriptionLine3: "das organizações e da economia global.",
      aboutBook: "Sobre o livro",
      bookContent1: "Ao invés de automatizar o passado, as empresas precisam cocriar o futuro. Essa é a proposta do livro: repensar os indicadores, os papéis humanos, a governança e as decisões a partir de uma inteligência combinada — onde humanos e algoritmos agem juntos.",
      bookContent2: "A obra propõe novos indicadores como o Produto Interno Cognitivo (PIC) e o Valor Cognitivo Combinado (Vᶜᶜ) para medir o impacto real da inteligência nas organizações. Também apresenta ferramentas como engenharia reversa de funções, reskilling estratégico e cérebros organizacionais, que ajudam líderes e equipes a navegar essa transição com consciência, ética e inovação.",
      benefitsTitle: "Benefícios",
      benefits: [
        "Compreenda a nova lógica da economia cognitiva",
        "Conheça os conceitos inéditos de PIC e Vᶜᶜ",
        "Aprenda a tomar decisões com IA de forma ética e estratégica",
        "Prepare sua equipe para o futuro do trabalho",
        "Transforme sua empresa em uma organização cognitiva"
      ],
      futureTitle: "Quer um vislumbre do futuro?",
      futureDescription: "Baixe agora um trecho exclusivo do livro e descubra como a inteligência artificial está redefinindo os fundamentos da economia, da liderança e das decisões estratégicas nas empresas. Prepare-se para entrar no jogo sob uma nova lente.",
      freePreview: "Acessar prévia gratuita"
    },
    author: {
      name: "Eduardo Ibrahim",
      aboutAuthor: "Sobre o autor",
      bio1: "Eduardo Ibrahim é uma das maiores referências em tecnologia e futuro. Fundador e CEO da Humana AI, Professor da Singularity University e autor do best-seller Economia Exponencial, Ibrahim é um dos pioneiros na aplicação da IA no contexto estratégico de negócios.",
      bio2: "Com trajetória que passa pelo campus da NASA no Vale do Silício, TEDx e programas de beta-tester da OpenAI, Ibrahim combina visão prática e pensamento disruptivo. Como palestrante internacional é voz ativa em grandes organizações, onde traduz o complexo em linguagem acessível.",
      bio3: "Neste novo livro, ele propõe uma visão transformadora: a IA guiando a economia não para nos substituir, mas para ampliar o que temos de mais humano. Uma leitura provocadora e essencial para líderes, inovadores e todos que desejam prosperar na nova era da IA.",
      bookTitle: "ECONOMIA GUIADA POR IA",
        testimonials: [
          {
            text: "\"Ibrahim entrega, neste livro, muito mais do que uma visão sobre inteligência artificial: ele nos oferece uma nova gramática para entender valor, talento e decisão em um mundo que pensa com máquinas. Essa é uma leitura essencial para líderes que não querem reconstruir suas organizações com base em IA. O que ele propõe aqui não é futurismo. É um manual poderoso para o presente.\"",
            author: "GARY BOLLES",
          },
          {
            text: "\"Ibrahim não está apenas acompanhando a revolução da IA — ele está conduzindo a conversa. Este livro redefine o que significa liderar em um mundo cognitivo, onde máquinas e humanos pensam juntos. A clareza com que ele conecta estratégia, talento e valor é rara. Uma leitura que muda não só a cabeça, mas o rumo dos negócios.\"",
            author: "RICARDO ALEM",
          },
          {
            text: "\"Cada capítulo deste livro revela o que muitos ainda não enxergaram: a inteligência artificial já está moldando o presente, e ignorá-la é um risco estratégico. Ibrahim oferece uma nova linguagem para os líderes que querem ser protagonistas da transformação — e não apenas espectadores dela.\"",
            author: "CRISTIANO SOUZA",
          },
          {
            text: "\"Ler este livro é como ajustar sua lente mental para uma realidade já moldada pela inteligência artificial. Ibrahim não apenas explica o que está acontecendo — ele nos prepara para participar disso. Seu conceito de 'inteligência combinada' não é apenas uma teoria, é um chamado à ação para líderes e criativos. Se você ainda está se perguntando se a IA é importante, está fazendo a pergunta errada.\"",
            author: "ISABELA VANZIN",
          },
          {
            text: "\"Este livro é como uma aula magna sobre o agora. Ibrahim não está prevendo o futuro — ele está nomeando o que já começou. A forma como ele articula o papel da IA nas organizações, nos talentos e na criação de valor transforma nossa percepção de presente. Uma leitura obrigatória para quem quer pensar com profundidade, estratégia e humanidade.\"",
            author: "ANANDA ZOUAIN",
          },
          {
            text: "\"Este livro me deu a sensação de estar acessando o código-fonte do presente. Ibrahim traduz a complexidade da IA com lucidez e, ao mesmo tempo, profundidade. Um convite para repensar como organizamos o trabalho, desenvolvemos pessoas e criamos valor real.\"",
            author: "PAOLLA MELLO",
          },
          {
            text: "\"‘Economia Guiada por IA’ é mais do que um livro — é um mapa para quem precisa navegar um mundo onde decisões são cada vez mais cognitivas. Ibrahim mostra que a inteligência artificial, quando bem aplicada, não substitui o humano — ela o amplia. Estratégico, provocador e atual.\"",
            author: "JOÃO PEDRO MORENO",
          }
        ],
        showMore: "Mostrar mais",
        showLess: "Mostrar menos"
      },
    faq: {
      title: "Perguntas Frequentes",
      questions: [
        {
          question: "Para quem é o livro?",
          answer: "Para profissionais, líderes, empreendedores e estudantes interessados no impacto real da inteligência artificial na economia, nos negócios e na humanidade."
        },
        {
          question: "Preciso saber de programação ou IA para entender o conteúdo?",
          answer: "Não. O livro foi escrito com uma linguagem acessível, mas com profundidade técnica e estratégica para quem quer liderar com consciência."
        },
        {
          question: "Vai ter versão digital?",
          answer: "Sim! O livro estará disponível em e-book e versão física."
        },
        {
          question: "Posso comprar para minha equipe?",
          answer: "Sim! Temos condições especiais para compras corporativas. Entre em contato via email."
        },
      ]
    },
    form: {
      title: "Quero saber mais",
      subtitle: "Preencha seus dados para receber novidades e um trecho do livro.",
      name: "Nome",
      email: "E-mail",
      phone: "Telefone",
      message: "Mensagem",
      submit: "Enviar",
      sending: "Enviando...",
      success: "Dados enviados com sucesso!",
      error: "Ocorreu um erro. Tente novamente.",
      required: "Campo obrigatório",
      invalidEmail: "E-mail inválido",
      errorName: "Digite pelo menos 3 letras no nome.",
      errorEmail: "Digite um e-mail válido.",
      errorPhone: "Digite um telefone válido (somente números)."
    },
    chat: {
      title: "IBRAHIM RESPONDE",
      placeholder: "Explore o livro com uma IA.",
      userMessage: "Pergunta do usuário.",
      botResponse: "Resposta."
    },
    footer: {
      publisherName: "Editora Alta Books",
      ctaButton: "Quero meu exemplar",
      privacyPolicy: "Política de Privacidade",
      termsOfUse: "Termos de Uso",
      contact: "Contato",
      humanaSiteLabel: "Site da Humana AI:",
      eduardoLabel: "Eduardo Ibrahim",
    }
  },

  en: {
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      back: "Back",
      next: "Next",
      previous: "Previous",
      close: "Close"
    },
    navigation: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
      blog: "Blog"
    },
    hero: {
      titleLine1: "Find out how artificial",
      titleLine2: "intelligence is transforming",
      titleLine3: "the economy and",
      titleLine4: "changing the rules",
      titleLine5: "of business.",
      cta: "Get my copy"
    },
    features: {
      aiTitleLine1: "Artificial intelligence is not just",
      aiTitleLine2: "optimizing processes.",
      aiTitleLine3: "It's redefining what value is.",
      bookDescriptionLine1: "\"AI-Driven Economy\", by Eduardo Ibrahim, presents a strategic",
      bookDescriptionLine2: "and realistic vision of how AI is transforming the structure",
      bookDescriptionLine3: "of organizations and the global economy.",
      aboutBook: "About the book",
      bookContent1: "Instead of automating the past, companies need to co-create the future. This is the book's proposal: rethinking indicators, human roles, governance and decisions based on combined intelligence — where humans and algorithms act together.",
      bookContent2: "The work proposes new indicators such as the Cognitive Domestic Product (CDP) and the Combined Cognitive Value (Vᶜᶜ) to measure the real impact of intelligence in organizations. It also presents tools such as reverse engineering of functions, strategic reskilling and organizational brains, which help leaders and teams navigate this transition with awareness, ethics and innovation.",
      benefitsTitle: "Benefits",
      benefits: [
        "Understand the new logic of the cognitive economy",
        "Learn about the unprecedented concepts of CDP and Vᶜᶜ",
        "Learn to make decisions with AI ethically and strategically",
        "Prepare your team for the future of work",
        "Transform your company into a cognitive organization"
      ],
      futureTitle: "Want a glimpse of the future?",
      futureDescription: "Download now an exclusive excerpt from the book and discover how artificial intelligence is redefining the fundamentals of economics, leadership and strategic decisions in companies. Get ready to enter the game through a new lens.",
      freePreview: "Access free preview"
    },
    author: {
      name: "Eduardo Ibrahim",
      aboutAuthor: "About the author",
      bio1: "Eduardo Ibrahim is one of the greatest references in technology and the future. Founder and CEO of Humana AI, Professor at Singularity University and author of the bestseller Exponential Economy, Ibrahim is one of the pioneers in applying AI in the strategic business context.",
      bio2: "With a trajectory that includes NASA's campus in Silicon Valley, TEDx and OpenAI beta-tester programs, Ibrahim combines practical vision and disruptive thinking. As an international speaker, he is an active voice in large organizations, where he translates the complex into accessible language.",
      bio3: "In this new book, he proposes a transformative vision: AI guiding the economy not to replace us, but to amplify what we have that is most human. A provocative and essential read for leaders, innovators and all who wish to thrive in the new AI era.",
      bookTitle: "AI-DRIVEN ECONOMY",
      quote: "\"Ibrahim delivers, in this book, much more than a vision about artificial intelligence: he offers us a new grammar for understanding value, talent and decision in a world that thinks with machines. This is essential reading for leaders who don't want to rebuild their organizations based on AI. What he proposes here is not futurism. It's a powerful manual for the present.\"",
      quoteAuthor: "— Gary Bolles",
        testimonials: [
          {
            text: "\"In this book, Ibrahim delivers much more than a vision about artificial intelligence: he offers us a new grammar to understand value, talent, and decision-making in a world that thinks with machines. This is essential reading for leaders who don’t want to rebuild their organizations based on AI. What he proposes here is not futurism. It is a powerful manual for the present.\"",
            author: "GARY BOLLES",
          },
          {
            text: "\"Ibrahim is not just following the AI revolution — he's leading the conversation. This book redefines what it means to lead in a cognitive world, where humans and machines think together. The clarity with which he connects strategy, talent, and value is rare. A read that shifts not just your mind, but the direction of business.\"",
            author: "RICARDO ALEM",
          },
          {
            text: "\"Each chapter of this book reveals what many still fail to see: artificial intelligence is already shaping the present, and ignoring it is a strategic risk. Ibrahim offers a new language for leaders who want to be protagonists of transformation — not just spectators.\"",
            author: "CRISTIANO SOUZA",
          },
            {
              text: "\"Reading this book feels like adjusting your mental lens to a reality already shaped by artificial intelligence. Ibrahim doesn’t just explain what's happening — he equips us to participate in it. His concept of ‘intelligence combined’ is not just a theory, it’s a wake-up call for leaders and creatives alike. If you're still asking whether AI matters, you’re asking the wrong question.\"",
              author: "ISABELA VANZIN",
            },
            {
              text: "\"This book is like a masterclass on the ‘now’. Ibrahim is not predicting the future — he is naming what has already begun. The way he articulates the role of AI in organizations, talent, and value creation transforms our perception of the present. A must-read for anyone who wants to think with depth, strategy, and humanity.\"",
              author: "ANANDA ZOUAIN",
            },
            {
              text: "\"This book feels like accessing the source code of the present. Ibrahim translates the complexity of AI with clarity and depth. It’s an invitation to rethink how we organize work, develop people, and create real value.\"",
              author: "PAOLLA MELLO",
            },
            {
              text: "\"‘AI-Driven Economy’ is more than a book — it’s a map for navigating a world where decisions are increasingly cognitive. Ibrahim shows that when properly applied, artificial intelligence doesn’t replace humans — it amplifies them. Strategic, provocative, and timely.",
              author: "JOÃO PEDRO MORENO",
            }
          ],
        showMore: "Show more",
        showLess: "Show less"
      },
    faq: {
      title: "Frequently Asked Questions",
      questions: [
        {
          question: "Who is the book for?",
          answer: "For professionals, leaders, entrepreneurs and students interested in the real impact of artificial intelligence on the economy, business and humanity."
        },
        {
          question: "Do I need to know programming or AI to understand the content?",
          answer: "No. The book was written in accessible language, but with technical and strategic depth for those who want to lead with awareness."
        },
        {
          question: "Will there be a digital version?",
          answer: "Yes! The book will be available in e-book and physical version."
        },
        {
          question: "Can I buy it for my team?",
          answer: "Yes! We have special conditions for corporate purchases. Contact us by email."
        }
      ]
    },
    form: {
      title: "Get more details",
      subtitle: "Fill in your information to receive updates and a sample chapter.",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Submit",
      sending: "Sending...",
      success: "Data sent successfully!",
      error: "Something went wrong. Please try again.",
      required: "Required field",
      invalidEmail: "Invalid email",
      errorName: "Please enter at least 3 letters for the name.",
      errorEmail: "Please enter a valid email.",
      errorPhone: "Please enter a valid phone number (digits only)."
    },
    chat: {
      title: "IBRAHIM ANSWERS",
      placeholder: "Explore the book with AI.",
      userMessage: "User question.",
      botResponse: "Answer."
    },
    footer: {
      publisherName: "Alta Books Publisher",
      ctaButton: "Get my copy",
      privacyPolicy: "Privacy Policy",
      termsOfUse: "Terms of Use",
      contact: "Contact",
      humanaSiteLabel: "Humana AI website:",
      eduardoLabel: "Eduardo Ibrahim",
    }
  },
  
    es: {
      common: {
        loading: "Cargando...",
        error: "Error",
        success: "Éxito",
        cancel: "Cancelar",
        confirm: "Confirmar",
        save: "Guardar",
        edit: "Editar",
        delete: "Eliminar",
        back: "Volver",
        next: "Siguiente",
        previous: "Anterior",
        close: "Cerrar"
      },
      navigation: {
        home: "Inicio",
        about: "Acerca de",
        services: "Servicios",
        contact: "Contacto",
        blog: "Blog"
      },
        // ... other translations remain the same
        hero: {
          titleLine1: "Descubre cómo la",
          titleLine2: "inteligencia artificial está",
          titleLine3: "transformando la economía",
          titleLine4: "y cambiando las reglas",
          titleLine5: "de los negocios.",
          cta: "Quiero mi ejemplar"
        },
    features: {
      aiTitleLine1: "La inteligencia artificial no solo está",
      aiTitleLine2: "optimizando procesos.",
      aiTitleLine3: "Está redefiniendo qué es el valor.",
      bookDescriptionLine1: "\"Economía Guiada por IA\", de Eduardo Ibrahim, presenta una visión",
      bookDescriptionLine2: "estratégica y realista sobre cómo la IA está transformando la estructura",
      bookDescriptionLine3: "de las organizaciones y la economía global.",
      aboutBook: "Sobre el libro",
      bookContent1: "En lugar de automatizar el pasado, las empresas necesitan co-crear el futuro. Esta es la propuesta del libro: repensar los indicadores, los roles humanos, la gobernanza y las decisiones a partir de una inteligencia combinada — donde humanos y algoritmos actúan juntos.",
      bookContent2: "La obra propone nuevos indicadores como el Producto Interno Cognitivo (PIC) y el Valor Cognitivo Combinado (Vᶜᶜ) para medir el impacto real de la inteligencia en las organizaciones. También presenta herramientas como ingeniería inversa de funciones, reskilling estratégico y cerebros organizacionales, que ayudan a líderes y equipos a navegar esta transición con conciencia, ética e innovación.",
      benefitsTitle: "Beneficios",
      benefits: [
        "Comprende la nueva lógica de la economía cognitiva",
        "Conoce los conceptos inéditos de PIC y Vᶜᶜ",
        "Aprende a tomar decisiones con IA de forma ética y estratégica",
        "Prepara tu equipo para el futuro del trabajo",
        "Transforma tu empresa en una organización cognitiva"
      ],
      futureTitle: "¿Quieres un vistazo al futuro?",
      futureDescription: "Descarga ahora un fragmento exclusivo del libro y descubre cómo la inteligencia artificial está redefiniendo los fundamentos de la economía, el liderazgo y las decisiones estratégicas en las empresas. Prepárate para entrar al juego bajo una nueva perspectiva.",
      freePreview: "Acceder vista previa gratuita"
    },
    author: {
      name: "Eduardo Ibrahim",
      aboutAuthor: "Sobre el autor",
      bio1: "Eduardo Ibrahim es una de las mayores referencias en tecnología y futuro. Fundador y CEO de Humana AI, Profesor de Singularity University y autor del bestseller Economía Exponencial, Ibrahim es uno de los pioneros en la aplicación de IA en el contexto estratégico de negocios.",
      bio2: "Con una trayectoria que pasa por el campus de la NASA en Silicon Valley, TEDx y programas de beta-tester de OpenAI, Ibrahim combina visión práctica y pensamiento disruptivo. Como orador internacional es voz activa en grandes organizaciones, donde traduce lo complejo en lenguaje accesible.",
      bio3: "En este nuevo libro, propone una visión transformadora: la IA guiando la economía no para reemplazarnos, sino para amplificar lo que tenemos de más humano. Una lectura provocadora y esencial para líderes, innovadores y todos los que desean prosperar en la nueva era de la IA.",
      bookTitle: "ECONOMÍA GUIADA POR IA",
      testimonials: [
        {
          text: "\"En este libro, Ibrahim entrega mucho más que una visión sobre la inteligencia artificial: nos ofrece una nueva gramática para entender el valor, el talento y la toma de decisiones en un mundo que piensa con máquinas. Esta es una lectura esencial para los líderes que no quieran reconstruir sus organizaciones únicamente en torno a la IA. Lo que propone aquí no es futurismo. Es un poderoso manual para el presente.\"",
          author: "GARY BOLLES",
        },
        {
          text: "\"Ibrahim no solo está siguiendo la revolución de la IA — está liderando la conversación. Este libro redefine lo que significa liderar en un mundo cognitivo, donde humanos y máquinas piensan juntos. La claridad con la que conecta estrategia, talento y valor es rara. Una lectura que cambia no solo la mente, sino también el rumbo de los negocios.\"",
          author: "RICARDO ALEM",
        },
        {
          text: "\"Leer este libro es como ajustar la lente mental a una realidad ya moldeada por la inteligencia artificial. Ibrahim no solo explica lo que está sucediendo, sino que nos prepara para participar en ello. Su concepto de ‘inteligencia combinada’  no es solo una teoría; es un llamado a la acción para líderes y creativos. Si todavía te preguntas si la IA es importante, te estás haciendo la pregunta equivocada.\"",
          author: "ISABELA VANZIN",
        },
        {
          text: "\"Este libro es como una clase magistral sobre el presente. Ibrahim no predice el futuro, sino que nombra lo que ya ha comenzado. La forma en que articula el papel de la IA en las organizaciones, el talento y la creación de valor transforma nuestra percepción del presente. Una lectura imprescindible para cualquiera que desee pensar con profundidad, estrategia y humanidad.\"",
          author: "ANANDA ZOUAIN",
        },
        {
          text: "\"Este libro es como una clase magistral sobre el presente. Ibrahim no predice el futuro, sino que nombra lo que ya ha comenzado. La forma en que articula el papel de la IA en las organizaciones, el talento y la creación de valor transforma nuestra percepción del presente. Una lectura imprescindible para cualquiera que desee pensar con profundidad, estrategia y humanidad.\"",
          author: "ANANDA ZOUAIN",
        },
        {
          text: "\"Leer este libro es como ajustar la lente mental a una realidad ya moldeada por la inteligencia artificial. Ibrahim no solo explica lo que está sucediendo, sino que nos prepara para participar en ello. Su concepto de ‘inteligencia combinada’  no es solo una teoría; es un llamado a la acción para líderes y creativos. Si todavía te preguntas si la IA es importante, te estás haciendo la pregunta equivocada.\"",
          author: "ISABELA VANZIN",
        },
        {
          text: "\"Este libro me dio la sensación de estar accediendo al código fuente del presente. Ibrahim traduce la complejidad de la IA con lucidez y profundidad. Una invitación a repensar cómo organizamos el trabajo, desarrollamos a las personas y creamos valor real.\"",
          author: "PAOLLA MELLO",
        },
        {
          text: "\"‘Economía Impulsada por IA’ es más que un libro — es un mapa para quienes necesitan navegar en un mundo donde las decisiones son cada vez más cognitivas. Ibrahim muestra que la inteligencia artificial, cuando se aplica bien, no reemplaza al humano — lo amplifica. Estratégico, provocador y actual.\"",
          author: "JOÃO PEDRO MORENO",
        }
      ],
      showMore: "Mostrar más",
      showLess: "Mostrar menos"
    },
  faq: {
    title: "Preguntas Frecuentes",
    questions: [
      {
        question: "¿Para quién es el libro?",
        answer: "Para profesionales, líderes, emprendedores y estudiantes interesados en el impacto real de la inteligencia artificial en la economía, los negocios y la humanidad."
      },
      {
        question: "¿Necesito saber programación o IA para entender el contenido?",
        answer: "No. El libro fue escrito con un lenguaje accesible, pero con profundidad técnica y estratégica para quienes quieren liderar con conciencia."
      },
      {
        question: "¿Habrá versión digital?",
        answer: "¡Sí! El libro estará disponible en e-book y versión física."
      },
      {
        question: "¿Puedo comprarlo para mi equipo?",
        answer: "¡Sí! Tenemos condiciones especiales para compras corporativas. Contáctanos por email."
      },
    ]
  },
  form: {
    title: "Quiero más información",
    subtitle: "Completa tus datos para recibir novedades y un capítulo de muestra.",
    name: "Nombre",
    email: "Correo electrónico", 
    phone: "Teléfono",
    message: "Mensaje",
    submit: "Enviar",
    sending: "Enviando...",
    success: "¡Datos enviados con éxito!",
    error: "Ocurrió un error. Intenta nuevamente.",
    required: "Campo obligatorio",
    invalidEmail: "Correo electrónico inválido",
    errorName: "Escribe al menos 3 letras en el nombre.",
    errorEmail: "Escribe un correo electrónico válido.",
    errorPhone: "Escribe un teléfono válido (solo números)."
  },
  chat: {
    title: "IBRAHIM RESPONDE",
    placeholder: "Explora el libro con IA.",
    userMessage: "Pregunta del usuario.",
    botResponse: "Respuesta."
  },
  footer: {
    publisherName: "Editorial Alta Books",
    ctaButton: "Quiero mi ejemplar", 
    privacyPolicy: "Política de Privacidad",
    termsOfUse: "Términos de Uso",
    contact: "Contacto",
    humanaSiteLabel: "Sitio de Humana AI:",
    eduardoLabel: "Eduardo Ibrahim"
  }
},
}


  // Instância global do i18n
  export const i18n = new I18n({
    defaultLocale: 'pt',
    locales: ['pt', 'en', 'es'],
    translations
  });

// ✅ Hook React corrigido para evitar hidratação
export function useI18n() {
  const [locale, setLocale] = useState(i18n.getLocale());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Hidratar apenas uma vez
    if (!isHydrated) {
      i18n.hydrate();
      setIsHydrated(true);
      
      // Sincronizar com o locale após hidratação
      const currentLocale = i18n.getLocale();
      if (currentLocale !== locale) {
        setLocale(currentLocale);
      }
    }

    // Escutar mudanças
    const unsubscribe = i18n.subscribe(() => {
      const newLocale = i18n.getLocale();
      console.log('🔄 useI18n received locale change:', newLocale);
      setLocale(newLocale);
    });
    
    return unsubscribe;
  }, [isHydrated, locale]);

  return {
    t: (key: string, variables?: Record<string, string | number>): any => {
      return i18n.t(key, variables);
    },
    locale,
    setLocale: (newLocale: string) => {
      i18n.setLocale(newLocale);
    },
    availableLocales: ['pt', 'en', 'es'],
    isHydrated // ✅ Expor estado de hidratação
  };
}
