const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const User = require('../models/User');

class AuthController {

    async create(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if(!user){
            return res.status(401).json({ error: 'User not found' });
        }

        if(!(await user.checkPass(password))){
            return res.status(401).json({ error: `Password doesn't match` });
        }

        const { id, name } = user;

        return res.json({
            user: { id, name, email},
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        });
    }
}

module.exports = new AuthController();