const pg = require("pg");
const settings = require("./settings");
const values = process.argv.slice(2);
const firstName = values[0];
const lastName = values[1];
const birthDate = values[2];
const parts = birthDate.split('-');
const insertBirthDate = new Date(parts[0], parts[1] - 1, parts[2]);

// console.log(insertDate);

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


knexSearch = knex.select("*").from('famous_people').where('last_name', 'like', `${values}`).orderBy('last_name', 'desc');


function showDb (helperFntn) {
  knexSearch.asCallback( (err, rows) => {
    if (err) {
      throw err;
    }
    // console.log(rows);
    helperFntn(rows);
  });
}

knex("famous_people")
  .insert({first_name: firstName, last_name: lastName, birthdate: insertBirthDate})
  .whereNotExists( () => {
    this.select('*').from("famous_people").where('last_name', lastName);
  });
  // .asCallback( (err, rows) => {
  //   if (err) {
  //     throw err;
  //   }
  //   showDb(displayResults);
  // });

knex.destroy();


