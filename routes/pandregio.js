const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Haal alle pandRegio's op
router.get("/", async (req, res) => {
  try {
    const pandRegios = await prisma.pandRegio.findMany();
    res.json(pandRegios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Maak een nieuwe pandRegio aan
router.post("/", async (req, res) => {
  const { pandId, regioId, pandregiocol, gebruikersId } = req.body;
  try {
    const pandRegio = await prisma.pandRegio.create({
      data: {
        pandId: parseInt(pandId),
        regioId: parseInt(regioId),
        pandregiocol,
        gebruikersId: parseInt(gebruikersId),
      },
    });
    res.json(pandRegio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Haal een specifieke pandRegio op
router.get("/:pandId/:regioId/:gebruikersId", async (req, res) => {
  const { pandId, regioId, gebruikersId } = req.params;
  try {
    const pandRegio = await prisma.pandRegio.findUnique({
      where: {
        pandId: parseInt(pandId),
        regioId: parseInt(regioId),
        gebruikersId: parseInt(gebruikersId),
      },
    });
    if (pandRegio) {
      res.json(pandRegio);
    } else {
      res.status(404).json({ error: "PandRegio not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
