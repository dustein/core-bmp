import { useState, useEffect } from 'react';
import { gerarPDFOficial } from '../services/pdfService';
import type { FormData } from '../assets/formSchema';
import { Share2, Download } from 'lucide-react';

interface Props {
  dados: FormData;
  onClose: () => void;
}

export function ModalEnviarEmail({ dados, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é um dispositivo móvel pelo tamanho da tela ou UserAgent
  useEffect(() => {
    const checkMobile = () => {
      // Consideramos Mobile se a tela for menor que 1024px OU se o navegador for mobile
      const larguraMobile = window.innerWidth < 1024;
      const agenteMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Só habilitamos compartilhamento se for mobile E o navegador suportar
      setIsMobile((larguraMobile || agenteMobile) && !!navigator.share);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAcaoPrincipal = async () => {
    setLoading(true);
    try {
      const doc = await gerarPDFOficial(dados);
      const nomeArquivo = `BMP_${dados.missaoNumero.replace(/\//g, '-')}.pdf`;

      // Só tenta compartilhar se a detecção acima confirmar que é Mobile
      if (isMobile && navigator.share) {
        const pdfBlob = doc.output('blob');
        const arquivo = new File([pdfBlob], nomeArquivo, { type: 'application/pdf' });
        await navigator.share({ files: [arquivo], title: `BMP ${dados.missaoNumero}` });
      } else {
        // No computador (Windows/Mac/Linux), força sempre o salvamento
        doc.save(nomeArquivo);
      }
      
      onClose();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao processar o PDF oficial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-9999 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm border-t-12 border-blue-900 shadow-2xl flex flex-col gap-6 relative">
        
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-50 p-6 rounded-full mb-4 shadow-inner">
            {isMobile ? <Share2 className="w-10 h-10 text-blue-900" /> : <Download className="w-10 h-10 text-blue-900" />}
          </div>
          
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase leading-none">
            {isMobile ? "Enviar BMP em PDF" : "Salvar BMP em PDF"}
          </h2>
          
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            {isMobile 
              ? "O menu de compartilhamento será aberto para envio via WhatsApp ou e-Mail." 
              : "O PDF será gerado e salvo na sua pasta de Downloads."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleAcaoPrincipal}
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95 transition-all disabled:bg-slate-300 flex items-center justify-center gap-3"
          >
            {loading ? (
               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isMobile ? <Share2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                {isMobile ? "GERAR E ENVIAR" : "GERAR E SALVAR"}
              </>
            )}
          </button>
          
          <button onClick={onClose} className="w-full py-3 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-red-600">
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
}