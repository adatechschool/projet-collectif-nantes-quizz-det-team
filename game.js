import {quiz_nourriture_francaise} from "./questions.js"; 

const questionBox = document.querySelector(".question")

const answersBox = [document.querySelector("#firstButton"), document.querySelector("#secondButton"), document.querySelector("#thirdButton"), document.querySelector("#fourthButton")]


const firstQuestion = quiz_nourriture_francaise.questions[0];

console.log(firstQuestion)

questionBox.innerText = firstQuestion.text

const reponse1 = firstQuestion.options[0]

answersBox[0].innerText = reponse1

firstQuestion.options.forEach(option => {
    const reponse1 = firstQuestion.options[option]
    answersBox[option].innerText
});











// const questionText = quiz_nourriture_francaise.questions[1]

// questionBox.innerText = questionText

