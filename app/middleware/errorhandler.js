
module.exports = (err, req, res, next) => {
    if(!err.status) {
        res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
    } else {
        res.status(err.status).json( { error: { code: err.code, message: err.message } });
    }
};