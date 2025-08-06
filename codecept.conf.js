const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './test_cases/**/*.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'https://imgwear246.1902dev1.com/',
      browser: 'chrome',
      windowSize: '1920x1080',
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
