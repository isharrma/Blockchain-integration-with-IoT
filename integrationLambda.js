// Import AWS Managed Blockchain SDK
const { ManagedBlockchain } = require('aws-sdk');

// Create blockchain client 
const client = new ManagedBlockchain({
  nodeId: 'node-1',
  networkId: 'my-network'
});

// Function to register device
async function registerDevice(deviceId, iotEndpoint) {

  const params = {
    function: 'registerDevice',
    params: {
      deviceId: deviceId, 
      iotEndpoint: iotEndpoint
    }
  };

  return client.submitTransaction(params).promise();

}

// Function to update device state
async function updateDeviceState(deviceId, red,green,blue,brightness) {

  const params = {
    function: 'updateDeviceState',
    params: {
      deviceId: deviceId,
      red: red,
      blue: blue,
      green: green,
      brightness: brightness
    }
  };

  return client.submitTransaction(params).promise();

}

// Handler function
exports.handler = async (event) => {

  // Register new simulated device
  await registerDevice(event.deviceId, event.iotEndpoint);
  
  // Update color state
  await updateDeviceState(event.deviceId, event.red, event.blue,event.green,event.brightness);

  return {
    status: 'success'
  };
