const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

//haal alle regio's op
router.get("/", async (req, res) => {
  try {
    const regios = await prisma.regio.findMany();
    res.json(regios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fout bij GET regio" });
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
    res.status(500).json({ error: "fout bij POST regio" });
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
    res.status(500).json({ error: "fout bij GET regio by id" });
  }
});

// Update een bestaande regio
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { naam } = req.body;
  try {
    const updatedRegio = await prisma.regio.update({
      where: {
        id: parseInt(id),
      },
      data: {
        naam,
      },
    });
    res.json(updatedRegio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fout bij UPDATE regio" });
  }
});

// Verwijder een regio
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.regio.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Regio deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "fout bij DELETE regio" });
  }
});

module.exports = router;
