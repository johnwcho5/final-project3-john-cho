const orm = require("../config/orm.js");

//functions to call the orm functions
const survey = {
  selectAll: function(cb){
    //call the orm function
    orm.selectAll("survey", function(res){
      cb(res);
    });
  },

  getOne: function(val, cb){
    //function(table, col1, val, col2, cb)
    orm.getOne("survey", "*", val, "snum", function(res){
      cb(res);
    });
  },

  getLastOne: function(cb){
    orm.getLastOne("snum","survey",function(res){
      cb(res);
    });
  },

  insert: function(cols, vals, cb){
    orm.insertOne("survey",cols, vals, function(res){
      cb(res);
    });
  },

  update: function(id, cols, vals, cb){
    orm.updateOne("survey","snum",id,cols,vals, function(res){
      cb(res);
    });
  },

  search: function(pattern, col, cb){
    orm.search(pattern, col, function(res){
      cb(res);
    });
  },

};

module.exports = survey;
