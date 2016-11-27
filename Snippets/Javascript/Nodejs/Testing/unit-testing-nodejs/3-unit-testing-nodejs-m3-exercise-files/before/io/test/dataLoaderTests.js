'use strict';

var chai = require("chai")
, should = chai.should()
, DataLoader = require("../DataLoader")
, dataLoader = new DataLoader()
;

//these kinds of tests are good for refactoring.  Say I want to change how my dataloader gets data from a file to a database.  Having these functions that very simply validate the dataloader makes sure that it still returns data in an expected format.

describe("testing syncronous file io", function () {
  
  it("gets a student syncronously", function () {
    var student = dataLoader.getStudentSync(1);
    
    should.exist(student.name);
    student.name.should.equal("John Doe");
  });
  
  //we don't want to do it this way.  No matter what happens, this test passes becuase we didn't use done();
  // it("gets a student asyncronously", function () {
  //   dataLoader.getStudent(1, function (student) {
  //     should.exist(student.name);
  //     student.name.should.equal("John Doe");
  //   });
  // });
  
  it("gets a student asyncronously with done", function (done) {
    dataLoader.getStudent(1, function (student) {
      should.exist(student.name);
      student.name.should.equal("John Doe");
      done();
    });
  });
});