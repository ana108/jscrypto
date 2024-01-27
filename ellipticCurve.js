class Point {
    formulaModulus = 19
    a = 1
    b = -1
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    egcd(a, b) {
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
        return result;
        // return [b, signX * x, signY * y];
    }
    lambda(newPoint) {
        if (this.x === newPoint.x && this.y === newPoint.y) {
            let variableForInverse = 2 * this.y;
            let invertedVariable = this.egcd(this.formulaModulus, variableForInverse)
            let formula = (3 * Math.pow(newPoint.x, 2) + this.a) * invertedVariable
            formula = formula % this.formulaModulus
            if (formula === 0) {
                console.log('Warning: Formula is 0')
            }
            return formula;
        } else {
            let variableForInverse = (newPoint.x - this.x)
            let invertedVariable = this.egcd(this.formulaModulus, variableForInverse)
            let formula = (newPoint.y - this.y) * invertedVariable
            if (formula % this.formulaModulus == 0) {
                console.log('Warning: Formula is 0')
            }
            return formula % this.formulaModulus;
        }
    }
    addPoint(secondPoint) {
        let lambda = this.lambda(secondPoint)
        let x3 = (Math.pow(lambda, 2) - this.x - secondPoint.x) % this.formulaModulus
        if (x3 < 0) {
            x3 = x3 + this.formulaModulus
        }
        let y3 = (lambda * (this.x - x3) - this.y) % this.formulaModulus
        if (y3 < 0) {
            y3 = y3 + this.formulaModulus
        }
        return new Point(x3, y3)
    }
    check() {
        let a = Math.pow(this.x, 3) + this.x - 1
        const xResult = a % 19
        let yResult = Math.pow(this.y, 2) % 19
        if (xResult != yResult) {
            // console.log(`Point (${this.x}, ${this.y}) is not a valid point`)
            return false
        }
        else {
            return true
        }
    }
}

let arrayOfPoints = []
arrayOfPoints.push(new Point(2, 3))
arrayOfPoints.push(new Point(2, 3));
// let pointA = new Point(2, 3);
// let pointB = new Point(2, 3)

for (let i = 1; i < 21; i++) {
    let nextPoint = arrayOfPoints[0].addPoint(arrayOfPoints[i])
    arrayOfPoints.push(nextPoint)
}
for (let j = 0; j < arrayOfPoints.length; j++) {
    console.log(`X ${arrayOfPoints[j].x} Y ${arrayOfPoints[j].y} and is a valid point: ${arrayOfPoints[j].check()}`);
}