const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const all = JSON.parse(data);
  return all;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  } else {
    return contact;
  }
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const ind = data.findIndex((item) => item.id === contactId);

  if (ind !== -1) {
    const deleteContact = data[ind];
    data.splice(ind, 1);
    await fs.writeFile(filePath, JSON.stringify(data));
    return deleteContact;
  }
  return null;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const data = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(data));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const ind = data.findIndex((item) => item.id === contactId);
  if (ind !== -1) {
    data[ind] = { ...data[ind], ...body };

    await fs.writeFile(filePath, JSON.stringify(data));
    return data[ind];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
