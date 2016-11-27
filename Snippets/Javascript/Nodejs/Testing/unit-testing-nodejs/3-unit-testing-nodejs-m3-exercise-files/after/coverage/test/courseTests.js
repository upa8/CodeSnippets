/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';

var Student = require("../Student")
, Course = require("../Course")
, chai = require("chai")
, should = chai.should()
, expect = chai.expect
;

describe("Course", function () {
  var courseName = "Introduction to Awesomeness",
    courseCode = "AWE 101",
    courseDescription = "This course will make you awesome!",
    student;
    
  beforeEach(function() {
    student = Student.create("John Doe", 5);
  });
    
  it('should save data correctly', function() {
    var course = Course.create(courseName, courseCode, courseDescription);
    
    should.exist(course.name);
    should.exist(course.code);
    should.exist(course.description);
    
    should.exist(course.students);
    course.students.should.eql([]);
    
    should.exist(course.times);
    course.times.should.eql([]);
  });
  
  describe('registerStudent', function() {
    it('should add the student to the students array', function() {
      var course = Course.create(courseName, courseCode, courseDescription);
      
      course.registerStudent(student);
      
      course.students.length.should.equal(1);
      course.students[0].id.should.equal(student.id);
    });
  });
  
  describe('unregisterStudent', function() {
    it("should throw an error if we try to remove a student that isn't in the class", function() {
      var course = Course.create(courseName, courseCode, courseDescription);
      
      expect(function() {
        course.unregisterStudent("asdf");
      }).to.throw();
    });
  });
  
  describe('addTimes', function() {
    it('should add the given days/times to the course', function() {
      var course = Course.create(courseName, courseCode, courseDescription);
      var days = ["Monday", "Wednesday", "Friday"],
        times = ["10:00", "14:00"];
        
      course.addTimes(days, times);
      
      course.times.length.should.equal(6);
      course.times[2].should.eql({
        day: "Wednesday", time: "10:00"
      });
    });
    
    it('should not add a non-day to the times array', function() {
      var course = Course.create(courseName, courseCode, courseDescription);
      var day = "fabulousday", time = "10:00";
      
      expect(function() {
        course.addTimes(day, time);
      }).to.throw();
    });
  });
});
