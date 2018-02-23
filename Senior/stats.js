function Stats(atk,def,spd,spc,jmp,hp) {
    this.attack = atk;
    this.defence= def;
    this.speed = spd;
    this.special =spc;
    this.jmp= jmp;//jump height
    this.hp=hp;
}
//define character stats
var Enemy1_s = new Stats(0,0,5,0,25,5);
var P1_s = new Stats(0,0,10,0,30,10);

//define item stats
var sword1 = new Stats(2,0,0,0,0,0);
var arrow1 = new Stats(2,0,0,0,0,0);
var arrow2 = new Stats(4,0,0,0,0,0);

var armor1 = new Stats(0,2,0,0,0,1);
var helm1 = new Stats(0,2,0,0,0,0);