import {quiz_nourriture_francaise} from "./questions.js"; 

const questionBox = document.querySelector(".question")
const answersBox = document.querySelector('.options')
const nextButton = document.querySelector("#next-button")
const replayButton = document.querySelector("#replay-button")
const timerElement = document.getElementById("timer")// Sélectionne l'élément HTML où le temps sera affiché
const questionImage = document.querySelector("#question-image")
const progressBar = document.querySelector("progress")
const menu = document.querySelector(".menu")


let currentQuestionIndex = 0
let currentQuiz;

let reponseDuJoueur = 0
let score = 0
let tempsRestant = 31;//Temps initial en secondes
//const timerElement = document.getElementById("timer");// Sélectionne l'élément HTML où le temps sera affiché

function decrementerTemps() {
  tempsRestant-- // On décrémente le temps restant -1 à chaque segonde
  timerElement.textContent = tempsRestant// On affiche le temps restant à l'écran page web
//si le temps restant est = à 0 
  if (tempsRestant === 0) {
    clearInterval(interval)//annule l'action répétitive temporisée
    //on affiche dans la console Le compte à rebours est terminé
    console.log("Le compte à rebours est terminé !") 
  }
}

function loadQuiz(quizName){
    currentQuestionIndex = 0
    score = 0
    progressBar.value = 0
    answersBox.style.display = "inline-block"
    nextButton.style.display = "inline-block"
    replayButton.style.display = "none"
    if(quizName=="Alsace"){
        currentQuiz = quiz_nourriture_francaise.Alsace
    }
    else if(quizName=="DET"){
        currentQuiz = quiz_nourriture_francaise.DET
    }
    else{
        currentQuiz = quiz_nourriture_francaise.Sucre
    }
    loadQuestion()
}
// Appel de la fonction toutes les secondes pour mettre à jour le compte à rebours
//const interval = setInterval(decrementerTemps,1000)
function loadQuestion() {
    answersBox.innerHTML = ''
    reponseDuJoueur = 0
    tempsRestant = 31; // initiale de timer à 30
    
    const currentQuestion = currentQuiz[currentQuestionIndex]

    questionImage.src = `./images/${currentQuestion.image}`// ajout de la photo
  
    questionBox.innerText = currentQuestion.text
  
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button')
        button.innerText = option
        button.classList.add('answer')
        button.addEventListener('click',()=>{
            if(reponseDuJoueur==0){
                reponseDuJoueur = option
                if(checkAnswer()){
                    button.style.borderColor = 'green'
                }
                else{
                    button.style.borderColor = 'red'
                }
            }
        })
        answersBox.appendChild(button)
        
    })
  const interval = setInterval (decrementerTemps, 1000)
}


nextButton.addEventListener('click', ()=>{
    if(reponseDuJoueur!=0){
        currentQuestionIndex ++ 
        progressBar.value += 1
        if(currentQuestionIndex<currentQuiz.length){
            loadQuestion()
            
        }
        else{
            
            if(score==5){
                questionBox.innerText = "Bravo, tu connais la culture française. " + score + "/5"
            }
            else if(score<=2){
                questionBox.innerText = "Tu as quelques lacunes en culture française mais continue tes efforts. " + score + "/5"
            }
            else{
                questionBox.innerText = "Bravo, tu as un score de " + score + "/5"
            }
            answersBox.style.display = "none"
            nextButton.style.display = "none"
            questionImage.style.display = "none"
            questionImage.style.display = "none"
            replayButton.style.display = "inline-block"
        }
 
    }
    
})

replayButton.addEventListener('click', () =>{
    currentQuestionIndex = 0
    score = 0
    progressBar.value = 0
    answersBox.style.display = "inline-block"
    nextButton.style.display = "inline-block"
    questionImage.style.display = "inline-block"
    questionImage.style.display = "inline-block"
    replayButton.style.display = "none"
    

    loadQuestion()
})

function checkAnswer(){
    if(currentQuiz[currentQuestionIndex].correct_answer==reponseDuJoueur){
        console.log("bonne réponse")
        score +=1
        return true
    }
    else{
        console.log("mauvaise réponse")
        return false
    }
}

function initMenu(){
    for (const [key, value] of Object.entries(quiz_nourriture_francaise)) {   
        const menuButton = document.createElement('button')
        menuButton.innerText = key
        menuButton.value = key
        menuButton.classList.add('menuButton')
        menuButton.addEventListener("click", ()=>{
            loadQuiz(menuButton.value)
        })
        menu.appendChild(menuButton)
    }
}

loadQuiz("DET")
initMenu()