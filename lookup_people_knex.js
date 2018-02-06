const pg = require("pg");
const settings = require("./settings");
const values = process.argv.slice(2)[0];

const connection = {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname
};


const knex = require("knex")({
  client: 'pg',
  connection: connection
});

// // test connection to db
// console.log(knex.client, knex.connection);


// Helper Function to loop through result rows
function displayResults (result) {
  console.log(result.length);
  const resultLength = result.length;
  console.log(`Found ${resultLength} person(s) by the name '${values}':`);
  let i = 1;

  for (let row of result) {
    const firstName = row.first_name;
    const lastName = row.last_name;
    const birthdate = row.birthdate.toISOString().split("T")[0];
    console.log(`- ${i}: ${firstName} ${lastName} born '${birthdate}'`);
    i++;
  }
}

knex.select("*")
  .from('famous_people')
  .where('last_name', 'like', `${values}`)
  .orderBy('last_name', 'desc')
  .asCallback( (err, rows) => {
    if (err) {
      throw err;
    }
    // console.log(rows);
    displayResults(rows);
  });
