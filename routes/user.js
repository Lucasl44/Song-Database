const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

const session = {session: false};

const profile = (req, res, next) => {
    res.status(200).json({msg: "profile", user: req.user, token: req.query.secret_token})
};

const register = (req, res, next) => {
    if (req.user.email) {
        res.status(201).json({msg: "New User Registered", user: [req.user]});
    } else {
        res.status(401).json({msg: "Email already used"});
    };
};

const login = async (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        try {
            if (err) {
                console.log(err)
                res.status(500).json({msg: "Internal Server Error"});
            } else if (!user) {
                res.status(401).json({info});
            } else {
                const loginFn = async (error) => {
                    if (error) {
                        return next(error);
                    } else {
                        const userData = {id: user.id, email: user.email};
                        const data = {user, token: jwt.sign({user: userData}, process.env.SECRET_KEY)}
                        res.status(200).json(data);
                    }
                };
                req.login(user, session, loginFn)
            }
        } catch (error) {
            return next(error)
        }
    })(req, res, next);
};

const logout = async (req, res) => {
    req.logOut();
    res.redirect("/");
};
// trying to get a logout function
router.get("/", passport.authenticate("jwt", session), profile);
router.post("/register", passport.authenticate("register", session), register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;  