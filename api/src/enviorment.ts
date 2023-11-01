require('dotenv').config();

const secret = process.env.SECRET;
const uri = process.env.URI;

export { secret, uri };
