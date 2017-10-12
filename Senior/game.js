
function Structure() {
	this.xvel=0;
	this.yvel=0;
	this.speed=1;
	this.height=40;
	this.width=40;
	this.x=width/2+100;
	this.y=height-this.height*2;

	this.show = function() {
		rect(this.x,this.y,this.height*2,this.width*2);
	}
	this.collision= function(Player) {
		if (this.x+this.width*2 >= Player.x-Player.width
		 && this.x <= Player.x+Player.width
		 && this.y+this.height*2 >= Player.y-Player.height
 		 && this.y <= Player.y+Player.height) {
			//collision detected
			Player.health--;
			let xdis = Player.x-this.x+this.width;
			let ydis = Player.y-this.y+this.height;
			//Player.xvel=xdis;
			Player.xvel*=-1;
			Player.yvel*=-1;
		}
	}
}
var p1, x,y,xvel,yvel,grav,speed;
var img;
var wall = [];
var enems = [];
function preload() {
	img = loadImage('/Images/falcon.png');
}
function setup() {
	//image(img,width/2,height/2);
	createCanvas(1200, 800);
	p1 = new Player();
	wall.push(new Structure());
	enems.push(new Player());
	grav = 1;
}

function draw() {
	//background
	background(200);	
	for (var i=0; i<wall.length;i++) {//display walls
		wall[i].show();
	}
	//foreground
	p1.yvel+=grav;
	p1.update(); 
	p1.bounds();
	for (var i=0; i<wall.length;i++) {
		wall[i].collision(p1);
	} 
	p1.show();
	for (var i=0; i<enems.length;i++) {//display enemies
		enems[i].show();
	}
	//ui
	p1.displayhealth();
}

function keyPressed(){
	if (keyCode== 68) {//d
		p1.xvel=p1.speed;
	}
	else if (keyCode == 65) {//a
		p1.xvel=-p1.speed;
	}
	else if (keyCode ==83) {//s
		p1.yvel=p1.speed;
	}
	else if (keyCode ==87) {//w
		p1.jump();
	}else if (keyCode ==32) {//space
		p1.attack();
	}
}
function keyReleased(){
	if (keyCode== 68 &&p1.xvel>0) {//d
		p1.xvel=0;
	}
	else if (keyCode == 65&&p1.xvel<0) {//a
		p1.xvel=0;
	}
	else if (keyCode ==83&&p1.yvel>0) {//s
		p1.yvel=0;
	}
	else if (keyCode ==87&&p1.yvel<0) {//w
		p1.yvel=0;
	}
}