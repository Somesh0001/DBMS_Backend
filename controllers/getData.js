import pool from '../config/dbConfig.js'
import { catchAsyncError } from '../middleware/catchAsyncError.js'

export const getData = catchAsyncError(async (req, res, next) => {
    const sql = "SELECT * FROM RAWFRUITS";
    const data = await pool.query(sql);
    res.json({ "data": data });
});


