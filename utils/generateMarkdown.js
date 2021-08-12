// GitHub formatting syntax for markdowns:
// https://docs.github.com/en/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax

// function to generate markdown for README
function generateMarkdown(userResponses, userInfo) {

    // Plug userReponses into table of contents
    let tableOfContent = `## Table of Contents`;

    if (userResponses.description !== '') { tableOfContent += `
  * [Description](#description)` };

    if (userResponses.installation !== '') { tableOfContent += `
  * [Installation](#installation)` };

    if (userResponses.usage !== '') { tableOfContent += `
  * [Usage](#usage)` };

    if (userResponses.contribution !== '') { tableOfContent += `
  * [Contribution](#contribution)` };

    if (userResponses.tests !== '') { tableOfContent += `
  * [Tests](#tests)` };

    // Create title and description
    // Generate badges
    let markdown =
        `# ${userResponses.title}
  ![Badge for GitHub](https://img.shields.io/github/languages/top/${userResponses.username}/${userResponses.repository}?style=flat&logo=appveyor) 
  ![](https://img.shields.io/badge/license-${userResponses.license.replace(/ /g, "%20")}-blue?style=flat-square)

  
  
  ## Description 
  
  ${userResponses.description}
  `
        // Add table of contents data to markdown
    markdown += tableOfContent;
    // Add license section to markdown
    markdown += `

  // * [License](#license)`;

    // Create installation section
    if (userResponses.license !== '') {
        markdown += `
  
  ## Installation
  ${userResponses.installation}`
    };

    // Create usage section
    if (userResponses.usage !== '') {
        markdown +=
            `
  ## Usage 
  ${userResponses.usage}`
    };

    // Create contribution section
    if (userResponses.contribution !== '') {
        `
  
  ## Contribution
  ${userResponses.contribution}`
    };
    markdown +=
        `
  
  ## Tests
  ${userResponses.tests}`
};

// Connect userResponses to license section
markdown +=
    `
  
  ## License

  ![](https://img.shields.io/badge/license-${userResponses.license.replace(/ /g, "%20")}-blue?style=flat-square)`;

// Questions section
let developer =
    `
  ---
  
  ## Questions?
  * __GitHub:__ [github.com/${userInfo.login}](https://github.com/${userInfo.login})
  * __Email:__ [${userResponses.email}](mailto:${userResponses.email})
  
  ![Developer Profile Picture](${userInfo.avatar_url}) 
  
  For any questions, please contact me with the information below:

 
  GitHub: [@${userInfo.login}](${userInfo.url})
  `;

// If GitHub email is not null, add to Developer section
if (userInfo.email !== null) {

    developer +=
        `
  `
};

// Add developer section to markdown
markdown += developer;

// Return markdown
return markdown;
};

// Export markdown module
module.exports = generateMarkdown;