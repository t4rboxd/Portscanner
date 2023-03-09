const request = require('request');
const process = require('process');

const apiKey = 'GGX7Q-FR5K1-DF052-L0JJY';
const ipAddress = process.argv[2];

if (!ipAddress) {
  console.error('Please provide an IP address as an argument.');
  process.exit(1);
}

const apiUrl = `https://webresolver.nl/api.php?key=${apiKey}&json&action=portscan&string=${ipAddress}`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  const results = JSON.parse(body);

  const openPorts = results.ports.filter(port => port.open === 'true').map(port => port.port);

  if (openPorts.length > 0) {
    console.log(`Open ports for ${ipAddress}: ${openPorts.join(', ')}`);
  } else {
    console.log(`No open ports found for ${ipAddress}.`);
  }
});
