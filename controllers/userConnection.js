const userConnection = require("../db/connectionSchema");

/* returns array of user connection to the server with status mentioned
  in the database schema
*/
const allConnections = async () => await userConnection.find({});
/*returns array of connected users */
const connectedUsers = async () =>
  await userConnection.find({ status: "connected" });
/**
 
@param {*} io =>io for broadcisting  
 */
const emitConnections = async (io) =>
  io.sockets.emit("users", await allConnections());
/**save connection to the db based on object provided
 *@param {*} user=>an object to save
 *  @param {*} socket=> refers the socket object to emit
 */
const saveConnection = async (user, socket) => {
  try {
    let connection = new userConnection(user);
    let Save = await connection.save();
    let connected = await connectedUsers();
    console.log(connected.length + " user connected");
    emitConnections(socket);
  } catch (err) {
    console.log(err);
  }
};
/**save connection to the db based on object provided
 *@param {*} user=>an object to save
 *  @param {*} socket=> refers the socket object to emit
 */
const setConnection = async (user, socket) => {
  try {
    const findUser = await userConnection.find({ emp_id: user.emp_id });
    if (findUser.length > 0) {
      const update = await userConnection.findByIdAndUpdate(
        findUser[0]._id,
        user
      );
      let connected = await connectedUsers();
      console.log(connected.length + " user connected");
      emitConnections(socket);
    } else {
      saveConnection(user, socket);
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { setConnection, allConnections, emitConnections };
