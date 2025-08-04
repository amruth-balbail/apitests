import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('POST Request Tests', () => {
  
  test('should create a new post', async ({ request }) => {
    console.log('running the test - should create a new post')
    const postData = {
      title: 'foo',
      body: 'bar',
      userId: 2
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: postData,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    expect(createdPost.title).toBe(postData.title);
    console.log('title of the created resource is', createdPost.title);
    expect(createdPost.body).toBe(postData.body);
    expect(createdPost.userId).toBe(postData.userId);
    expect(createdPost.id).toBeDefined();
  });

  test('should update a post using PUT', async ({ request }) => {
    const postId = 1;
    const updatedData = {
      id: postId,
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1
    };

    const response = await request.put(`${BASE_URL}/posts/${postId}`, {
      data: updatedData,
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    expect(response.status()).toBe(200);
    
    const updatedPost = await response.json();
    expect(updatedPost.id).toBe(postId);
    expect(updatedPost.title).toBe(updatedData.title);
    expect(updatedPost.body).toBe(updatedData.body);
    expect(updatedPost.userId).toBe(updatedData.userId);
  });
});