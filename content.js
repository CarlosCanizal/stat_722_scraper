document.body.style.background = 'yellow';
var current = {};

var name = $('.listing-number').html();
current.Status = $("span.ld-status span span").text();
current.ListingNumber = name;
current.State = $("span.city-state-zip[itemprop='addressRegion']").html();
current.Sold_Price = $(".price-container .price").html();
current.Date_Sold = $(".price-container > span").find('i span').html();
current.StreetAddress= $(".full-address").text();
	


	var interval = setInterval(function(){
		var listingSummary = $('.summary-additional.details-info .details-2-per-row.details-text-data');
		if(listingSummary && listingSummary.length > 0){
			clearInterval(interval);
			
			getLabelsInfo(current, listingSummary,function(obj){
				current = obj;
				var roomInformation = $('.details-info .details-3-per-row.details-text-data');
				getLabelsInfo(current, roomInformation,function(obj){
					current = obj;
					var floorPlan = $('.details-info .details-single-line-entry-only.details-text-data');
					getLabelsInfo(current, floorPlan,function(obj){
						current = obj;
						var interiorFeatures = $('.details-info .details-3-per-row.details-text-data');
						getLabelsInfo(current, interiorFeatures,function(obj){
							current = obj;
							var lotFeatures = $('#listingdetail-exteriorfeatures .details-3-per-row.details-text-data');
							getLabelsInfo(current, lotFeatures,function(obj){
								var financialConsiderations = $('#listingdetail-financial .details-3-per-row.details-text-data');
								getLabelsInfo(current, financialConsiderations,function(obj){
									var other = $('#listingdetail-financial .details-1-per-row.details-text-data');
									getLabelsInfo(current, other,function(obj){
										var listingInformation = $('table.details-info-table1 td');
										getLabelsInfo(current, listingInformation,function(obj){
											current = obj;
											console.log(current);
											var school_neighborhood = document.querySelector("#listingdetail-tabs-tabstrip-neighborhood");
											simulateClick(school_neighborhood);
											var tab2 = setInterval(function(){

												var iframe1 = $("iframe#Master_NeighborhoodFrame").attr("src");
												if(iframe1){
													clearInterval(tab2);
													chrome.storage.local.set({"iframe1":iframe1},function(){
														console.log('iframe 1 saved');
														var walk_score = document.querySelector("#listingdetail-tabs-tabstrip-walkscore");
														simulateClick(walk_score);
														var tab3 = setInterval(function(){
															var iframe2 = $("#ws-walkscore-tile iframe").attr("src");
															console.log(iframe2);
															if(iframe2){
																clearInterval(tab3);
																chrome.storage.local.set({"iframe" : iframe2},function(){
																	console.log('iframe 2 saved');
																	chrome.storage.local.set({"current":current},function(){
																		console.log("current saved");
																		chrome.storage.local.set({"currentName":name},function(){
																			console.log("current name saved");
																			console.log(current);
																			chrome.runtime.sendMessage({fn: 'redirectIframe', items: {link:iframe1}});
																		});
																	});
																});
															}
														},1000);
													})
												}
											},1000);
										});
									});
								});
							});
						});
					});
				});
			});


		}else{
			console.log('Waiting for tab 1...');
		}
	},1000);

function getLabelsInfo(obj, array, callback){
	for(var i=0; i< array.length; i++){
		var label = $(array[i]).find('label').html();
		var text = $(array[i]).text();
		if(label && text){
			text = text.replace(label,"").trim();
			label = label.slice(0, -1);
			// label = label.replace(/#/,'');
			// label = label.replace(/%/,'');
			// label = label.replace(/./g,'');
			// label = label.replace(/ /g,'_');
			obj[label] = text;
		}
	}

	callback(obj);
}


function simulateClick(obj) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var canceled = !obj.dispatchEvent(evt);      
}