const assert = require('assert');
const { scrollToCenter } = require('./checkouts');

async function ValidateFooter(I) {
    const footerAddressXPath = "//address[contains(text(), '© 2022 Imagewear ApS All Rights Reserved.')]";

    I.say('🔍 Scrolling to footer...');
    await scrollToCenter(I, footerAddressXPath);

    I.say('⏳ Waiting for footer to appear...');
    await I.waitForVisible(footerAddressXPath, 10);

    I.say('✅ Validating footer text...');
    const footerText = await I.grabTextFrom(footerAddressXPath);
    assert.strictEqual(
      footerText.trim(),
      '© 2022 Imagewear ApS All Rights Reserved.',
      '❌ Footer text does not match'
    );

    I.wait(4);
}

module.exports = {
    ValidateFooter
};
