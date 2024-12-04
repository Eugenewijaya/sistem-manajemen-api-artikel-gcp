import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import ArticleDetail from './components/ArticleDetail';

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center my-8">Sistem Manajemen Artikel</h1>
        <Switch>
          <Route exact path="/" component={ArticleList} />
          <Route path="/create" component={ArticleForm} />
          <Route path="/edit/:id" component={ArticleForm} />
          <Route path="/article/:id" component={ArticleDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

