const inquirer = require('inquirer');
const generateSite = require('./utils/generate-site.js');
const generatePage = require('./src/page-template');

const promptUser=()=>{
  
return inquirer .prompt([
  {
    type:'input',
    name: 'name',
    message: 'What is your Name?'
  },
  {
    type:'input',
    name: 'github', 
    message: 'Enter your Github Username  '
  },
  {
    type: 'confirm',
    name: 'confirmAbout',
    message: 'Would you like to enter some information about yourself for an',
    default: true
  },
  {
    type:'input',
    name:'about', 
    message: 'Provide some information about yourself:',
    when: ({confirmAbout})=>{
      if(confirmAbout){
        return true;
      }else {
        return false;
      }
    }
  }
]);
};
const promptProject = portfolioData => {
  if(!portfolioData.projects){
    portfolioData.projects=[];
  }
  console.log(`
  =================
  Add a New Project
  =================`);
  
   

  // If there's no 'projects' array property, create one
  
  
  return inquirer.prompt([
    {
      type:'input',
      name: 'name',
      message: 'What is the name of your project?',
      // validate recieves an argument: argument is userInput==> nameInput
      validate: nameInput =>{
        if(nameInput){
          // if validation is true the validation passed successfully
          return true;
        }else {
          // if the validation is false then the user recieves a message
          console.log('Please enter your name!');
          return false;
        }
      }

    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project(Required)'
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['Javascript','HTML','CSS','ES6','jQuery','Bootstrap', '']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the Gihub link to you project. (Required)'
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ]).then(projectData => {
    portfolioData.projects.push(projectData);
    if(projectData.confirmAddProject){
      return promptProject(portfolioData);
    }
    else{
      return portfolioData;
    }
  })
  
  
  
  
};
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

