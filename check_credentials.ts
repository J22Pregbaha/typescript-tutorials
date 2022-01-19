type Credentials = {
    user: string,
    password: string
}

let originalCredentials: Credentials = {
    user: "jpregbaha",
    password: "pass"
}

function VerifyCredentials(cred: Credentials) : boolean {
    if(cred.user == originalCredentials.user && cred.password == originalCredentials.password) return true;

    return false;
}

let newCredentials: Credentials = {
    user: "jpregbaha",
    password: "pass"
}

console.log(VerifyCredentials(newCredentials));