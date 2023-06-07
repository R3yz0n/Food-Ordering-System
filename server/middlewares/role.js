const env = require('dotenv')
env.config();
const jwt = require('jsonwebtoken')
const { user } = require('../models')
const checkRole = async (req, res, next) => {


    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedUser);
        // console.log('role');
        console.log(decodedUser.role);


        try {
            const userData = await user.findByPk(decodedUser.id)
            // console.log(userData);

            if (userData.dataValues.role === decodedUser.role) {

                console.log('authorized');
                next()
            }
            else {
                console.log('aunthorized');
                res.status(401).json({
                    message: "Unauthorized user."
                })
            }

        }
        catch (error) {
            res.status(500).json({
                message: "Something went wrong."
            })

        }



    }
    catch (error) {
        console.log(error);

        res.status(401).json({
            message: "Invalid token."
        });

    }


}


module.exports = {
    checkRole: checkRole
}