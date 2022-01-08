const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const DocSchema = new Schema(
    {
        email: { type: String, default: "", index: true },
        
        password: { type: String, default: "", index: true },
        fullName: { type: String, default: "" },
        
    
        accessToken: { type: String, default: "", index: true },
        
       
    },
    
    { timestamps: true }
);


// DocSchema.index({ location: "2dsphere" });

DocSchema.index({ dialCode: 1, phoneNo: 1 });
DocSchema.set("toJSON", { getters: true, virtuals: true });

// DocSchema.virtual("fullName")
//     .get(function () {
//         return this.firstName + " " + this.lastName;
//     })
//     .set(function (val) {
//         this.firstName = val.substr(0, val.indexOf(" "));
//         this.lastName = val.substr(val.indexOf(" ") + 1);
//     });

DocSchema.methods.authenticate = function (password, callback) {
    const promise = new Promise((resolve, reject) => {
        if (!password) reject(new Error("MISSING_PASSWORD"));

        bcrypt.compare(password, this.password, (error, result) => {
            if (!result) reject(new Error("INVALID_CURRENT_PASSWORD"));
            resolve(this);
        });
    });

    if (typeof callback !== "function") return promise;
    promise.then((result) => callback(null, result)).catch((err) => callback(err));
};

DocSchema.methods.setPassword = function (password, callback) {
    const promise = new Promise((resolve, reject) => {
        if (!password) reject(new Error("Missing Password"));

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) reject(err);
            this.password = hash;
            resolve(this);
        });
    });

    if (typeof callback !== "function") return promise;
    promise.then((result) => callback(null, result)).catch((err) => callback(err));
};

module.exports = mongoose.model("Customers", DocSchema);
