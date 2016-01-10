var GLOBAL = {
	SIMULATION_START: 1420178400000,
	SIMULATION_END: 1421733600000,
	REAL_START: 1420855200000,
	REAL_END: 1420866000000
}

console.log(moment(GLOBAL.REAL_START).format("[Started at:] M/D hh:mm A"));

function calculateTimeScale(config){
	var simulationDuration = config.SIMULATION_END - config.SIMULATION_START;
	var realDuration = config.REAL_END - config.REAL_START;
	var scale = simulationDuration / realDuration;
	return scale;
}

var scale = calculateTimeScale(GLOBAL);
console.log(scale)

window.setInterval(function(){
	var realNow = new Date().getTime();
});