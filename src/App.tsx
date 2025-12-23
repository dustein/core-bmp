// import { useState } from 'react';
// import { FormStart } from './FormStart';
// import { ToPrinter } from './ToPrinter';
// import { ModalEnviarEmail } from './components/ModalEmailPDF'; // Importe o modal aqui
// import type { FormData } from './assets/formSchema';

// export default function App() {
//   const [dadosMissao, setDadosMissao] = useState<FormData | null>(null);
  
//   // Estado para controlar se o modal de e-mail está aberto ou fechado
//   const [modalAberto, setModalAberto] = useState(false);

//   const lidarComPreview = (dados: FormData) => {
//     setDadosMissao(dados);
//   };

//   return (
//     <main className="min-h-screen bg-gray-100 py-10">
//       {!dadosMissao ? (
//         <FormStart onPreview={lidarComPreview} />
//       ) : (
//         <div className="flex flex-col items-center gap-4">
//           {/* BARRA DE FERRAMENTAS SUPERIOR (Não sai na impressão) */}
//           <div className="no-print flex gap-4 bg-white p-4 rounded-lg shadow-md mb-4">
//             <button 
//               onClick={() => setDadosMissao(null)}
//               className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700 font-bold"
//             >
//               ← Editar
//             </button>
            
//             <button 
//               onClick={() => window.print()}
//               className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 font-bold"
//             >
//               🖨️ Imprimir BPM
//             </button>

//             {/* BOTÃO QUE ABRE O MODAL DE E-MAIL */}
//             <button 
//               onClick={() => setModalAberto(true)} 
//               className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 font-bold flex items-center gap-2"
//             >
//               <span>🔗</span> Enviar PDF
//             </button>
//           </div>
          
//           {/* 4. Exibimos o componente de impressão com os dados capturados */}
//           <ToPrinter dados={dadosMissao} />

//           {/* 5. Se o modal estiver aberto, ele aparece por cima de tudo */}
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
import { ModalEnviarEmail } from './components/ModalSharePDF'; // Certifique-se que o nome do arquivo bate
import type { FormData } from './assets/formSchema';

export default function App() {
  const [dadosMissao, setDadosMissao] = useState<FormData | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      {!dadosMissao ? (
        <FormStart onPreview={(dados) => setDadosMissao(dados)} />
      ) : (
        <div className="flex flex-col items-center gap-4">
          {/* BARRA DE FERRAMENTAS */}
          <div className="no-print flex gap-4 bg-white p-4 rounded-lg shadow-md mb-4">
            <button 
              onClick={() => setDadosMissao(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded font-bold"
            >
              ← VOLTAR
            </button>
            
            <button 
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded font-bold"
            >
              🖨️ IMPRIMIR (BROWSER)
            </button>

            {/* ESTE BOTÃO CHAMA O NOVO MODAL COM JSPDF */}
            <button 
              onClick={() => setModalAberto(true)}
              className="bg-green-600 text-white px-4 py-2 rounded font-bold shadow-lg"
            >
              🔗 GERAR E COMPARTILHAR PDF
            </button>
          </div>
          
          {/* Preview visual na tela */}
          <ToPrinter dados={dadosMissao} />

          {/* O Modal que agora usa o pdfService.ts interno */}
          {modalAberto && (
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