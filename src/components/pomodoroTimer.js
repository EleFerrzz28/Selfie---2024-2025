var defaultStudyTimer=30*60; //30 minuti in secondi
var defaultBreakTimer=5*60; //5 minuti in secondi

var timer;
var isRunning=false;//work or break
var timeLeft=defaultStudyTimer;
var cycleCount=0;
var isWorkSession = true;//work

export function startTimer() {
    if(isRunning) return ;

    isRunning=true;

    //setInterval(function, 1000) call function every 1000 milliseconds
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            setTimerDisplay()
        } else {
            isRunning=false;
            clearInterval(timer);//stops the execution
            cycleCount++;

            if (cycleCount % 4 === 0) {
                alert("Pausa lunga di 15 minuti!");
                timeLeft = 15 * 60; // 15 minutes long break
            } else {
                alert(isWorkSession ? "Tempo di lavoro finito! Pausa!" : "Tempo di pausa finito! Inizia a lavorare!");
                timeLeft = isWorkSession ? defaultBreakTimer : defaultStudyTimer; // Switch between work and break
            }

            isWorkSession = !isWorkSession; // Toggle between work and break
        }
    }, 1000);
}

function setTimerDisplay(){
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timerDisplay").innerHTML=`${minutes}:${seconds<10 ? '0' : ''}${seconds}`
}

export function stopTimer(){
    isRunning=false;
    clearInterval(timer);
}

export function resetTimer(){
    isRunning=false;
    clearInterval(timer);
    timeLeft=defaultStudyTimer;
    cycleCount=0;
    isWorkSession = true;
    setTimerDisplay();
}