let drawLFlag = false;
function setup() {
  createCanvas(400, 400, WEBGL);
 
}

function draw() {
  background(220);
  orbitControl();
 
  //drawL();
  //drawI();
  //drawZ();
  //drawT();
  //drawMap();
  if (drawLFlag){
    drawL(); //pintar la figura de Tetris especificada
  }
 
}

function drawMap(){
  push();
  strokeWeight(4);
  stroke(255, 0, 0);
  line(0, 0, 100, 0);
 
  stroke(0, 255, 0);
  line(0, 0, 0, 100);
 
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, 100);
  pop();
}

function drawL(){
  box();
 
  push();
  stroke(255,0,0);
  translate(0,51,0);
  box();  
  pop();
 
  push();
  stroke(0,255,0);
  translate(0,102,0);
  box();  
  pop();
 
  push();
  stroke(0,0,255);
  translate(51,102,0);
  box();  
  pop();
}

function drawI(){
  box();
 
  push();
  stroke(255,0,0);
  translate(0,51,0);
  box();  
  pop();
 
  push();
  stroke(0,255,0);
  translate(0,102,0);
  box();  
  pop();
 
  push();
  stroke(0,0,255);
  translate(0,153,0);
  box();  
  pop();
}

function drawZ(){
  box();
 
  push();
  stroke(255,0,0);
  translate(51,0,0);
  box();  
  pop();
 
  push();
  stroke(0,255,0);
  translate(51,51,0);
  box();  
  pop();
 
  push();
  stroke(0,0,255);
  translate(102,51,0);
  box();  
  pop();
}

function drawT(){
  box();
 
  push();
  stroke(255,0,0);
  translate(0,51,0);
  box();  
  pop();
 
  push();
  stroke(0,255,0);
  translate(-51,51,0);
  box();  
  pop();
 
  push();
  stroke(0,0,255);
  translate(51,51,0);
  box();  
  pop();
}

function keyPressed(){
  console.log("Charcode:", key.charCodeAt(0));
  let keyIndex = -1;
  keyIndex = key.charCodeAt(0);
  if (keyIndex === 65) { // 'A' en código ASCII
    drawLFlag = true;
  }
}
