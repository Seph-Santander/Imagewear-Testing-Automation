const { loginCredentials } = require('../../components/simple_userLogin');
const { OpenFavoritesPage } = require('../../components/favorites');


Feature('User Login');

Scenario('User logs in with valid credentials', async ({ I }) => {
  const { email, password } = codeceptjs.config.get().custom;

  await loginCredentials(I, email, password);
  I.wait(5);

  I.say('Login submitted. Waiting for dashboard...');

  I.waitForElement('span.logged-in', 10);
  I.seeElement('span.logged-in');
  I.say('Greetings validated');

  await OpenFavoritesPage(I);
  I.wait(20);
});
