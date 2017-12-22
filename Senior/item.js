function generateItem(x,y,enemId) {
	items.push(new item(x,y,0));
	//items.push(new item(x,y,0));
	if(enemId == 2	) {
		items.push(new item(x,y,1));
	}
}

function item(x,y,id,vel,stats,value) {
	if(id===undefined){
		this.id=0;
	}else {
		this.id = id;
	}
	this.value;
	this.stats = stats;
	if(x===undefined){
		this.x = width/2;
	}else {
		this.x=x+Math.floor((Math.random() * 5) + 1);
	}
	if(y===undefined){
		this.y=height/2;
	}else{
		this.y=y;
	}
	this.width=width/50;
	this.height=this.width;
	if(vel===undefined){
		this.xvel = Math.floor((Math.random() * 5));
		this.yvel = -10;
	}else {
		this.xvel=0;
		this.yvel=0;
	}
	this.collected = false;
	
	if(this.id==0){
		if(value===undefined) {
			this.value=1;
		}else {
			this.value=value;
		}
	}
    this.effect= function(){
        if(this.id == 0) {//coin
			//define function
		}else if(this.id ==1) {
			if(p1.health < p1.maxHealth) {
				p1.health+=2;
				if(p1.health > p1.maxHealth) {
					p1.health = p1.maxHealth;
				}
				inv.splice(0,1);
			}
		}
		
    }
	this.update = function() {
		if(this.grounded) {
			this.xvel=0;
		}
		this.yvel+=grav;
		this.x+=this.xvel;
		this.y+=this.yvel;
		this.bounds();
	}
	this.bounds = function() {
		if (this.y > height-this.height) {//grounded
		  this.y=height-this.height;
		  this.yvel=0;
		  this.grounded =true;	
		}else if (this.y< this.height){//ceiling
		  this.y=this.height;
		  this.yvel=0;
		}
	  	if ( this.x>width-this.width) {//right
		  this.x=width-this.width;
		  this.xvel=0;
	  	}else if (this.x <this.width){//left
		  this.x=this.width;
		  this.xvel=0;
	  	}
		
  }
	this.show = function() {
		if(this.collected == false){
			if(this.id ==0) {
				imageMode(CENTER);
				image(moneyImg,this.x,this.y,this.width*2,this.height*2);
				/*fill(255,223,0);
				ellipse(this.x,this.y,this.width,this.height);
				fill(0);*/
			}else if (this.id==1) {
				image(potionImg,this.x,this.y,this.width*2,this.height*2);
			}
		}
	}
	this.collision = function(Player,index) {
		if(this.collected==false){
			if (dist(this.x,this.y,Player.x,Player.y) <(this.width+Player.width)) {
				if(this.id==0) {
					Player.coins+=this.value;
				}else {
					inv.push(this);
				}
				this.collected = true;
				items.splice(index,1);
			}
		}
	}
}