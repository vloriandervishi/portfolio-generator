const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template');

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
    type:'input',
    name:'about', 
    message: 'Provide some information about yourself:'
  }
]);
};
const promptProject = (portfolioData) =>{

  console.log(`
  =================
  Add a New Project
  =================`);


  // If there's no 'projects' array property, create one
  
  return inquirer.prompt([
    {
      type:'input',
      name: 'name',
      message: 'What is the name of your project?'
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
  ]);
  
 
  
};
promptUser()
.then (answers => console.log(answers))
.then(promptProject)
.then(projectAnswers=> {
  if(!projectAnswers.project){
    projectAnswers.project=[];
  }
  projectAnswers.project.push(projectAnswers);
  if(projectAnswers.confirmAddProject){
    return promptProject(projectAnswers);

  }else {
    return projectAnswers;
  }
});