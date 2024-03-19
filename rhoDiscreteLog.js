const BETA = BigInt(532);; //BigInt(618);
const MOD_SPACE = BigInt(809);
const ALPHA = BigInt(89);
const N = BigInt(101);
function partition(num) {
    if (BigInt(num) % BigInt(3) == 1) {
        return 1;
    }
    if (BigInt(num) % BigInt(3) == 0) {
        return 2;
    }
    if (BigInt(num) % BigInt(3) == 2) {
        return 3;
    }
}

function procedure(x, a, b) {
    let resultSet = {
        x: BigInt(x),
        a: BigInt(a),
        b: BigInt(b)
    };
    if (partition(x) == 1) {
        resultSet.x = (resultSet.x * BETA) % MOD_SPACE;
        resultSet.a = resultSet.a % N;
        resultSet.b = (resultSet.b + BigInt(1)) % N;
    } else if (partition(x) == 2) {
        resultSet.x = (resultSet.x ** BigInt(2)) % MOD_SPACE;
        resultSet.a = (BigInt(2) * resultSet.a) % N;
        resultSet.b = (BigInt(2) * resultSet.b) % N;
    } else if (partition(x) == 3) {
        resultSet.x = (resultSet.x * ALPHA) % MOD_SPACE;
        resultSet.a = (resultSet.a + BigInt(1)) % N;
        resultSet.b = resultSet.b % N;
    }
    return resultSet
}
function main() {
    let pairOne = procedure(1, 0, 0);
    let pairTwo = procedure(pairOne.x, pairOne.a, pairOne.b)
    let results = []
    let resultsDetails = []
    let i = 0;
    results[i] = pairOne.x;
    resultsDetails[i] = pairOne;

    results[++i] = pairTwo.x;
    resultsDetails[i] = pairTwo;

    while (results[i] != results[i / 2]) { // looking for x_i = x_2i
        pairOne = procedure(pairTwo.x, pairTwo.a, pairTwo.b)
        pairTwo = procedure(pairOne.x, pairOne.a, pairOne.b)
        results[++i] = pairOne.x;
        resultsDetails[i] = pairOne;
    }

    let c = findC(resultsDetails[i / 2], resultsDetails[i])
    console.log('The log_89 of 532 is ', c)
}
function findC(firstResultSet, secondResultSet) {
    let x = multiplicative_inverse((Number(secondResultSet.b) - Number(firstResultSet.b)), Number(N))
    let c = ((firstResultSet.a - secondResultSet.a) * BigInt(x)) % N;
    return c;
}
function multiplicative_inverse(a, b) {
    let modulo = a;
    if (a > b) {
        modulo = a;
    } else {
        modulo = b;
        b = a;
        a = modulo;
    }
    // a = +a;
    // b = +b;
    // if (a !== a || b !== b) {
    //     return [NaN, NaN, NaN];
    // }

    if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
        return [Infinity, Infinity, Infinity];
    }
    // // Checks if a or b are decimals
    // if ((a % 1 !== 0) || (b % 1 !== 0)) {
    //     return false;
    // }
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
    return result;
    // return [b, signX * x, signY * y];
}
function abs(x) {
    return x < 0n ? -x : x
}

function gcd_two_numbers(x, y) {
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

main();