let questionSet=JSON.parse(data);
let isAnswered=false;
let noOfAnsweredQus=0;
let currentQuestionIndex=0;
let score=0;

let timeFunction=function(){
    document.getElementById('timer').style.display="unset";
    let minute=0;
    let sec=60;
    let startTimer=setInterval(function() {
            document.getElementById("timer").innerHTML = minute + " : " + sec;
            sec--;
            if (minute == 0 && sec==0) {
                document.getElementById("timer").innerHTML = minute + " : " + sec;
                stopTimer();
            }
            if (sec == 00 && minute!=0) {
              minute --;
              sec = 60;  
            }
          }, 1000);
      let stopTimer=function(){
        showResult();
        clearInterval(startTimer);
    }
}

let showResult=function(){
    for(let i=0;i<questionSet.length;i++){
        if(questionSet[i].isAnsweredRight){
         score++;
        }
    } 
    document.getElementById('main-container').style.display="none";
    document.getElementById('score-text').innerHTML="Your score is "+score;
    document.getElementById("score-card").style.display="unset";
    score=0;
 }

let getUserAnswer=function(){
    let qusOptions=document.getElementsByName('qus-option');
    for(let i=0;i<qusOptions.length;i++){
        if(qusOptions[i].checked){
            isAnswered=true;
            return qusOptions[i].value;
        }
    }
    return "";
}

let displayButtons=function(questionIndex){
    if(questionIndex>0){
        document.getElementById("prev-btn").style.display="unset";
    }else{
        document.getElementById("prev-btn").style.display="none"; 
    }
    if(questionIndex===questionSet.length-1){
        document.getElementById("next-btn").style.display="none";
        document.getElementById("submit-btn").style.display="unset";
    }else{
        document.getElementById("next-btn").style.display="unset";
        document.getElementById("submit-btn").style.display="none";
    } 
}

let displayQuestion =function(questionIndex){
        if(questionIndex<questionSet.length && questionIndex>=0){
            document.getElementById("question").innerHTML=questionSet[questionIndex].question;
            let options=questionSet[questionIndex].options;
            if(questionSet[questionIndex].userAnswer!=""){
                document.getElementById('option-'+questionSet[questionIndex].userAnswer).checked=true;
            }else{
                for(let option in options ){
                    document.getElementById('option-'+option).checked=false;
                }
            }
            for(let option in options ){
                document.getElementById(option).innerHTML=options[option];
            }
        }
        displayButtons(questionIndex);       
}

let buttonEventLisners=function(currentQuestionIndex){
    document.getElementById("next-btn").addEventListener("click",function(){
        let answer=questionSet[currentQuestionIndex].answer;
        let answerByUser=getUserAnswer();
        questionSet[currentQuestionIndex].userAnswer=getUserAnswer();
        console.log(questionSet[currentQuestionIndex].userAnswer);
        if(answerByUser){
            noOfAnsweredQus++;
        }
        if(answerByUser===answer){
            questionSet[currentQuestionIndex].isAnsweredRight=true;
        }else{
            questionSet[currentQuestionIndex].isAnsweredRight=false;
        }
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    });

    document.getElementById("prev-btn").addEventListener("click",function(){
        noOfAnsweredQus--;
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    });

    document.getElementById("submit-btn").addEventListener("click",function(){
        let answer=questionSet[currentQuestionIndex].answer;
        let answerByUser=getUserAnswer();
        if(answerByUser){
            noOfAnsweredQus++;
        }
        if(answerByUser===answer){
            questionSet[currentQuestionIndex].isAnsweredRight=true;
        }else{
            questionSet[currentQuestionIndex].isAnsweredRight=false;
        }
        showResult();
    },{once : true});

    document.getElementById("quit-btn").addEventListener("click",function(){
        let answer=questionSet[currentQuestionIndex].answer;
        let answerByUser=getUserAnswer();
        if(answerByUser){
            noOfAnsweredQus++;
        }
        if(answerByUser===answer){
            questionSet[currentQuestionIndex].isAnsweredRight=true;
        }else{
            questionSet[currentQuestionIndex].isAnsweredRight=false;
        }
        showResult();
    },{once : true});
}

let startQuiz=function(){
    timeFunction();
    document.getElementById('welcome-screen').style.display="none";
    document.getElementById('score-card').style.display="none";
    document.getElementById('main-container').style.display="unset";
    displayQuestion(currentQuestionIndex);
    buttonEventLisners(currentQuestionIndex); 
}





