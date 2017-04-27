
var LottoSOAP = require("../lib/lottoSOAP");

class LottoAPI {
    constructor(){
        this.lottoSOAP = new LottoSOAP();
    }

    /**
     * Process data from Lotto game from given date
     * @param {*} date Date from results will be get from Lotto API. Format : "DD-MM-YYYY"
     * @param {*} callbackOnReadedData Call back to call on returned data from Lotto API
     * Returned data have this objects:
     * { data_losowania, num_losowania, numerki }
     */
    processWynikiLottoFromDate(date,callbackOnReadedData){
        var data = [];
        this.lottoSOAP.getAllWynikiLottoFromDate(date,data,callbackOnReadedData);
    }

}

module.exports =  new LottoAPI();
