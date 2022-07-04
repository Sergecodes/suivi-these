const crypto = require('crypto');


const sum = (arr) => arr.reduce((partialSum, a) => partialSum + a, 0);

const average = (arr) => sum(arr) / arr.length;

const generatePassword = (
   length = 16,
   wishlist = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz~!@-#$&'
) =>
   Array.from(crypto.randomFillSync(new Uint32Array(length)))
      .map((x) => wishlist[x % wishlist.length])
      .join('');


module.exports = { sum, average, generatePassword };
