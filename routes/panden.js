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
  const {
    straat,
    huisnummer,
    bus,
    postcode,
    gemeente,
    prijs,
    aantalKamers,
    oppervlakte,
    beschrijving,
    typeId,
    regioId,
  } = req.body;

  try {
    const pand = await prisma.panden.create({
      data: {
        straat,
        huisnummer,
        bus,
        postcode,
        gemeente,
        prijs,
        aantalKamers,
        oppervlakte,
        beschrijving,
        typeId,
        regioId,
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

// Update een bestaand pand
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    straat,
    huisnummer,
    bus,
    postcode,
    gemeente,
    prijs,
    aantalKamers,
    oppervlakte,
    beschrijving,
    typeId,
    regioId,
  } = req.body;
  try {
    const updatedPand = await prisma.panden.update({
      where: {
        id: parseInt(id),
      },
      data: {
        straat,
        huisnummer,
        bus,
        postcode,
        gemeente,
        prijs,
        aantalKamers,
        oppervlakte,
        beschrijving,
        typeId,
        regioId,
      },
    });

    // Update de bijbehorende regio met het bijgewerkte pand
    await prisma.regio.update({
      where: {
        id: regioId,
      },
      data: {
        Panden: {
          connect: {
            id: updatedPand.id,
          },
        },
      },
    });

    // Update het bijbehorende typepand met het bijgewerkte pand
    await prisma.typePanden.update({
      where: {
        id: typeId,
      },
      data: {
        Panden: {
          connect: {
            id: updatedPand.id,
          },
        },
      },
    });

    res.json(updatedPand);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Verwijder een pand
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.panden.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ message: "Pand deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
