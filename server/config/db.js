import {neon} from '@neondatabase/serverless'

const sql = neon(`${process.env.POSTGRES_URI}`);

export default sql;

