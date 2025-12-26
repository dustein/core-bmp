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

      if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
        await navigator.share({
          files: [arquivo],
          title: `BMP ${dados.missaoNumero}`,
        });
      } else {
        doc.save(`BMP_${dados.missaoNumero}.pdf`);
      }
      onClose();
    } catch (error) { 
      console.error(error);
      alert("Erro ao processar o PDF oficial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /** * CORREÇÃO PRINCIPAL: 
     * - fixed inset-0: Garante que o fundo ocupe 100% da janela visível.
     * - z-[9999]: Força o modal a ficar acima da escala do documento A4.
     * - overflow-hidden: Impede scroll lateral indesejado enquanto o modal está aberto.
     */
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-9999 p-4 overflow-hidden">
      
      {/* max-w-[calc(100vw-2rem)]: Limita a largura ao tamanho real da tela do celular, 
          mesmo que o fundo (A4) seja maior.
      */}
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm border-t-8 border-blue-900 shadow-2xl flex flex-col gap-4 overflow-y-auto max-h-[90vh] relative">
        
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <span className="text-3xl text-blue-900">📄</span>
          </div>
          <h2 className="text-xl font-black text-gray-800 tracking-tight uppercase">
            Finalização BMP Oficial
          </h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            O PDF será gerado como <strong>{`BMP_${dados.missaoNumero}.pdf`}</strong>. No mobile, use o compartilhamento para enviar via WhatsApp ou E-mail.
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button 
            onClick={handleCompartilhar}
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg active:scale-95 transition-all disabled:bg-gray-400"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                PROCESSANDO...
              </span>
            ) : "Gerar e Compartilhar"}
          </button>
          
          <button 
            onClick={onClose}
            className="w-full py-3 text-gray-400 text-xs font-bold uppercase hover:text-red-600 transition-colors"
          >
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
}