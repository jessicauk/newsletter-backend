export default () => {
  return {
    type: 'postgres', // type of our database
    host: process.env.DATABASE_HOST, // database host
    port: parseInt(process.env.DATABASE_PORT, 10), // database host
    username: process.env.DATABASE_USERNAME, // username
    password: process.env.DATABASE_PASSWORD, // user password
    database: process.env.DATABASE_NAME, // name of our database,
    autoLoadEntities: true, // models will be loaded automatically
    synchronize: true,
  } as Record<string, any>;
};
