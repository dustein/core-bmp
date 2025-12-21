import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData } from "./assets/formSchema";

export function FormStart({ onPreview }: { onPreview: (data: FormData) => void }) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Valores Pré-preenchidos (Editáveis)
      orgaoSubordinante: "SEPOL / SSPIO",
      upj: "CORE",
      regiaoAtuacao: "V",
      autoridade: "Dr. Fabrício de Oliveira Pereira",
      ano: "2025",
      objetivo: "X",
      data: "28/10", // Exemplo de pré-preenchimento
    }
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md my-10 font-sans">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2 text-center uppercase">
        Boletim de Missão Policial - BMP
      </h2>

      <form onSubmit={handleSubmit(onPreview)} className="space-y-6">
        
        {/* SEÇÃO 1: CABEÇALHO E AUTORIDADE (Agora Editáveis) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded border shadow-sm">
          <div>
            <label className="text-xs font-bold text-blue-800 uppercase">Órgão Subordinante</label>
            <input {...register("orgaoSubordinante")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/30" />
          </div>
          <div>
            <label className="text-xs font-bold text-blue-800 uppercase">UPJ</label>
            <input {...register("upj")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/30" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-blue-800 uppercase">Nome, Cargo e Mat. da Autoridade</label>
            <input {...register("autoridade")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/30" />
          </div>
        </div>

        {/* SEÇÃO 2: DADOS DA MISSÃO */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold uppercase">Nº Missão</label>
            <input {...register("missaoNumero")} className="w-full border p-2 rounded mt-1" placeholder="Ex: 042" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase">Data (DD/MM)</label>
            <input {...register("data")} className="w-full border p-2 rounded mt-1" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase">Ref (BDT)</label>
            <input {...register("referencia")} className="w-full border p-2 rounded mt-1" />
          </div>
        </div>

        {/* SEÇÃO 3: VIATURA E KM */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white p-4 rounded border shadow-sm">
          <div>
            <label className="text-xs font-bold uppercase">Viatura</label>
            <input {...register("viatura")} className="w-full border p-2 rounded mt-1" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase">Placa Oficial</label>
            <input {...register("placaOficial")} className="w-full border p-2 rounded mt-1" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase">Placa Reservada</label>
            <input {...register("placaReservada")} className="w-full border p-2 rounded mt-1" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase">KM Saída</label>
            <input {...register("kmSaida")} className="w-full border p-2 rounded mt-1" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase">KM Chegada</label>
            <input {...register("kmChegada")} className="w-full border p-2 rounded mt-1" />
          </div>
        </div>

        {/* SEÇÃO 4: REGIÃO E OBJETIVO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase">Região de Atuação Inicial</label>
            <input {...register("regiaoAtuacao")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase">Objetivo Inicial</label>
            <input {...register("objetivo")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
        </div>

        {/* SEÇÃO 5: RELATO */}
        <div>
          <label className="text-xs font-bold uppercase">Resumo da Missão</label>
          <textarea 
            {...register("resumo")} 
            className="w-full border p-2 rounded mt-1 h-40 text-sm font-mono focus:ring-2 focus:ring-blue-500" 
            placeholder="Relate o desenvolvimento da missão..."
          />
          {errors.resumo && <p className="text-red-600 text-[10px] mt-1 font-bold">{errors.resumo.message}</p>}
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-800 text-white font-bold py-4 rounded-lg hover:bg-blue-900 transition-all shadow-lg active:scale-[0.98]"
        >
          GERAR DOCUMENTO PARA IMPRESSÃO
        </button>
      </form>
    </div>
  );
}