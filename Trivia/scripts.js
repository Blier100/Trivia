const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let score = 0

const genres = [
    {
        name: 'PLANKTON',
        id: 10
    },
    {
        name: 'AEROSOL',
        id: 11
    },
    {
        name: 'CLOUD',
        id: 12
    },
    {
        name: 'OCEAN ECOSYSTEM',
        id: 15
    }
]

const levels = ['easy', 'medium', 'hard']

// Preguntas personalizadas
const questions = {
    'PLANKTON': {
        'easy': { question: '¿El fitoplancton es un pequeño organismo que vive en el oceano?', answer: 'True', value: 100 },
        'medium': { question: '¿El fitoplancton puede obstruir la luz solar?', answer: 'True', value: 200 },
        'hard': { question: '¿El fitoplancton no afecta la temperatura del agua?', answer: 'False', value: 300 }
    },
    'AEROSOL': {
        'easy': { question: '¿Los aerosoles absorben la luz del sol?', answer: 'True', value: 100 },
        'medium': { question: '¿Los aersoles no afectan la calidad del aire?', answer: 'False', value: 200 },
        'hard': { question: '¿Los aersoles pueden venir de volcanes?', answer: 'True', value: 300 }
    },
    'CLOUD': {
        'easy': { question: '¿El cambio climático afecta los océanos?', answer: 'True', value: 100 },
        'medium': { question: '¿Los aerosoles no tienen efecto sobre el clima?', answer: 'False', value: 200 },
        'hard': { question: '¿El aumento de CO2 no afecta la atmósfera?', answer: 'False', value: 300 }
    },
    'OCEAN ECOSYSTEM': {
        'easy': { question: '¿La luz cambia al entrar a los océanos?', answer: 'True', value: 100 },
        'medium': { question: '¿El agua limpia permite que la luz legue mas profundo?', answer: 'True', value: 200 },
        'hard': { question: '¿La luz del sol esta hecha de diferentes colores?', answer: 'True', value: 300 }
    }
    
}

function addGenre(genre) {
    const column = document.createElement('div')
    column.classList.add('genre-column')
    column.innerHTML = genre.name
    game.append(column)

    levels.forEach(level => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        // Asigna valores a las tarjetas según el nivel de dificultad
        if (level === 'easy') {
            card.innerHTML = 100
        }
        if (level === 'medium') {
            card.innerHTML = 200
        }
        if (level === 'hard') {
            card.innerHTML = 300
        }

        function getResult() {
            const allCards = Array.from(document.querySelectorAll('.card'))
            allCards.forEach(card => card.addEventListener('click', flipCard))
        
            const cardOfButton = this.parentElement
        
            // Verificar si la respuesta es correcta
            if (cardOfButton.getAttribute('data-answer') === this.innerHTML) {
                // Incrementa el puntaje
                score = score + parseInt(cardOfButton.getAttribute('data-value'))
                scoreDisplay.innerHTML = score
                
                // Cambia el color de fondo a verde para indicar que la respuesta es correcta
                cardOfButton.style.backgroundColor = 'green'
        
                // Muestra el mensaje de "¡Bien hecho!"
                const message = document.createElement('div')
                message.innerHTML = '¡Bien hecho!'
                message.style.color = 'green'
                message.style.fontSize = '20px'
                cardOfButton.appendChild(message)
        
                cardOfButton.classList.add('correct-answer')
                
                setTimeout(() => {
                    // Elimina el mensaje después de un tiempo
                    cardOfButton.removeChild(message)
        
                    // Limpia el contenido del card
                    while (cardOfButton.firstChild) {
                        cardOfButton.removeChild(cardOfButton.lastChild)
                    }
                    cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
                }, 1000) // El mensaje permanece por 1 segundo (1000ms)
            } else {
                // Si la respuesta es incorrecta, cambia el color a rojo
                cardOfButton.style.backgroundColor = 'red'
        
                cardOfButton.classList.add('wrong-answer')
                
                setTimeout(() => {
                    // Limpia el contenido del card
                    while (cardOfButton.firstChild) {
                        cardOfButton.removeChild(cardOfButton.lastChild)
                    }
                    cardOfButton.innerHTML = 0
                }, 1000)
            }
        
            // Remueve el evento 'click' de la tarjeta una vez que se ha respondido
            cardOfButton.removeEventListener('click', flipCard)
        }
        

        // Obtén la pregunta personalizada para este género y nivel
        const questionData = questions[genre.name]?.[level]
        if (questionData) {
            card.setAttribute('data-question', questionData.question)
            card.setAttribute('data-answer', questionData.answer)
            card.setAttribute('data-value', questionData.value)
        }

        card.addEventListener('click', flipCard)
    })
}

genres.forEach(genre => addGenre(genre))

function flipCard() {
    this.innerHTML = ''
    this.style.fontSize = '15px'
    const textDisplay = document.createElement('div')
    const trueButton = document.createElement('button')
    const falseButton = document.createElement('button')
    trueButton.innerHTML = 'True'
    falseButton.innerHTML = 'False'
    trueButton.classList.add('true-button')
    falseButton.classList.add('false-button')
    trueButton.addEventListener('click', getResult)
    falseButton.addEventListener('click', getResult)
    textDisplay.innerHTML = this.getAttribute('data-question')
    this.append(textDisplay, trueButton, falseButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))

    const cardOfButton = this.parentElement
    if (cardOfButton.getAttribute('data-answer') === this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        }, 100)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        }, 100)
    }
    cardOfButton.removeEventListener('click', flipCard)
}




