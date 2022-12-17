const questions = [
	{
	    question: "На человека можно взглянуть...",
	    answers: ["исподтишка", "изподтишка", "из-подтишка"],
	    correct: 1,
	},
	{
	    question: "Ученые обнаружили в горах более десятка багориков. Все обнаруженные багорики синего цвета.",
	    answers: [
			"Все багорики синие",
			"По крайней мере некоторые из багориков не синего цвета",
			"По крайней мере некоторые из багориков синего цвета",
	    ],
	    correct: 3,
	},
	{
	    question: "Все фениксы умеют летать. У всех фениксов есть ноги.",
	    answers: [
			"Все фениксы, у которых есть ноги, умеют летать.",
			"Ноги не мешают фениксам летать.",
			"Без ног фениксы не могут летать",
	    ],
	    correct: 1,
	},
	{
	    question: "Какой  элемент из периодической таблицы Менделеева считается самым лёгким?",
	    answers: ["Гелий", "Кислород", "Водород"],
	    correct: 3,
	},
    	{
    	    question: "В каком океане находится Марианская впадина?",
    	    answers: ["Атлантический", "Северный ледовитый", "Тихий"],
    	    correct: 3,
    	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

//Переменные теста
let score = 0; // количество правильных ответов
let questionIndex = 0; //текущий вопрос

cleanerPage();
showQuestion();


function cleanerPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion() //ф-ия отобажения вопроса
{
    console.log('showQuestion');

    const headerTeamplate = `<h2 class="title">%title%</h2>`;
    const title = headerTeamplate.replace('%title%', questions[questionIndex]['question'])
    headerContainer.innerHTML = title;

    let answerNumber = 1;
    for (answerText of questions[questionIndex]['answers']) // варианты ответов
    {
        const questionTemplate =
            `<li>
				<label>
					<input value = "%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

        let answerMTML = questionTemplate.replace('%answer%', answerText)

        answerMTML = answerMTML.replace('%number%', answerNumber);
        console.log(answerMTML);

        listContainer.innerHTML = listContainer.innerHTML + answerMTML;

        answerNumber++;
    }

    function checkAnswer() {
        console.log('checkAnswer start');

        const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

        if (checkedRadio) {
            console.log('ok');
        }

        else {
            return
        }


        const userAnswer = parseInt(checkedRadio.value) // Номр ответа пользователя

        console.log(userAnswer, questions[questionIndex]['correct']);

        if (userAnswer == questions[questionIndex]['correct']) {
            score++;
        }

        console.log('score =', score);

        if (questionIndex !== questions.length - 1) {
            console.log('NO finish');
            questionIndex++;
            cleanerPage();
            showQuestion();
            return;
        }

        else {
            console.log('finish');
            cleanerPage();
            showResults();
        }
    }

    submitBtn.onclick = checkAnswer;

    function showResults() {
        console.log('res start');
        console.log(score);

        const resultsTemplate =
            `<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class ="result">%result%</p>`;

        let title, message;

        if (score === questions.length) {
            title = 'Супер🥇'
            message = 'Вы ответили верно на все вопросы!'
        }

        else if ((score * 100) / questions.length >= 50) {
            title = 'Хороший результат🥈'
            message = 'Вы дали половину/более половины верных ответов!'
        }

        else {
            title = 'Попробуйте еще раз🥉'
            message = 'Вы дали менее половины верных ответов.'
        }

        let result = `${score} из ${questions.length}`;

        const finalMessage = resultsTemplate
                .replace('%title%', title)
                .replace('%message%', message)
                .replace('%result%', result)

        headerContainer.innerHTML = finalMessage;

        submitBtn.blur();
        submitBtn.innerText = 'Пройти тест еще раз'
        submitBtn.onclick = () => { history.go() };

    }
}
