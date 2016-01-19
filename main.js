var howMany = 1;
var videos = new Array();

var load = function (file, cb){
    var lines = [];
    new BufferedReader (file, { encoding: "utf8" })
        .on ("error", function (error){
            cb (error, null);
        })
        .on ("line", function (line){
            videos.push (line);
        })
        .on ("end", function (){
            cb (null, lines);
        })
        .read ();
};

load ("db.txt", function (error, lines){
    if (error) return console.log (error);
    console.log (videos);
});

function getRandomVideo() {
	var randscript = -1;
	while (randscript < 0 || randscript > howMany || isNaN(randscript)){
	  randscript = parseInt(Math.random()*(howMany+1));
	}
	return videos[randscript];
}

function changeVideo() {
	var player = document.getElementById('bgvid');
	var webm = document.getElementById('webm_source');
	var old_src = webm.getAttribute('src');
	var new_src = getRandomVideo();
	while (new_src == old_src) {
	  new_src = getRandomVideo();
	}

	player.pause();

	webm.setAttribute('src', new_src);

	player.load();
	player.play();
}

window.onload=function(){
	changeVideo();    
};