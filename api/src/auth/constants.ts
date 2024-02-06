export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'default-secret',
  };


//using Node.js and the crypto module to generate a random hex string
//const crypto = require('crypto');
//const jwtSecret = crypto.randomBytes(32).toString('hex');
//console.log(jwtSecret);
// in terminal: node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
