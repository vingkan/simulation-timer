var GLOBAL = {
	DAY: 86400000, //one day in milliseconds
	WEEK: 604800000, //one week in milliseconds
	MINUTE: 60000, //one minute in milliseconds
	HOUR: 3600000 //one hour in milliseconds
}

var CONFIG = {
	SIMULATION_START: 1457931600000,
	SIMULATION_END: 1463979600000,
	REAL_START: 1452391200000,
	REAL_END: 1452402000000
}

var realClock = document.getElementById('real-clock');
var simulationClock = document.getElementById('simulation-clock');

var simulationCalendar = document.getElementById('simulation-calendar');
var calendarToolbar = document.getElementById('calendar-toolbar');

console.log(moment(CONFIG.REAL_START).format("[Started at:] M/D hh:mm A"));

/*
 * Returns scale between real time and simulation time
 * Multiply real time by this scalar to get simulation time
 */
function calculateTimeScale(config){
	var simulationDuration = config.SIMULATION_END - config.SIMULATION_START;
	var realDuration = config.REAL_END - config.REAL_START;
	var scale = simulationDuration / realDuration;
	return scale;
}

function getSimulationTime(now, config){
	var realElapsed = now - config.REAL_START;
	var scale = calculateTimeScale(config);
	var simTime = (realElapsed * scale) + config.SIMULATION_START;
	return simTime;
}

//WARNING: ONLY WORKS FOR SIMULATIONS LESS THAN A YEAR LONG
function getMonthInSimulation(timestamp, config){
	var startMonth = new Date(config.SIMULATION_START).getMonth();
	var currentMonth = new Date(timestamp).getMonth();
	return (currentMonth - startMonth);
}

function getWeekInMonthInSimulation(timestamp, config){
	//var startDay = time
}

function setClock(now, config){
	var simTime = getSimulationTime(now, config);
	realClock.innerHTML = moment(now).format("M/D hh:mm:ss A");
	simulationClock.innerHTML = moment(simTime).format("M/D hh:mm A");
}

function showCurrentDate(now, simWeek, config){
	var simTime = getSimulationTime(now, config);
	var simDate = new Date(simTime);
	var monthIndex = getMonthInSimulation(now, config);
	var monthDiv = getMonthDiv(calendarDiv, monthIndex);
	var dateBox = monthDiv.children[simWeek + 1].children[simDate.getDay()];
}

window.setInterval(function(){
	var realNow = new Date().getTime();
	setClock(realNow, CONFIG);
	//showCurrentDate(realNow, CONFIG);
}, 25);

function toggleMonthView(calendarDiv, monthIndex){
	var monthDiv = getMonthDiv(calendarDiv, monthIndex);
	var allMonths = calendarDiv.getElementsByClassName("month");
	$.each(allMonths, function(index, div){
		div.style.display = "none";
	});
	monthDiv.style.display = "block";
}

function createCalendar(calendarDiv, toolbarDiv, config){
	var startMonth = new Date(config.SIMULATION_START).getMonth();
	var endMonth = new Date(config.SIMULATION_END).getMonth();
	var months = (endMonth - startMonth) + 1;
	var currentMonth = startMonth;
	var currentDate = new Date(config.SIMULATION_START);
	for(var m = 0; m < months; m++){
		var labelDiv = document.createElement("h1");
			labelDiv.classList.add("month-label");
			labelDiv.innerHTML = moment(currentDate).format("MMMM YYYY");
		var monthDiv = document.createElement("div");
			monthDiv.classList.add("month");
			monthDiv.appendChild(labelDiv);
			calendarDiv.appendChild(monthDiv);
		var toolbarMonth = document.createElement("button");
			toolbarMonth.classList.add("month-button");
			toolbarMonth.innerHTML = moment(currentDate).format("MMMM YYYY");
			toolbarMonth.id = "month-button-" + m;
			toolbarDiv.appendChild(toolbarMonth);
			console.log(toolbarDiv.style.width);
		currentMonth++;
		currentDate.setMonth(currentDate.getMonth() + 1);
	}
	var monthDivs = calendarDiv.getElementsByClassName("month");
	$.each(monthDivs, function(index, div){
		for(var w = 0; w < 5; w++){
			var weekDiv = document.createElement("div");
				weekDiv.classList.add("week");
				div.appendChild(weekDiv);
		}
	});
	var weekDivs = calendarDiv.getElementsByClassName("week");
	$.each(weekDivs, function(index, div){
		for(var d = 0; d < 7; d++){
			var dayDiv = document.createElement("div");
				dayDiv.classList.add("weekday");
				dayDiv.classList.add("weekday-inactive");
				dayDiv.innerHTML = "-";
				div.appendChild(dayDiv);
		}
	});
	$(".month-button").click(function(event){
		var monthIndex = parseInt(this.id.split("-")[2]);
		toggleMonthView(calendarDiv, monthIndex);
	});
}

function getMonthDiv(calendarDiv, index){
	var monthDivs = calendarDiv.children;
	return monthDivs[index];
}

function loadCalendar(calendarDiv, config){
	var simMonth = 0;
	var simWeek = 0;
	var simTime = config.SIMULATION_START;
	while(simTime < config.SIMULATION_END){
		var simDate = new Date(simTime);
		var monthDiv = getMonthDiv(calendarDiv, simMonth);
		var dateBox = monthDiv.children[simWeek + 1].children[simDate.getDay()];
		dateBox.innerHTML = simDate.getDate();
		dateBox.classList.remove("weekday-inactive");
		dateBox.classList.add("weekday-active");
		simTime += GLOBAL.DAY;
		if(simDate.getDay() === 6){
			simWeek++;
		}
		if(simDate.getMonth() !== new Date(simTime).getMonth()){
			simMonth++;
			simWeek = 0;
		}
	}
}

createCalendar(simulationCalendar, calendarToolbar, CONFIG);
loadCalendar(simulationCalendar, CONFIG);