"use strict";


// var appjs = require('appjs'); var http = require('http'); var XMLHttpRequest
// = require("xmlhttprequest").XMLHttpRequest;
var LottoSOAP = require('./lib/lottoSOAP');

var lala = new LottoSOAP();

// var result = {}; var methodName = '/getLastWyniki'; var data = {     "date":
// "2017-01-01" }; var success = (response) => {     this.result = response; };
// var error = (response) => {     this.result = 'error' };
// lala.sendEnvelope(methodName, data, success, error);

lala.getLastWynikiLotto("20170101", (err, result) => {
  if (err)
    console.log('Something bad happened');
  result
    .WynikLotto
    .forEach(function (element) {
var output = 'Data losowania: ' + element.data_losowania.$value + '\nNum losowania ' + element.num_losowania.$value + '\nNumerki: ' + element
  .numerki
  .$value
  .split(',')
  .join(" ");
  console.log(output);
    }, this);
  process.exit();
});

async.parallel()

//process.exit();
