//In this file we will create mySQL commands 
const connection = require("../config/connection.js");

// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};


const orm = {

	search: function(pattern, col, cb){
		var queryString = "SELECT * FROM survey WHERE ?? LIKE ?";
		connection.query(queryString, [col, pattern], function(err, result){
			if(!!err)
				throw err;
			cb(result);
		})
	},

	getOne: function(table, col1, val, col2, cb){
		var queryString ="SELECT ?? FROM ?? WHERE ?? = ?";
		connection.query(queryString,[col1,table,col2,val],function(err, result){
			if(!!err)
				throw err;
			cb(result);
		});

	},

	selectAll: function(table, cb){
		var queryString = "SELECT * FROM ??";
		connection.query(queryString,[table], function(err, result){
			if(!!err)
				throw err;
			cb(result);

		});
	},

	selectInfo: function(cb){
		connection.query("SELECT cid, name FROM company", function(err, result){
			if(!!err)
				throw err;
			cb(result);
		});
	},

	getLastOne: function(col, table, cb){
		var queryString = "";
		connection.query("SELECT ?? FROM ?? ORDER BY ?? DESC LIMIT 1",[col,table,col], function(err, result){
			if(!!err)
				throw err;
			cb(result);
		});

	},

	//sql insert statement
	insertOne: function(table, cols, vals, cb){
		var queryString = "INSERT into " + table;

		//build the query
		queryString += " (" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) + ") ";
		console.log(queryString);
		console.log(vals);

		connection.query(queryString, vals, function(err, result){
			if(!!err)
				throw err;
			console.log("Inserted");
			cb(result);
		});

	},

	//orm.updateOne(table,"snum",id,cols,vals, function(res
	updateOne: function(table, key, snum, cols, vals, cb){
		//UPDATE `tjk_db`.`survey` SET `buyer`='Test', `contact_for_access`='Testy' WHERE `snum`='180029';

		//var queryString = "UPDATE burgers SET devoured = true WHERE id = ?";
		//build values
		var values = "";
		for(var i = 0 ; i < cols.length; i++){
			if(i == cols.length-1){
				//dont add comma
				values += (cols[i] + " = " +"'"+vals[i] +"'" + " ");
			}
			else{
				values += (cols[i] + " = " +"'"+vals[i] +"'" + ", ");
			}
		}

		var queryString = "UPDATE " + table + " SET " + values + "WHERE ?? = ?";
		console.log(queryString);
		connection.query(queryString, [key, snum], function(err, result){
			if(!!err)
				throw err;
			cb(result);

		});
	}
};

module.exports = orm;

