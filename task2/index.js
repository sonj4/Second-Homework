// X   <i class="fas fa-times"></i>
// Y   <i class="fas fa-circle-notch"></i>

const start = document.querySelector('#start');
const choose = document.querySelectorAll('.choose');

const main = document.querySelector ('#main');
const showChange = document.querySelector ("#showChange");
const boxes = document.querySelectorAll('.boxes')

const winner = document.querySelector('#winner');
const winnerName = document.querySelector('#winnerName');
const quit = document.querySelector('#quit');



let changeTurn; 

choose.forEach(chooseNow =>
    {
        chooseNow.addEventListener('click', () =>
    {
        if (chooseNow.id === 'playerX')
        {
            changeTurn=false;
             // console.log(changeTurn);
             showChange.style.left = '0px';

        }
        else
        {
            changeTurn=true;
            //console.log(changeTurn);
            showChange.style.left = '160px';
        }
        start.style.display="none";
        main.style.display="block";
    })
    });
    boxes.forEach (items =>
        {
            items.addEventListener('click', ()=>
            {
                if(changeTurn == false)
                {
                    items.innerHTML =  '<i> X </i>';
                    items.id = "X";
                    items.style.pointerEvents = "none";
                    showChange.style.left='160px';
                    changeTurn= true;
                }
                else
                {
                    items.innerHTML='<i>O</i>';
                    items.id="O";
                    items.style.pointerEvents="none";
                    showChange.style.left='0px';
                    changeTurn= false;
                }
                winningFunc();
                draw();
            })
        })
        const winningCombinations= [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [2,4,6]
        ];

        const winningFunc = () =>
        {
            for (let a=0; a<=7; a++)
            {
                let b=winningCombinations[a];

                if(boxes[b[0]].id == "" || boxes[b[1]].id == "" || boxes[b[2]].id == "" )
                {
                    continue;
                }
                else if(boxes[b[0]].id == "X" && boxes[b[1]].id == "X" && boxes[b[2]].id == "X" )
                {
                  //  console.log("X is the winner!")
                  winnerName.innerText = 'Player X win the game!' ;
                  main.style.display="none";
                  winner.style.display="block";
                  quit.addEventListener('click',funkClick);
                }
                else if(boxes[b[0]].id == "O" && boxes[b[1]].id == "O" && boxes[b[2]].id == "O" )
                {
                    // console.log("O is the winner!")
                    winnerName.innerText="Player O win the game!";
                    main.style.display="none";
                    winner.style.display="block";
                }
                else
                {
                    continue;
                }
    

            }
        }
        const draw = () =>
        {
                   if (  boxes[0].id != "" && boxes[1].id != "" && boxes[2].id != "" && 
                         boxes[3].id != "" && boxes[4].id != "" && boxes[5].id != "" &&
                         boxes[6].id != "" && boxes[7].id != "" && boxes[8].id != "")
                         {
                            winnerName.innerText='Match Draw';
                            main.style.display="none";
                            winner.style.display="block";
                         }
        }
        quit.addEventListener('click', () =>
        {
            window.location.reload();
        })
       


