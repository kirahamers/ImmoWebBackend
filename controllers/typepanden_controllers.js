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

  create: async (req, res) => {
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

  update: async (req, res) => {
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
      res.status(500).json({ error: "Something went wrong" });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.typePanden.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
};

module.exports = TypePandenController;
