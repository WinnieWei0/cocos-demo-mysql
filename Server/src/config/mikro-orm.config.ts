import { Options } from '@mikro-orm/core';

import { User } from "../entities/UserEntity";

/** 
 * Mikro ORM Connection options object
 * MySQL database configuration
 *  */
const options: Options = {
  type: 'mysql',
  entities: [User],
  dbName: 'TechDemo4',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  charset: 'utf8mb4'
};

export default options;