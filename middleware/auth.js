const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

const register = async (email, password, next) => {
    try {
        if (!email || !password) {
            throw new Error("Insufficient info for login");
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
        const passwordHash = await bcrypt.hash(password, salt);
        try {
            const user = await User.create({email, passwordHash});
            next(null, user);
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

const login = async (email, password, next) => {
    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return next(null, null, {msg: "Incorrect Username"});
        }
        const match = await bcrypt.compare(password, user. passwordHash);
        if (match) {
            next(null, user);
        } else {
            next(null, null, {msg: "Wrong Password"});
        }
    } catch (error) {
        next(error)
    }
};

const verify = (token, next) => {
    try {
        next(null, token.user);
    } catch (error) {
        next(error);
    }
};

const verifyStrategy = new JWTStrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter("secret_token")
}, verify);

const registerStrategy = new LocalStrategy({usernameField: "email", passwordField: "password"}, register);

const loginStrategy = new LocalStrategy({usernameField: "email", passwordField: "password"}, login);

module.exports = {
    verifyStrategy,
    registerStrategy,
    loginStrategy
};