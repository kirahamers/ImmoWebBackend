const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const TypePandenController = {
  findAll: async (req, res) => {
    try {
      const typePanden = await prisma.typePanden.findMany();
      res.json(typePanden);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },

  findById: async (req, res) => {
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
      res.status(500).json({ error: "Something went wrong" });
    }
  },
};

module.exports = TypePandenController;
