const jwt = require('jsonwebtoken');
const env = require('dotenv')
env.config({ path: '.env.local' });



const checkAuthentication = async (req, res, next) => {
    console.log(req.headers.authorization);
    console.log(req.headers.authorization.split(" ")[1]);
    if (!req.headers.authorization) {
        console.log('----------------');
        return res.status(403).json({ message: "Unauthorized user." })
    }




    try {
        // const decodedUser = jwt.verify(req.headers.authorization, 'secret')
        console.log('------1-');
        const decodedUser = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET)
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

