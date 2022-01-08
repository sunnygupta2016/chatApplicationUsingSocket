const Auth = require("../common/authenticatte");
const Server = require("socket.io");

module.exports = (io)=>{
    io.use(Auth.verifySocket);
    io.on("connection", (client) => {
        console.log("client",client.server)
       console.log("sunny",client.id)
      
        const user = client.handshake.user;
        const time1 = client.handshake.time
        console.log("time",time1)
        const room = `${user._id}`;
        const whom = user.email || user.phoneNo || "buddy";
        console.log("connected",user.fullName)
        if(user.role=='admin'){//Notification
            client.join("commonAdmins");
        }
        if (user.role == 'driver') {//Request Clearnace
            client.geoExpiry = null;
        }
        client.join(room);
        io.to(room).emit("welcome", { message: `Welcome ${whom}, you are now connected to socket server.` });
        console.log("Connected", room, whom);
        
        client.on("disconnect", () => {
            const time = new Date()

            console.log("Disconnected:", room, whom,time);
        });
        client.on("chat",(data)=>{
           io.to(data.id).emit("chat",{ message: data })
        })
        // just for testing
        client.on("testnow", (data) => {
            console.log("testnow", data);
            client.emit("testnow", data); 
        });

        client.on("statusChange",async(data)=>{
           await DriverController.changeOrderStatus(data);
        })
        client.on("latLng", async (data) => {
            const {geoExpiry} = await DriverController.handleDriverLocation(data, client.geoExpiry, user);
            client.geoExpiry = geoExpiry; 
        })
        client.on("trackDriver", async (data,user) => {
            await DriverController.trackDriver(data,user);
        })
    });
}