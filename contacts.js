const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.format({
  dir: "db",
  base: "contacts.json",
});

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data.toString())))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data.toString());
      const contact = parsedData.filter((contact) => contact.id === contactId);
      console.log(contact);
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data.toString());
      const newContacts = parsedData.filter(
        (contact) => contact.id !== contactId
      );
      fs.writeFile(contactsPath, JSON.stringify(newContacts));
      console.log(
        `contact with id: ${contactId} has been removed from contacts`
      );
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  const id = new Date().getTime().toString();
  const contact = { id, name, email, phone };

  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data.toString());
      const newContacts = [...parsedData, contact];
      fs.writeFile(contactsPath, JSON.stringify(newContacts));
      console.log(`${JSON.stringify(contact)} has been added to contacts`);
    })
    .catch((err) => console.log(err.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
