import React from 'react';
import './PostCard.css';

const PostCard = ({ post, onClick }) => {
  return (
    <article className="post-card" onClick={onClick}>
      <div className="post-image">
        <img 
          src={post.img} 
          srcSet={`${post.img} 1x, ${post.img_2x} 2x`}
          alt={post.title}
        />
      </div>
      <div className="post-content">
        <div className="post-header">
          <span className="post-category">{post.tags}</span>
          <h2 className="post-title">{post.title}</h2>
        </div>
        <div className="post-meta">
          <span className="post-author">{post.autor}</span>
          <img src={`${process.env.PUBLIC_URL}/Oval.svg`} alt="Separator" className="post-separator-img" />
          <span className="post-date">{post.date}</span>
          <img src={`${process.env.PUBLIC_URL}/Oval.svg`} alt="Separator" className="post-separator-img" />
          <span className="post-views">{post.views} Views</span>
        </div>
        <p className="post-excerpt">{post.text}</p>
      </div>
    </article>
  );
};

export default PostCard;
