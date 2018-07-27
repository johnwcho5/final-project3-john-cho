//get the table body
const table = $("tbody");
//get an array of all the surveys in the database (array of objects)
$.get("/api/orders", function(el){
	data = el;
}).then(()=>{
	fillPage(data);
	
});

//listener on button
$("#searchButton").on("click", function(){
	//grab value from input
	if($("#search").val().length > 0){
		var query = $("#search").val();
		console.log(query);

		$.get("/api/snumsearch/" + query, function(data){
			//data is what is returned
			if(jQuery.isEmptyObject(data)){
				console.log("empty");
				//call next method
				$.get("/api/buysearch/" + query, function(data){
					if(jQuery.isEmptyObject(data)){
						//call next method
						$.get("/api/addsearch/" + query, function(data){
							if(jQuery.isEmptyObject(data)){
								//call next
								$.get("/api/citysearch/" + query, function(data){
									if(jQuery.isEmptyObject(data)){
										alert("Nothing Found");
									}
									else{
										console.log(data);
										//not empty so populate page
										$("tbody tr").remove();
										fillPage(data);
									}
								}); 
							}
							else{
								console.log(data);
								//not empty so populate page
								$("tbody tr").remove();
								fillPage(data);
							}
						});
					}
					else{
						console.log(data);
						//not empty so populate page
						$("tbody tr").remove();
						fillPage(data);
					}

				});
			}
			else{
				console.log(data);
				//not empty so populate page
				$("tbody tr").remove();
				fillPage(data);

			}
		});
		$("#search").val("");
	}


});

$("#resetButton").on("click", function(){
	$.get("/api/orders", function(el){
		fillPage(el);
	});

});

function fillPage(data){
	data.forEach(function(element){
	console.log(element);
	//new row
	var row = $("<tr></tr");
	//table item
	const surveyNumber = $("<td></td>").text(element.snum).attr("value", element.snum);
	const buyer = $("<td></td>").text(element.buyer).attr("value", element.buyer);
	const address = $("<td></td>").text(element.address).attr("value", element.address);
	address.attr("id", "address");
	const city = $("<td></td>").text(element.city).attr("value", element.city);
	const state = $("<td></td>").text(element.state).attr("value", element.state);
	const zipcode = $("<td></td>").text(element.zipcode).attr("value",element.zipcode);
	
	if(typeof element.date_ordered != "undefined"){
		const date_ordered = element.date_ordered.split("T");
		var ordered = $("<td></td>").text(date_ordered[0]).attr("value",date_ordered[0]);
		ordered.attr("class", "date");	
	}
	else{
		var ordered = $("<td></td>").text("N/A").attr("value","date_ordered");
		ordered.attr("class", "date");	
	}

	if(typeof element.date_needed != "undefined"){
		const date_needed = element.date_needed.split("T");
		var needed = $("<td></td>").text(date_needed[0]).attr("value", date_needed[0]);
		needed.attr("class", "date");
	}
	else{
		var needed = $("<td></td>").text("N/A").attr("value", "date_needed");
		needed.attr("class", "date");
	}
	
	if(typeof element.date_field != "undefined"){
		const date_field = element.date_field.split("T");
		var surveyed =  $("<td></td>").text(date_field[0]).attr("value", date_field[0]);
		surveyed.attr("class", "date");
	}
	else{
		var surveyed =  $("<td></td>").text("N/A").attr("value", "date_field");
		surveyed.attr("class", "date");
	}
	
	if(typeof element.date_drafted != "undefined"){
		const date_drafted = element.date_drafted.split("T");
		var drafted = $("<td></td>").text(date_drafted[0]).attr("value", date_drafted[0]);
		drafted.attr("class", "date");
	}
	else{
		var drafted = $("<td></td>").text("N/A").attr("value", "date_drafted");
		drafted.attr("class", "date");
	}

	const cost = $("<td></td>").text(element.cost).attr("value",element.cost);

	if(element.canceled)
		var canceled = $("<td></td>").text("Canceled").attr("value","canceled");
	else
		var canceled = $("<td></td>").text("Ordered").attr("value","ordered");

	row.append(surveyNumber).append(buyer).append(address).append(city).append(state).append(zipcode).append(ordered).append(needed).append(surveyed).append(drafted).append(cost).append(canceled);
	row.attr("value", element.snum);
	table.append(row);

	});

	//listener for the row
	$("tr").on("click", function(){
		window.location = "/editsurvey/"+$(this).attr("value");

	});

};





