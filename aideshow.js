/* 
  AideShow v1.0.0
  Abre anexos do ServiceAide em uma nova aba.
  Victor Oliveira <victor.oliveira@gmx.com>
*/

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    for (var i in details.responseHeaders) {
      if (details.responseHeaders[i].name.toLowerCase() == "content-disposition")
        details.responseHeaders[i].value = details.responseHeaders[i].value.toLowerCase().replace('attachment', 'inline');
      };

      if (details.parentFrameId == 0)
        window.open(details.url);
        return { responseHeaders: details.responseHeaders };
  }, {
    urls: ["https://csm3.serviceaide.com/*/rest/attachment*"]
  }, ["blocking", "responseHeaders"]);