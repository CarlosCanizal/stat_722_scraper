
document.body.style.background = 'yellow';

chrome.storage.local.get("current",function(currentObj){

  current = currentObj.current;

  var initial = setInterval(function(){

    var tab1 = $('#rpt_prptHomeValues_ctl00_r_dom');
    var tab2 = $('#rpt_prptDemographics_ctl00_r_dom');
    var tab3 = $('#rpt_prptEconomy_ctl00_r_dom');
    var tab4 = $('#rpt_prptSchoolsEducation_ctl00_r_dom');
    var tab5 = $('#rpt_prptClimate_ctl00_r_dom');
    var tab6 = $('#rpt_prptCommute_ctl00_r_dom');

      if(tab1 && tab1.length > 0){
        clearInterval(initial);
        getTableInfo(current,'#rpt_prptHomeValues_ctl00_r_dom',function(obj){
          current =obj;
          getTableInfo(current,'#rpt_prptHomes_ctl00_r_dom',function(obj){
            current =obj;
            console.log(current);
            var tabClick = document.querySelector("#ctl01_tsTabControl_1");
            simulateClick(tabClick);
          });
        });
      }else if(tab2 && tab2.length > 0 ){
        clearInterval(initial);
        getTableInfo(current,'#rpt_prptDemographics_ctl00_r_dom',function(obj){
          current =obj;
          getTableInfo(current,'#rpt_prptEducation_ctl00_r_dom',function(obj){
            current =obj;
            console.log(current);
            var tabClick = document.querySelector("#ctl01_tsTabControl_2");
            simulateClick(tabClick);
          });
        });
      }else if(tab3 && tab3.length > 0 ){
        clearInterval(initial);
        getTableInfo(current,'#rpt_prptEconomy_ctl00_r_dom',function(obj){
          current =obj;
          console.log(current);
          var tabClick = document.querySelector("#ctl01_tsTabControl_3");
          simulateClick(tabClick);
        });
      }else if(tab4 && tab4.length > 0 ){
        clearInterval(initial);
        getTableInfo(current,'#rpt_prptSchoolsEducation_ctl00_r_dom',function(obj){
          current =obj;
          getTableInfo(current,'#rpt_prpthighschoolsonly_r_dom',function(obj){
            current =obj;
            getTableInfo(current,'#rpt_prptmiddleschoolsonly_r_dom',function(obj){
              current =obj;
              getTableInfo(current,'#rpt_prptelementaryschoolsonly_r_dom',function(obj){
                current =obj;
                getTableInfo(current,'#rpt_prptungradedschoolsonly_r_dom',function(obj){
                  current =obj;
                  getTableInfo(current,'#rpt_prptprivateschools_trprivateschoolsDataA',function(obj){
                    current =obj;
                    getTableInfo(current,'#rpt_prptcolleges_r_dom',function(obj){
                      console.log(current);
                      var tabClick = document.querySelector("#ctl01_tsTabControl_4");
                      simulateClick(tabClick);
                    });
                  });
                });
              });
            });
          });
        });
      }else if(tab5 && tab5.length > 0 ){
        clearInterval(initial);
        getTableInfo(current,'#rpt_prptClimate_ctl00_r_dom',function(obj){
          current =obj;
          getTableInfo(current,'#rpt_prptEnvironment_ctl00_r_dom',function(obj){
            current =obj;
            console.log(current);
            var tabClick = document.querySelector("#ctl01_tsTabControl_5");
            simulateClick(tabClick);
          });
        });
      }else if(tab6 && tab6.length > 0 ){
        clearInterval(initial);
        getTableInfo(current,'#rpt_prptCommute_ctl00_r_dom',function(obj){
          current =obj;
          getTableInfo(current,'#rpt_prptCrime_ctl00_r_dom',function(obj){
            current =obj;
            getTableInfo(current,'#rpt_prptHealth_ctl00_r_dom',function(obj){
              current =obj;
              chrome.storage.local.set({"current":current},function(){
                console.log("current saved...");
                console.log(current);
                chrome.storage.local.get('iframe',function(iframe){
                  chrome.runtime.sendMessage({fn: 'redirectIframe', items: {link:iframe.iframe}});
                });

              });
              // var tabClick = document.querySelector("#ctl01_tsTabControl_5");
              // simulateClick(tabClick);
            });
          });
        });
      }
  },1000);
});


function getTableInfo(current, tableId, callback){
  var table = $(tableId);
  var thead = table.find('table td.HeadingCell');
  var rows = table.find("tr.Row, tr.AltRow");

  for(var i=0; i<rows.length; i++){
    var tds = $(rows[i]).find("td");
    for(var j=0; j<tds.length; j++){
      var value = $(tds[j]).text();
      var row_name;
      if(j ==0){
        row_name = value.split(' ').join('_');
        row_name =  row_name.trim();
      }else{
        var head_name = $(thead[j]).text().split(' ').join('_');
        row_name = row_name+"_"+head_name;
        current[row_name] = value;
      }
    }
  }

  callback(current);
}

function simulateClick(obj) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var canceled = !obj.dispatchEvent(evt);      
}