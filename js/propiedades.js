const ws = new WebSocket('ws://localhost:8080');
var propiedadesweb

ws.onopen = () => {
  console.log('Conectado al servidor');
  ws.send('propiedades')
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data)
  propiedadesweb = data
};

