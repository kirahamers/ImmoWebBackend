const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const RegioController = {
  findAll: async (req, res) => {
    try {
      const regios = await prisma.regio.findMany();
      res.json(regios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },

  create: async (req, res) => {
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
      res.status(500).json({ error: "Something went wrong" });
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
        res.status(404).json({ error: "Regio not found" });
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
      res.status(500).json({ error: "Something went wrong" });
    }
  },

  delete: async (req, res) => {
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
      res.status(500).json({ error: "Something went wrong" });
    }
  },
};

module.exports = RegioController;
