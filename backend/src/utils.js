/** Les fonctions d'utilite */
const { Types } = require('./constants');
const mailTransporter = require('../nodemailer.config');


exports.sendEmail = (toEmail, subject, message) => {
    let mailOptions = {
        from: `Ecole Doctorale STG <${process.env.MAIL_FROM}>` ,
        to: toEmail,
        subject,
        text: message,
        html: `<p>${message}</p>`
    };

    mailTransporter.sendMail(mailOptions, function(err, info) {
        console.log('info:', info);

        if (err) {
            console.error(err);
            return err;
        } else {
            console.log("Email sent successfully");
            return true;
        }
    });
}

exports.sum = (arr) => arr.reduce((partialSum, a) => partialSum + a, 0);

exports.isNumeric = val => !isNaN(val);

/**
 * Remove `motDePasse` key from object
 * @param {dict} obj 
 */
exports.removePassword = obj => {
    if ('motDePasse' in obj)
        delete obj.motDePasse;

    return obj;
}

// Numeric string mask:
// https://stackoverflow.com/a/70697511/10526469

/**
 * Appropriately print a phone number.
    For an odd number, separate figures before printing.
    For an even number, return same number.
    Number should normally be odd.(like 6 51 20 98 98)
    e.g. 651234566(odd number) should return 6 51 23 45 66
 * @param {String} numTel 
 */
exports.parseNumTel = (numTel) => {
    let n = numTel.length;

    // if number is even, return it
	if (n % 2 === 0)
		return numTel;
	
	// if number is odd, stylize it.
	result = numTel.charAt(0);

    for (let i = 1; i < n; i += 2) {
        let temp = numTel.charAt(i) + numTel.charAt(i+1);
        result = result + ' ' + temp;
    }

	return result
}

exports.getActeur = (numEtape, niveau) => {
    const { EtapeDossier, ActeurDossier } = Types;
    const acteurMaster = {
        [EtapeDossier.UNE]: ActeurDossier.ETUDIANT,
        [EtapeDossier.DEUX_MASTER]: 'CRFD-STG',
        [EtapeDossier.TROIS_MASTER]: ActeurDossier.DEPARTEMENT,
        [EtapeDossier.QUATRE_MASTER]: ActeurDossier.JURY,
        [EtapeDossier.CINQ_MASTER]: 'CRFD-STG',
        [EtapeDossier.SIX_MASTER]: ActeurDossier.COORDONATEUR,

    };
    const acteurThese = {
        [EtapeDossier.UNE]: ActeurDossier.ETUDIANT,
        [EtapeDossier.DEUX_THESE]: 'CRFD-STG',
        [EtapeDossier.TROIS_THESE]: ActeurDossier.COORDONATEUR,
        [EtapeDossier.QUATRE_THESE]: 'CRFD-STG',
        [EtapeDossier.CINQ_THESE]: ActeurDossier.EXPERT,
        [EtapeDossier.SIX_THESE]: 'CRFD-STG',
        [EtapeDossier.SEPT_THESE]: ActeurDossier.CONSEIL,
        [EtapeDossier.HUIT_THESE]: 'CRFD-STG',
        [EtapeDossier.NEUF_THESE]: ActeurDossier.RECTORAT,
    };

    if (numEtape === EtapeDossier.ZERO) {
        return ActeurDossier.ADMIN;
    } else if (niveau === Types.Niveau.THESE) {
        return acteurThese[numEtape];
    } else if (niveau === Types.Niveau.MASTER) {
        return acteurMaster[numEtape];
    }
}

exports.getEtapeWording = (numEtape, niveau) => {
    const EtapeDossier = Types.EtapeDossier;
    const wordingMaster = {
        [EtapeDossier.DEUX_MASTER]: 'Validation de la constitution du dossier', // departement
        [EtapeDossier.TROIS_MASTER]: 'Validation des jurys', // admin
        [EtapeDossier.QUATRE_MASTER]: 'Notation du dossier', // jury
        [EtapeDossier.CINQ_MASTER]: 'Evaluation de la notation', // admin
        [EtapeDossier.SIX_MASTER]: 'Programmation de la date de soutenance', // coordonateur
    };
    const wordingThese = {
        [EtapeDossier.DEUX_THESE]: 'Validation de la constitution du dossier', // admin
        [EtapeDossier.TROIS_THESE]: 'Validation du sujet de thèse', // coordo
        [EtapeDossier.QUATRE_THESE]: 'Evaluation de la décision du Coordonateur', // admin
        [EtapeDossier.CINQ_THESE]: 'Notation du dossier',  // expert
        [EtapeDossier.SIX_THESE]: 'Evaluation de la notation', // admin
        [EtapeDossier.SEPT_THESE]: 'Appréciation du dossier par le Conseil', // conseil
        [EtapeDossier.HUIT_THESE]: "Evaluation de l'appréciation dossier",  // admin
        [EtapeDossier.NEUF_THESE]: 'Programmation de la date de soutenance',  // rectorat

    };

    if (numEtape === EtapeDossier.ZERO) {
        return "Creation et validation de compte";
    } else if (numEtape === EtapeDossier.UNE) {
        return "Envoi du dossier de soutenance";
    } else if (niveau === Types.Niveau.THESE) {
        return wordingThese[numEtape];
    } else if (niveau === Types.Niveau.MASTER) {
        return wordingMaster[numEtape];
    }
}

