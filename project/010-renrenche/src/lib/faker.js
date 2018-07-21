/* eslint-disable */
function rand(min=0, max=100, precision=2) {
    return (Math.random() * (max - min) + min).toFixed(precision);
}
function rand_int() {
    return Math.round(rand(min, max));
}

function rand_date(min_year=2015, max_year, min_month=1, max_month=12, min_day=1, max_day=28) {
    max_year = max_year || (new Date).getFullYear();
    let year = rand_int(min_year, max_year);
    let month = rand_int(min_month, max_month);
    let day = rand_int(min_day, max_day);

    return `${year}-${month}-${day}`;
}

function rand_deadline() {
    let D = new Date;
    let year = D.getFullYear();
    let month = D.getMonth();
    let day = D.getDate();

    return rand_date(
        year, year,
        month, month + rand_int(0, 1),
        day, day + rand_int(1, 20),
    )
}

function rand_bool() {
    return Math.random() >= .5;
}

function consumed() {
    return rand_int(0, 50);
}

function reason() {
    let list = ['新年换新车', '急需资金周转', '急需跑路费', '车太多放不下'];
    return list[rand_int(0,list.length - 1)];
}

function price() {
    return rand(1, 500, 1);
}

function title(brand, model) {
    let list = ['风尚型', '经济型', '商务型', '运动型','奢华型'];
    let int = rand_int(5, 10);
    let year = rand_int(2014, 2018);
    let type = list[rand_int(0,list.length - 1)];

    return `${brand || ''} ${model} ${int} 成心 ${year} ${type}`;
}