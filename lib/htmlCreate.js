const   path        =   require("path");
const   fs          =   require("fs");


const templateDir   = path.resolve(__dirname,"../template"); //define template directory

//push the roles into html document
const render        =  (employees) =>{
    const html=[];

    html.push(
        employees
            .filter((employee)=> employee.getRole()==="Manager")
            .map((manager)=> renderManager(manager))
    );
    
    html.push(
        employees
            .filter((employee)=> employee.getRole()==="Engineer")
            .map((engineer)=> renderEngineer(engineer))
    );
    html.push(
        employees
            .filter((employee)=> employee.getRole()==="Intern")
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
    template = replacePlaceholder(template, "name", manager.getName());
    template = replacePlaceholder(template, "role", manager.getRole());
    template = replacePlaceholder(template, "email", manager.getEmail());
    template = replacePlaceholder(template, "id", manager.getId());
    template = replacePlaceholder(template, "officeNumber", manager.getOfficeNumber());
    return template;
};
//obtain engineer.html and replace placeholders with information from engineer.js
const renderEngineer = (engineer)=>{
    let template =fs.readFileSync(
        path.resolve(templateDir,"engineer.html"),
        "utf-8"
    );
    template = replacePlaceholder(template, "name", engineer.getName());
    template = replacePlaceholder(template, "role", engineer.getRole());
    template = replacePlaceholder(template, "email", engineer.getEmail());
    template = replacePlaceholder(template, "id", engineer.getId());
    template = replacePlaceholder(template, "github", engineer.getGithub());
    return template;
};
//obtain intern.html and replace placeholders with information from intern.js
const renderIntern = (intern)=>{
    let template =fs.readFileSync(
        path.resolve(templateDir,"intern.html"),
        "utf-8"
    );
    template = replacePlaceholder(template, "name", intern.getName());
    template = replacePlaceholder(template, "role", intern.getRole());
    template = replacePlaceholder(template, "email", intern.getEmail());
    template = replacePlaceholder(template, "id", intern.getId());
    template = replacePlaceholder(template, "school", intern.getSchool());
    return template;
};
//obtain main.html and replace team placeholder with the HTML elements
const renderMain = (html) => {
    const template = fs.readFileSync(
        path.resolve(templateDir, "main.html"),
        "utf-8"
    );
    return replacePlaceholder(template, "team", html);
};

const replacePlaceholder = (template, placeholder, value) =>{
    const pattern = new RegExp("{{ " + placeholder + "}}", "gm");
    return template.replace(pattern, value);
};

module.exports = render;