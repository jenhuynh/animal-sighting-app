import dotenv from "dotenv";
import pgp from "pg-promise";

const db = initDb();

// export const getTasks = async () => await db.any("SELECT * FROM tasks");
//getting all information from table
export const getSightings = async () =>
  await db.any(
    "SELECT sightings.individual_id, individuals.nickname, sightings.healthy, sightings.location, sightings.date, sightings.time, sightings.email FROM individuals JOIN sightings ON individuals.id=sightings.individual_id;",
  );

// export const addTask = (name) =>
//   db.one("INSERT INTO tasks(name) VALUES(${name}) RETURNING *", { name });

// animal is this object
export const addSighting = async (sightings) =>
  await db.one(
    "INSERT INTO sightings(individual_id, location, healthy, email, date, time) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      sightings["individual_id"],
      sightings["location"],
      sightings["healthy"],
      sightings["email"],
      sightings["date"],
      sightings["time"],
    ],
  );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    dotenv.config({ path: "../.env" });
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
