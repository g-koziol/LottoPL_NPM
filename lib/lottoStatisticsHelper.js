// class StatiscticsHelper {
  /**
   * Get biggest counter from statistics
   * @param {any} statistics Statistics of numbers from last draws
   * @return Max value in collection
   */
  function getBiggestCounterFromStatistics(statistics) {
    var max = 0;
    for (var el of statistics)
      max = el[1] > max
        ? el[1]
        : max;
    return max;
  }
module.exports.getBiggestCounterFromStatistics = getBiggestCounterFromStatistics;

  /**
   * Get array of most repeating numbers from given statistics
   * @param {*} statistics Statistics created from draws information
   * @param {*} highestRepeatingCounter At what counter start counting
   * @param {*} howManyNumbersToGet Minimal counter of how many numbers get. E.x. If there is last number to go, but two numbers have the same repeating counter - take both.
   */
function getMostRepeatingNumbers(statistics, highestRepeatingCounter, howManyNumbersToGet) {
    var highestCounterEntries = this.getMostRepeatingNumbersEntries(statistics, highestRepeatingCounter, howManyNumbersToGet);
    // var result = [];
    highestCounterEntries.sort((a, b) => {
      return Number(a[0]) - Number(b[0])
    });
    return highestCounterEntries.map((el) => {
      return el[0]
    });
    // return result.sort((a,b) => {return a-b;});
  }
module.exports.getMostRepeatingNumbers = getMostRepeatingNumbers;

  /**
   * Get array of entries of most repeating numbers from given statistics
   * @param {*} statistics Statistics created from draws information
   * @param {*} highestRepeatingCounter At what counter start counting
   * @param {*} howManyNumbersToGet Minimal counter of how many numbers get. E.x. If there is last number to go, but two numbers have the same repeating counter - take both.
   */
function getMostRepeatingNumbersEntries(statistics, highestRepeatingCounter, howManyNumbersToGet) {
    var result = [];
    for (var i = highestRepeatingCounter, counter = howManyNumbersToGet; (i > 0) && (counter > 0); i--) {
      for (var entry of statistics) {
        if (entry[1] === i) {
          result.push(entry);
          --counter;
        }
      }
    }
    return result;
  }
module.exports.getMostRepeatingNumbersEntries = getMostRepeatingNumbersEntries;

function countRepeatingNumbers(draws, outputMap, propertyName, separator) {
    if (propertyName == null)
      propertyName = 'numerki';
    if (separator == null)
      separator = ',';
    if (outputMap == null)
      outputMap = new Map();

    draws.forEach((el) => {
      el[propertyName]
        .split(separator)
        .forEach(function (el) {
          el = Number(el);
          if (outputMap.has(el))
            outputMap.set(el, outputMap.get(el)+1);
          else
            outputMap.set(el, 1);
          }
        );
    });

    return outputMap;
  }
module.exports.countRepeatingNumbers = countRepeatingNumbers;

function fillMissingStatisticsValues(statistics, maxNumberInStatistics) {
    for (var i = 1; i <= maxNumberInStatistics; i++) {
      if (!statistics.has(i))
        statistics.set(i, 0);
      }
    }
module.exports.fillMissingStatisticsValues = fillMissingStatisticsValues;

function convertStatisticsMapToArray(statistics) {
    var result = [];
    for (var entry of statistics) {
      result.push(entry);
    }
    return result;
  }
module.exports.convertStatisticsMapToArray = convertStatisticsMapToArray;

function convertStatisticsMapToArrayAndSort(statistics, elementOfEntryUsedToSort) {
    var result = this.convertStatisticsMapToArray(statistics);
    result.sort((a, b) => {
      return a[elementOfEntryUsedToSort] - b[elementOfEntryUsedToSort];
    });
    return result;
  }

// }

module.exports.convertStatisticsMapToArrayAndSort = convertStatisticsMapToArrayAndSort;
