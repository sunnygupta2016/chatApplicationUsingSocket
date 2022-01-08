const mongoose = require("mongoose");
global.ObjectId = mongoose.Types.ObjectId;
const MONGODB_URL=process.env.MONGODB_URL;
console.log(MONGODB_URL)
module.exports.mongodb = async () => {
    await mongoose.connect(
        MONGODB_URL,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            
        },
        (error, result) => {
            error ? console.error("Mongo", error) : console.log("Mongo Connected");
        }
    );
};
