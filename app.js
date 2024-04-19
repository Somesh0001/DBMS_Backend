import express from "express";
import ErrorMiddleWare from "./middleware/Error.js";
import pool from "./config/dbConfig.js";

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

import fruits from "./routes/fruitsRoute.js";
import { urlencoded } from "express";
app.use("/api/v1", fruits);

app.get("/q1", async (req, res) => {
  const result = await pool.query(
    "WITH STORE_PRODUCT_RANK AS (SELECT store_id, ucc, freq, ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY freq DESC) AS product_rank FROM (SELECT store_id, ucc, COUNT(*) AS freq FROM order_details GROUP BY store_id, ucc) AS STORE_ORDERS) SELECT store_id, ucc AS product_id, freq AS total_orders FROM STORE_PRODUCT_RANK WHERE product_rank <= 20;"
  );
  console.log(result);
  return res.send(result);
});

app.get("/q2", async (req, res) => {
  const result = await pool.query(
    "SELECT s.state, p.ucc, p.brand_id, b.brand_name, p.type_id, t.cat_ID, t.subcat_ID, SUM(od.qty_bought) AS total_sold FROM orders o JOIN store s ON o.store_id = s.store_id JOIN order_details od ON o.order_detail_id = od.order_detail_id JOIN product p ON od.ucc = p.ucc JOIN brand b ON p.brand_id = b.brand_id JOIN type t ON p.type_id = t.type_id GROUP BY s.state, p.ucc ORDER BY s.state, total_sold DESC LIMIT 20;"
  );
  console.log(result);
  return res.send(result);
});

app.get("/q3", async (req, res) => {
  const result = await pool.query(
    "SELECT s.store_id, s.state, s.district, COUNT(order_id) AS total_sales_this_year FROM store s LEFT JOIN orders o ON s.store_id = o.store_id WHERE YEAR(o.order_date) = YEAR(CURRENT_DATE()) GROUP BY s.store_id, s.state, s.district ORDER BY total_sales_this_year DESC;"
  );
  console.log(result);
  return res.send(result);
});

app.get("/q4", async (req, res) => {
  const result = await pool.query(
    "SELECT store_id AS stores_where_coke_outsells_pepsi FROM (SELECT s.store_id FROM store s JOIN order_details od ON od.store_id = s.store_id JOIN product p ON od.ucc = p.ucc JOIN brand b ON b.brand_id = p.brand_id GROUP BY s.store_id HAVING SUM(CASE WHEN b.brand_name = 'COLA' THEN od.qty_bought ELSE 0 END) > SUM(CASE WHEN b.brand_name = 'PEPSI' THEN od.qty_bought ELSE 0 END)) AS store_sales;"
  );
  console.log(result);
  return res.send(result);
});

app.get("/q5", async (req, res) => {
  const result = await pool.query(
    "SELECT scat.subcat_name, COUNT(o.order_id) AS total_orders FROM orders o JOIN order_details od ON o.order_detail_id = od.order_detail_id JOIN product p ON od.ucc = p.ucc JOIN type t ON p.type_id = t.type_id JOIN subcategory scat ON t.subcat_ID = scat.subcat_ID WHERE scat.subcat_name != 'milk' GROUP BY scat.subcat_name ORDER BY total_orders DESC LIMIT 3;"
  );
  console.log(result);
  return res.send(result);
});

export default app;

app.use(ErrorMiddleWare);
