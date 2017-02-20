/*globals chrome */

// var console = chrome.extension.getBackgroundPage().console;

console.log('hey listen');


var background = {
  items:{
    list: [],
    url: 'hey listen'
  },
  init: function(){
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
      if(request.fn in background){
        background[request.fn](request, sender, sendResponse);
      }
    });
  },
  setUrl: function(request, sender, sendResponse){
    console.log('here');
    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
      console.log('here');
      this.items.url = tab[0].url;
      // this.items.url = tab;
    });
  },
  setItems: function(request, sender, sendResponse){
    console.log('items: '+request.items);
    this.items.list = request.items;
  },
  getItems: function(request, sender , sendResponse){
    sendResponse(this.items);
  },
  redirect: function(request, sender, sendResponse){
    var link = request.items.link;
    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
      var new_url = "http://www.mlsli.com/homes-for-sale"+link;
      chrome.tabs.update(tab.id, {url: new_url});
    });
  },
  redirectIframe: function(request, sender, sendResponse){
    var link = request.items.link;
    console.log(link);
    chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
      chrome.tabs.update(tab.id, {url: link});
    });
  }

}

background.init();
