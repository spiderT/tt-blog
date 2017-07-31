const arr = [22, 34, 55, 66, 22, 22, 66, 55, 22, 34];

function getCount(arr, el) {
    let num = 0;
    for (let k in arr) {
        if (el === arr[k]) {
            num++;
        }
    }
    return num;
}

console.log(getCount(arr, 22));