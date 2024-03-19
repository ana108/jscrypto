function pPlusOne(B, n) {
    let m = BigInt(2);
    let d;
    for (let j = 2; j <= B; j++) {
        let val = m ** BigInt(j)
        m = val % BigInt(n);
        if (m.toString() <= 1) {
            break;
        }
        d = gcd_two_numbers(m - BigInt(1), BigInt(n))
        if (d > 1 && d < n) {
            console.log('J ', j)
            return d
        }
    }
    if (d == 1 || d >= n) {
        console.log('N could be prime')
    }
}
function factorial(num) {
    let x = num - 1;
    let y = num;
    while (x > 0) {
        y = y * x;
        x--;
    }
    return y;
}
function egcd(a, b) {
    const modulo = a;
    a = +a;
    b = +b;
    if (a !== a || b !== b) {
        return [NaN, NaN, NaN];
    }

    if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
        return [Infinity, Infinity, Infinity];
    }
    // Checks if a or b are decimals
    if ((a % 1 !== 0) || (b % 1 !== 0)) {
        return false;
    }
    var signX = (a < 0) ? -1 : 1,
        signY = (b < 0) ? -1 : 1,
        x = 0,
        y = 1,
        u = 1,
        v = 0,
        q, r, m, n;
    a = Math.abs(a);
    b = Math.abs(b);

    while (a !== 0) {
        q = Math.floor(b / a);
        r = b % a;
        m = x - u * q;
        n = y - v * q;
        b = a;
        a = r;
        x = u;
        y = v;
        u = m;
        v = n;
    }
    let result = (signY * y) % modulo;
    if (result < 0) {
        result += modulo;
    }
    return [b, result]
    //return result;
    // return [b, signX * x, signY * y];
}

function gcd_two_numbers(x, y) {
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}
let n = 71201983;
let b = 12;//100;
console.log(pPlusOne(b, n).toString())