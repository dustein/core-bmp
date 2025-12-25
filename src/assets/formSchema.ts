import { z } from "zod";

export const formSchema = z.object({
  orgaoSubordinante: z.string(),
  upj: z.string(),
  regiaoAtuacao: z.string(),
  autoridade: z.string(),
  objetivo: z.string(),
  placaOficial: z.string().optional(),
  placaReservada: z.string().optional(),
  prefixoCod: z.string().optional(),

  
  missaoNumero: z.string().min(1, "Nº BMP Obrigatório"),
  data: z.string().min(1, "Informe a data"),
  referencia: z.string().min(1, "Informe o BDT"),
  viatura: z.string().min(1, "Informe a viatura"),
  kmSaida: z.string().min(1, "KM de Saída Obrigatório"),
  kmChegada: z.string().min(1, "KM de Chegada Obrigatório"),
  resumo: z.string().min(1, "Preencha as missões desempenhadas"),
  

  equipe: z.array(
    z.object({
      nome: z.string().optional(),
      mat: z.string().optional(),
    })
    ).refine((data) => {
      // Validação: O primeiro integrante (index 0) DEVE ter nome e mat preenchidos
      const chefe = data[0];
      return chefe?.nome && chefe.nome.trim() !== "" && chefe?.mat && chefe.mat.trim() !== "";
    }, {
      message: "O Chefe de Equipe (primeira linha) é obrigatório",
      path: [0, "nome"], // Aponta o erro para o nome do primeiro integrante
    }),
  });

export type FormData = z.infer<typeof formSchema>;