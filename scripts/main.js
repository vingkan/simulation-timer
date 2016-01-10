var GLOBAL = {
	DAY: 86400000, //one day in milliseconds
	MINUTE: 60000, //one minute in milliseconds
	HOUR: 3600000 //one hour in milliseconds
}

var CONFIG = {
	SIMULATION_START: 1420092000000,
	SIMULATION_END: 1420956000000,
	REAL_START: 1420855200000,
	REAL_END: 1420866000000
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

window.setInterval(function(){
	var realNow = new Date().getTime();
	var scale = calculateTimeScale(CONFIG);
	//console.log("Scale: " + scale);
	realClock.innerHTML = moment(realNow).format("M/D hh:mm A");
	simulationClock.innerHTML = moment(realNow * scale).format("M/D hh:mm A");
});


function loadCalendar(calendarDiv, config){
	var weekDivs = calendarDiv.children;
	console.log(weekDivs)
}

loadCalendar(simulationCalendar, CONFIG);