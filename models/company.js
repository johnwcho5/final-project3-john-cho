const orm = require("../config/orm.js");

//functions to call the orm functions
const company = {
  selectAll: function(cb){
    //call the orm function
    orm.selectAll("company", function(res){
      cb(res);
    });
  },

  selectInfo: function(cb){
    orm.selectInfo(function(res){
      cb(res);
    });
  },

  getLastOne: function(cb){
    orm.getLastOne("cid","company",function(res){
      cb(res);
    });
  },

  getOne: function(val, cb){
    //orm.getOne("user", "admin", val, "uuid", cb);
    orm.getOne("company", "*", val, "cid", function(res){
      cb(res);
    });
  },

  insert: function(cols, vals, cb){
    orm.insertOne("company",cols, vals, function(res){
      cb(res);
    });
  },


   update: function(id, cols, vals, cb){
    orm.updateOne("company","cid",id,cols,vals, function(res){
      cb(res);
    });
  }

};

module.exports = company;
