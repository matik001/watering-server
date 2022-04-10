import dotenv from 'dotenv';
dotenv.config();

const ENV_KEYS = {
    IS_PRODUCTION: process.env.NODE_ENV  === 'production',
    PORT: parseInt(process.env['PORT']!),
    
    TYPEORM_CONNECTION: process.env['TYPEORM_CONNECTION']! as "mysql" | "postgres" | "mssql",
    TYPEORM_HOST: process.env['TYPEORM_HOST']!,
    TYPEORM_USERNAME: process.env['TYPEORM_USERNAME']!,
    TYPEORM_PASSWORD: process.env['TYPEORM_PASSWORD']!,
    TYPEORM_DATABASE: process.env['TYPEORM_DATABASE']!,
    TYPEORM_PORT: parseInt(process.env['TYPEORM_PORT']!),
    TYPEORM_SSL: parseInt(process.env['TYPEORM_SSL']!),
}


export default ENV_KEYS;