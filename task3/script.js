const input = document.getElementById('inputNumberOfSquares');
const inputDiv = document.querySelector('.inputNumber');
const container = document.querySelector('.container');
const list = document.querySelector('.squaresContainer');
const deleteButtons = document.querySelectorAll('.removeButton'); 
const addButton = document.querySelector('.addNewSquare');
const palindrome = document.querySelector('.palindrome');
let text = ''; // text from all input fields will beconcatenated here


//EVENTS
input.addEventListener('input', inputNumberFunc);
list.addEventListener('click', deleteSquare);
list.addEventListener('keyup', inputLetterOrSpaceOrBackspace)
addButton.addEventListener('click', addNewSquare);

//get the input
function inputNumberFunc(e) {
    const num = e.target.value;
    var regex=/[0-9]/;
    if (!num.match(regex)){
        alert("Must input numbers");
        return false;
    }
    inputDiv.classList.add('hide');
    container.classList.remove('hide');
    generateSquares(num);
}

//generete inputed number of squares 
function generateSquares(n){
    for (let i =0; i<n; i++){
        let li = document.createElement('li');
        let newBtn = document.createElement('button');
        newBtn.classList.add('removeButton');
        newBtn.classList.add('btn');
        newBtn.appendChild(document.createTextNode('X'));
        li.appendChild(newBtn);
        let newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('maxlength', '1');
        newInput.classList.add('input');
        li.appendChild(newInput);
        list.appendChild(li); 
    }
} 

//adding a new square, just calling the function above 
function addNewSquare(e){
    generateSquares(1);
}


//get the 'index' of list element 
function nodeIndex(el) {
    var i=0;
    while(el.previousElementSibling) {
        el=el.previousElementSibling;
        i++;
    }
    return i;
}

//deleting character from global text variable
function deleteCharacter(str, ind) {
    str = str.slice(0, ind) + str.slice(ind+1);
    //console.log(str);
    return str;
}

//to update character, didnt use it tho
function updateCharacter(str, ind, c){
    str = str.substring(0, ind) + c + str.substring(ind + 1);
    return str;
}

//add a character at specific index
function addCharacter(str,ind,c){
    str = str.substring(0, ind) + c + str.substring(ind);
    return str;
}


//deleting square
function deleteSquare(e) {
    if (e.target.classList.contains('removeButton')) {
       if (confirm('Are you sure?')) { 
            var li = e.target.parentElement;
            var index =  nodeIndex(li);
            //console.log(index);
            text = deleteCharacter(text,index);
            outputPalindromeText(text);
            list.removeChild(li);
        } 
    }
}

//not used 
function inputValidation(x){
    var regex=/[a-zA-Z]|\s|[\b]/;
    if (!x.match(regex)) {
        alert("Must input letter or space!");
        return false;
    }
    return true;
}

//to check weather an input is valid - letter\space
function inputValidationKeyCode(key) {
    if ((key >= 65 && key <= 90) || key == 8 || key == 32) return true;
    else {
        alert('You must input letter or space!');
        return false;
    }
}

//is string palindrome or not
function isPalindrome(str) {
    let arr = str.split('');
    let rev = arr.reverse();
    let newStr = rev.join('');
    return newStr==str; 
}


function inputLetterOrSpaceOrBackspace(e){
    var li = e.target.parentElement;
    var index =  nodeIndex(li);
    if (e.target.classList.contains('input')) {
        if (e.keyCode == '8') {
            console.log('backspace')
            text = deleteCharacter(text, index);
        }
        if (inputValidationKeyCode(e.keyCode)) {
           text = addCharacter(text, index, e.target.value);
        }
        outputPalindromeText(text);
    }
}

function outputPalindromeText(str) {
    if (isPalindrome(str)) {
        console.log(str)
        palindrome.innerHTML = 'The input is palindrome!'
    } else {
        console.log(str)
        palindrome.innerHTML = 'The input is not palindrome!'
    }
}