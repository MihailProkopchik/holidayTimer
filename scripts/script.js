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
    {
        value: 'newYear',
        header: 'Новый год',
        description:
            ' главный календарный праздник, наступающий в момент перехода с последнего дня текущего года в первый день следующего года.',
        year: 0,
        month: 1,
        day: 1,
        imgURL: '../images/newYear.jpg',
    },
    {
        value: 'defendersDay',
        header: 'День защитника отечества',
        description:
            '23 февраля в Республике Беларусь торжественно отмечается День защитников Отечества и Вооруженных Сил.',
        year: 0,
        month: 2,
        day: 23,
        imgURL: '../images/defendersDay.jpg',
    },
    {
        value: 'labourDay',
        header: 'День труда',
        description:
            'Первое ма́я праздник, связанный с темой труда, отмечаемый под различными названиями во многих государствах',
        year: 0,
        month: 7,
        day: 1,
        imgURL: '../images/labourDay.jpg',
    },
    {
        value: 'victoryDay',
        header: 'День победы',
        description: 'праздник победы Красной армии и советского народа над нацистской Германией ',
        year: 0,
        month: 7,
        day: 9,
        imgURL: '../images/victoryDay.webp',
    },
    {
        value: 'developerDay',
        header: 'День программиста',
        description: 'День программи́ста — профессиональный праздник в РФ, отмечаемый в 256-й день года. ',
        year: 0,
        month: 9,
        day: 13,
        imgURL: '../images/developerDay.png',
    },
];

// Объявляем переменные ///////////////////////////////////////
let body = document.querySelector('body');
let select = document.querySelector('.choose-holiday__select');
let header = document.querySelector('.header-holiday');
let description = document.querySelector('.description-holiday');
///////////////////////////////////////////////////////////////

// Устанавливаем прослушиватели событий ///////////////////////
select.addEventListener('change', () => {
    // select.value
    let holiday = holidaysDB.find(holiday => holiday.value === select.value);
    body.style.backgroundImage = `url("${holiday.imgURL}"`;
    header.innerText = holiday.header;
    description.innerText = holiday.description;
});
///////////////////////////////////////////////////////////////

function fillHolidaysYears(holidaysDB) {
    //console.log('fill');
    // Заполнить в каждом празднике свойство года. Если праздник на текущий момент прошёл то текущий год+1, если ещё не прошёл то просто текущий год.

    let now = new Date();
    let year = now.getFullYear();
    let monthNow = now.getMonth() + 1;
    let date = now.getDate();
    for (let index = 0; index < holidaysDB.length; index++) {
        if (monthNow < holidaysDB[index].month) {
            holidaysDB[index].year = year;
        } else if (monthNow > holidaysDB[index].month) {
            holidaysDB[index].year = year + 1;
        } else if (monthNow === holidaysDB[index].month) {
            if (date < date[index].month) {
                holidaysDB[index].year = year;
            } else if (date > date[index].month) {
                holidaysDB[index].year = year + 1;
            }
        }
    }
    return holidaysDB;
}

fillHolidaysYears(holidaysDB);
