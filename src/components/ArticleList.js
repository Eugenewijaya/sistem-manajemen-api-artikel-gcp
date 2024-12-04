import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const deleteArticle = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      try {
        await axios.delete(`/articles/${id}`);
        fetchArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  return (
    <div>
      <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Tambah Artikel Baru</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(article => (
          <div key={article.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="mb-2">{article.content.substring(0, 100)}...</p>
            <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover mb-2" />
            <div className="flex justify-between">
              <Link to={`/article/${article.id}`} className="text-blue-500">Baca Selengkapnya</Link>
              <div>
                <Link to={`/edit/${article.id}`} className="text-green-500 mr-2">Edit</Link>
                <button onClick={() => deleteArticle(article.id)} className="text-red-500">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;

