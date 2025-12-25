import { useForm, useFieldArray, type FieldErrors } from "react-hook-form"; // Corrigido para type-only import
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData } from "./assets/formSchema";

// Interface atualizada para aceitar os dados vindos do App.tsx
interface FormStartProps {
  onPreview: (data: FormData) => void;
  dadosIniciais: FormData | null;
}

export function FormStart({ onPreview, dadosIniciais }: FormStartProps) {
  
  const dataAtual = () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = hoje.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    // Agora o formulário prioriza os dados salvos em dadosIniciais
    defaultValues: dadosIniciais || {
      orgaoSubordinante: "SEPOL/SSPIO",
      upj: "CORE",
      regiaoAtuacao: "V",
      autoridade: "Dr. Fabrício de Oliveira Pereira",
      objetivo: "X",
      data: dataAtual(),
      referencia: "",
      missaoNumero: "",
      viatura: "",
      placaOficial: "",
      placaReservada: "",
      prefixoCod: "",
      kmSaida: "",
      kmChegada: "",
      resumo: "",
      equipe: [
        { nome: "", mat: "" },
        { nome: "", mat: "" },
        { nome: "", mat: "" },
        { nome: "", mat: "" },
      ]
    }
  });

  const { fields } = useFieldArray({
    control,
    name: "equipe",
  });

  const aoEnviar = (data: FormData) => {
    onPreview(data);
  };

  // Tipagem corrigida para satisfazer o ESLint e o verbatimModuleSyntax
  const aoDarErro = (err: FieldErrors<FormData>) => {
    console.error("Campos pendentes de preenchimento:", err);
    alert("Verifique campo de preenchimento obrigatório...");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md my-10 font-sans border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-blue-800 pb-2 text-center uppercase tracking-wider">
        Boletim de Missão Policial - BMP
      </h2>

      <form onSubmit={handleSubmit(aoEnviar, aoDarErro)} className="space-y-6">
        
        {/* SEÇÃO 1: CABEÇALHO E AUTORIDADE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded border shadow-sm">
          <div>
            <label className="text-sm font-bold uppercase">Órgão Subordinante</label>
            <input {...register("orgaoSubordinante")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/20" />
          </div>
          <div>
            <label className="text-sm font-bold uppercase">UPJ</label>
            <input {...register("upj")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/20" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-bold uppercase">Nome, Cargo e Mat. da Autoridade</label>
            <input {...register("autoridade")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/20" />
          </div>
        </div>

        {/* SEÇÃO 2: DADOS DA MISSÃO */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded border shadow-sm">
          <div>
            <label className="text-sm font-bold uppercase">Nº Missão</label>
            <input {...register("missaoNumero")} className="w-full border p-2 rounded mt-1 text-sm" />
            {errors.missaoNumero && (
              <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-bold uppercase">Data</label>
            <input {...register("data")} className="w-full border p-2 rounded mt-1 text-sm" />
            {errors.missaoNumero && (
                <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-bold uppercase">Ref (BDT)</label>
            <input {...register("referencia")} className="w-full border p-2 rounded mt-1 text-sm" />
            {errors.missaoNumero && (
                <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}            
          </div>
        </div>

        {/* SEÇÃO 3: VIATURA E KM */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white p-4 rounded border shadow-sm border-l-4 border-l-blue-800">
          <div>
            <label className="text-sm font-bold uppercase">Viatura</label>
            <input {...register("viatura")} className="w-full border p-2 rounded mt-1 text-sm" />
            {errors.missaoNumero && (
                <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}            
          </div>
          <div>
            <label className="text-sm font-bold uppercase">Placa Oficial</label>
            <input {...register("placaOficial")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
          <div>
            <label className="text-sm font-bold uppercase">Placa Reservada</label>
            <input {...register("placaReservada")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
          <div>
            <label className="text-sm font-bold uppercase">Prefixo Cód.</label>
            <input {...register("prefixoCod")} className="w-full border p-2 rounded mt-1 text-sm font-bold text-blue-900" />
          </div>
          <div>
            <label className="text-sm font-bold uppercase">KM Saída</label>
            <input {...register("kmSaida")} className="w-full border p-2 rounded mt-1 text-sm" />
            {errors.missaoNumero && (
                <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}            
          </div>
          <div>
            <label className="text-sm font-bold uppercase">KM Chegada</label>
            <input {...register("kmChegada")} className="w-full border p-2 rounded mt-1 text-sm" />
            {errors.missaoNumero && (
                <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}            
          </div>
        </div>

        {/* SEÇÃO 4: REGIÃO E OBJETIVO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold uppercase">Região de Atuação Inicial</label>
            <input {...register("regiaoAtuacao")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
          <div>
            <label className="text-sm font-bold uppercase">Objetivo Inicial</label>
            <input {...register("objetivo")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
        </div>

        {/* SEÇÃO 5: EQUIPE POLICIAL */}
        {fields.map((field, index) => { 
          return (
            <div key={field.id} className="flex gap-2 items-start p-2 rounded relative">
              <div className="flex-1">
                <label className="text-sm font-bold uppercase">
                  {index === 0 ? "Chefe de Equipe" : `Integrante ${index + 1}`}
                </label>
                <input 
                  {...register(`equipe.${index}.nome` as const)} 
                  placeholder="Nome Completo"
                  className={`w-full border p-2 rounded mt-1 text-xs focus:ring-1 ${
                    index === 0 && errors.equipe ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
                  }`} 
                />
                
                {/* O erro agora é exibido via errors.equipe.message, conforme definido no seu .refine() */}
                {index === 0 && errors.equipe?.message && (
                  <p className="text-red-600 text-sm font-bold mt-1">
                    {errors.equipe.message}
                  </p>
                )}
              </div>
              
              <div className="w-28">
                <label className="text-sm font-bold uppercase">Matrícula</label>
                <input 
                  {...register(`equipe.${index}.mat` as const)} 
                  placeholder="000.000"
                  className={`w-full border p-2 rounded mt-1 text-xs focus:ring-1 ${
                    index === 0 && errors.equipe ? "border-red-500" : ""
                  }`} 
                />
              </div>
            </div>
          );
        })}

        {/* SEÇÃO 6: RELATO */}
        <div>
          <label className="text-sm font-bold uppercase">Resumo das Missões Desempenhadas</label>
          <textarea 
            {...register("resumo")} 
            className="w-full border p-3 rounded mt-1 h-40 text-sm font-mono focus:ring-2 focus:ring-blue-800 outline-none shadow-inner" 
            placeholder="Relate detalhadamente as missões do dia..."
          />
          {errors.resumo && (
            <p className="text-red-600 text-sm font-bold italic">{errors.resumo.message}</p>
          )} 
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-800 text-white font-bold py-4 rounded-lg hover:bg-blue-900 transition-all shadow-xl active:scale-[0.98] uppercase tracking-widest text-sm"
        >
          Visualizar BMP para Impressão
        </button>
      </form>
    </div>
  );
}