'use strict';

module.exports.create = function (DataLoader) {
  var _p
    ;

  function Student (info) {
    var me = this
      ;
      
    Object.keys(info).forEach(function (key) {
      me[key] = info[key];
    });
  }

  Student._load = function (studentId) {
    return new Student(DataLoader.getStudentSync(studentId));
  };

  _p = Student.prototype;

  _p._save = function () {
    var me = this
      , toSave = {}
      ;
      
    Object.keys(me).forEach(function (key) {
      if (key.indexOf("_") !== 0) {
        toSave[key] = me[key];
      }
    });
    return DataLoader.saveStudent(me.id, toSave);
  };
  
  return Student;
};