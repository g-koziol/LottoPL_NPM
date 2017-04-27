class LottoStats {
    constructor() {}

    /**
     * Analyze records from Lotto and print to log must repeating numbers from given array
     * @param {*} data Array of objects with result of single games.
     * Proptotype of object:
     * {data_losowania,num_losowania,numerki}
     */
    printToLogMostRepeatingNumbers(data) {
        var getMostRepeatingNumbers = function (statistics, howManyNumbersToPrint) {
            var biggestCounter = 0;
            for (var entry of statistics){
                if (entry[1] > biggestCounter)
                    biggestCounter = entry[1];
            }
            console.log(biggestCounter);
            }

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

        getMostRepeatingNumbers(numbersCounters, 6);
    }
}

module.exports = new LottoStats();
