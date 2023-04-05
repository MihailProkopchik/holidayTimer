'use strict';

let holidaysDB = [
    {
        value: 'independenceDay',
        header: 'День независимости Республики Беларусь',
        description:
            'главный праздник белорусской государственности, в честь освобождения от немецкой оккупации. отмечается ежегодно 3 июля.',
        year: 0,
        month: 7,
        day: 3,
        imgURL: '../images/independenceday.jpg',
    },
    {
        value: 'womensDay',
        header: '8 марта',
        description: 'Международный женский день',
        year: 0,
        month: 3,
        day: 8,
        imgURL: '../images/womensDay.jpg',
    },
];

// Объявляем переменные ///////////////////////////////////////
let body = document.querySelector('body');
let select = document.querySelector('.choose-holiday__select');

///////////////////////////////////////////////////////////////

// Устанавливаем прослушиватели событий ///////////////////////
select.addEventListener('change', () => {
    // select.value
    let holiday = holidaysDB.find(holiday => holiday.value === select.value);
    body.style.backgroundImage = `url("${holiday.imgURL}"`;
    // element.innerText
});
///////////////////////////////////////////////////////////////

function fillHolidaysYears(holidaysDB) {
    //console.log('fill');
    // Заполнить в каждом празднике свойство года. Если праздник на текущий момент прошёл то текущий год+1, если ещё не прошёл то просто текущий год.
}

fillHolidaysYears();
