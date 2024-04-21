const Post = require('../model/Post').Post;
const Category = require('../model/Category').Category;
const AppDataSource = require('../../data-source')

const postRepository = AppDataSource.getRepository(Post)
const categoryRepository = AppDataSource.getRepository(Category);

const get = async (req, res) => {
  try {
    const posts = await postRepository.find();
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
const getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await postRepository.findOneBy({id:id});
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const save = async (req, res) => {
  const { title, text, categoryId } = req.body; 
  
  try {
    const category = await categoryRepository.findOneBy({id:categoryId});

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    const post = new Post();
    post.title = title;
    post.text = text;
    post.categories = [category]; 

  
    await postRepository.save(post);

    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

const del = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const post = await postRepository.findOneBy({id:id});
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }
    
    await postRepository.remove(post);
    return res.status(200).json({ message: 'Post deletado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  get,
  getById,
  save,
  del
};
