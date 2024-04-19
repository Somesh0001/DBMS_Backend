import pool from "../config/dbConfig.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const postdata = catchAsyncError(async (req, res, next) => {
    const { PersonID, LastName, FirstName, Address, City } = await req.body;
    if (!PersonID || !LastName || !FirstName || !Address || !City) {
        return res.json({ message: "Enter Data" });
    }
    const sqlCheck = "SELECT PersonID FROM RAWFRUITS";
    const user = await pool.query(sqlCheck);
    if (user) {
        return res.json({ message: "Allready registered" });
    }
    const sql =
        "INSERT INTO RAWFRUITS (PersonID, LastName, FirstName, Address, City) VALUES (?,?,?,?,?) ";
  const bind = [PersonID, LastName, FirstName, Address, City];
  const data = await pool.query(sql, bind);
   return res.json({ data: data });
});
