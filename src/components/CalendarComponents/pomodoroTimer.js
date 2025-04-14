var defaultStudyTimer=30*60; //30 minuti in secondi
var defaultBreakTimer=5*60; //5 minuti in secondi

var timeLeft=defaultStudyTimer;
var timer;
var isRunning=false;//work or break
var cycleCount=0;
var isWorkSession = true;//work

export function setTimer(){
    let prodTime=document.getElementById("input-prod").value;
    let breakTime=document.getElementById("input-break").value;

    defaultStudyTimer=prodTime*60;
    defaultBreakTimer=breakTime*60;

    timeLeft = defaultStudyTimer;
    setTimerDisplay();

    let timeForEachElement= (timeLeft-1.5)/3;

    document.getElementById("gambo").style.animationDuration=`${timeForEachElement}s`;

    let foglie=document.getElementsByClassName("foglia");
    for(let i=0; i<foglie.length;i++){
        foglie[i].style.animationDuration=`${timeForEachElement}s`;
        foglie[i].style.animationDelay=`${timeForEachElement}s`;
    }

    document.getElementById("pomo1").style.animationDuration=`${timeForEachElement}s`;
    document.getElementById("pomo1").style.animationDelay=`${timeForEachElement*2}s`;

    document.getElementById("pomo2").style.animationDuration=`${timeForEachElement}s`;
    document.getElementById("pomo2").style.animationDelay=`${timeForEachElement*2}s`;

    document.getElementById("pomo3").style.animationDuration=`${timeForEachElement}s`;
    document.getElementById("pomo3").style.animationDelay=`${timeForEachElement*2}s`;

    document.getElementById("bigPomo").style.animationDelay=`${timeForEachElement*3}s`
    document.getElementById("fogliaBigPomo").style.animationDelay=`${timeForEachElement*3+1}s`
}

export function startTimer() {
    if(isRunning) return ;

    isRunning=true;
    document.getElementById("studyAnimationElement").classList.add('animation');

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
    document.getElementById("studyAnimationElement").classList.remove('animation');
}

export function resetTimer(){
    isRunning=false;
    clearInterval(timer);
    timeLeft=defaultStudyTimer;
    cycleCount=0;
    isWorkSession = true;
    setTimerDisplay();
    document.getElementById("studyAnimationElement").classList.remove('animation');
}