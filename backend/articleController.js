const { bucket } = require('./storageConfig');
const { v4: uuidv4 } = require('uuid');

const getNextArticleNumber = async () => {
  const [files] = await bucket.getFiles({ prefix: 'artikel_' });
  const numbers = files
    .map(file => parseInt(file.name.split('_')[1].split('.')[0]))
    .filter(num => !isNaN(num));
  return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
};

exports.createArticle = async (req, res) => {
  try {
    const { title, content, author, source } = req.body;
    const id = uuidv4();
    const publishDate = new Date().toISOString();
    let imageUrl = '';

    if (req.file) {
      const blob = bucket.file(`Images/${req.file.originalname}`);
      const blobStream = blob.createWriteStream();

      await new Promise((resolve, reject) => {
        blobStream.on('finish', resolve);
        blobStream.on('error', reject);
        blobStream.end(req.file.buffer);
      });

      imageUrl = `https://storage.googleapis.com/${bucket.name}/Images/${req.file.originalname}`;
    }

    const article = {
      id,
      title,
      content,
      author,
      publishDate,
      imageUrl,
      source
    };

    const articleNumber = await getNextArticleNumber();
    const fileName = `artikel_${articleNumber}.json`;

    await bucket.file(fileName).save(JSON.stringify(article));

    res.status(201).json({ ...article, fileName });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).send(error.message);
  }
};

exports.getArticles = async (req, res) => {
  try {
    const [files] = await bucket.getFiles({ prefix: 'artikel_' });
    const articles = await Promise.all(
      files.map(async (file) => {
        const [contents] = await file.download();
        return { ...JSON.parse(contents.toString()), fileName: file.name };
      })
    );
    res.json(articles);
  } catch (error) {
    console.error('Error getting articles:', error);
    res.status(500).send(error.message);
  }
};

exports.getArticle = async (req, res) => {
  try {
    const [files] = await bucket.getFiles({ prefix: 'artikel_' });
    const file = files.find(f => f.name.includes(req.params.id));
    
    if (file) {
      const [contents] = await file.download();
      const article = JSON.parse(contents.toString());
      res.json({ ...article, fileName: file.name });
    } else {
      res.status(404).send('Article not found');
    }
  } catch (error) {
    console.error('Error getting article:', error);
    res.status(500).send(error.message);
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { title, content, author, source } = req.body;
    const [files] = await bucket.getFiles({ prefix: 'artikel_' });
    const file = files.find(f => f.name.includes(req.params.id));

    if (file) {
      const [contents] = await file.download();
      let article = JSON.parse(contents.toString());
      
      article = { ...article, title, content, author, source };

      if (req.file) {
        const blob = bucket.file(`Images/${req.file.originalname}`);
        const blobStream = blob.createWriteStream();

        await new Promise((resolve, reject) => {
          blobStream.on('finish', resolve);
          blobStream.on('error', reject);
          blobStream.end(req.file.buffer);
        });

        article.imageUrl = `https://storage.googleapis.com/${bucket.name}/Images/${req.file.originalname}`;
      }

      await file.save(JSON.stringify(article));
      res.json({ ...article, fileName: file.name });
    } else {
      res.status(404).send('Article not found');
    }
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).send(error.message);
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const [files] = await bucket.getFiles({ prefix: 'artikel_' });
    const file = files.find(f => f.name.includes(req.params.id));

    if (file) {
      await file.delete();
      res.status(200).send('Article deleted successfully');
    } else {
      res.status(404).send('Article not found');
    }
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).send(error.message);
  }
};

