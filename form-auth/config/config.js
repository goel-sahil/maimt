module.exports = {
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.PORT || '3306',
        username: process.env.DATABASE_USER || 'app',
        password: process.env.DATABASE_PASSWORD || 'root',
        database_name: process.env.DATABASE_DBNAME || 'test',
    },
    jwt: {
        secret: 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEF'
    }
}