const prisma = require("../db/prisma");

const { validationResult } = require("express-validator");

//CRUD
const UsersController = {
  findAll: async (req, res) => {
    try {
      //SELECT firstName, lastName, email FROM users ORDER BY email DESC
      const users = await prisma.user.findMany({
        select: {
          firstName: true,
          lastName: true,
          email: true,
          profile: {
            select: {
              id: true,
              nickName: true,
              street: true,
              number: true,
              postalCode: true,
              city: true,
            },
          },
        },
        orderBy: [
          {
            email: "desc",
          },
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },
  findById: (req, res) => {},
  findByEmail: (req, res) => {},
  //eventueel in een authController
  register: (req, res) => {
    const result = validationResult(req);
    if (result.errors.isEmpty) {
      res.json(req.body);
    }
    res.status(500).json(result.errors);
  },
  login: (req, res) => {},
  logout: (req, res) => {},
};

module.exports = UsersController;

//pand en regios = veel-op-veel relaties
