//This file is all the logic to take in the info entered by the admin to create a new order
var snum = 0;
const today = new Date();
var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var companyId = 999;

//call to get the next survey number
$.get("/api/number", function(data){
	snum = data[0].snum;
	console.log(snum);
});


//populate the company dropdown
$.get("/api/companies", function(data){
	console.log(data);
	//data is an array of objects
	data.forEach(company=>{
		var option = $("<option></option");
		option.text(company.name);
		option.attr("id", "comp");
		option.attr("value", company.cid);
		$("#companyDropdown").append(option);
	});
});

//listener on the dropdown to autopopulate the form
$("#companyDropdown").change(function(){
	console.log($(this).val().length);
	companyId = $(this).val();
	//make a call to get the specific company info that is selected
	if($(this).val().length >= 1){
		$.get("/api/company/" + companyId, function(data){
			//use the data to populate the fields
			console.log(data);
			$("#companyName").val(data[0].name);
			$("#firstName").val(data[0].attention);
			$("#address").val(data[0].address);
			$("#city").val(data[0].city);
			$("#phone").val(data[0].phone);
		});
	}
	else{
		companyId = 999;
		$("#companyName").val(" ");
		$("#firstName").val(" ");
		$("#address").val(" ");
		$("#city").val(" ");
		$("#phone").val(" ");
	}
	
});


var forms = $("form");
//the onclick for the submit button
$("#submitButton").on("click", e =>{
	var long = 0;
	if($("longLegal").is(":checked"))
		long = 1;

	//e.preventDefault();

	//get ordered object ready
	//company doesnt exist in the db
	if(companyId === 999){
		//need to get the lastest cid to create the order, then we post it
		$.get("/api/companyId", function(id){
			companyId = id[0].cid;
			console.log(companyId);
		}).then(function(){
			var data = {
			survey: {
				buyer: $("#buyers").val(),
				address: $("#surveyAddress").val() + $("#surveyAddress2").val(),
				city: $("#surveyCity").val(), 
				state: $("#surveyState option:selected").val(),
				zipcode: $("#surveyzip").val(),
				date_ordered: date,
				date_needed: $("#date-needed").val(),
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
				ldid: snum + 1,
				snum: snum + 1,
				lot: $("#lot").val(),
				block: $("#block").val(),
				subdivision: $("#subdivision").val(),
				plat: $("#plat").val(),
				page: $("#page").val(),
				county: $("#county").val(),
				long_legal: long
			},

			elevation:{
				elev_id: snum + 1,
				snum: snum + 1,
				flood_zone: $("#flood-zone").val(),
				baseflood: $("#base-flood").val(),
				community: $("#community").val(),
				panel: $("#panel").val(),
				firm_date: $("#firm-date").val()
			},
			ordered:{
				cid : companyId + 1,
				snum : snum + 1
			}
		};
		//this post creates the new survey order, along with the legal, elevation, and company
		//check for validation
		if(validateForm(data)){
			e.preventDefault();
			$.post("/api/create", data);
			window.location = "database.html";
			alert("Congrats, Created Survey#: " + (snum+1));
		}
		else{
			e.preventDefault();
			alert("Missing Fields");
		}
		
	});
	}
	//means that the company is in the db who ordered it
	else{
		var data = {
			survey: {
				buyer: $("#buyers").val(),
				address: $("#surveyAddress").val() + $("#surveyAddress2").val(),
				city: $("#surveyCity").val(), 
				state: $("#surveyState option:selected").val(),
				zipcode: $("#surveyzip").val(),
				date_ordered: date,
				date_needed: $("#date-needed").val(),
				comment: $("#comment").val(),
				contact_for_access: $("#contactName").val(),
				contact_number: $("#contactNumber").val()
			},
			legal: {
				ldid: snum + 1,
				snum: snum + 1,
				lot: $("#lot").val(),
				block: $("#block").val(),
				subdivision: $("#subdivision").val(),
				plat: $("#plat").val(),
				page: $("#page").val(),
				county: $("#county").val(),
				long_legal: long
			},

			elevation:{
				elev_id: snum + 1,
				snum: snum + 1,
				flood_zone: $("#flood-zone").val(),
				baseflood: $("#base-flood").val(),
				community: $("#community").val(),
				panel: $("#panel").val(),
				firm_date: $("#firm-date").val()
			},
			ordered:{
				cid : companyId,
				snum : snum + 1
			}
		};
		if(validateForm(data)){
			e.preventDefault();
			$.post("/api/create", data);
			window.location = "database.html";
			alert("Congrats, Created Survey#: " + (snum+1));
		}
		else{
			e.preventDefault();
			alert("Missing Fields");
		}
	}
});

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
