const messages = require("../db/messageSchema");
const Letter = require("../db/letterSchema");
const { encryptObject, decrptObject } = require("../auth/encrypt");
const getMessages = async () => (await messages.find({})).reverse();
const GetMessages = async (req, res) => {
  try {
    const Messages = await getMessages();
    res.send(encryptObject(Messages));
  } catch (err) {
    console.log(err);
  }
};

const emitMessages = async (io) => io.sockets.emit("chat", await getMessages());
/**
  @param {*} req=>req to save 
 * @param {*} io => io.sockets to emit
 */
const saveMessage = async (req, io) => {
  try {
    const message = new messages(req);
    const save = await message.save();
    emitMessages(io);
  } catch (err) {
    console.log(err);
  }
};
const SaveMessage = async (req, res) => {
  try {
    const data = decrptObject(req.body.data);
    const Message = await messages.insertMany(data.messages);
    res.send(encryptObject({ created: true, error: false }));
  } catch (err) {
    console.log(err);
    res.send(encryptObject({ created: false, error: false, err }));
  }
};
const updateMessages = async (req, io) => {
  try {
    const message = await messages.findByIdAndUpdate(req._id, req);
    io.sockets.emit("update", req._id);
    emitMessages(io);
  } catch (err) {
    console.log(err);
  }
};
const deleteMessage = async (req, io) => {
  try {
    const del = await messages.findByIdAndDelete(req._id);
  } catch (err) {
    console.log(err);
  }
};
const deleteLetterMessage = async (req, io) => {
  try {
    const letter = await messages.deleteMany({ letter_id: req._id });
    io.sockets.emit("delete_letter_message", { _id: req._id });
  } catch (err) {
    console.log(err);
  }
};
const DeleteLetterMessage = async (req, res) => {
  try {
    const decrpt = decrptObject(req.body.data);
    let { _id } = decrpt;
    const Messages = await messages.deleteMany({ letter_id: _id });

    let encrpt = encryptObject({
      Messages,
      deleted: true,
      error: false,
      message: "",
    });
    res.send(encrpt);
  } catch (err) {
    console.log(err);
    let encrpt = encryptObject({ deleted: false, error: true, message: err });
    res.send(encrpt);
  }
};
module.exports = {
  updateMessages,
  saveMessage,
  emitMessages,
  getMessages,
  SaveMessage,
  deleteMessage,
  deleteLetterMessage,
  DeleteLetterMessage,
  GetMessages,
};
