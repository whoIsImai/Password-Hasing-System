const User = require('../model/User')
const bcrypt = require('bcrypt')

const register = async(req,res) => {
    const {fname, lname,pword, email, age} = req.body

    let hashedPWord = await bcrypt.hash(pword, 10)
    
    const newUser = new User({
        Firstname: fname,
        Lastname: lname,
        Password: hashedPWord,
        Email: email,
        Age: age
    })

    try {
        await newUser.save()
        res.json(newUser)
    } catch (error) {
        res.json({message : error.message})
    }
}

const getAllUsers = async(req, res)=>{
    const users = await User.find()
    res.json(users)
}

const deleteUser = async(req,res)=>{
    try {
                await res.user.deleteOne()
        res.json({"message": "user removed"})
    } catch (error) {
        res.json({error: error.message})
    }
}

const login = async(req,res)=>{
    if (await bcrypt.compare(req.body.pword, res.user.Password)){
        res.send(res.user)
    }
    else{
        res.json({message : "Not allowed"})
    }
   
}

const update = async(req,res)=>{
    if(req.body.fname != null){
        res.user.Firstname = req.body.fname
    }
    if(req.body.lname != null){
        res.user.Lastname = req.body.lname
    }
    if(req.body.email != null){
        res.user.Email = req.body.email
    }
    if(req.body.age != null){
        res.user.Age = req.body.age
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.json({error: error.message})
    }
}

async function getUser(req,res,next){
    let user
    try {
        user = await User.findOne({Firstname : req.params.firstname})

        if (!user){
            return res.json({'message': 'user does not exist'})
        }
    } catch (error) {
        res.json({error: error.message})
    }
    
    res.user = user
    next()
}


module.exports ={register, getAllUsers, getUser, deleteUser, login, update}