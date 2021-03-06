// Global libraries
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

// Internal NPMs
const api = require('./utils/api.js');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Array of questions for user
const questions = [
    // Title of Project
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your project.',
        // We need to validate that user entered at least one word
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("You must enter the title of your project.");
            }
            return true;
        }
    },
    // Project Description
    {
        type: 'input',
        name: 'description',
        message: 'Enter a description of your project.',
        // We need to validate that user entered at least one word
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("You must enter a description for your project.");
            }
            return true;
        }
    },
    // Project Installation
    {
        type: 'input',
        name: 'installation',
        message: 'Explain how user would install (if necessary) for Installation Section.',
        // Validation not required if question is optional
    },
    // Usage of project
    {
        type: 'input',
        name: 'usage',
        message: 'Enter your project instructions and examples of it in use for Usage Section.',
    },
    // Select license
    {
        type: 'list',
        name: 'license',
        message: 'Choose your license for your project.',
        // https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/licensing-a-repository
        choices: ["None", "Apache2.0", "GNU Public v3.0", "MIT", "Boost Software 1.0"]

    },
    // Contribution to project
    {
        type: 'input',
        name: 'contribution',
        message: 'Explain how users can contribute to your project (if necessary).',
        // Validation not required if question is optional
    },
    // Test for project
    {
        type: 'input',
        name: 'tests',
        message: 'Provide tests for project, and explain how to test (if necessary).',
        // Validation not required if question is optional
    },
    // GitHub Username
    {
        type: 'input',
        name: 'username',
        message: 'Enter your GitHub username.',
        // We need to validate that user entered at least one word
        // https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("You must enter a GitHub username.");
            }
            return true;
        }
    },
    {
        // Takes user text input
        type: "input",
        name: "email",
        message: "Enter Your Email Address"
    },
    // GitHub Repository
    {
        type: 'input',
        name: 'repository',
        message: 'Enter the name of your repository on GitHub.',
        // We need to validate that user entered at least one word
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("You must enter the name of your GitHub repository.");
            }
            return true;
        }
    },

];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log('Your markdown file has been created.')
    });
}

// Reference: https://www.npmjs.com/package/util.promisify
const writeFileAsync = util.promisify(writeToFile);

// function to initialize program
async function init() {
    // https://www.w3schools.com/js/js_errors.asp
    try {
        // Reference inquirer array with prompts
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
        // https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Your responses have been logged. Calling to GitHub...");

        // Referencing API.js
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);

        // Pass inquirer data and api data to markdown
        console.log("Generating your markdown")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);

        // Write markdown
        await writeFileAsync('README.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

// function call to initialize program
init();