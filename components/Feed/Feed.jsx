'use client';

import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');

      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchText === '') return;

    const timeoutId = setTimeout(() => {
      const searchResult = posts.filter((post) => {
        return (
          post?.creator.username.toLowerCase().includes(searchText) ||
          post?.tag.toLowerCase().includes(searchText) ||
          post?.prompt.toLowerCase().includes(searchText)
        );
      });

      setFilteredPosts(searchResult);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={searchText === '' ? posts : filteredPosts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
