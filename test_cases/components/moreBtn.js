/**
 * Clicks the "Load More" button twice with 5 seconds delay between clicks.
 * @param {Object} I - CodeceptJS actor
 * @param {string} selector - CSS selector for the button
 */
async function scrollAndClickTwiceWithDelay(I, selector = '.btn-load-more') {
    for (let attempt = 1; attempt <= 2; attempt++) {
        const isVisible = await I.grabNumberOfVisibleElements(selector);

        if (isVisible > 0) {
        I.say(`🟢 Clicking "${selector}" - Attempt ${attempt}`);
        await I.executeScript((sel) => {
            const el = document.querySelector(sel);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, selector);

        I.wait(1);
        I.click(selector);

        if (attempt < 2) {
            I.say(`⏳ Waiting 5 seconds before next click...`);
            I.wait(5);
        }
        } else {
        I.say(`❌ "${selector}" not visible on attempt ${attempt}. Skipping remaining clicks.`);
        break;
        }
    }
}

/**
 * Scrolls to each .old-price element, simulates hover, and asserts nested .price span
 * @param {Object} I - CodeceptJS actor
 */
async function scrollAssertHoverOldPrices(I) {
    I.waitForElement('span.old-price', 5);

    const count = await I.grabNumberOfVisibleElements('span.old-price');
    if (count === 0) {
        throw new Error("❌ No span.old-price elements found on the page.");
    }

    // Inject CSS to simulate hover
    await I.executeScript(() => {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes borderFlash {
        0% {
            box-shadow: 0 0 0px rgba(255, 204, 0, 0.0);
        }
        50% {
            box-shadow: 0 0 15px 5px rgba(255, 204, 0, 0.8);
        }
        100% {
            box-shadow: 0 0 0px rgba(255, 204, 0, 0.0);
        }
        }

        .hover-simulated {
        position: relative;
        z-index: 9999;
        border: 3px dashed #ffcc00;
        border-radius: 8px;
        background: linear-gradient(135deg, rgba(255,255,153,0.3), rgba(255,239,130,0.6));
        font-weight: bold;
        font-family: 'Arial Black', sans-serif;
        color: #b22222 !important;
        padding: 6px 10px;
        transform: scale(1.07);
        animation: borderFlash 1.5s ease-in-out infinite;
        transition: all 0.3s ease;
        }

        .hover-simulated::after {
        position: absolute;
        top: -28px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0.95;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        }
    `;
    document.head.appendChild(style);
});



    for (let i = 0; i < count; i++) {
        const el = `(//span[contains(@class, 'old-price')])[${i + 1}]`;

        // Scroll into view
        await I.executeScript((selector) => {
        const el = document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, el);
        I.wait(0.5);

        // Add hover class
        await I.executeScript((selector) => {
        const el = document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (el) el.classList.add('hover-simulated');
        }, el);
        I.wait(2);

        // Remove hover class
        await I.executeScript((selector) => {
        const el = document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (el) el.classList.remove('hover-simulated');
        }, el);

        // Assert nested .price text
        const priceText = await I.executeScript((selector) => {
        const el = document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!el) return null;
        const price = el.querySelector('span.price');
        return price?.textContent?.trim() || null;
        }, el);

        if (!priceText) {
        throw new Error(`❌ [${i}] Missing or empty .price inside span.old-price`);
        }

        console.log(`✅ [${i}] Old price: "${priceText}"`);
    }
}

// ✅ Export both functions for use in tests
module.exports = {
    scrollAndClickTwiceWithDelay,
    scrollAssertHoverOldPrices,
};
