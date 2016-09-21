$(document).ready(function(){
	
document.body.onmousedown = function() { return false; } //so page is unselectable

	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var mx, my;

	
	/////////variables for menus/////////////
	
	var screenNum; //this is used to switch between screens within the game
	var playerName; //the player can input their name
	var startMenuBackground= new Image();//the background for the start screen
	var creditButton= new Image();//this is for the image I made in fireworks for the menu buttons
	var helpButton= new Image();//this is for the image I made in fireworks for the menu buttons
	var helpMenu= new Image();//this is for the image I made in fireworks for the menu buttons
	var scoreButton= new Image();//this is for the image I made in fireworks for the menu buttons
	var backButton= new Image();//this is for the image I made in fireworks for the menu buttons
	var gameover= new Image();//this is an image I got from google that matched the theme of the game
	var backgroundMusic= new Audio();//this song is one I got from youtube to give an arcade feel to the game
	var creditButtonX;// x values for the specific button
	var creditButtonY;// y values for the specific button
	var scoreButtonX;// x values for the specific button
	var scoreButtonY;// y values for the specific button
	var helpButtonX;// x values for the specific button
	var helpButtonY;// y values for the specific button
	var backButtonX;// x values for the specific button
	var backButtonY;// y values for the specific button
	
	var amountOfScores;//This is for the scores menu, its used in a sorting algorithm later
	var scores=[];//this array holds scores that I use in a sorting algorithm later
	var time=0;//this variable holds the time value
	
	///////////////////////////////////////////
	
	
	//////////variables for the gun//////////////
	var gunPic= new Image();//the image used to draw the gun
	var gunX;//the guns x value
	var gunY;// the guns y value
	var gunW;//the guns width
	var gunH;// the guns height
	var gunSound= new Audio();//the sound the gun makes
	
	
	////////////variables for the bullets////////////////
	var bulletX;//the bullets x value
	var bulletY;// the bullets y value
	var bulletW;//the width of the bullet
	var bulletH;//the height of the bullet
	var bulletYOriginal;//this Y value never changes, is used to reset the bullets position
	var bulletSpeedY;//the speed of the bullet(what will be added to the bullets y value)
	
	////variables for the satellite targets///////
	var satArray=[];//this array holds the satellite
	var amountOfSats;//used in a for loop
	var satPic=new Image();//the pic I used for the satellites
	
	///////////variables for the alien///////////
	var alienArray=[]; //this array holds the aliens
	var amountOfAliens;//used in the initial for loop
	var alienPic= new Image();//the pic used for the alien
	
	
	////////////variables for the 2d grid/////////////
	var my2DArray = []; 
	var acrossVal;
	var downVal;
	var blockX;
	var	blockY;
	
	
	
	/////////////////////////////////
	////////////////////////////////
	////////	GAME INIT
	///////	Runs this code right away, as soon as the page loads.
	//////	Use this code to get everything in order before your game starts 
	//////////////////////////////
	/////////////////////////////
	function init()
	{

	//////////
	///STATE VARIABLES
	
	////All gun variables
	gunPic.src='gun.png';
	gunSound.src='laser.mp3';
	gunW=100;
	gunH=100;
	gunY=h-gunH;
	
	//////All 2D array variables
	for(var i = 0; i < acrossVal; i++){
		my2DArray[i] = [];
			for(var j = 0; j < downVal; j++){
				my2DArray[i].push(Math.floor(Math.random()*100))
				}
	}
	acrossVal=64;
	downVal=70;
	blockX=10;
	blockY=10;
	
	/////Satellite variables//////
	amountOfSats=5;
	satPic.src='satellite.png';
	
	
	/////Bullet variables//////////
	bulletYOriginal=h-50;
	bulletY= h-50;
	bulletX= mx;
	bulletW=5;
	bulletH=30;
	bulletSpeedY=15;
	
	////Variables for the aliens////////
	amountOfAliens=15;
	alienPic.src='alien.png';

	
	/////Variables for the start screen////
	screenNum=0;
	playerName= prompt("What is your name?", "Your name")
	startMenuBackground.src='spacebackground.jpg';
	gameover.src='gameover.jpg';
	creditButton.src='credits button.png';
	helpButton.src='help button.png';
	helpMenu.src='help menu.png';
	scoreButton.src='scores button.png';
	backButton.src='back button.png';
	creditButtonX=100;
	creditButtonY=150;
	scoreButtonX=100;
	scoreButtonY=250;
	helpButtonX=100;
	helpButtonY=350;
	backButtonX=-90;
	backButtonY=h-150;
	backgroundMusic.src='backgroundmusic.mp3';
	
	amountOfScores=5;
	
	
	
	for(var i=0;i<amountOfScores;i++)
	{
		scores[i]=Math.floor(Math.random()*100)+100//this for loop generates random scores for the score menu
	}
	
	//////////////////////
	///GAME ENGINE START
	//	This starts your game/program
	//	"paint is the piece of code that runs over and over again, so put all the stuff you want to draw in here
	//	"60" sets how fast things should go
	//	Once you choose a good speed for your program, you will never need to update this file ever again.

	if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 10);
	}

	init();	
	


	
	
	///////////////////////////////////////////////////////
	//////////////////////////////////////////////////////
	////////	Main Game Engine
	////////////////////////////////////////////////////
	///////////////////////////////////////////////////
	function paint()
	{
			
		gunX=mx-50;//this draws the gun aligned with the mouse cursor
		bulletX= mx;//this draws the bullet at the mx value
		
		backgroundMusic.play();//plays the main song of the game
		
		if(screenNum==0){//everything in the main menu
		ctx.drawImage(startMenuBackground, 0, 0, w, h);//the background of the start menu covers the entire screen
		ctx.font = "45px fantasy";//sets the font for the intro message
		ctx.fillStyle= 'red';//sets the colour of the intro message
		ctx.fillText("Welcome to Defender ", 110,100);// The intro message
		ctx.fillText( playerName + "!", 200,150);
		ctx.fillText("Press 'enter' in this menu to start!", 10, h-100)

		alternateScreens();// run the alternate screens function
		
		}
		
		if(screenNum==3)//this screen brings up the help menu
		{
			ctx.fillStyle='black'
			ctx.fillRect(0,0,w,h)
			ctx.drawImage(helpMenu,0,0,w,h)
		}
		if(screenNum==2)//credits screen
		{
			ctx.fillStyle='black';
			ctx.fillRect(0,0,w,h);
		}
		
		if(screenNum==4)//the score screen is where I implement some recursion and algorithm because it is unnecessary in my game
		{
			ctx.fillStyle='black';
			ctx.font = "32px fantasy";//sets the font specific to this menu
			ctx.fillRect(0,0,w,h);
			ctx.fillStyle='red';
			helpScreen(0)//runs the recursive function to draw the horizontal lines
			ctx.fillRect(113.33,0,1,h);	//draws the first line down
			ctx.fillText("Rank", 10, 70);//writes"rank"
			ctx.fillText("Player Name", 130, 70);//writes "player name"
			ctx.fillText("Time survived(s)", 370, 70);//writes "time survived(s)"
			ctx.fillRect(340,0,1,h);//draws the second line down
			ranks(1);//writes the numbers using recursion
			ctx.fillText("Your name", 130, 170);//writes the first name
			ctx.fillText("julian15", 130, 270);//writes the second name
			ctx.fillText("raimiroxx", 130, 370);//writes the third name
			ctx.fillText("star_paolo", 130, 470);//writes the fourth name
			ctx.fillText("da Nus", 130, 570);//writes the fifth name
			for(var i=0;i<scores.length;i++)
				{
					ctx.fillText(scores[i], 370, 170+(100*i))//draws the time survived values
				}
			scoreSort();//runs the sort algorithm to 
			
		}
		
		if(screenNum==2){
			
			ctx.fillStyle='yellow';
			ctx.font='32px fantasy';
			helpScreen(0)//runs the recursive function to draw the horizontal lines
			ctx.fillRect(w/2,0,1,h);//draws the first line down
			ctx.fillText("Department", 10, 70);//writes "department"
			ctx.fillText("Credit goes to:", 330, 70);//writes "credit goes to "
			ctx.fillText("Design", 10, 170);
			ctx.fillText("Music Integration", 10, 270);
			ctx.fillText("Idea and Concept", 10, 370);
			ctx.fillText("Code", 10, 470);
			ctx.fillText("Testing and Debugging", 10, 570);
			
			for(var i=0;i<5;i++){
				
				ctx.fillText("Nusair Haq",370,170+(100*i))
			}
			
		}
		
		
		
		if(screenNum == 2 || screenNum == 3 || screenNum == 4)//if the screen num is anything other than the main or game over scree, draw the back button
		{
			ctx.drawImage(backButton, backButtonX, backButtonY, 400, 175);
		}
		
		if(screenNum ==5){//the game over screen
			ctx.drawImage(gameover, 0,0,w,h);
			ctx.fillStyle='red';
			ctx.fillText("Game over",100,100);
			ctx.fillText(playerName+" survived " +Math.floor(time/99.9)+ " seconds" ,100,150);//this displays how long the player survived
			}
		
		console.log(screenNum);//for developer debugging
		
		/////////Screen one is the main game screen/////////////
		if(screenNum==1)
		{
			ctx.fillStyle='grey';//when entering the game, the background is back
			ctx.fillRect(0,0,w,h);
			if(time>=0){time++;}//always count up the time value
			
			
			
			//2D Array///
			for(var i = 0; i < acrossVal; i++){
				for(var j = 0; j < downVal; j++){
					ctx.fillStyle='black';//make each square of the 2d array black
					ctx.fillRect(0+ 1.1*(blockX*i),0+1.1*(blockY*j),blockX,blockY);//draw the 2d array with gaps in between to give it a typical grid look
					}
					}
			////////////
		
			///////Satellite Drawing/////////
			for(var i = 0; i < satArray.length; i++){//Each possible value of the satellite array displays the contents of the drawingSat function
				satArray[i].drawingSat();
				ctx.font = "12px fantasy"//sets the font for the health 
				ctx.fillText(satArray[i].satHealth,satArray[i].x,satArray[i].y)//draws the health 
				if(satArray.satHealth<=0){satArray.destroyed=true}	//activate the boolean variable that controls the satellite being drawn
					
				}
				
			if(satArray.length<=0)//If the amount of satellites in the area reach zero, end the game
			{
				screenNum=5;
			}
			
				console.log(satArray.length);//for developer debugging reasons
				
			ctx.fillStyle='red';
			ctx.font = "24px fantasy";			
			ctx.fillText(Math.floor(time/99.9), w-75, h-24);//draws the timer at an accurate, real world measurement
			
			
			////////Alien Drawing///////////////
			
			for(var i = 0; i < amountOfAliens; i++){//Each possible value of the alien array displays the contents of the moveAlien function
				alienArray[i].draw();		//run the draw function
				alienArray[i].moveAlien();	//run the move function
		
			}
		
		
		
		gun.drawGun()//calls the drawGun part of createGun in paint
		gun.drawBullets();//calls the drawBullets part of createGun in paint
			
			
		}
		
		
		
		
			

		
	}////////////////////////////////////////////////////////////////////////////////END PAINT/ GAME ENGINE
	
	
	
	///////Function that involves the satellite targets//////////
	
	function createSat()						//Function that creates satellites for the enemy to attack
	{					
	return{ 									//Return value to the user
		satValue:40, 								//Declare variable for the sat value aka the size
		x:rand(w-100)+10,								//Random Coordinates for the satellites
		y:rand(h-100)+10,
		satHealth:1500,
		destroyed:false,
		drawingSat:function(){						//This sub function draws the satellite itself
		ctx.fillStyle='grey';
		for(var i=0;i<10;i++)						//This for loop gives different values to the satellite
		{
			ctx.drawImage(satPic,this.x,this.y,this.satValue,this.satValue);// Draws a square and changes the dimensions according to the given satValue
		}//Ends for loop

		
		
		for(var i = 0; i < satArray.length; i++){//this is the splice code that removes the food particle after it got eaten
					if(satArray[i].destroyed==true){
						satArray.splice(i,1);//if destroyed= true, take that satellite out
					}
		}
			
		
		
		
		
		}//Ends the drawingSat Function
	}//Ends Return
	}//Ends createSat  function
	
	for(var i = 0; i < amountOfSats; i++){		//Each possible value of the satellite array contains the contents of the createSat function
		satArray[i]=createSat();
	
	}
	/////////////////////
	
	
	
	
	////////////////Functions that involve the gun and shooting//////////////
	
	function createGun(){//this holds all the functions that revolve around the gun
	
	var result ={//stores the entire function in one variable
	shoot:false,
	drawGun:function(){//this sub function is responsible for drawing the gun
	
	ctx.drawImage(gunPic, gunX, gunY,gunW,gunH);//draws the gun itself
	},//ends drawGun
	
	drawBullets:function(){		//this function is responsible for drawing bullets
	if(this.shoot==true){		//only do the following code if the player decides to shoot
	ctx.fillStyle='red';
	bulletY-=bulletSpeedY; 		// makes the bullet go up
	gunSound.play();	   		// makes the gun noise
	ctx.fillRect(bulletX,bulletY, bulletW,bulletH);//draws the bullet
	
	}	//ends if statement (this.shoot==true)
	
	
	
	
	if(bulletY<0)//if the bullet goes out of the screen, reset it so it can shoot again
	{
		
		this.shoot=false;
		bulletY=bulletYOriginal;
	}// ends if(bulletY<0

	}//ends drawBullets function
	
	}//ends result
	return result
	}
	var gun = createGun();//this variable holds the function, which is used to access the sub functions
	///////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
	////////////////Functions that involve the aliens/////////////////////
	function createAlien()
	{
	a=rand(w)								//This value is used to change the aliens x value
	b=-100									//This value is used to change the aliens y value
	
	var result= {							//this variable is the variable used to hold the entire function
	x:a,
	y:b,
	alienColour:'blue',
	targetIndex:-1,							//allows the targeting of certain elements in the satArray to be possible 
	alienWidth:30,				
	alienHeight:20,
	draw:function(){						//This sub-function draws the alien
	ctx.fillStyle = this.alienColour;
	ctx.drawImage(alienPic,this.x,this.y,this.alienWidth,this.alienHeight);
	},//Ends draw function
														

	moveAlien:function(){
	
	
	
	
		if(bulletX>this.x && bulletX < (this.x + this.alienWidth+5) && bulletY > this.y && bulletY < (this.y + this.alienHeight)){// hit detection
			this.x = rand(w) ;		//when it gets hit, send it to these coordinates 
			this.y = -50;
		}
		
	
		if(!(satArray.length<=0)){
			if(this.targetIndex== -1 || this.targetIndex >=satArray.length) this.targetIndex =rand(satArray.length)//If the target Index is -1 or greater than the amount of items in the satellite array, then make the target index a random number in the satellite array
		
		if(this.targetIndex!= -1){								//When a random number in the satellite array is finally assigned, then we can make the ants go for it
			if(this.x < satArray[this.targetIndex].x) 
				{this.x+=1;} 									//If the aliens starts of to the left of the desired satellite , then make it move right, to reach it
			else this.x-=1 ;									//If the aliens starts to the right of the desired satellite , make it move left, to reach it 
			if(this.y < satArray[this.targetIndex].y) 
				{this.y+=1;}									//If the aliens starts above the satellite , make it move down
			else this.y -=1;									//If the aliens starts below the satellite , make it move up to reach it
			
		 
		 
		 
			////////////Thank you Mr Guzy for giving us this magical piece of code that allows the aliens to go after the satellites :) /////
			if(Math.abs(this.x - satArray[this.targetIndex].x) < 5 && Math.abs(this.y - satArray[this.targetIndex].y) <5){
				satArray[this.targetIndex].satHealth-=1;
					if(satArray[this.targetIndex].satHealth<=0){
						satArray[this.targetIndex].destroyed=true;
						amountOfSats-=1;
						this.targetIndex =rand(satArray.length)
			
					} 
					
				
			}
			
		}	//ends if(this.targetIndex!= -1)
		}	//ends if(!(satArray.length<=0))
		}	//ends moveAlien function										
		}	//ends var result
		return result							//return values of everything inside the variable result
		}
		//Ends createAlien function
		for(var i = 0; i < amountOfAliens; i++){		//Each possible value of the alien array contains the contents of the createAnts function
			alienArray[i]=createAlien();//
		}
	
	////////////////////////////////
	
	
	function alternateScreens(){
	
		
		ctx.drawImage(creditButton, creditButtonX,creditButtonY,400,175);//draws the credits button
		ctx.drawImage(helpButton, helpButtonX,helpButtonY,400,175);//draws the help button
		ctx.drawImage(scoreButton, scoreButtonX,scoreButtonY,400,175);//draws the score button
		
		
	
	}
	
	
	
	function rand(i){							//This function can be used whenever a random number is needed.
		return Math.floor(Math.random()*i);
	}
	
	
	function helpScreen(count){//this function is used to implement recursion into the screens, by repeating numbers or drawing lines
		
		ctx.fillRect(0,100+(count*100),w,1);//draw the first line
		if(count>5){}
		else helpScreen(count+1);//draw the other lines 
		
		
		
	}
		
	function ranks(count){//this functions is used to implement recursive functions into this project
		ctx.fillStyle='red';
		ctx.fillText(count,40,80+(count*100));
		if(count>4){}
		else ranks(count+1);//draw the other lines 
	}
	
	function scoreSort() {//Starts the function 
		
		var lowestNum;//this variable will store the lowest number
		var swap;	  //this variable is used to determine if a swap has been done
		var temp;	  //this variable temporarily holds a value
		
		for(var i = 0; i< scores.length;i++){//counts up from 0
				lowestNum = i;				 //the index number that the for loop generates is held as the lowest numebr
				
				for(var j= i+1;j<scores.length;j++){//the index of j is always one higher than i 
					if(scores[j]> scores[lowestNum]){//if the number at index j is less than the number at index i...
						lowestNum=j;//make the new lowest number at index j
					}
				}
					if(!(i ==lowestNum)){//if i is not the lowest number(if a switch is made)
						temp=scores[lowestNum];//the temp value becomes the lowest number (number[j])
						scores[lowestNum]=scores[i];//the lowest number becomes the number at index i
						scores[i]=temp;//number at index i is temporarily stored
						swap=true;
					}
		}		
}
		
	////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////
	/////	MOUSE LISTENER 
	//////////////////////////////////////////////////////
	/////////////////////////////////////////////////////
	





	/////////////////
	// Mouse Click
	///////////////
	
	canvas.addEventListener('click', function (evt){
		
		
		
		
		if(screenNum==1)//whenever you click and you are in game, the gun has to shoot
		{
		gun.shoot = true
		}
		
		
		if(screenNum==0){
			if(my>creditButtonY && my<(creditButtonY+175) && mx> creditButtonX && mx< (creditButtonX+400))
			{
				screenNum=2;//clicking the credit button brings up the credit screen
			}
		
			if(my>helpButtonY && my<(helpButtonY+175) && mx> helpButtonX && mx< (helpButtonX+400))
			{
				screenNum=3;//if you click the help button, the help menu appears
			}
		
			if(my>scoreButtonY && my<(scoreButtonY+175) && mx> scoreButtonX && mx< (scoreButtonX+400))
			{
				screenNum=4;//if you click the score button, the score menu appears
			}
		}
		
		
		
		if(screenNum ==2 || screenNum==3 || screenNum== 4){//you can only click the back button when it is present
			if(my>backButtonY && my<(backButtonY+175) && mx> backButtonX && mx< (backButtonX+400))
				{
					screenNum=0;//when the back button is clicked, go back to the main screen
				}
		}
		
		
	}, false);

	
	

	canvas.addEventListener ('mouseout', function(){pause = true;}, false);
	canvas.addEventListener ('mouseover', function(){pause = false;}, false);

      	canvas.addEventListener('mousemove', function(evt) {
        	var mousePos = getMousePos(canvas, evt);

		mx = mousePos.x;
		my = mousePos.y;

      	}, false);


	function getMousePos(canvas, evt) 
	{
	        var rect = canvas.getBoundingClientRect();
        	return {
          		x: evt.clientX - rect.left,
          		y: evt.clientY - rect.top
        		};
      	}
      

	///////////////////////////////////
	//////////////////////////////////
	////////	KEY BOARD INPUT
	////////////////////////////////


	

	window.addEventListener('keydown', function(evt){
		var key = evt.keyCode;
		
		if(screenNum==0)
			{
				if(key==13)
				{
					screenNum=1;
				}
		}
		    
		
	//p 80
	//r 82
	//1 49
	//2 50
	//3 51
		
	}, false);




})
