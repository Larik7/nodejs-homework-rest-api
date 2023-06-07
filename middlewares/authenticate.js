const jwt = require("jsonwebtoken");
const {HttpErrror} = require("../helpers");
const {User} = require("../models/contact/user");
const {SECRET_KEY} = process.env;

const authenticate = async (req, res ,next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpErrror(401));
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne(id);
        if (!user) {
            next(HttpErrror(401));
        }
    } catch {
        next(HttpErrror(401));
    }
}
module.exports = authenticate;