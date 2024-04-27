const MIN_LENGTH = 6;
const MAX_LENGTH = 20;
const MAX_REPEAT = 2;

function getIndexToDec(arr: number[]) {
  // 1. n % 3 === 0
  // 2. the biggest n
  // 2.1. - if 5 - look for number lower than 5. if not found - take this 

  let i = 0;
  let lt5i = -1;
  let k = -1;
  let l = arr[0];
  let li = arr.length ? 0 : -1;

  while (i + 1 <= arr.length) {
    const n = arr[i];

    if (n > l) {
      li = i;
      l = n;
    }

    if (n % 3 === 0) {
      return i
    }

    if (n === 5 && lt5i === -1) {
      k = i;
    }

    if (n > 2 && n < 5) {
      k = i;
      lt5i = i;
    }

    i++;
  }

  return l > 5 ? li : k;
}

export function strongPasswordChecker(password: string): number {
  const pl = password.length;

  let lc = 1;
  let uc = 1;
  let d = 1;
  let lmin = 0;
  let lmax = 0;
  let rs: number[] = [];
  let rss = 0;

  if (pl < MIN_LENGTH) {
    lmin = MIN_LENGTH - pl;
  }

  if (pl > MAX_LENGTH) {
    lmax = pl - MAX_LENGTH;
  }

  let c = 1;

  for (let i = 0; i < pl + 1; i++) {
    const s = password[i] || '';

    if (lc !== 0 && s.match(/[a-z]/)) {
      lc = 0;
    }

    if (uc !== 0 && s.match(/[A-Z]/)) {
      uc = 0;
    }

    if (d !== 0 && s.match(/[0-9]/)) {
      d = 0;
    }

    const ps = password[i - 1];

    if (ps === undefined) continue;

    if (ps === s) {
      c += 1;
    } else {
      c > MAX_REPEAT && rs.push(c);
      rss += Math.floor(c / (MAX_REPEAT + 1));

      c = 1;
    }
  }

  // lmax - delete
  // lc - replace
  // uc - replace
  // d - replace
  // rs - replace | delete
  if (lmax) {
    let tlmax = lmax;

    while (tlmax) {
      const i = getIndexToDec(rs);

      if (i !== -1) {
        rs[i] = rs[i] - 1;
      }

      tlmax -= 1;
    }

    const q = rs.reduce((acc, curr) => acc + Math.floor(curr / 3), 0);

    return lmax + Math.max(q, lc + uc + d)
  }


  // lmin - insert
  // lc - insert | replace
  // uc - insert | replace
  // d - insert | replace
  // rs - replace | insert
  if (lmin) {
    return rss - lmin > 0
      ? rss - lmin + Math.max(lmin, lc + uc + d, rss)
      : Math.max(lmin, lc + uc + d, rss);
  }


  // fit length 
  // d - insert | replace
  // uc - insert | replace
  // lc - insert | replace
  // rs - replace | delete
  return Math.max(lc + uc + d, rss);
};
