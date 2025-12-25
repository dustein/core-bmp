import type { FormData } from "./assets/formSchema";

export function ToPrinter({ dados }: { dados: FormData }) {
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
    <>
      <div 
        id="area-impressao" 
        style={{ backgroundColor: '#ffffff', color: '#000000' }}
        className="w-[210mm] h-[297mm] mx-auto text-maiuscula font-sans pt-8 px-15 flex flex-col overflow-hidden shadow-sm print:shadow-none"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page { size: A4; margin: 0; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .no-print { display: none; }
            html, body { width: 210mm; height: 297mm; }
          }
        `}} 
        />

        {/* CABEÇALHO */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 mx-auto mb-5">
            <img src="/logo-RJ.png" alt="logotipo governo do estado do rio de janeiro" />
          </div>
          <div className="text-maiuscula font-bold leading-2.5 tracking-tighter">
            <h3>SECRETARIA DE ESTADO DE SEGURANÇA</h3>
            <h3>POLÍCIA CIVIL DO ESTADO DO RIO DE JANEIRO</h3>
            <h3>BOLETIM DE MISSÃO POLICIAL - BMP</h3>
          </div>
        </div>

        {/* PRIMEIRO BLOCO */}
        <div className="flex flex-col gap-2.5 shrink-0">
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1 text-maiuscula">ÓRGÃO SUBORDINANTE</span>
              {/* AJUSTE: padding-bottom para o texto não bater na linha */}
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula">{dados.orgaoSubordinante}</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1 text-maiuscula">UPJ</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula min-w-[15ch]">{dados.upj}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1 text-maiuscula">MISSÃO Nº</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula ml-4">{dados.missaoNumero}</span>
              </div>
            </div>
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1 text-maiuscula">DATA</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula mx-1">{dados.data} / 10</span>
                <span className="text-minuscula">/ 2025</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1 text-maiuscula">REF</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula min-w-[15ch]">BDT {dados.referencia}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-baseline gap-4">
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1 text-maiuscula">NOME, CARGO E MAT. DA AUTORIDADE</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula">{dados.autoridade}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-baseline gap-4">
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1 text-maiuscula">OBJETIVO INICIAL DA MISSÃO</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula">{dados.objetivo}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1 text-maiuscula">VIATURA</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula">{dados.viatura}</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1 text-maiuscula">PLACA OFICIAL</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula min-w-[15ch]">{dados.placaOficial}</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1 text-maiuscula">PLACA RES.</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula min-w-[15ch]">{dados.placaReservada}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1 text-maiuscula">KM SAÍDA</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula">{dados.kmSaida}</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1 text-maiuscula">KM CHEGADA</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula min-w-[14ch]">{dados.kmChegada}</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1 text-maiuscula">PREFIXO CÓD.</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                <span className="text-minuscula min-w-[15ch]">{dados.prefixoCod}</span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-baseline gap-4 mt-2">
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1 text-maiuscula">REGIÃO DE ATUAÇÃO INICIAL</span>
              <div style={{ borderBottom: '1px solid #000000', paddingBottom: '1px' }} className="flex grow ml-1">
                <span className="text-minuscula">{dados.regiaoAtuacao}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {dados.equipe.map((policial, index) => (
              <div key={index} className="flex w-full items-baseline gap-4">          
                <div className="flex items-baseline grow">
                  <span className="shrink-0 mr-1 text-maiuscula">
                    {index === 0 ? "EQUIPE POLICIAL/CHEFE" : "NOME"}
                  </span>
                  <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                    <span className="text-minuscula">
                      {policial.nome || <>&nbsp;</>}
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline shrink-0">
                  <span className="shrink-0 mr-1 text-[0.65rem]">MAT.</span>
                  <div style={{ borderBottom: '1px solid #000000', paddingBottom: '2px' }} className="flex grow ml-1">
                    <span className="text-minuscula min-w-[11ch]">
                      {policial.mat || <>&nbsp;</>}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEGUNDO BLOCO */}
        <div className="mt-6 shrink-0">
          <div className="text-center font-bold text-[0.65rem] mb-3">OUTRAS REGIÕES DE ATUAÇÃO PERCORRIDAS</div>
          <table style={{ borderCollapse: 'collapse', border: '1px solid #000000' }} className="w-full table-fixed">
            <thead>
              <tr>
                <th style={{ border: '1px solid #000000' }} className="p-1 w-[12%] align-middle font-normal uppercase leading-tight text-maiuscula">Horário</th>
                <th style={{ border: '1px solid #000000' }} className="p-1 w-[18%] align-middle font-normal uppercase leading-tight text-maiuscula">Região de Atuação (RA)</th>
                <th style={{ border: '1px solid #000000' }} className="p-1 w-[15%] align-middle font-normal uppercase leading-tight text-maiuscula">KM ao entrar na (RA)</th>
                <th style={{ border: '1px solid #000000' }} className="p-1 w-[15%] align-middle font-normal uppercase leading-tight text-maiuscula">KM ao sair da (RA)</th>
                <th style={{ border: '1px solid #000000' }} className="p-1 w-[40%] align-middle font-normal uppercase leading-tight text-maiuscula">Objetivo da Missão</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2].map((i) => (
                <tr key={i} className="h-6">
                  <td style={{ border: '1px solid #000000' }}></td>
                  <td style={{ border: '1px solid #000000' }}></td>
                  <td style={{ border: '1px solid #000000' }}></td>
                  <td style={{ border: '1px solid #000000' }}></td>
                  <td style={{ border: '1px solid #000000' }}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full mt-6 mb-4 flex-1 flex flex-col overflow-hidden">
          <div className="text-center font-bold text-[0.65rem] underline mb-2 shrink-0">
            RESUMO DA MISSÃO
          </div>
          <div style={{ border: '1px dashed #cccccc' }} className="text-minuscula leading-relaxed flex-1 overflow-hidden p-2 whitespace-pre-wrap">
            {textoFolha1}
            {textoFolha2 && <p style={{ color: '#000000' }} className="font-bold mt-1 text-[0.5rem]">(Continua...)</p>}
          </div>
        </div>

        {/* ASSINATURAS */}
        <div className="mt-auto pb-10 flex flex-col gap-12 shrink-0">
          <div className="flex justify-end">
            <div className="w-64 text-center">
              <div className="text-minuscula mb-1">Rio de Janeiro, {dados.data}</div>
              <div style={{ borderTop: '1px solid #000000' }} className="pt-1 uppercase text-maiuscula">
                (LOCAL E DATA)
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div style={{ borderTop: '1px solid #000000' }} className="w-56 pt-1 uppercase text-center text-maiuscula">(VISTO/AUTORIDADE POLICIAL)</div>
            <div style={{ borderTop: '1px solid #000000' }} className="w-56 pt-1 uppercase text-center text-maiuscula">(ASSINATURA, MAT. CHEFE DE EQUIPE)</div>
          </div>
        </div>
      </div>

      {/* SEGUNDA PÁGINA */}
      {textoFolha2 && (
        <div 
          style={{ backgroundColor: '#ffffff', color: '#000000' }}
          className="w-[210mm] h-[297mm] mx-auto text-maiuscula font-sans pt-12 px-12 flex flex-col shadow-sm print:shadow-none mt-10 print:mt-0"
        >
          <div className="text-center font-bold text-[0.65rem] underline mb-6 shrink-0">RESUMO DA MISSÃO (CONTINUAÇÃO)</div>
          <div className="text-minuscula leading-relaxed flex-1 whitespace-pre-wrap">{textoFolha2}</div>
        </div>
      )}
    </>
  );
}

export default ToPrinter;