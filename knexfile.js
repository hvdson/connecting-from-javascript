// Update with your config settings.

const settings = require('./settings');

module.exports = {

  development: {
    client: 'postgresql',
    connection: settings,
    migrations: {
      tableName: 'create_milestones'
    }
  }
  
};
