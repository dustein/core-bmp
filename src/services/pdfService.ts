import { jsPDF } from "jspdf";
import type { FormData } from "../assets/formSchema";
// 1. Importe a imagem diretamente
import logoPCERJ from "../../public/logo-RJ.png"; 


function renderizarGuia(doc: jsPDF) {
    for (let i = 0; i <= 210; i += 5) {
        doc.setDrawColor(i % 20 === 0 ? 200 : 235);
        doc.line(i, 0, i, 297);
        if (i % 20 === 0) {
            doc.setFontSize(6);
            doc.text(i.toString(), i + 1, 5);
        }
    }
    for (let j = 0; j <= 297; j += 5) {
        doc.setDrawColor(j % 20 === 0 ? 200 : 235);
        doc.line(0, j, 210, j);
        if (j % 20 === 0) {
            doc.setFontSize(6);
            doc.text(j.toString(), 1, j - 1);
        }
    }
    doc.setDrawColor(0); // Volta para preto
}


export const gerarPDFOficial = async (dados: FormData) => {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  renderizarGuia(doc);

  const margemEsq = 15;
  const larguraUtil = 180;
  let yPos = 15;

  const desenharCabecalhoCompleto = (y: number) => {
    try {
      // 2. Use a variável importada aqui. 
      // O jsPDF aceita a importação direta do Vite como base64
      doc.addImage(logoPCERJ, "PNG", 95, y, 15, 20);
    } catch (e) {
      console.error("Erro ao carregar logo:", e);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text("SECRETARIA DE ESTADO DE SEGURANÇA", 105, y + 25, { align: "center" });
    doc.text("POLÍCIA CIVIL DO ESTADO DO RIO DE JANEIRO", 105, y + 29, { align: "center" });
    doc.text("BOLETIM DE MISSÃO POLICIAL - BMP", 105, y + 33, { align: "center" });
    return y + 49;
  };

  yPos = desenharCabecalhoCompleto(yPos);

  // --- BLOCO 1: ÓRGÃO E UPJ ---
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text("ÓRGÃO SUBORDINANTE", margemEsq, yPos);
  doc.line(46, yPos, 140, yPos); 
  doc.text("UPJ", 145, yPos);
  doc.line(153, yPos, 185, yPos);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text((dados.orgaoSubordinante || "").toUpperCase(), 48, yPos - 1);
  doc.text((dados.upj || "").toUpperCase(), 155, yPos - 1);

  yPos += 8;

  // --- BLOCO 2: MISSÃO, DATA E REF ---
  // doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.text("MISSÃO Nº", margemEsq, yPos);
  doc.line(30, yPos, 80, yPos);
  doc.text("DATA", 85, yPos);
  doc.line(95, yPos, 140, yPos);
  doc.text("REF.", 145, yPos);
  doc.line(153, yPos, 195, yPos);

  // doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`${dados.missaoNumero || ""} / ${"2025"}`, 31, yPos - 1);
  doc.text(dados.data || "", 96, yPos - 1);
  doc.text(`BDT ${dados.referencia || ""}`, 154, yPos - 1);

  yPos += 8;

  // --- BLOCO 3: AUTORIDADE ---
  doc.setFontSize(7);
  doc.text("NOME, CARGO E MAT. DA AUTORIDADE", margemEsq, yPos);
  doc.line(65, yPos, 195, yPos);
  doc.setFontSize(9);
  doc.text((dados.autoridade || ""), 66, yPos - 1);

  yPos += 8;

  // --- BLOCO 4: OBJETIVO ---
  doc.setFontSize(7);
  doc.text("OBJETIVO INICIAL DA MISSÃO", margemEsq, yPos);
  doc.line(53, yPos, 195, yPos);
  doc.setFontSize(9);
  doc.text((dados.objetivo || "").toUpperCase(), 55, yPos - 1);

  yPos += 8;

  // --- BLOCO 5: VIATURA E PLACAS ---
  doc.setFontSize(7);
  doc.text("VIATURA", margemEsq, yPos);
  doc.line(27, yPos, 80, yPos);
  doc.text("PLACA OFICIAL", 85, yPos);
  doc.line(105, yPos, 140, yPos);
  doc.text("PLACA RES.", 145, yPos);
  doc.line(161, yPos, 195, yPos);

  doc.setFontSize(9);
  doc.text((dados.viatura || ""), 29, yPos - 1);
  doc.text((dados.placaOficial || "").toUpperCase(), 107, yPos - 1);
  doc.text((dados.placaReservada || "").toUpperCase(), 163, yPos - 1);

  yPos += 8;

  // --- BLOCO 6: KM E PREFIXO ---
  doc.setFontSize(7);
  doc.text("KM SAÍDA", margemEsq, yPos);
  doc.line(29, yPos, 65, yPos);
  doc.text("KM CHEGADA", 70, yPos);
  doc.line(89, yPos, 125, yPos);
  doc.text("PREFIXO CÓD.", 130, yPos);
  doc.line(150, yPos, 195, yPos);

  doc.setFontSize(9);
  doc.text(dados.kmSaida || "", 31, yPos - 1);
  doc.text(dados.kmChegada || "", 91, yPos - 1);
  doc.text((dados.prefixoCod || ""), 151, yPos - 1);

  yPos += 8;

  // --- BLOCO 7: EQUIPE POLICIAL ---  
  dados.equipe.forEach((p, index) => {
    if (p && p.nome) {      
      doc.setFontSize(7);
      const rotulo = index === 0 ? "EQUIPE POLICIAL/CHEFE" : "NOME";
      const inicioLinhaNome = index === 0 ? 48 : 25;
      doc.text(rotulo, margemEsq, yPos);
      doc.line(inicioLinhaNome, yPos, 140, yPos);
    
    // 4. Desenha o campo MAT (este permanece fixo no final da linha)
      doc.text("MAT:", 143, yPos);
      doc.line(150, yPos, 191, yPos);

      // 5. Preenche os dados (ajustando o X para o texto começar logo após o início da linha)
      doc.setFontSize(9);
      doc.text((p.nome || ""), inicioLinhaNome + 2, yPos - 1);
      doc.text(p.mat || "", 151, yPos - 1);
      yPos += 8;
    }
  });

  // --- BLOCO 8: TABELA DE REGIÕES ---
  yPos += 2;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  // --- BLOCO 8: TABELA DE REGIÕES ---
// --- BLOCO 8: TABELA DE REGIÕES ---
// --- BLOCO 8: TABELA DE REGIÕES ---
yPos += 2;
doc.setFont("helvetica", "bold");
doc.setFontSize(8);
doc.text("OUTRAS REGIÕES DE ATUAÇÃO PERCORRIDAS", 105, yPos, { align: "center" });
yPos += 4;

const colunasX = [15, 35, 75, 100, 125, 195];
const alturaCabecalho = 10; // Maior altura para os títulos
const alturaLinhaBranco = 6; // Altura menor para as linhas de preenchimento
const totalLinhasBranco = 4;
const alturaTotalTabela = alturaCabecalho + (totalLinhasBranco * alturaLinhaBranco);

// 1. Desenha o retângulo externo (corpo da tabela)
doc.rect(margemEsq, yPos, larguraUtil, alturaTotalTabela);

// 2. Desenha a linha horizontal que separa o cabeçalho das demais
doc.line(margemEsq, yPos + alturaCabecalho, 195, yPos + alturaCabecalho);

// 3. Desenha as 3 linhas internas restantes
for (let i = 1; i < totalLinhasBranco; i++) {
  const yLinha = yPos + alturaCabecalho + (i * alturaLinhaBranco);
  doc.line(margemEsq, yLinha, 195, yLinha);
}

// 4. Desenha as linhas verticais
colunasX.forEach(x => doc.line(x, yPos, x, yPos + alturaTotalTabela));

// 5. Função auxiliar tipada para centralizar os títulos no novo cabeçalho alto
const escreverTituloCelular = (texto: string, xInicio: number, xFim: number, y: number) => {
  const larguraDisponivel = xFim - xInicio - 2;
  const centroX = xInicio + (xFim - xInicio) / 2;
  const linhas: string[] = doc.splitTextToSize(texto, larguraDisponivel);
  
  // Cálculo de centralização vertical baseado na alturaCabecalho (10mm)
  // 2.5mm é o espaçamento entre linhas para fonte tamanho 6
  const alturaBlocoTexto = linhas.length * 2.5;
  const offsetV = (alturaCabecalho - alturaBlocoTexto) / 2 + 2; 
  
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text(linhas, centroX, y + offsetV, { align: "center" });
};

  // Chamada da função para cada coluna
  escreverTituloCelular("HORÁRIO", 15, 35, yPos);
  escreverTituloCelular("REGIÃO DE ATUAÇÃO (RA)", 35, 75, yPos);
  escreverTituloCelular("KM AO ENTRAR NA (RA)", 75, 100, yPos);
  escreverTituloCelular("KM AO SAIR DA (RA)", 100, 125, yPos);
  escreverTituloCelular("OBJETIVO DA MISSÃO", 125, 195, yPos);

  // Atualiza o yPos considerando a nova altura total
  yPos += alturaTotalTabela + 10;
  // --- BLOCO 9: RESUMO COM QUEBRA DE PÁGINA ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("RESUMO DA MISSÃO", 105, yPos, { align: "center" });
  doc.line(105 - (33 / 2), yPos+1, 105 + (33 / 2), yPos+1);
  yPos += 5;
  
  doc.setFont("helvetica", "normal");
  const resumoLinhas = doc.splitTextToSize(dados.resumo || "", larguraUtil);
  yPos += 4

  resumoLinhas.forEach((linha: string) => {
    if (yPos > 260) {
      doc.addPage();
      desenharCabecalhoCompleto(15);
      yPos = 60; // Começa mais baixo na página 2 por causa do logo
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
    }
    doc.text(linha, margemEsq, yPos);
    yPos += 5;
  });

  // --- RODAPÉ FIXO ---
  doc.setFont("helvetica", "normal");
  const footerY = 285;
  doc.line(115, 265, 195, 265);
  doc.text("(LOCAL E DATA)", 155, 269, { align: "center" });
  doc.line(15, footerY, 90, footerY);
  doc.text("(VISTO/AUTORIDADE POLICIAL)", 52.5, footerY + 4, { align: "center" });
  doc.line(115, footerY, 195, footerY);
  doc.text("(ASSINATURA, MAT. CHEFE DE EQUIPE)", 155, footerY + 4, { align: "center" });

  return doc;
};