const {Book} = require("../models/book")

//const books = require("../models/books"); // func for work JSON 

const { HttpError, ctrlWrapper } = require("../helpers");



const getAll = async (req, res) => {
    //const result = await books.getAll();
    // const result = await Book.find();
    //const result = await Book.find({title: "Pro Git"});
    const result = await Book.find({}, "-createdAt -updatedAt");
    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    // const result = await books.getById(id);
    //const result = await Book.findOne({_id: id});
    const result = await Book.findById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const add = async (req, res) => {
    //const result = await books.add(req.body);

    //const {date} = req.body; // YYYY-MM-DD - joi
    //const formatDate = // DD-MM-YYYY - mongoose
    const result = await Book.create(req.body);
    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    //const result = await books.updateById(id, req.body);
    const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const updateFavorite = async (req, res) => {
    const { id } = req.params;
    //const result = await books.updateById(id, req.body);
    const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    //const result = await books.deleteById(id);
    const result = await Book.findByIdAndDelete(id);
    //const result = await Book.findByIdAndRemove(id); // {_id: id} - "message": "Book.findByIdAndRemove is not a function"
    if (!result) {
        throw HttpError(404, "Not found");
    }
    // res.status(204).send()
    res.json({
        message: "Delete success"
    })
}


module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteById: ctrlWrapper(deleteById),
}