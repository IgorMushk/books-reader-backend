const handleMongooseError = (error, data, next) => {
    //console.log('Error bookSchema', error);
    error.status = 400;
    next()
};

module.exports = handleMongooseError;