// import { useForm, useFieldArray } from "react-hook-form"; // Importe o useFieldArray
// import { zodResolver } from "@hookform/resolvers/zod";
// import { formSchema, type FormData } from "./assets/formSchema";

// export function FormStart({ onPreview }: { onPreview: (data: FormData) => void }) {
//   const { 
//     register, 
//     handleSubmit, 
//     control, // Necessário para o FieldArray
//     formState: { errors } 
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       orgaoSubordinante: "SEPOL / SSPIO",
//       upj: "CORE",
//       regiaoAtuacao: "V",
//       autoridade: "Dr. Fabrício de Oliveira Pereira",
//       ano: "2025",
//       objetivo: "X",
//       data: "10/10/2025",
//       // Iniciamos com 4 campos vazios
//       equipe: [
//         { nome: "", mat: "" },
//         { nome: "", mat: "" },
//         { nome: "", mat: "" },
//         { nome: "", mat: "" },
//       ]
//     }
//   });

//   const { fields } = useFieldArray({
//     control,
//     name: "equipe",
//   });

  
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md my-10 font-sans">
//       <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2 text-center uppercase">
//         Boletim de Missão Policial - BMP
//       </h2>

//       <form onSubmit={handleSubmit(onPreview)} className="space-y-6">
        
//         {/* SEÇÃO 1: CABEÇALHO E AUTORIDADE (Agora Editáveis) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded border shadow-sm">
//           <div>
//             <label className="text-xs font-bold text-blue-800 uppercase">Órgão Subordinante</label>
//             <input {...register("orgaoSubordinante")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/30" />
//           </div>
//           <div>
//             <label className="text-xs font-bold text-blue-800 uppercase">UPJ</label>
//             <input {...register("upj")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/30" />
//           </div>
//           <div className="md:col-span-2">
//             <label className="text-xs font-bold text-blue-800 uppercase">Nome, Cargo e Mat. da Autoridade</label>
//             <input {...register("autoridade")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/30" />
//           </div>
//         </div>

//         {/* SEÇÃO 2: DADOS DA MISSÃO */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div>
//             <label className="text-xs font-bold uppercase">Nº Missão</label>
//             <input {...register("missaoNumero")} className="w-full border p-2 rounded mt-1" placeholder="Ex: 042" />
//           </div>
//           <div>
//             <label className="text-xs font-bold uppercase">Data (DD/MM)</label>
//             <input {...register("data")} className="w-full border p-2 rounded mt-1" />
//           </div>
//           <div>
//             <label className="text-xs font-bold uppercase">Ref (BDT)</label>
//             <input {...register("referencia")} className="w-full border p-2 rounded mt-1" />
//           </div>
//         </div>

//         {/* SEÇÃO 3: VIATURA E KM */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white p-4 rounded border shadow-sm">
//           <div>
//             <label className="text-xs font-bold uppercase">Viatura</label>
//             <input {...register("viatura")} className="w-full border p-2 rounded mt-1" />
//           </div>
//           <div>
//             <label className="text-xs font-bold uppercase">Placa Oficial</label>
//             <input {...register("placaOficial")} className="w-full border p-2 rounded mt-1" />
//           </div>
//           <div>
//             <label className="text-xs font-bold uppercase">Placa Reservada</label>
//             <input {...register("placaReservada")} className="w-full border p-2 rounded mt-1" />
//           </div>
//           <div>
//             <label className="text-xs font-bold uppercase">KM Saída</label>
//             <input {...register("kmSaida")} className="w-full border p-2 rounded mt-1" />
//           </div>
//           <div>
//             <label className="text-xs font-bold uppercase">KM Chegada</label>
//             <input {...register("kmChegada")} className="w-full border p-2 rounded mt-1" />
//           </div>
//         </div>

//         {/* SEÇÃO 4: REGIÃO E OBJETIVO */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-xs font-bold uppercase">Região de Atuação Inicial</label>
//             <input {...register("regiaoAtuacao")} className="w-full border p-2 rounded mt-1 text-sm" />
//           </div>
//           <div>
//             <label className="text-xs font-bold uppercase">Objetivo Inicial</label>
//             <input {...register("objetivo")} className="w-full border p-2 rounded mt-1 text-sm" />
//           </div>
//         </div>

//       {/* SEÇÃO 5: EQUIPE POLICIAL */}
//         <div className="bg-white p-4 rounded border shadow-sm space-y-4">
//           <h3 className="text-xs font-bold text-blue-800 uppercase border-b pb-1">Equipe Policial</h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
//             {fields.map((field, index) => (
//               <div key={field.id} className="flex gap-2 items-start">
//                 <div className="flex-1">
//                   <label className="text-[10px] font-bold uppercase text-gray-500">
//                     {index === 0 ? "Chefe de Equipe" : `Policial ${index + 1}`}
//                   </label>
//                   <input 
//                     {...register(`equipe.${index}.nome`)} 
//                     placeholder="Nome Completo"
//                     className="w-full border p-2 rounded mt-1 text-sm focus:ring-1 focus:ring-blue-400" 
//                   />
//                   {errors.equipe?.[index]?.nome && <p className="text-red-500 text-[9px]">{errors.equipe[index]?.nome?.message}</p>}
//                 </div>
//                 <div className="w-32">
//                   <label className="text-[10px] font-bold uppercase text-gray-500">Matrícula</label>
//                   <input 
//                     {...register(`equipe.${index}.mat`)} 
//                     placeholder="000.000-0"
//                     className="w-full border p-2 rounded mt-1 text-sm focus:ring-1 focus:ring-blue-400" 
//                   />
//                   {errors.equipe?.[index]?.mat && <p className="text-red-500 text-[9px]">{errors.equipe[index]?.mat?.message}</p>}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* SEÇÃO 5: RELATO */}
//         <div>
//           <label className="text-xs font-bold uppercase">Resumo da Missão</label>
//           <textarea 
//             {...register("resumo")} 
//             className="w-full border p-2 rounded mt-1 h-40 text-sm font-mono focus:ring-2 focus:ring-blue-500" 
//             placeholder="Relate o desenvolvimento da missão..."
//           />
//           {errors.resumo && <p className="text-red-600 text-[10px] mt-1 font-bold">{errors.resumo.message}</p>}
//         </div>

