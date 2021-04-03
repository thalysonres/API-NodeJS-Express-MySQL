const Attachment = require('../models/Attachment');

class AttachmentController {

  async create(req, res) { 
    const { originalname, filename } = req.file;

    const attachment = await Attachment.create({
        name: originalname,
        file: filename,
    });

    return res.json(attachment);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const attachments = await Attachment.findAll({
      attributes: ['id', 'name', 'file', 'url'],
      limit: 20,
      offset: ((page - 1) * 20)
    });

    return res.json(attachments);
  }

  async show(req, res) {
    const { id } = req.params;
    const attachment = await Attachment.findByPk(id, {
      attributes: ['id', 'name', 'file', 'url']
    });

    if (!attachment){
      return res.status(400).json({ error: 'Attachment not found' });
    }

    return res.json(attachment);
  }

  async remove(req, res) {
    const id = req.body.id;
    try{
      await Attachment.destroy({
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

module.exports = new AttachmentController();
