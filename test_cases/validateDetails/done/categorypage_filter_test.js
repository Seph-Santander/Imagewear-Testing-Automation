const { loginCredentials } = require('../../components/simple_userLogin');
const { scrollElementToCenter } = require('../../components/checkouts');

Feature('User Login');

Scenario('User logs in with valid credentials and adds item to cart', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;

    await loginCredentials(I, email, password);

    I.amOnPage('https://imgwear246.1902dev1.com/hotel-restaurant-toej/kokketoej-udstyr.html');
    I.wait(5);

    await scrollElementToCenter(I, '.limiter-options');
    I.wait(3);
    await scrollElementToCenter(I, '.btn-load-more');
    I.wait(3);
    I.click('.btn-load-more');
    I.wait(3);
    await scrollElementToCenter(I, 'div[data-role="ln_title"]', 'Farve');
    I.wait(3);
    await scrollElementToCenter(I, '.filter-options-content div[data-option-tooltip-value="#000000"]');
    I.wait(1);
    I.click('.filter-options-content div[data-option-tooltip-value="#000000"]');
    I.wait(5);
    await scrollElementToCenter(I, '.btn-load-more');
    I.wait(3);
    await scrollElementToCenter(I, 'div[data-role="ln_title"]', 'Farve');
    I.wait(1);
    await scrollElementToCenter(I, 'div[data-role="ln_title"]', 'Produkt');
    I.wait(1);
    await scrollElementToCenter(I, '.filter-options-content li.item a', 'Kokketrøje');
    I.wait(3);
    I.click(locate('.filter-options-content li.item').withDescendant(locate('a').withText('Kokketrøje')).find('input[type="checkbox"]'));
    I.wait(5);
    await scrollElementToCenter(I, 'span', 'Fjern alle');
    I.wait(2); 
    I.click(locate('span').withText('Fjern alle'));
    I.wait(3);
    await scrollElementToCenter(I, '.btn-load-more');
    I.wait(10);
    
});




