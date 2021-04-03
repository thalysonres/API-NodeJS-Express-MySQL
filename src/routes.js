const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const UserController = require('./app/Controllers/UserController');
const AttachmentController = require('./app/Controllers/AttachmentController');
const ProductController = require('./app/Controllers/ProductController');
const AuthController = require('./app/Controllers/AuthController');
const authMiddleware = require('./app/middlewares/authMiddleware');

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/auth', AuthController.create);
routes.post('/users', UserController.create);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.remove);

routes.post('/attachments', upload.single('file'), AttachmentController.create);
routes.get('/attachments', AttachmentController.index);
routes.get('/attachments/:id', AttachmentController.show);
routes.delete('/attachments', AttachmentController.remove);

routes.post('/products', ProductController.create);
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.put('/products', ProductController.update);
routes.delete('/products', ProductController.remove);

routes.get('/', (req,res) =>{
    res.json({ message: 'API OK' });
})

module.exports = routes; 
