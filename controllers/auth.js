const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        const result = bcrypt.compareSync(req.body.password, candidate.password);

        if (result) {
            const token = jwt.sign({email: candidate.email, userId: candidate._id}, keys.jwtKey, {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            })

        } else {
            res.status(401).json({
                message: "Пароли не неподходит"
            })
        }

    } else {
        res.status(404).json({
            message: "Пользователь с таким email ненайден"
        })
    }
};

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        res.status(409).json({
            message: "Данный email уже занят. Попробуйте другой!"
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            email: req.body.email,
            password: password
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            errorHandler(res, e);
        }
    }
};