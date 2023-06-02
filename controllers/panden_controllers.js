const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const PandenController = {
  findAll: async (req, res) => {
    try {
      const panden = await prisma.panden.findMany();
      res.json(panden);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "fout bij ophalen panden" });
    }
  },

  create: async (req, res) => {
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
      res.status(500).json({ error: "fout bij aanmaken pand" });
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

      res.json(updatedPand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "fout bij updaten pand" });
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
        res.status(404).json({ error: "pand niet gevonden" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "fout bij zoeken pand" });
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

      res.json(updatedPand);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "fout bij updaten pand" });
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
      res.status(500).json({ error: "fout bij verwijderen pand" });
    }
  },
};

module.exports = PandenController;
