// test_cases/validateDetails/runTests.js
Feature('Run All Tests and Show Summary');

Scenario('Run all validateDetails tests', async ({ I }) => {
  const { execSync } = require('child_process');
  const path = require('path');

  const testPattern = 'test_cases/validateDetails/done/*_test.js';
  const cmd = `npx codeceptjs run ${testPattern} --verbose --reporter json`;

  I.say('Running all tests...');

  let output = '';
  try {
    // Run command and capture output
    output = execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
  } catch (err) {
    // Capture output even if tests fail
    output = err.stdout?.toString() || '';
  }

  let passedFiles = [];
  let failedFiles = [];

  try {
    const results = JSON.parse(output);

    results.tests.forEach(test => {
      const fileName = path.basename(test.file);
      if (test.state === 'passed' && !passedFiles.includes(fileName)) {
        passedFiles.push(fileName);
      } else if (test.state === 'failed' && !failedFiles.includes(fileName)) {
        failedFiles.push(fileName);
      }
    });

    I.say(`✅ PASSED: ${passedFiles.join(', ') || 'None'}`);
    I.say(`❌ FAILED: ${failedFiles.join(', ') || 'None'}`);
  } catch (err) {
    I.say(`Could not parse JSON output: ${err.message}`);
  }
});
