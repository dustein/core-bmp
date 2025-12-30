// import type { FormData } from "./assets/formSchema";

// export function ToPrinter({ dados }: { dados: FormData }) {
//   const resumoCompleto = dados.resumo; 
//   const MAX_LINHAS = 14; 
//   const paragrafos = resumoCompleto.split('\n');

//   let linhasAcumuladas = 0;
//   let indiceCorte = paragrafos.length; 

//   for (let i = 0; i < paragrafos.length; i++) {
//     const linhasOcupadas = Math.ceil(paragrafos[i].length / 85) || 1;
//     linhasAcumuladas += linhasOcupadas;
//     if (linhasAcumuladas > MAX_LINHAS) {
//       indiceCorte = i;
//       break;
//     }
//   }

//   const textoFolha1 = paragrafos.slice(0, indiceCorte).join('\n');
//   const textoFolha2 = paragrafos.slice(indiceCorte).join('\n');
  
//   return (
//     <>
//       <div 
//         id="area-impressao" 
//         className="w-[210mm] h-[297mm] text-maiuscula font-sans pt-8 px-15 flex flex-col overflow-hidden shadow-sm print:shadow-none print:m-0"
//         style={{ backgroundColor: '#ffffff', color: '#000000' }}
//       >
//         <style dangerouslySetInnerHTML={{ __html: `
//           @media print {
//             @page { 
//               size: A4; 
//               margin: 0; 
//             }
//             body { 
//               margin: 0 !important;
//               padding: 0 !important;
//               -webkit-print-color-adjust: exact; 
//               print-color-adjust: exact; 
//             }
//             html {
//               margin: 0 !important;
//             }
//             #area-impressao {
//               margin: 0 !important;
//               border: none !important;
//               break-before: avoid; /* Impede que o navegador crie uma página em branco antes */
//             }
//             .no-print { display: none; }
//           }
//         `}} />

//         {/* CABEÇALHO */}
//         <div className="text-center mb-6">
//           <div className="w-10 h-10 mx-auto mb-5">
//             <img src="/logo-RJ.png" alt="logotipo governo do estado do rio de janeiro" />
//           </div>
//           <div className="text-maiuscula text-gray-700 font-bold leading-2.5 tracking-tighter">
//             <h3>SECRETARIA DE ESTADO DE SEGURANÇA</h3>
//             <h3>POLÍCIA CIVIL DO ESTADO DO RIO DE JANEIRO</h3>
//             <h3>BOLETIM DE MISSÃO POLICIAL - BMP</h3>
//           </div>
//         </div>

//         {/* PRIMEIRO BLOCO */}
//         <div className="flex flex-col gap-2.5 shrink-0 pt-3">
//           <div className="flex w-full items-baseline gap-4">
            
//             <div className="flex items-baseline grow">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">ÓRGÃO SUBORDINANTE</span>  
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula">{dados.orgaoSubordinante}</span>
//               </div>
//             </div>

//             <div className="flex items-baseline shrink-0">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">UPJ</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula min-w-[15ch]">{dados.upj}</span>
//               </div>
//             </div>

//           </div>

