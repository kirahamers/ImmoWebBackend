const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Haal alle panden op
router.get("/", async (req, res) => {
  try {
    const panden = await prisma.panden.findMany();
    res.json(panden);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Maak een nieuw pand aan
router.post("/", async (req, res) => {
  const { straat, huisnummer, postcode, gemeente, prijs } = req.body;
  try {
    const pand = await prisma.panden.create({
      data: {
        straat,
        huisnummer,
        postcode,
        gemeente,
        prijs,
      },
    });
    res.json(pand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Haal een specifiek pand op
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pand = await prisma.panden.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (pand) {
      res.json(pand);
    } else {
      res.status(404).json({ error: "Pand not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
