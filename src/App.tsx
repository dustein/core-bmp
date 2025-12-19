
function App() {

  return (
    <>
      <div className="w-[210mm] h-[297mm] mx-auto text-[0.6rem] font-sans pt-5 px-12 text-black flex flex-col overflow-hidden">
        {/* Estilos de Impressão */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page { 
              size: A4; 
              margin: 0; /* Remove margens do navegador */
            }
            body { 
              -webkit-print-color-adjust: exact; 
              print-color-adjust: exact; 
            }
            .no-print { display: none; }
            
            /* Garante que o container ocupe a folha toda na impressão */
            html, body {
              width: 210mm;
              height: 297mm;
            }
          }
        `}} 
        />

        {/* CABEÇALHO */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 mx-auto mb-4">
            <img src="/logo-RJ.png" alt="logotipo governo do estado do rio de janeiro" />
          </div>
          <div className="text-[0.75rem] font-bold leading-3.5">
            <h3>SECRETARIA DE ESTADO DE SEGURANÇA</h3>
            <h3>POLÍCIA CIVIL DO ESTADO DO RIO DE JANEIRO</h3>
            <h3>BOLETIM DE MISSÃO POLICIAL - BMP</h3>
          </div>
        </div>
        {/* FIM CABEÇALHO */}

        {/* PRIMEIRO BLOCO */}
        <div className="flex flex-col gap-1">

          {/* PRIMEIRA LINHA */}
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0">ÓRGÃO SUBORDINANTE</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">SEPOL / SSPIO</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0">UPJ</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem] min-w-[11ch]">CORE</span>
              </div>
            </div>
          </div>
          {/* FIM PRIMEIRA LINHA */}
          {/* SEGUNDA LINHA */}
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0">MISSÃO Nº</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem] ml-10">/ 2025</span>
              </div>
            </div>
            <div className="flex items-baseline grow">
              <span className="shrink-0">DATA</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem] mx-1">28 / 10</span>
                <span className="translate-y-0.5 text-[0.8rem]">/ 2025</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0">REF</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">BDT 1234567</span>
              </div>
            </div>
          </div>
          {/* FIM SEGUNDA LINHA */}
          {/* TERCEIRA LINHA */}
          <div className="flex w-full items-baseline gap-4">
            <div className="flex items-baseline grow">
              <span className="shrink-0">NOME, CARGO E MAT. DA AUTORIDADE</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">Dr. Fabrício de Oliveira Pereira</span>
              </div>
            </div>
          </div>
          {/* FIM TERCEIRA LINHA */}
          {/* QUARTA LINHA */}
          <div className="flex w-full items-baseline gap-4">
            <div className="flex items-baseline grow">
              <span className="shrink-0">OBJETIVO INICIAL DA MISSÃO</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">X</span>
              </div>
            </div>
          </div>
          {/* FIM QUARTA LINHA */}
          {/* QUINTA LINHA  */}
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0">VIATURA</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">67-0721</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0">PLACA OFICIAL</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">PCERJ1234</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0">PLACA RES.</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">ABC1234</span>
              </div>
            </div>
          </div>
          {/* FIM QUINTA LINHA */}
          {/* SEXTA LINHA */}
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0">KM SAÍDA</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">12345</span>
              </div>
            </div>
            <div className="flex items-baseline grow">
              <span className="shrink-0">KM CHEGADA</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">12350</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0">PREFIXO CÓD.</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">Zeus 021</span>
              </div>
            </div>
          </div>
          {/* FIM SEXTA LINHA */}
          {/* SÉTIMA LINHA */}
          <div className="flex w-full items-baseline gap-4 mt-2">
            <div className="flex items-baseline grow">
              <span className="shrink-0">REGIÃO DE ATUAÇÃO INICIAL</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">CENTRO DO RIO</span>
              </div>
            </div>
          </div>
          {/* FIM SÉTIMA LINHA */}
          {/* EQUIPE POLICIAL */}
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0">EQUIPE POLICIAL/CHEFE</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">Eduardo Gouvea Stein Lopes</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0">MAT.</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem] min-w-[11ch]">871.460-2</span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0">NOME</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">Eduardo Gouvea Stein Lopes</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0">MAT.</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem] min-w-[11ch]">871.460-2</span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0">NOME</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">Eduardo Gouvea Stein Lopes</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0">MAT.</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem] min-w-[11ch]">871.460-2</span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0">NOME</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem]">Eduardo Gouvea Stein Lopes</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0">MAT.</span>
              <div className="border-b border-black flex grow px-2">
                <span className="translate-y-0.5 text-[0.8rem] min-w-[11ch]">871.460-2</span>
              </div>
            </div>
          </div>
          {/* FIM EQUIPE POLICIAL */}         
        </div>
        {/* FIM PRIMEIRO BLOCO */}
        {/* SEGUNDO BLOCO */}
        <div className="mt-6">
          <div className="text-center font-bold text-base mb-3">OUTRAS REGIÕES DE ATUAÇÃO PERCORRIDAS</div>
          <table>
            <thead>
              <tr>
                <th className="border border-black p-1 w-[12%] h-10 align-middle uppercase leading-tight">Horário</th>
                <th className="border border-black p-1 w-[18%] h-10 align-middle uppercase leading-tight">Região de Atuação (RA)</th>
                <th className="border border-black p-1 w-[15%] h-10 align-middle uppercase leading-tight">KM ao entrar na (RA)</th>
                <th className="border border-black p-1 w-[15%] h-10 align-middle uppercase leading-tight">KM ao sair da (RA)</th>
                <th className="border border-black p-1 w-[40%] h-10 align-middle uppercase leading-tight">Objetivo da Missão</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-8">
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
              </tr>
              <tr className="h-8">
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
              </tr>
              <tr className="h-8">
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
              </tr>            
            </tbody>
          </table>
        </div>
        <div className="w-full mt-6 mb-12 border border-black flex-1">
          <div className="text-center font-bold text-base underline mb-2">RESUMO DA MISSÃO</div>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
        </div>
        {/* FIM SEGUNDO BLOCO */}


        {/* ASSINATURAS */}
        <div className="flex flex-col gap-12">
          <div className="flex justify-end">
            <div className="border-t border-black w-56 pt-1 uppercase text-center">(LOCAL E DATA)</div>
          </div>
          <div className="flex justify-between">
            <div className="border-t border-black w-56 pt-1 uppercase text-center">(VISTO/AUTORIDADE POLICIAL)</div>
            <div className="border-t border-black w-56 pt-1 uppercase text-center">(ASSINATURA, MAT. CHEFE DE EQUIPE)</div>
          </div>
        </div>
        {/* FIM ASSINATURAS */}

      </div>
    
    </>
  )
}

export default App
