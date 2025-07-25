// Shipping Method 1
async function checkoutMethod1(I) {
    I.say('Opening minicart...');
    I.click('.action.showcart'); 
    I.wait(2);

    I.say('Clicking "View Cart"...');
    I.click('.action.viewcart');

    I.say('Waiting for cart summary...');
    I.waitForElement('.cart-summary', 10);

    I.say('Clicking "Proceed to Checkout"...');
    I.click('[data-role="proceed-to-checkout"]');
    I.wait(5);

    I.say('Selecting GLS Parcelshop shipping method...');
    I.waitForElement('#s_method_gls_parcelshop_e_1', 10);
    I.checkOption('#s_method_gls_parcelshop_e_1');
    I.wait(5);

    I.say('Filling parcelshop postcode...');
    I.fillField('#gls-parcelshop-postcode', '3000');
    I.wait(2);

    I.say('Selecting Bambora payment method...');
    I.waitForElement('.label.bambora_payment_title', 10);
    I.click('.label.bambora_payment_title');
    I.wait(3); 

    I.say('Agreeing to terms...');
    I.waitForElement('#agreement__1', 10);
    I.waitForVisible('#agreement__1', 5);
    I.checkOption('#agreement__1');
    I.wait(2);

    I.say('Clicking "Place Order"... using JS click()');
    I.waitForElement('.place-order-primary button', 10);
    I.executeScript(() => {
        const button = document.querySelector('.place-order-primary button');
        if (button && !button.classList.contains('disabled')) {
            button.click();
        }
    });
    I.wait(20);
}
// ==================================================================================
// Shipping Method 2
    async function checkoutMethod2(I) {
    I.say('Opening minicart...');
    I.click('.action.showcart'); 
    I.wait(2);

    I.say('Clicking "View Cart"...');
    I.click('.action.viewcart');

    I.say('Waiting for cart summary...');
    I.waitForElement('.cart-summary', 10);

    I.say('Clicking "Proceed to Checkout"...');
    I.click('[data-role="proceed-to-checkout"]');
    I.wait(5);

    I.say('Selecting GLS Erhverv shipping method...');
    I.waitForElement('#label_method_business_e_2_gls', 10);
    I.checkOption('#label_method_business_e_2_gls');
    I.wait(5);

    I.fillField('#comments', 'testing');
    I.wait(2);

    I.say('Clicking the 3rd shipping address item regardless of content');
    I.click(locate('.shipping-address-item').at(3));

    I.wait(2);

    I.say('Selecting Bambora payment method...');
    I.waitForElement('.label.bambora_payment_title', 10);
    I.click('.label.bambora_payment_title');
    I.wait(3); 

    I.say('Agreeing to terms...');
    I.waitForElement('#agreement__1', 10);
    I.waitForVisible('#agreement__1', 5);
    I.checkOption('#agreement__1');
    I.wait(2);

    I.say('Clicking "Place Order"... using JS click()');
    I.waitForElement('.place-order-primary button', 10);
    I.executeScript(() => {
        const button = document.querySelector('.place-order-primary button');
        if (button && !button.classList.contains('disabled')) {
            button.click();
        }
    });
    I.wait(20);
}

// ==================================================================================
// Shipping Method 3
async function checkoutMethod3(I) {
    I.say('Opening minicart...');
    I.click('.action.showcart'); 
    I.wait(2);

    I.say('Clicking "View Cart"...');
    I.click('.action.viewcart');

    I.say('Waiting for cart summary...');
    I.waitForElement('.cart-summary', 10);

    I.say('Clicking "Proceed to Checkout"...');
    I.click('[data-role="proceed-to-checkout"]');
    I.wait(5);

    I.say('Selecting hos Imagewear - Østergade 5 - 5610 Assens shipping method...');
    I.waitForElement('#label_carrier_flatrate_flatrate', 10);
    I.checkOption('#label_carrier_flatrate_flatrate');
    I.wait(5);

    I.fillField('#comments', 'testing');
    I.wait(2);

    I.say('Clicking the 1st shipping address item regardless of content');
    I.click(locate('.shipping-address-item').at(1));

    I.wait(2);

    I.say('Selecting Bambora payment method...');
    I.waitForElement('.label.bambora_payment_title', 10);
    I.click('.label.bambora_payment_title');
    I.wait(3); 

    I.say('Agreeing to terms...');
    I.waitForElement('#agreement__1', 10);
    I.waitForVisible('#agreement__1', 5);
    I.checkOption('#agreement__1');
    I.wait(2);

    I.say('Clicking "Place Order"... using JS click()');
    I.waitForElement('.place-order-primary button', 10);
    I.executeScript(() => {
        const button = document.querySelector('.place-order-primary button');
        if (button && !button.classList.contains('disabled')) {
            button.click();
        }
    });
    I.wait(20);
}
module.exports = {
    checkoutMethod1,
    checkoutMethod2,
    checkoutMethod3
};