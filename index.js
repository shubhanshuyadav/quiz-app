let questionSet=JSON.parse(data);

let currentQuestionIndex=0;
let score=0;

let startTimer=function(){
    let minute=2;
    let sec=60;
    setInterval(function() {
        document.getElementById("timer").innerHTML = minute + " : " + sec;
        sec--;
        if (sec == 00) {
          minute --;
          sec = 60;
          if (minute == 0) {
            showResult();
          }
        }
      }, 1000);
}

let displayQuestion =function(questionIndex){
        if(questionIndex<questionSet.length && questionIndex>=0){
            document.getElementById("question").innerHTML=questionSet[questionIndex].question;
            let options=questionSet[questionIndex].options
            let answer=questionSet[questionIndex].answer;
            for(let option in options ){
            document.getElementById(option).innerHTML=options[option];
                 }
        }
        if(questionIndex>0){
            document.getElementById("prev-btn").style.display="unset";
        }else{
            document.getElementById("prev-btn").style.display="none"; 
        }
        if(questionIndex===questionSet.length-1){
            document.getElementById("next-btn").style.display="none";
        }else{
            document.getElementById("next-btn").style.display="unset";
        }
}


let getUserAnswer=function(){
    let qusOptions=document.getElementsByName('qus-option');
    for(let i=0;i<qusOptions.length;i++){
        if(qusOptions[i].checked){
            return qusOptions[i].value;
        }
    }
}

let setScore=function(){

}

let showResult=function(){
    
}


let startQuiz=function(){
    document.getElementById('welcome-screen').style.display="none";
    document.getElementById('main-container').style.display="unset";
    displayQuestion(currentQuestionIndex);
    document.getElementById("next-btn").addEventListener("click",function(){
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    });

    document.getElementById("prev-btn").addEventListener("click",function(){
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    });
}





