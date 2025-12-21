// import ToPrinter from "./components/ToPrinter"
// import { FormStart } from "./FormStart"


// function App() {

//   return (
//     <>
//       <FormStart />
//       {/* <ToPrinter /> */}
//     </>
//   )
// }

// export default App

import { useState } from 'react';
import { FormStart } from './FormStart';
import { ToPrinter } from './ToPrinter';
import type { FormData } from './assets/formSchema';

export default function App() {
  // 1. Criamos um estado para guardar os dados quando o formulário for enviado
  const [dadosMissao, setDadosMissao] = useState<FormData | null>(null);

  // 2. Criamos a função que o FormStart vai chamar
  const lidarComPreview = (dados: FormData) => {
    setDadosMissao(dados);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      {!dadosMissao ? (
        // 3. Passamos a função para a propriedade (prop) onPreview
        <FormStart onPreview={lidarComPreview} />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="no-print flex gap-4">
            <button 
              onClick={() => setDadosMissao(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700"
            >
              ← Voltar para Edição
            </button>
            <button 
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Imprimir documento
            </button>
          </div>
          
          {/* 4. Exibimos o componente de impressão com os dados capturados */}
          <ToPrinter dados={dadosMissao} />
        </div>
      )}
    </main>
  );
}