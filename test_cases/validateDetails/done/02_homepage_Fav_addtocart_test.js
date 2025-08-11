const { loginCredentials } = require('../../components/simple_userLogin');
const { scrollToCenter } = require('../../components/checkouts');
const { clickFavoriteAddToCartByIndex, fillQtyInputs } = require('../../components/addToCart_methods');

Feature('Validate Sections and Favorites to Cart');

Scenario('User login and Check for Visibility of Mine Favoriter, Nye Produkter, Surf Vores Kategorier, Featured Produkter Sections and Add Product from Mine Favorite to Cart', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;

    const productName = 'Hvid Kalot med lufthuller';//Parameter: Product name from Mine Favorite Section

    //==========================================================================================================================

    //User Login
    await loginCredentials(I, email, password);
    I.wait(5);

    
    //Asserting Mine Favoriter, Nye Produkter, Surf Vores Kategorier, Featured Produkter Sections
    await scrollToCenter(I, '//*[@id="favorite-product"]/div/div/div[1]/div');
    I.wait(1);
    await scrollToCenter(I, '//*[@id="new-products"]/div/div/div[1]/div');
    I.wait(1);
    await scrollToCenter(I, '//*[@id="category_slider"]');
    I.wait(1);
    await scrollToCenter(I, '//*[@id="maincontent"]/div[2]/div/div[5]/div[1]');
    I.wait(1);

    //Refreshing the Page
    I.amOnPage('/');

    //Selecting Item to the Mine Favorite Section
    await scrollToCenter(I, '//*[@id="favorite-product"]/div/div/div[1]/div');
    await clickFavoriteAddToCartByIndex(I, productName); //Parameter: Product name from Mine Favorite Section
    I.wait(3);

    //Filling Quantity Value to Specific Input Field 
    await fillQtyInputs (I, 2, 1);//Parameter: (I, [Number of Input Field in the Product Page], Quantity Value)
    I.wait(2);
    
    I.seeElement('#product-addtocart-button');

    //Clicking Add to Cart Button
    I.click('#product-addtocart-button');
    I.wait(10);

});
