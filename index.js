import { Command } from "commander";
import fs from "fs"

const program = new Command()

let todos = [

]

if(fs.existsSync('todos.json')){
    const dataSet = fs.readFileSync("todos.json", 'utf-8')
    if(dataSet) {
        todos = JSON.parse(dataSet)
    }
}

//  To enable adding todo in the array

program
    .name("index")
    .description("Add todo's to json file")
    .version('1.0.0')
 
program
    .command("add-todo")
    .description("Add To-Do's")
    .argument('<string>', "Todo to add")
    .action((str) => {

        const work = {
            id: todos.length == 0 ? 0 : todos.length,
            todo: str
        }

        todos.push(work)
     

        fs.writeFile('todos.json', JSON.stringify(todos), (err) => {

            if(err) {
                console.log(err)
                throw err
            }

            console.log(todos)
            console.log('Todo has been added')
        })
    })

// To delete todo ...
program
    .command('delete-todo')
    .description('delete todo from file')
    .action(() => {
        todos.splice(0, todos.length - 1)

        const newTodos = todos
        fs.writeFile('todos.json', JSON.stringify(newTodos), (err) => {
            if(err) {
                console.log(err)
                throw err
            }

            console.log(newTodos)
       })
    })


program.parse(process.argv)