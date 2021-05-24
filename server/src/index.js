require('dotenv').config()
const ACCNodeWrapper = require('acc-node-wrapper')
const {
    SOCKET_PORT,
    SERVER_DISPLAYNAME,
    SERVER_IP,
    SERVER_PORT,
    SERVER_PASS,
    SERVER_COMMANDPASS,
    UPDATE_INTERVAL
} = process.env

const io = require('socket.io')(SOCKET_PORT)
const wrapper = new ACCNodeWrapper(SERVER_DISPLAYNAME, SERVER_IP, SERVER_PORT, SERVER_PASS, SERVER_COMMANDPASS, UPDATE_INTERVAL, false)

io.on("connection", socket => {
    /*==== Forwarding Socket Request to Wrapper ====*/
    socket.on("RequestConnection", () => wrapper.RequestConnection())
    socket.on("Disconnect", () => wrapper.Disconnect())
    socket.on("RequestEntryList", () => wrapper.RequestEntryList())
    socket.on("RequestTrackData", () => wrapper.RequestTrackData())
    socket.on("SetFocus", () => wrapper.SetFocus())
    socket.on("SetCamera", () => wrapper.SetCamera())
    socket.on("RequestInstantReplay", () => wrapper.RequestInstantReplay())
    socket.on("RequestHUDPage", () => wrapper.RequestHUDPage())

    /*==== Forwarding Events to Socket ====*/
    wrapper.on("REGISTRATION_RESULT", result => {
        socket.emit("REGISTRATION_RESULT", result)
    })

    wrapper.on("REALTIME_UPDATE", result => {
        socket.emit("REALTIME_UPDATE", result)
    })

    wrapper.on("REALTIME_CAR_UPDATE", result => {
        socket.emit("REALTIME_CAR_UPDATE", result)
    })

    wrapper.on("ENTRY_LIST", result => {
        socket.emit("ENTRY_LIST", result)
    })

    wrapper.on("TRACK_DATA", result => {
        socket.emit("TRACK_DATA", result)
    })

    wrapper.on("ENTRY_LIST_CAR", result => {
        socket.emit("ENTRY_LIST_CAR", result)
    })

    wrapper.on("BROADCASTING_EVENT", result => {
        socket.emit("BROADCASTING_EVENT", result)
    })
})