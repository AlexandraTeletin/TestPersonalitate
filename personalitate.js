//Set de întrebări și răspunsuri -DONE
//Ajutați fiecărui răspuns un identificator -DONE
//Care identificator va crește prin fiecare întrebare
//Al final, identificatorul cu cel mai mare număr este câștigătorul. 
//Afișează răspunsul și continuă testul



let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Funcție pentru a genera întrebarea 
function generateQuestions (index) {
    //Selectați fiecare întrebare trecându-i un anumit index

    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    //Populați elementele html
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Verificați dacă fiecare variantă este selectată, dacă nu, afișați pop-up
    if(!selectedOption) {
        alert('Te rugăm să selectezi măcar un răspuns!');
        return;
    }
    //Păstrează valoarea selecției făcute
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Adăugați scorul răspunsului la scoruri
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Introducem numărul curent al întrebării (care va fi folosit ca index pentru fiecare tablou).
    currentQuestion++;

        //verificare
        selectedOption.checked = false;
    //Dacă quiz-ul se află la ultima întrebare
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //Când quiz-ul se termină, întrebările sunt ascunse și se afisează pagina cu rezultate. 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Scorul final: ${totalScore}</h1>
         <div class="summary">
            <h1>Rezultate posibile: </h1>
            
            <p>15-21 - Ești o persoană rațională. Îți place să lucrezi în liniște, uneori chiar și-n echipă. Te bucuri de momentele libere învățând lucruri noi și te dedici mereu corectitudinii. </p>
            
            <p>10-15 - Ești o persoană prietenoasă și atentă la detalii. Îți place să fii înconjurată de oameni și te bazezi pe propriile instincte. </p>
            <p>7-10 - Ești o persoană prietenoasă și dornică să se dezvolte, atât pe ea cât și pe ceilalți, însă de multe ori pui prea mult accent pe erorile din trecut și te întrisetezi repede.</p>
        </div>
        <button class="restart">Reia Testul</button>
         `;
        return;
        /*<p>Ai toate calitățile pentru a profesa în următoarele domenii: IT ( Java dev, .Net dev, Tester ), Inginerie, etc.</p>,            <p>Ai toate calitățile pentru a profesa în următoarele domenii: HR, Marketing, Vânzări, Relații cu clienții.</p>
             <p>Ai toate calitățile pentru a profesa în următoarele domenii: Învățămând, Medicină, Actorie</p>
*/ 
    }
    generateQuestions(currentQuestion);
}

//Funcție pentru a încărca întrebarea anterioară
function loadPreviousQuestion() {
    //Indicele de descreștere a întrebărilor ( scade indexul când mergem cu întrebare în urmă)
    currentQuestion--;
    //scoatem ultima valoare selectată la întrebarea, din întrebarea în care eram ( dacă e ceva selectat la întrebare actuală și dam pe butonul Întrebarea anterioară, atunci tot ce am selectat trebuie șters)
    score.pop();
    //Generează întrebarea
    generateQuestions(currentQuestion);
}

//Funcția de reset/restart quiz
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //resetarea matricei de scor
    currentQuestion = 0;
    score = [];
    //Reia quiz-ul de la 0
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);


