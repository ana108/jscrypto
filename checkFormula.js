function check(x, y) {
    let a = Math.pow(x, 3) + x - 1;
    const xResult = a % 19;
    let yResult = Math.pow(y, 2) % 19
    if (xResult != yResult) {
        console.log('do NOT match')
    }
    else {
        return true
    }
}