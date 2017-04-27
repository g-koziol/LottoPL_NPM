/**
 * Module responsible for managing communication with
 * LOTTO.PL API SOAP Service
 */

var soap = require("soap");
var async = require('async');

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

  /**
   * @brief Get only results from 'Lotto' game
   * @param {*} date Date from which results will be downloaded
   * @param {*} callback Action used on data
   */
  getLastWynikiLotto(date, callback) {
    // soap specs
    var wynikiLotto;
    var wynikiGetOnlyLottoCallback = function(err, result){
      if (err)
        console.log('wynikiGetOnlyLottoCallback: Error at receiving only Lotto game results!');
      else{
        callback(err, result.return.wynikiLotto);
      }
    }.bind(this);


    this.getLastWyniki(date,wynikiGetOnlyLottoCallback);
  }
}

module.exports = LottoSOAP;
