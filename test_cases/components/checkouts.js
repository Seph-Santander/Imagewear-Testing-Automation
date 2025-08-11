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
// scroll element to center of the screen
async function scrollElementToCenter(I, selector) {
  await I.executeScript((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      const rect = el.getBoundingClientRect();
      const absoluteElementTop = rect.top + window.pageYOffset;
      const middle = absoluteElementTop - (window.innerHeight / 2) + (rect.height / 2);
      window.scrollTo({ top: middle, behavior: 'smooth' });
    }
  }, selector);
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

// adding bones inputs 
async function fillBonesInputsAndApplyCoupon(I, productCouponCode) {
  const bonesSelector = 'input[name="cartoption[bones]"]';

  // === STEP 1: Wait for and fill bones inputs ===
  I.waitForElement(bonesSelector, 10);

  const bonesCount = await I.executeScript(() => {
    return document.querySelectorAll('input[name="cartoption[bones]"]').length;
  });

  if (bonesCount === 0) {
    throw new Error('❌ No bones input fields found.');
  }

  console.log(`✅ Found ${bonesCount} bones input(s)`);

  for (let i = 0; i < bonesCount; i++) {
    const currentValue = await I.executeScript((index) => {
      const el = document.querySelectorAll('input[name="cartoption[bones]"]')[index];
      return el ? el.value.trim() : null;
    }, i);

    if (currentValue !== productCouponCode) {
      console.log(`🦴 Filling bones input ${i + 1}`);

      await I.executeScript(async (index) => {
        const input = document.querySelectorAll('input[name="cartoption[bones]"]')[index];
        if (input) {
          // Smooth scroll to center
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // Wait for scroll animation to finish
          await new Promise(resolve => setTimeout(resolve, 600));

          input.focus();
          input.value = productCouponCode;

          // Trigger reactive events
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, i);

      I.wait(2); // optional pause
    } else {
      console.log(`✅ Bones input ${i + 1} already has ${productCouponCode}, skipping`);
    }
  }
}

async function applyCouponIfNeeded(I, COUPON_CODE = '1902testqa') {
  const couponSelector = '#coupon_code';
  const applyButtonXPath = '//*[@id="discount-coupon-form"]/div/div[2]/div/button';

  // === STEP 1: Wait for coupon input field ===
  I.waitForElement(couponSelector, 10);

  // === STEP 2: Check and set coupon code if needed ===
  const currentCoupon = await I.executeScript(() => {
    const el = document.querySelector('#coupon_code');
    return el ? el.value.trim() : null;
  });

  if (currentCoupon === null) {
    throw new Error('❌ Coupon field #coupon_code not found');
  }

  let shouldClickApply = false;

  if (currentCoupon !== COUPON_CODE) {
    console.log(`🔄 Setting coupon to "${COUPON_CODE}"`);

    await I.executeScript((code) => {
      const field = document.querySelector('#coupon_code');
      if (field) {
        field.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
          field.focus();
          field.value = code;
          field.dispatchEvent(new Event('input', { bubbles: true }));
          field.dispatchEvent(new Event('change', { bubbles: true }));
        }, 300); // minor delay to simulate typing
      }
    }, COUPON_CODE);

    I.wait(1);
    shouldClickApply = true;
  } else {
    console.log(`✅ Coupon already set to "${COUPON_CODE}"`);
  }

  // === STEP 3: Click "Apply" button if needed ===
  if (shouldClickApply) {
    I.waitForElement(applyButtonXPath, 10);
    const buttonExists = await I.executeScript((xpath) => {
      const result = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      return !!result.singleNodeValue;
    }, applyButtonXPath);

    if (!buttonExists) {
      throw new Error('❌ Apply Coupon button not found');
    }

    await I.executeScript((xpath) => {
      const result = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      const btn = result.singleNodeValue;
      if (btn) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => btn.click(), 300);
      }
    }, applyButtonXPath);

    console.log('✅ Apply button clicked');
  }
}


async function clickCancelCouponButton(I) {
  const cancelButtonXPath = '//button[@type="button" and contains(@class, "cancel") and contains(.,"Annuller rabatkode")]';

  // Wait for the button to be present
  I.waitForElement(cancelButtonXPath, 10);

  const buttonExists = await I.executeScript((xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );
    return !!result.singleNodeValue;
  }, cancelButtonXPath);

  if (!buttonExists) {
    throw new Error('❌ Cancel Coupon button not found');
  }

  // Scroll into view and click
  await I.executeScript((xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );
    const btn = result.singleNodeValue;
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => btn.click(), 300);
    }
  }, cancelButtonXPath);

  console.log('✅ Cancel Coupon button clicked');
}

/**
 * Changes the quantity by clicking increase/decrease buttons,
 * scrolls into view, prevents over-decrease, and updates the cart.
 *
 * @param {CodeceptJS.I} I - CodeceptJS actor
 * @param {'increase'|'decrease'} action - Action to perform
 * @param {number} count - How many times to click
 * @param {string} inputSelector - Selector for the input field (default: 'input.qty')
 * @param {string} updateButtonSelector - Selector for the update button (default: '.action.update')
 */
async function CartchangeQuantity(I, action, count, inputSelector = 'input.qty', updateButtonSelector = '.action.update') {
  const selectorMap = {
    increase: '.qty-inc',
    decrease: '.qty-dec',
  };

  const buttonSelector = selectorMap[action];
  if (!buttonSelector) {
    throw new Error('Invalid action. Use "increase" or "decrease".');
  }

  I.waitForElement(inputSelector, 5);

  let currentQty = 1;
  try {
    const val = await I.grabValueFrom(inputSelector);
    currentQty = parseInt(val, 10) || 1;
  } catch (err) {
    console.warn(`⚠️ Cannot read value from ${inputSelector}, assuming 1`);
  }

  let clicksToMake = count;

  if (action === 'decrease') {
    const minQty = 1;
    const maxDecreases = currentQty - minQty;

    if (maxDecreases <= 0) {
      console.log(`Already at minimum quantity (${minQty}), skipping decrease.`);
      return;
    }

    clicksToMake = Math.min(count, maxDecreases);
  }

  for (let i = 0; i < clicksToMake; i++) {
    I.waitForElement(buttonSelector, 5);

    await I.executeScript((sel) => {
      const el = document.querySelector(sel);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }, buttonSelector);

    I.waitForVisible(buttonSelector, 5);
    I.click(buttonSelector);
    I.wait(0.2); // wait for UI update (optional)
  }

  // Scroll and click the update button
  I.waitForElement(updateButtonSelector, 5);

  await I.executeScript((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, updateButtonSelector);

  I.waitForVisible(updateButtonSelector, 5);
  I.click(updateButtonSelector);
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
    randomScrolltoCenter,
    scrollElementToCenter,
    fillBonesInputsAndApplyCoupon,
    applyCouponIfNeeded,
    clickCancelCouponButton,
    CartchangeQuantity
};