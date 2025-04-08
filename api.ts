import axios from "axios";

export const url = 'https://digitalfactory-041f7d6dfc2c.herokuapp.com/';

export const api = axios.create({
    baseURL: url,
    headers:{
        "Content-Type":"application/json"
    },
});

