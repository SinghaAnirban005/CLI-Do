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

// section to enable adding todo in the array

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

// section to delete todo ...
program
    .command('delete-todo')
    .description('delete todo from file')
    .argument('<string>', 'Todo to delete')
    .action((id) => {
        fs.readFile('todos.json', 'utf-8', (err, data) => {
            if(err){
                throw err
            }

        const set = JSON.parse(data)
        let  i = 0;
        while(i < set.length){
            if(set[i].id == id) {
                break;
            }
            else{
                i++;
            }
        }

        if(i == set.length) {
            throw new Error("No todo with such id exists !!")
        }

        console.log(set[i].id)
        })
    })

program.parse(process.argv)