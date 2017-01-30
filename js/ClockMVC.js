
// ---------------------------MODEL----------------------------

function TClockModel(_city, _gmt){
	
	var city = _city;
	var gmt = _gmt;
	var hours = null;
	var min = null;
	var sec = null;
	this.MINSECSTEP = 6;
	this.HOURSSTEP = 30;
	var hoursAngle = null;
	var minAngle = null;
	var secAngle = null;
	
	this.getCity = function(){
		return city;
	};
	
	this.getGMT = function(){
		return gmt;
	};
	
	this.getCurrentTime = function (){
		var currentTime = new Date();
		currentTime.setHours(currentTime.getUTCHours() + +gmt);
		hours = currentTime.getHours();
		min = currentTime.getMinutes();
		sec = currentTime.getSeconds();

		var HoursStr = formatTime(hours);
		var MinStr = formatTime(min);
		var SecStr = formatTime(sec);

		function formatTime(arg){
			return (arg < 10)?'0'+arg:arg;
		}
		return HoursStr + ':' + MinStr + ':' + SecStr;
	};

	this.getHoursAngle = function (){
		return hoursAngle = hours * this.HOURSSTEP;
	};
	
	this.getminAngle = function (){
		return minAngle = min * this.MINSECSTEP;
	};

	this.getsecAngle = function (){
		return secAngle = sec * this.MINSECSTEP;
	};
};

//-------------------------VIEW---------------------------------------

function TClockView(){
	
	var model = null;
	var field = null;
	var clock = null;
	var number = null;
	var digital = null;
	var secHand = null;
	var minHand = null;
	var hoursHand = null;
	var city = null;
	var counter = 1;
	var Angle = 30;
	
	this.init = function (_model, _field){
		model = _model;
		field = _field;
		clock = document.createElement('div');
		clock.setAttribute('class', 'clock');
		field.appendChild(clock);
		
		var buttonStop = document.createElement('button');
		buttonStop.setAttribute('class','buttonStop');
		buttonStop.innerHTML = 'Stop';
		field.appendChild(buttonStop);

		var buttonStart = document.createElement('button');
		buttonStart.setAttribute('class','buttonStart');
		buttonStart.innerHTML = 'Start';
		field.appendChild(buttonStart);
		
		this.getButtonStop = function(){
			return buttonStop;
		};
		
		this.getButtonStart = function(){
			return buttonStart;
		};
		
		for (var i = 0; i < 12; i++){
			number = document.createElement('div');
			number.setAttribute('class', 'number');
			clock.appendChild(number);
			number.innerHTML = counter;
			counter++;
		}
		
		var MasNumbers = document.getElementsByClassName('number');
		for (var j = 0; j < MasNumbers.length; j++){
			var el = MasNumbers[j];
			var StartCentrX = (clock.offsetWidth/2);
			var StartCentrY = (clock.offsetHeight/2);
			var RadiusNumber = StartCentrY * 85 / 100;
			var AngleRad = (Angle * Math.PI) / 180;
			el.style.left = ((StartCentrX + RadiusNumber*Math.sin(AngleRad)) - el.offsetWidth/2) + 'px';
			el.style.top = ((StartCentrY - RadiusNumber*Math.cos(AngleRad)) - el.offsetHeight/2) + 'px';
			Angle += 30;
		}
		
		digital = document.createElement('div');
		digital.setAttribute('id', 'digital');
		clock.appendChild(digital);
		digital.innerHTML = model.getCurrentTime();

		city = document.createElement('div');
		city.setAttribute('id', 'city');
		city.innerHTML = model.getCity()+'</br>'+'GMT'+' '+model.getGMT();
		clock.appendChild(city);

		secHand = document.createElement('div');
		secHand.setAttribute('id', 'secHand');
		clock.appendChild(secHand);

		minHand = document.createElement('div');
		minHand.setAttribute('id', 'minHand');
		clock.appendChild(minHand);

		hoursHand = document.createElement('div');
		hoursHand.setAttribute('id', 'hoursHand');
		clock.appendChild(hoursHand);

	}; 

	this.upDate = function (){
		digital.innerHTML = model.getCurrentTime();
	};

	this.runHand = function(){
		var hourAngle = model.getHoursAngle();
		var minAngle = model.getminAngle();
		var secAngle = model.getsecAngle();
		
		secHand.style.transform = 'rotateZ(' + secAngle + 'deg)';
		minHand.style.transform = 'rotateZ(' + minAngle + 'deg)';
		hoursHand.style.transform = 'rotateZ(' + hourAngle + 'deg)';
		if (secAngle == 360){
			if (minAngle == 360){
				if (hourAngle == 360){
					hourAngle = 0;
				}
				minAngle = 0;
			}
			secAngle = 0;
			hourAngle += 0.5;
		}
		minAngle += 0.1;
	};
}

// -----------------------------Controller-------------------------------------------

function TClockController (){
	var view = null;
	var model = null;
	var field = null;
	var timer = 0;
	this.init = function (_model, _view, _field){
		view = _view;
		model = _model;
		field = _field;
		
		view.init(model, field);

		timer = setInterval(time, 10);

		var buttonStop = view.getButtonStop();
		var buttonStart = view.getButtonStart();
		
		buttonStop.addEventListener('click', this.stopTime);
		buttonStart.addEventListener('click', this.startTime);

	};
	
	this.stopTime = function (){
		clearInterval(timer);
	};

	this.startTime = function (){
		if (timer !== 0){
			clearInterval(timer);
			timer = 0;
		} 
		timer = setInterval(time, 10);
	};

	function time(){
		view.upDate();
		view.runHand();
	}
}