const Post = require('../models/Post');
const Com = require('../models/Coms')
const jwt = require('jsonwebtoken');
const fs = require('fs');

/* CREATE ONE POST */
exports.createPost = (req, res, next) => {
    let postBody = JSON.parse(req.body.post);
    const post = new Post(
        {
        ...postBody,
        imageUrl: req.file !== undefined && req.file!== null ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`:null
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

/* UPDATE ONE POST */
exports.modifyPost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    var reqbody = null;
    var post = JSON.parse(req.body.post);

    if (decodedToken.userId == post.userId || decodedToken.isAdmin == true) {

        if (req.file !== undefined && req.file !== null) {
            reqbody = {
                ...post,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }
        } else {
            reqbody = {
                ...post,
            }
        };
        Post.findOne({
            where: {
                id: req.params.id
            }
        }).then(post => {
            if (req.file === undefined && req.file === null) {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.update({
                            ...reqbody, id: post.id,
                        },
                        {
                            where: {
                                id: post.id,
                            }
                        })
                        .then(() => res.status(201).json({ message: 'Post modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            } else {
                Post.update({
                        ...reqbody, id: post.id,
                    },
                    {
                        where: {
                            id: post.id,

                        }
                    })
                    .then(() => res.status(201).json({ message: 'Post modifié !' }))
                    .catch(error => res.status(400).json({ error }));
            }

        })

    }
};

/* DELETE ONE POST */
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    Post.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(post => {
            if (decodedToken.userId == post.userId || decodedToken.isAdmin == true) {

                if(post.imageUrl !== undefined && post.imageUrl !== null){
                    const filename = post.imageUrl.split('/images/')[1];

                    fs.unlink(`images/${filename}`, () => {
                        Post.destroy({
                            where: {
                                id: req.params.id
                            }
                        }).then(() => res.status(200).json({ message: 'Post supprimé !' }))
                            .catch(error => res.status(400).json({ error }));
                    });

                }else {
                    Post.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(() => res.status(200).json({ message: 'Post supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                }

            } else { }
        })
};

/* GET ALL POSTS*/
exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        include: Com,
        order: [["createdAt", "DESC"],
            [Com, "createdAt", "DESC"]
        ]
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};