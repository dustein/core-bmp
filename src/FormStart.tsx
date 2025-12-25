import { useForm, useFieldArray, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData } from "./assets/formSchema";
import { Label } from "./components/Label";


interface FormStartProps {
  onPreview: (data: FormData) => void;
  dadosIniciais: FormData | null;
}

export function FormStart({ onPreview, dadosIniciais }: FormStartProps) {
  
  const dataAtual = () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
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

  const aoDarErro = (err: FieldErrors<FormData>) => {
    console.error("Campos pendentes de preenchimento:", err);
    alert("Verifique campo de preenchimento obrigatório...");
  };

  return (
    <div className="max-w-4xl mx-auto p-1 sm:p-4 bg-gray-100 shadow-md font-sans">
      <h1 className="md:text-xl font-bold text-gray-800 mb-6 border-b-2 border-blue-800 pb-2 text-center tracking-wider">
        Boletim de Missão Policial - BMP
      </h1>

      <form onSubmit={handleSubmit(aoEnviar, aoDarErro)} className="space-y-6">
        
        {/* SEÇÃO 1: CABEÇALHO E AUTORIDADE */}
        <div className="flex justify-between flex-wrap gap-2 m-0 my-2 bg-white p-4 rounded border shadow-sm border-l-2 border-l-blue-800">
          <div className="w-full">
            <Label htmlFor="orgaoSubordinante">Órgão Subordinante</Label>
            <input {...register("orgaoSubordinante")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm bg-blue-50/20" />
          </div>
          <div className="w-full">
            <Label htmlFor="upj">UPJ</Label>
            <input {...register("upj")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm bg-blue-50/20" />
          </div>
          <div className="w-full">
            <Label htmlFor="autoridade">Nome, Cargo e Mat. da Autoridade</Label>
            <input {...register("autoridade")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm bg-blue-50/20" />
          </div>
        </div>

        {/* SEÇÃO 2: DADOS DA MISSÃO */}
        <div className="flex justify-between flex-wrap gap-2 m-0 my-2 bg-white p-4 rounded border shadow-sm border-l-2 border-l-blue-800">
          <div className="w-full">
            <Label htmlFor="missaoNumero">Nº Missão</Label>
            <input {...register("missaoNumero")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm" />
            {errors.missaoNumero && (
              <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="data">Data</Label>
            <input {...register("data")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm" />
            {errors.missaoNumero && (
                <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="referencia">Ref (BDT)</Label>
            <input {...register("referencia")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm" />
            {errors.missaoNumero && (
                <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}            
          </div>
        </div>

        {/* SEÇÃO 3: VIATURA E KM */}
        <div className="flex justify-between flex-wrap gap-2 m-0 my-2 bg-white p-4 rounded border shadow-sm border-l-2 border-l-blue-800">
          <div className="w-full">
            <Label htmlFor="viatura">Viatura</Label>
            <input {...register("viatura")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm" />
            {errors.missaoNumero && (
                <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}            
          </div>
          <div className="w-full">
            <Label htmlFor="placaOficial">Placa Oficial</Label>
            <input {...register("placaOficial")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm" />
          </div>
          <div className="w-full">
            <Label htmlFor="placaReservada" className="text-sm font-bold uppercase">Placa Reservada</Label>
            <input {...register("placaReservada")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm" />
          </div>
          <div className="w-full">
            <Label htmlFor="prefixoCod">Prefixo Cód.</Label>
            <input {...register("prefixoCod")} className="w-full border p-2 rounded mt-1 text-sm font-bold text-blue-900" />
          </div>
          <div className="w-full">
            <Label htmlFor="kmSaida">KM Saída</Label>
            <input {...register("kmSaida")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm" />
            {errors.missaoNumero && (
                <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}            
          </div>
          <div className="w-full">
            <Label htmlFor="kmChegada">KM Chegada</Label>
            <input {...register("kmChegada")} className="w-full border p-2 rounded mt-1 text-sm" />
            {errors.missaoNumero && (
                <p className="text-red-600 text-sm font-bold italic">{errors.missaoNumero.message}</p>
            )}            
          </div>
        </div>

        {/* SEÇÃO 4: REGIÃO E OBJETIVO */}
        <div className="flex justify-between flex-wrap gap-2 m-0 my-2 bg-white p-4 rounded border shadow-sm border-l-2 border-l-blue-800">
          
          <div>
            <Label htmlFor="regiaoAtuacao">Região de Atuação Inicial</Label>
            <input {...register("regiaoAtuacao")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm" />
          </div>
          <div>
            <Label htmlFor="objetivo">Objetivo Inicial</Label>
            <input {...register("objetivo")} className="w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm" />
          </div>
        </div>

        {/* SEÇÃO 5: EQUIPE POLICIAL */}
        <div className="bg-white sm:p-4 rounded border shadow-sm border-l-2 border-l-blue-800">
          {fields.map((field, index) => { 
            return (
              <div 
                key={field.id} 
                // Mudamos de 'flex' para 'flex flex-col' (celular) e 'md:flex-row' (computador)
                className="flex flex-col md:flex-row gap-2 items-start p-2 rounded relative border-b border-3 md:border-none border-gray-200 m-1"
              >
                <div className="w-full md:flex-1">
                  <Label className="text-xs md:text-sm font-bold uppercase">
                    {index === 0 ? "Chefe de Equipe" : `Integrante ${index + 1}`}
                  </Label>
                  <input 
                    {...register(`equipe.${index}.nome` as const)} 
                    placeholder="Nome Completo"
                    className={`w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm focus:ring-1 ${
                      index === 0 && errors.equipe ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
                    }`} 
                  />
                  
                  {index === 0 && errors.equipe?.message && (
                    <p className="text-red-600 text-[10px] md:text-sm font-bold mt-1">
                      {errors.equipe.message}
                    </p>
                  )}
                </div>
                
                {/* 'w-full' no celular garante que o input ocupe a largura total; 'md:w-28' fixa o tamanho no PC */}
                <div className="w-full md:w-32">
                  <Label className="text-xs md:text-sm font-bold uppercase">Matrícula</Label>
                  <input 
                    {...register(`equipe.${index}.mat` as const)} 
                    placeholder="000.000"
                    className={`w-full border p-2 rounded mt-1 text-[0.65rem] md:text-sm focus:ring-1 ${
                      index === 0 && errors.equipe ? "border-red-500" : ""
                    }`} 
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* SEÇÃO 6: RELATO */}
        <div className="bg-white p-4 rounded border shadow-sm border-l-2 border-l-blue-800">
          <Label htmlFor="resumo">Resumo das Missões Desempenhadas</Label>
          <textarea 
            {...register("resumo")} 
            className="w-full border p-3 rounded mt-1 h-40 text-[0.65rem] md:text-sm font-mono focus:ring-2 focus:ring-blue-800 outline-none shadow-inner" 
            placeholder="Enumere as missões do dia..."
          />
          {errors.resumo && (
            <p className="text-red-600 text-sm font-bold italic">{errors.resumo.message}</p>
          )} 
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-800 text-white font-bold py-4 rounded-lg hover:bg-blue-900 transition-all shadow-xl active:scale-[0.98] uppercase tracking-widest text-[0.65rem] md:text-sm"
        >
          Visualizar BMP para Impressão
        </button>
      </form>
    </div>
  );
}