const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Haal alle gebruikers op
router.get("/", async (req, res) => {
  try {
    const gebruikers = await prisma.gebruikers.findMany();
    res.json(gebruikers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Maak een nieuwe gebruiker aan
router.post("/", async (req, res) => {
  const { voorNaam, achterNaam, email, wachtwoord } = req.body;
  try {
    const gebruiker = await prisma.gebruikers.create({
      data: {
        voorNaam,
        achterNaam,
        email,
        wachtwoord,
      },
    });
    res.json(gebruiker);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Haal een specifieke gebruiker op
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const gebruiker = await prisma.gebruikers.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (gebruiker) {
      res.json(gebruiker);
    } else {
      res.status(404).json({ error: "Gebruiker not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
