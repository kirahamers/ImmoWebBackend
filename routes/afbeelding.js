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

// Update een specifieke afbeelding
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { url, pandId } = req.body;
  try {
    const updatedAfbeelding = await prisma.afbeelding.update({
      where: {
        id: parseInt(id),
      },
      data: {
        url,
        pandId: parseInt(pandId),
      },
    });
    res.json(updatedAfbeelding);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Verwijder een specifieke afbeelding
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAfbeelding = await prisma.afbeelding.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedAfbeelding);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
