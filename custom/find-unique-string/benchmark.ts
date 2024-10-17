import { benny } from './find-unique-string';

function faster_obj(data) {
  for (let i = 0; i + 14 < data.length; ++i) {
    const seen = {};
    outer_loop: for (let j = 0; j < 14; ++j) {
      if (seen[data[i + j]]) {
        break outer_loop;
      }

      seen[data[i + j]] = true;
    }
    if (seen.size === 14) {
      return i + 14;
    }
  }
}

function time(f) {
  const start = Date.now();
  for (let i = 0; i < 1000000; i++) {
    f('bkajshkjnvlkjsdhfiqhkjbckljwdhckjahkjshkjanckjanskjdbakjjbkjhwkqjhdalsd', 14);
  }
  return Date.now() - start;
}


console.log("obj", time(faster_obj)); // 8s
console.log("benny", time(benny)); // 1.1s


