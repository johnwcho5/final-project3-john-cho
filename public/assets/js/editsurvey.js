//get the survey number
const snum = window.location.pathname.split("/");
var cid = 0;
var changes = [];

//map of fields
const surveyFields = {
	buyers: "buyer", 
	surveyAddress: "address",
	surveyCity: "city", 
	surveyzip: "zipcode",
	date_needed: "date_needed",
	date_completed: "date_completed",
	date_delivered: "date_delivered",
	date_paid: "date_paid",
	comment:"comment",
	contactName: "contact_for_access",
	contactNumber: "contact_number",
	cost: "cost"
};

const companyFields = {
	companyName: "name",
	address: "address",
	city: "city",
	zip: "zip",
	phone: "phone",
	firstName: "attention",
	email: "email"
};

const legalFields = {

	lot: "lot",
	block: "block",
	subdivision: "subdivision",
	plat: "plat",
	page: "page",
	county: "county",
};

const elevFields = {
	flood_zone: "flood_zone",
	base_flood: "baseflood",
	community: "community",
	panel: "panel",
	firm_date: "firm_date"
};
//snum[2] is the survey number
//add it to the top of page
$("#surveyNumber").text("Survey No. " + snum[2]);

//function to build the page
fillForm();

//get changes and then make changes

$("form input").on("input", function(){
	//put into an array
	if(changes.indexOf($(this).attr("id")) === -1){
		changes.push($(this).attr("id"));
	}
});
$("#comment").bind("input propertychange", function(){
	if(changes.indexOf("comment") === -1){
		changes.push("comment");
	}
});
//the onclick for the submit button
$("#submitButton").on("click", e =>{
	console.log(surveyFields.comment);
	//e.preventDefault();
	//use changes to build the objects to be passed
	var survey =[];
	var elevation = [];
	var legal =[];
	var company =[];
	console.log(changes);
	changes.forEach(element =>{
		//check to see what type of object
		if(typeof surveyFields[element] != "undefined"){
			//push
			console.log("survey push");
			//jquery
			let value = $("#"+element).val();
			survey.push(surveyFields[element]+":"+value);
		}
		else if(typeof companyFields[element] != "undefined"){
			let value = $("#"+element).val();
			company.push(companyFields[element]+":"+value);
		}
		else if(typeof elevFields[element] != "undefined"){
			let value = $("#"+element).val();
			elevation.push(elevFields[element]+":"+value);
		}
		else if(typeof legalFields[element] != "undefined"){
			let value = $("#"+element).val();
			legal.push(legalFields[element]+":"+value);
		}

	});
	if(survey.length > 0){
		console.log(survey);
		var info = {table: "survey", fields: survey};
		//perform a put
		$.ajax("/api/update/" + snum[2], {
			type: "PUT",
			data: info
		}).then(function(){
			e.preventDefault();
			//window.history.back();
			window.location = "/database.html";
			alert("Good");
		});
	}
	if(elevation.length > 0){
		console.log(elevation);
		var info = {table: "elevation", fields: elevation};
		//perform a put
		$.ajax("/api/update/" + snum[2], {
			type: "PUT",
			data: info
		}).then(function(){
			e.preventDefault();
			//window.history.back();
			window.location = "/database.html";
			alert("Good");
		});
	}
	if(legal.length > 0){
		console.log(legal);
		var info = {table: "legal", fields: legal};
		//perform a put
		$.ajax("/api/update/" + snum[2], {
			type: "PUT",
			data: info
		}).then(function(){
			e.preventDefault();
			//window.history.back();
			window.location = "/database.html";
			alert("Good");
		});
	}
	if(company.length > 0){
		console.log(company);
		var info = {table: "company", fields: company};
		//perform a put
		$.ajax("/api/update/" + cid, {
			type: "PUT",
			data: info
		}).then(function(){
			e.preventDefault();
			//window.history.back();
			window.location = "/database.html";
			alert("Good"); 
		});
	}
	//window.history.back();
	
	//this post creates the new survey order, along with the legal, elevation, and company
	//check for validation
	
});


