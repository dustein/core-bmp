// import { useState } from 'react';
// import { FormStart } from './FormStart';
// import { ToPrinter } from './ToPrinter';
// import { ModalEnviarEmail } from './components/ModalSharePDF'; // Certifique-se que o nome do arquivo bate
// import type { FormData } from './assets/formSchema';

// export default function App() {
  
//   const [dadosMissao, setDadosMissao] = useState<FormData | null>(null);
//   const [modalAberto, setModalAberto] = useState(false);

  

//   return (
//     <main className="min-h-screen bg-gray-100 py-10">
//       {!dadosMissao ? (
//         <FormStart onPreview={(dados) => setDadosMissao(dados)} />
//       ) : (
//         <div className="flex flex-col items-center gap-4">
//           {/* BARRA DE FERRAMENTAS */}
//           <div className="no-print flex gap-4 bg-white p-4 rounded-lg shadow-md mb-4">
//             <button 
//               onClick={() => setDadosMissao(null)}
//               className="bg-gray-600 text-white px-4 py-2 rounded font-bold"
//             >
//               ← Voltar
//             </button>
            
//             <button 
//               onClick={() => window.print()}
//               className="bg-blue-600 text-white px-4 py-2 rounded font-bold"
//             >
//               🖨️ Imprimir
//             </button>

//             {/* ESTE BOTÃO CHAMA O NOVO MODAL COM JSPDF */}
//             <button 
//               onClick={() => setModalAberto(true)}
//               className="bg-green-600 text-white px-4 py-2 rounded font-bold shadow-lg"
//             >
//               🔗 Gerar e Enviar PDF
//             </button>
//           </div>
          
//           {/* Preview visual na tela */}
//           <ToPrinter dados={dadosMissao} />

//           {/* O Modal que agora usa o pdfService.ts interno */}
//           {modalAberto && (
//             <ModalEnviarEmail 
//               dados={dadosMissao} 
//               onClose={() => setModalAberto(false)} 
//             />
//           )}
//         </div>
//       )}
//     </main>
//   );
// }

import { useState } from 'react';
import { FormStart } from './FormStart';
import { ToPrinter } from './ToPrinter';
import { ModalEnviarEmail } from './components/ModalSharePDF';
import type { FormData } from './assets/formSchema';

export default function App() {
  // 1. Mantemos os dados aqui como a "memória central"
  const [dadosMissao, setDadosMissao] = useState<FormData | null>(null);
  
  // 2. Novo estado para controlar apenas QUAL tela o usuário vê
  const [etapa, setEtapa] = useState<'formulario' | 'preview'>('formulario');
  
  const [modalAberto, setModalAberto] = useState(false);

  // Função chamada quando o usuário clica em "Visualizar" no formulário
  const lidarComPreview = (dados: FormData) => {
    setDadosMissao(dados); // Salva os dados no "corredor" (App)
    setEtapa('preview');   // Muda para a tela de preview
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      {/* 3. A lógica de exibição agora depende do estado 'etapa' */}
      {etapa === 'formulario' ? (
        <FormStart 
          onPreview={lidarComPreview} 
          dadosIniciais={dadosMissao} // Passa os dados salvos de volta
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="no-print flex gap-4 bg-white p-4 rounded-lg shadow-md mb-4">
            <button 
              // 4. Ao voltar, mudamos a etapa, mas os 'dadosMissao' continuam salvos
              onClick={() => setEtapa('formulario')}
              className="bg-gray-600 text-white px-4 py-2 rounded font-bold"
            >
              ← Voltar
            </button>
            
            <button 
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded font-bold"
            >
              🖨️ Imprimir
            </button>

            <button 
              onClick={() => setModalAberto(true)}
              className="bg-green-600 text-white px-4 py-2 rounded font-bold shadow-lg"
            >
              🔗 Gerar e Enviar PDF
            </button>
          </div>
          
          {/* Se chegamos aqui, 'dadosMissao' certamente não é nulo */}
          {dadosMissao && <ToPrinter dados={dadosMissao} />}

          {modalAberto && dadosMissao && (
            <ModalEnviarEmail 
              dados={dadosMissao} 
              onClose={() => setModalAberto(false)} 
            />
          )}
        </div>
      )}
    </main>
  );
}