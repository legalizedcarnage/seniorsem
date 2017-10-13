//todo: add paramaters
//possibly create new enemy class
//create an attack

function Player(x,y) {

	this.stats = new Stats();
	this.health=5;
	this.yvel=0;
	this.xvel=0;
	this.jumps=0;
	this.speed=10;
	this.height=40;
	this.width=40;
	if(x===undefined) {
		this.x = width/2;
	}else {
		this.x= x;
	}
	if (y===undefined){
		
		this.y=height-this.height;
	}else {
		this.y = y;
	}
	this.items = [];
	
	this.show = function() {
		ellipse(this.x,this.y,this.height*2,this.width*2);
		//imageMode(CENTER);
		//image(img,this.x,this.y,this.height*2,this.width*2);
	}
	this.displayhealth = function() {
		for (var i=0; i<this.health;i++)
			ellipse(10+i*15,10,10,10);
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
	this.update = function() {
		this.x+=this.xvel;
		this.y+=this.yvel;
		this.bounds();
	}
	this.jump = function() {
		if(this.jumps>0) {
			this.yvel=-this.speed*3;
			this.jumps=0;
		}
	}
	this.addItem = function(Item) {
		this.item.push(Item);
	}
	this.attack = function(Sword, Player) {
		Sword.collision(Player);
	}
	this.ai = function(Player,type) {
		if (type ==1) {//first ai type
			if(dist(Player.x,Player.y,this.x,this.y) < 500 ) {//player detected
				if(Player.x-this.x ==0){
					this.xvel=0;
				}
				else {
					this.xvel = this.speed*(Player.x-this.x)/abs(Player.x-this.x);
				}
				if (this.y-Player.y > 40) {
					this.jump();
				}
			} else {
				this.xvel=0;
			}
		} else if (type ==2) {
			
		} else if (type ==3) {

		} else {

		}	

	}
	this.collision = function(Player) {
		//if collided 
		if (false) {
			if (this.hit==true) {
				this.health--;
				setTimeout(function() {
					this.hit=false;
				}, 500);
			}
		}
	}
}
function Sword() {
	this.stats = new Stats();
	this.width = 10;
	this.height = 80;
	
	this.show = function(Player) {
		//fill(255);
		//rectMode(CENTER);
		rect(Player.x+40,Player.y-70, this.width, this.height);
	}
	this.collision = function(Player) {
		//player touches sword
		Player.health--;
	}
}