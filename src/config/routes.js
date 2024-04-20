const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');

module.exports = app => {
  app.route('/post')
    .post(postController.save)
    .get(postController.get)
  app.route('/categors')
    .post(categoryController.save)
    .get(categoryController.get)
  app.route('/categors/:id')
    .get(categoryController.getById)
    .delete(categoryController.del)
};
