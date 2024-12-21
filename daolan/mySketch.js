// A Chromatic Game of Life
// By Jawhar Kodadi 12-12-2024
// https://jawharkodadi.com/
// Chromatic Communication 🎨 #WCCChallenge

let cellSize = 10;
let topMargin = 100;
let cols, rows;
let grid, nextGrid;
let pg, pgTrail, gridLines;
let N = 3; //Play with this ... with caution. 1 = no glow 
let patternSelected = "glider";

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  frameRate(10);
  cols = floor(width / cellSize);
  rows = floor((height - topMargin) / cellSize);
  pixelDensity(1);
  grid = createEmptyGrid(cols, rows);
  nextGrid = createEmptyGrid(cols, rows);

  pg = createGraphics(cols * cellSize, rows * cellSize);
  pg.colorMode(HSB, 360, 100, 100);
  pg.noStroke();

  pgTrail = createGraphics(cols * cellSize, rows * cellSize);
  pgTrail.colorMode(HSB, 360, 100, 100);
  pgTrail.noStroke();

  gridLines = createGraphics(cols * cellSize, rows * cellSize);
  gridLines.colorMode(HSB, 360, 100, 100);
  gridLines.noFill();
  drawGridLines(gridLines, cols, rows, cellSize);

  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  textSize(32);
  fill(255);
  noStroke();
  text("A Chromatic Game of Life", width/2, topMargin/4);

  textSize(20);
  text("Motif sélectionné : " + patternSelected.toUpperCase(), width/2, topMargin/2);
  text("G: Glider, H: Gosper, R: R-pentomino, D: Diehard, A: Acorn, P: Pulsar, L: LWSS", width/2, topMargin/2 + 25);

  computeNextGeneration();
  updateGraphics(pg, grid);
  updateHalos(pgTrail, grid);

  image(pg, 0, topMargin);
  image(pgTrail, 0, topMargin);
  image(gridLines, 0, topMargin);

  let temp = grid;
  grid = nextGrid;
  nextGrid = temp;
}

function mousePressed() {
  let x = floor(mouseX / cellSize);
  let y = floor((mouseY - topMargin) / cellSize);
  if (x < 0 || x >= cols || y < 0 || y >= rows) return;

  let baseHue = random(360);

  if (patternSelected === "glider") {
    let pattern = [
      [0,-1],[1,0],[-1,1],[0,1],[1,1]
    ];
    placePattern(pattern, x, y, baseHue);

  } else if (patternSelected === "gosper") {
    let gunPattern = [
      [24,0],[22,1],[24,1],[12,2],[13,2],[20,2],[21,2],[34,2],[35,2],
      [11,3],[15,3],[20,3],[21,3],[34,3],[35,3],[0,4],[1,4],[10,4],[16,4],[20,4],[21,4],
      [0,5],[1,5],[10,5],[14,5],[16,5],[17,5],[22,5],[24,5],[10,6],[16,6],[24,6],
      [11,7],[15,7],[12,8],[13,8]
    ];
    placePattern(gunPattern, x, y, baseHue, -20, 20);

  } else if (patternSelected === "r-pentomino") {
    let rPattern = [
      [1,0],[2,0],[0,1],[1,1],[1,2]
    ];
    placePattern(rPattern, x, y, baseHue);

  } else if (patternSelected === "diehard") {
    let diehard = [
      [7,0],[0,1],[1,1],[1,2],[5,2],[6,2],[7,2]
    ];
    placePattern(diehard, x, y, baseHue);

  } else if (patternSelected === "acorn") {
    let acorn = [
      [1,0],[3,1],[0,2],[1,2],[4,2],[5,2],[6,2]
    ];
    placePattern(acorn, x, y, baseHue);

  } else if (patternSelected === "pulsar") {
    let pulsar = [
      [-6,-4],[-5,-4],[-4,-4],[-6,-9],[-5,-9],[-4,-9],[4,-4],[5,-4],[6,-4],[4,-9],[5,-9],[6,-9],
      [-6,4],[-5,4],[-4,4],[-6,9],[-5,9],[-4,9],[4,4],[5,4],[6,4],[4,9],[5,9],[6,9],
      [-9,-6],[-9,-5],[-9,-4],[-9,4],[-9,5],[-9,6],[-4,-6],[-4,-5],[-4,-4],[-4,4],[-4,5],[-4,6],
      [9,-6],[9,-5],[9,-4],[9,4],[9,5],[9,6],[4,-6],[4,-5],[4,-4],[4,4],[4,5],[4,6]
    ];
    placePattern(pulsar, x, y, baseHue);

  } else if (patternSelected === "lwss") {
    let lwss = [
      [1,0],[2,0],[3,0],[0,1],[3,1],[3,2],[0,3],[2,3]
    ];
    placePattern(lwss, x, y, baseHue);
  }
}

