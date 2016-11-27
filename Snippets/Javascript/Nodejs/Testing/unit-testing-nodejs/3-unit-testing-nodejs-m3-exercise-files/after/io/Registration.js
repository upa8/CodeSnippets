'use strict';

module.exports.create = function (Course, Student) {
  function Registration () {}

  Registration.registerStudentForCourse = function (studentId, courseId) {
    var student = Student._load(studentId)
      , course = Course._load(courseId)
      ;
      
    course.students = course.students || [];
    
    if (course.maxSize && course.students.length < course.maxSize) {
      course.students.push(student);
      course._save();
      return true;
    }
    
    return false;
  };
  
  return Registration;
};