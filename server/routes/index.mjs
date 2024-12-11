import express from "express";

import { PostReservation, GetReservation, UpdateReservationStatus } from "../controllers/reservationController.mjs";
import { GetItems,DeleteStateItem,GetItemById } from "../controllers/itemController.mjs";

export const router = express.Router();

router.get("/items", GetItems);
router.get("/items/:id", GetItemById);
router.patch("/items/state", DeleteStateItem);
router.post("/reservation", PostReservation);
router.get("/reservation", GetReservation);
router.patch("/reservation/requestStatus/:id", UpdateReservationStatus);

