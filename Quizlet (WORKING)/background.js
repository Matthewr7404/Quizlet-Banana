chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = new URL(decodeURIComponent(details.url));
    if (url.searchParams.has("filters")) {
      const filters = JSON.parse(url.searchParams.get("filters"));
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { gamePin: +filters.gameCode });
      });
    }
  }, {
  urls: ["https://quizlet.com/webapi/3.2/game-instances*"]
},
)