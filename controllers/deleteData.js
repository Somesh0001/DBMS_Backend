import pool from "../config/dbConfig.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const deleteData = catchAsyncError(async (req, res, next) => {
    const { PersonID } = await req.body;
    const sql = "DELETE FROM RAWFRUITS WHERE PersonID=(?)";
    const bind = [PersonID ];
    const data = await pool.query(sql, bind);
    res.json({ message: data });
})