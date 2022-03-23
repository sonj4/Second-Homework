const start = document.getElementById("start");
const reset = document.getElementById("reset");
const stop = document.getElementById("stop");

const wm = document.getElementById("w-minutes");
const ws = document.getElementById("w-seconds");

let startTimer;

start.addEventListener("click", function()
{
    if(startTimer === undefined)
        {
            startTimer=setInterval(timer,1000);
        }
        else
        {
            alert('Timer is alredy running');
        }
})

reset.addEventListener("click", function()
{
    window.location.reload();
})

stop.addEventListener("click", function () 
{
    clearInterval(startTimer);
    startTimer=undefined;
})
function timer ()
{
    if (ws.innerText!=0)
    {
        ws.innerText--;
    }
    else if (wm.innerText != 0 && ws.innerText == 0 )
    {
        ws.innerText = 59;
        wm.innerText--;
    }
}

if (wm.innerText == 0 && ws.innerText == 0 )
{
    wm.innerText = 25;
    ws.innerText = "00";
}