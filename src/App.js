import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import PostCard from './components/PostCard';
import PostModal from './components/PostModal';
import MobileMenu from './components/MobileMenu';

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://cloud.codesupply.co/endpoint/react/data.json');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const filterPosts = () => {
    if (!searchTerm) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <Header 
        onSearchToggle={handleSearchToggle} 
        isSearchOpen={isSearchOpen}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onMobileMenuToggle={handleMobileMenuToggle}
      />
      <main className="main-content">
        <div className="posts-grid">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={index}
              post={post}
              onClick={() => handlePostClick(post)}
            />
          ))}
        </div>
      </main>
      {isModalOpen && (
        <PostModal 
          post={selectedPost} 
          onClose={handleCloseModal} 
        />
      )}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      />
    </div>
  );
}

export default App;
