const checkForEmail = require('../../../model/ownerModels').checkForEmail;

const owner = async value => {
    const val = await checkForEmail('owner',value);
    if(!val) throw new Error("Email already in use.");
    return true;
}

const seeker = async value => {
    const val = await checkForEmail('seeker',value);
    if(!val) throw new Error("Email already in use.");
    return true;
}

module.exports = {owner, seeker};