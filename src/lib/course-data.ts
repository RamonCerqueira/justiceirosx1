export interface Attachment {
  name: string;
  url: string;
  type: "audio" | "video" | "image" | "file";
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
}

export interface ModuleData {
  title: string;
  order: number;
  mediaUrl: string;
  content: string;
  attachments?: Attachment[];
  courseId: string;
}

export const USERS = [
  { id: 1, username: "ricardo", password: "x1", name: "Ricardo Menezes", role: "admin" },
  { id: 2, username: "wil", password: "x1", name: "Wil", role: "admin" },
  { id: 3, username: "romao", password: "x1", name: "Romão Lucas", role: "admin" },
  { id: 4, username: "ramon", password: "x1", name: "Ramon", role: "admin" },
  { id: 5, username: "ananda", password: "x1", name: "Ananda Tupinamba", role: "aluno" },
  { id: 6, username: "emerson", password: "x1", name: "Emerson Tavares", role: "aluno" },
  { id: 7, username: "andreia", password: "x1", name: "Andréia", role: "aluno" },
  { id: 8, username: "emersonleal", password: "x1", name: "Émerson Leal", role: "aluno" },
  { id: 9, username: "ismael", password: "x1", name: "Ismael", role: "aluno" },
  { id: 10, username: "ingrid", password: "x1", name: "Ingrid", role: "aluno" },
  { id: 11, username: "fabricio", password: "x1", name: "Fabrício", role: "aluno" },
  { id: 12, username: "marcos", password: "x1", name: "Marcos Silva", role: "aluno" },
  { id: 13, username: "juliana", password: "x1", name: "Juliana Gomes", role: "aluno" },
  { id: 14, username: "thiago", password: "x1", name: "Thiago Ramos", role: "aluno" },
  { id: 15, username: "lucas", password: "x1", name: "Lucas Santos", role: "aluno" },
];

export const STATIC_COURSES: CourseData[] = [
  {
    id: "f83a45c7-20b1-4f9e-a0e2-6cf29df920ee",
    title: "Justiça do X1: Venda Automática",
    description: "Método completo de conversão automatizada no WhatsApp utilizando a técnica de Pay After Delivery (PAD) e tráfego pago de baixo custo.",
  }
];

