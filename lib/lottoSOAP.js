/**
 * Module responsible for managing communication with
 * LOTTO.PL API SOAP Service
 */

var soap = require("soap");
var async = require('async');
var moment = require('moment');

class LottoSOAP {
  constructor() {}

  /**
   *
   * @param {*} name
   * @param {*} params
   * @param {*} callback
   */
  callLottoMethod(name, params, callback) {
    //Address to SOAP service WSDL file
    const url = 'http://serwis.mobilotto.pl/mapi/index.php?soap=ssv1.wsdl';
    var needParamMethodError = (fromName, paramName) => {
      return fromName + '() Error - required param "' + paramName + '" missing!';
    };
    var possibleMethods = {
      getLastWyniki: function (params, callbackOnResult) {
        if (!params.date) {
          console.log(needParamMethodError('getLastWyniki', 'date'));
          return;
        }
        soap.createClient(url, (err, client) => {
          client.getLastWyniki(params, callbackOnResult);
        });
      }
    };

    var selectedMethod = possibleMethods[name];
    if (!selectedMethod) {
      console.log("callLottoMethod() Error - method '" + name + "' not found");
    }
    selectedMethod.call(this, params, callback);
  }

  /**
   * @brief Get results from all games from giving date
   *
   * API usually return 6 results from given date.
   * @param {*} date Date from which next results will be accessed
   * @param {*} callback Action to do on returned results
   */
  getLastWyniki(date, callback) {
    this.callLottoMethod("getLastWyniki", {
      "date": date
    }, callback);
  }


  getLastWynikiLotto(date,data,callbackRepeat,callbackOnLoadedData) {
    // soap specs
    var getLastWynikiOnlyLottoCallback = function(date,data,callbackRepeat,callbackOnLoadedData){
      // stored: date,data,callbackRepeat,callbackOnLoadedData
      return function(err,result){
        if (err)
          console.log('wynikiGetOnlyLottoCallback: Error at receiving only Lotto game results!');
        else{
          if(date===undefined || data===undefined || callbackRepeat===undefined || callbackOnLoadedData===undefined)
            return;
          let wynikLotto = result.return.wynikiLotto.WynikLotto;
          if(wynikLotto){
            wynikLotto.forEach(function(element) {
              var simpleObject = {
                data_losowania : element.data_losowania.$value,
                num_losowania : element.num_losowania.$value,
                numerki : element.numerki.$value
              };
              data.push(simpleObject)
            }, this);
            date = moment(wynikLotto[wynikLotto.length-1].data_losowania.$value,"YYYY-MM-DD kk:mm:ss").add(1,'days').format("DD-MM-YYYY");
          } else {
            date = moment(date,"DD-MM-YYYY").add(1,"days").format("DD-MM-YYYY");
          }

          callbackRepeat(date,data,callbackRepeat,callbackOnLoadedData);
        }
      }
    };

    var callbackForLastWyniki = getLastWynikiOnlyLottoCallback(date,data,callbackRepeat,callbackOnLoadedData);
    //var promise = this.createPromiseForLastWynikiLottoSOAP(date,getLastWynikiOnlyLottoCallback);
    //Promise.all([promise]).then(function(){console.log('lastWynikiOnlyLotto loaded needed results')}).catch(console.error);
    this.getLastWyniki(date, callbackForLastWyniki);
  }

  createPromiseForLastWynikiLottoSOAP(date, callback){
    return new Promise(function(resolve,reject){
        this.getLastWyniki(date,callback);
        resolve();
    }.bind(this));
  }

  getAllWynikiLottoFromDate(date, data, callbackOnLoadedData){
    var callbackRepeat = function(date,data,callbackRepeat,callbackOnLoadedData){
      if(moment().diff(moment(date,"DD-MM-YYYY"),'days') < 1)
        callbackOnLoadedData(data);
      else{
        this.getLastWynikiLotto(date,data,callbackRepeat,callbackOnLoadedData);
      }
    }.bind(this);

    callbackRepeat(date,data,callbackRepeat,callbackOnLoadedData);
  }
}

module.exports = LottoSOAP;
