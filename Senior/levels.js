function init(level) {
    
    if (wall.length>0) {
        enems.splice(0,enems.length);
        wall.splice(0,wall.length);
    }

    //levels
    //enems.push adds enemies to the level
    //wall.push adds walls to the level
    //can define the x and y coordinates using first 2 paramaters 
    //can define stats for enemies in third paramater
    
    if (level==0) {
        wep = new Sword();
        wall.push(new Structure());
        enems.push(new Player(0,height-40,Enemy1_s));
    }else if (level==1) {
        wep = new Sword();
        wall.push(new Structure(width/2,height/2));
        enems.push(new Player(0,height-40,Enemy1_s));
    } else {
        wep = new Sword();
        wall.push(new Structure());
        enems.push(new Player(0,height-40,Enemy1_s));
    }
    
       
    
}