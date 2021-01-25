require('dotenv').config();

import ormconfig from './ormconfig';
import { ConnectionOptions } from 'typeorm';

type Port = number;

type JwtTokenSecret = string;

type Prefix = string;

interface Config {
    port: Port;
    orm: ConnectionOptions;
    jwtTokenSecret: JwtTokenSecret;
    api: {
        prefix: Prefix;
    };
}

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config: Config = {
    port: parseInt(process.env.PORT, 10),
    orm: { ...ormconfig },
    jwtTokenSecret: process.env.JWT_TOKEN_SECRET,
    api: {
        prefix: '/v1/',
    },
};

export default config;
