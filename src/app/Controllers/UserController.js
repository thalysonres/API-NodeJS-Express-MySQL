const yup = require('yup');
const User = require('../models/User');

class UserController {

  async index(req, res){
    const { page = 1 } = req.query;

    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
      limit: 20,
      offset: ((page - 1) * 20)
    });

    return res.json(users);
  }

  async show(req, res){
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email']
    });

    if (!user){
      return res.status(400).json({ error: 'User not found' });
    }

    return res.json(user);
  }

  async create(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(8)
    }).noUnknown();

    try{
      const userExists = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (userExists){
        return res.status(409).json({ error: 'User not found' });
      }

      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });
      const { id, name, email } = await User.create(validFields);
      return res.json({ id, name, email });

    } catch(error) {
      return res.status(400).json(error);
    }    
  }

  async update(req, res){
    const schema = yup.object().shape({
      id: yup.string(),
      name: yup.string(),
      password: yup.string().min(8)
    }).noUnknown();

    try{
      const user = await User.findByPk(req.userId);

      if (!user){
        return res.status(400).json({ error: 'User not found' });
      }

      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      const { name, email } = await user.update(validFields);
      return res.json({ name, email });

    } catch(error) {
      return res.status(400).json(error);
    }
  }

  async remove(req, res) {
    const id = req.body.id;
    try{
      await User.destroy({
        where: {
          id: id
        }
      });
      res.status(200).end();
    } catch(error) {
      return res.status(400).json(error);
    }
  } 

}   

module.exports = new UserController();
