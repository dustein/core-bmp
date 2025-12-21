import { useState } from 'react';
import emailjs from '@emailjs/browser';
import html2pdf from 'html2pdf.js';
import type { FormData } from '../assets/formSchema';

emailjs.init("Ow9ZWSmcGavDTkhmK");

interface Props {
  dados: FormData;
  onClose: () => void;
}

export function ModalEnviarEmail({ dados, onClose }: Props) {
    const [emailDestino, setEmailDestino] = useState("");
    const [status, setStatus] = useState<"parado" | "processando" | "sucesso">("parado");

    const executarEnvio = async () => {
  if (!emailDestino) return alert("Informe o e-mail do destinatário.");
  
  setStatus("processando");

  // Pequena pausa para garantir que o DOM está pronto
  await new Promise(resolve => setTimeout(resolve, 500));

  const elemento = document.getElementById('area-impressao');
  
  if (!elemento) {
    console.error("ERRO: Elemento #area-impressao não encontrado no DOM.");
    alert("Erro crítico: Área de impressão não detectada.");
    setStatus("parado");
    return;
  }

  const opcoes = {
    margin: 10,
    filename: `BMP_${dados.missaoNumero}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      logging: true, // Ativa logs para debug
      letterRendering: true 
    },
    jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
  };

  try {
    console.log("Iniciando geração do PDF...");
    const pdfBase64 = await html2pdf().from(elemento).set(opcoes).outputPdf('datauristring');
    console.log("PDF gerado com sucesso. Enviando para EmailJS...");

    const templateParams = {
      to_email: emailDestino,
      missao_numero: dados.missaoNumero,
      content: pdfBase64, 
    };

    const response = await emailjs.send(
      'service_5zwmmlp', 
      'template_00xklzw', 
      templateParams, 
      'Ow9ZWSmcGavDTkhmK'
    );

    console.log("Resposta EmailJS:", response);
    setStatus("sucesso");
    alert("E-mail enviado com sucesso!");
    onClose();
  } catch (erro: any) {
    // Aqui capturamos o erro real para você me dizer o que apareceu
    console.error("DETALHES DO ERRO:", erro);
    alert(`Falha: ${erro?.text || erro?.message || "Erro desconhecido"}`);
    setStatus("parado");
  }
};

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] no-print p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl border-t-4 border-blue-800">
        <h2 className="text-xl font-bold mb-2">Enviar BMP por E-mail</h2>
        <p className="text-sm text-gray-600 mb-4">O PDF será gerado com o layout atual e enviado como anexo.</p>

        <input 
          type="email"
          placeholder="E-mail da impressora (Ex: sspio.impressao@pc.rj.gov.br)"
          className="w-full border-2 border-gray-200 p-3 rounded mb-4 outline-none focus:border-blue-600 transition-colors"
          value={emailDestino}
          onChange={(e) => setEmailDestino(e.target.value)}
        />

        <div className="flex gap-2">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded transition-colors"
          >
            CANCELAR
          </button>
          <button 
            onClick={executarEnvio}
            disabled={status === "processando"}
            className="flex-[2] bg-blue-800 text-white py-3 rounded font-bold shadow-lg hover:bg-blue-900 disabled:bg-gray-400 transition-all"
          >
            {status === "processando" ? "GERANDO E ENVIANDO..." : "ENVIAR AGORA"}
          </button>
        </div>
      </div>
    </div>
  );
}