import { useForm, useFieldArray, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type LucideIcon,
  Shield, 
  FileText, 
  Car, 
  Users,
  Trash2, 
  AlertTriangle, 
  CheckCircle2,
  Info
} from "lucide-react";

import { formSchema, type FormData } from "./assets/formSchema";
import { Label } from "./components/Label";
import { LISTA_POLICIAIS } from "./assets/policiais";
import { LISTA_VIATURAS } from "./assets/viaturas";

interface FormStartProps {
  onPreview: (data: FormData) => void;
  dadosIniciais: FormData | null;
  onAbrirFeedback: (data: FormData) => void;
}

// --- Subcomponentes de UI Estilizados ---

function SectionHeader({ icon: Icon, title }: { icon: LucideIcon, title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-slate-200">
      <div className="p-1.5 bg-slate-100 rounded-md text-slate-700">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-sm md:text-lg font-bold text-slate-800 uppercase tracking-tight">{title}</h3>
    </div>
  );
}

// --- Componente Principal ---

export function FormStart({ onPreview, dadosIniciais, onAbrirFeedback }: FormStartProps) {
  
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
    setValue,
    getValues,
    formState: { errors } 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: dadosIniciais || {
      orgaoSubordinante: "SEPOL / SSPIO",
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

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "equipe",
  // });

  const { fields, remove } = useFieldArray({
    control,
    name: "equipe",
  });
  const aoEnviar = (data: FormData) => {
    onPreview(data);
  };

  const aoDarErro = (err: FieldErrors<FormData>) => {
    console.error("Campos pendentes:", err);
  };

  // Estilo padrão para inputs
  const inputClass = (hasError?: boolean | object) => `
    flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm font-medium
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 
    ${hasError ? "border-red-500 bg-red-50 focus:ring-red-500" : "border-slate-300 focus:border-transparent"}
  `;

  return (
    <div className="min-h-screen bg-slate-100 py-4 md:py-8 px-2 sm:px-6 font-sans">
      <div className="max-w-5xl mx-auto shadow-2xl rounded-xl overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b-4 border-blue-600">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg shadow-inner">
              <img src="/logo-core-preto-cinza.gif" alt="CORE" className="h-12 md:h-16 w-auto object-contain" />
            </div>
            <div>
              <h1 className="text-sm md:text-2xl font-black text-white uppercase tracking-tighter">Boletim de Missão Policial</h1>
              <p className="text-blue-300 text-[10px] md:text-xs font-bold tracking-widest uppercase">CORE</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(aoEnviar, aoDarErro)} className="bg-white p-4 md:p-8 space-y-8">
          
          {/* SEÇÃO 1: DADOS INSTITUCIONAIS */}
          <section>
            <SectionHeader icon={Shield} title="Dados Institucionais" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Órgão Subordinante</Label>
                <input {...register("orgaoSubordinante")} className={inputClass() + " bg-slate-50 text-slate-800"} />
              </div>
              <div>
                <Label>UPJ</Label>
                <input {...register("upj")} className={inputClass() + " bg-slate-50 text-slate-800"} />
              </div>
              <div>
                <Label>Autoridade Responsável</Label>
                <input {...register("autoridade")} className={inputClass()} />
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: DETALHES DA MISSÃO */}
          <section>
            <SectionHeader icon={FileText} title="Detalhes da Missão" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Nº Missão</Label>
                <input {...register("missaoNumero")} placeholder="Ex: 022/2025" className={inputClass(errors.missaoNumero)} inputMode="numeric" />
              </div>
              <div>
                <Label>Data</Label>
                <input {...register("data")} className={inputClass(errors.data)} inputMode="numeric" />
              </div>
              <div>
                <Label>Ref. (BDT)</Label>
                <input {...register("referencia")} className={inputClass(errors.referencia)} inputMode="numeric" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label>Região de Atuação Inicial</Label>
                <input {...register("regiaoAtuacao")} className={inputClass()} />
              </div>
              <div>
                <Label>Objetivo Inicial</Label>
                <input {...register("objetivo")} className={inputClass()} />
              </div>
            </div>
          </section>

          {/* SEÇÃO 3: VIATURA E LOGÍSTICA */}
          <section className="bg-slate-50 p-4 md:p-6 rounded-xl border border-slate-200 shadow-inner">
            <SectionHeader icon={Car} title="Viatura & Logística" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 md:col-span-1">
                <Label>Viatura (Prefixo)</Label>
                <input 
                  {...register("viatura")} 
                  list="lista-viaturas"
                  className={inputClass()}
                  onChange={(e) => {
                    const valor = e.target.value;
                    setValue("viatura", valor);
                    const vtr = LISTA_VIATURAS.find(v => v.prefixo === valor);
                    if (vtr) {
                      setValue("placaOficial", vtr.placaOficial);
                      setValue("placaReservada", vtr.placaReservada);
                    }
                  }}
                />
              </div>
              <div>
                <Label>Placa Oficial</Label>
                <input {...register("placaOficial")} className={inputClass() + " bg-slate-100 text-slate-600 uppercase"} />
              </div>
              <div>
                <Label>Placa Reservada</Label>
                <input {...register("placaReservada")} className={inputClass() + " bg-slate-100 text-slate-600 uppercase"} />
              </div>
              <div>
                <Label>Prefixo Cód.</Label>
                <input {...register("prefixoCod")} className={inputClass() + " font-bold text-slate-600 uppercase"} />
              </div>
              <div className="col-span-1">
                <Label>KM Saída</Label>
                <input {...register("kmSaida")} className={inputClass(errors.kmSaida)} inputMode="numeric" />
              </div>
              <div className="col-span-1">
                <Label>KM Chegada</Label>
                <input {...register("kmChegada")} className={inputClass(errors.kmChegada)} inputMode="numeric" />
              </div>
            </div>
          </section>

          {/* SEÇÃO 4: EQUIPE POLICIAL */}
          <section>
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 rounded-md text-slate-700">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-slate-800 uppercase tracking-tight">Equipe Policial</h3>
              </div>
              {/* <button
                type="button"
                onClick={() => append({ nome: "", mat: "" })}
                className="text-[10px] font-bold text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 transition-all flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> ADICIONAR AGENTE
              </button> */}
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col md:flex-row gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 relative group">
                  <div className="flex-1">
                    <Label className="text-[10px] text-slate-500">{index === 0 ? "CHEFE DE EQUIPE" : `AGENTE ${index + 1}`}</Label>
                    <input 
                      {...register(`equipe.${index}.nome` as const)} 
                      list="lista-nomes"
                      placeholder="Nome do Policial"
                      className={inputClass()}
                      onChange={(e) => {
                        const val = e.target.value;
                        setValue(`equipe.${index}.nome`, val);
                        const policial = LISTA_POLICIAIS.find(p => p.nome.toUpperCase() === val.toUpperCase());
                        if (policial) setValue(`equipe.${index}.mat`, policial.mat);
                      }}
                    />
                  </div>
                  <div className="w-full md:w-40">
                    <Label className="text-[10px] text-slate-500">MATRÍCULA</Label>
                    <input {...register(`equipe.${index}.mat` as const)} className={inputClass() + " font-mono text-slate-600"} placeholder="000.000" />
                  </div>
                  {index > 3 && (
                    <button type="button" onClick={() => remove(index)} className="md:mt-6 p-2 text-slate-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO 5: RESUMO DAS OPERAÇÕES */}
          <section>
            <SectionHeader icon={FileText} title="Resumo das Missões" />
            <div className="relative">
              <textarea 
                {...register("resumo")} 
                className="w-full border-2 border-slate-200 p-4 rounded-xl h-44 text-sm font-medium leading-relaxed focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none shadow-inner"
                placeholder="Descreva as missões e atividades realizadas..."
              />
              <div className="absolute bottom-3 right-3 text-slate-300 pointer-events-none">
                <FileText className="w-8 h-8 opacity-20" />
              </div>
            </div>
            {errors.resumo && <p className="text-red-600 text-xs font-bold mt-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.resumo.message}</p>}
          </section>

          {/* AÇÕES FINAIS */}
          <div className="pt-8 border-t border-slate-100 space-y-4">
            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 tracking-widest text-sm uppercase"
            >
              <CheckCircle2 className="w-5 h-5" />
              Visualizar e Gerar BMP
            </button>

            <button 
              type="button"
              onClick={() => {
                const valoresAtuais = getValues(); // Extrai os dados do useForm
                onAbrirFeedback(valoresAtuais);   // Envia os dados para o App.tsx
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-blue-600 transition-colors bg-slate-50 rounded-lg border border-dashed border-slate-300"
            >
              <Info className="w-3 h-3" /> Sugerir melhoria ou relatar erro no sistema
            </button>
          </div>
        </form>

        {/* FOOTER */}
        <footer className="bg-slate-50 p-4 text-center border-t border-slate-200">
          <p className="text-[10px] text-slate-300 font-bold tracking-widest">
            Desenvolvido por{" "}
            <a href="https://dustein.com" target="_blank" rel="noopener" className="text-blue-200 hover:underline">DuStein</a>
          </p>
        </footer>
      </div>

      {/* DATALISTS */}
      <datalist id="lista-nomes">
        {LISTA_POLICIAIS.map((p) => (
          <option key={p.mat} value={p.nome} />
        ))}
      </datalist>
      <datalist id="lista-viaturas">
        {LISTA_VIATURAS.map((v) => (
          <option key={v.prefixo} value={v.prefixo}>{v.placaOficial}</option>
        ))}
      </datalist>
    </div>
  );
}