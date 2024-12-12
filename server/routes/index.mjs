import express from "express";

import { PostReservation, GetReservation, UpdateReservationStatus,GetReservationsByUserId } from "../controllers/reservationController.mjs";
import { GetItems,DeleteStateItem,GetItemById,EditItem } from "../controllers/itemController.mjs";

export const router = express.Router();

router.get("/items", GetItems);
router.get("/items/:id", GetItemById);
router.patch("/items/state", DeleteStateItem);
router.patch("/items/:id", EditItem);
router.post("/reservation", PostReservation);
router.get("/reservation", GetReservation);
router.get("/reservation/user/:userId", GetReservationsByUserId);
router.patch("/reservation/requestStatus/:id", UpdateReservationStatus);

