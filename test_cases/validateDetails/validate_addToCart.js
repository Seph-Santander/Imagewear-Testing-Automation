const readline = require('readline-sync');
const { addToCart } = require('../components/addToCart_methods');
const { dynamic_adding_item } = require('../components/dynamic_addToCart');
const { loginCredentials } = require('../components/simple_userLogin');

Feature('User Login');

// Ask tester for inputs BEFORE scenario
const category = 'Hotel- og Restaurantskolen - HRS';
const product = '';

Scenario('User logs in with valid credentials and adds item to cart', async ({ I }) => {
  const { email, password } = codeceptjs.config.get().custom;

  I.say(`Using category: ${category}`);
  I.say(`Using product: ${product || 'Random product will be chosen'}`);

  await loginCredentials(I, email, password);
  I.wait(2);

  I.say('✅ Logged in. Proceeding to add item...');
  await dynamic_adding_item(I, category, product);
  I.wait(20);
});
