var ConsolePrinter = new(require('./lottoConsolePrinter'));

class LottoLogger{
    constructor(logger){
        if(!logger)
            this.logger = ConsolePrinter;
    }

    setLogger(logger){
        if (!logger)
            throw 'No logger given!';
        this.logger = logger;
    }

    printNiceDrawsChart(statistics){
        if(this.logger)
            this.logger.printNiceDrawsChart(statistics);
        else
            throw "No logger registered";
    }

}

module.exports = LottoLogger;