function placePattern(patternArray, x, y, baseHue, hueMinOffset = 0, hueMaxOffset = 0) {
  for (let coords of patternArray) {
    let gx = x + coords[0];
    let gy = y + coords[1];
    setAliveCell(grid, gx, gy, colorObj(baseHue + random(hueMinOffset,hueMaxOffset)));
  }
}

function keyPressed() {
  if (key === 'G' || key === 'g') patternSelected = "glider";
  else if (key === 'H' || key === 'h') patternSelected = "gosper";
  else if (key === 'R' || key === 'r') patternSelected = "r-pentomino";
  else if (key === 'D' || key === 'd') patternSelected = "diehard";
  else if (key === 'A' || key === 'a') patternSelected = "acorn";
  else if (key === 'P' || key === 'p') patternSelected = "pulsar";
  else if (key === 'L' || key === 'l') patternSelected = "lwss";
}

function setAliveCell(gr, x, y, hueObj) {
  x = (x + cols) % cols;
  y = (y + rows) % rows;
  gr[y][x].alive = true;
  gr[y][x].hue = hueObj;
}

function computeNextGeneration() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let neighbors = countAliveNeighbors(grid, x, y);
      let cell = grid[y][x];
      let nextCell = nextGrid[y][x];
      if (cell.alive) {
        if (neighbors === 2 || neighbors === 3) {
          nextCell.alive = true;
          nextCell.hue = cell.hue;
        } else {
          nextCell.alive = false;
          nextCell.hue = null;
        }
      } else {
        if (neighbors === 3) {
          nextCell.alive = true;
          nextCell.hue = computeNewCellHue(grid, x, y);
        } else {
          nextCell.alive = false;
          nextCell.hue = null;
        }
      }
    }
  }
}

function computeNewCellHue(gr, x, y) {
  let neighborHues = [];
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      if (i === 0 && j === 0) continue;
      let nx = (x + i + cols) % cols;
      let ny = (y + j + rows) % rows;
      if (gr[ny][nx].alive) neighborHues.push(gr[ny][nx].hue.h);
    }
  }
  if (neighborHues.length === 0) return { h: random(360), s: 80, b: 80 };
  let avgHue = neighborHues.reduce((a, b) => a + b, 0) / neighborHues.length;
  let hueOffset = random(5, 15);
  return { h: (avgHue + hueOffset) % 360, s: random(70, 100), b: random(70, 90) };
}

