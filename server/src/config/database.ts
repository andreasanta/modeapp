import * as Knex from 'knex';
import keys from './keys';

export default Knex.knex({
    client: 'pg',
    connection: keys.pg.connectionString,
    searchPath: ['modeapp', 'public'],
});
