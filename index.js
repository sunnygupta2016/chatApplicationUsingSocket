"use strict";
require("dotenv").config();

const express = require("express");
const app = express();
const io = require('socket.io')({ allowEIO3: true, cors: { origin: "*" } });
const fs = require("fs");
const http = require("http");

const cors = require("cors");
 const v1socket = require("./v1/socket");
const connection = require("./common/connection");
// const processes = require("./common/processes");
 const responses = require("./common/responses");
const v1Routes = require("./v1/routes");

//const v1Sockets = require("./v1/socket");
const PORT = process.env.PORT || 8888;
app.use(cors());


app.use(responses());
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", v1Routes);
app.use("/", express.static(__dirname + "/public"));

// 404, Not Found
app.use((req, res, next) => res.error(404, "NOT_FOUND"));

// Error handling
app.use((error, req, res, next) => {
  console.error(error);
  return res.error(400, error.message || error);
});

//sockets
//v1Sockets(io);

// Listening & Initializing
v1socket(io)
const onInit = async () => {
  
  console.log(`HTTP Running on:`, process.env.PORT);
  
  connection.mongodb();

 // processes.init();

};

const httpServer = http.createServer(app).listen(process.env.PORT, onInit);
io.attach(httpServer);



// sockets handling using processes
process.on("emitSocket", (data) => {
    // console.log("data=>",data)
    io.to(data.room).emit(data.event || "default", data);
});