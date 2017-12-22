//todo: add paramaters--finished
//possibly create new enemy class
//create an attack
//add a paramater for different images/animations
function Player(x,y,w,h,stats,enemyID,sprite) {
	if(stats===undefined) {
		this.stats = new Stats();
	}else {
		this.stats = stats;
	}
	this.playerId;
	this.health=5;
	this.maxHealth = 5;
	this.yvel=0;
	this.xvel=0;
	this.jumps=0;
	this.grounded=false;
	if (h ===undefined){
		this.HEIGHT=40;
	}else {
		this.HEIGHT=h;
	}
	this.height=this.HEIGHT;
	if (w ===undefined){
		this.WIDTH=40;
	}else {
		this.WIDTH=w;
	}
	this.width=this.WIDTH;
	this.exp=0;
	this.coins=0;
	this.level=1;
	this.hit=false;
	this.interact=false;
	
	if(enemyID===undefined) {
		this.playerId = 1;
	}else {
		this.playerId = enemyID;
	}
	this.jumpstate=-1;
	//this.wep = Sword();
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
		imageMode(CENTER);
		if(this.playerId==0) {
			fill(255);//color of player circle
			image(characterImg,this.x,this.y,this.width*2,this.height*2);
		}else{
			if(sprite===undefined) {
				image(slimeImg,this.x,this.y,this.width*2,this.height*2);
			}else {
				image(sprite,this.x,this.y,this.width*2,this.height*2);
			}
		}
		//ellipse(this.x,this.y,this.height*2,this.width*2);
		fill(0);//reset color
	}
	this.displayhealth = function() {
		if(this.playerId==0){
			if (this.health <=0) {//played died
				console.log("you have died");
			}
			for (var i=0; i<this.health;i++)
				ellipse(10+i*15,10,10,10);
		}else {
			fill(255,0,0);
			rect(this.x-this.width,this.y-this.height-15,this.WIDTH*2,10);
			fill(0,255,0);
			rect(this.x-this.width,this.y-this.height-15,this.WIDTH*2*this.health/5,10);
			fill(0);//reset colors
		}
	}	
	this.displayexp = function () {
		textSize(20);
		let baseExp = 150;
		text("Level "+this.level,width-250,30);
		text(""+this.exp+"/"+this.level*baseExp,width-140,50);
		rect(width-180,10,150,20);
		fill(0);
		if(this.exp>=this.level*baseExp) {
			this.exp=0;
			this.level++;
		}
		fill(255);
		rect(width-180,10,this.exp/this.level,20);

		fill(0);
	}
	this.displaygold = function() {
		text("Gold: ",width-350,30);
		text(this.coins,width-300,30)
	}
	this.displayInv = function() {
			var invImg; invImg =potionImg;
		for(let i = 0; i< inv.length;i++) {
			if(inv[0].id ==1 ){
				invImg =potionImg;
			}
			image(invImg,width-500-(i*width/40),30,width/40,width/40);
		}
	}
	this.bounds = function() {
  		if (this.y > height-this.height) {//grounded
			this.y=height-this.height;
			if (this.yvel > 30) {
				this.health--;
			}
			this.yvel=0;
			this.grounded =true;
    		this.jumps=1;
 		}else if (this.y< this.height){//ceiling
			this.y=this.height;
			this.yvel=0;
			this.jumps=0;
		}
		else{
			this.jumps=0;
			this.grounded=false;
		}
		if ( this.x>width-this.width) {//right
			this.x=width-this.width;
			this.xvel=0;
			if (this.playerId==0){
				if(confirm("Continue to next area?")) {
					currentLevel++;
				}
			}
		}else if (this.x <this.width){//left
			this.x=this.width;
			this.xvel=0;
			if (this.playerId==0){
				if(confirm("Continue to next area?")) {
					currentLevel--;
				}
			}
		}
		  
	}
	this.update = function() {
		if(this.grounded==true){
			this.jumps=1;
		}
		this.yvel+=grav;
		this.x+=this.xvel;
		this.y+=this.yvel;
		this.bounds();
	}
	this.jump = function() {
		if(this.jumps>0) {
			this.yvel=-this.stats.jmp;
			this.jumps=0;
			this.grounded=false;
		}
	}
	this.addItem = function(Item) {
		this.item.push(Item);
	}
	this.attack = function(Sword, Player) {
		Sword.swing=true;
		Sword.collision(Player);
	}
	this.ai = function(Player,type) {
		type=this.playerId
		if (type ==1) {//(standard following and walking)
			if(dist(Player.x,Player.y,this.x,this.y) < 500 ) {//player detected
				if(Player.x==this.x){
					this.xvel=0;
				}
				else {
					this.xvel = this.stats.speed*(Player.x-this.x)/abs(Player.x-this.x);
				}
				if (this.y-Player.y > 40 && abs(this.x-Player.x) < 200) {
					this.jump();
				}
			} else {
				this.xvel=0;
			}
		} else if (type ==2) {//slime jumping
			if(dist(Player.x,Player.y,this.x,this.y) < 500 || this.jumpstate!=-1) {//player detected
				if(this.grounded==true) {
					this.xvel=0;
					if(this.height>this.HEIGHT-5 && (this.jumpstate==0 || this.jumpstate==-1)){
						this.height-=.4;
						this.jumpstate =0;
					}else if(this.height<this.HEIGHT+5){
						this.height+=1;
						this.jumpstate=1;
					}else {
						this.jumpstate=-1;
						this.height=this.HEIGHT;
						this.jump();
						if (Player.x==this.x)
							this.xvel=0;
						else 
							this.xvel = this.stats.speed*(Player.x-this.x)/abs(Player.x-this.x);
					}
				}else {
				}
			}else {
				if(this.grounded==true) {
					this.xvel=0;
					this.height=this.HEIGHT;
				}
			}
				
		} else if (type ==-1) {//npc
			if(dist(Player.x,Player.y,this.x,this.y) < 200 ){
				if(Player.interact) {
					gameState=3;
				}
			}
		} else {

		}	

	}
	this.collision = function(Player) {//enemy collisions
		if (Player.playerId>0) {
			if (dist(this.x,this.y,Player.x,Player.y) <this.width+Player.width) {
				if (this.hit==false) {
					this.health--;
					Player.health--;
					this.exp+=10;//remove after exp generation added				
					this.hit=true;
					setTimeout(function(Player) {
						Player.hit=false;
					}, 1000,this);
				}
			}
		}
	}
}
function Sword(Stats) {
	this.stats = Stats;
	this.height = 80;
	this.width = 20
	this.x;
	this.y;
	this.rotation = 0;
	this.swing=false;
	this.show = function(Player) {
		if(Player.xvel>0) {
			this.x=Player.x+40;
			this.y=Player.y-70;
		}else {
			this.x=Player.x-this.width-40;
			this.y=Player.y-70;
		}

		fill(192,192,192);
		noStroke();
		push();
		translate(this.x,this.y);
		this.rotate();
		rect(0,0, this.width, this.height);
		pop();
		fill(0)
	}
	this.rotate= function() {
		if(this.swing==true) {
			if (this.rotation > 90) {
				this.rotation = 0;
				this.swing=false;
			} else {
				
				
				//rotate(radians(this.rotation));
				this.rotation+=5
			}
		}
		//rotate(radians(180));
		
	}
	this.collision = function(Player) {
		if (this.x+this.width*2 >= Player.x-Player.width
			&& this.x <= Player.x+Player.width
			&& this.y+this.height*2 >= Player.y-Player.height
			&& this.y <= Player.y+Player.height
			&& Player.hit==false){
				Player.hit=true;
				Player.health--;
				setTimeout(function(p1) {
					Player.hit=false;
				}, 1000,this);
		}	
	}
}