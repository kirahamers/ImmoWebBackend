const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const AfbeeldingenController = {
  findAll: async (req, res) => {
    try {
      const afbeeldingen = await prisma.afbeelding.findMany();
      res.json(afbeeldingen);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "fout bij ophalen afbeeldingen" });
    }
  },

  create: async (req, res) => {
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
      res.status(500).json({ error: "fout bij aanmaken afbeelding" });
    }
  },

  findById: async (req, res) => {
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
        res.status(404).json({ error: "afbeelding not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "fout bij zoeken van afbeelding" });
    }
  },

  update: async (req, res) => {
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
      res.status(500).json({ error: "fout bij updaten afbeelding" });
    }
  },

  delete: async (req, res) => {
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
      res.status(500).json({ error: "fout bij verwijderen afbeelding" });
    }
  },
};

module.exports = AfbeeldingenController;
