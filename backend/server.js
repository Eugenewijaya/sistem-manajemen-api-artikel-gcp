const express = require('express');
const multer = require('multer');
const cors = require('cors');
const articleController = require('./articleController');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post('/articles', upload.single('image'), articleController.createArticle);
app.get('/articles', articleController.getArticles);
app.get('/articles/:id', articleController.getArticle);
app.put('/articles/:id', upload.single('image'), articleController.updateArticle);
app.delete('/articles/:id', articleController.deleteArticle);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

