export class UtilityService {
  nextChar(c: any) {
    let u = c.toUpperCase();
    if (this.same(u, 'Z')) {
      let txt = '';
      let i = u.length;
      while (i--) {
        txt += 'A';
      }
      return (txt + 'A');
    } else {
      let p = "";
      let q = "";
      if (u.length > 1) {
        p = u.substring(0, u.length - 1);
        q = String.fromCharCode(p.slice(-1).charCodeAt(0));
      }
      let l = u.slice(-1).charCodeAt(0);
      let z = this.nextLetter(l);
      if (z === 'A') {
        return p.slice(0, -1) + this.nextLetter(q.slice(-1).charCodeAt(0)) + z;
      } else {
        return p + z;
      }
    }
  }

  nextLetter(l: any) {
    if (l < 90) {
      return String.fromCharCode(l + 1);
    }
    else {
      return 'A';
    }
  }

  same(str, char) {
    let i = str.length;
    while (i--) {
      if (str[i] !== char) {
        return false;
      }
    }
    return true;
  }
}
