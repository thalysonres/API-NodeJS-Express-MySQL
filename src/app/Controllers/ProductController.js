const yup = require('yup');
const Product = require('../models/Product');

class ProductController {

  async index(req, res) {
    const { page = 1 } = req.query;

    const products = await Product.findAll({
      limit: 20,
      offset: ((page - 1) * 20)
    });

    return res.json(products);
  }

  async show(req, res) {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product){
      return res.status(400).json({ error: 'Product not found' });
    }

    return res.json(product);
  }

   async create(req, res) { 
    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
      price: yup.number(8,2).required(),
      attachment_id: yup.number()
    }).noUnknown();

    try{
      const productExists = await Product.findOne({
        where: {
            name: req.body.name
        }
      });
      if (productExists){
        return res.status(409).json({ error: 'Product already registered' });
      }

      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });
      const product = await Product.create({
        ...validFields,
        user_id: req.userId
      });
      return res.json(product);

    } catch(error) {
      return res.status(400).json(error);
    }    
  }

  async update(req, res){
    const schema = yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required(),
      description: yup.string().required(),
      price: yup.number(8,2).required(),
      attachment_id: yup.number()
    }).noUnknown();

    try{
      const product = await Product.findByPk(req.body.id);

      if (!product){
        return res.status(400).json({ error: 'Product not found' });
      }

      const validFields = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      await product.update(validFields);
      return res.json(product);

    } catch(error) {
      return res.status(400).json(error);
    }
  }

  async remove(req, res) {
    const id = req.body.id;
    try{
      await Product.destroy({
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

module.exports = new ProductController();
