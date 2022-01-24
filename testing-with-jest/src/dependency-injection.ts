const doAdd = (a: number, b:number, callback: (arg0: number) => void) => {
    callback(a + b);
}

export default doAdd;