function countAliveNeighbors(gr, x, y) {
  let count = 0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      if (i === 0 && j === 0) continue;
      let nx = (x + i + cols) % cols;
      let ny = (y + j + rows) % rows;
      if (gr[ny][nx].alive) count++;
    }
  }
  return count;
}
//Messy code :\
function updateGraphics(pg, gr) {
  pg.loadPixels();
  let pixels = pg.pixels;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let baseIndex = ((y * cellSize) * (cols * cellSize) + (x * cellSize)) * 4;
      let c = gr[y][x].alive ? pg.color(gr[y][x].hue.h, gr[y][x].hue.s, gr[y][x].hue.b) : pg.color(0, 0, 20);
      let r = red(c), g = green(c), b = blue(c), a = 255;
      for (let yy = 0; yy < cellSize; yy++) {
        for (let xx = 0; xx < cellSize; xx++) {
          let idx = baseIndex + (yy * (cols * cellSize) + xx) * 4;
          pixels[idx] = r; pixels[idx+1] = g; pixels[idx+2] = b; pixels[idx+3] = a;
        }
      }
    }
  }
  pg.updatePixels();
}
//Messy code :\
function updateHalos(pgTrail, gr) {
  pgTrail.blendMode(BLEND);
  pgTrail.fill(0,0,0,10);
  pgTrail.rect(0, 0, pgTrail.width, pgTrail.height);
  pgTrail.blendMode(LIGHTEST);
  pgTrail.loadPixels();
  let pixels = pgTrail.pixels;
  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      if (gr[cy][cx].alive) {
        let centerH = gr[cy][cx].hue.h, centerS = gr[cy][cx].hue.s, centerB = gr[cy][cx].hue.b;
        for (let dy = -N; dy <= N; dy++) {
          for (let dx = -N; dx <= N; dx++) {
            let nx = (cx + dx + cols) % cols;
            let ny = (cy + dy + rows) % rows;
            let dist = max(abs(dx), abs(dy));
            let alpha = map(dist, 0, N, 50, 0); 
            if (alpha <= 0) continue;
            let s = map(dist, 0, N, centerS, centerS*0.1);
            let bb = map(dist, 0, N, centerB, centerB*0.1);
            bb = map(alpha, 0, 50, bb*0.01, bb);
            let c2 = pgTrail.color(centerH, s, bb);
            let rr = red(c2), gg = green(c2), bb2 = blue(c2);
            let baseIndex = ((ny * cellSize) * (cols * cellSize) + (nx * cellSize)) * 4;
            for (let yy = 0; yy < cellSize; yy++) {
              for (let xx = 0; xx < cellSize; xx++) {
                let idx = baseIndex + (yy * (cols * cellSize) + xx) * 4;
                let oldR = pixels[idx], oldG = pixels[idx+1], oldB = pixels[idx+2];
                pixels[idx]   = max(oldR, rr);
                pixels[idx+1] = max(oldG, gg);
                pixels[idx+2] = max(oldB, bb2);
                pixels[idx+3] = 255;
              }
            }
          }
        }
      }
    }
  }
  pgTrail.updatePixels();
}

function drawGridLines(gfx, c, r, cs) {
  gfx.clear();
  gfx.stroke(30);
  gfx.strokeWeight(1);
  for (let x = 0; x <= c; x++) gfx.line(x * cs, 0, x * cs, r * cs);
  for (let y = 0; y <= r; y++) gfx.line(0, y * cs, c * cs, y * cs);
}

function colorObj(hue) {
  return { h: hue % 360, s: random(70, 100), b: random(70, 90) };
}

function createEmptyGrid(w, h) {
  let arr = [];
  for (let y = 0; y < h; y++) {
    arr[y] = [];
    for (let x = 0; x < w; x++) arr[y][x] = { alive: false, hue: null };
  }
  return arr;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cols = floor(width / cellSize);
  rows = floor((height - topMargin) / cellSize);
  grid = createEmptyGrid(cols, rows);
  nextGrid = createEmptyGrid(cols, rows);
  pg = createGraphics(cols * cellSize, rows * cellSize);
  pg.colorMode(HSB, 360, 100, 100);
  pg.noStroke();
  pgTrail = createGraphics(cols * cellSize, rows * cellSize);
  pgTrail.colorMode(HSB, 360, 100, 100);
  pgTrail.noStroke();
  pgTrail.blendMode(LIGHTEST);
  gridLines = createGraphics(cols * cellSize, rows * cellSize);
  gridLines.colorMode(HSB, 360, 100, 100);
  gridLines.noFill();
  drawGridLines(gridLines, cols, rows, cellSize);
}
