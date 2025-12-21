import { z } from "zod";

export const formSchema = z.object({
  orgaoSubordinante: z.string(),
  upj: z.string(),
  regiaoAtuacao: z.string(),
  autoridade: z.string(),
  ano: z.string(),
  objetivo: z.string(),
  
  missaoNumero: z.string().min(1, "Nº obrigatório"),
  data: z.string().min(1, "Informe a data"),
  referencia: z.string().min(1, "Informe o BDT"),
  viatura: z.string().min(1, "Informe a viatura"),
  kmSaida: z.string().min(1, "KM obrigatório"),
  kmChegada: z.string().min(1, "KM chegada obrogatorio"),
  resumo: z.string().min(1, "Preencha as missões desempenhadas"),
  placaOficial: z.string().min(4, "Preencha a placa oficial"),
  prefixoCod: z.string().min(4, "Preencha o Prefixo"),
  
  placaReservada: z.string().optional(),

  equipe: z.array(
    z.object({
      nome: z.string().min(1, "Nome obrigatório"),
      mat: z.string().min(1, "Matrícula obrigatória"),
    })
  ).length(4),
});

export type FormData = z.infer<typeof formSchema>;