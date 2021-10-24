const possibleStarts = 1000000;
let startx; // position in noise space
let starty;
let screenWidth = 600;
let screenHeight = 600;
let recScale = 6;
let rows = -1;
let cols = -1; 
let inc = 0.05; // how fast we move through the noise space
let xinc = inc;
let yinc = inc*0.1;
let noiseScale = 0.10; // how large/small features in noise space are / how 'zoomed in' we are

function setup() {
  createCanvas(screenWidth, screenHeight);
  startx = random() * possibleStarts; 
  starty = random() * possibleStarts;
  rows = floor(screenWidth/recScale);
  cols = floor(screenHeight/recScale);
  noStroke();
}

function draw() {
  background(0);
  
  for (var x = 0; x < rows; x++){
    for (var y = 0; y < cols; y++){
    
      // if not within central circle in screen
      if (dist(x,y,rows/2,cols/2) > 40){
        // don't calc a color for the current rectangle, leave it as background color
        continue;
      }
      
      let noiseVal = noise((startx + x) * noiseScale, (starty + y) * noiseScale);
      let color;
      if (y < (cols/2 + sin(startx / 5) * 10)){ // this works to oscillate the dividing line of showing raw noise heights vs colors
        let s = noiseVal * 255;
        color = [s,s,s];
      }
      else{
        color = getColor(noiseVal);
      }
      
      fill(color);
      rect(x*recScale,y*recScale,recScale,recScale);
    }  
  }
  
  // update noise space position
  startx += xinc; 
  starty += yinc;
}

// take a height value and give back a color to use for terrain
function getColor(height){
  // deep water
  if (height < 0.30){
    return [0,0,255*height];
  }
  // shallow water
  else if(height < 0.36){
    return [0,155*height,255*height];
  }
  // grass
  else if (height < 0.66){
    return [0,255*height,0];
  }
  // mountain base
  else if (height < 0.73){
    return [165*height,42*height,42*height];
  }
  // snowy mountain peak
  else{
    return [255*height,255*height,255*height];
  }
}