const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/contact/user");
const {HttpError} = require("../helpers");
const {ctrlWrapper} = require("../decorators");

const {SECRET_KEY} = process.env;

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, "Invalid field value");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email: result.email,
    })
}

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(401, "Email or password wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password wrong");
    }

    const {_id: id} = user;
    const payload = {
        id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(id, { token });

    res.json({
        token,
    })
}

const getCurrent = async (req, res) => {
    const {email, subscription} =  req.user;
    res.json({
        email,
        subscription,
    });
}

const logout = async (req, res) => {
    const {_id: id} = req.user;
    await User.findByIdAndUpdate(id, { token: "" });
    res.json({
        message: "You have been logged out"
    });
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}