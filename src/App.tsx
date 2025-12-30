import { useState } from 'react';
import { FormStart } from './FormStart';
import { ToPrinter } from './ToPrinter';
import type { FormData } from './assets/formSchema';
import { TelaFeedback } from './components/Feedback';
import { TelaLogin } from './TelaLogin';

export default function App() {
  const [dadosMissao, setDadosMissao] = useState<FormData | null>(null);
  
  const [isAutenticado, setIsAutenticado] = useState(false);

  const [etapa, setEtapa] = useState<'formulario' | 'preview' | 'feedback'>('formulario');

  const lidarComPreview = (dados: FormData) => {
    setDadosMissao(dados);
    setEtapa('preview');
  };

  // const voltarParaEdicao = () => {
  //   setEtapa('formulario');
  // };

  // Função para gerenciar o salvamento e a troca de tela
  const lidarComFeedback = (dadosAtuais: FormData) => {
    setDadosMissao(dadosAtuais); // Salva o progresso atual no "corredor" (App)
    setEtapa('feedback');
  };

  if (!isAutenticado) {
    return <TelaLogin onEntrar={() => setIsAutenticado(true)} />;
  }
  
  return (
  <main className="...">
      {/* Lógica para alternar entre as 3 telas */}
      {etapa === 'formulario' && (
            <FormStart               
              onPreview={lidarComPreview} 
              dadosIniciais={dadosMissao} 
              onAbrirFeedback={lidarComFeedback} 
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