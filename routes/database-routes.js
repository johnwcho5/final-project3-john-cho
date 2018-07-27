const Survey = require("../models/survey.js");
const Company = require("../models/company.js");
const Elevation = require("../models/elevation.js");
const Legal = require("../models/legal.js");
const User = require("../models/user.js");
const Ordered = require("../models/ordered.js");


module.exports = function(app) {
  //first route will get back all the survey orders in the db
  app.get("/api/orders", function(req, res) {
	   	Survey.selectAll(function(data){
	    res.send(data);
	  });
  });

  //route for search
  app.get("/api/snumsearch/:snum", function(req, res){
    //console.log(req.params.snum);
    var pattern = "%"+req.params.snum + "%";
    Survey.search(pattern, "snum", function(data){
      res.send(data);
    });
  });
  app.get("/api/buysearch/:buyer", function(req, res){
    console.log(req.params.buyer);
    var pattern = "%"+req.params.buyer + "%";
    Survey.search(pattern, "buyer", function(data){
      res.send(data);
    });
  });
  app.get("/api/addsearch/:address", function(req, res){
    console.log(req.params.address);
    var pattern = "%"+req.params.address + "%";
    Survey.search(pattern, "address", function(data){
      res.send(data);
    });
  });
  app.get("/api/citysearch/:city", function(req, res){
    console.log(req.params.city);
    var pattern = "%"+req.params.city + "%";
    Survey.search(pattern, "city", function(data){
      res.send(data);
    });
  });

  //route to get legal description
  app.get("/api/legal/:snum", function(req, res){
      console.log(req.params.snum);
      Legal.getOne(req.params.snum, function(data){
        res.send(data);
      });
  });

  //route to get elevation
   app.get("/api/elevation/:snum", function(req, res){
      console.log(req.params.snum);
      Elevation.getOne(req.params.snum, function(data){
        res.send(data);
      });
  });


  //route to get a single survey
  app.get("/api/survey/:snum", function(req, res){
      console.log(req.params.snum);
      Survey.getOne(req.params.snum, function(data){
        res.send(data);
      });
  });

  //route to get back the company that order a survey
  app.get("/api/order/:snum", function(req, res){
      console.log(req.params.snum);
      Ordered.getOne(req.params.snum, function(data){
        res.send(data);
      });
  });

  //route 
  app.get("/api/number", function(req, res) {
  		//get last record
  		Survey.getLastOne(function(data){
  			res.send(data);
        console.log(data);
  		});
  });

  app.get("/api/companyId", function(req, res) {
      //get last record
      Company.getLastOne(function(data){
        res.send(data);
        console.log(data);
      });
  });

  app.get("/api/companies", function(req, res) {

      Company.selectInfo(function(data){
        console.log(data);
        res.send(data);
      });
  });

    app.get("/api/company/:cid", function(req, res) {
      //getOne: function(table, col1, val, col2, cb)
      console.log(req.params.cid);
      Company.getOne(req.params.cid, function(data){
        res.send(data);
      });
  });   

  app.get("/api/user/:uuid", function(req, res){
    console.log(req.params.uuid);
    User.getOne(req.params.uuid, function(data){
      res.send(data);
    });

  });

  app.put("/api/update/:snum", function(req,res){
    console.log(req.params.snum);
    console.log(req.body.table);
    var cols =[];
    var vals = [];
    if(req.body.table === "survey"){
      req.body.fields.forEach(i=>{
        //seperate into cols and vals
        var values = i.split(":");
        cols.push(values[0]);
        vals.push(values[1]);
      });
      console.log(cols);
      console.log(vals);
      //update survey table
      Survey.update(req.params.snum, cols, vals, function(result){

          if(result.changedRows ==0){
            return res.status(404).end();
          }
          else{
            res.status(200).end();
          }
      });
    }
    else if(req.body.table === "company"){
      //update company table
      req.body.fields.forEach(i=>{
        //seperate into cols and vals
        var values = i.split(":");
        cols.push(values[0]);
        vals.push(values[1]);
      });
      console.log(cols);
      console.log(vals);
      Company.update(req.params.snum, cols, vals, function(result){

          if(result.changedRows ==0){
            return res.status(404).end();
          }
          else{
            res.status(200).end();
          }
      });
    }
    else if(req.body.table === "elevation"){
      //update elevation table
      req.body.fields.forEach(i=>{
        //seperate into cols and vals
        var values = i.split(":");
        cols.push(values[0]);
        vals.push(values[1]);
      });
      console.log(cols);
      console.log(vals);
      Elevation.update(req.params.snum, cols, vals, function(result){

          if(result.changedRows ==0){
            return res.status(404).end();
          }
          else{
            res.status(200).end();
          }
      });
    }
    else if(req.body.table === "legal"){
      //update legal table
      req.body.fields.forEach(i=>{
        //seperate into cols and vals
        var values = i.split(":");
        cols.push(values[0]);
        vals.push(values[1]);
      });
      console.log(cols);
      console.log(vals);
      Legal.update(req.params.snum, cols, vals, function(result){

          if(result.changedRows ==0){
            return res.status(404).end();
          }
          else{
            res.status(200).end();
          }
      });
    }
  });

  //these are the posts
  app.post("/api/create", function(req, res) {
  	var cols = [];
  	var vals = [];
  	//insert new survey order
  	for (var key in req.body) {
    	//the key is the name of the table
    	//console.log(key);
    	var obj = req.body[key];

	    for (var prop in obj) {
	    	cols.push(prop);
	        vals.push(obj[prop])// your code

    	}
    	//check to see which insert statement
    	if(key === "company"){
    		//company insert
    		Company.insert(cols, vals, function(result){
    			//res.send(result);
    		});
    	}
    	else if(key === "survey"){
    		//survey insert
    		Survey.insert(cols, vals, function(result){
    			//res.send(result);
    		});
    	}
    	else if(key === "elevation"){
    		Elevation.insert(cols, vals, function(result){
    			//res.send(result);
    		});
    	}
      else if(key === "ordered"){
        Ordered.insert(cols, vals, function(result){

        });
      }
    	else if(key === "legal"){
    		Legal.insert(cols, vals, function(result){
    			//res.send(result);
    		});
    	}
	    cols = [];
	    vals= [];
	}
  });

};