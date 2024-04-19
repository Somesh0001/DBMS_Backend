import mysql2 from "mysql2";
import util from "util";

let pool = mysql2.createPool({
  host: "mysql-26cb9f7a-aayushkumarhigh-a519.l.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_AWteczG9eXcx2J7U11Q",
  port: "23558",
  database: "defaultdb",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("err", err);
  }
  if (connection) {
    console.log("database connected");
  }
});

pool.query = util.promisify(pool.query);

export default pool;
