import express from 'express';
import migrationFactory from "./migrationFactory.js";
import { errorResponseObject, successResponseObject } from "../utils/responseObjects.js";

const migrationRouter = express.Router();


 migrationRouter.put('/:name', async (req, res) => {
     try {
         const migrationName = req.params.name;
         const migration = await migrationFactory(migrationName);
         if (!migration) {
             console.warn("Migration not found: ", migrationName);
             return res.status(404).json({message: "Migration not found"});
         }
         console.log("\n" + "Starting migration: " + migrationName);
         const result = await migration();
         console.log(result);
         if (result.success) {
             res.status(200).json({message: "Migration completed successfully", result});
         } else {
             res.status(400).json({message: "Migration failed"});
         }
         console.log("Migration result: ", result, "\n");
     } catch (err) {
         console.warn("Migration error:", err);
         res.status(500).json({error: "Migration error", details: err.message});
     }
 })


export default migrationRouter