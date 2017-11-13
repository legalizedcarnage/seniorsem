//todo: add paramaters--finished
//possibly create new enemy class
//create an attack
//add a paramater for different images/animations
function Player(x,y,stats) {
	if(stats===undefined) {
		
	this.stats = new Stats();
	}else {
		this.stats = stats;
	}
	this.health=5;
	this.yvel=0;
	this.xvel=0;
	this.jumps=0;
	this.grounded=false;
	this.height=40;
	this.width=40;
	this.exp=0;
	this.coins=0;
	this.level=1;
	this.hit=false;
	this.player=false;
	this.jumpstate=0;
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
		if(this.player==true) {
			fill(255);//color of player circle
			image(characterImg,this.x,this.y,this.height*2,this.width*2);
		}else{
			image(slimeImg,this.x,this.y,this.height*2,this.width*2);
		}
		//ellipse(this.x,this.y,this.height*2,this.width*2);
		fill(0);//reset color
	}
	this.displayhealth = function() {
		if (this.health <=0) {
			//dead
		}
		for (var i=0; i<this.health;i++)
			ellipse(10+i*15,10,10,10);
		
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
	
	this.bounds = function() {
  		if (this.y > height-this.height) {//grounded
    		this.y=height-this.height;
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
			if (this.player==true){
				if(confirm("Continue to next area?")) {
					currentLevel++;
				}
			}
		}else if (this.x <this.width){//left
			this.x=this.width;
			this.xvel=0;
			if (this.player==true){
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
			this.yvel=-this.stats.speed*3;
			this.jumps=0;
			this.grounded=false;
		}
	}
	this.addItem = function(Item) {
		this.item.push(Item);
	}
	this.attack = function(Sword, Player) {
		Sword.collision(Player);
	}
	this.ai = function(Player,type) {
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
			if(dist(Player.x,Player.y,this.x,this.y) < 500 ) {//player detected
				if(this.grounded==true) {
					this.xvel=0;
					if(this.height>30 && this.jumpstate==0)
						this.height-=.2;
					else if(this.height<45){
						this.height+=2;
						this.jumpstate=1;
					}else {
						this.jumpstate=0;
						this.height=40;
						this.jump();
					}
				}else {
					if (Player.x==this.x)
						this.xvel=0;
					else 
						this.xvel = this.stats.speed*(Player.x-this.x)/abs(Player.x-this.x);
				}
			}else {
				this.xvel=0;
				this.height=40;
			}
				
		} else if (type ==3) {

		} else {

		}	

	}

	this.collision = function(Player) {
		//if collided 
		if (dist(this.x,this.y,Player.x,Player.y) <this.width+Player.width) {
			if (this.hit==false) {
				this.health--;
				Player.health--;
				this.exp+=10;//remove after exp generation added				
				this.hit=true;
				setTimeout(function(p1) {
					p1.hit=false;
				}, 1000,this);
			}
		}
	}
}
function Sword() {
	this.stats = new Stats();
	this.width = 10;
	this.height = 80;
	
	this.show = function(Player) {
		//fill(255)
		//rectMode(CENTER);
		rect(Player.x+40,Player.y-70, this.width, this.height);
	}
	this.collision = function(Player) {
		//player touches sword
		Player.health--;
	}
}