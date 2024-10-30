import {quiz_nourriture_francaise} from "./questions.js"; 

const questionBox = document.querySelector(".question")
const answersBox = document.querySelector('.options')
const nextButton = document.querySelector("#next-button")
const replayButton = document.querySelector("#replay-button")
const questionImage = document.querySelector("#question-image")

let currentQuestionIndex = 0

let reponseDuJoueur = 0
let score = 0

function loadQuestion() {
    answersBox.innerHTML = ''
    reponseDuJoueur = 0
    
    const currentQuestion = quiz_nourriture_francaise.questions[currentQuestionIndex]
  
    questionImage.src = `./images/${currentQuestion.image}`// ajout de la photo
  
    questionBox.innerText = currentQuestion.text
     //currentQuestion crée 4 bouttons
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button')
        button.innerText = option
        button.classList.add('answer')
        button.addEventListener('click',()=>{
            // si le reponse du joueur=0
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
        //// Ajouter le bouton à la boîte de réponses
        answersBox.appendChild(button)
    })
  }

nextButton.addEventListener('click', ()=>{
    if(reponseDuJoueur!=0){
        currentQuestionIndex ++ 
        if(currentQuestionIndex<quiz_nourriture_francaise.questions.length){
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
        }
    }
})


replayButton.addEventListener('click', () =>{
    currentQuestionIndex = 0
    score = 0
    answersBox.style.display = "inline-block"
    nextButton.style.display = "inline-block"
    questionImage.style.display = "inline-block"
    replayButton.style.display = "none"
    loadQuestion()
})

function checkAnswer(){
    if(quiz_nourriture_francaise.questions[currentQuestionIndex].correct_answer==reponseDuJoueur){
        console.log("bonne réponse")
        score +=1
        return true
    }
    else{
        console.log("mauvaise réponse")
        return false
    }
}

loadQuestion()