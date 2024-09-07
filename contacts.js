const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: document each function
function listContacts() {
  // Read contacts from file
  return fs.promises
    .readFile(contactsPath, "utf8")
    .then((data) => JSON.parse(data))
    .catch((error) => console.error("Error reading contacts:", error));
}

function getContactById(contactId) {
  // Get contact by ID
  return listContacts()
    .then((contacts) => contacts.find((contact) => contact.id === contactId))
    .catch((error) => console.error("Error finding contact by ID:", error));
}

function removeContact(contactId) {
  // Remove contact by ID
  return listContacts()
    .then((contacts) => {
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      return fs.promises.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2)
      );
    })
    .catch((error) => console.error("Error removing contact:", error));
}

function addContact(name, email, phone) {
  // Add new contact
  return listContacts()
    .then((contacts) => {
      const newContact = { id: generateId(), name, email, phone };
      contacts.push(newContact);
      return fs.promises.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2)
      );
    })
    .catch((error) => console.error("Error adding contact:", error));
}

function generateId() {
  // Generate a unique ID for contacts
  return Math.random().toString(36).substr(2, 9);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
