let app = require("express")()
let server = require("http").Server(app)
let io = require("socket.io")(server)

server.listen(process.env.WEB_APP_PORT)

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

io.on("connection", (socket) => {
  console.log("client connected")
  socket.on("new_client_msg", (msg) => {
    console.log(`${msg.name} commented ${msg.message}`)
    socket.broadcast.emit("new_msg", msg)
    socket.emit("new_msg", msg)
  })
})
