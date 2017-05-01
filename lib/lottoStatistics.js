var Helper = require('./lottoStatisticsHelper');
var Logger = new (require('./lottoLogger'));

class LottoStats {
  constructor() {}

  /**
   * Get most repeating numbers from statistics
   * @param {*} statistics Statistics in form of map(number,counter)
   * @param {*} howManyNumbersToPrint How many numbers to get from statistics
   */
  getMostRepeatingNumbers(statistics, howManyNumbersToPrint) {
    var biggestCounter = Helper.getBiggestCounterFromStatistics(statistics);
    var beautyArray = Helper.getMostRepeatingNumbers(statistics, biggestCounter, howManyNumbersToPrint);
    console.log('Most repeating numbers: ' + beautyArray);
    return beautyArray;
  }

  /**
   * Analyze records from Lotto and print to log must repeating numbers from given array
   * @param {*} data Array of objects with result of single games.
   * Proptotype of object:
   * {data_losowania,num_losowania,numerki}
   */
  printToLogMostRepeatingNumbers(statistics) {
    var numbersCounters = this.getMostRepeatingNumbers(statistics, 6);
    Logger.printNiceDrawsChart(statistics);
  }

  countRepeatingNumbers(data){
    return Helper.countRepeatingNumbers(data);
  }

}

module.exports = LottoStats;
