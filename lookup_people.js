const pg = require("pg");
const settings = require("./settings");
const values = process.argv.slice(2);
const searchQuery = `
SELECT * FROM famous_people 
WHERE last_name LIKE $1::text ORDER BY last_name`;

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


// Helper Function to loop through result rows
function displayResults (result) {
  const resultLength = result.rows.length;
  console.log(`Found ${resultLength} person(s) by the name '${values}':`);
  let i = 1;

  for (let row of result.rows) {
    const firstName = row.first_name;
    const lastName = row.last_name;
    const birthdate = row.birthdate.toISOString().split("T")[0];
    console.log(`- ${i}: ${firstName} ${lastName} born '${birthdate}'`);
    i++;
  }
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(searchQuery, values, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    displayResults(result);
    client.end();
  });
});


