//todo: add paramaters
//possibly create new enemy class
//create an attack

function Player() {
	this.health = 5;
	this.xvel=0;
	this.yvel=0;
	this.jumps=0;
	this.speed=10;
	this.height=40;
	this.width=40;
	this.x=width/2;
	this.y=height-this.height;
	
	this.show = function() {
		ellipse(this.x,this.y,this.height*2,this.width*2);
		//imageMode(CENTER);
		//image(img,this.x,this.y,this.height*2,this.width*2);
	}
	this.displayhealth = function() {
		for (var i=0; i<this.health;i++)
			ellipse(10+i*15,10,10,10);
	}
	this.update = function() {
		this.x+=this.xvel;
		this.y+=this.yvel;
	}
	this.bounds = function() {
  		if (this.y > height-this.height) {//grounded
    			this.y=height-this.height;
			this.yvel=0;
    			this.jumps=1;
 		}else if (this.y< this.height){
			this.y=this.height;
  		}
	}
	this.jump = function() {
		if(this.jumps>0) {
			this.yvel=-this.speed*3;
			this.jumps=0;
		}
	}
	this.attack = function() {
	
	}
	this.ai = function(Player) {
		if(dist(Player.x,this.x,Player.y,this.y) < 100) {
			this.xvel = (Player.x-this.x)/abs(Player.x-this.x);
		}
	}
}