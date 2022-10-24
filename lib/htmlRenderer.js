const   path        =   require("path");
const   fs          =   require("fs");


const templateDir   = path.resolve(__dirname,"../template"); //define template directory

//push the roles into html document
const render        =  (employees) => {
    const html=[];

    html.push(
        employees
            .filter((employee)=> employee.getRole() === "Manager")
            .map((manager)=> renderManager(manager))
    );
    
    html.push(
        employees
            .filter((employee)=> employee.getRole() === "Engineer")
            .map((engineer)=> renderEngineer(engineer))
    );
    html.push(
        employees
            .filter((employee)=> employee.getRole() === "Intern")
            .map((intern)=> renderIntern(intern))
    );

    return renderMain(html.join(""));
};

//obtain manager.html and replace placeholders with information from manager.js
const renderManager = (manager)=>{
    let template =fs.readFileSync(
        path.resolve(templateDir,"manager.html"),
        "utf-8"
    );
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
    return template;
};
//obtain engineer.html and replace placeholders with information from engineer.js
const renderEngineer = (engineer)=>{
    let template =fs.readFileSync(
        path.resolve(templateDir,"engineer.html"),
        "utf-8"
    );
    template = replacePlaceholders(template, "name", engineer.getName());
    template = replacePlaceholders(template, "role", engineer.getRole());
    template = replacePlaceholders(template, "email", engineer.getEmail());
    template = replacePlaceholders(template, "id", engineer.getId());
    template = replacePlaceholders(template, "github", engineer.getGithub());
    return template;
};
//obtain intern.html and replace placeholders with information from intern.js
const renderIntern = (intern)=>{
    let template =fs.readFileSync(
        path.resolve(templateDir,"intern.html"),
        "utf-8"
    );
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "id", intern.getId());
    template = replacePlaceholders(template, "school", intern.getSchool());
    return template;
};
//obtain main.html and replace team placeholder with the HTML elements
const renderMain = (html) => {
    const template = fs.readFileSync(path.resolve(templateDir, "main.html"),"utf-8");
    return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) =>{
    const pattern = new RegExp("{{ " + placeholder + "}}", "gm");
    return template.replace(pattern, value);
};

module.exports = render;