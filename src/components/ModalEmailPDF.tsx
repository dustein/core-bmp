import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import type { FormData } from '../assets/formSchema';

interface Props {
  dados: FormData;
  onClose: () => void;
}

export function ModalEnviarEmail({ dados, onClose }: Props) {
  const [status, setStatus] = useState<"ocioso" | "gerando">("ocioso");

  const compartilharPDF = async () => {
    setStatus("gerando");

    const elemento = document.getElementById('area-impressao');
    if (!elemento) {
      alert("Área de impressão não encontrada");
      setStatus("ocioso");
      return;
    }

    const opcoes = {
      margin: 10,
      filename: `BMP_${dados.missaoNumero}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    try {
      // 1. Gera o PDF como Blob (arquivo em memória)
      const pdfBlob = await html2pdf().from(elemento).set(opcoes).outputPdf('blob');

      // 2. Cria um arquivo real a partir do Blob
      const arquivo = new File([pdfBlob], `BMP_${dados.missaoNumero}.pdf`, { type: 'application/pdf' });

      // 3. Verifica se o navegador suporta compartilhamento de arquivos
      if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
        await navigator.share({
          files: [arquivo],
          title: `BMP Missão ${dados.missaoNumero}`,
          text: `Segue em anexo o Boletim de Missão Policial da equipe do(a) ${dados.equipe[0].nome}`,
        });
      } else {
        // Fallback: Se não puder compartilhar (ex: PC Desktop), ele apenas baixa o arquivo
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `BMP_${dados.missaoNumero}.pdf`;
        link.click();
        alert("Compartilhamento não suportado neste dispositivo. O arquivo foi baixado.");
      }
      
      onClose();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao processar o arquivo.");
    } finally {
      setStatus("ocioso");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-999 no-print p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-2xl text-center">
        <div className="text-4xl mb-4">📄</div>
        <h2 className="text-xl font-bold mb-2">Gerar e Enviar</h2>
        <p className="text-sm text-gray-600 mb-6">
          O PDF será gerado e o menu do seu celular abrirá para você escolher onde enviar (WhatsApp, E-mail, etc).
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={compartilharPDF}
            disabled={status === "gerando"}
            className="w-full bg-blue-800 text-white py-3 rounded-lg font-bold shadow-lg disabled:bg-gray-400"
          >
            {status === "gerando" ? "Processando PDF..." : "Gerar PDF para envio"}
          </button>
          
          <button 
            onClick={onClose}
            className="w-full py-2 text-gray-500 font-semibold border border-gray-300 rounded-b-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}