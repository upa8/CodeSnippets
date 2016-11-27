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

describe("tests for adding a student to a course", function () {
  var dataLoader
    , student
    , course
    , registration
    ;
  
  beforeEach(function () {
    dataLoader = sinon.stub(new DataLoader ());
    
    dataLoader.getCourseSync.returns({
      maxSize: 2
    , students: []
    , id: 1
    });
    dataLoader.saveCourseSync.returns(true);
    
    dataLoader.getStudentSync.returns({
      name: "susan"
    , id: 1
    });
    
    student = Student.create(dataLoader);
    course = Course.create(dataLoader);
    
    registration = Registration.create(course, student);
  });
  
  it("tests that the correct functions were called on success", function () {
    registration.registerStudentForCourse(1, 1);
    
    sinon.assert.calledOnce(dataLoader.getCourseSync);
    sinon.assert.calledOnce(dataLoader.saveCourseSync);
    
    sinon.assert.calledOnce(dataLoader.getStudentSync);
    
    dataLoader.getCourseSync.getCall(0).calledWith(1).should.be.true;
    dataLoader.getStudentSync.getCall(0).calledWith(1).should.be.true;
  });
  
  it("ensures that save isn't called if the course is full", function () {
    dataLoader.getCourseSync.returns({
      maxSize: 2
    , students: [{id:2}, {id:3}]
    , id: 1
    });
    
    registration.registerStudentForCourse(1, 1);
    
    sinon.assert.notCalled(dataLoader.saveCourseSync);
  });
  
  it("returns true if student was added to course", function () {
    registration.registerStudentForCourse(1, 1).should.be.true;
  });
  
  it("returns false if student was not added to course", function () {
    dataLoader.getCourseSync.returns({
      maxSize: 2
    , students: [{id:2}, {id:3}]
    , id: 1
    });
    
    registration.registerStudentForCourse(1, 1).should.be.false;
  });
});