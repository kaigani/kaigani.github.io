(function(window){

window.Stage = function Stage(aCanvas){

	var stage = this; // javascript nonsense

	var canvas = aCanvas;
	var c = canvas.getContext('2d');
	c.webkitImageSmoothingEnabled = false;

	this.update = function(){
		c.clearRect(0,0,canvas.width,canvas.height);
		
		c.fillStyle = 'orangered'; // in case of failure - background will be orange red
		c.fillRect(0,0,canvas.width,canvas.height);
	};

	this.drawPattern = function(bitmap,scale){

		// Fill the canvas with the pattern
		c.fillStyle = canvasPatternVGA(bitmap,scale);
		c.fillRect(0,0,canvas.width,canvas.height);

		// Title text
		c.fillStyle = 'white';
		c.font = '64px DOS_2';
		c.textBaseline = 'top';
		var text = window.settings.banner || "kaigani turner";
		var textWidth = c.measureText(text).width;

		// responsive canvas - whut!

		if(canvas.width < 520){
			c.font = '48px DOS_2';
			textWidth = c.measureText(text).width;
		}

		if(canvas.width < 800){
			c.fillText(text, canvas.width/2-textWidth/2, canvas.height-320);
		}else{
			c.fillText(text, canvas.width/2-textWidth/2, canvas.height/2-32);
		}

	};
};

})(window);

