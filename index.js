const indexContacts = require("./contacts");

// Test the functionality
indexContacts.listContacts().then(console.log);
indexContacts.getContactById("some-id").then(console.log);
indexContacts
  .addContact("John Doe", "john.doe@example.com", "123-456-7890")
  .then(() => console.log("Contact added"));
indexContacts
  .removeContact("some-id")
  .then(() => console.log("Contact removed"));

//using yargs

const argv = require("yargs").argv;
const indexContacts = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      indexContacts.listContacts().then(console.table);
      break;

    case "get":
      indexContacts.getContactById(id).then(console.log);
      break;

    case "add":
      indexContacts
        .addContact(name, email, phone)
        .then(() => console.log("Contact added"));
      break;

    case "remove":
      indexContacts
        .removeContact(id)
        .then(() => console.log("Contact removed"));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

//using commander

const { Command } = require("commander");
const program = new Command();
const indexContacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "indexContacts id")
  .option("-n, --name <type>", "indexContacts name")
  .option("-e, --email <type>", "indexContacts email")
  .option("-p, --phone <type>", "indexContacts phone");

program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      indexContacts.listContacts().then(console.table);
      break;

    case "get":
      indexContacts.getContactById(id).then(console.log);
      break;

    case "add":
      indexContacts
        .addContact(name, email, phone)
        .then(() => console.log("Contact added"));
      break;

    case "remove":
      indexContacts
        .removeContact(id)
        .then(() => console.log("Contact removed"));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
