import { createConnection } from 'typeorm';
import config from '../config';

class DB {
    static connect = async () => {
        await createConnection(config.orm);
    };
}

export default DB;
