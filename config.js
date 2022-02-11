require('dotenv').config();

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
console.log(process.env.NODE_ENV);
const dev = {
    PORT: 5001,
    DB_USER_NAME: 'zarnapatel',
    DB_PASSWORD: 'testpassword',
    DB_URL: 'mongodb+srv://zarnapatel:testpassword@cluster0.cjxny.mongodb.net/testDB',
    BASE_URL: 'http://localhost:5001/api/v1',
    JWT_SECRET: '28afced9633d131ef970c84b0fd6a0fb69929b7cbdc87992caf0148b12d46f277ce2405f1b25aa027e85a5d334f5a06b35305e8f37f64f838fc7437d950fe188',
    ACCESS_TOKEN_SECRET: '28afced9633d131ef970c84b0fd6a0fb69929b7cbdc87992caf0148b12d46f277ce2405f1b25aa027e85a5d334f5a06b35305e8f37f64f838fc7437d950fe188',
};
const prod = {
    PORT: 5000,
    DB_USER_NAME: 'zarnapatel',
    DB_PASSWORD: 'testpassword',
    DB_URL: 'mongodb+srv://zarnapatel:testpassword@cluster0.cjxny.mongodb.net/testDB',
    BASE_URL: 'http://localhost:5000/api/v1',
    JWT_SECRET: '28afced9633d131ef970c84b0fd6a0fb69929b7cbdc87992caf0148b12d46f277ce2405f1b25aa027e85a5d334f5a06b35305e8f37f64f838fc7437d950fe188',
    ACCESS_TOKEN_SECRET: '28afced9633d131ef970c84b0fd6a0fb69929b7cbdc87992caf0148b12d46f277ce2405f1b25aa027e85a5d334f5a06b35305e8f37f64f838fc7437d950fe188',
};
const stag = {
    PORT: 5000,
    DB_USER_NAME: 'zarnapatel',
    DB_PASSWORD: 'testpassword',
    DB_URL: 'mongodb+srv://zarnapatel:testpassword@cluster0.cjxny.mongodb.net/testDB',
    BASE_URL: 'http://localhost:5000/api/v1',
    JWT_SECRET: '28afced9633d131ef970c84b0fd6a0fb69929b7cbdc87992caf0148b12d46f277ce2405f1b25aa027e85a5d334f5a06b35305e8f37f64f838fc7437d950fe188',
    ACCESS_TOKEN_SECRET: '28afced9633d131ef970c84b0fd6a0fb69929b7cbdc87992caf0148b12d46f277ce2405f1b25aa027e85a5d334f5a06b35305e8f37f64f838fc7437d950fe188',
};

if (process.env.NODE_ENV === 'stag') {
    console.log(`DB URL of ${process.env.NODE_ENV} MODE IS ${stag.DB_URL}`);
    module.exports = stag;
} else if (process.env.NODE_ENV === 'dev') {
    console.log(`DB URL of ${process.env.NODE_ENV} MODE IS ${dev.DB_URL}`);
    module.exports = dev;
} else if (process.env.NODE_ENV === 'prod') {
    console.log(`DB URL of ${process.env.NODE_ENV} MODE IS ${dev.DB_URL}`);
    module.exports = prod;
} else {
    console.log(`DB URL of ${process.env.NODE_ENV} MODE IS ${dev.DB_URL}`);
    module.exports = dev;
}
