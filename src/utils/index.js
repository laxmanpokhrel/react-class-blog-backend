const jwt = require("jsonwebtoken")

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '180000s' });
}



module.exports = { generateAccessToken }