function fillForm(){
	//get all the info associated with the survey
	$.get("/api/survey/" +snum[2], function(survey){
		console.log(survey);
		//const date_ordered = element.date_ordered.split("T");
		if(survey[0].date_delivered != null && typeof survey[0].date_delivered != "undefined"){
			const date_delivered = survey[0].date_delivered.split("T");
			$("#date-delivered").val(date_delivered[0]);
		}
		if(survey[0].date_needed != null && typeof survey[0].date_needed != "undefined"){
			const date_needed = survey[0].date_needed.split("T");
			$("#date-needed").val(date_needed[0]);
		}
		if(survey[0].date_ordered != null && typeof survey[0].date_ordered != "undefined"){
			const date_ordered = survey[0].date_ordered.split("T");
			$("#date-ordered").val(date_ordered[0]);
		}
		if(survey[0].date_paid != null && typeof survey[0].date_paid != "undefined"){
			const date_paid = survey[0].date_paid.split("T");
			$("#date-paid").val(date_paid[0]);
		}
		if(survey[0].date_completed != null && typeof survey[0].date_completed != "undefined"){
			const date_completed = survey[0].date_completed.split("T");
			$("#date-completed").val(date_completed[0]);
		}
		
		//populate all the survey field
		$("#buyers").val(survey[0].buyer);
		$("#surveyCity").val(survey[0].city);
		$("#surveyAddress").val(survey[0].address);
		$("#comment").val(survey[0].comment);
		$("#contactName").val(survey[0].contact_for_access);
		$("#contactNumber").val(survey[0].contact_number);
		$("#cost").val(survey[0].cost);
		$('#surveyState option[value = "FL"]').attr("selected", true);
		$("#surveyzip").val(survey[0].zipcode);

	}).then(function(){
		//lets get the company info that ordered the survey
		$.get("/api/order/" + snum[2], function(id){
			cid = id[0].cid;
			console.log(cid);
		}).then(function(){
			//lets get company info associated with that cid
			$.get("/api/company/" + cid, function(company){
				console.log(company);
				//populate company fields
				$("#address").val(company[0].address);
				$("#firstName").val(company[0].attention);
				$("#city").val(company[0].city);
				$("#email").val(company[0].email);
				$("#companyName").val(company[0].name);
				$("#phone").val(company[0].phone);
				$('#companyState option[value = "FL"]').attr("selected", true);
				$("#zip").val(company[0].zip);
			}).then(function(){
				//lets get legal info
				$.get("/api/legal/" + snum[2], function(legal){
					console.log(legal);
					$("#block").val(legal[0].block);
					$("#county").val(legal[0].county);
					//check to see if long legal
					if(legal[0].long_legal){
						//checked
						$("#longLegal").attr("checked", true);
					}
					$("#lot").val(legal[0].lot);
					$("#page").val(legal[0].page);
					$("#plat").val(legal[0].plat);
					$("#subdivision").val(legal[0].subdivision);

				}).then(function(){
					//get the elevation info
					$.get("/api/elevation/" + snum[2], function(elev){
						console.log(elev);
						if(typeof elev != "undefined"){
							$("#base_flood").val(elev[0].baseflood);
							$("#community").val(elev[0].community);
							$("#firm_date").val(elev[0].firm_date);
							$("#flood_zone").val(elev[0].flood_zone);
							$("#panel").val(elev[0].panel);
						}
					})
				});
			});
		});
	});

}

function validateForm(object){
	//lets get the whole form
	for(var item in object){
		//each item is the name of object
		var obj = object[item];
		//prop is the name of attribute inside object
		//obj[prop] is the value associated with that attribute
		for(var prop in obj){
			console.log(prop + "=" + obj[prop]);
			if(prop === "address" && obj[prop] === "" || prop === "city" && obj[prop] === "" || prop === "state" && obj[prop] === "" || prop === "zipcode" && obj[prop] === "" || prop === "name" && obj[prop] === "" || prop === "zip" && obj[prop] === "" || prop === "phone" && obj[prop] === ""){
				return false;
			}
		}
	}
	return true; 

}


/*var data = {
			survey: {
				buyer: $("#buyers").val(),
				address: $("#surveyAddress").val() + $("#surveyAddress2").val(),
				city: $("#surveyCity").val(), 
				state: $("#surveyState option:selected").val(),
				zipcode: $("#surveyzip").val(),
				date_needed: $("#date-needed").val(),
				date_completed: $("date-completed").val(),
				date_delivered: $("date-delivered").val(),
				date_paid: $("#date-paid").val(),
				comment: $("#comment").val(),
				contact_for_access: $("#contactName").val(),
				contact_number: $("#contactNumber").val()
			},
			company: {
				name: $("#companyName").val(),
				address: $("#address").val() + " " + $("#address2").val(),
				city: $("#city").val(),
				state: $("#state option:selected").val(),
				zip: $("#zip").val(),
				phone: $("#phone").val(),
				attention: $("#firstName").val() + " " + $("#lastName").val(),
				email: $("#email").val()
			},
			legal: {
				lot: $("#lot").val(),
				block: $("#block").val(),
				subdivision: $("#subdivision").val(),
				plat: $("#plat").val(),
				page: $("#page").val(),
				county: $("#county").val(),
				long_legal: long
			},

			elevation:{
				flood_zone: $("#flood-zone").val(),
				baseflood: $("#base-flood").val(),
				community: $("#community").val(),
				panel: $("#panel").val(),
				firm_date: $("#firm-date").val()
			}
		};*/