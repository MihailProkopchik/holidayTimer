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
        month: 5,
        day: 1,
        imgURL: '../images/labourDay.jpg',
    },
    {
        value: 'victoryDay',
        header: 'День победы',
        description: 'праздник победы Красной армии и советского народа над нацистской Германией ',
        year: 0,
        month: 5,
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
    {
        value: 'ourDay',
        header: 'Своя дата',
        description: 'До Вашей даты осталось ',
        year: 0,
        month: 0,
        day: 0,
        imgURL: '',
    },
];
function daysInMonth(year, month) {
    let days = 0;
    if ((year % 100 === 0 && year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
        if (month === 2) {
            days = 29;
            return days;
        }
    }
    switch (month) {
        case 1:
            days = 31;
            break;
        case 2:
            days = 28;
            break;
        case 3:
            days = 31;
            break;
        case 4:
            days = 30;
            break;
        case 5:
            days = 31;
            break;
        case 6:
            days = 30;
            break;
        case 7:
            days = 31;
            break;
        case 8:
            days = 31;
            break;
        case 9:
            days = 30;
            break;
        case 10:
            days = 31;
            break;
        case 11:
            days = 30;
            break;
        case 12:
            days = 31;
            break;
    }
    return days;
}

let months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'октябрь',
    'Ноябрь',
    'Декабрь',
];
// Объявляем переменные ///////////////////////////////////////
let body = document.querySelector('body');
let select = document.querySelector('.choose-holiday__select');
let header = document.querySelector('.header-holiday');
let description = document.querySelector('.description-holiday');
let daysHtml = document.querySelector('.timer-holiday__days > .timer-holiday__values');
let hoursHtml = document.querySelector('.timer-holiday__hours > .timer-holiday__values');
let minutesHtml = document.querySelector('.timer-holiday__minutes > .timer-holiday__values');
let secondsHtml = document.querySelector('.timer-holiday__seconds > .timer-holiday__values');
let ourDateBtn = document.querySelector('#ourdateBtn');
let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let modalYear = document.querySelector('.modal__selectYear');
let modalMonth = document.querySelector('.modal__selectMonth');
let modalDay = document.querySelector('.modal__selectDay');
let modalBtnCancel = document.querySelector('.modal__cancelBtn');
let timerID;
///////////////////////////////////////////////////////////////

// Устанавливаем прослушиватели событий ///////////////////////
select.addEventListener('change', () => {
    // select.value
    let holiday = holidaysDB.find(holiday => holiday.value === select.value);
    body.style.backgroundImage = `url("${holiday.imgURL}"`;
    header.innerText = holiday.header;
    description.innerText = holiday.description;
    renderTimer(holiday);
    if (holiday.value === 'developerDay') {
        fillDeveloperDay(holiday);
    }
    clearInterval(timerID);
    timerID = setInterval(renderTimer, 1000, holiday);
});
modalBtnCancel.addEventListener('click', () => {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
});

ourDateBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    let now = new Date();
    let month = now.getMonth();
    let date = now.getDate();
    let year = now.getFullYear();
    let maxDays = daysInMonth(year, month + 1);
    holidaysDB[7].month = month + 1;
    holidaysDB[7].year = year;
    holidaysDB[7].day = date;
    modalYear.innerHTML = `<option value="${year}">${year}</option><option value="${year + 1}">${year + 1}</option>`;
    fillSelectMonths(month);
    for (let index = date; index <= maxDays; index++) {
        modalDay.innerHTML += `<option value="${index}">${index}</option>`;
    }
    modalMonth.innerHTML;
});
modalYear.addEventListener('change', () => {
    let now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();
    if (+modalYear.value === year) {
        fillSelectMonths(month);
    } else {
        fillSelectMonths(0);
        holidaysDB[7].month = 1;
        holidaysDB[7].day = 1;
    }
    holidaysDB[7].year = +modalYear.value;
});
modalMonth.addEventListener('change', () => {
    let index = months.indexOf(modalMonth.value);
    holidaysDB[7].month = index + 1;
    let now = new Date();
    let month = now.getMonth();
    let date = now.getDate();
    let year = now.getFullYear();
    let maxDays = daysInMonth(year, index);
    if (index === month) {
        fillSelectDays(date, maxDays);
    } else {
        fillSelectDays(1, maxDays);
        holidaysDB[7].day = 1;
    }
});
modalDay.addEventListener('change', () => {
    let now = new Date();
    let month = now.getMonth() + 1;
    holidaysDB[7].day = +modalDay.value;
    console.log(holidaysDB[7].day);
});
// добавить в прослушиатель смену месяцев,менять чилсло месяца,
///////////////////////////////////////////////////////////////

// Вспомогательные функции //////////////////////////////////////
let fillSelectMonths = month => {
    modalMonth.innerHTML = '';
    for (let index = month; index < 12; index++) {
        modalMonth.innerHTML += `<option value="${months[index]}">${months[index]}</option>`;
    }
};
let fillSelectDays = (date, maxDays) => {
    modalDay.innerHTML = '';
    for (let index = date; index <= maxDays; index++) {
        modalDay.innerHTML += `<option value="${index}">${index}</option>`;
    }
};

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

function renderTimer(holiday) {
    // Получаем объект даты на текущий момент
    let now = new Date();

    // Получаем объект даты на праздничный момент
    let future = new Date(`${holiday.year}-${lead0(holiday.month)}-${lead0(holiday.day)}`);

    // Вычисляем разницу между двумя моментами в секундах (учитывая таймзону)
    let delta = Math.trunc((future - now) / 1000) + future.getTimezoneOffset() * 60;

    // Вычисляем дни часы минуты и секунды
    let days = Math.trunc(delta / 60 / 60 / 24);
    let hours = Math.trunc((delta - days * 60 * 60 * 24) / 60 / 60);
    let minutes = Math.trunc((delta - days * 60 * 60 * 24 - hours * 60 * 60) / 60);
    let seconds = Math.trunc(delta - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60);

    // отправляем на страницу
    daysHtml.innerText = days;
    hoursHtml.innerText = lead0(hours);
    minutesHtml.innerText = lead0(minutes);
    secondsHtml.innerText = lead0(seconds);
}

// Функция добавления ведущих нолей при необходимости
function lead0(num) {
    if (num < 10) {
        return (num = '0' + num);
    } else {
        return num;
    }
}

function fillDeveloperDay(holiday) {
    //year % 400 == 0 || (year % 100 != 0 && year % 4 == 0) ? 1 : 0
    if (holiday.year % 100 === 0 && holiday.year % 400 === 0) {
        holiday.day = 12;
    } else if (holiday.year % 4 === 0 && holiday.year % 100 !== 0) {
        holiday.day = 12;
    } else {
        holiday.day = 13;
    }
}

//////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
fillHolidaysYears(holidaysDB);
timerID = setInterval(renderTimer, 1000, holidaysDB[0]);
