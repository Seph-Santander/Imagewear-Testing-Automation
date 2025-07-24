async function loginCredentials(I, email, password) {
    I.amOnPage('/');

    I.wait(3);
    I.click(locate('img').withAttr({ alt: 'Mgt Developer Toolbar' }));


    I.click('Log ind');
    I.wait(3);


  // Check if element exists and is visible

    I.fillField('#email', email);
    I.fillField('#pass', password);

    I.click('#send2');
}

module.exports = {
    loginCredentials
};
