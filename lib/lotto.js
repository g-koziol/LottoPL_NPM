var LottoSOAP = new(require("../lib/lottoSOAP"));
var LottoStatistic = new(require('./lottoStatistics'));
var LottoLogger = new(require('./lottoLogger'));

class LottoAPI {
    constructor() {}

    /**
     * Process data from Lotto game from given date
     * @param {*} date Date from results will be get from Lotto API. Format : "DD-MM-YYYY"
     * @param {*} callbackOnReadedData Call back to call on returned data from Lotto API
     * Returned data have this objects:
     * { data_losowania, num_losowania, numerki }
     */
    processWynikiLottoFromDate(date, callbackOnReadedData) {
        var data = [];
        LottoSOAP.getAllWynikiLottoFromDate(date, data, callbackOnReadedData);
    }

    printToLogMostRepeatingNumbers(data) {
        LottoStatistic.printToLogMostRepeatingNumbers(data);
    }

    countRepeatingNumbers(data) {
        return LottoStatistic.countRepeatingNumbers(data,null);
    }

}

module.exports = new LottoAPI();
