import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

console.log('ENV USERNAME:', process.env.APP_USERNAME);
console.log('ENV PASSWORD:', process.env.APP_PASSWORD);

export const env = {
  baseUrl: (process.env.BASE_URL || '').trim(),
 username: process.env.APP_USERNAME?.trim(),
  password: process.env.APP_PASSWORD?.trim(),
  testPassword: (process.env.TEST_PASSWORD || '').trim(),
  confirmPassword: (process.env.CONFIRM_PASSWORD || '').trim()
};