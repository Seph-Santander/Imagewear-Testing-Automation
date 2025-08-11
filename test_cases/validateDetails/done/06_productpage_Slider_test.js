const { loginCredentials } = require('../../components/simple_userLogin');
const { scrollToCenter } = require('../../components/checkouts');
const { fillQtyInputs } = require('../../components/addToCart_methods');

Feature('Validating Product Page Slider');

Scenario('User logs and Asserting the Detajler, Specifikationer, Related posts Tabs ', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;

    // Helper function for smooth scroll with callback wait
    async function smoothScroll(I, selector) {
        await I.executeAsyncScript((selector, done) => {
            const el = document.querySelector(selector);
            if (!el) return done(false);
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => done(true), 800);
        }, selector);
    }

  //==========================================================================================================================

    // User Login
    await loginCredentials(I, email, password);

    // Redirect to product page
    I.amOnPage('https://imgwear246.1902dev1.com/sort-kokkeskjorte-kortaermet.html');
    I.wait(3);

    // Scroll to product description section
    await scrollToCenter(I, '//*[@id="description"]');
    I.wait(1);

    // Click "Specifikationer" tab
    I.say('Clicking "Specifikationer" tab...');
    await smoothScroll(I, '#tab-label-additional-title');
    I.waitForElement('#tab-label-additional-title', 10);
    I.click('#tab-label-additional-title');
    I.wait(3);

    // Click "Related Posts" tab
    I.say('Clicking "Related Posts" tab...');
    await smoothScroll(I, '#tab-label-related\\.post\\.tab-title');
    I.waitForElement('#tab-label-related\\.post\\.tab-title', 10);
    I.forceClick('#tab-label-related\\.post\\.tab-title');
    I.wait(3);

    // Click "Detaljer" tab
    I.say('Clicking "Detaljer" tab...');
    await smoothScroll(I, '#tab-label-description-title');
    I.waitForElement('#tab-label-description-title', 10);
    I.click('#tab-label-description-title');
    I.wait(5);

    await scrollToCenter(I, '//*[@id="product-container-amasty"]/div');

    // Clicking the Radio Button
    I.say('Clicking carousel dots alternately...');

    const dotSelector = '.owl-dot';

    const numberOfDots = await I.grabNumberOfVisibleElements(dotSelector);
    I.say(`Found ${numberOfDots} dots.`);

    for (let i = 0; i < numberOfDots; i++) {
        I.say(`Clicking dot #${i + 1}`);
        I.executeScript((index) => {
            const dots = document.querySelectorAll('.owl-dot');
            if (dots && dots[index]) {
                dots[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                dots[index].click();
            }
        }, i);
        I.wait(2);
}
    I.wait(10);
    
    //Filling Quantity Value to Specific Input Field 
    await fillQtyInputs(I, 2, 1);//Parameter: (I, [Number of Input Field in the Product Page], Quantity Value)
    I.wait(10);
    
    //Clicking Add to Cart Button
    I.seeElement('#product-addtocart-button');
    I.click('#product-addtocart-button');
    I.wait(10);
});
