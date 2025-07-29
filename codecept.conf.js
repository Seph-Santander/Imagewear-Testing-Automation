const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'https://imgwear246.1902dev1.com/',
      browser: 'microsoftedge',
      windowSize: '1500x950',
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'Imagewear-Testing-Automation',
  custom: {
    email: 'nineteen02merry@gmail.com',
    password: 'merry@190200'
  }
}