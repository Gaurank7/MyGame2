//child class of baseclass
//to create pigs in the game
class Pig extends BaseClass {
  constructor(x, y){
    super(x,y,50,50);
    this.image = loadImage("sprites/enemy.png");
    this.Visiblity = 255;
  }

 display(){
   //to remove the pig after getting hit by bird , logs or boxes
   if(this.body.speed < 3){
    super.display();
   }
   else{
     World.remove(world, this.body);
     push();
     this.Visiblity = this.Visiblity - 5;
     tint(255,this.Visiblity);
     image(this.image, this.body.position.x, this.body.position.y, 50, 50);
     pop();
   }
  }

  //to increase the score of player
  score(){
    if (this.Visiblity < 0 && this.Visiblity > -1005){
      score++;
    }
  }



};