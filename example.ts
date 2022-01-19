class Person {
    public message: string;

    constructor(message: string) {
        this.message = message;
    }
}

const person = new Person("Hello there!");
console.log(person.message);