export const STATIC_MODULES: ModuleData[] = [
  {
    title: "Módulo 1: A Estrutura de Guerra (Preparação)",
    order: 1,
    courseId: "f83a45c7-20b1-4f9e-a0e2-6cf29df920ee",
    mediaUrl: "https://infinitepay.onelink.me/IGWD/x1pix",
    content: `### At Glance: Guia de Referência Rápida
O Conceito Chave: A operação baseia-se na confiança e no baixo ticket. Vendemos produtos de até R$ 20,00, entregando o arquivo antes de receber o pagamento (Pay After Delivery). Isso gera uma taxa de conversão média de 40%.

---

**Objetivo**: Montar a base tecnológica e financeira para a operação.

### A Mentalidade Pay After Delivery
A base deste curso é a confiança. Vendemos produtos digitais de baixo ticket (até R$20,00) entregando o conteúdo antes do pagamento. Como o valor é baixo, a barreira de entrada diminui e a taxa de conversão média atinge 40%. Não se preocupe com calotes; o volume de vendas compensa qualquer perda.

### Checklist Estrutural
1. **Gestão Financeira**: É necessário abrir uma conta na Infinite Pay para gerenciar seus recebíveis e gerar múltiplos cartões virtuais para os anúncios. Recomenda-se um caixa inicial de R$ 50,00 a R$ 100,00 para começar.
2. **Hardware e WhatsApp**: O uso de celulares Motorola com a função "Pasta Segura" é ideal para gerenciar até 8 instâncias de WhatsApp em um único aparelho. Compre chips novos (físicos ou virtuais) e use o WhatsApp Business para o atendimento.
3. **Contingência e Aquecimento**: Utilize perfis de Facebook (pessoal ou reserva) para criar uma Página e uma BM (Gerenciador de Negócios). Se a conta for nova, use-a normalmente por 3 dias para "aquecer" antes de subir anúncios e evitar bloqueios.`,
    attachments: [
      { name: "Áudio Explicativo: Introdução ao Método (Ricardo)", url: "/chat-media/00003004-AUDIO-2026-06-08-08-49-02.opus", type: "audio" },
      { name: "Vídeo Motivacional: Apenas não Desista (Romão Lucas)", url: "/chat-media/00003011-VIDEO-2026-06-08-09-10-20.mp4", type: "video" },
      { name: "Áudio complementar: Explicações Iniciais parte 1 (Ricardo)", url: "/chat-media/00003013-AUDIO-2026-06-08-11-22-32.opus", type: "audio" },
      { name: "Áudio complementar: Explicações Iniciais parte 2 (Ricardo)", url: "/chat-media/00003014-AUDIO-2026-06-08-11-25-16.opus", type: "audio" },
      { name: "Áudio: Perfil Pessoal e BM (Ricardo)", url: "/chat-media/00003039-AUDIO-2026-06-08-12-47-59.opus", type: "audio" },
      { name: "Áudio: Criar Página e configurar Business Manager (Wil)", url: "/chat-media/00003124-AUDIO-2026-06-10-09-25-34.opus", type: "audio" },
      { name: "Áudio: Dicas de perfis femininos nas páginas (Wil)", url: "/chat-media/00003125-AUDIO-2026-06-10-09-26-36.opus", type: "audio" },
      { name: "Áudio: Conta e Cartões Virtuais na InfinitePay (Wil)", url: "/chat-media/00003138-AUDIO-2026-06-10-09-42-57.opus", type: "audio" },
      { name: "Áudio: Configurar e vincular o WhatsApp Business (Wil)", url: "/chat-media/00003143-AUDIO-2026-06-10-09-50-07.opus", type: "audio" },
      { name: "Áudio: Como aquecer e usar as contas do Meta (Wil)", url: "/chat-media/00003146-AUDIO-2026-06-10-09-53-38.opus", type: "audio" },
      { name: "Áudio: Links de afiliados e contingência (Wil)", url: "/chat-media/00003148-AUDIO-2026-06-10-10-08-49.opus", type: "audio" },
      { name: "Foto: Histórico de Vendas Pix no X1 (Romão)", url: "/chat-media/00003042-PHOTO-2026-06-08-16-09-17.jpg", type: "image" },
      { name: "Foto: Exemplo prático de vinculação correta (Wil)", url: "/chat-media/00003145-PHOTO-2026-06-10-09-51-28.jpg", type: "image" }
    ]
  },
  {
    title: "Módulo 2: Mineração de Ouro (Pesquisa de Produto)",
    order: 2,
    courseId: "f83a45c7-20b1-4f9e-a0e2-6cf29df920ee",
    mediaUrl: "https://www.facebook.com/ads/library/",
    content: `**Objetivo**: Identificar o que já está vendendo e modelar para sua operação.

### Busca Estratégica
Utilize a Biblioteca de Anúncios do Facebook. Use termos de busca como "pdf", "api", "ebook", "receitas" ou "moldes", combinados com valores (ex: 9,90, 10,00, 12,90).

### Critérios de Seleção
1. **Tempo de Rodagem**: Priorize anúncios ativos há mais de 2 ou 3 meses.
2. **Escala**: Busque anúncios com múltiplos criativos ativos (mais de 5).
3. **Ferramentas de Espionagem**: Instale extensões como GG SPY, AdsSparo ou Copycat no Chrome para analisar o tempo de rodagem e baixar criativos dos concorrentes.
4. **Engenharia Reversa**: Entre no WhatsApp do concorrente enviando uma mensagem. Analise o produto recebido e, se houver registros de marca, altere a identidade visual no Canva para evitar problemas de direitos autorais.`,
    attachments: [
      { name: "Áudio: Garimpar produtos e usar o AdsSparo/Copycat (Wil)", url: "/chat-media/00003084-AUDIO-2026-06-09-09-37-47.opus", type: "audio" }
    ]
  },
  {
    title: "Módulo 3: O Funil \"Pay After Delivery\" (Automação)",
    order: 3,
    courseId: "f83a45c7-20b1-4f9e-a0e2-6cf29df920ee",
    mediaUrl: "https://app.leonasolutions.io/register?via=romao",
    content: `**Objetivo**: Configurar o robô para realizar a venda automática 24h.

### Escolha da Ferramenta
Recomenda-se o uso do Leona em vez do Bot Pro, visando maior estabilidade no envio de áudios e vídeos.

### Roteiro do Funil de Conversão
1. **Apresentação**: Explique o valor e o conteúdo do material.
2. **A Quebra de Objeção**: Informe que o cliente receberá o produto primeiro e pagará depois de conferir.
3. **Chamada para Ação (CTA)**: Pergunte: "Posso enviar?".
4. **Entrega e Cobrança**: Após o "Sim", o robô envia o PDF e, logo em seguida, a sua chave Pix para pagamento.`,
    attachments: [
      { name: "Áudio: Recomendação Leona Solutions (Romão Lucas)", url: "/chat-media/00003047-AUDIO-2026-06-08-17-14-57.opus", type: "audio" },
      { name: "Áudio: Agilidade e suporte na ferramenta Leona (Romão)", url: "/chat-media/00003050-AUDIO-2026-06-08-17-16-34.opus", type: "audio" },
      { name: "Áudio: Teste do BotPro e falha no disparo de mídia (Ricardo)", url: "/chat-media/00003058-AUDIO-2026-06-08-18-03-23.opus", type: "audio" },
      { name: "Áudio: Por que não usar BotPro mesmo para testes (Romão)", url: "/chat-media/00003060-AUDIO-2026-06-08-18-23-40.opus", type: "audio" },
      { name: "Áudio: Testes de funis gigantescos dentro da Leona (Wil)", url: "/chat-media/00003100-AUDIO-2026-06-09-12-04-53.opus", type: "audio" },
      { name: "Áudio: Compra de instâncias de reserva na Leona (Romão)", url: "/chat-media/00003224-AUDIO-2026-06-11-09-35-10.opus", type: "audio" },
      { name: "Áudio: Erro ao salvar fluxo de funil no BotPro (Ricardo)", url: "/chat-media/00003226-AUDIO-2026-06-11-09-39-44.opus", type: "audio" }
    ]
  },
  {
    title: "Módulo 4: Tráfego Pago e Inteligência Artificial",
    order: 4,
    courseId: "f83a45c7-20b1-4f9e-a0e2-6cf29df920ee",
    mediaUrl: "https://youtu.be/cbpaDoEAzuo",
    content: `**Objetivo**: Atrair leads qualificados com anúncios de baixo custo.

### Criação com IA (ChatGPT/Gemini)
Anexe a imagem do concorrente e peça para a IA analisar pontos fortes e fracos. Solicite a geração de 3 a 5 novos prompts de imagem para criar criativos exclusivos e roteiros de texto (copy) que mantenham a persuasão original sem plágio.

### Configuração de Campanha
Utilize o modelo CBO (Advantage Campaign Budget), onde o orçamento é definido na campanha para que o Facebook otimize a distribuição.

### Fase de Teste
Suba de 3 a 5 variações de criativos com um orçamento de R$ 15,00 a R$ 25,00 por dia e deixe rodar por 24h sem alterações.`,
    attachments: [
      { name: "Vídeo: Mostrando a conta de anúncios e CBO (Ricardo)", url: "/chat-media/00003098-VIDEO-2026-06-09-11-51-34.mp4", type: "video" },
      { name: "Áudio: Analisar 5 criativos e estruturar IA (Wil)", url: "/chat-media/00003119-AUDIO-2026-06-10-09-20-24.opus", type: "audio" }
    ]
  },
  {
    title: "Módulo 5: Escala e Gestão de Métricas",
    order: 5,
    courseId: "f83a45c7-20b1-4f9e-a0e2-6cf29df920ee",
    mediaUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80",
    content: `**Objetivo**: Transformar o lucro inicial em uma operação de escala constante.

### Métricas de Desempenho
Monitore os custos por conversa:
- **CPL Ideal**: Abaixo de R$ 1,00.
- **Custo Crítico**: Até R$ 3,00 (manter apenas se houver ROI positivo).

### Ciclo de Escala de 3 Dias
- **Dia 1**: Teste inicial de 24h.
- **Dia 2**: Identifique criativos com ROI e dobre o orçamento.
- **Dia 3**: Se o ROI persistir, dobre novamente, até o limite de R$ 100,00/dia por criativo.

### Iteração Contínua
Nunca dependa de um único produto. Se em 3 dias não houver ROI, descarte o produto e reinicie o ciclo.

---

### Glossário Técnico do Curso
* **X1**: Venda direta "um a um" no WhatsApp para gerar confiança.
* **ROI**: Retorno sobre o investimento (Lucro ÷ Investimento).
* **ROAS**: Retorno sobre o gasto com anúncios (Vendas ÷ Investimento).
* **CPL**: Custo por Lead (mensagem recebida).
* **CPA**: Custo por Aquisição (quanto custa cada venda realizada).
* **CTR**: Taxa de cliques no anúncio; indica se o criativo é atrativo.`,
    attachments: [
      { name: "Áudio: Se acertar o produto, é Pix por minuto (Ricardo)", url: "/chat-media/00003027-AUDIO-2026-06-08-11-46-42.opus", type: "audio" },
      { name: "Áudio: O que é CBO e controle de ROI (Ricardo)", url: "/chat-media/00003092-AUDIO-2026-06-09-11-30-31.opus", type: "audio" },
      { name: "Áudio: Explicação detalhada sobre ROI no X1 (Ricardo)", url: "/chat-media/00003093-AUDIO-2026-06-09-11-37-43.opus", type: "audio" },
      { name: "Áudio: Glossário de termos e abreviações (Ricardo)", url: "/chat-media/00003095-AUDIO-2026-06-09-11-44-45.opus", type: "audio" },
      { name: "Áudio: Estrutura recomendada de CBO e teste 24h (Wil)", url: "/chat-media/00003078-AUDIO-2026-06-09-01-36-48.opus", type: "audio" },
      { name: "Áudio: Parâmetros de CPL e regras de corte (Wil)", url: "/chat-media/00003080-AUDIO-2026-06-09-01-39-54.opus", type: "audio" },
      { name: "Áudio: Escala progressiva de CBO (Wil)", url: "/chat-media/00003081-AUDIO-2026-06-09-01-42-38.opus", type: "audio" },
      { name: "Áudio: Otimizações gerais e CTR (Romão Lucas)", url: "/chat-media/00003083-AUDIO-2026-06-09-08-33-42.opus", type: "audio" },
      { name: "Áudio: Decisão de escala na virada do dia (Ricardo)", url: "/chat-media/00003106-AUDIO-2026-06-09-12-28-06.opus", type: "audio" },
      { name: "Áudio: Distribuição automática de verba e testes (Ricardo)", url: "/chat-media/00003109-AUDIO-2026-06-09-13-02-50.opus", type: "audio" },
      { name: "Áudio: Escala de orçamentos e teto máximo parte 1 (Ricardo)", url: "/chat-media/00003112-AUDIO-2026-06-09-15-25-14.opus", type: "audio" },
      { name: "Áudio: Escala de orçamentos e teto máximo parte 2 (Ricardo)", url: "/chat-media/00003113-AUDIO-2026-06-09-15-37-24.opus", type: "audio" },
      { name: "Áudio: Escala de orçamentos e teto máximo parte 3 (Ricardo)", url: "/chat-media/00003114-AUDIO-2026-06-09-15-44-41.opus", type: "audio" },
      { name: "Áudio: Saturação de criativos em escala (Ricardo)", url: "/chat-media/00003115-AUDIO-2026-06-09-15-48-37.opus", type: "audio" },
      { name: "Áudio: Subida diária de criativos novos (Wil)", url: "/chat-media/00003118-AUDIO-2026-06-09-16-02-57.opus", type: "audio" },
      { name: "Áudio: Iniciar execução prática sem desculpas (Wil)", url: "/chat-media/00003167-AUDIO-2026-06-11-08-24-22.opus", type: "audio" },
      { name: "Áudio: Conexão e boas vindas na comunidade (Wil)", url: "/chat-media/00003174-AUDIO-2026-06-11-08-34-12.opus", type: "audio" },
      { name: "Áudio: Vá lá e faça acontecer (Ricardo Menezes)", url: "/chat-media/00003217-AUDIO-2026-06-11-09-30-55.opus", type: "audio" }
    ]
  }
];
