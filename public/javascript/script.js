const socket = this.io.connect('http://localhost:3000');

socket.emit('log on', { username: 'johnny' });
socket.on('lobby', (data) => {
  const div = this.document.createElement('li');
  div.innerHTML = data.message;
  this.document.getElementById('chat').appendChild(div);
  this.window.scrollTo(0, this.document.body.scrollHeight);
});

const sendMsg = (e) => {
  e.preventDefault();
  socket.emit('message', { message: this.document.getElementById('message').value });
};

this.document.getElementById('form').addEventListener('submit', sendMsg);
