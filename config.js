// Configurações e constantes do site

const CONFIG = {
  // Informações do site
  siteName: 'Entenda a Ansiedade',
  siteDescription: 'Um espaço seguro para entender, compartilhar e acolher',
  
  // Redes sociais (placeholder - adicione os links reais)
  social: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#'
  },
  
  // Configurações de formulários
  forms: {
    maxTestimonialLength: 500,
    minTestimonialLength: 10
  },
  
  // Recursos de emergência
  emergencyContacts: [
    {
      name: 'CVV - Centro de Valorização da Vida',
      phone: '188',
      description: 'Apoio emocional e prevenção do suicídio 24h'
    },
    {
      name: 'CAPS - Centro de Atenção Psicossocial',
      phone: '0800 644 0011',
      description: 'Atendimento em saúde mental'
    }
  ],
  
  // Artigos disponíveis
  articles: [
    {
      id: 'o-que-e-ansiedade',
      title: 'O que é a ansiedade?',
      file: 'artigo-o-que-e-ansiedade.html',
      description: 'Entenda o conceito básico de ansiedade e suas características'
    },
    {
      id: 'sintomas-ansiedade',
      title: 'Sintomas da ansiedade',
      file: 'artigo-sintomas-ansiedade.html',
      description: 'Conheça os principais sinais físicos e emocionais'
    },
    {
      id: 'tipos-de-transtornos',
      title: 'Tipos de transtornos de ansiedade',
      file: 'artigo-tipos-de-transtornos.html',
      description: 'Explore os diferentes tipos de transtornos'
    },
    {
      id: 'quando-se-transtorno',
      title: 'Quando a ansiedade se torna um transtorno?',
      file: 'artigo-quando-se-transtorno.html',
      description: 'Saiba identificar quando buscar ajuda profissional'
    },
    {
      id: 'ansiedade-infancia-adolescencia',
      title: 'Ansiedade na infância e adolescência',
      file: 'artigo-ansiedade-infancia-adolescencia.html',
      description: 'Como a ansiedade afeta crianças e adolescentes'
    },
    {
      id: 'ansiedade-trabalho-estudos',
      title: 'Ansiedade no trabalho e estudos',
      file: 'artigo-ansiedade-trabalho-estudos.html',
      description: 'Lidando com a pressão no ambiente profissional e acadêmico'
    },
    {
      id: 'ansiedade-redes-sociais',
      title: 'Ansiedade e redes sociais',
      file: 'artigo-ansiedade-redes-sociais.html',
      description: 'O impacto das redes sociais na saúde mental'
    },
    {
      id: 'lidar-no-dia-a-dia',
      title: 'Como lidar com a ansiedade no dia a dia',
      file: 'artigo-lidar-no-dia-a-dia.html',
      description: 'Estratégias práticas para o cotidiano'
    },
    {
      id: 'tratamentos',
      title: 'Tratamentos para ansiedade',
      file: 'artigo-tratamentos.html',
      description: 'Opções terapêuticas e medicamentosas disponíveis'
    },
    {
      id: 'ansiedade-autocuidado',
      title: 'Ansiedade e autocuidado',
      file: 'artigo-ansiedade-autocuidado.html',
      description: 'A importância do autocuidado no tratamento'
    }
  ],
  
  // LocalStorage keys
  storageKeys: {
    testimonials: 'ansiedade_testimonials',
    preferences: 'ansiedade_preferences',
    visited: 'ansiedade_visited'
  }
};

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
