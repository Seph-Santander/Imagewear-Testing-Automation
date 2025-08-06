const { loginCredentials } = require('../../components/simple_userLogin');
const { scrollToCenter } = require('../../components/checkouts');
const { fillQtyInputs } = require('../../components/addToCart_methods');

Feature('User Login');

Scenario('User logs in and clicks product info tabs with smooth animation', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;

    // Login
    await loginCredentials(I, email, password);
    I.say('🔐 Login submitted.');

    // Go to product page
    I.amOnPage('https://imgwear246.1902dev1.com/sort-kokkeskjorte-kortaermet.html');
    I.wait(3);

    // Scroll to product description section
    await scrollToCenter(I, '//*[@id="description"]');
    I.wait(1);

    // 📌 Helper function for smooth scroll with callback wait
    async function smoothScroll(I, selector) {
        await I.executeAsyncScript((selector, done) => {
            const el = document.querySelector(selector);
            if (!el) return done(false);
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Wait 800ms to simulate smooth animation
            setTimeout(() => done(true), 800);
        }, selector);
    }

    // 🔘 Click "Specifikationer" tab
    I.say('🧪 Clicking "Specifikationer" tab...');
    await smoothScroll(I, '#tab-label-additional-title');
    I.waitForElement('#tab-label-additional-title', 10);
    I.click('#tab-label-additional-title');
    I.wait(3);

    // 🔘 Click "Related Posts" tab
    I.say('📚 Clicking "Related Posts" tab...');
    await smoothScroll(I, '#tab-label-related\\.post\\.tab-title');
    I.waitForElement('#tab-label-related\\.post\\.tab-title', 10);
    I.forceClick('#tab-label-related\\.post\\.tab-title');
    I.wait(3);

    // 🔘 Click "Detaljer" tab
    I.say('📄 Clicking "Detaljer" tab...');
    await smoothScroll(I, '#tab-label-description-title');
    I.waitForElement('#tab-label-description-title', 10);
    I.click('#tab-label-description-title');
    I.wait(5);

    await scrollToCenter(I, '//*[@id="product-container-amasty"]/div');
    // 🔘 Click carousel dots alternately
    I.say('🎯 Clicking carousel dots alternately...');

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
        I.wait(2); // small delay to see the effect
}
    I.wait(10);

    await fillQtyInputs(I, 2, 1); // Fill quantity inputs with 2 for the first product
    I.wait(10);
    
    I.say('Clicking "Læg i kurv" for the first product...');
    I.seeElement('#product-addtocart-button'); // Confirm it exists

    I.click('#product-addtocart-button'); // Now click it
    I.wait(10);
});
