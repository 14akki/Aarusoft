const user = require('../Model/User.Schema');

const createUser = async(userData)=>{ 
    try{
        const newUser = new user(userData);
        await newUser.save();
        return newUser;
    } catch(err){
        throw err;
    }
}

const findUserByEmail = async (userEmail) =>{
    try{
        const userInfo = user.findOne({email:userEmail});
        return userInfo;

    }catch(err){
        throw err;
    }

}

module.exports ={
    createUser,
    findUserByEmail
}