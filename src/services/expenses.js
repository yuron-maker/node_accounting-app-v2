const { v4: uuidv4 } = require('uuid');
const usersService = require('../services/user');

let expenses = [];

const init = () => {
  expenses = [];
};

const getAll = (userId, categories, from, to) => {
  let filteredExpenses = [...expenses];

  filteredExpenses = filteredExpenses.filter((expense) => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (categories && expense.category !== categories) {
      return false;
    }

    if (from && to) {
      const dateFrom = new Date(from);
      const dateTo = new Date(to);

      if (
        dateFrom <= new Date(expense.spentAt) ||
        new Date(expense.spentAt) >= dateTo
      ) {
        return false;
      }

      return true;
    }
  });

  return filteredExpenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const create = (data) => {
  const user = usersService.getById(data.userId);

  if (!user) {
    return null;
  }

  const newExpense = {
    id: uuidv4(),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const update = (id, body) => {
  const Expense = getById(id);

  if (!Expense) {
    return null;
  }

  return Object.assign(Expense, body);
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  init,
};
