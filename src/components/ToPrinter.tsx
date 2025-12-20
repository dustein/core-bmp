export function ToPrinter() {

    // Simulação de conteúdo (substitua pelo seu estado ou props)
  const resumoCompleto = `Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos
  , como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. 

  Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker. 

  Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker. 
  Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.`; 
  
// 1. Definição do limite físico de linhas que cabem na Folha 1
  const MAX_LINHAS = 14; 
  const paragrafos = resumoCompleto.split('\n');

  // 2. Lógica Econômica: Percorre os parágrafos e calcula o espaço ocupado
  let linhasAcumuladas = 0;
  let indiceCorte = paragrafos.length; // Padrão: tudo na folha 1

  for (let i = 0; i < paragrafos.length; i++) {
    // Cada parágrafo ocupa pelo menos 1 linha. Se for longo, estimamos a quebra.
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
      <div className="w-[210mm] h-[297mm] mx-auto text-maiuscula font-sans pt-8 px-15 flex flex-col overflow-hidden shadow-sm print:shadow-none">
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
        {/* FIM CABEÇALHO */}

        {/* PRIMEIRO BLOCO */}
        <div className="flex flex-col gap-2.5 shrink-0">

          {/* PRIMEIRA LINHA */}
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">ÓRGÃO SUBORDINANTE</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula">SEPOL / SSPIO</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1">UPJ</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula min-w-[15ch]">CORE</span>
              </div>
            </div>
          </div>
          {/* FIM PRIMEIRA LINHA */}
          {/* SEGUNDA LINHA */}
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">MISSÃO Nº</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula ml-10">/ 2025</span>
              </div>
            </div>
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">DATA</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula mx-1">28 / 10</span>
                <span className="text-minuscula">/ 2025</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1">REF</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula min-w-[15ch]">BDT 1234567</span>
              </div>
            </div>
          </div>
          {/* FIM SEGUNDA LINHA */}
          {/* TERCEIRA LINHA */}
          <div className="flex w-full items-baseline gap-4">
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">NOME, CARGO E MAT. DA AUTORIDADE</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula">Dr. Fabrício de Oliveira Pereira</span>
              </div>
            </div>
          </div>
          {/* FIM TERCEIRA LINHA */}
          {/* QUARTA LINHA */}
          <div className="flex w-full items-baseline gap-4">
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">OBJETIVO INICIAL DA MISSÃO</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula">X</span>
              </div>
            </div>
          </div>
          {/* FIM QUARTA LINHA */}
          {/* QUINTA LINHA  */}
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">VIATURA</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula">67-0721</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1">PLACA OFICIAL</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula min-w-[15ch]">PCERJ1234</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1">PLACA RES.</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula min-w-[15ch]">ABC1234</span>
              </div>
            </div>
          </div>
          {/* FIM QUINTA LINHA */}
          {/* SEXTA LINHA */}
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">KM SAÍDA</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula">12345</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1">KM CHEGADA</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula min-w-[14ch]">12350</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1">PREFIXO CÓD.</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula min-w-[15ch]">Zeus 021</span>
              </div>
            </div>
          </div>
          {/* FIM SEXTA LINHA */}
          {/* SÉTIMA LINHA */}
          <div className="flex w-full items-baseline gap-4 mt-2">
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">REGIÃO DE ATUAÇÃO INICIAL</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula">CENTRO DO RIO</span>
              </div>
            </div>
          </div>
          {/* FIM SÉTIMA LINHA */}
          {/* EQUIPE POLICIAL */}
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">EQUIPE POLICIAL/CHEFE</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula">Eduardo Gouvea Stein Lopes</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1">MAT.</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula min-w-[11ch]">871.460-2</span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">NOME</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula">Eduardo Gouvea Stein Lopes</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1">MAT.</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula min-w-[11ch]">871.460-2</span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">NOME</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula">Eduardo Gouvea Stein Lopes</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1">MAT.</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula min-w-[11ch]">871.460-2</span>
              </div>
            </div>
          </div>
          <div className="flex w-full items-baseline gap-4">          
            <div className="flex items-baseline grow">
              <span className="shrink-0 mr-1">NOME</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula">Eduardo Gouvea Stein Lopes</span>
              </div>
            </div>
            <div className="flex items-baseline shrink-0">
              <span className="shrink-0 mr-1">MAT.</span>
              <div className="border-b border-black flex grow ml-1">
                <span className="text-minuscula min-w-[11ch]">871.460-2</span>
              </div>
            </div>
          </div>
          {/* FIM EQUIPE POLICIAL */}         
        </div>
        {/* FIM PRIMEIRO BLOCO */}
        {/* SEGUNDO BLOCO */}
        <div className="mt-6 shrink-0">
          <div className="text-center font-bold text-[0.65rem] mb-3">OUTRAS REGIÕES DE ATUAÇÃO PERCORRIDAS</div>
          <table className="w-full table-fixed border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black p-1 w-[12%] align-middle font-normal uppercase leading-tight text-maiuscula">Horário</th>
                <th className="border border-black p-1 w-[18%] align-middle font-normal uppercase leading-tight text-maiuscula">Região de Atuação (RA)</th>
                <th className="border border-black p-1 w-[15%] align-middle font-normal uppercase leading-tight text-maiuscula">KM ao entrar na (RA)</th>
                <th className="border border-black p-1 w-[15%] align-middle font-normal uppercase leading-tight text-maiuscula">KM ao sair da (RA)</th>
                <th className="border border-black p-1 w-[40%] align-middle font-normal uppercase leading-tight text-maiuscula">Objetivo da Missão</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-6">
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
              </tr>
              <tr className="h-6">
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
              </tr>
              <tr className="h-6">
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
              </tr>            
            </tbody>
          </table>
        </div>
        <div className="w-full mt-6 mb-4 flex-1 flex flex-col overflow-hidden">
          <div className="text-center font-bold text-[0.65rem] underline mb-2 shrink-0">
            RESUMO DA MISSÃO
          </div>
          <div className="text-minuscula leading-relaxed flex-1 overflow-hidden border border-dashed border-gray-300 p-2 whitespace-pre-wrap">
            {textoFolha1}
            {textoFolha2 && <p className="font-bold text-red-600 print:text-black mt-1 text-[0.5rem]">(Continua...)</p>}
          </div>
        </div>
        {/* FIM SEGUNDO BLOCO */}


        {/* ASSINATURAS */}
        <div className="mt-auto pb-10 flex flex-col gap-12 shrink-0">
          <div className="flex justify-end">
            <div className="w-64 text-center">
      {/* Texto que preenche o local e data - Ajuste o text-minuscula se necessário */}
      <div className="text-minuscula mb-1">Rio de Janeiro, 28/10/2025</div>
      
      <div className="border-t border-black pt-1 uppercase text-maiuscula">
        (LOCAL E DATA)
      </div>
    </div>
          </div>
          <div className="flex justify-between">
            <div className="border-t border-black w-56 pt-1 uppercase text-center text-maiuscula">(VISTO/AUTORIDADE POLICIAL)</div>
            <div className="border-t border-black w-56 pt-1 uppercase text-center text-maiuscula">(ASSINATURA, MAT. CHEFE DE EQUIPE)</div>
          </div>
        </div>
        {/* FIM ASSINATURAS */}

      </div>


      {/* --- SEGUNDA PÁGINA (CONTINUAÇÃO) --- */}
      {textoFolha2 && (
        <div className="w-[210mm] h-[297mm] mx-auto text-maiuscula font-sans pt-12 px-12 flex flex-col shadow-sm print:shadow-none mt-10 print:mt-0 bg-white">
          <div className="text-center font-bold text-[0.65rem] underline mb-6 shrink-0">RESUMO DA MISSÃO (CONTINUAÇÃO)</div>
          <div className="text-minuscula leading-relaxed flex-1 whitespace-pre-wrap">{textoFolha2}</div>
        </div>
      )}
    </>
  );
}

export default ToPrinter;
      