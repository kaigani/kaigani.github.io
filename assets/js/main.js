// GLOBALS

// shim layer with setTimeout fallback - doesn't seem to outperform setInterval though...
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

window.onload = function () {
	
	var canvas = document.getElementById('myCanvas');
	var c = canvas.getContext('2d');

	var stage = new Stage(canvas);

	// Stage behaviour
	var settings = {
		banner : 'kaigani turner' ,
		bitmap : 1 ,
		scale : 2 ,
		speed: 60 ,
		pause : false ,
		random : true
	};

	window.settings = settings;

	// full-size canvas
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	// Event listeners - Window
	window.addEventListener('resize', handleResize, false);

	// Event handlers
	function handleResize(){
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;
	}

	// 
	// START THE UPDATE LOOP
	//

	var count=0;

	document.getElementById('masthead').style.display = 'none';

	var messages = [

		"creative director",
		"works at Mindshapes",
		"making children's apps",
		"and games",
		"with a passion for",
		"interactive design",
		"R&D prototyping",
		"learning & education",
		"..."
	];
	var messageIndex = 0;
	var messageBuffer = "";

	function update(){

		// Update count
		cycleMessage(count);
		
		if(!settings.pause){

			// UPDATE STAGE
			if(count%settings.speed === 0){
				stage.update();
				stage.drawPattern(settings.bitmap,settings.scale);

				document.body.style.background = "url('"+imagePatternVGA(settings.bitmap,settings.scale).toDataURL('image/png')+"') repeat";


					if(settings.random){
						settings.bitmap = Math.floor(Math.random()*4096);
					}else{
						settings.bitmap++;
						settings.bitmap %= 4096;
					}
				
			}

			count++;
		}
		requestAnimFrame(update); // for animation
	}

	function cycleMessage(count){

		if(count > 0 && count%200 === 0){
			messageBuffer = "";
			messageIndex++;
			messageIndex = (messageIndex < messages.length)?messageIndex:0;
		}

		if(count%6 === 0){
			var currentMessage = messages[messageIndex];

			if(messageBuffer.length < currentMessage.length){
				messageBuffer = currentMessage.substr(0,messageBuffer.length+1);
			}

			// update message
			var msg = document.getElementById('bio-message');
			msg.innerText = messageBuffer;
		}
	}

	// START
	update();
};