//         <button 
//           type="submit" 
//           className="w-full bg-blue-800 text-white font-bold py-4 rounded-lg hover:bg-blue-900 transition-all shadow-lg active:scale-[0.98]"
//         >
//           GERAR DOCUMENTO PARA IMPRESSÃO
//         </button>
//       </form>
//     </div>
//   );
// }






















import { useForm, useFieldArray, type FieldErrors } from "react-hook-form"; // Corrigido para type-only import
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData } from "./assets/formSchema";

export function FormStart({ onPreview }: { onPreview: (data: FormData) => void }) {
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgaoSubordinante: "SEPOL / SSPIO",
      upj: "CORE",
      regiaoAtuacao: "V",
      autoridade: "Dr. Fabrício de Oliveira Pereira",
      objetivo: "X",
      data: "10/10/2025",
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
    alert("Por favor, preencha todos os campos obrigatórios (Equipe, Missão, KM, etc).");
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
            <label className="text-[10px] font-bold text-blue-800 uppercase">Órgão Subordinante</label>
            <input {...register("orgaoSubordinante")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/20" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-blue-800 uppercase">UPJ</label>
            <input {...register("upj")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/20" />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold text-blue-800 uppercase">Nome, Cargo e Mat. da Autoridade</label>
            <input {...register("autoridade")} className="w-full border p-2 rounded mt-1 text-sm bg-blue-50/20" />
          </div>
        </div>

        {/* SEÇÃO 2: DADOS DA MISSÃO */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded border shadow-sm">
          <div>
            <label className="text-[10px] font-bold uppercase">Nº Missão</label>
            <input {...register("missaoNumero")} className="w-full border p-2 rounded mt-1 text-sm" placeholder="Ex: 042" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase">Data (DD/MM/AAAA)</label>
            <input {...register("data")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase">Ref (BDT)</label>
            <input {...register("referencia")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
        </div>

        {/* SEÇÃO 3: VIATURA E KM */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white p-4 rounded border shadow-sm border-l-4 border-l-blue-800">
          <div>
            <label className="text-[10px] font-bold uppercase">Viatura</label>
            <input {...register("viatura")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase">Placa Oficial</label>
            <input {...register("placaOficial")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase">Placa Reservada</label>
            <input {...register("placaReservada")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase">Prefixo Cód. (Rádio)</label>
            <input {...register("prefixoCod")} className="w-full border p-2 rounded mt-1 text-sm font-bold text-blue-900" placeholder="Ex: Zeus 021" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase">KM Saída</label>
            <input {...register("kmSaida")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase">KM Chegada</label>
            <input {...register("kmChegada")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
        </div>

        {/* SEÇÃO 4: REGIÃO E OBJETIVO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-600">Região de Atuação Inicial</label>
            <input {...register("regiaoAtuacao")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-600">Objetivo Inicial</label>
            <input {...register("objetivo")} className="w-full border p-2 rounded mt-1 text-sm" />
          </div>
        </div>

        {/* SEÇÃO 5: EQUIPE POLICIAL */}
        <div className="bg-white p-4 rounded border shadow-sm space-y-4 border-t-4 border-t-blue-800">
          <h3 className="text-xs font-bold text-blue-800 uppercase border-b pb-1">Equipe Policial (Todos Obrigatórios)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start bg-gray-50 p-2 rounded">
                <div className="flex-1">
                  <label className="text-[9px] font-bold uppercase text-gray-500 italic">
                    {index === 0 ? "Chefe de Equipe" : `Integrante ${index + 1}`}
                  </label>
                  <input 
                    {...register(`equipe.${index}.nome` as const)} 
                    placeholder="Nome Completo"
                    className="w-full border p-2 rounded mt-1 text-xs focus:ring-1 focus:ring-blue-400" 
                  />
                </div>
                <div className="w-28">
                  <label className="text-[9px] font-bold uppercase text-gray-500 italic">Matrícula</label>
                  <input 
                    {...register(`equipe.${index}.mat` as const)} 
                    placeholder="000.000"
                    className="w-full border p-2 rounded mt-1 text-xs focus:ring-1 focus:ring-blue-400" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEÇÃO 6: RELATO */}
        <div>
          <label className="text-xs font-bold uppercase text-blue-800">Resumo das Missões Desempenhadas</label>
          <textarea 
            {...register("resumo")} 
            className="w-full border p-3 rounded mt-1 h-40 text-sm font-mono focus:ring-2 focus:ring-blue-800 outline-none shadow-inner" 
            placeholder="Relate detalhadamente as missões do dia..."
          />
          {errors.resumo && <p className="text-red-600 text-[10px] mt-1 font-bold italic">{errors.resumo.message}</p>}
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