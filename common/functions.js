const _ = require("lodash");
module.exports.prettyCase = (str) => {
    if (typeof str === "string" && /^[A-Z_]+$/.test(str)) {
        str = _.lowerCase(str);
        str = _.startCase(str);
    }
    return str;
};
