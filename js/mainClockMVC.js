

var m1 = new TClockModel('Minsk', '+3');
var m2 = new TClockModel('London', '0');
var m3 = new TClockModel('New York', '-5');
var m4 = new TClockModel('Pekin', '+8');


var v1 = new TClockView();
var v2 = new TClockView();
var v3 = new TClockView();
var v4 = new TClockView();

var c1 = new TClockController();
var c2 = new TClockController();
var c3 = new TClockController();
var c4 = new TClockController();

var f1 = document.createElement('div');
f1.setAttribute('class', 'field');
document.body.appendChild(f1);

var f2 = document.createElement('div');
f2.setAttribute('class', 'field');
document.body.appendChild(f2);

var f3 = document.createElement('div');
f3.setAttribute('class', 'field');
document.body.appendChild(f3);

var f4 = document.createElement('div');
f4.setAttribute('class', 'field');
document.body.appendChild(f4);

c1.init(m1, v1, f1);
c2.init(m2, v2, f2);
c3.init(m3, v3, f3);
c4.init(m4, v4, f4);