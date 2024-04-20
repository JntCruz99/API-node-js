const Post = require('../model/Post');
const AppDataSource = require('../../data-source')

const postRepository = AppDataSource.getRepository(Post)

const get = async (req, res) => {
  try {
    const posts = await postRepository.find();
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const save = async (req, res) => {
  const { title, text } = req.body;
  try {
    const post = new Post({ title, text });
    await postRepository.save();
    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  get,
  save
};
