const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

//haal alle afbeeldingen op
router.get("/", async (req, res) => {
  try {
    const afbeeldingen = await prisma.afbeelding.findMany();
    res.json(afbeeldingen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fout bij GET afbeelding" });
  }
});

//maak een nieuwe afbeelding aan
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
    res.status(500).json({ error: "fout bij POST afbeelding" });
  }
});

//haal een specifieke afbeelding op
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
    res.status(500).json({ error: "fout bij GET afbeelding by id" });
  }
});

//update een specifieke afbeelding
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
    res.status(500).json({ error: "fout bij PUT afbeelding" });
  }
});

//verwijder een specifieke afbeelding
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
    res.status(500).json({ error: "fout bij DELETE afbeelding" });
  }
});

//verwijder afbeeldingen op basis van pandId
router.delete("/pand/:pandId", async (req, res) => {
  const { pandId } = req.params;
  try {
    const deletedAfbeeldingen = await prisma.afbeelding.deleteMany({
      where: {
        pandId: parseInt(pandId),
      },
    });
    res.json(deletedAfbeeldingen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fout bij DELETE afbeeldingen" });
  }
});

module.exports = router;
