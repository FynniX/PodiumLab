const ACCNodeWrapper = require('acc-node-wrapper');

class API {
    static isConnected = false;
    static wrapper = new ACCNodeWrapper();

    static Connect() {
        API.wrapper.initBroadcastSDK(process.env.SERVER_DISPLAYNAME, process.env.SERVER_IP, process.env.SERVER_PORT, process.env.SERVER_PASS, process.env.SERVER_COMMANDPASS, process.env.UPDATE_INTERVAL, false);
        API.wrapper.initSharedMemory(process.env.UPDATE_INTERVAL, process.env.UPDATE_INTERVAL, process.env.UPDATE_INTERVAL, false);
        API.isConnected = true;
    }

    static Disconnect() {
        API.wrapper.Disconnect();
        API.wrapper.disconnectSharedMemory();
        API.isConnected = false;
    }
}

module.exports = API;