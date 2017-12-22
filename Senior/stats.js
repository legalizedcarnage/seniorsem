function Stats(atk,def,spd,spc,jmp) {
    this.attack = atk;
    this.defence= def;
    this.speed = spd;
    this.special =spc;
    this.jmp= jmp;//jump height
}
//define character stats
var Enemy1_s = new Stats(0,0,5,0,15);
var P1_s = new Stats(0,0,10,0,20);

//define item stats
var sword1 = new Stats(5,0,0,0,0);