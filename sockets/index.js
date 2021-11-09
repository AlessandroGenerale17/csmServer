let rooms = [];

const isRoomAlive = (roomId) =>
    rooms.filter((room) => room.id === roomId).length > 0;

const findRoom = (roomId) => rooms.find((room) => room.id === roomId);

const findUserInRoom = (room, userId) =>
    room.users.find((user) => userId === user.id);

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

const removeRoom = (roomId) => {
    rooms = rooms.filter((room) => room.id !== roomId);
};

const addMessageToRoom = (roomId, user, text) => {
    const room = findRoom(roomId);
    room.messages = [{ user, text }, ...room.messages];
};

const getAllRooms = () => rooms;

module.exports = {
    findRoom,
    createRoom,
    isRoomAlive,
    removeUserFromRoom,
    addMessageToRoom,
    getAllRooms,
    removeRoom,
    findUserInRoom
};
