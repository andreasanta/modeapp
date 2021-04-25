import * as Knex from 'knex';
import keys from './keys';

const knex = Knex.knex({
    client: 'pg',
    connection: keys.pg.connectionString,
    searchPath: ['modeapp', 'public'],
});

// Force database migrations
(async () => {
    await knex.migrate.latest()
})()

export default knex
