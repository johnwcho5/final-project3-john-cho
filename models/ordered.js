const orm = require("../config/orm.js");

//functions to call the orm functions
const ordered = {
  selectAll: function(cb){
    //call the orm function
    orm.selectAll("survey", function(res){
      cb(res);
    });
  },

  getOne: function(val, cb){
    //function(table, col1, val, col2, cb)
    orm.getOne("ordered", "cid", val, "snum", function(res){
      cb(res);
    });
  },

  getLastOne: function(cb){
    orm.getLastOne("snum","survey",function(res){
      cb(res);
    });
  },

  insert: function(cols, vals, cb){
    orm.insertOne("ordered",cols, vals, function(res){
      cb(res);
    });
  },

  update: function(id, cb){
    orm.updateOne(id, function(res){
      cb(res);
    });
  }

};

module.exports = ordered;
