const http = require("http")

const server = http.createServer((req,res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.write("server up")
    res.end()
})

server.listen(8080, () => {
    console.log("server started on port 8080")
})