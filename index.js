import { Command } from "commander";
import fs from "fs"

const program = new Command()

let todos = [
 
]

if(fs.existsSync('todos.json')){
    const dataSet = fs.readFileSync("todos.json", 'utf-8')
    if(dataSet){
        todos = JSON.parse(dataSet)
    }
}

program
    .name("index")
    .description("Add todo's to json file")
    .version('1.0.0')
 
program
    .command("add-todo")
    .description("Add To-Do's")
    .argument('<string>', "Todo to add")
    .action((str) => {

        todos.push(str)

        fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
            if(err) {
                console.log(err)
                throw err
            }

            console.log('Todo has been added')
        })
    })

program.parse(process.argv)