const jwt = require("jsonwebtoken");
const Model = require("../model");
const SECRET_KEY = process.env.SECRET_KEY || "secret";


module.exports.getToken = (data) =>
    jwt.sign(data, SECRET_KEY, { expiresIn: "30 days" });

module.exports.verifyToken = (token) =>
    jwt.verify(token, SECRET_KEY);

    module.exports.verifySocket = async (socket, next) => {
        try {
            // console.log(socket);
            console.log(socket)
            const token = socket.handshake.token || socket.handshake.headers.token ||socket.handshake.query.token|| "";
            if (!token) throw new Error("MISSING_TOKEN");
            const dataOk = this.verifyToken(token);
          // console.log("dataOk",dataOk);
            const doc  = await Model.Customers.findOne({_id:dataOk._id});
           // console.log(doc);

            if (!doc) throw new Error("INVALID_TOKEN");
          //  if (role) doc.role = role;

            socket.handshake["user"] = doc;
          // console.log("sunny",socket.handshake["user"])
            // proceed next
            next();
        } catch (err) {
            console.log(err)
            err.status = 401;
            next(err);
        }
    };