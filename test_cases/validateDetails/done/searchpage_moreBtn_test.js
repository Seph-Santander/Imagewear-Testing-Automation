const { loginCredentials } = require('../../components/simple_userLogin');
const { scrollAndClickTwiceWithDelay } = require('../../components/moreBtn');

Feature('User Login');

Scenario('User logs in, visits URLs, and clicks "Load More" twice with delay', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;

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
        I.say(`🔗 Navigating to: ${url}`);
        I.amOnPage(url);
        I.waitForElement('body', 10);

        await scrollAndClickTwiceWithDelay(I, '.btn-load-more');

        I.wait(3); // Optional: wait before moving to the next page
    }

    I.say('✅ Finished visiting all pages and clicking Load More 2x.');
});
