const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Haal alle afbeeldingen op
router.get("/", async (req, res) => {
  try {
    const afbeeldingen = await prisma.afbeelding.findMany();
    res.json(afbeeldingen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Maak een nieuwe afbeelding aan
router.post("/", async (req, res) => {
  const { url, pandId } = req.body;
  try {
    const afbeelding = await prisma.afbeelding.create({
      data: {
        url,
        pandId: parseInt(pandId),
      },
    });
    res.json(afbeelding);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Haal een specifieke afbeelding op
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const afbeelding = await prisma.afbeelding.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (afbeelding) {
      res.json(afbeelding);
    } else {
      res.status(404).json({ error: "Afbeelding not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
