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
      const regio = await prisma.regio.findUnique({
        where: {
          id: regioId,
        },
      });

      const type = await prisma.typePanden.findUnique({
        where: {
          id: typeId,
        },
      });

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
          type: {
            connect: {
              id: typeId,
            },
          },
          regio: {
            connect: {
              id: regioId,
            },
          },
        },
      });

      res.json(pand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { straat, huisnummer, postcode, gemeente, prijs, typeId, regioId } =
      req.body;

    try {
      const regio = await prisma.regio.findUnique({
        where: {
          id: regioId,
        },
      });

      const type = await prisma.typePanden.findUnique({
        where: {
          id: typeId,
        },
      });

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
          typeId,
          regioId,
          type: {
            connect: {
              id: type.id,
            },
          },
          Regio: {
            connect: {
              id: regio.id,
            },
          },
        },
      });

      res.json(updatedPand);
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
    const { straat, huisnummer, postcode, gemeente, prijs, typeId, regioId } =
      req.body;
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
