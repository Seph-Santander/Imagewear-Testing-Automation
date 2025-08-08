const { loginCredentials } = require('../../components/simple_userLogin');
const assert = require('assert');

Feature('User Login');

Scenario('User logs in, searches for item, checks checkbox, navigates', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;

    // Login
    await loginCredentials(I, email, password);

    // Search for "sko"
    I.fillField('#search', 'sko');
    I.waitForElement('.mst-searchautocomplete__index-title', 15);
    I.wait(5); // reduce this if stable
    I.pressKey('Enter');

    // Wait and click "Load More"
    I.waitForElement('.btn-load-more', 10);
    await scroll(I, '.btn-load-more');
    I.click('.btn-load-more');
    I.wait(2);

    // Scroll to "Kategori" title
    await scroll(I, '[data-role="ln_title"].filter-options-title');

    // Scroll to and click checkbox
    const checkboxSelector = 'li.item input[type="checkbox"]';
    await scroll(I, checkboxSelector);
    I.click(checkboxSelector);
    I.wait(2);

    // Click "Kategorier" link
    I.click(locate('a').withText('Kategorier'));
    I.wait(3);

    // Scroll to and assert presence of subcategory
    await scrollToText(I, 'T-shirts - Poloshirts');

    // Click "Information" link
    I.click(locate('a').withText('Information'));
    I.wait(3);

    // Scroll to and assert product sorting text
    await scrollToText(I, 'Sorter efter');
    I.see('Sorter efter', '.mst-search__index-content'); // more flexible

    I.wait(20); // optional visual pause
});


// Scroll using CSS selector string
async function scroll(I, selector) {
    await I.executeScript((sel) => {
        const el = document.querySelector(sel);
        if (el) {
            const rect = el.getBoundingClientRect();
            const scrollY = rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
            window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }
    }, selector);
}

// Scroll to any element using text (XPath)
async function scrollToText(I, text) {
    await I.executeScript((txt) => {
        const xpath = `//*[contains(text(), "${txt}")]`;
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const el = result.singleNodeValue;
        if (el) {
            const rect = el.getBoundingClientRect();
            const scrollY = rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
            window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }
    }, text);
}
