// Rotte che sarannno usate dalla TM UI

import express from "express";
import { setTimeMachine, resetTimeMachine, getNow } from "../timemachine.js";

const router = express.Router();

router.post("/set", (req, res) => {
  const { isoString } = req.body;
  if (!isoString) {
    return res.status(400).json({ error: "Missing isoString" });
  }
  setTimeMachine(isoString);
  res.json({ now: getNow().toISO() });
});

router.post("/reset", (req, res) => {
  resetTimeMachine();
  res.json({ now: getNow().toISO() });
});

router.get("/now", (req, res) => {
  res.json({ now: getNow().toISO() });
});

export default router;
