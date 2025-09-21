var defaultStudyTimer=30*60; //30 minuti in secondi
var defaultBreakTimer=5*60; //5 minuti in secondi
var defaultLongBreak=15*60; //15 minuti in secondi 
var defaultMaxCycles;

var timeLeft=defaultStudyTimer;
var timer;
var isRunning=false;//work or break
var cycleCount=0;
var isWorkSession = true;//work

var totProductionTime=0;

export function setTimer(){
    let prodTime=parseFloat(document.getElementById("input-prod").value)*60 || defaultStudyTimer;
    let breakTime=parseFloat(document.getElementById("input-break").value)*60 || defaultBreakTimer;
    let longBreakTime=parseFloat(document.getElementById("input-long-break").value)*60 || defaultLongBreak;
    defaultMaxCycles=parseInt(document.getElementById("input-cycles").value) || 4;

    defaultStudyTimer=prodTime;
    defaultBreakTimer=breakTime;
    defaultLongBreak=longBreakTime;

    timeLeft = defaultStudyTimer;
    setTimerDisplay();

    let timeForEachElement= (defaultStudyTimer-1.5)/3;

    document.getElementById("gambo").style.animationDuration=`${timeForEachElement}s`;

    let foglie=document.getElementsByClassName("foglia");
    for(let i=0; i<foglie.length;i++){
        foglie[i].style.animationDuration=`${timeForEachElement}s`;
        foglie[i].style.animationDelay=`${timeForEachElement}s`;
    }

    ["pomo1", "pomo2", "pomo3"].forEach(id => {
        const el = document.getElementById(id);
        el.style.animationDuration = `${timeForEachElement}s`;
        el.style.animationDelay = `${timeForEachElement * 2}s`;
    });
    
    document.getElementById("bigPomo").style.animationDelay=`${timeForEachElement*3}s`
    document.getElementById("fogliaBigPomo").style.animationDelay=`${timeForEachElement*3+1}s`
}

export function startTimer() {
    if(isRunning) return ;

    isRunning=true;
    document.getElementById("studyAnimationElement").classList.add('animation');
    document.getElementById("breakAnimationElement").classList.remove('animationBreak');
    document.getElementById("prod-break").innerHTML="working period"
    document.getElementById("startBtn").disabled = true;
    document.getElementById("startBtn").style.opacity="0.5";

    //setInterval(function, 1000) call function every 1000 milliseconds
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;

            if(isWorkSession){
                totProductionTime++;
            }
            
            setTimerDisplay()
        } else {
            //clearInterval(timer);//stops the execution
            if(isWorkSession){
                cycleCount++;
                document.getElementById("cycle-count").innerHTML=`${cycleCount} cycles`
                
                if(cycleCount===defaultMaxCycles) {
                    resetTimer();
                    document.getElementById("general-title").innerHTML="You did it!";
                    return;
                } 
            }

            if (cycleCount % 4 === 0){
                timeLeft = defaultLongBreak; // 15 minutes long break
                setTimerDisplay();
                document.getElementById("prod-break").innerHTML="long break period";
                document.getElementById("general-title").innerHTML="You're doing great! Let's take a long break";
                setBreakAnimation();

            }
            else {
                timeLeft = isWorkSession ? defaultBreakTimer : defaultStudyTimer; // Switch between work and break
                setTimerDisplay();

                if (!isWorkSession) {
                    document.getElementById("general-title").innerHTML="Time to work!";
                } else {
                    document.getElementById("general-title").innerHTML="Take a break!";
                }

            }

            isWorkSession = !isWorkSession; // Toggle between work and break
            if(isWorkSession){
                document.getElementById("prod-break").innerHTML="working period"
                setWorkAnimation();
            } else {
                document.getElementById("prod-break").innerHTML="break period"
                setBreakAnimation();
            }
        }
    }, 1000);
}

function setBreakAnimation(){
    document.getElementById("breakAnimationElement").classList.add('animationBreak');
    document.getElementById("breakAnimationElement").classList.remove('d-none');
    document.getElementById("studyAnimationElement").classList.add('d-none');
}

function setWorkAnimation(){
    document.getElementById("studyAnimationElement").classList.add('animation');
    document.getElementById("studyAnimationElement").classList.remove('d-none');
    document.getElementById("breakAnimationElement").classList.add('d-none');
}

function setTimerDisplay(){
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timerDisplay").innerHTML=`${minutes}:${seconds<10 ? '0' : ''}${seconds}`
}

export function stopTimer(saveSession){
    saveSession(totProductionTime, cycleCount);
    isRunning=false;
    clearInterval(timer);
    if(isWorkSession) document.getElementById("studyAnimationElement").classList.remove('animation');
    else document.getElementById("breakAnimationElement").classList.remove('animationBreak');
    document.getElementById("startBtn").disabled = false;
    document.getElementById("startBtn").style.opacity="1";
    totProductionTime=0;
}

export function resetTimer(saveSession=()=>{}){
    if(totProductionTime>0 || cycleCount>0){
        saveSession(totProductionTime, cycleCount);
    }
    isRunning=false;
    clearInterval(timer);
    timeLeft=defaultStudyTimer;
    cycleCount=0;
    if(isWorkSession) document.getElementById("studyAnimationElement").classList.remove('animation');
    else document.getElementById("breakAnimationElement").classList.remove('animationBreak');
    document.getElementById("cycle-count").innerHTML=`${cycleCount} cycles`
    document.getElementById("prod-break").innerHTML="start session"
    isWorkSession = true;
    setTimerDisplay();
    document.getElementById("startBtn").disabled = false;
    document.getElementById("startBtn").style.opacity="1";
    totProductionTime=0;
}