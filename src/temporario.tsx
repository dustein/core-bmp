// Dentro do ModalEmailPDF.tsx
const executarEnvio = async () => {
  if (!emailDestino) return alert("Informe o e-mail do destinatário.");
  setStatus("processando");

  const elemento = document.getElementById('area-impressao');
  if (!elemento) {
    alert("Erro: Área de impressão não encontrada.");
    setStatus("parado");
    return;
  }

  const opcoes = {
    margin: 10,
    filename: `BMP_${dados.missaoNumero}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
  };

  try {
    const pdfBase64 = await html2pdf().from(elemento).set(opcoes).outputPdf('datauristring');

    const templateParams = {
      to_email: emailDestino,
      missao_numero: dados.missaoNumero,
      content: pdfBase64, 
    };

    await emailjs.send(
      'service_h8k9dnm', // <--- COLOQUE SEU SERVICE ID AQUI (Ex: service_xxxx)
      'template_00xklzw', 
      templateParams, 
      'Ow9ZWSmcGavDTkhmK'
    );

    setStatus("sucesso");
    alert("E-mail enviado com sucesso!");
    onClose();
  } catch (erro) {
    console.error(erro);
    alert("Falha ao gerar ou enviar o PDF.");
    setStatus("parado");
  }
};