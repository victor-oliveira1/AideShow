/* 
  AideShow v1.0.2
  Abre anexos do ServiceAide em uma nova aba.
  Victor Oliveira <victor.oliveira@gmx.com>

  Changelog:
  02/04/2021 01:35 - v1.0.2
  - Função de abertura de aba modificada para
    compartilhar código com o Firefox

  02/04/2021 00:32 - v1.0.1
  - Corrigido o problema de download duplicado
  - Melhorias de performance

  01/04/2021 23:30 - v1.0.0
  - Primeira versão
*/

chrome.webRequest.onHeadersReceived.addListener(
	function (details) {
		for (var i in details.responseHeaders) {
			if (details.responseHeaders[i].name.toLowerCase() == "content-disposition") {
	      details.responseHeaders[i].value = details.responseHeaders[i].value.toLowerCase().replace('attachment', 'inline')
			}
		}

		// Não esquecer de comentar no release
		// console.log(details)

  	if (details.type == 'sub_frame') {
	    chrome.tabs.create({url: details.url}) // v1.0.2
	    return {redirectUrl: 'javascript:void(0)'} // v1.0.1
  	}
  
    return { responseHeaders: details.responseHeaders }
  },
  { urls: ["https://csm3.serviceaide.com/*/rest/attachment*"] },
  ["blocking", "responseHeaders"]
)
