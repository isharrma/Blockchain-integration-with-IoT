// Lambda function triggered by IoT Core rules

exports.handler = async (event) => {

  // Get deviceId and color from message 
  const deviceId = event.deviceId;
  const red = event.red;
  const blue = event.blue;
  const green = event.green:
  const brightness = event.brightness;

  // Construct transaction payload
  const payload = {
    function: 'updateDeviceState', 
    params: {
      deviceId: deviceId,
      red : red,
      blue : blue,
      green : green,
      brightness: brightness,
    }
  };

  // Submit transaction to blockchain network
  const client = createBlockchainClient(); 
  await client.submitTransaction(payload);

  // Construct response  
  const response = {
    status: 'success',
    message: 'State updated in blockchain' 
  };

  // Return response back to device simulator  
  return response;

};

// Helper method to create blockchain client
function createBlockchainClient() {

  // Configure AWS Managed Blockchain SDK
  const client = new ManagedBlockchain({
    nodeId: 'node-1', 
    networkId: 'my-network' 
  });

  return client;

}
