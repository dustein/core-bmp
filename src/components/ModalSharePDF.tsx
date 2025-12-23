import { useState } from 'react';
import { gerarPDFOficial } from '../services/pdfService';
import type { FormData } from '../assets/formSchema';

interface Props {
  dados: FormData;
  onClose: () => void;
}

export function ModalEnviarEmail({ dados, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCompartilhar = async () => {
    setLoading(true);
    try {
      const doc = await gerarPDFOficial(dados);
      const pdfBlob = doc.output('blob');
      const arquivo = new File([pdfBlob], `BMP_${dados.missaoNumero}.pdf`, { type: 'application/pdf' });

      // O Compartilhamento nativo requer HTTPS ou Localhost
      if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
        await navigator.share({
          files: [arquivo],
          title: `BMP ${dados.missaoNumero}`,
        });
      } else {
        // Fallback: faz o download direto se não houver suporte ao Share API
        doc.save(`BMP_${dados.missaoNumero}.pdf`);
      }
      onClose();
    } catch { 
      // Removida a variável para evitar o aviso do ESLint
      alert("Erro ao processar o PDF oficial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-999 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-2xl border-t-4 border-blue-900">
        <h2 className="text-xl font-bold mb-4 uppercase">Gerar BMP Oficial</h2>
        <p className="text-sm text-gray-600 mb-6">
          O PDF será gerado com coordenadas exatas via jsPDF para garantir o alinhamento das linhas.
        </p>
        <button 
          onClick={handleCompartilhar}
          disabled={loading}
          className="w-full bg-blue-900 text-white py-3 rounded font-bold shadow-lg disabled:bg-gray-400 active:scale-95 transition-transform uppercase tracking-wider"
        >
          {loading ? "PROCESSANDO..." : "COMPARTILHAR PDF"}
        </button>
        <button 
          onClick={onClose} 
          className="mt-4 text-gray-400 text-xs font-bold uppercase underline hover:text-gray-600"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}