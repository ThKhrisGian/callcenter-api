import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();
export const db = new sqlite.Database("./database/testdb.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Conectado a la base de datos SQLite.");
  }
});