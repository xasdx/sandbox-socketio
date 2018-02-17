let app = require("express")()
let server = require("http").Server(app)
let io = require("socket.io")(server)

server.listen(process.env.PORT || 3210)

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

let messages = []

io.on("connection", socket => {
  console.log(`${socket.id} has connected`)
  
  socket.emit("recent_messages", messages.slice(-10))
  
  socket.on("new_client_msg", (msg) => {
    console.log(`${msg.name} commented ${msg.message}`)
    messages.push(msg)
    socket.broadcast.emit("new_msg", msg)
    socket.emit("new_msg", msg)
  })
  
  socket.on("disconnect", () => console.log(`${socket.id} has disconnected`))
})
