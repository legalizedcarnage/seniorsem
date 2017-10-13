
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
			//collision detected(needs improvement)
			Player.xvel*=-1;
			Player.yvel*=-1;
			Player.x+=Player.xvel;
			Player.y+=Player.yvel;
		}
	}
}
var p1;
var img;
var wall = [];
var enems = [];
function preload() {
	try{
		//img = loadImage('Images/falcon.png');
	} catch(err) {

	}
}
function setup() {
	//image(img,width/2,height/2);
	createCanvas(1200,800);
	p1 = new Player();
	wep = new Sword();
	wall.push(new Structure());
	enems.push(new Player(0,height-40));
	enems[0].speed=5;
	grav = 1;
}

function draw() {
	//update functions
	p1.yvel+=grav;
	p1.update(); 
	
	for (var i=0; i<wall.length;i++) {//wall collision
		wall[i].collision(p1);
		for (var j=0; j < enems.length;j++) {
			wall[i].collision(enems[j]);
		}
	} 
	for (var i=0; i<enems.length;i++) {//enemy collision
		
		enems[i].ai(p1,1);
		enems[i].yvel+=grav;
		enems[i].update();
		//p1.collision(enems[i]);
	} 
///start draw
	//background
	background(200);	
	//Midground
	for (var i=0; i<wall.length;i++) {//display walls
		wall[i].show();	
	}
	//foreground
	p1.show();
	//wep.show(p1);
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
		p1.attack(wep,enems[0]);
	}
}
function keyReleased(){
	if (keyCode== 68 &&p1.xvel>0) {//d
		p1.xvel=0;
	}
	else if (keyCode == 65 &&p1.xvel<0) {//a
		p1.xvel=0;
	}
	else if (keyCode ==83 &&p1.yvel>0) {//s
		p1.yvel=0;
	}
	else if (keyCode ==87 &&p1.yvel<0) {//w
		p1.yvel=0;
	}
}