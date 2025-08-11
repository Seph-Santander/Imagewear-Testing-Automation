const { loginCredentials } = require('../../components/simple_userLogin');
const {
    scrollAssertHoverOldPrices
} = require('../../components/moreBtn');

Feature('User Login and Product Price Validation');

Scenario('Visit pages and assert old prices', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;

    // 🔐 Login
    await loginCredentials(I, email, password);
    I.wait(2);

    const urls = [
        'https://imgwear246.1902dev1.com/hotel-restaurant-toej/kokketoej/billige-kokkejakker.html',
        'https://imgwear246.1902dev1.com/arbejdstoej-til-byggeri-handvaerk-industri/arbejdsbukser/arbejdsbukser-m-haengelommer.html',
        'https://imgwear246.1902dev1.com/jakker-overtoej/profil-overtoej-til-fritid.html',
        'https://imgwear246.1902dev1.com/arbejdssko-til-kokke-og-tjener/skridsikre-koekken-kokkesko.html',
        'https://imgwear246.1902dev1.com/sikkerhedssko/sikkerhedssko-byggeri-og-handvaerk.html',
        'https://imgwear246.1902dev1.com/sikkerhedssko/sikkerhedssko-let-industri.html',
        'https://imgwear246.1902dev1.com/t-shirts-poloshirts/t-shirts.html',
        'https://imgwear246.1902dev1.com/salg/',
        'https://imgwear246.1902dev1.com/catalogsearch/result/?q=restsalg',
    ];

    for (const url of urls) {
        I.say(`🔗 Visiting: ${url}`);
        I.amOnPage(url);
        I.waitForElement('body', 10);
        I.wait(2); // Let content load

        I.say('🔍 Scrolling & checking old prices...');
        await scrollAssertHoverOldPrices(I);

        I.say(`✅ Finished checks for: ${url}\n`);
        I.wait(3);
    }

    I.say('🎉 All pages have been checked!');
});
