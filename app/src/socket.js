import {io} from "socket.io-client";

const socket = io.connect(`${process.env.REACT_SOCKET_IP}:${process.env.REACT_SOCKET_PORT}`)

export const onEvent = (evt, cb) => {
    if (evt === 'REGISTRATION_RESULT')
        socket.on('REGISTRATION_RESULT', result => cb(result))

    if (evt === 'REALTIME_UPDATE')
        socket.on('REALTIME_UPDATE', result => cb(result))

    if (evt === 'REALTIME_CAR_UPDATE')
        socket.on('REALTIME_CAR_UPDATE', result => cb(result))

    if (evt === 'ENTRY_LIST')
        socket.on('ENTRY_LIST', result => cb(result))

    if (evt === 'TRACK_DATA')
        socket.on('TRACK_DATA', result => cb(result))

    if (evt === 'ENTRY_LIST_CAR')
        socket.on('ENTRY_LIST_CAR', result => cb(result))

    if (evt === 'BROADCASTING_EVENT')
        socket.on('BROADCASTING_EVENT', result => cb(result))
}

export const RequestConnection = () => socket.emit('RequestConnection')
export const Disconnect = () => socket.emit('Disconnect')
export const RequestEntryList = () => socket.emit('RequestEntryList')
export const RequestTrackData = () => socket.emit('RequestTrackData')
export const SetFocus = () => socket.emit('SetFocus')
export const SetCamera = () => socket.emit('SetCamera')
export const RequestInstantReplay = () => socket.emit('RequestInstantReplay')
export const RequestHUDPage = () => socket.emit('RequestHUDPage')