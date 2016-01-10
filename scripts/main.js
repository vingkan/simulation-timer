var GLOBAL = {
	DAY: 86400000, //one day in milliseconds
	WEEK: 604800000, //one week in milliseconds
	MINUTE: 60000, //one minute in milliseconds
	HOUR: 3600000 //one hour in milliseconds
}

var CONFIG = {
	SIMULATION_START: 1420092000000,
	SIMULATION_END: 1420956000000,
	REAL_START: 1452391200000,
	REAL_END: 1452402000000
}

var realClock = document.getElementById('real-clock');
var simulationClock = document.getElementById('simulation-clock');

var simulationCalendar = document.getElementById('simulation-calendar');

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

var counter = 0;

window.setInterval(function(){
	var realNow = new Date().getTime();
	var simTime = getSimulationTime(realNow, CONFIG);
	realClock.innerHTML = moment(realNow).format("M/D hh:mm:ss A");
	simulationClock.innerHTML = moment(simTime).format("M/D hh:mm A");
	counter++;
}, 25);


function loadCalendar(calendarDiv, config){
	var weekDivs = calendarDiv.children;
	console.log(weekDivs)
	var simWeek = 0;
	var simTime = config.SIMULATION_START;
	while(simTime < config.SIMULATION_END){
		var simDate = new Date(simTime);
		var dateBox = weekDivs[simWeek].children[simDate.getDay()];
		dateBox.innerHTML = simDate.getDate();
		dateBox.classList.remove("weekday-inactive");
		dateBox.classList.add("weekday-active");
		simTime += GLOBAL.DAY;
		if(simDate.getDay() === 6){
			simWeek++;
		}
	}
}

loadCalendar(simulationCalendar, CONFIG);