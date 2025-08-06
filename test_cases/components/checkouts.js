//Opening Cart
async function openCart(I) {
    I.click('.action.showcart');
    I.wait(2);

    I.click('.action.viewcart');
}

// Check Coupon Code
// test_cases/components/checkouts.js

async function checkCouponCode(I, couponCode) {
  const COUPON_CODE = couponCode;

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

//apply Discount in Checkout

async function applyDiscount(I, couponCode) {
  I.say(`DEBUG: Applying discount code "${couponCode}" to #discount-code`);
  await I.waitForElement('#discount-code', 10);
  await I.fillField('#discount-code', couponCode);
}

// Utility function to scroll an element to center of the screen
async function scrollToCenter(I, selector, isXPath = true) {
  await I.executeScript((sel, useXPath) => {
    try {
      let el;
      if (useXPath) {
        const result = document.evaluate(sel, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        el = result.singleNodeValue;
      } else {
        el = document.querySelector(sel);
      }
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (e) {
      console.error('Selector error:', sel, e);
    }
  }, selector, isXPath);
}


async function randomScrolltoCenter(I, productXpath) {
  await I.executeScript((xpath) => {
    const productEl = document
      .evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue;

    if (productEl) {
      productEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, productXpath);
}



// ==================================================================================

// Shipping Method GLSPakkeshop
async function checkoutMethod1(I, comment) {

    I.say('Scrolling and clicking "Proceed to Checkout"...');
    I.waitForElement('[data-role="proceed-to-checkout"]', 10);
    I.click('[data-role="proceed-to-checkout"]');

    I.wait(5);

    I.say('Selecting GLS Parcelshop shipping method...');
    await I.waitForElement('#s_method_gls_parcelshop_e_1', 10);
    await scrollToCenter(I, '#s_method_gls_parcelshop_e_1');
    I.checkOption('#s_method_gls_parcelshop_e_1');
    I.wait(5);

    I.say('Filling parcelshop postcode...');
    await scrollToCenter(I, '#gls-parcelshop-postcode');
    I.fillField('#gls-parcelshop-postcode', '3000');
    I.wait(2);

    I.say('Selecting Parcelshop location...');
    I.executeScript(() => {
        const select = document.querySelector('#gls-parcelshop-pickup-id');
        if (select && select.options.length >= 3) {
            select.selectedIndex = 2;
            select.dispatchEvent(new Event('change'));
        }
    });

    I.say('Adding order comment...');
    await scrollToCenter(I, '#comments');
    I.fillField('#comments', comment);
    I.wait(1);

    I.say('Opening discount section...');
    await scrollToCenter(I, '#block-discount-heading');
    I.click('#block-discount-heading');
    I.wait(1);

    I.say('Cancelling old discount (if any)...');
    await scrollToCenter(I, 'button.action.action-cancel');
    I.click(locate('button.action.action-cancel').withText('Annuller rabatkode'));
    I.wait(2);

    I.say('Applying discount code...');
    await applyDiscount(I, '1902testqa');
    I.wait(2);

    await scrollToCenter(I, '#discount-code');
    await I.click(locate('button.action.action-apply').withText('Anvend rabatkode'));
    I.wait(2);

    await I.waitForElement('th.mark span.discount.coupon', 10);
    I.say('Coupon code applied successfully.');

    I.say('Selecting Bambora payment method...');
    await scrollToCenter(I, '.label.bambora_payment_title');
    I.waitForElement('.label.bambora_payment_title', 10);
    I.click('.label.bambora_payment_title');
    I.wait(3); 

    I.say('Agreeing to terms...');
    await scrollToCenter(I, '#agreement__1');
    I.waitForElement('#agreement__1', 10);
    I.waitForVisible('#agreement__1', 5);
    I.checkOption('#agreement__1');
    I.wait(2);

    I.say('Clicking "Place Order"... using JS click()');
    await scrollToCenter(I, '.place-order-primary button');
    I.waitForElement('.place-order-primary button', 10);
    I.executeScript(() => {
        const button = document.querySelector('.place-order-primary button');
        if (button && !button.classList.contains('disabled')) {
            button.click();
        }
    });
}




// ==================================================================================
// Shipping Method 2
    async function checkoutMethod2(I, comment) {

    I.say('Clicking "Proceed to Checkout"...');
    I.click('[data-role="proceed-to-checkout"]');
    I.wait(5);

    I.say('Selecting GLS Erhverv shipping method...');
    I.waitForElement('#label_method_business_e_2_gls', 10);
    I.checkOption('#label_method_business_e_2_gls');
    I.wait(5);

    I.fillField('#comments', comment);
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
async function checkoutMethod3(I, comment) {
    I.say('Clicking "Proceed to Checkout"...');
    I.click('[data-role="proceed-to-checkout"]');
    I.wait(5);

    I.say('Selecting GLS Parcelshop shipping method...');
    await I.waitForElement('#label_carrier_flatrate_flatrate', 10);
    await scrollToCenter(I, '#label_carrier_flatrate_flatrate');
    I.checkOption('#label_carrier_flatrate_flatrate');
    I.wait(5);

    await scrollToCenter(I, '#comments');
    I.fillField('#comments', comment);
    I.wait(1);

    await scrollToCenter(I, '#block-discount-heading');
    I.click('#block-discount-heading');
    I.wait(1);

    await scrollToCenter(I, 'button.action.action-cancel');
    I.click(locate('button.action.action-cancel').withText('Annuller rabatkode'));
    I.wait(2);

    await applyDiscount(I, '1902testqa');
    I.wait(2);

    await scrollToCenter(I, '#discount-code');
    await I.click(locate('button.action.action-apply').withText('Anvend rabatkode'));
    I.wait(2);

    await I.waitForElement('th.mark span.discount.coupon', 10);
    I.say('Coupon code applied successfully.');

    I.say('Selecting Bambora payment method...');
    await scrollToCenter(I, '.label.bambora_payment_title');
    I.waitForElement('.label.bambora_payment_title', 10);
    I.click('.label.bambora_payment_title');
    I.wait(3); 

    I.say('Agreeing to terms...');
    await scrollToCenter(I, '#agreement__1');
    I.waitForElement('#agreement__1', 10);
    I.waitForVisible('#agreement__1', 5);
    I.checkOption('#agreement__1');
    I.wait(2);

    I.say('Clicking "Place Order"... using JS click()');
    await scrollToCenter(I, '.place-order-primary button');
    I.waitForElement('.place-order-primary button', 10);
    I.executeScript(() => {
        const button = document.querySelector('.place-order-primary button');
        if (button && !button.classList.contains('disabled')) {
            button.click();
        }
    });
}



//Exporting the functions for use in other test files
module.exports = {
    checkoutMethod1,
    checkoutMethod2,
    checkoutMethod3,
    checkCouponCode,
    applyDiscount,
    openCart,
    scrollToCenter,
    randomScrolltoCenter
};