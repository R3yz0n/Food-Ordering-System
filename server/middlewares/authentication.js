const jwt = require('jsonwebtoken');
const env = require('dotenv').config()




const checkAuthentication = async (req, res, next) => {

    if (!req.headers.authorization) {

        console.log('---------------sagar-');
        return res.status(403).json({ message: "Unauthorized user." })
    }
    // console.log(req.headers.authorization);
    // console.log(req.headers.authorization.split(" ")[1]);
    console.log(req.headers.authorization);




    try {
        // console.log('------1-');
        const decodedUser = await jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET)
        console.log(decodedUser);
        console.log('next auth');
        next()


    }
    catch (error) {
        console.log(error.message);

        return res.status(401).json({
            message: "Unauthorized user."
        })

    }




}

module.exports = { checkAuthentication: checkAuthentication }

