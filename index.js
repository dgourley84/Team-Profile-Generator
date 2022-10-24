const   Manager     =   require("./lib/manager");   //import manager.js objects
const   Engineer    =   require("./lib/engineer");  //import engineer.js objects
const   Intern      =   require("./lib/intern");    //import intern.js objects
const   inquirer    =   require("inquirer");        //import inquirer version 8.2.4
const   path        =   require("path");            //import path function to use in file navigation
const   fs          =   require("fs");              //import fs functions

const DIST_DIR      = path.resolve(__dirname,"dist");
const distPath      = path.join(DIST_DIR,"team.html");

const render        = require("./lib/htmlRenderer");

// Code to use inquirer to gather information about team members,
// and to create objects for each team member.
// create team members array 
const teamMembers = [];
//Upon initiation call the manager input request
function start() {
    managerQuery();
}
//input questions for Manager
function managerQuery(){
    inquirer
        .prompt([
            {
                name    :   "name",
                type    :   "input",
                message :   "what is the name of the team manager?",
            },
            {
                name    :   "id",
                type    :   "input",
                message :   "Team Manager's ID number:",       
            },
            {
                name    :   "email",
                type    :   "input",
                message :   "Team Manager's email address:",       
            },
            {
                name    :   "officeNumber",
                type    :   "input",
                message :   "Team Manager's office number:",       
            },
        ])
    .then((value)=>{
        const manager = new Manager(
            value.name,
            value.id,
            value.email,
            value.officeNumber
        );
        console.table(manager); // show values for team members
        teamMembers.push(manager); //push values into team members array
        addTeamMember(); //run the remaining team members questions
    });
}

function addTeamMember(){
    inquirer
        .prompt([
            {
                name    :   "whatRole",
                type    :   "list",
                message :   "Add an engineer or intern to the team?",
                choices :   ["Engineer", "Intern", "Not at this time"],
            },
        ])
        .then((value)=>{
            if(value.whatRole === "Engineer"){
                engineerQuery();    // if selected go to engineer input questions
            }else if (value.whatRole === "Intern"){
                internQuery();      // if selected go to intern input questions
            }else{
                createFile();       // if selected create html file with just manager information
            }
        });
}
//input questions for engineer
function engineerQuery(){
    inquirer
        .prompt([
            {
                name    :   "name",
                type    :   "input",
                message :   "Engineer's name?",
            },
            {
                name    :   "id",
                type    :   "input",
                message :   "Engineer's ID number:",
            },
            {
                name    :   "email",
                type    :   "input",
                message :   "Engineer's email address:",
            },
            {
                name    :   "github",
                type    :   "input",
                message :   "What is the Engineer's GitHub Username?",
            },
        ])
        .then((value)=>{
            const engineer = new Engineer(value.name, value.id, value.email, value.github);
            console.table(engineer);        // show values for team members
            teamMembers.push(engineer);     //push values into team members array
            addTeamMember();                //run the remaining team members questions
        });
}

function internQuery(){
    inquirer
        .prompt([
            {
                name    :   "name",
                type    :   "input",
                message :   "Intern's name?",
            },
            {
                name    :   "id",
                type    :   "input",
                message :   "Interns's ID number:",
            },
            {
                name    :   "email",
                type    :   "input",
                message :   "Intern's email address:",
            },
            {
                name    :   "school",
                type    :   "input",
                message :   "What school does or did the intern attend?",
            },
        ])
        .then((value)=> {
            const intern = new Intern(value.name, value.id, value.email, value.school);
            console.table(intern);          // show values for team members
            teamMembers.push(intern);       //push values into team members array
            addTeamMember();                //run the remaining team members questions
        })
}
//create html file in dist directory
function createFile(){
    if(!fs.existsSync(DIST_DIR)){
        fs.mkdirSync(DIST_DIR);
    }else {
        fs.writeFileSync(distPath,render(teamMembers),"utf-8");
        console.log("File created in dist folder");
    }
}

start();