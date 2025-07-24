const { loginCredentials } = require('../components/simple_userLogin');

Feature('User Login');

Scenario('User logs in with valid credentials', async ({ I }) => {
  const email = 'nineteen02merry@gmail.com';
  const password = 'merry@190200';

  await loginCredentials(I, email, password);
  I.wait(5);

  I.say('Login submitted. Waiting for dashboard...');
});
