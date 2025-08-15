const { loginCredentials } = require('../../components/simple_userLogin');
const { ValidateFooter } = require('../../components/footer');


Feature('Validating Footer to Different Part of Website');

Scenario('User logs in with valid credentials and Asserting that the Footer All Rights Reserved is present', async ({ I }) => {
  const { email, password } = codeceptjs.config.get().custom;

  //==========================================================================================================================
  
  //Asserting that the Footer All Rights Reserved is Present to Different Part of Website
  await loginCredentials(I, email, password);
  I.say('Login submitted. Waiting for dashboard...');

  await ValidateFooter(I); 

  I.click('//A[normalize-space(.)="Kontakt os"]');
  await ValidateFooter(I); 
  
  I.click('//*[@id="html-body"]/div[2]/header/div[1]/div/ul/li[3]/span/button');
  I.click('//A[normalize-space(.)="Min Konto"]');
  await ValidateFooter(I); 

  I.click('//*[@id="html-body"]/div[2]/header/div[1]/div/ul/li[3]/span/button');
  I.click('//SPAN[normalize-space(.)="3.376 Belønningspoints"]/../..');
  await ValidateFooter(I); 

  I.click('//*[@id="html-body"]/div[2]/header/div[1]/div/ul/li[3]/span/button');
  I.click('//SPAN[normalize-space(.)="21 varer"]/..');
  await ValidateFooter(I); 

  I.click('//SPAN[normalize-space(.)="Forside"]');
  await ValidateFooter(I); 

  I.click('//SPAN[normalize-space(.)="Kategorier"]');
  I.click('//*[@title="Hotel - Restaurant & Cafe"]/SPAN');
  await ValidateFooter(I); 

  I.click('//A[normalize-space(.)="Kundeservice"]');
  await ValidateFooter(I);

  I.click('//A[normalize-space(.)="Tilbudsvarer"]');
  await ValidateFooter(I);
  
  I.click('//A[normalize-space(.)="OUTLET"]');
  await ValidateFooter(I);

  I.click('//SPAN[normalize-space(.)="Blog"]');
  await ValidateFooter(I);

  I.click('//*[@title="Brands"]');
  await ValidateFooter(I);
  I.wait(10);

});
