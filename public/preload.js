const {
    contextBridge,
    ipcRenderer
} = require("electron");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
})

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, ...args) => {
            let validChannels = ["ReadyToListen"];
            if (validChannels.includes(channel))
                ipcRenderer.send(channel, args);
        },
        on: (channel, func) => {
            let validChannels = [
                "REGISTRATION_RESULT",
                "REALTIME_UPDATE",
                "REALTIME_CAR_UPDATE",
                "ENTRY_LIST",
                "TRACK_DATA",
                "ENTRY_LIST_CAR",
                "BROADCASTING_EVENT",
                "M_PHYSICS_RESULT",
                "M_GRAPHICS_RESULT",
                "M_STATIC_RESULT"
            ];

            if (validChannels.includes(channel))
                ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
);