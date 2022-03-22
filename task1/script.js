var form = document.getElementById('addForm'); //form
var itemList = document.getElementById('items'); //ul
var filter = document.getElementById('filter'); //search input
var todoList = Array();
// form submit event
form.addEventListener('submit', addItem);

//delete event 
itemList.addEventListener('click', removeItem);

//filter event
filter.addEventListener('keyup', filterItems);

//add item
function addItem(e){
    e.preventDefault();
    //get input value
    var newItem = document.getElementById('item').value;
    // create new li element
    var li = document.createElement('li');

    //add class
    li.className = 'list-group-item';
    //add text node with input value
    li.appendChild(document.createTextNode(newItem));
    //create delete button element 
    var deleteBtn = document.createElement('button');
    //add classes to del buttton
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    //appent text node
    deleteBtn.appendChild(document.createTextNode('X'));
    //append button to li
    li.appendChild(deleteBtn);
    //toDo.push(li);
    //append li to list
    itemList.appendChild(li);

}

function addItem2 (e) {
    e.preventDefault();
    //get input value
    var newItem = document.getElementById('item').value;
    // create new li element
    //var li = document.createElement('li');

    var todo = '<li class="list-group-item">' +newItem+ '<button class="btn btn-danger btn-sm float-right delete">X</button></li>';
    itemList.innerHTML += todo;
    todoList.push(todo);
    window.localStorage.setItem("tasks", todoList.join(" "));
}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            var li = e.target.parentElement; //we want list item 
            itemList.removeChild(li);
        }
    }
}


var count = 0; //had to use global variable here, counts number of presses of up and down key

function filterItems(e) {
    var text = e.target.value.toLowerCase();
    var items = itemList.getElementsByTagName('li');  
    var lis = document.getElementsByClassName('possibleSearch');
    //creates list of possible search elements
    Array.from(items).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().startsWith(text)){
            item.classList.add('possibleSearch');
            item.addEventListener('click', () => {
                item.setAttribute('id', 'selected');
                item.style.backgroundColor = 'gray';
                filter.value=itemName;
                Array.from(items).forEach(item => {
                    if (!item.id) {
                        item.style.display = 'none';
                    }
                })
            })
        } else {
            item.style.display = 'none';
            item.classList.remove('possibleSearch');
        }
    })
    //if up or down arrow is pressed, helpFunction is called
    if (e.keyCode == '38' || e.keyCode == '40'){
        helpFunction(e, lis, count, items);
        count++;
    } 
    if (e.keyCode == '13') {
        Array.from(items).forEach(item => {
            if (!item.classList.contains('selected')) {
                item.style.display = 'none';
            } else {
                var itemName = item.firstChild.textContent;
                filter.value=itemName;
            }
        })
    }
}

function helpFunction(e, list, count,items) {
    if (count == 0){
        list[0].style.backgroundColor = 'gray';
        list[0].classList.add('selected');
        //console.log(list[0].classList)
    } else if (count != 0){
        if (e.keyCode == '40') {
            for (let i = 0; i<list.length; i++){
                if (i >=0 && i < (list.length -1)) {
                    if (list[i].style.backgroundColor == 'gray') {
                        list[i].style.backgroundColor = 'white';
                        list[i].classList.remove('selected');
                        list[i+1].style.backgroundColor = 'gray';
                        list[i+1].classList.add('selected');
                        break;
                    }
                }
                if (i == list.length-1) {
                    if (list[i].style.backgroundColor == 'gray') {
                        list[i].style.backgroundColor = 'white';
                        list[i].classList.remove('selected');
                        list[0].style.backgroundColor = 'gray';
                        list[0].classList.add('selected');
                        break;
                    }
                }
            }
        } else if (e.keyCode == '38') {
            for (let i = list.length -1; i>=0; i--){
                if (i <=list.length -1 && i > 0) {
                    if (list[i].style.backgroundColor == 'gray') {
                        list[i].style.backgroundColor = 'white';
                        list[i].classList.remove('selected');
                        list[i-1].style.backgroundColor = 'gray';
                        list[i-1].classList.add('selected');
                        break;
                    }
                }
                if (i == 0) {
                    if (list[i].style.backgroundColor == 'gray') {
                        list[i].style.backgroundColor = 'white';
                        list[i].classList.remove('selected');
                        list[list.length -1].style.backgroundColor = 'gray';
                        list[list.length -1].classList.add('selected');
                        break;
                    }
                }
            }
        }
    } 
}

function readTasks() {
    if (window.localStorage.getItem("tasks") == null) {
        alert("db is empty");
    } else {
        //var todo = document.querySelector('#todolist');
        var savedTasks = window.localStorage.getItem("tasks");
        //push task to array so we dont over write old tasks the next time
        todoList.push(savedTasks);
        itemList.innerHTML = savedTasks;
    }
}

