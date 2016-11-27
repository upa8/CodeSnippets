/// <reference path="typings/mocha/mocha.d.ts"/>
'use strict';

var Promise = require("bluebird")
, chai = require("chai")
, should = chai.should()
;


var student = { name: "John Doe", id: 3 }

var dataAccess = {
  getStudent: function(id) {
    if(id === 3) {
      return Promise.resolve(student);
    } else {
      return Promise.reject('Invalid Student Id')
    }
  }
};

describe("getStudent", function () {
  
});