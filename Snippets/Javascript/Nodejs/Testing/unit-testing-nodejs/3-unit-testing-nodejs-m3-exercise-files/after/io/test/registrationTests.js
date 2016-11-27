/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';

//jshint expr: true

var Course = require("../Course")
  , Student = require("../Student")
  , Registration = require("../Registration")
  , DataLoader = require("../DataLoader")
  , chai = require("chai")
  , sinon = require("sinon")
  ;
  
chai.should(); 

describe("Registration", function () {
  var dataLoader
    , student
    , course
    , registration
    ;
    
  beforeEach(function() {
    dataLoader = sinon.stub(new DataLoader());
    course = Course.create(dataLoader);
    student = Student.create(dataLoader);
    
    dataLoader.saveCourseSync.returns(true);
    dataLoader.getStudentSync.returns({
      name: "Susan", id:1
    });
  });
  
  it("doesn't call save if the course is full", function() {
    var registration = Registration.create(course, student);
    dataLoader.getCourseSync.returns({
      maxSize: 2,
      students: [{id:2}, {id:3}],
      id: 1
    });
    
    registration.registerStudentForCourse(1, 1);
    
    sinon.assert.notCalled(dataLoader.saveCourseSync);
  });
  
  it("does call save if the course is not full", function() {
    var registration = Registration.create(course, student);
    dataLoader.getCourseSync.returns({
      maxSize: 3,
      students: [{id:2}, {id:3}],
      id: 1
    });
    
    registration.registerStudentForCourse(1, 1);
    
    sinon.assert.called(dataLoader.saveCourseSync);
  });
  
});