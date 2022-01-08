const functions = require("./functions");
module.exports = () => (req, res, next) => {
    // success response
    res.success = (message, data) => {
        message = functions.prettyCase(message);
        return res.send({ statusCode: 200, message, data: data || {} });
    };

    // error resposne
    res.error = (code, message, data) => {
        message = functions.prettyCase(message);
        res.status(208).send({ statusCode: code, message, data: data || null });
    };

    // proceed forward
    next();
};