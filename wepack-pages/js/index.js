class Index {
    constructor(a, b) {
        this.a = a
        this.b = b
    }
    sum() {
        alert(this.a + this.b) 
    }
}

let indexObj  = new Index(1,3)
indexObj.sum()