const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const RegioController = {
  findAll: async (req, res) => {
    try {
      const regios = await prisma.regio.findMany();
      res.json(regios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "fout bij ophalen panden" });
    }
  },

  findById: async (req, res) => {
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
        res.status(404).json({ error: "regio niet gevonden" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "fout bij ophalen pand" });
    }
  },
};

module.exports = RegioController;
