//Opening Cart
async function openCart(I) {
    I.click('.action.showcart');
    I.wait(2);

    I.click('.action.viewcart');
}

// Check Coupon Code
async function checkCouponCode(I, couponCode) {
    I.say(`Checking if coupon code "${couponCode}" is applied...`);
    I.waitForElement('.cart-summary', 10);

  // Check if the coupon code input field is present
    const isCouponFieldVisible = await I.grabNumberOfVisibleElements('#coupon_code');
    if (isCouponFieldVisible === 0) {
        throw new Error('Coupon code input field not found.');
    }

  // Get current value of coupon field
    const couponValue = await I.grabValueFrom('#coupon_code');
    let shouldClickApply = false;

    if (couponValue.trim() !== couponCode) {
    I.fillField('#coupon_code', couponCode);
    // Trigger input/change events using executeScript
    await I.executeScript(() => {
        const field = document.querySelector('#coupon_code');
        if (field) {
        field.dispatchEvent(new Event('input', { bubbles: true }));
        field.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });
    I.wait(1);
    I.say(`Coupon set to ${couponCode}`);
    shouldClickApply = true;
    } else {
    I.say(`Coupon already set to ${couponCode}`);
    }

  // Click Apply button if needed
    if (shouldClickApply) {
    // Use XPath to find the button
    const applyBtnXPath = '//*[@id="discount-coupon-form"]/div/div[2]/div/button';
    I.waitForElement(applyBtnXPath, 5);
    I.scrollTo(applyBtnXPath);
    I.click(applyBtnXPath);
    I.say('Apply button clicked');
    }
}

// ==================================================================================

// Shipping Method GLSPakkeshop
async function checkoutMethod1(I) {
    const couponCode = '1902testqa';
    const comment = 'this is a test order from 1902';

    await openCart(I);
    I.wait(2);

    I.say('Waiting for cart summary...');
    I.waitForElement('.cart-summary', 10);

    await checkCouponCode(I, couponCode);
    I.wait(3);

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

    I.executeScript(() => {
        const select = document.querySelector('#gls-parcelshop-pickup-id');
    if (select && select.options.length >= 3) {
        select.selectedIndex = 2;
        select.dispatchEvent(new Event('change'));
    }
});

    I.fillField('#comments', comment);
    I.wait(1);

    I.click('#block-discount-heading');
    I.wait(1);

    I.click(locate('button.action.action-cancel').withText('Annuller rabatkode'));
    i.wait(2);

    //===================================================================================================



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
    checkoutMethod3,
    openCart
};