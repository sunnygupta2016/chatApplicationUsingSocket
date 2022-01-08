const Auth = require("../../common/authenticatte");
const Model = require("../../model");
//const path1 = require("../../public")
const fs = require('fs');
let request = require('request')
module.exports.register = async (req, res, next) => {
    try {
  
     
  
  
      const doc = await Model.Customers.create(req.body);
  
      await doc.setPassword(req.body.password);
      await doc.save();
  
     
  
      return res.success("ACCOUNT_CREATED_SUCCESSFULLY", doc);
    } catch (error) {
      next(error);
    }
  };
  module.exports.login = async (req, res, next) => {
    try {
      const criteria = [];
      if (req.body.email) {
        criteria.push({ email: req.body.email });
      }
      const doc = await Model.Customers.findOne({
        $or: criteria,
        isDeleted: false,
      });
    
      doc.accessToken = await Auth.getToken({ _id: doc._id, role: "CUSTOMER" });
     
      await doc.save();
  
      return res.success("ACCOUNT_LOGIN_SUCCESSFULLY", doc);
    } catch (error) {
      next(error);
    }
  };
  module.exports.upload = async (req, res, next) => {
    try {
    //   const file = req.file

    //   console.log(file)
    //   const readStream = fs.createReadStream("this is sunny ", {highWaterMark: 16});
    //   readStream.on('data', (chunk) => {
    //     data.push(chunk);
    //     console.log('data :', chunk, chunk.length);
    //     // data : <Buffer 49 20 61 6d 20 74 72 61 6e 73 66 65 72 72 69 6e> 16
    //     // data : <Buffer 67 20 69 6e 20 62 79 74 65 73 20 62 79 20 62 79> 16
    //     // data : <Buffer 74 65 73 20 63 61 6c 6c 65 64 20 63 68 75 6e 6b> 16
    // });
    //let request = require('request')
     let range = n => Array.from(Array(n).keys())

    data = range(1000)

    data.forEach(function (item) {
     request.get("https://httpbin.org/ip", function (error, response, body){
      console.log("Request " + item + " complete.")
     });
    })   
      return console.log("sunny")
      const criteria = [];
      if (req.body.email) {
        criteria.push({ email: req.body.email });
      }
      const doc = await Model.Customers.findOne({
        $or: criteria,
        isDeleted: false,
      });
    
      doc.accessToken = await Auth.getToken({ _id: doc._id, role: "CUSTOMER" });
     
      await doc.save();
  
      return res.success("ACCOUNT_LOGIN_SUCCESSFULLY", doc);
    } catch (error) {
      next(error);
    }
  };