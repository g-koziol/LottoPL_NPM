
class StatiscticsHelper {
  /**
   * Get biggest counter from statistics
   * @param {any} statistics Statistics of numbers from last draws
   * @return Max value in collection
   */
  getBiggestCounterFromStatistics(statistics) {
    var max = 0;
    for (var el of statistics)
      max = el[1] > max ? el[1] : max;
    return max;
  }

  /**
   * Get array of most repeating numbers from given statistics
   * @param {*} statistics Statistics created from draws information
   * @param {*} highestRepeatingCounter At what counter start counting
   * @param {*} howManyNumbersToGet Minimal counter of how many numbers get. E.x. If there is last number to go, but two numbers have the same repeating counter - take both.
   */
  getMostRepeatingNumbers(statistics,highestRepeatingCounter,howManyNumbersToGet){
    var highestCounterEntries = this.getMostRepeatingNumbersEntries(statistics,highestRepeatingCounter,howManyNumbersToGet);
    // var result = [];
    highestCounterEntries.sort((a,b) => {return Number(a[0])-Number(b[0])});
    return highestCounterEntries.map((el)=>{return el[0]});
    // return result.sort((a,b) => {return a-b;});
  }

  /**
   * Get array of entries of most repeating numbers from given statistics
   * @param {*} statistics Statistics created from draws information
   * @param {*} highestRepeatingCounter At what counter start counting
   * @param {*} howManyNumbersToGet Minimal counter of how many numbers get. E.x. If there is last number to go, but two numbers have the same repeating counter - take both.
   */
  getMostRepeatingNumbersEntries(statistics,highestRepeatingCounter,howManyNumbersToGet){
    var result = [];
    for (var i = highestRepeatingCounter, counter = howManyNumbersToGet; i > 0, counter > 0; i--) {
      for (var entry of statistics) {
        if (entry[1] === i) {
          result.push(entry);
          --counter;
        }
      }
    }
    return result;
  }

  
}


module.exports = new StatiscticsHelper();