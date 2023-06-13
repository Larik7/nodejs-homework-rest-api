const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const {User} = require("../models/contact/user");
const {HttpError, sendEmail} = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const userPath = path.resolve("public", "avatars");

const {SECRET_KEY, PROJECT_URL} = process.env;

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw HttpError(409, "Invalid field value");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);
    const result = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

    const verifyEmail = {
        to: email,
        subject: "Verification successful",
        html: `<a target="_blank" href="${PROJECT_URL}/api/auth-routers/verify/${verificationToken}" >Click to verify email</a>`,
    };
    await sendEmail(verifyEmail);


    res.status(201).json({
        email: result.email,
    })
}

const verify = async (req, res) => {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if (!user) {
        throw HttpError(404, "User not found");
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""});
    res.json({
        message: "Verification successful"
    })
}

const resendVerify = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(404, "User not found")
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }
    const verifyEmail = {
        to: email,
        subject: "Verification successful",
        html: `<a target="_blank" href="${PROJECT_URL}/api/auth-routers/verify/${user.verificationToken}" >Click to verify email</a>`,
    };
    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email send"
    })
}

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user || !user.verify) {
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
    verify: ctrlWrapper(verify),
    resendVerify: ctrlWrapper(resendVerify),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}