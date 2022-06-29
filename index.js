const contactsOperation = require("./modules/contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const list = await contactsOperation.listContacts();
      console.log(list);
      break;

    case "get":
      const get = await contactsOperation.getContactById(id);
      console.log(get);
      break;

    case "add":
      const add = await contactsOperation.addContact(name, email, phone);
      console.log(add);
      break;

    case "remove":
      const remove = contactsOperation.removeContact(id);
      console.log(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

(async () => {
  await invokeAction(argv);
})();
