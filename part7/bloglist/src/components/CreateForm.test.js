import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { prettyDOM } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/react';
import CreateForm from './CreateForm';


test('form submit callback is called', async () => {
  const blog =  {
    title: 'title goes here',
    author: 'testing author',
    url: 'https://some.url.com'
  };

  const mockCreateBlog = jest.fn();

  const component = render(
    <CreateForm createBlog={mockCreateBlog}/>
  );

  component.debug();
  const author = component.container.querySelector('#author');
  const title = component.container.querySelector('#title');
  const url = component.container.querySelector('#url');

  fireEvent.change(author, {
    target: { value: 'testing author' }
  });

  fireEvent.change(title, {
    target: { value: 'title goes here' }
  });

  fireEvent.change(url, {
    target: { value: 'https://some.url.com' }
  });

  const form = component.container.querySelector('form');
  fireEvent.submit(form);
  expect(mockCreateBlog.mock.calls).toHaveLength(1);
  expect(mockCreateBlog.mock.calls[0][0]).toEqual(blog);
});