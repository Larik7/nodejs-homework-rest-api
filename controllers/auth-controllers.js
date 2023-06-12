const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

const {User} = require("../models/contact/user");
const {HttpError} = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const userPath = path.resolve("public", "avatars");

const {SECRET_KEY} = process.env;

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, "Invalid field value");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({...req.body, password: hashPassword, avatarURL});

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

const updateAvatar = async (req, res) => {
    const {_id: id} = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(userPath, filename);
    const image = await Jimp.read(oldPath);
    image.resize(250, 250).write(newPath);
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({
      avatarURL,
    });
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}