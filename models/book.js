const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const genreList =  ["fantastic", "love"];
const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

const bookSchema = new Schema({
    // title: String,
    // author: String,
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        //enum: ["fantastic", "love"],
        enum: genreList,
        required: true,
    },
    date: {
        type: String,
        // 16-10-2009
        //match: /^\d{2}-\d{2}-\d{4}$/,
        match: dateRegexp,
        required: true,
    }

}, {versionKey: false, timestamps: true});

// bookSchema.post("save", (error, data, next) => {
//     //console.log('Error bookSchema', error);
//     error.status = 400;
//     next()
// })
bookSchema.post("save", handleMongooseError);

// from schemas/books.js
const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genreList).required(),
    date: Joi.string().pattern(dateRegexp).required(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas ={
    addSchema,
    updateFavoriteSchema,
};

const Book = model("book", bookSchema);

module.exports = {
    Book,
    schemas,
}