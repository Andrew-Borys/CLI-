const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  if (!result) {
    return `Sorry, contact with id:${id} not find...`;
  }
  return result;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return console.log(
      `Sorry, ERROR REMOVING... contact with id: ${id} not find... `
    );
  }
  const [removeContact] = contacts.splice(idx, 1);
  console.log(removeContact);
  updateContacts(contacts);
  return removeContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: ObjectID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
