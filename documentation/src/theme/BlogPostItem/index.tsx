import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import AuthorCard from '@theme/AuthorCard';

export default function BlogPostItemWrapper(props): JSX.Element {
  return (
    <>
      <BlogPostItem {...props} />
      <AuthorCard />
    </>
  );
}
