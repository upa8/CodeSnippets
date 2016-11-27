/// <reference path="../typings/mocha/mocha.d.ts"/>
'use strict';

var chai = require("chai")
, should = chai.should()
, DataLoader = require("../DataLoader")
, dataLoader = new DataLoader()
;

describe("DataLoader", function () {
  it('gets a student synchronously', function() {
    var student = dataLoader.getStudentSync(1);
    
    should.exist(student.name);
    student.name.should.equal("John Doe");
  });
  
  it('gets a student asynchronously', function(done) {
    dataLoader.getStudent(1, function(student) {
      should.exist(student.name);
      student.name.should.equal("John Doe");
      done();
    });
  });
});