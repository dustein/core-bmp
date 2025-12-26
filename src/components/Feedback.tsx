import { useState } from 'react';

export function TelaFeedback({ onVoltar }: { onVoltar: () => void }) {
  const [sugestao, setSugestao] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviarParaPlanilha = async () => {
    if (!sugestao) return;
    setEnviando(true);

    try {
      // Usando o Stein ou Sheet.best (Abordagem Simples)
      // Dentro da função enviarParaPlanilha no Feedback.tsx
      await fetch("https://api.steinhq.com/v1/storages/694ecbfcaffba40a622fe61f/Página1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          {
            // Chaves ajustadas conforme a imagem da sua planilha
            "Date": new Date().toLocaleString("pt-BR"),
            "User": "nao informou", // Você pode mudar para pegar o nome do usuário se desejar
            "Sugestion": sugestao,
            "Status": "Pendente"
          }
        ]),
      });

      alert("Sugestão enviada com sucesso! Obrigado.");
      onVoltar();
    } catch {
      alert("Erro ao enviar. Tente novamente mais tarde.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl mt-10">
        <h2 className="text-xl font-bold text-blue-900 mb-2">Melhorias na Aplicação BMP</h2>
        <p className="text-gray-600 text-sm mb-4">Tem alguma sugestão para melhorar esta ferramenta ou criar novas?</p>
        
        <textarea
          className="w-full border-2 border-gray-200 rounded-xl p-3 h-40 focus:border-blue-500 outline-none transition-all"
          placeholder="Escreva sua mensagem para o desenvolvedor..."
          value={sugestao}
          onChange={(e) => setSugestao(e.target.value)}
        />

        <button
          onClick={enviarParaPlanilha}
          disabled={enviando}
          className={`w-full mt-4 py-3 rounded-xl font-bold text-white transition-all ${
            enviando ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {enviando ? "Enviando..." : "Enviar Sugestão"}
        </button>

        <button onClick={onVoltar} className="w-full mt-2 py-2 text-gray-500 text-xs uppercase font-bold">
          Voltar ao Formulário
        </button>
      </div>
    </div>
  );
}