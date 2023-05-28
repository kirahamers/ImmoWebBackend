const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Haal alle regio's op
router.get("/", async (req, res) => {
  try {
    const regios = await prisma.regio.findMany();
    res.json(regios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Maak een nieuwe regio aan
router.post("/", async (req, res) => {
  const { naam } = req.body;
  try {
    const regio = await prisma.regio.create({
      data: {
        naam,
      },
    });
    res.json(regio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Haal een specifieke regio op
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const regio = await prisma.regio.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (regio) {
      res.json(regio);
    } else {
      res.status(404).json({ error: "Regio not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
