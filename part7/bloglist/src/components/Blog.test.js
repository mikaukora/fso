import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { prettyDOM } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/react';
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

  const blogElem = component.container.querySelector('.blog');
  console.log(prettyDOM(blogElem));
});


test('renders details', async () => {
  const blog = {
    title: 'test title',
    author: 'some ',
    likes: 100,
    url: 'https//www.google.com',
    user: { username: '123' },
  };

  const mockOnRemove = jest.fn();
  const mockOnLike = jest.fn();
  const user = '123';

  const component = render(
    <Blog blog={blog} onRemove={mockOnRemove} onLike={mockOnLike} currentUser={user}/>
  );

  const button = component.getByText('view');
  fireEvent.click(button);

  expect(component.container).toHaveTextContent(
    blog.title
  );

  expect(component.container).toHaveTextContent(
    blog.author
  );

  expect(component.container).toHaveTextContent(
    blog.likes
  );

  expect(component.container).toHaveTextContent(
    blog.url
  );

  const blogElem = component.container.querySelector('.blog');
  console.log(prettyDOM(blogElem));
});

test('like callback is called', async () => {
  const blog = {
    title: 'test title',
    author: 'some ',
    likes: 100,
    url: 'https//www.google.com',
    user: { username: '123' },
  };

  const mockOnRemove = jest.fn();
  const mockOnLike = jest.fn();
  const user = '123';

  const component = render(
    <Blog blog={blog} onRemove={mockOnRemove} onLike={mockOnLike} currentUser={user}/>
  );

  const viewButton = component.getByText('view');
  fireEvent.click(viewButton);

  const likeButton = component.getByText('like');

  fireEvent.click(likeButton);
  expect(mockOnLike.mock.calls).toHaveLength(1);

  fireEvent.click(likeButton);
  expect(mockOnLike.mock.calls).toHaveLength(2);
});
