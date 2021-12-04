export class User {
    name: string;
    email: string;
    username: string;
    password: string;
}

export interface Login {
    username: string;
    password: string;
}

export interface userNoPW {
    _id: string,
    name: string,
    username: string,
    email: string,
}