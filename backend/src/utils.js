/** Les fonctions d'utilite */

const isNumeric = val => !isNaN(val);

/**
 * Remove `motDePasse` key from object
 * @param {dict} obj 
 */
const removePassword = obj => {
    if ('motDePasse' in obj) 
        delete obj.motDePasse;

    return obj;
}


module.exports = { isNumeric, removePassword };
