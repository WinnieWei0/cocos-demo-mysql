import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import options from './mikro-orm.config';

import { User } from "../entities/UserEntity";

/**
 * This demo makes use of Mikro ORM to manage the database connection and CRUD operations of our User entity (https://mikro-orm.io/)
 */

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<User>
};

/**
 * Initiate connection to the database
 */
export async function connect() {
  // Parse MySQL connection string from environment variable
  const dbUrl = process.env.DEMO_DATABASE;
  if (dbUrl) {
    const url = new URL(dbUrl);
    options.host = url.hostname;
    options.port = parseInt(url.port) || 3306;
    options.user = url.username;
    options.password = url.password;
    options.dbName = url.pathname.substring(1); // Remove leading slash
  }

  DI.orm = await MikroORM.init(options);

  DI.em = DI.orm.em;
}