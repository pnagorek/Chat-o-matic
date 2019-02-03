let currentUser;
let currentRoom = 'lobby';

const getAllUsers = () => {
  this.fetch('/users')
    .then(res => res.json())
    .then((json) => {
      const users = json.allUsers;

      users.forEach((user) => {
        const div = this.document.createElement('li');
        div.innerHTML = user;
        this.document.getElementById('users').appendChild(div);
      });
    });
};

this.document.addEventListener('DOMContentLoaded', () => {
  const socket = this.io.connect('http://localhost:3000');

  const getAllRooms = () => {
    this.fetch('/rooms')
      .then(res => res.json())
      .then((json) => {
        const { rooms } = json;

        rooms.forEach((room) => {
          const div = this.document.createElement('li');
          div.innerHTML = room.name;
          div.addEventListener('dblclick', (event) => {
            socket.removeListener(currentRoom);
            socket.emit('joinRoom', { roomName: event.target.innerHTML });
            currentRoom = event.target.innerHTML;
            this.document.getElementById(
              'room-header',
            ).innerHTML = `CURRENT ROOM: '${currentRoom}'`;
            this.document.getElementById('chat').innerHTML = '';
            const div1 = this.document.createElement('li');
            div1.innerHTML = `Joined new room: '${currentRoom}'`;
            this.document.getElementById('chat').appendChild(div1);
            socket.on(currentRoom, (data) => {
              const div2 = this.document.createElement('li');
              div2.innerHTML = data.message;
              this.document.getElementById('chat').appendChild(div2);
            });
          });
          this.document.getElementById('rooms').appendChild(div);
        });
      });
  };

  this.fetch('/users/getCurrent')
    .then(res => res.json())
    .then((json) => {
      currentUser = json.username;
      this.document.getElementById('user-welcome').innerHTML = `Witaj, ${currentUser}`;
      socket.emit('log on', { username: currentUser });
      socket.on('lobby', (data) => {
        if (currentRoom === 'lobby') {
          const div = this.document.createElement('li');
          div.innerHTML = data.message;
          this.document.getElementById('chat').appendChild(div);
          // this.window.scrollTo(0, this.document.body.scrollHeight);
        }
      });
    });

  const sendMsg = (e) => {
    e.preventDefault();
    socket.emit('message', {
      message: `${currentUser}: ${this.document.getElementById('message').value}`,
    });
    this.document.getElementById('message').value = '';
  };

  this.document.getElementById('form').addEventListener('submit', sendMsg);

  getAllUsers();
  getAllRooms();

  const createRoomButton = this.document.getElementById('create-room-button');
  createRoomButton.addEventListener('click', () => {
    const val = this.document.getElementById('room-message').value;
    if (val) {
      this.fetch('/rooms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: val, owner: currentUser }),
      }).then(() => {
        this.document.getElementById('room-message').value = '';
        this.document.getElementById('rooms').innerHTML = '';
        getAllRooms();
        socket.emit('joinRoom', { roomName: val });
        currentRoom = val;
      });
    }
  });
});
