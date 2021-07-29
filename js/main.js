let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');


let bird = new Image(),
	bg = new Image(),
	footer = new Image(),
	pipeUp = new Image(),
	pipeBottom = new Image();

let gap = 90;

bird.src = "/img/bird.png";
bg.src = "/img/bg.png";
footer.src = "/img/footer.png";
pipeUp.src = "/img/pipeUp.png";
pipeBottom.src = "/img/pipeBottom.png";


let fly = new Audio(),
	scoreAudio = new Audio();

fly.src = "../audio/fly.mp3"
scoreAudio.src = "../audio/score.mp3"


document.addEventListener('keydown', moveUp);

function moveUp(){

	yPos -=30;

	fly.play();
}

let pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}


let score = 0;


let xPos = 10,
	yPos =150,
	gravity = 1;

function drawGame() {
	ctx.drawImage(bg, 0, 0);


	for(let i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

		if(pipe[i].x == 125){
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}

		if(pipe[i].x == 5) {
			score++;
			scoreAudio.play();


		if(xPos + bird.width >= pipe[i].x &&
			xPos <= pipe[i].x + pipeUp.width &&
			(yPos <=pipe[i].y + pipeUp.height ||
				yPos +bird.height >= pipe[i].y + pipeUp.height + gap)) {
			location.reload();
		}
		}
	}

	ctx.drawImage(footer, 0, cvs.height - footer.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += gravity;

	ctx.fillStyle = "#000";
	ctx.font = "24px Roboto";
	ctx.fillText("Счёт :" + score, 10 , cvs.height - 20);

	requestAnimationFrame(drawGame);
};

pipeBottom.onload = drawGame;
drawGame();
