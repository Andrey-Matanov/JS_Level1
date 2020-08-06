console.log(arrayDiff([1, 2, 3, 4], [2, 4]));

function arrayDiff(a, b) {
    if (b.length == 0) {
        return a;
    }

    for (let element of b) {
        let index = a.indexOf(element);

        while (index != -1) {
            a.splice(index, 1);
            index = a.indexOf(element);
        }
    }

    return a;
}
