let app = require("express")()
let server = require("http").Server(app)
let io = require("socket.io")(server)

server.listen(3210)

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

io.on("connection", (socket) => {
  console.log("client connected")
  socket.emit("test", { name: "john" })
  socket.on("test-event", console.log)
})
