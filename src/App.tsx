// // import { useState } from 'react';
// // import { FormStart } from './FormStart';
// // import { ToPrinter } from './ToPrinter';
// // import { ModalEnviarEmail } from './components/ModalSharePDF';
// // import type { FormData } from './assets/formSchema';

// // export default function App() {
// //   // 1. Mantemos os dados aqui como a "memória central"
// //   const [dadosMissao, setDadosMissao] = useState<FormData | null>(null);
  
// //   // 2. Novo estado para controlar apenas QUAL tela o usuário vê
// //   const [etapa, setEtapa] = useState<'formulario' | 'preview'>('formulario');
  
// //   const [modalAberto, setModalAberto] = useState(false);

// //   // Função chamada quando o usuário clica em "Visualizar" no formulário
// //   const lidarComPreview = (dados: FormData) => {
// //     setDadosMissao(dados); // Salva os dados no "corredor" (App)
// //     setEtapa('preview');   // Muda para a tela de preview
// //   };

// //   return (
// //     <main className="flex justify-center min-h-screen">
// //       {etapa === 'formulario' ? (
// //         <FormStart 
// //           onPreview={lidarComPreview} 
// //           dadosIniciais={dadosMissao} // Passa os dados salvos de volta
// //         />
// //       ) : (
// //         <div className="flex flex-col justify-center max-w-4xl mx-auto p-1 sm:p-4 bg-gray-100 shadow-md font-sans w-full">
// //           <div className="no-print flex justify-evenly gap-1 text-[0.65rem] md:text-sm md:gap-4 py-4 md:rounded-lg shadow-md md:mb-4">
// //             <button              
// //               onClick={() => setEtapa('formulario')}
// //               className="bg-gray-600 text-white px-4 py-2 rounded font-bold"
// //             >
// //               ← Voltar
// //             </button>
            
// //             <button 
// //               onClick={() => window.print()}
// //               className="bg-blue-600 text-white px-4 py-2 rounded font-bold"
// //             >
// //               🖨️ Imprimir
// //             </button>

// //             <button 
// //               onClick={() => setModalAberto(true)}
// //               className="bg-green-600 text-white px-4 py-2 rounded font-bold shadow-lg"
// //             >
// //               🔗 Gerar PDF
// //             </button>
// //           </div>
          
// //           {dadosMissao && <ToPrinter dados={dadosMissao} />}

// //           {modalAberto && dadosMissao && (
// //             <ModalEnviarEmail 
// //               dados={dadosMissao} 
// //               onClose={() => setModalAberto(false)} 
// //             />
// //           )}
// //         </div>
// //       )}
// //     </main>
// //   );
// // }

// import { useState } from 'react';
// import { FormStart } from './FormStart';
// import { ToPrinter } from './ToPrinter';
// import { ModalEnviarEmail } from './components/ModalSharePDF';
// import type { FormData } from './assets/formSchema';

// export default function App() {
//   const [dadosMissao, setDadosMissao] = useState<FormData | null>(null);
//   const [etapa, setEtapa] = useState<'formulario' | 'preview'>('formulario');
//   const [modalAberto, setModalAberto] = useState(false);

//   const lidarComPreview = (dados: FormData) => {
//     setDadosMissao(dados);
//     setEtapa('preview');
//   };

//   return (
//     <main className="flex justify-center min-h-screen print:block print:p-0 print:m-0 bg-black">
//       {etapa === 'formulario' ? (
//         <FormStart 
//           onPreview={lidarComPreview} 
//           dadosIniciais={dadosMissao} 
//         />
//       ) : (
//         <div className="flex flex-col justify-center max-w-4xl mx-auto p-1 sm:p-4 bg-gray-100 shadow-md font-sans w-full print:p-0 print:m-0 print:shadow-none print:bg-transparent print:max-w-none print:block">
          
//           <div className="no-print flex justify-evenly gap-1 text-[0.65rem] md:text-sm md:gap-4 py-4 md:rounded-lg shadow-md md:mb-4">
//             <button               
//               onClick={() => setEtapa('formulario')}
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

//             <button 
//               onClick={() => setModalAberto(true)}
//               className="bg-green-600 text-white px-4 py-2 rounded font-bold shadow-lg"
//             >
//               🔗 Gerar PDF
//             </button>
//           </div>
          
//           {dadosMissao && <ToPrinter dados={dadosMissao} />}

//           {modalAberto && dadosMissao && (
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
import type { FormData } from './assets/formSchema';
import { TelaFeedback } from './components/Feedback';

export default function App() {
  const [dadosMissao, setDadosMissao] = useState<FormData | null>(null);
  
 
  const [etapa, setEtapa] = useState<'formulario' | 'preview' | 'feedback'>('formulario');

  const lidarComPreview = (dados: FormData) => {
    setDadosMissao(dados);
    setEtapa('preview');
  };

  // const voltarParaEdicao = () => {
  //   setEtapa('formulario');
  // };

  return (
  <main className="...">
      {/* 2. Lógica para alternar entre as 3 telas */}
      {etapa === 'formulario' && (
            <FormStart 
              // 2. É AQUI que você "usa" o valor da função
              onPreview={lidarComPreview} 
              dadosIniciais={dadosMissao} 
              onAbrirFeedback={() => setEtapa('feedback')} 
            />
      )}

      {etapa === 'preview' && dadosMissao && (
        <ToPrinter 
          dados={dadosMissao} 
          onClose={() => setEtapa('formulario')} 
        />
      )}

      {etapa === 'feedback' && (
        <TelaFeedback onVoltar={() => setEtapa('formulario')} />
      )}
    </main>
);
}