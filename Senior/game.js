function Structure(x,y) {
	this.xvel=0;
	this.yvel=0;
	this.height=40;
	this.width=40;
	if (x===undefined)  {
		this.x=width/2+100;
	} else {
		this.x=x;
	}
	if (y===undefined) {
		this.y=height-this.height*2;
	}else {
		this.y=y;
	}

	this.show = function() {
		rect(this.x,this.y,this.height*2,this.width*2);
	}
	this.collision= function(Player) {
		if (this.x+this.width*2 >= Player.x-Player.width
		 && this.x <= Player.x+Player.width
		 && this.y+this.height*2 >= Player.y-Player.height
 		 && this.y <= Player.y+Player.height) {
			//collision detected(needs improvement)
			if(abs(this.x+this.width-Player.x) >abs(this.y+this.height-Player.y)) {
				if(this.x+this.width-Player.x>0) {//left
					Player.x=this.x-Player.width;
				}
				else if(this.x+this.width-Player.x<0) {//right
					Player.x=this.x+this.width*2+Player.width;
				}
			} else {
				
				Player.yvel*=-1;
				Player.y+=Player.yvel;
			}			
		}
	}
}
var p1, wep, img, gameState, level, currentLevel;
var wall = [];
var enems = [];
function preload() {
	//img = loadImage('Images/falcon.png');
	
}
function setup() {
	//image(img,width/2,height/2);
	createCanvas(1600,800);
	gameState=1;
	level=-1;
	currentLevel=0;	
	grav = 1;
	p1 = new Player(width/2,height-40,P1_s);
	p1.player = true;
	
}

function draw() {
	if (gameState==2) {
		//create menu draw, update, and init functions
	}
	else if(gameState==1) {
		if(currentLevel != level) {
			//init level
			init(currentLevel);
			level=currentLevel;
		}
		//update functions
		p1.update(); 
		
		for (let i=0; i<wall.length;i++) {//wall collision
			wall[i].collision(p1);
			for (let j=0; j < enems.length;j++) {
				wall[i].collision(enems[j]);
			}
		} 
		for (let i=0; i<enems.length;i++) {//enemy collision
			if(frameCount % 2 == 0) {//activate enemy ai every 2 frames
				enems[i].ai(p1,1);
			}
			enems[i].update();
			p1.collision(enems[i]);
		} 
	///start draw
		//background
		background(200);	
		//Midground
		for (let i=0; i<wall.length;i++) {//display walls
			wall[i].show();	
		}
		//foreground
		p1.show();
		//wep.show(p1);
		for (let i=0; i<enems.length;i++) {//display enemies
			enems[i].show();
		}
		//ui
		p1.displayhealth();
		p1.displayexp();
	}
}

function keyPressed(){
	if (keyCode== 68) {//d
		p1.xvel=p1.stats.speed;
	}
	else if (keyCode == 65) {//a
		p1.xvel=-p1.stats.speed;
	}
	else if (keyCode ==83) {//s
		p1.yvel=p1.stats.speed;
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