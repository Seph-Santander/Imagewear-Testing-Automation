async function loginCredentials(I, email, password) {
    I.amOnPage('/');

    I.wait(2);
    I.click(locate('img').withAttr({ alt: 'Mgt Developer Toolbar' }));


    I.click('Log ind');
    I.wait(2);

    I.fillField('#email', email);
    I.fillField('#pass', password);

    I.click('#send2');
}

module.exports = {
    loginCredentials
};
