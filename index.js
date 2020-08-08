const express = require("express")

const db = require("./database")

const server = express();

server.use(express.json())

server.get("/", (req, res) => {
    res.json({message: "heyyyyyyy BACKENDD!!!"})
})
//work on this
server.post("/api/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else{
        res.status(500).json({
            message: "The user information could not be retrieved"
        })
    }
})
//all good
server.get("/api/users", (req, res) => {
    const users = db.getUsers()
   if (user) {
       res.json(users)
    }else {
        res.status(500).json({
            message: "the users information could not be retrieved"
        })
    }
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist"})
    }
})

server.delete("/api/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    if (user){
        db.deleteUser(req.params.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }
})


server.put("/api/users/:id", (req,res) => {
    if (!req.body.name || !req.body.bio){
        return res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    }

    users.update(req.params.id, req.body)
    .then((user) => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(401).json({
                message: "The user with the specified id does not exist"
            })
        }
    })
    .catch((error) =>{
        console.log(error)
        res.status(500).json({
            message: "the user information could not be modified"
        })
    })
})










server.listen(8080, () => {
    console.log("server started on port 8080")
})