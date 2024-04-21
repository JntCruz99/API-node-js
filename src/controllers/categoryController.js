const Category = require('../model/Category').Category;
const Post = require("../model/Post").Post;
const AppDataSource = require('../../data-source');

const categoriesRepository = AppDataSource.getRepository(Category);
const postRepository = AppDataSource.getRepository(Post);

const get = async (req, res) => {
  try {
    const categories = await categoriesRepository.find();
    return res.json(categories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const save = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category();
    category.name =  name;
    await categoriesRepository.save(category);
    return res.status(201).json(category);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getById = async (req, res) =>{
  try {
    const id = parseInt(req.params.id);
    //console.log(await categoriesRepository.find({where:{id:id}}))
    return res.status(200).json(await categoriesRepository.findOneBy({id: id,}))
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error'});
  }
}

const del = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    

    const category = await categoriesRepository.findOneBy({id: id,});
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

   
    await categoriesRepository.delete(id);

    return res.status(200).json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    if (error instanceof ForeignKeyConstraintViolationError) {
   
      return res.status(400).json({ error: 'Não é possível excluir a categoria porque existem posts associados a ela' });
    }
    
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


module.exports = {
  get,
  save,
  getById,
  del
};
