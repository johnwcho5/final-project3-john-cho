const orm = require("../config/orm.js");

//functions to call the orm functions
const elevation = {
  selectAll: function(cb){
    //call the orm function
    orm.selectAll("survey", function(res){
      cb(res);
    });
  },

   getOne: function(val, cb){
    //function(table, col1, val, col2, cb)
    orm.getOne("elevation", "*", val, "elev_id", function(res){
      cb(res);
    });
  },

  getLastOne: function(cb){
    orm.getLastOne(function(res){
      cb(res);
    });
  },

  insert: function(cols, vals, cb){
    orm.insertOne("elevation",cols, vals, function(res){
      cb(res);
    });
  },

   update: function(id, cols, vals, cb){
    orm.updateOne("elevation","elev_id",id,cols,vals, function(res){
      cb(res);
    });
  }

};

module.exports = elevation;
