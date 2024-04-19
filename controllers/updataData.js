import pool from "../config/dbConfig.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const updataData = catchAsyncError(async (req, res, next) => {
    const { PersonID, LastName, FirstName, Address, City } = await req.body;
    const sql =
        "UPDATE RAWFRUITS SET PersonID=?, LastName=?, FirstName=?, Address=?, City=? WHERE PersonID=? ";
    const bind = [PersonID, LastName, FirstName, Address, City, PersonID];
    const data = await pool.query(sql, bind);
    res.json({ data: data });
})