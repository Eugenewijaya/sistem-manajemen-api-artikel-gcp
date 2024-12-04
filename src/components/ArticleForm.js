import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useHistory, useParams } from 'react-router-dom';

function ArticleForm() {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    author: '',
    source: ''
  });
  const [image, setImage] = useState(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`/articles/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('content', article.content);
    formData.append('author', article.author);
    formData.append('source', article.source);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (id) {
        await axios.put(`/articles/${id}`, formData);
      } else {
        await axios.post('/articles', formData);
      }
      history.push('/');
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">Judul</label>
        <input
          type="text"
          id="title"
          name="title"
          value={article.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2">Konten</label>
        <textarea
          id="content"
          name="content"
          value={article.content}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          rows="6"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block mb-2">Penulis</label>
        <input
          type="text"
          id="author"
          name="author"
          value={article.author}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="source" className="block mb-2">Sumber</label>
        <input
          type="text"
          id="source"
          name="source"
          value={article.source}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2">Gambar</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          className="w-full px-3 py-2 border rounded"
          accept="image/*"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {id ? 'Update Artikel' : 'Buat Artikel'}
      </button>
    </form>
  );
}

export default ArticleForm;

