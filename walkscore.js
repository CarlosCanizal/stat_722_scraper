
document.body.style.background = 'yellow';

chrome.storage.local.get("current",function(currentObj){

  current = currentObj.current;

  var initial = setInterval(function(){
    var score = $('#score-text').text();
    if(score){
      clearInterval(initial);
      current["Walk_Score"] = score;
      chrome.storage.local.set({"current":current},function(){
        console.log("current saved...");
        console.log(current);
        chrome.storage.local.get('currentName',function(obj){
          var name =  obj.currentName;
          chrome.storage.local.get('properties_list',function(obj){
            var list = obj.properties_list;
            console.log(list);
            list.push(current);
            chrome.storage.local.set({"properties_list":list},function(){
              chrome.storage.local.get('currentIndex',function(obj){
                var index = ++obj.currentIndex;
                console.log(index)
                chrome.storage.local.set({"currentIndex":index},function(){
                  chrome.storage.local.get('properties_links',function(links){
                    if(index < links.properties_links.length){
                      var properties_links = links.properties_links;
                      var next = properties_links[index];
                      chrome.runtime.sendMessage({fn: 'redirect', items: {link:next}});
                    }else{
                      console.log('All properties done!');
                    }
                  });
                });
              });
            });
          });
        });
      });
    }
  },1000);
});

function simulateClick(obj) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var canceled = !obj.dispatchEvent(evt);      
}