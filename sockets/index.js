let rooms = [];
let users = [];

const isRoomAlive = (roomId) =>
    rooms.filter((room) => room.id === roomId).length > 0;

const findRoom = (roomId) => rooms.find((room) => room.id === roomId);

const removeUserFromRoom = (roomId, userId) => {
    rooms = rooms.map((room) => {
        if (room.id === roomId)
            return {
                ...room,
                users: room.users.filter((user) => user.id !== userId)
            };
    });
};

const createRoom = (roomId) => {
    const newRoom = { id: roomId, users: [], messages: [] };
    rooms.push(newRoom);
    return newRoom;
};

const addMessageToRoom = (roomId, user, text) => {
    const room = findRoom(roomId);
    room.messages = [{user, text}, ...room.messages];
};

module.exports = {
    findRoom,
    createRoom,
    isRoomAlive,
    removeUserFromRoom,
    addMessageToRoom
};
