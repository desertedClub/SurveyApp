const surveyQuestions = [
    {
        id: 'q1',
        type: 'radio',
        text: 'Обичате ли да четете книги?',
        options: ['Да', 'Горе-долу', 'Не особено', 'Изобщо'],
        moreOptions: false
    },
    {
        id: 'q2',
        type: 'checkbox',
        text: 'Какъв вид литература е най-интересна за вас?',
        options: ['Книги', 'Учебници/Документация', 'Списания/Комикси', 'Вестници', 'Интернет фикшън', 'Никаква'],
        moreOptions: true
    },
    {
        id: 'q3',
        type: 'checkbox',
        text: 'Какъв жанр най-често ви допада?',
        options: ['Поезия и проза', 'Туризъм, кулинария, хоби', 'Научна фантастика', 'Романтика', 'Биография',
            'Трилъри', 'Комедия'],
        moreOptions: true
    },
    {
        id: 'q4',
        type: 'text',
        text: 'Коя е последната книга/книжовен материал, който сте прочели?'
    },
    {
        id: 'q5',
        type: 'slider',
        text: 'Колко книги/книжовен материал сте прочели за последната година?',
        min: 0, max: 5
    },
    {
        id: 'q6',
        type: 'checkbox',
        text: 'На какво четете?',
        options: ['Е-Четец', 'Физически книги', 'Телефон/Компютър']
    },
    {
        id: 'q7',
        type: 'checkbox',
        text: 'Какво НЕ Ви харесва в четенето?',
        options: ['Скучно е', 'Няма интересни книги', 'Некомфортно е', 'Нямам оплаквания'],
        moreOptions: true
    },
    {
        id: 'q8',
        type: 'text',
        text: 'Какво би Ви накарало да четете по-често?',
        moreOptions: true
    },
    {
        id: 'q9',
        type: 'radio',
        text: 'Вярвате ли, че четенето е добра практика?',
        options: ['Да', 'Не съм сигурен', 'Не']
    }
]

var $ = Dom7;

var device = Framework7.getDevice();
var app = new Framework7({
    name: 'My App', // App name
    theme: 'auto', // Automatic theme detection
    el: '#app', // App root element

    id: 'io.framework7.myapp', // App bundle ID
    // App store
    store: store,
    // App routes
    routes: routes,


    // Input settings
    input: {
        scrollIntoViewOnFocus: device.cordova && !device.electron,
        scrollIntoViewCentered: device.cordova && !device.electron,
    },
    // Cordova Statusbar settings
    statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
    },
    on: {
        init: function () {
            var f7 = this;
            if (f7.device.cordova) {
                // Init cordova APIs (see cordova-app.js)
                cordovaApp.init(f7);
            }
        },
    },
});

function getMoreOptionsHTML(type, id) {
    console.log('called getMoreOptionsHTML()')
    return `
        <li>
            <label class="item-${type} item-content">
                <input type="${type}" name="${id}" value="other" class="other-option-${type}">
                <i class="icon icon-${type}"></i>
                <div class="item-inner">
                    <div class="item-input-wrap">
                        <input type="text" class="other-input" placeholder="Друго..." >
                    </div>
                </div>
            </label>
        </li>
        </ul></div>`
}

