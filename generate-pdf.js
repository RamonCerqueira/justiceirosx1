const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 50 });
const pdfPath = path.join(__dirname, '..', 'Acessos_Sistema_Justiceiros.pdf');
doc.pipe(fs.createWriteStream(pdfPath));

// Colors
const GOLD = '#D4AF37';
const DARK_BLUE = '#0A1128';
const LIGHT_GRAY = '#F3F4F6';
const BORDER_COLOR = '#E5E7EB';

// Draw Banner/Header
doc.rect(0, 0, 612, 100).fill(DARK_BLUE);
doc.fillColor(GOLD).fontSize(20).text('JUSTICEIROS DO X1 ACADEMY', 50, 30, { align: 'left' });
doc.fillColor('#FFFFFF').fontSize(12).text('Relatorio Oficial de Acessos e Credenciais', 50, 60, { align: 'left' });

// Add logo line
doc.rect(0, 96, 612, 4).fill(GOLD);

// Body padding start
doc.fillColor('#333333').fontSize(10);
let y = 130;

// Metadata Info
doc.fontSize(10).fillColor('#666666');
doc.text('Data de Emissao: 11 de Junho de 2026', 50, y);
doc.text('Destinatario: Ricardo Menezes', 350, y);
y += 15;
doc.text('Autor: Ramon DevTec', 50, y);
doc.text('Status: Configurado & Ativo', 350, y);
y += 35;

// Divider line
doc.moveTo(50, y).lineTo(562, y).strokeColor(BORDER_COLOR).stroke();
y += 20;

// Section: Admins
doc.fontSize(14).fillColor(DARK_BLUE).text('1. Credenciais dos Administradores (Acesso Total)', 50, y, { underline: false });
y += 20;

// Admin users
const admins = [
  { name: 'Ricardo Menezes', username: 'ricardo', password: 'x1' },
  { name: 'Wil', username: 'wil', password: 'x1' },
  { name: 'Romao Lucas', username: 'romao', password: 'x1' },
  { name: 'Ramon', username: 'ramon', password: 'x1' }
];

// Admin table header
doc.fontSize(10).fillColor('#000000');
doc.rect(50, y, 512, 20).fill(LIGHT_GRAY);
doc.fillColor(DARK_BLUE).text('Nome Completo', 60, y + 5);
doc.text('Nome de Usuario', 260, y + 5);
doc.text('Senha Padrao', 420, y + 5);
y += 20;

admins.forEach((admin) => {
  doc.rect(50, y, 512, 20).strokeColor(BORDER_COLOR).stroke();
  doc.fillColor('#333333').fontSize(9);
  doc.text(admin.name, 60, y + 5);
  doc.text(admin.username, 260, y + 5);
  doc.text(admin.password, 420, y + 5);
  y += 20;
});

y += 20;

// Section: Alunos
doc.fontSize(14).fillColor(DARK_BLUE).text('2. Credenciais dos Alunos (Visualizacao & Progresso)', 50, y);
y += 20;

const alunos = [
  { name: 'Ananda Tupinamba', username: 'ananda', password: 'x1' },
  { name: 'Emerson Tavares', username: 'emerson', password: 'x1' },
  { name: 'Andreia', username: 'andreia', password: 'x1' },
  { name: 'Emerson Leal', username: 'emersonleal', password: 'x1' },
  { name: 'Ismael', username: 'ismael', password: 'x1' },
  { name: 'Ingrid', username: 'ingrid', password: 'x1' },
  { name: 'Fabricio', username: 'fabricio', password: 'x1' },
  { name: 'Marcos Silva', username: 'marcos', password: 'x1' },
  { name: 'Juliana Gomes', username: 'juliana', password: 'x1' },
  { name: 'Thiago Ramos', username: 'thiago', password: 'x1' },
  { name: 'Lucas Santos', username: 'lucas', password: 'x1' }
];

// Aluno table header
doc.fontSize(10).fillColor('#000000');
doc.rect(50, y, 512, 20).fill(LIGHT_GRAY);
doc.fillColor(DARK_BLUE).text('Nome do Aluno', 60, y + 5);
doc.text('Nome de Usuario', 260, y + 5);
doc.text('Senha Padrao', 420, y + 5);
y += 20;

alunos.forEach((aluno) => {
  if (y > 700) {
    // Add page if needed
    doc.addPage();
    y = 50;
    
    // Header for next page
    doc.rect(50, y, 512, 20).fill(LIGHT_GRAY);
    doc.fontSize(10).fillColor(DARK_BLUE).text('Nome do Aluno', 60, y + 5);
    doc.text('Nome de Usuario', 260, y + 5);
    doc.text('Senha Padrao', 420, y + 5);
    y += 20;
  }
  doc.rect(50, y, 512, 20).strokeColor(BORDER_COLOR).stroke();
  doc.fillColor('#333333').fontSize(9);
  doc.text(aluno.name, 60, y + 5);
  doc.text(aluno.username, 260, y + 5);
  doc.text(aluno.password, 420, y + 5);
  y += 20;
});

y += 25;

// Section: Instructions
if (y > 600) {
  doc.addPage();
  y = 50;
}

doc.fontSize(14).fillColor(DARK_BLUE).text('3. Instrucoes de Acesso e Gestao', 50, y);
y += 20;

doc.fontSize(10).fillColor('#333333');
doc.text('- Endereco da plataforma local: http://localhost:3000', 50, y); y += 15;
doc.text('- Acesso Administrativo: Use qualquer usuario Admin (ex: ricardo / x1 ou wil / x1).', 50, y); y += 15;
doc.text('- Acesso Aluno: Use os usuarios de aluno com a senha padrao "x1" para testar o progresso.', 50, y); y += 15;
doc.text('- Seed de Aulas Reais: Acesse como admin e clique no botao verde "Salvar dados do sistema".', 50, y); y += 15;
doc.text('- Gerenciamento: Pelo painel admin, voce pode criar novos cursos e incluir novas aulas.', 50, y); y += 25;

// Tip box
doc.rect(50, y, 512, 60).fill('#FCF9F0');
doc.strokeColor(GOLD).rect(50, y, 512, 60).stroke();
doc.fillColor(DARK_BLUE).fontSize(10).text('At Glance: Dica de Ouro do Metodo PAD', 60, y + 10);
doc.fillColor('#555555').fontSize(9).text('"Feito e melhor que perfeito". Incentive os alunos a subirem suas campanhas no Facebook Ads mesmo com caixa pequeno (R$ 10,00 a R$ 15,00/dia) para aprender na pratica.', 60, y + 25, { width: 490 });

doc.end();
console.log('PDF gerado com sucesso!');
