import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('GET Request Tests', () => {
  
  test('should get all users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);
    
    expect(response.status()).toBe(200);
    
    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  test('should get user by ID', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${BASE_URL}/users/${userId}`);
    
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    expect(user.id).toBe(userId);
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
    console.log(user.id);
  });
});
