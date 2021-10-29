const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const API = require('./api');
require('dotenv').config();

function createWindow() {
    // Create the browser window.
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        title: "PodiumHub",
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, 'preload.js')
        }
    });

    //Removes the Menubar.
    window.removeMenu();
    // Load URL
    window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    // Open the DevTools.
    isDev && window.webContents.openDevTools({ mode: 'detach' });

    ipcMain.on('ReadyToListen', event => {
        if(!API.isConnected)
            API.Connect();

        API.wrapper.on("REGISTRATION_RESULT", res => event.reply("REGISTRATION_RESULT", res));
        API.wrapper.on("REALTIME_UPDATE", res => event.reply("REALTIME_UPDATE", res));
        API.wrapper.on("REALTIME_CAR_UPDATE", res => event.reply("REALTIME_CAR_UPDATE", res));
        API.wrapper.on("ENTRY_LIST", res => event.reply("ENTRY_LIST", res));
        API.wrapper.on("TRACK_DATA", res => event.reply("TRACK_DATA", res));
        API.wrapper.on("ENTRY_LIST_CAR", res => event.reply("ENTRY_LIST_CAR", res));
        API.wrapper.on("BROADCASTING_EVENT", res => event.reply("BROADCASTING_EVENT", res));
        API.wrapper.on("M_PHYSICS_RESULT", res => event.reply("M_PHYSICS_RESULT", res));
        API.wrapper.on("M_GRAPHICS_RESULT", res => event.reply("M_GRAPHICS_RESULT", res));
        API.wrapper.on("M_STATIC_RESULT", res => event.reply("M_STATIC_RESULT", res));
    })
}

app.whenReady().then(createWindow);
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());
app.on('window-all-closed', () => {
    process.platform !== 'darwin' && app.quit();
    if(API.isConnected)
        API.Disconnect();
});