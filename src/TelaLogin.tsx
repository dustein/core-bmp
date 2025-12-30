// import { ShieldCheck, LogIn, Lock } from 'lucide-react';
import { LogIn } from 'lucide-react';

interface Props {
  onEntrar: () => void;
}

export function TelaLogin({ onEntrar }: Props) {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-6">
      {/* Detalhe de luz de fundo para profundidade */}
      <div className="absolute top-0 w-full h-1 bg-linear-to-r from-transparent via-blue-600 to-transparent opacity-50"></div>
      
      <div className="max-w-md w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Cabeçalho de Identificação */}
        <div className="flex flex-col items-center gap-4">
          {/* <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-2xl">
            <ShieldCheck className="w-14 h-14 text-blue-500" />
          </div> */}
          
          <div className="text-center">
            <h1 className="text-white text-2xl font-black tracking-[0.2em] uppercase">
              CORE <span className="text-blue-500">BMP</span>
            </h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.3em] mt-1">
              Gerador de Boletim de Missão Policial
            </p>
          </div>
        </div>

        {/* Card de Login */}
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm space-y-6">
          {/* <div className="flex items-center gap-3 text-slate-400 border-b border-slate-800 pb-4">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Acesso Restrito</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            Este é um terminal de uso exclusivo para o preenchimento de boletins oficiais. Ao clicar em entrar, você declara estar ciente das normas de segurança.
          </p> */}

          <button
            onClick={onEntrar}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-blue-900/20 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <LogIn className="w-5 h-5" />
            Acessar
          </button>
        </div>

        {/* Rodapé de Segurança */}

        {/* <div className="text-center space-y-2">
          <p className="text-slate-600 text-[9px] uppercase font-bold tracking-widest">
            COLEGIO DE POLICIA • CORE • PCERJ
          </p>
          <p className="text-slate-700 text-[8px] uppercase">
            IP: Registrado para fins de auditoria
          </p>
        </div> */}

      </div>
    </div>
  );
}