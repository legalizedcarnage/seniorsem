function init(level) {
    
    if (wall.length>0||enems.length>0||items.length>0) {
        enems.splice(0,enems.length);
		wall.splice(0,wall.length);
		items.splice(0,items.length);
		p1.x=p1.width;
		p1.y=height-p1.height;
    }

    //levels
    //enems.push adds enemies to the level
    //wall.push adds walls to the level
	//can define the x and y coordinates using first 2 paramaters 
	//can define size in next 2 paramater
    //can define stats for enemies in fith paramater
    //can define ai type in 6th (1 = basic, 2 = slime, -1 = npc)
    if (level==0) {
		for(let i = 0;i < 10;i++) {
			wall.push(new Structure(width/2+i*70,height-200-i*50));
			wall.push(new Structure(width/2+i*70+70,height-200-i*50));
		}
		wall.push(new Structure(width/2+10*70,height-200-9*50))
		items.push(new item(width/2+700,height-200-500,0,0,0,5));
        enems.push(new Player(0,height-40,40,40,Enemy1_s,2));
        enems.push(new Player(width,height-40,40,40,Enemy1_s,2));
    }else if (level==1) {
        wall.push(new Structure(width/2,height/2));
        enems.push(new Player(width,height-40,40,60,Enemy1_s,-1,characterImg));
    } else {
        wall.push(new Structure());
        enems.push(new Player(width,height-40,40,40,Enemy1_s,1));
    }
       
    
}
function Structure(x,y,w,h) {
	this.xvel=0;
	this.yvel=0;
	if (h===undefined) {
		this.height=40;
	}else {
		this.height = h;
	}
	if(w===undefined) {
		this.width=40;
	}else {
		this.width=w;
	}
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
		rect(this.x,this.y,this.width*2,this.height*2);
	}
	this.collision= function(Player) {
		if (this.x+this.width*2 >= Player.x-Player.width
		 && this.x <= Player.x+Player.width
		 && this.y+this.height*2 >= Player.y-Player.height
 		 && this.y <= Player.y+Player.height) {
			if(Player.playerId ==0) {
				//console.log(abs(abs(this.x-Player.x)-this.width));
				//console.log(abs(this.y+this.height-Player.y));
			}
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