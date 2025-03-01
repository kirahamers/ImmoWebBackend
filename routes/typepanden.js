const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

//haal alle typePanden op
router.get("/", async (req, res) => {
  try {
    const typePanden = await prisma.typePanden.findMany();
    res.json(typePanden);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fout bij GET typepanden" });
  }
});

//maak een nieuw typePand aan
router.post("/", async (req, res) => {
  const { naam } = req.body;
  try {
    const typePand = await prisma.typePanden.create({
      data: {
        naam,
      },
    });
    res.json(typePand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fout bij POST typepand" });
  }
});

//haal een specifiek typePand op
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const typePand = await prisma.typePanden.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (typePand) {
      res.json(typePand);
    } else {
      res.status(404).json({ error: "TypePand not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fout bij GET typepand by id" });
  }
});

//update een bestaand typePand
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { naam } = req.body;
  try {
    const updatedTypePand = await prisma.typePanden.update({
      where: {
        id: parseInt(id),
      },
      data: {
        naam,
      },
    });
    res.json(updatedTypePand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fout bij UPDATE typepand" });
  }
});

//verwijder een typePand
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.typePanden.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "TypePand deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fout bij DELETE typepand" });
  }
});

module.exports = router;
