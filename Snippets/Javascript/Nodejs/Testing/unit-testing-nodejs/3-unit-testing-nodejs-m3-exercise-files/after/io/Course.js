'use strict';

module.exports.create = function (DataLoader) {
  var _p
    ;

  function Course (info) {
    var me = this
      ;
      
    Object.keys(info).forEach(function (key) {
      me[key] = info[key];
    });
  }

  Course._load = function (courseId) {
    return new Course(DataLoader.getCourseSync(courseId));
  };

  _p = Course.prototype;

  _p._save = function () {
    var me = this
      , toSave = {}
      ;
      
    Object.keys(me).forEach(function (key) {
      if (key.indexOf("_") !== 0) {
        toSave[key] = me[key];
      }
    });
    return DataLoader.saveCourseSync(me.id, toSave);
  };
  
  return Course;
};