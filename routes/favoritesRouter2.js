const express = require("express");
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");
const cors = require("./cors");
const favoriteRouter = require("./favoriteRouter");

const favoriteRouter = express.Router();

favoriteRouter
    .route("/")
    .options(cors, cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res, next) => {
        Favorite.find({ user: req.user_id })
            .populate("user")
            .populate("campsites")
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
            })
            .catch((err) => next(err));
    });

exports.module = favoriteRouter;
