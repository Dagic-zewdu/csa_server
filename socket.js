const {
  emitLetterrs,
  createLetter,
  editLetter,
  deleteLetter,
  getLetters,
} = require("./controllers/letter");
const {
  saveMessage,
  getMessages,
  updateMessages,
  deleteMessage,
  deleteLetterMessage,
} = require("./controllers/messages");
const {
  setConnection,
  emitConnections,
  allConnections,
} = require("./controllers/userConnection");
const userConnection = require("./db/connectionSchema");

const webSocket = (io) =>
  io.on("connection", (socket) => {
    var emp_id;
    /**Registers new connected user to the db */
    const user = async (emp) => {
      const users = await userConnection.find({
        emp_id: emp,
        status: "connected",
      });
      const connectedusers = await allConnections();
      users.length
        ? io.sockets.emit("users", connectedusers)
        : setConnection(
            { emp_id, status: "connected", connected_time: Date.now() },
            io
          );
    };

    /**onConnect save the the connected user to db */
    socket.on("onConnect", (data) => {
      emp_id = data.emp_id;
      emp_id ? user(data.emp_id) : () => {};
    });
    socket.on("users", async () => {
      const users = await allConnections();
      io.sockets.emit("users", users);
    });
    socket.emit("outgoing data", new Date());

    /**recieving chat from client */
    socket.on("submit", (data) => {
      saveMessage(data, io);
    }); //for saving message
    socket.on("update", (data) => updateMessages(data, io)); //for updating message
    socket.on("delete", (data) => deleteMessage(data, io)); // for deleting message
    socket.on("delete_letter_message", (data) => deleteLetterMessage(data, io)); // for deleting message
    /**typing broadcast */
    socket.on("typing", (data) =>
      io.sockets.emit("typing", { emp_id: data.emp_id })
    );
    socket.on("typing_letter", (data) =>
      io.sockets.emit("typing_letter", { emp_id: data.emp_id })
    );

    /**sending chat message */
    socket.on("chat", async () => {
      const messages = await getMessages();
      io.sockets.emit("chat", messages);
    });

    /**updating chat message */
    socket.on("update", (data) => updateMessages(data, io));

    /**letter on socket connection */
    socket.on("letters", async () => {
      const letters = await getLetters();
      io.sockets.emit("letters", letters);
    });
    socket.on("create_letter", (data) => createLetter(data, io)); //create letter
    socket.on("update_letter", (data) => editLetter(data, io)); //update letter
    socket.on("delete_letter", (data) => deleteLetter(data, io)); //delete letter

    /**update db while user is diconnected */
    socket.on("disConnect", () => {
      emp_id
        ? setConnection(
            {
              emp_id,
              status: "disconnected",
              disconnected_time: Date.now(),
            },
            io
          )
        : () => {};
    });
    socket.on("disconnect", () => {
      emp_id
        ? setConnection(
            {
              emp_id,
              status: "disconnected",
              disconnected_time: Date.now(),
            },
            io
          )
        : () => {};
    });
  });
module.exports = { webSocket };
