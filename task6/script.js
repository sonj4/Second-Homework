const header = document.querySelector('.headerContainer');
const questionContainer = document.querySelector('.questionContainer');
const questionText = document.querySelector('.question');
const answersContainer = document.querySelector('.answersContainer');
const startButton = document.querySelector('.startButton');
const nextButton = document.querySelector('.nextButton');


let questions = [
    {
        question: 'What is the name of the artist who painted - Mona Lisa?',
        answers: [
            {id: 0, text: 'Leonardo Da Vinci', correct: true},
            {id: 1,text: 'Vincent van Gogh', correct: false},
            {id: 2,text: 'Claude Monet', correct: false},
            {id: 3,text: 'Salvador Dali', correct: false}
        ],
        correct: [0]
    },
    {
        question: 'Where is Lincoln Memorial situated in America?',
        answers: [
            {id: 0, text: 'Chicago', correct: false},
            {id: 1, text: 'Austin', correct: false},
            {id: 2, text: 'Washington D.C.', correct: true},
            {id: 3, text: 'New York', correct: false}
        ],
        correct: [2]
    },
    {
        question: 'What is the capital of Brazil?',
        answers: [
            {id: 0, text: 'Brasilia', correct: true},
            {id: 1, text: 'Rio de Janeiro', correct: false},
            {id: 2, text: 'Sao Paulo', correct: false},
            {id: 3, text: 'Salvador', correct: false}
        ],
        correct: [0]
    },
    {
        question: ' What temperature does water boil at? (select more answers)',
        answers: [
            {id: 0, text: '100 °C', correct: true},
            {id: 1, text: '0 °C', correct: false},
            {id: 2, text: '212 °F', correct: true},
            {id: 3, text: '100 °F', correct: false}
        ],
        correct: [0,2]
    },
    {
        question: 'Who is the author of Julius Caesar and Romeo Juliet?',
        answers: [
            {id: 0, text: 'John Donne', correct: false},
            {id: 1, text: 'Shakespeare', correct: true},
            {id: 2, text: 'Thomas Middleton', correct: false},
            {id: 3, text: 'John Webster', correct: false}
        ],
        correct: [1]
    },
    {
        
        question: ' Which country is famous for tulips?',
        answers: [
            {id: 0, text: 'Holland', correct: true},
            {id: 1, text: 'Poland', correct: false},
            {id: 2, text: 'Germany', correct: false},
            {id: 3, text: 'Spain', correct: false},
        ],
        correct: [0]
    },
    {
        question: 'Which is the longest river in South Africa?',
        answers: [
            {id: 0, text: 'Kasai River', correct: false},
            {id: 1, text: 'Niger River', correct: false},
            {id: 2, text: 'Orange River', correct: true},
            {id: 3, text: 'Nile', correct: false}
        ],
        correct: [2]
    },
    {
        question: 'In which year did the Beatles Band begin?',
        answers: [
            {id: 0, text: '1956', correct: true},
            {id: 1, text: '1957', correct: false},
            {id: 2, text: '1958', correct: false},
            {id: 3, text: '1955', correct: false},
        ],
        correct: [0]
    },
    {
        question: ' How many bones are there in the human body?',
        answers: [
            {id: 0, text: '206', correct: true},
            {id: 1, text: '205', correct: false},
            {id: 2, text: '208', correct: false},
            {id: 3, text: '204', correct: false}
        ],
        correct: [0]
    },
    {
        question: 'Which vitamin is present in citrus fruits?',
        answers: [
            {id: 0, text: 'vitamin C', correct: true},
            {id: 1, text: 'vitamin B', correct: false},
            {id: 2, text: 'vitamin D', correct: false},
            {id: 3, text: 'vitamin A', correct: false},
        ],
        correct: [0]
    },{
        question: 'Select Scandinavian countries:',
        answers: [
            {id: 0, text: 'Norway', correct: true},
            {id: 1, text: 'Sweden', correct: true},
            {id: 2, text: 'Denmark', correct: true},
            {id: 3, text: 'Germany', correct: false},
        ],
        correct: [0,1,2]
    }
]

let index;
let countCorrectAnswers;

startButton.addEventListener('click', startQuiz);


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



function startQuiz(e) {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    header.firstElementChild.classList.add('hide');
    questions = shuffleArray(questions); 
    index = 0;
    countCorrectAnswers = 0;
    setUpQuestion();
}

function setUpQuestion() {
    resetState();
    showQuestion();
}

nextButton.addEventListener('click', () => {
    index++;
    setUpQuestion();
})

function resetState(){
    nextButton.classList.add('hide');
    while (answersContainer.firstChild) {
       answersContainer.removeChild(answersContainer.firstChild);
    }  
}

function showQuestion() {
    questionText.innerHTML = questions[index].question;
    questions[index].answers.forEach(answer => {
        //console.log('test')

        //it used to be just buttons but I wanted to solve the problem where I have to select
        //multiple correct answers (so I thought of checkbox) and at the end I just complicated unnecessarily ...
        let article = document.createElement('article');
        article.classList.add('btn');
        let input = document.createElement('input');
        input.setAttribute('type','checkbox');
        let div = document.createElement('div');
        let span = document.createElement('span');
        span.innerHTML = answer.text
        div.appendChild(span);
        article.appendChild(input);
        article.appendChild(div);
        answersContainer.appendChild(article);

        if (answer.correct) input.dataset.correct = answer.correct;
        //let counter = questions[index].correct.length;
        //while (counter != 0)
        input.addEventListener('click', checkAnswer);
        input.myParam = questions[index];
    })  
}

function checkAnswer(e) {
    console.log(e.target.myParam)// 'button' meaning input checkbox
    let temp = e.target.myParam.correct.length;
    //if the question has more correct answers
    if (temp > 1){
        console.log('idk')
    }
    const selectedButton = e.target;
    selectedButton.checked = true
    const correct = selectedButton.dataset.correct;
    console.log(correct)
    if (correct) countCorrectAnswers++;
    Array.from(answersContainer.children).forEach(article => {
       setStatusClass(article, article.firstElementChild.dataset.correct);
    })

    if (11 > index + 1) {
        if (!correct){
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
            header.firstElementChild.classList.remove('hide');
            if (countCorrectAnswers == 1) {
                header.firstElementChild.innerText = 'You have answered '+countCorrectAnswers+ ' question correctly. If you want to try again click Restart!';
            } else if (countCorrectAnswers == 0) {
                header.firstElementChild.innerText = 'Oops! If you want to try again click Restart!';
            }
            else header.firstElementChild.innerText = 'You have answered '+countCorrectAnswers+ ' questions correctly. If you want to try again click Restart!';
        } else {
            nextButton.classList.remove('hide');
        }
        
    } else {
        //if there are no more questions
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        header.firstElementChild.classList.remove('hide');
        if (countCorrectAnswers==11) {
            header.firstElementChild.innerText = 'Congrats! You have successfully answered all questions! ';
        }else if (countCorrectAnswers == 0) {
            header.firstElementChild.innerText = 'Oops! If you want to try again click Restart!';
        }
         else {
            header.firstElementChild.innerText = 'You have answered '+countCorrectAnswers+ ' questions correctly';
        }
            
    }    

}
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
