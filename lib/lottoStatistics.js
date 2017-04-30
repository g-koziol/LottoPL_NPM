var Helper = require('./lottoStatisticsHelper');

class LottoStats {
  constructor() { }

  /**
   * Get most repeating numbers from statistics
   * @param {*} statistics Statistics in form of map(number,counter)
   * @param {*} howManyNumbersToPrint How many numbers to get from statistics
   */
  getMostRepeatingNumbers(statistics, howManyNumbersToPrint) {
    var biggestCounter = Helper.getBiggestCounterFromStatistics(statistics);
    // var counter = howManyNumbersToPrint;
    // var result = [];

    // // get objects with statistcis fo most repeating numbers
    // for (var i = biggestCounter; i > 0, counter > 0; i--) {
    //   for (var entry of statistics) {
    //     if (entry[1] === i) {
    //       result.push(entry);
    //       --counter;
    //     }
    //   }
    // }

    // result.sort((a, b) => {
    //   return Number(a[0]) - Number(b[0]);
    // });
    var beautyArray = Helper.getMostRepeatingNumbers(statistics,biggestCounter,howManyNumbersToPrint);
    //result.forEach((el) => { beautyArray.push(el[0]) });
    console.log('Most repeating numbers: ' + beautyArray);
  }

  /**
   * Analyze records from Lotto and print to log must repeating numbers from given array
   * @param {*} data Array of objects with result of single games.
   * Proptotype of object:
   * {data_losowania,num_losowania,numerki}
   */
  printToLogMostRepeatingNumbers(data) {
    // var getMostRepeatingNumbers = 

        var numbersCounters = new Map();
    var func = (function () {
      return (() => {
        data
          .forEach(function (element) {
            element
              .numerki
              .split(',')
              .forEach(function (element) {
                if (numbersCounters.has(element))
                  numbersCounters.set(element, numbersCounters.get(element) + 1);
                else
                  numbersCounters.set(element, 1);
              }
                .bind(this));
          }.bind(this));
      })
    })()();

    this.getMostRepeatingNumbers(numbersCounters, 6);
    this.printToLogNiceChartToLog(numbersCounters);
  }

  printToLogNiceChartToLog(statistics) {
    var printXLegend = function () {
      var pattern = '';
      for (var i = 1; i <= 49; i++) {
        pattern += i + ' ';
      }
      console.log(pattern);
    }

    for (var i = 1; i <= 49; i++) {
      if (!statistics.has(String(i)))
        statistics.set(String(i), 0);
    }

    var result = [];
    for (var entry of statistics) {
      result.push(entry);
    }
    //sort statistics
    result.sort((a, b) => {
      return Number(a[0]) - Number(b[0]);
    });


    // find chart height
    var biggestCounter = 0;
    result.forEach((entry) => {
      if (entry[1] > biggestCounter)
        biggestCounter = entry[1];
    });
    var lines = [];
    //print next lines with '*' representing one occurrence
    for (let i = biggestCounter; i > 0; i--) {
      // get objects with statistcis fo most repeating numbers
      var line = '';
      result.forEach((entry) => {
        if (entry[1] >= i) {
          line += '*';
        } else {
          line += ' ';
        }

        // wathcout for two digits number
        if (Number(entry[0]) > 8)
          line += '  ';
        else
          line += ' ';

      });
      lines.push(line);
    }
    console.log("Chart representing occurences of numbers for draws from given timestamp:");
    lines.forEach((el) => { console.log(el) });
    printXLegend();
  }
}

module.exports = new LottoStats();
