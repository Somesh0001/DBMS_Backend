import express from "express";
import { getData } from "../controllers/getData.js";
import { postdata } from "../controllers/postData.js";
import { deleteData } from "../controllers/deleteData.js";
import { updataData } from "../controllers/updataData.js";


const routes = express.Router();


routes.route("/fruits").get(getData).post(postdata).delete(deleteData).put(updataData)



export default routes;