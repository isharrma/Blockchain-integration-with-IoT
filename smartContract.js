// Device registration and access control 

asset Device {
  string deviceId unique
  string iotEndpoint  
  string color // Current color state
  bool active
}

// Register a new device
function registerDevice(string deviceId, string iotEndpoint) {

  if (deviceExists(deviceId)) {
    throw new Error('Device already registered')
  }

  var device = Device {
    deviceId: deviceId,
    iotEndpoint: iotEndpoint,
    color: "OFF", // default OFF state
    active: true  
  }

  addAsset(device)

} 

// Contract to store device state
asset DeviceState {
  string deviceId
  int red
  int blue
  int green
  int brightness
  string timestamp
}

// Function to update device state
function updateDeviceState(string deviceId, int red, int blue, int green, int brightness) {

  if(!deviceExists(deviceId)) {
    throw new Error('Unknown device')
  }

  var state = DeviceState {
    deviceId: deviceId,
     red : red,
     blue : blue,
     green : green,
     brightness : brightness,
    timestamp: currentTime() 
  }

  addAsset(state) // Add new state

  // Update device color
  updateColor(deviceId, red, blue, green,brightness) 

}
