#!/usr/bin/env node

import inquirer from "inquirer";

interface ansType{
    menuOpt: string,
    todo: string,
}
let todos: string[]=[];
let loop: boolean= true;
let answer1:ansType;
let answer2:ansType;
let answer3:ansType;

async function startloop() {
    while(loop){
        await displaymenuiten();
    }
}

startloop();

async function displaymenuiten() {
    answer1 = await inquirer.prompt([
        {
            type:"list",
            name: "menuOpt",
            choices: ["Add ToDo item","Delete ToDo item","Exit"],
            message:" please select menu iten"
        }
    ]);
    switch(answer1.menuOpt){
        case 'Add ToDo item':{
            await addTodo();
            break;
        }
        case 'Delete ToDo item':{
            await deleteToDo()
            break;
        }
       default:{
        loop = false;
        console.log("Exit program.")
        break;
       }
    }
    
}

async function addTodo() {
    answer2 = await inquirer.prompt([
        {
            type:"input",
            name: "todo",
            message: "Enter what to do?"
        }
    ])
    todos.push(answer2.todo);
    console.log(todos)
    
}
async function deleteToDo() {
    if(todos.length>0){
        answer3 = await inquirer.prompt([
            {
                type: "list",
                name: "menuOpt",
                choices: todos,
                message: "please select TODO for delete: "
            }
        ]);
        let i = 0;
        do{
            if(todos[i] === answer3.menuOpt){
                todos.splice(i, 1);
                break;
            }
            i++;
        }while(i<todos.length);
        console.log(todos)
    } else{
        console.log("no TODO item to Delete. ")
    }
    
}
