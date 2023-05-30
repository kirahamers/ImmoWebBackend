const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const PandenController = {
  findAll: async (req, res) => {
    try {
      const panden = await prisma.panden.findMany();
      res.json(panden);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },

  create: async (req, res) => {
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
  },

  findById: async (req, res) => {
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
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { straat, huisnummer, postcode, gemeente, prijs } = req.body;
    try {
      const updatedPand = await prisma.panden.update({
        where: {
          id: parseInt(id),
        },
        data: {
          straat,
          huisnummer,
          postcode,
          gemeente,
          prijs,
        },
      });
      res.json(updatedPand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.panden.delete({
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

module.exports = PandenController;
