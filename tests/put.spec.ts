import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('PUT Request Tests', () => {

  test('should update a post', async ({ request }) => {
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
