"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;
let skyTile = "#13a5bf";
let cactusTile = "#0f5c18";
let groundTile = "#8a6715";
let cloudTile = "#849699";

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 32;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();
  
  push();

  // initial creation
  if (noise(i, j) > 0.7) {
    fill(groundTile);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);
  } 
  else if (noise(i, j) > 0.55) {
    fill(cactusTile);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);
  } 
  else {
    fill(skyTile);
    beginShape();
    vertex(0, 0);
    vertex(0, tw);
    vertex(th, tw);
    vertex(th, 0);
    endShape(CLOSE);
  }

  // create sand bars
  if (noise(i + 1, j) < 0.55 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(tw - 4, 0);
    vertex(tw, 0);
    vertex(tw, th);
    vertex(tw - 4, th);
    endShape(CLOSE);
  } 
  if (noise(i - 1, j) < 0.55 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, 0);
    vertex(0 + 4, 0);
    vertex(0 + 4, th);
    vertex(0, th);
    endShape(CLOSE);
  }
  if (noise(i, j + 1) < 0.55 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, th);
    vertex(0, th - 4);
    vertex(tw, th - 4);
    vertex(tw, th);
    endShape(CLOSE);
  }
  if (noise(i, j - 1) < 0.55 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, 0);
    vertex(tw, 0);
    vertex(tw, 0 + 4);
    vertex(0, 0 + 4);
    endShape(CLOSE);
  }

  // create corners of sand
  if (noise(i + 1, j + 1) < 0.55 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(tw, th);
    vertex(tw - 4, th);
    vertex(tw - 4, th - 4);
    vertex(tw, th - 4);
    endShape(CLOSE);
  }
  if (noise(i + 1, j - 1) < 0.55 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(tw, 0);
    vertex(tw - 4, 0);
    vertex(tw - 4, 4);
    vertex(tw, 4);
    endShape(CLOSE);
  }
  if (noise(i - 1, j + 1) < 0.55 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, th);
    vertex(4, th);
    vertex(4, th - 4);
    vertex(0, th - 4);
    endShape(CLOSE);
  }
  if (noise(i - 1, j - 1) < 0.55 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, 0);
    vertex(4, 0);
    vertex(4, 4);
    vertex(0, 4);
    endShape(CLOSE);
  }

  // create diagonal sand
  if (noise(i, j + 1) > 0.55 && noise(i + 1, j) > 0.55 && noise(i, j) < 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, th);
    vertex(tw, th);
    vertex(tw, 0);
    endShape(CLOSE);
  }
  if (noise(i, j - 1) > 0.55 && noise(i + 1, j) > 0.55 && noise(i, j) < 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, 0);
    vertex(tw, 0);
    vertex(tw, th);
    endShape(CLOSE);
  }
  if (noise(i, j - 1) > 0.55 && noise(i - 1, j) >0.55 && noise(i, j) < 0.55) {
    fill(groundTile);
    beginShape();
    vertex(tw, 0);
    vertex(0, 0);
    vertex(0, th);
    endShape(CLOSE);
  }
  if (noise(i, j + 1) > 0.55 && noise(i - 1, j) >0.55 && noise(i, j) < 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, 0);
    vertex(0, th);
    vertex(tw, th);
    endShape(CLOSE);
  }

  // create sand bars for grass/sand borders
  if (noise(i + 1, j) > 0.7 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(tw - 4, 0);
    vertex(tw, 0);
    vertex(tw, th);
    vertex(tw - 4, th);
    endShape(CLOSE);
  } 
  if (noise(i - 1, j) > 0.7 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, 0);
    vertex(0 + 4, 0);
    vertex(0 + 4, th);
    vertex(0, th);
    endShape(CLOSE);
  }
  if (noise(i, j + 1) > 0.7 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, th);
    vertex(0, th - 4);
    vertex(tw, th - 4);
    vertex(tw, th);
    endShape(CLOSE);
  }
  if (noise(i, j - 1) > 0.7 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, 0);
    vertex(tw, 0);
    vertex(tw, 0 + 4);
    vertex(0, 0 + 4);
    endShape(CLOSE);
  }

  // sand corners for grass/sand borders
  if (noise(i + 1, j + 1) > 0.7 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(tw, th);
    vertex(tw - 4, th);
    vertex(tw - 4, th - 4);
    vertex(tw, th - 4);
    endShape(CLOSE);
  }
  if (noise(i + 1, j - 1) > 0.7 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(tw, 0);
    vertex(tw - 4, 0);
    vertex(tw - 4, 4);
    vertex(tw, 4);
    endShape(CLOSE);
  }
  if (noise(i - 1, j + 1) > 0.7 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, th);
    vertex(4, th);
    vertex(4, th - 4);
    vertex(0, th - 4);
    endShape(CLOSE);
  }
  if (noise(i - 1, j - 1) > 0.7 && noise(i, j) > 0.55) {
    fill(groundTile);
    beginShape();
    vertex(0, 0);
    vertex(4, 0);
    vertex(4, 4);
    vertex(0, 4);
    endShape(CLOSE);
  }

  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    fill("#FF0000");
    beginShape();
    vertex(8, th - 4);
    vertex(12, th - 4);
    vertex(12, th - 12);
    vertex(28, th - 20);
    vertex(12, th - 28);
    vertex(8, th - 28);
    endShape(CLOSE);
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}

function p3_drawAfter() {
  
}
