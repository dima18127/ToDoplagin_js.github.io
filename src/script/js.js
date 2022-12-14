let message = document.querySelector('.message')
let button = document.querySelector('.add')
let todo = document.querySelector('.todo')

let tasks = [];

if (localStorage.getItem("todo" )) {
    tasks = JSON.parse(localStorage.getItem("todo" ));
displayMessages();
}

button.addEventListener("click", () => {addTask()} );

function addTask() {
    if (!message.value){return};
         let newToDo = {
             text: message.value,
             checked: false,
             important: false
            }
            tasks.push(newToDo)
            console.log(message.value.length);
            displayMessages()
            localStorage.setItem("todo", JSON.stringify( tasks))
        } 


function displayMessages(params) {
// показывает сообщения из массива
    let newContent = " ";
    if (tasks.length === 0) todo.innerHTML = " ";
    tasks.forEach( function (item, i) {
    newContent += `
                        <li>
                            <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : " "}>
                            <label for='item_${i}' class="${item.important ? "important" : " "}">${item.text}</label>
                        </li> 
                    `
    todo.innerHTML = newContent
    message.value = ""
    })
    
    todo.addEventListener("change", function (e)  {
        let valueLabel = todo.querySelector('[for='+ e.target.getAttribute('id') +']').innerHTML;
        
        tasks.forEach( function (item) {

            if (item.text === valueLabel ) {
                item.checked = !item.checked;
                localStorage.setItem("todo", JSON.stringify( tasks))
            }
        }) 
    })
}
todo.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    tasks.forEach(function (item, index) {
        if (event.target.getAttribute('for') === `item_${index}` ) {
            if (event.ctrlKey || event.metaKey ) {
                tasks.splice(index, 1 );
                localStorage.setItem("todo", JSON.stringify( tasks))
                displayMessages()
            } else {
                item.important = !item.important
                localStorage.setItem("todo", JSON.stringify( tasks))
                displayMessages()
                }
            }
            
            })       
        })
     
