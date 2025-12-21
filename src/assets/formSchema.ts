import { z } from "zod";

export const missaoSchema = z.object({
  // Campos Hard-Coded (Já vêm preenchidos)
  orgaoSubordinante: z.string().default("SEPOL"),
  upj: z.string().default("CORE"),
  regiaoAtuacao: z.string().default("V"),
  autoridade: z.string().default("Dr. Fabricio Oliveira Pereira"),

  // Campos que o usuário vai preencher
  missaoNumero: z.string().min(1, "Nº obrigatório"),
  ano: z.string().default("2025"),
  data: z.string().min(1, "Informe a data"),
  referencia: z.string().min(1, " Informe o BDT"),
  objetivo: z.string().optional(),
  viatura: z.string().min(1, "Informe a viatura"),
  placaOficial: z.string().optional(),
  kmSaida: z.string().min(1, "KM obrigatório"),
  kmChegada: z.string().optional(),
  resumo: z.string().min(10, "Preencha as missoes desempenhadas"),
});

export type MissaoData = z.infer<typeof missaoSchema>;