require('dotenv').config();

const secret = process.env.SECRET || "";
const uri = process.env.URI || "";
const userName = process.env.USERNAME;
const password = process.env.PASSWORD;


export { secret, uri, userName, password };