//           <div className="flex w-full items-baseline gap-4">          
//             <div className="flex items-baseline grow">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">MISSÃO Nº</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula ml-4">{dados.missaoNumero}</span>
//               </div>
//             </div>
//             <div className="flex items-baseline grow">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">DATA</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula mx-1">{dados.data} / 10</span>
//                 <span className="text-minuscula">/ 2025</span>
//               </div>
//             </div>
//             <div className="flex items-baseline shrink-0">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">REF</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula min-w-[15ch]">BDT {dados.referencia}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex w-full items-baseline gap-4">
//             <div className="flex items-baseline grow">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">NOME, CARGO E MAT. DA AUTORIDADE</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula">{dados.autoridade}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex w-full items-baseline gap-4">
//             <div className="flex items-baseline grow">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">OBJETIVO INICIAL DA MISSÃO</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula">{dados.objetivo}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex w-full items-baseline gap-4">          
//             <div className="flex items-baseline grow">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">VIATURA</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula">{dados.viatura}</span>
//               </div>
//             </div>
//             <div className="flex items-baseline shrink-0">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">PLACA OFICIAL</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula min-w-[15ch]">{dados.placaOficial}</span>
//               </div>
//             </div>
//             <div className="flex items-baseline shrink-0">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">PLACA RES.</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula min-w-[15ch]">{dados.placaReservada}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex w-full items-baseline gap-4">
//             <div className="flex items-baseline grow">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">KM SAÍDA</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula">{dados.kmSaida}</span>
//               </div>
//             </div>
//             <div className="flex items-baseline shrink-0">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">KM CHEGADA</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula min-w-[14ch]">{dados.kmChegada}</span>
//               </div>
//             </div>
//             <div className="flex items-baseline shrink-0">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">PREFIXO CÓD.</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula min-w-[15ch]">{dados.prefixoCod}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex w-full items-baseline gap-4">
//             <div className="flex items-baseline grow">
//               <span className="shrink-0 mr-1 text-maiuscula text-gray-800">REGIÃO DE ATUAÇÃO INICIAL</span>
//               <div className="flex grow ml-1 border-b border-black pb-0.5">
//                 <span className="text-minuscula">{dados.regiaoAtuacao}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col -mt-0.5">
//             {dados.equipe.map((policial, index) => (
//               <div key={index} className="flex w-full items-baseline gap-4">
//                 <div className="flex items-baseline grow pb-1.5">
//                   <span className="shrink-0 mr-1 text-maiuscula text-gray-800">
//                     {index === 0 ? "EQUIPE POLICIAL/CHEFE" : "NOME"}
//                   </span>
//                   <div className="flex grow ml-1 border-b border-black pb-0.5">
//                     <span className="text-minuscula">
//                       {policial.nome || <>&nbsp;</>}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex items-baseline shrink-0">
//                   <span className="shrink-0 mr-1 text-maiuscula text-gray-800">MAT.</span>
//                   <div className="flex grow ml-1 border-b border-black pb-0.5">
//                     <span className="text-minuscula min-w-[11ch]">
//                       {policial.mat || <>&nbsp;</>}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* SEGUNDO BLOCO */}
//         <div className="mt-6 shrink-0">
//           <div className="text-center font-bold text-[0.65rem] mb-3">OUTRAS REGIÕES DE ATUAÇÃO PERCORRIDAS</div>
//           <table style={{ borderCollapse: 'collapse', border: '1px solid #000000' }} className="w-full table-fixed">
//             <thead>
//               <tr>
//                 <th style={{ border: '1px solid #000000' }} className="p-1 w-[12%] align-middle font-normal uppercase leading-tight text-maiuscula">Horário</th>
//                 <th style={{ border: '1px solid #000000' }} className="p-1 w-[18%] align-middle font-normal uppercase leading-tight text-maiuscula">Região de Atuação (RA)</th>
//                 <th style={{ border: '1px solid #000000' }} className="p-1 w-[15%] align-middle font-normal uppercase leading-tight text-maiuscula">KM ao entrar na (RA)</th>
//                 <th style={{ border: '1px solid #000000' }} className="p-1 w-[15%] align-middle font-normal uppercase leading-tight text-maiuscula">KM ao sair da (RA)</th>
//                 <th style={{ border: '1px solid #000000' }} className="p-1 w-[40%] align-middle font-normal uppercase leading-tight text-maiuscula">Objetivo da Missão</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[0, 1, 2].map((i) => (
//                 <tr key={i} className="h-6">
//                   <td style={{ border: '1px solid #000000' }}></td>
//                   <td style={{ border: '1px solid #000000' }}></td>
//                   <td style={{ border: '1px solid #000000' }}></td>
//                   <td style={{ border: '1px solid #000000' }}></td>
//                   <td style={{ border: '1px solid #000000' }}></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="w-full mt-6 mb-4 flex-1 flex flex-col overflow-hidden">
//           <div className="text-center font-bold text-[0.65rem] underline mb-2 shrink-0">
//             RESUMO DA MISSÃO
//           </div>
//           <div className="border border-dashed border-gray-100 text-minuscula leading-relaxed flex-1 overflow-hidden p-2 whitespace-pre-wrap">
//             {textoFolha1}
//             {textoFolha2 && <p className="font-bold mt-1 text-[0.5rem]">(Continua...)</p>}
//           </div>
//         </div>

//         {/* ASSINATURAS */}
//         <div className="mt-auto pb-10 flex flex-col gap-10 shrink-0">
//           <div className="flex justify-end">
//             <div className="w-56 text-center">
//               <div className="text-minuscula mb-1">Rio de Janeiro, {dados.data}</div>
//               <div className=" border-t pt-1 uppercase text-maiuscula">
//                 (LOCAL E DATA)
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-between">
//             <div className="border-t w-56 pt-1 uppercase text-center text-maiuscula">(VISTO/AUTORIDADE POLICIAL)</div>
//             <div className="border-t w-56 pt-1 uppercase text-center text-maiuscula">(ASSINATURA, MAT. CHEFE DE EQUIPE)</div>
//           </div>
//         </div>
//       </div>

