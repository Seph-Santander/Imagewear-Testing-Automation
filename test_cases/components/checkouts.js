//Opening Cart
async function openCart(I) {
    I.click('.action.showcart');
    I.wait(2);

    I.click('.action.viewcart');
}

// Check Coupon Code
// test_cases/components/checkouts.js

async function checkCouponCode(I) {
  const COUPON_CODE = '1902testqa';

  I.say('Expanding discount section...');
  await I.waitForElement('#block-discount-heading', 10);
  await I.click('#block-discount-heading');
  await I.wait(1); // Give time for animation

  I.say('Running in-browser logic to check and apply coupon...');

  const result = await I.executeScript((code) => {
    const COUPON_CODE = code;

    // === STEP 2: Check coupon field ===
    const couponField = document.querySelector('#coupon_code');
    if (!couponField) {
      return { error: 'Coupon field #coupon_code not found' };
    }

    const couponValue = couponField.value.trim();
    let shouldClickApply = false;

    if (couponValue !== COUPON_CODE) {
      couponField.focus();
      couponField.value = COUPON_CODE;

      // Trigger input/change events
      couponField.dispatchEvent(new Event('input', { bubbles: true }));
      couponField.dispatchEvent(new Event('change', { bubbles: true }));
      shouldClickApply = true;
    }

    // === STEP 3: Click Apply button if needed ===
    if (shouldClickApply) {
      const applyBtn = document.evaluate(
        '//*[@id="discount-coupon-form"]/div/div[2]/div/button',
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (applyBtn) {
        applyBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        applyBtn.click();
        return { applied: true };
      } else {
        return { error: 'Apply Coupon button not found' };
      }
    }

    return { applied: false };
  }, COUPON_CODE);

  // === Handle results ===
  if (result?.error) {
    throw new Error(result.error);
  } else if (result.applied) {
    I.say(`Coupon "${COUPON_CODE}" applied successfully.`);
  } else {
    I.say(`Coupon "${COUPON_CODE}" already set, no need to apply.`);
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

    await checkCouponCode(I);
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

    //==============================================================================================================



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