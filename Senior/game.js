var p1, wep, img, gameState, level, currentLevel, z_lock;
var wall = [];
var enems = [];
var items = [];
var inv = [];
function preload() {
	//load images
	characterImg = loadImage('Images/falcon.png');
	groundImg = loadImage('Images/ground.gif');
	skyImg = loadImage('Images/sky2.jpg');
	treeImg = loadImage('Images/trees.gif');
	slimeImg = loadImage('Images/slime.png');
	moneyImg = loadImage('Images/money.png');
	potionImg = loadImage('Images/healthPotion.png');
	
}
function setup() {
	//image(img,width/2,height/2);
	createCanvas(1600,800);
	z_lock= false;
	gameState=1;
	textState=0;
	level=-1;
	currentLevel=0;	
	grav = 1;
	wep=new Sword();
	p1 = new Player(width/2,height-40,40,60,P1_s,0);
	
}

function draw() {
	if (gameState==2) {
		textSize(30);
		text("Paused",width/2,height/2);
		
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
			for(let j =0; j< items.length;j++) {
				wall[i].collision(items[j]);
			}
		} 
		for (let i=0; i<enems.length;i++) {//enemy collision
			if(frameCount % 2 == 0) {//activate enemy ai every 2 frames
				enems[i].ai(p1,2);
			}
			enems[i].update();
			p1.collision(enems[i]);//check for player
			wep.collision(enems[i]);//check for weapon
			if(enems[i].health==0){//enemy died
				p1.exp+=100;
				generateItem(enems[i].x,enems[i].y-100,enems[i].playerId);
				//items.push(new coin(enems[i].x,enems[i].y-100));
				enems.splice(i,1);
			}
		} 
		for(let i=0; i<items.length;i++) {
			items[i].collision(p1,i);
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
		for(let i=0; i<items.length;i++) {
			items[i].update();
			items[i].show();
		}
		for (let i=0; i<enems.length;i++) {//display enemies
			enems[i].show();
			enems[i].displayhealth();
		}
		//ui
		p1.displayhealth();
		p1.displayexp();
		p1.displaygold();
		p1.displayInv();
	}else if(gameState==3) {
		if(p1.interact) {
			npc();
		}
	}
	
}
function npc() {
		if(textState==0){
			textbox("npc text");
			textState++;
		}else if(textState==1){
			textbox("npc text #2");
			textState++;
		}else {
			textState=0;
			gameState=1	;
		}
	p1.interact=false;
}
function textbox(buffer) {
	fill(0);
	rect(0,height-height/5,width,height/5);
	fill(255);
	textSize(30);
	
	text(buffer,width/2,height-height/10);
	fill(0);
}
function mousePressed(){
	//ellipse(mouseX,mouseY,5,5);
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
		//p1.yvel=p1.stats.speed;
	}
	else if (keyCode ==87) {//w
		p1.jump();
	}else if (keyCode ==32) {//space
		p1.attack(wep,enems[0]);
	}else if(keyCode == 27){//escape
		if(gameState==2)
			gameState=1;
		else 
			gameState=2;
	}else if(keyCode == 90) {//z
		
			p1.interact =true;
	
		
	}else if (keyCode == 49) {//1
		if(inv.length > 0 ) {
			inv[0].effect();
		}
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
		//p1.yvel=0;
	}
	else if (keyCode ==87 &&p1.yvel<0) {//w
		//p1.yvel=0;
	}else if(keyCode == 27){//escape
		
	}else if(keyCode == 90) {//z
		
	}
}