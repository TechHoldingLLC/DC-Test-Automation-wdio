# DC-Test-Automation-wdio

GSUSA Digital Cookie Test Automation With WebdriverIO

🧪 Automation Test Framework
This repository contains an automated testing framework designed for both local and LambdaTest cloud executions using Node.js and npm.

📥 Getting Started
Follow the steps below to set up the project on your local machine and run tests:

1. Clone or Pull the Latest Code from Git
   If you're setting up the project for the first time:

=> "**git clone <repository-url>**"
=> "**cd <project-directory>**"
If the project already exists locally and you want to pull the latest changes:

=> "**git pull origin main**"
Replace main with your respective branch name if you're working on a feature branch.

2. Install Project Dependencies
   Once inside the project directory, install all required dependencies using:

=> "**npm install**"
This will install all the packages listed in package.json.

3. Run Tests
   You can execute tests either locally or on LambdaTest cloud platform.

- Run Tests Locally
  => "**npm run test:local**"
  This will execute the test suite on your local environment.

- Run Tests on LambdaTest
  => "**npm run test:lt**"
  This will trigger the test suite on the LambdaTest cloud infrastructure.

🔐 Connect with your Team Lead to obtain LambdaTest credentials and configuration details if not already available.

4. View Test Report
   Once the test execution is completed, generate and open the Allure report using:
   => "**allure generate allure-results --clean && allure open**"
   This command will generate a test execution report and automatically open it in your default browser.

📊 View LambdaTest Dashboard
To monitor and verify your test executions on LambdaTest, visit the following URL:
🔗 [LambdaTest Automation Dashboard](https://automation.lambdatest.com/build?pageType=build)

📞 Support
If you encounter any issues or require access credentials, please reach out to your Team Lead.

✅ Best Practices

1. Ensure your local branch is always updated with the latest code from main.
2. Confirm that all dependencies are installed properly before test execution.
3. Use Allure reports to analyze test results and failure reasons.
4. Regularly monitor the LambdaTest dashboard to ensure cloud executions are functioning correctly.
