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
					//Player.xvel=0;
				}
				else if(this.x+this.width-Player.x<0) {//right
					Player.x=this.x+this.width*2+Player.width;
					//Player.xvel=0;
				}
			} else {
				if(this.y+this.height-Player.y>0 && Player.yvel>0) {//top
					Player.y=this.y-Player.height;
					Player.yvel=0;
					Player.grounded=true;
					Player.jumps = 1;
				}else if(this.y+this.height-Player.y<0 && Player.yvel<0){//bottom
					Player.y=this.y+this.height*2+Player.height;
					Player.yvel=0;
				}
			}			
		}
	}
}
function coin(x,y) {
	this.value=1;
	if(x===undefined){
		this.x = width/2;
	}else {
		this.x=x;
	}
	if(y===undefined){
		this.y=height/2;
	}else{
		this.y=y;
	}
	this.width=width/50;
	this.height=this.width;
	this.xvel = 0;
	this.yvel = -10;
	this.collected = false;
	this.update = function() {
		this.yvel+=grav;
		this.x+=this.xvel;
		this.y+=this.yvel;
		this.bounds();
	}
	this.bounds = function() {
		if (this.y > height-this.height/2) {//grounded
		  this.y=height-this.height/2;
		  this.yvel=0;
		}else if (this.y< this.height/2){//ceiling
		  this.y=this.height;
		  this.yvel=0;
		}
	  	if ( this.x>width-this.width/2) {//right
		  this.x=width-this.width/2;
		  this.xvel=0;
	  	}else if (this.x <this.width/2){//left
		  this.x=this.width/2;
		  this.xvel=0;
	  	}
		
  }
	this.show = function() {
		if(this.collected == false){
			fill(255,223,0);
			ellipse(this.x,this.y,this.width,this.height);
			fill(0);
		}
	}
	this.collision = function(Player,index) {
		if(this.collected==false){
			if (dist(this.x,this.y,Player.x,Player.y) <(this.width+Player.width)) {
				Player.coins+=this.value;
				this.collected = true;
				coins.splice(index,1);
			}
		}
	}
}
var p1, wep, img, gameState, level, currentLevel;
var wall = [];
var enems = [];
var coins = [];
function preload() {
	//load images
	characterImg = loadImage('Images/falcon.png');
	groundImg = loadImage('Images/ground.gif');
	skyImg = loadImage('Images/sky2.jpg');
	treeImg = loadImage('Images/trees.gif');
	slimeImg = loadImage('Images/slime.png');
	
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
	coins.push(new coin());
	
}

function draw() {
	if (gameState==2) {
		//create menu: draw, update, and init functions
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
				enems[i].ai(p1,2);
			}
			enems[i].update();
			p1.collision(enems[i]);
			if(enems[i].health==0){//enemy died
				coins.push(new coin(enems[i].x,enems[i].y-100));
				enems.splice(i,1);
			}
		} 
		for(let i=0; i<coins.length;i++) {
			coins[i].collision(p1);
		}
	///start draw
		//background
		imageMode(CORNER);
		background(skyImg);	
		//Midground
		imageMode(CENTER);
		image(groundImg,height,0,height*2,width);
		for (let i=0; i<wall.length;i++) {//display walls
			wall[i].show();	
		}
		//foreground
		p1.show();
		//wep.show(p1);
		for(let i=0; i<coins.length;i++) {
			coins[i].update();
			coins[i].show();
		}
		for (let i=0; i<enems.length;i++) {//display enemies
			enems[i].show();
		}
		//ui
		p1.displayhealth();
		p1.displayexp();
		p1.displaygold();
	}
}
function mousePressed(){
	ellipse(mouseX,mouseY,5,5);
	return false;
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