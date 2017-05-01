var Helper = require('./lottoStatisticsHelper');

const xLegendLotto = ' 1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30' +
        ' 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49';
const LottoGameNumbers = 49;

class LottoConsolePrinter {
    constructor() {}

    printXLegend() {
        console.log(xLegendLotto);
    }
    createChartLine(statistics, repeatNumber) {
        var line = '';
        statistics.forEach((entry) => {
            if (entry[1] >= repeatNumber) {
                line += ' * ';
            } else {
                line += '   ';
            }
        });
        return line;
    }

    createChart(statistics){
        var lines = [];
        for (let i = Helper.getBiggestCounterFromStatistics(statistics); i > 0; i--) {
            lines.push(this.createChartLine(statistics, i));
        }
        return lines;
    }

    printChart(statistics) {
        this.createChart(statistics).forEach((el) => {
            console.log(el)
        });
    }

    printNiceDrawsChart(statistics) {
        Helper.fillMissingStatisticsValues(statistics, LottoGameNumbers);
        var convertedStatistics = Helper.convertStatisticsMapToArrayAndSort(statistics, 0);
        console.log("Chart representing occurences of numbers for draws from given timestamp:");
        this.printChart(convertedStatistics);
        this.printXLegend();
    }
}

module.exports = LottoConsolePrinter;
