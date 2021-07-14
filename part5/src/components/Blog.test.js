import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('renders default content', () => {
  const blog = {
    title: 'test title',
    author: 'some ',
    likes: 100,
    url: 'https//www.google.com'
  };

  const mockOnRemove = jest.fn();
  const mockOnLike = jest.fn();
  const user = '123';

  const component = render(
    <Blog blog={blog} onRemove={mockOnRemove} onLike={mockOnLike} currentUser={user}/>
  );

  expect(component.container).toHaveTextContent(
    blog.title
  );

  expect(component.container).toHaveTextContent(
    blog.author
  );

  expect(component.container).not.toHaveTextContent(
    blog.likes
  );

  expect(component.container).not.toHaveTextContent(
    blog.url
  );
});
