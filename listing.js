document.body.style.background = 'yellow';

var properties_links = [];
var page = 1;

chrome.storage.local.clear(function(){
  console.log('Properties Links removed...');
  getLinks(properties_links, page, function(properties_links){
    chrome.storage.local.set({ "properties_links": properties_links },function(){
      console.log('Properties Links saved...');
      chrome.storage.local.set({"currentIndex":0},function(){
        console.log("Current Index saved...");
          var properties_list = []
          chrome.storage.local.set({"properties_list": properties_list},function(){
          chrome.runtime.sendMessage({fn: 'redirect', items: {link:properties_links[0]}});
        });
      });
    });  
  });
});

function getLinks(properties_links, page, callback){
  var interval = setInterval(function(){ 
  var current_page =  parseInt($('.current-page').html());
    if(current_page == page){
      var links = $('#mapsearch-results-body').find('a');
      if(links && links.length > 0){
          clearInterval(interval);
          for(var i=0; i< links.length; i++){
            var link = $(links[i]).attr('href');
            properties_links.push(link);
          }
          var next = document.querySelector("a[name='ms-results-next']");
          if(next){
            simulateClick(next);
            getLinks(properties_links,++page,function(links){
              callback(properties_links);
            });
          }else{
            callback(properties_links);
          }
        }
        else{
          console.log('wainting for ...');
      }
    }
  }, 3000);
}

function simulateClick(obj) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var canceled = !obj.dispatchEvent(evt);      
}