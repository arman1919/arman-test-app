import React, { useEffect } from 'react';
import './PostModal.css';

const PostModal = ({ post, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!post) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="modal-image">
          <img 
            src={post.img} 
            srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
            alt={post.title}
          />
        </div>
        
        <div className="modal-body">
          <div className="modal-header">
            <span className="modal-category">{post.tags}</span>
            <h2 className="modal-title">{post.title}</h2>
            <div className="modal-meta">
              <span className="modal-author">{post.autor}</span>
              <img src={`${process.env.PUBLIC_URL}/Oval.svg`} alt="Separator" className="modal-separator-img" />
              <span className="modal-date">{post.date}</span>
              <img src={`${process.env.PUBLIC_URL}/Oval.svg`} alt="Separator" className="modal-separator-img" />
              <span className="modal-views">{post.views} Views</span>
            </div>
          </div>
          
          <div className="modal-text">
            <p>{post.text}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
