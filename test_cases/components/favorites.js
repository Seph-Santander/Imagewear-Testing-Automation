async function OpenFavoritesPage(I) {
    I.click('.link.wishlist a');
    I.waitForElement('.column.main', 10);
}

const { I } = inject();

async function inputQuantityBySize(size, quantity) {
  // Find the column index of the given size in the <thead>
  const sizeCellXPath = `//table[@id="wk-product-matrix"]//thead//th[normalize-space(text())="${size}"]`;

  // Get the data-value-index from the <th> of the matching size
  const valueIndex = await I.grabAttributeFrom(sizeCellXPath, 'data-value-index');

  // Construct the selector for the matching input in the <tbody>
  const inputSelector = `input[name="matrix_qty[${valueIndex}]"]`;

  // Interact with the input field
  I.waitForElement(inputSelector);
  I.fillField(inputSelector, quantity);
}

module.exports = {
    OpenFavoritesPage,
    inputQuantityBySize
};