"use strict";

var LottoSOAP = require('./lib/lottoSOAP');

var lala = new LottoSOAP();

// var result = {}; var methodName = '/getLastWyniki'; var data = {     "date":
// "2017-01-01" }; var success = (response) => {     this.result = response; };
// var error = (response) => {     this.result = 'error' };
// lala.sendEnvelope(methodName, data, success, error);

var data = [];
var callback = function(data){
  console.log(data);
  process.exit();
}

lala.getAllWynikiLottoFromDate("01-01-2017",data,callback);

//async.parallel()

//process.exit();
