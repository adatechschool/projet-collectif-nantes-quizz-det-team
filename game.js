import {quiz_nourriture_francaise} from "./questions.js"; 
import {quiz_french_food} from "./questionsEN.js";

//--------------------Section DOM--------------------
const bienvenueImage = document.querySelector("#image-bienvenue") //Image de bienvenue
const bienvenueMessage = document.querySelector(".paragraphe-bienvenue") //Message de bienvenue
const questionBox = document.querySelector(".question") //Intitulé de la question
const answersBox = document.querySelector('.options') //Section des réponses
const nextButton = document.querySelector("#next-button") //Bouton suivant
const replayButton = document.querySelector("#replay-button") //Bouton rejouer
const timerElement = document.getElementById("timer") // Sélectionne l'élément HTML où le temps sera affiché
const questionImage = document.querySelector("#question-image") //Image de la question
const progressBar = document.querySelector("progress") //Barre de progression
const menu = document.querySelector(".menu") //Section choix du theme
const welcomeParagraphe = document.querySelector(".paragraphe-bienvenue")
const pageTitle = document.querySelector("h1")
const traduireEnFrançais = document.querySelector("#traduire-en-français")
const tranduireEnEnglish = document.querySelector("#traduire-en-anglais")
//----------------------------------------------------

let quizVersion = quiz_nourriture_francaise


let currentQuestionIndex; //index de la question actuelle
let currentQuiz; //array : le quiz actuel

let reponseDuJoueur = "le joueur n'a pas joué" // le joueur n'as pas choisi de réponse
let score = 0 //le score
let interval; //le timer
let tempsRestant;//Temps initial en secondes

questionBox.style.display = "none"
answersBox.style.display = "none"
nextButton.style.display = "none"
questionImage.style.display = "none" 
replayButton.style.display = "none"
timerElement.style.display = "none"
progressBar.style.display = "none"


traduireEnFrançais.textContent="français"//affiché la page en français
tranduireEnEnglish.textContent="english" //affiché la page en english
function decrementerTemps() {
  tempsRestant-- // On décrémente le temps restant -1 à chaque segonde
  timerElement.textContent = tempsRestant// On affiche le temps restant à l'écran page web
//si le temps restant est = à 0 
  if (tempsRestant <= 0) {
    clearInterval(interval)//annule l'action répétitive temporisée
    //on affiche dans la console Le compte à rebours est terminé
    alert("le temps est terminé ");
    reponseDuJoueur = "le temps est terminé" 
  }
}

function loadQuiz(quizName){ //charge un quiz choisit
    //remet des valeurs à 0 pour bien commencer le quiz
    currentQuestionIndex = 0
    score = 0
    progressBar.value = 0
    //affiche le squelette du quizz

    bienvenueImage.style.display = "none"
    bienvenueMessage.style.display = "none"
    questionBox.style.display = "block"
    answersBox.style.display = "inline-block"
    nextButton.style.display = "inline-block"
    questionImage.style.display = "inline-block" 
    replayButton.style.display = "none"
    timerElement.style.display = "block"
    progressBar.style.display = "block"
    //selectionne le quiz choisit
    currentQuiz = quizVersion[quizName]
    // if(quizName=="Alsace"){
    //     currentQuiz = quiz_nourriture_francaise.Alsace
    // }
    // else if(quizName=="Global"){
    //     currentQuiz = quiz_nourriture_francaise.Global
    // }
    // else{
    //     currentQuiz = quiz_nourriture_francaise.Sucre
    // }
    progressBar.max = currentQuiz.length
    loadQuestion() //charge la question
}

function loadQuestion() { //charge une question
    //remet des valeurs à 0 pour bien executer la question
    answersBox.innerHTML = ''
    reponseDuJoueur = "le joueur n'a pas joué"
    tempsRestant = 15 // initiale de timer à 30
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
            clearInterval(interval)
            if(reponseDuJoueur=="le joueur n'a pas joué"){
                reponseDuJoueur = option
                if(checkAnswer()){
                    button.style.backgroundColor = 'green'
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
    if(reponseDuJoueur!="le joueur n'a pas joué"){
        currentQuestionIndex ++ 
        progressBar.value += 1
        if(currentQuestionIndex<currentQuiz.length){
            loadQuestion()
            
        }
        else{
            
            if(score==5){
                questionBox.innerText = translation[myLanguage].result_excellent + score + "/5"
            }
            else if(score<=2){
                questionBox.innerText = translation[myLanguage].result_bad + score + "/5"
            }
            else{
                questionBox.innerText = translation[myLanguage].result_mid + score + "/5"
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
    timerElement.style.display = "inline-block"


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
    for (const [nomDuTheme, value] of Object.entries(quizVersion)) {   
        const menuButton = document.createElement('button')
        menuButton.innerText = nomDuTheme
        menuButton.value = nomDuTheme
        menuButton.classList.add('menuButton')
        menuButton.addEventListener("click", ()=>{
            loadQuiz(menuButton.value)
        })
        menu.appendChild(menuButton)
    }
}

//--------------------Traduction--------------------
const translation = {
    fr:{
        next_button:"Suivant",
        replay_button:"Rejouer",
        welcome_paragraphe:"Bienvenue sur notre quizz sur la nourriture française.<br/> Vous trouverez ci-dessous une liste de thème divers pour tester vos connaissances en gastronomie francaise. <br/>Régalez vous !",
        page_title:"QUIZZ SUR LA NOURRITURE FRANCAISE",
        result_excellent:"Bravo, tu connais la culture française. ",
        result_bad:"Tu as quelques lacunes en culture française mais continue tes efforts. ",
        result_mid:"Bravo, tu as un score de ",
    },
    en:{
        next_button:"Next",
        replay_button:"Replay",
        welcome_paragraphe:"Welcome to our French food quiz.<br/> Below you will find a list of various themes to test your knowledge of French gastronomy. <br/>Enjoy!",
        page_title:"QUIZZ ON FRENCH FOOD",
        result_excellent:"Well done, you know French culture. ",
        result_bad:"You have some gaps in French culture but continue your efforts. ",
        result_mid:"Well done, you have a score of ",
    }
}

function translate(language){
    nextButton.innerText = translation[language].next_button
    replayButton.innerText = translation[language].replay_button
    welcomeParagraphe.innerHTML = translation[language].welcome_paragraphe
    pageTitle.innerText =  translation[language].page_title
}
let myLanguage = "fr"
initMenu()

traduireEnFrançais.addEventListener('click',()=>{
    myLanguage = "fr"
    translate(myLanguage)
    quizVersion = quiz_nourriture_francaise
    // loadQuiz()
})

tranduireEnEnglish.addEventListener('click',()=>{
    myLanguage = "en"
    translate(myLanguage)
    quizVersion = quiz_french_food
    // loadQuiz()
})