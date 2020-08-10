const express = require("express")

const db = require("./database");


const server = express();

server.use(express.json())

server.get("/", (req, res) => {
    res.json({message: "heyyyyyyy BACKENDD!!!"})
})
//work on this
server.post("/api/users", (req, res) => {
    const user = {name:req.body.name, bio:req.body.bio}
    

    if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    } else{
        const createdUser = db.createUser({
            name: req.body.name,
            bio: req.body.bio
        })
        if (createdUser) {
            res.status(200).json(createdUser)
        } else {
            res.status(500).json({
                message: "cant create"
            })
        }
       
    }
})
//all good
server.get("/api/users", (req, res) => {
    const users = db.getUsers()
   if (users) {
       res.json(users)
    }else {
        res.status(500).json({
            message: "the users information could not be retrieved"
        })
    }
})
//all good
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    const user = db.getUserById(id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist"})
    }
})
//all good
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


server.put('/api/users/:id', (req, res) =>{
 const user = db.getUserById(req.params.id)
 
    if (user){
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user."
            })
        } else {
            const updatedUser = db.updateUser(req.params.id, req.body)
            if (updatedUser) {
                res.status(200).json(updatedUser)
            } else {
                res.status(500).json({
                    message:"The user information could not be modified"
                })
            }
        }
    } 
    else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }


})
/*cant figure out how to test this
server.put("/api/users/:id", (req,res) => {
    
    db.getUserById(req.params.id)
    .then(user => {
        if (!user){
            res.status(404).json({
                message: "User does not exist"
            })
        } else {
    db.updateUser(req.params.id, req.params.body)
    .then((user) => {
        if (!req.body.name || !req.body.bio) {
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
}
        
    })
    .catch((error) => console.log(error))

    
})
 db.getUserById(req.params.id)
    .then(user => {
        if (!req.body.name || !req.body.bio){
            return res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
    db.updateUser(req.params.id, req.body)
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
        }
        
    })
    .catch((error) => console.log(error))

     */









server.listen(8080, () => {
    console.log("server started on port 8080")
})

/*
PUT SOLUTION !!

server.put('/api/users/:id', (req, res) =>
{
    database.findById(req.params.id)
    .then(user =>
    {
        if(!user)
        {
            res.status(404).json({message: 'The user with the specified ID does not exist'});
        }
        else
        {
            const updateUser = req.body;
            if(!updateUser.name || !updateUser.bio)
            {
                res.status(400).json({errorMessage: 'Please provide a name and bio for the user'});
            }
            else
            {
                database.update(user.id, updateUser)
                .then(updatedUser =>
                {
                    res.status(200).json(updateUser);
                })
                .catch(error =>
                {
                    res.status(500).json({errorMessage: 'the user information could not be modified'});
                })
            }
        }
    })
    .catch(error =>
    {
        res.status(500).json({errorMessage: 'The users information could not be retrieved'});
    })
})*/