module.exports = function(sequelize, DataTypes) {

  var Employee = sequelize.define("Employee", {
    eid:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name:{type: DataTypes.STRING, allowNull: false},
    last_name:{type: DataTypes.STRING, allowNull: false},
    hourly_rate:{type: DataTypes.DOUBLE, allowNull: false},
    emp_type:{type: DataTypes.STRING, allowNull: false},
  },{timestamps: false});
  return Employee;
};