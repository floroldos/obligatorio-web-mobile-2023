require('dotenv').config();
const token = process.env.TOKEN || ""
const url = process.env.URL || ""

export { token, url };
