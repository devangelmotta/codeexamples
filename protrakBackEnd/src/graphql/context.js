const { PrismaClient } = require('@prisma/client');
const { readUserSession } = require('../utils/auth');

const prisma = new PrismaClient();

const createContext = ({ event }) => {
  return { prisma, userSession: readUserSession(event) };
};

module.exports = {
  createContext,
};
