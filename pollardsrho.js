function xSquaredPlusOne(x, n) {
    return ((BigInt(x) ** BigInt(2)) + BigInt(1)) % BigInt(n);
}

function gcd_two_numbers(x, y) {
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}
function abs(x) {
    return x < 0n ? -x : x
}

function rho(n) {
    let x = BigInt(2); // randomly changing this
    let y = BigInt(2);
    let d = BigInt(1);
    let countIters = 0;
    while (d.toString() == 1) {
        countIters++;
        x = xSquaredPlusOne(x, n)
        y = xSquaredPlusOne(xSquaredPlusOne(y, n), n)
        d = gcd_two_numbers(BigInt(n), abs(x - y))
    }
    if (d.toString() == n) {
        return "False"
    } else {
        console.log('Number of iterations is: ', countIters)
        return d
    }
}
function pickrandom(n) {

}
// function rho(n) {
//     a = BigInt(2);
//     b = BigInt(2);
//     while (b == a) {
//         // a runs once
//         a = xSquaredPlusOne(a, n);
//         // b runs twice as fast.
//         b = xSquaredPlusOne(xSquaredPlusOne(b, n), n);
//         p = gcd_two_numbers(abs(a - b), BigInt(n));
//         if (p > 1) {
//             return p;
//         }
//     }

//     return "Failed. :-("


let n = 88820773;
console.log(`Using N ${n} and result is ${rho(n)}`)