function renderSurvey() {
    const container = document.getElementById('question-container')
    console.log('called renderSurvey()')

    surveyQuestions.forEach((question, index) => {
        const block = document.createElement('div')
        block.classList.add('block')

        let html = `<p>${index + 1}. ${question.text}</p>`

        // RADIO
        if (question.type === 'radio') {
            html += `<div class="list"><ul>` +
                question.options.map(opt => `
                    <li>
                        <label class="item-radio item-content">
                            <input type="radio" name="${question.id}" value="${opt}">
                            <i class="icon icon-radio"></i>
                            <div class="item-inner">
                                <div class="item-title">${opt}</div>
                            </div>
                        </label>
                    </li>
                `).join('')
            question.moreOptions ? html += getMoreOptionsHTML(question.type, question.id) : html += `</ul></div>`
        }

        // CHECKBOX
        else if (question.type === 'checkbox') {
            html += `<div class="list"><ul>` +
                question.options.map(opt => `
                    <li>
                        <label class="item-checkbox item-content">
                            <input type="checkbox" name="${question.id}" value="${opt}">
                            <i class="icon icon-checkbox"></i>
                            <div class="item-inner">
                                <div class="item-title">${opt}</div>
                            </div>
                        </label>
                    </li>
                `).join('')
            question.moreOptions ? html += getMoreOptionsHTML(question.type, question.id) : html += `</ul></div>`
        }

        // TEXT
        else if (question.type === 'text') {
            html += `
                <div class="list">
                    <ul>
                        <li class="item-content item-input">
                            <div class="item-inner">
                                <div class="item-input-wrap">
                                    <input type="text" name="${question.id}" placeholder="Споделете мнението сии тук...">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            `
        }

        // SLIDER
        else if (question.type === 'slider') {
            html += `
                <div class="list">
                    <ul>
                        <li class="item-content item-input">
                            <div class="item-inner">
                                <div class="item-input-wrap">
                                    <div class="range-slider range-slider-init"
                                    id="${question.id}"
                                    data-min="${question.min}"
                                    data-max="${question.max}"
                                    data-label="true"
                                    data-step="1"
                                    data-value="${question.min}"
                                </div>
                            </div>
                        </li>
                    <ul>
                </div>
            `
        }

        block.innerHTML = html
        container.appendChild(block)

        const rangeEls = block.querySelectorAll('.range-slider-init');
        rangeEls.forEach(input => {
            app.range.create({ el: input });
        });
    })
}

document.addEventListener('page:init', function (e) {
    const page = e.detail

    if (page.name === 'questions') {
        renderSurvey()

        const form = document.getElementById('survey-form')
        form.addEventListener('submit', function (e) {
            e.preventDefault()

            const formData = new FormData(form)
            storeData(formData)
            app.views.main.router.navigate('/done/')
        })
    }

    if (page.name === 'done') console.log('Done.html loaded')

    if (page.name === 'results') handleResults()
})

function handleResults() {
    // localStorage.removeItem('allSurveyAnswers') // WORKING NOW
    const container = document.getElementById('results-container')
    const allAnswers = JSON.parse(localStorage.getItem('allSurveyAnswers')) // parsing everything from localStorage item to the const allAnswers like JSON

    if (!allAnswers) {
        container.innerHTML = '<p>Все още няма подадени отговори.</p>'
        return
    }

    allAnswers.forEach((answer, index) => {
        const resultBlock = document.createElement('div')
        resultBlock.classList.add('block')

        resultBlock.innerHTML = `
            <h3>Участник ${index + 1}</h3>
                <ul>` + answer.map(ans => `
                    <li><strong>${ans.qTitle}</strong> (${ans.dataType}): ${Array.isArray(ans.qAnswer) ? ans.qAnswer.join(', ') : ans.qAnswer}</li>
                    `).join('') +
            `</ul>`
        container.appendChild(resultBlock)
    })
}

function storeData(formData) {
    console.log('called storeData()')

    const answers = []
    surveyQuestions.forEach((question) => {
        let answer

        if (question.type === 'slider') {
            const slider = app.range.get(`#${question.id}`)
            answer = slider ? slider.getValue() : null
        } else {
            const values = formData.getAll(question.id)
            answer = values.length === 1 ? values[0] : values
        }

        answers.push({
            qid: question.id,
            dataType: question.type,
            qTitle: question.text,
            qAnswer: answer
        })
    })

    answers.forEach((answer) => {
        console.log(answer)
    })
    const allAnswers = JSON.parse(localStorage.getItem('allSurveyAnswers') || '[]')
    allAnswers.push(answers)
    localStorage.setItem('allSurveyAnswers', JSON.stringify(allAnswers))

    // const clearBtn = document.getElementById('clearStorage')
    // clearBtn.addEventListener('click', function () {
    //     localStorage.removeItem("allSurveyAnswers")
    //     alert('localStorage cleared')
    //     location.reload()
    // })

    document.addEventListener('DOMContentLoaded', () => {
        handleResults()
    })
}

