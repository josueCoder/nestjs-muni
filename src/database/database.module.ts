import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'src/config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

// const client = new Client({
//   user: 'root',
//   host: 'localhost',
//   database: 'mydatabase',
//   password: 't2M04^"H5_mJ',
//   port: 9095, 
// });

// client.connect();
// client.query('SELECT * FROM tacks', (err, res) => {
//   if (err) {
//     console.log(err);  
//   } else {
//     console.log(res.rows);
//   }

// });



@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService : ConfigType<typeof config> ) => {
        const {user, host, database, password, port} = configService.postgres;

        const client = new Client({
          user ,
          host,  
          database : database,
          password,
          port, 
        });

        client.connect();
        return client;
      },
      inject: [ config.KEY ],
    },

  ],
  exports: ['API_KEY','PG'],
})
export class DatabaseModule {}
