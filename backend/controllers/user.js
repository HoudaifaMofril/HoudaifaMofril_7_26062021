const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    userId: user.id,
                    isAdmin: user.isAdmin,
                    fname: user.fName,
                    lname: user.lName,
                    token: jwt.sign(
                        {
                            userId: user.id,
                            isAdmin: user.isAdmin
                        },
                        process.env.SECRET_KEY,
                        { expiresIn: '24h' }
                    ),
                    message: 'Utilisateur créé !'
                }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user.id,
                    isAdmin: user.isAdmin,
                    fname: user.fName,
                    lname: user.lName,
                    token: jwt.sign(
                        {
                            userId: user.id,
                            isAdmin: user.isAdmin
                        },
                        process.env.SECRET_KEY,
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));

    })
        .catch(error => res.status(500).json({ error }));
};

exports.delUser = (req, res, next) => {

    User.findOne({ id: req.params.id })
        .then(() => {
            User.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => res.status(200).json({ message: 'User deleted !' }))
                .catch(error => res.status(400).json({ error }));

        })
};

exports.getUser = (req, res, next) => {
    User.findOne({
        where: {
            isAdmin: true
        }
    })
        .then( user => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'});
            }
            res.status(200).json({
                userId: user.id,
                isAdmin: user.isAdmin
            })

        })
};

