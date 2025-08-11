const { loginCredentials } = require('../../components/simple_userLogin');
const { OpenFavoritesPage } = require('../../components/favorites');


Feature('Validating User Login and Asserting Greetings');

Scenario('User logs in with valid credentials', async ({ I }) => {
  const { email, password } = codeceptjs.config.get().custom;

  //==========================================================================================================================

  //Clicking Login Page then Login with valid Credentials
  await loginCredentials(I, email, password);
  I.wait(5);

  I.say('Login submitted. Waiting for dashboard...');

  //Asserting Welcome Greetings
  I.waitForElement('span.logged-in', 10);
  I.seeElement('span.logged-in');

  //Asserting and Clicking Favorite Page
  await OpenFavoritesPage(I);
});
