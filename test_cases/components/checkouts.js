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

module.exports = {
    checkoutMethod1
};