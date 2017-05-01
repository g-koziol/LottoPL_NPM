"use strict";

var Lotto = require('./lib/lotto');

// var result = {}; var methodName = '/getLastWyniki'; var data = {     "date":
// "2017-01-01" }; var success = (response) => {     this.result = response; };
// var error = (response) => {     this.result = 'error' };
// lala.sendEnvelope(methodName, data, success, error);

var data = [];
const date = "01-04-2017";
var callback = function (data) {
  console.log('Loaded ' + data.length + ' draws from date "' + date + '"');
// var statistics = Lotto.countRepeatingNumbers(data, null);
  Lotto.printToLogMostRepeatingNumbers(Lotto.countRepeatingNumbers(data, null));
  //LottoStat.printToLogNiceChartToLog(data);
  process.exit();
}

Lotto.processWynikiLottoFromDate(date, callback);

//async.parallel() process.exit();