//       {/* SEGUNDA PÁGINA */}
//       {textoFolha2 && (
//         <div 
//           style={{ backgroundColor: '#ffffff', color: '#000000' }}
//           className="w-[210mm] h-[297mm] mx-auto text-maiuscula font-sans pt-12 px-12 flex flex-col shadow-sm print:shadow-none mt-10 print:mt-0"
//         >
//           <div className="text-center font-bold text-[0.65rem] underline mb-6 shrink-0">RESUMO DA MISSÃO (CONTINUAÇÃO)</div>
//           <div className="text-minuscula leading-relaxed flex-1 whitespace-pre-wrap">{textoFolha2}</div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ToPrinter;

import type { FormData } from "./assets/formSchema";
import { useState } from 'react';
import { ModalEnviarEmail } from './components/ModalSharePDF'; // Certifique-se que o nome do arquivo está correto

export function ToPrinter({ dados, onClose }: { dados: FormData; onClose: () => void }) {
  const [modalAberto, setModalAberto] = useState(false);

  const resumoCompleto = dados.resumo; 
  const MAX_LINHAS = 14; 
  const paragrafos = resumoCompleto.split('\n');

  let linhasAcumuladas = 0;
  let indiceCorte = paragrafos.length; 

  for (let i = 0; i < paragrafos.length; i++) {
    const linhasOcupadas = Math.ceil(paragrafos[i].length / 85) || 1;
    linhasAcumuladas += linhasOcupadas;
    if (linhasAcumuladas > MAX_LINHAS) {
      indiceCorte = i;
      break;
    }
  }

  const textoFolha1 = paragrafos.slice(0, indiceCorte).join('\n');
  const textoFolha2 = paragrafos.slice(indiceCorte).join('\n');
  
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center overflow-x-hidden">
      
      {/* BARRA DE AÇÕES RESPONSIVA (FIXA NO TOPO) */}
      <div className="w-full max-w-4xl p-3 sticky top-0 z-50 bg-gray-100/95 backdrop-blur shadow-sm no-print flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <button onClick={onClose} className="text-blue-800 font-bold text-xs uppercase bg-white px-3 py-1 rounded shadow-sm">
            ← Voltar
          </button>
          
          <h2 className="text-sm font-black text-gray-700 tracking-tighter italic">Revisão do BMP preenchido</h2>
        </div>
        
        <div className="text-center">          
          <button 
            onClick={() => setModalAberto(true)} 
            className="bg-green-600 text-white py-4 px-10 sm:px-20 rounded-xl font-bold text-xs sm:text-xl shadow-lg active:scale-95 transition-all"
          >
            🔗 Gerar BMP em PDF
          </button>
        </div>

      </div>

      {/* CONTAINER DE ESCALA: Reduz o tamanho visual no mobile sem alterar os mm */}
      <div className="w-full flex flex-col items-center py-4 sm:py-8">
        <div className="origin-top scale-[0.42] sm:scale-[0.7] md:scale-100 mb-[-165mm] sm:mb-[-100mm] md:mb-4 print:transform-none print:scale-100 print:m-0 print:p-0 print:block">
  
  <div 
    id="area-impressao" 
    style={{ backgroundColor: '#ffffff', color: '#000000' }}
    className="w-[210mm] h-[297mm] text-maiuscula font-sans pt-6 px-15 flex flex-col overflow-hidden shadow-2xl print:shadow-none print:border-none print:m-0"
  >
    <style dangerouslySetInnerHTML={{ __html: `
      @media print {
        @page { 
          size: A4; 
          margin: 0mm !important; 
        }
        
        html, body { 
          /* Forçamos o tamanho exato para evitar que o navegador invente margens */
          width: 210mm !important;
          height: 297mm !important;
        }

        #area-impressao {
          /* Aqui garantimos que o padding lateral (15mm) seja respeitado na impressão */
          padding: 8mm 15mm 8mm 15mm !important; 
          width: 210mm !important;
          height: 297mm !important;
          box-sizing: border-box !important;
        }

        /* Limpeza de qualquer elemento do App.tsx que possa estar ocupando espaço no topo */
        main, div { 
          
          padding-top: 0 !important;
          
          padding-bottom: 0 !important;
        }

        .no-print { display: none !important; }
      }
    `}} />

            {/* CABEÇALHO */}
            <div className="text-center mb-10">
              <div className="w-10 h-10 mx-auto mb-5">
                <img src="/logo-RJ.png" alt="logotipo governo do estado do rio de janeiro" />
              </div>
              <div className="text-maiuscula text-gray-700 font-bold leading-2.5 tracking-tighter">
                <h3>SECRETARIA DE ESTADO DE SEGURANÇA</h3>
                <h3>POLÍCIA CIVIL DO ESTADO DO RIO DE JANEIRO</h3>
                <h3>BOLETIM DE MISSÃO POLICIAL - BMP</h3>
              </div>
            </div>

            {/* PRIMEIRO BLOCO */}
            <div className="flex flex-col gap-2 shrink-0 pt-3">
              <div className="flex w-full items-baseline gap-4">
                <div className="flex items-baseline grow">
                  <span className="shrink-0 mr-1 text-maiuscula text-gray-800">ÓRGÃO SUBORDINANTE</span>  
                  <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                    <span className="text-minuscula">{dados.orgaoSubordinante}</span>
                  </div>
                </div>
              <div className="flex items-baseline shrink-0">
                <span className="shrink-0 mr-1 text-maiuscula text-gray-800">UPJ</span>
                <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                  <span className="text-minuscula min-w-[15ch]">{dados.upj}</span>
                </div>
              </div>
            </div>

            <div className="flex w-full items-baseline gap-4">          
              <div className="flex items-baseline grow">
                <span className="shrink-0 mr-1 text-maiuscula text-gray-800">MISSÃO Nº</span>
                <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                  <span className="text-minuscula ml-4">{dados.missaoNumero}</span>
                </div>
              </div>
              <div className="flex items-baseline grow">
                <span className="shrink-0 mr-1 text-maiuscula text-gray-800">DATA</span>
                <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                  <span className="text-minuscula mx-1">{dados.data} / 10 / 2025</span>
                </div>
              </div>
              <div className="flex items-baseline shrink-0">
                <span className="shrink-0 mr-1 text-maiuscula text-gray-800">REF</span>
                <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                  <span className="text-minuscula min-w-[15ch]">BDT {dados.referencia}</span>
                </div>
              </div>
            </div>

              <div className="flex w-full items-baseline gap-4">
                <div className="flex items-baseline grow">
                  <span className="shrink-0 mr-1 text-maiuscula text-gray-800">NOME, CARGO E MAT. DA AUTORIDADE</span>
                  <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                    <span className="text-minuscula">{dados.autoridade}</span>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-baseline gap-4">
                <div className="flex items-baseline grow">
                  <span className="shrink-0 mr-1 text-maiuscula text-gray-800">OBJETIVO INICIAL DA MISSÃO</span>
                  <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                    <span className="text-minuscula">{dados.objetivo}</span>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-baseline gap-4">          
                <div className="flex items-baseline grow">
                  <span className="shrink-0 mr-1 text-maiuscula text-gray-800">VIATURA</span>
                  <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                    <span className="text-minuscula">{dados.viatura}</span>
                  </div>
                </div>
                <div className="flex items-baseline shrink-0">
                  <span className="shrink-0 mr-1 text-maiuscula text-gray-800">PLACA OFICIAL</span>
                  <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                    <span className="text-minuscula min-w-[15ch]">{dados.placaOficial}</span>
                  </div>
                </div>
                <div className="flex items-baseline shrink-0">
                  <span className="shrink-0 mr-1 text-maiuscula text-gray-800">PLACA RES.</span>
                  <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                    <span className="text-minuscula min-w-[15ch]">{dados.placaReservada}</span>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-baseline gap-4">
                <div className="flex items-baseline grow">
                  <span className="shrink-0 mr-1 text-maiuscula text-gray-800">KM SAÍDA</span>
                  <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                    <span className="text-minuscula">{dados.kmSaida}</span>
                  </div>
                </div>
                <div className="flex items-baseline shrink-0">
                  <span className="shrink-0 mr-1 text-maiuscula text-gray-800">KM CHEGADA</span>
                  <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                    <span className="text-minuscula min-w-[14ch]">{dados.kmChegada}</span>
                  </div>
                </div>
                <div className="flex items-baseline shrink-0">
                  <span className="shrink-0 mr-1 text-maiuscula text-gray-800">PREFIXO CÓD.</span>
                  <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                    <span className="text-minuscula min-w-[15ch]">{dados.prefixoCod}</span>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-baseline gap-4">
                <div className="flex items-baseline grow">
                  <span className="shrink-0 mr-1 text-maiuscula text-gray-800">REGIÃO DE ATUAÇÃO INICIAL</span>
                  <div className="flex grow ml-1 border-b border-gray-800 pb-0.5">
                    <span className="text-minuscula">{dados.regiaoAtuacao}</span>
                  </div>
                </div>
              </div>

              <div>
                {dados.equipe.map((policial, index) => (
                  <div key={index} className="flex w-full items-baseline gap-4 leading-5">
                    <div className="flex items-baseline grow">
                      <span className="shrink-0 mr-1 text-maiuscula text-gray-800">
                        {index === 0 ? "EQUIPE POLICIAL/CHEFE" : "NOME"}
                      </span>
                      <div className="flex grow ml-1 border-b border-gray-800">
                        <span className="text-minuscula">{policial.nome || <>&nbsp;</>}</span>
                      </div>
                    </div>
                    <div className="flex items-baseline shrink-0">
                      <span className="shrink-0 mr-1 text-maiuscula text-gray-800">MAT.</span>
                      <div className="flex grow ml-1 border-b border-gray-800">
                        <span className="text-minuscula min-w-[11ch]">{policial.mat || <>&nbsp;</>}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEGUNDO BLOCO */}
            <div className="mt-6 shrink-0">
              <div className="text-center font-bold text-[0.65rem] mb-3">OUTRAS REGIÕES DE ATUAÇÃO PERCORRIDAS</div>
              <table style={{ borderCollapse: 'collapse', border: '1px solid #000000' }} className="w-full table-fixed text-maiuscula">
                <thead>
                  <tr>
                    <th className="border border-gray-800 p-1 w-[12%] uppercase leading-tight">Horário</th>
                    <th className="border border-gray-800 p-1 w-[18%] uppercase leading-tight">Região (RA)</th>
                    <th className="border border-gray-800 p-1 w-[15%] uppercase leading-tight">KM Entrada</th>
                    <th className="border border-gray-800 p-1 w-[15%] uppercase leading-tight">KM Saída</th>
                    <th className="border border-gray-800 p-1 w-[40%] uppercase leading-tight">Objetivo da Missão</th>
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2].map((i) => (
                    <tr key={i} className="h-6"><td className="border border-gray-800"></td><td className="border border-gray-800"></td><td className="border border-gray-800"></td><td className="border border-black"></td><td className="border border-gray-800"></td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full mt-6 mb-4 flex-1 flex flex-col overflow-hidden">
              <div className="text-center font-bold text-[0.65rem] underline mb-2 shrink-0">RESUMO DA MISSÃO</div>
              <div className="border border-dashed border-gray-100 text-minuscula leading-relaxed flex-1 overflow-hidden p-2 whitespace-pre-wrap">
                {textoFolha1}
                {textoFolha2 && <p className="font-bold mt-1 text-[0.5rem]">(Continua...)</p>}
              </div>
            </div>

            {/* ASSINATURAS */}
            <div className="mt-auto pb-10 flex flex-col gap-10 shrink-0">
              <div className="flex justify-end">
                <div className="w-56 text-center">
                  <div className="text-minuscula mb-1">Rio de Janeiro, {dados.data}</div>
                  <div className="border-t border-gray-800 pt-1 uppercase text-maiuscula">(LOCAL E DATA)</div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="border-t border-gray-800 w-56 pt-1 uppercase text-center text-maiuscula">(VISTO/AUTORIDADE POLICIAL)</div>
                <div className="border-t border-gray-800 w-56 pt-1 uppercase text-center text-maiuscula">(ASSINATURA, MAT. CHEFE DE EQUIPE)</div>
              </div>
            </div>
          </div>

          {/* SEGUNDA PÁGINA */}
          {textoFolha2 && (
            <div className="w-[210mm] h-[297mm] mx-auto bg-white text-maiuscula font-sans pt-12 px-12 flex flex-col shadow-2xl print:shadow-none mt-10 print:mt-0">
              <div className="text-center font-bold text-[0.65rem] underline mb-6 shrink-0">RESUMO DA MISSÃO (CONTINUAÇÃO)</div>
              <div className="text-minuscula leading-relaxed flex-1 whitespace-pre-wrap">{textoFolha2}</div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DE FINALIZAÇÃO: Usando z-[9999] para não vazar */}
      {modalAberto && (
        <ModalEnviarEmail dados={dados} onClose={() => setModalAberto(false)} />
      )}
    </div>
  );
}

export default ToPrinter;