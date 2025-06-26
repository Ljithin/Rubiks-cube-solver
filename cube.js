class RubiksCube {
  constructor() {
    this.reset();
  }

  reset() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r'),
    };
    this.history = [];
  }

  
  rotateFace(face, direction = 'CW') {
    const newFace = [...this.faces[face]];
    const mapCW = [6, 3, 0, 7, 4, 1, 8, 5, 2];
    const mapCCW = [2, 5, 8, 1, 4, 7, 0, 3, 6];

    for (let i = 0; i < 9; i++) {
      newFace[i] = this.faces[face][direction === 'CW' ? mapCW[i] : mapCCW[i]];
    }

    this.faces[face] = newFace;
  }

  
  rotate(move, direction = 'CW') {
    if (move === 'F') {
      this.rotateFace('F', direction);
      const U = this.faces.U, D = this.faces.D, L = this.faces.L, R = this.faces.R;
      if (direction === 'CW') {
        [U[6], U[7], U[8], R[0], R[3], R[6], D[2], D[1], D[0], L[8], L[5], L[2]] =
        [L[8], L[5], L[2], U[6], U[7], U[8], R[0], R[3], R[6], D[2], D[1], D[0]];
      } else {
        [U[6], U[7], U[8], L[8], L[5], L[2], D[2], D[1], D[0], R[0], R[3], R[6]] =
        [R[0], R[3], R[6], U[6], U[7], U[8], L[8], L[5], L[2], D[2], D[1], D[0]];
      }
    }


    this.history.push(`${move} ${direction}`);
    this.show();
  }

  scramble(times = 10) {
    const moves = ['F', 'U', 'D', 'L', 'R', 'B'];
    const dirs = ['CW', 'CCW'];
    for (let i = 0; i < times; i++) {
      const move = moves[Math.floor(Math.random() * 6)];
      const dir = dirs[Math.floor(Math.random() * 2)];
      this.rotate(move, dir);
    }
  }

  solve() {
    for (let i = this.history.length - 1; i >= 0; i--) {
      const [move, dir] = this.history[i].split(" ");
      const revDir = dir === "CW" ? "CCW" : "CW";
      this.rotate(move, revDir);
    }
    this.history = [];
  }

  getStateString() {
    return (
      this.faces.U.join('') +
      this.faces.R.join('') +
      this.faces.F.join('') +
      this.faces.D.join('') +
      this.faces.L.join('') +
      this.faces.B.join('')
    );
  }

  show() {
    const container = document.getElementById('cube-container');
    container.innerHTML = '';
    const svg = getCubeSvg(this.getStateString());
    container.appendChild(svg);
  }
}


const cube = new RubiksCube();
cube.show();

function scrambleCube() {
  cube.scramble(10);
}

function solveCube() {
  cube.solve();
}

function getCubeSvg(stateString) {
  const div = document.createElement("div");
  div.textContent = "Cube State: " + stateString;
  return div;
}

