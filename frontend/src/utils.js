
const sum = (arr) => arr.reduce((partialSum, a) => partialSum + a, 0);

const average = (arr) => sum(arr) / arr.length;


module.exports = { sum, average };
