import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams, Link } from 'react-router-dom';

function ArticleDetail() {
  const [article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`/articles/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover mb-4" />
      <p className="mb-4">{article.content}</p>
      <p className="text-gray-600 mb-2">Penulis: {article.author}</p>
      <p className="text-gray-600 mb-4">Tanggal Publikasi: {new Date(article.publishDate).toLocaleDateString()}</p>
      <a href={article.source} target="_blank" rel="noopener noreferrer" className="text-blue-500">Sumber Artikel</a>
      <div className="mt-4">
        <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Kembali ke Daftar</Link>
        <Link to={`/edit/${article.id}`} className="bg-green-500 text-white px-4 py-2 rounded">Edit Artikel</Link>
      </div>
    </div>
  );
}

export default ArticleDetail;

