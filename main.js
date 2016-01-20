var xhr = new XMLHttpRequest();

xhr.open('GET', 'db.txt', false);
xhr.send(null);

var videos = xhr.responseText.split('\n');
var howMany = videos.length;
var it;

function getRandomVideo() {
	var randscript = -1;
	while (randscript < 0 || randscript > howMany-1 || isNaN(randscript)){
	  randscript = parseInt(Math.random()*(howMany+1));
	}
	return randscript;
}

function setVideo() {
	var player = document.getElementById('bgvid');
	var webm = document.getElementById('webm_source');
	it = getRandomVideo();
	player.pause();

	webm.setAttribute('src', videos[it]);

	player.load();
	player.play();

	if (player.videoHeight > player.videoWidth) player.width = player.videoWidth;
}

function changeVideo() {
	var player = document.getElementById('bgvid');
	var webm = document.getElementById('webm_source');

	it = it + 1;
	if (it == howMany) it = 0;

	player.pause();

	webm.setAttribute('src', videos[it]);

	player.load();
	player.play();

	if (player.videoHeight > player.videoWidth) player.width = player.videoWidth;
}

function volume_up() {
	var player = document.getElementById('bgvid');
	var volume = player.volume;
	if (volume + 0.1 < 1.0) player.volume = volume + 0.1;
}

function volume_down() {
	var player = document.getElementById('bgvid');
	var volume = player.volume;
	if (volume - 0.1 > 0) player.volume = volume - 0.1;
}

window.onload=function() {
	setVideo();
	JSFX_StartEffects();
	var player = document.getElementById('bgvid');
	player.volume = 0.7;
};

var colors = new Array("339966", "FF0000", "00FF00", "0000FF", "FFFF00", "FF00FF", "00FFFF");
var start  = colors[0];
var end    = colors[0];
var index  = 0;
var cindex = 0;
var faderObj = new Array();


function getColor(start, end, percent) {
	function hex2dec(hex){return(parseInt(hex,16));}
	function dec2hex(dec){return (dec < 16 ? "0" : "") + dec.toString(16);}
	var r1 = hex2dec(start.slice(0,2)), g1=hex2dec(start.slice(2,4)), b1=hex2dec(start.slice(4,6));
	var r2 = hex2dec(end.slice(0,2)),   g2=hex2dec(end.slice(2,4)),   b2=hex2dec(end.slice(4,6));
	var pc = percent/100;
	var r  = Math.floor(r1+(pc*(r2-r1)) + .5), g=Math.floor(g1+(pc*(g2-g1)) + .5), b=Math.floor(b1+(pc*(b2-b1)) + .5);
	return("#" + dec2hex(r) + dec2hex(g) + dec2hex(b));
}

function fadeSpan() {
	if(index == 0) {
		start = end;
		end = colors[ cindex = (cindex+1) % colors.length ];
	}

	for(var i=0 ; i<faderObj.length ; i++)
		faderObj[i].style.color = getColor(start, end, index);

	index = (index+5) % 100;

	setTimeout("fadeSpan()", 40);
}

function fadeAll() {
	for(var i=0 ; i<arguments.length ; i++)
		faderObj[i] = document.getElementById(arguments[i]);

	fadeSpan();
}

function JSFX_StartEffects() {
	fadeAll("h1","h2");
}