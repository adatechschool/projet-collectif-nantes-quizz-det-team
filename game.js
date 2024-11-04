import {quiz_nourriture_francaise} from "./questions.js"; 

//--------------------Section DOM------------------------
const questionBox = document.querySelector(".question") //Intitulé ed la question
const answersBox = document.querySelector('.options') //Section des réponses
const nextButton = document.querySelector("#next-button") //Bouton suivant
const replayButton = document.querySelector("#replay-button") //Bouton rejouer
const timerElement = document.getElementById("timer") // Sélectionne l'élément HTML où le temps sera affiché
const questionImage = document.querySelector("#question-image") //Image de la question
const progressBar = document.querySelector("progress") //Barre de progression
const menu = document.querySelector(".menu") //Section choix du theme
//-------------------------------------------------------

let currentQuestionIndex; //index de la question actuelle
let currentQuiz; //array : le quiz actuel

let reponseDuJoueur = 0 //0 = le joueur n'as pas choisi de réponse
let score = 0 //le score
let interval; //le timer
let tempsRestant;//Temps initial en secondes

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

function loadQuiz(quizName){ //charge un quiz choisit
    //remet des valeurs à 0 pour bien commencer le quiz
    currentQuestionIndex = 0
    score = 0
    progressBar.value = 0
    //affiche ce qu'il faut afficher
    answersBox.style.display = "inline-block"
    nextButton.style.display = "inline-block"
    questionImage.style.display = "inline-block" 
    replayButton.style.display = "none"
    timerElement.style.display = "block"
    //selectionne le quiz choisit
    if(quizName=="Alsace"){
        currentQuiz = quiz_nourriture_francaise.Alsace
    }
    else if(quizName=="DET"){
        currentQuiz = quiz_nourriture_francaise.DET
    }
    else{
        currentQuiz = quiz_nourriture_francaise.Sucre
    }
    loadQuestion() //charge la question
}

function loadQuestion() { //charge une question
    //remet des valeurs à 0 pour bien executer la question
    answersBox.innerHTML = ''
    reponseDuJoueur = 0
    tempsRestant = 30 // initiale de timer à 30
    timerElement.textContent = tempsRestant
    clearInterval(interval)
    // Appel de la fonction toutes les secondes pour mettre à jour le compte à rebours
    interval = setInterval (decrementerTemps, 1000)

    const currentQuestion = currentQuiz[currentQuestionIndex] //selectionne la question

    questionImage.src = `./images/${currentQuestion.image}`// ajout de la photo

    questionBox.innerText = currentQuestion.text //affiche l'intitulé de la question

    //creer des boutons avec les réponses à l'intérieur
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button') //le bouton
        button.innerText = option //le texte de la réponse à l'intérieur du bouton
        button.classList.add('answer') //ajoute une classe
        button.addEventListener('click',()=>{ //permet de cliquer sur chaque bouton
            //change la couleur du bouton en fonction de la réponse
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
        answersBox.appendChild(button) //ajoute le bouton dans la section dédié
        
    })
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
            replayButton.style.display = "inline-block"
            timerElement.style.display = "none"
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
    replayButton.style.display = "none"
    timerElement.style.display = "block"


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