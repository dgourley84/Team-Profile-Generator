const   Manager     =   require("./lib/manger");
const   Engineer    =   require("./lib/engineer");
const   Intern      =   require("./lib/intern");
const   inquirer    =   require("inquirer");
const   path        =   require("path");
const   fs          =   require("fs");

const DIST_DIR      = path.resolve(__dirname,"dist");
const distPath      = path.join(DIST_DIR,"team.html");

// Code to use inquirer to gather information about team members,
// and to create objects for each team member.

const teamMembers = [];

function start() {
    managerQuery();
}

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
        console.table(manager);
        teamMembers.push(manager);
        addTeamMember();
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
                engineerQuery();
            }else if (value.whatRole === "Intern"){
                internQuery();
            }else{
                createFile();
            }
        });
}

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
            console.table(engineer);
            teamMembers.push(engineer);
            addTeamMember();
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
            console.table(intern);
            teamMembers.push(intern);
            addTeamMember();
        })
}

function createFile(){
    if(!fs.existsSync(DIST_DIR)){
        fs.mkdirSync(DIST_DIR);
    }else {
        fs.writeFileSync(distPath,render(teamMembers),"utf-8");
        console.log("File created in dist folder");
    }
}



start();