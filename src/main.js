const { app, screen, BrowserWindow , Tray, Menu} = require('electron')
const { format } = require('url')
const path = require('path')
const { imge } = require('./utils/functions')
require('dotenv').config()
const tmi = require('tmi.js')
const { decode } = require('punycode')


let win = null
let tray = null
const isMac = process.platform !== 'darwin'
const trayIcon = imge('tray-icon', 1)

app.on('ready', () => {
    createOverlay()
    createTray()
    api()
})

const createOverlay = () => {
    const { height } = screen.getPrimaryDisplay().workAreaSize

    const yAxis = (height / 2) - 100

    win = new BrowserWindow({ 
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        frame: false,
        x: 0,
        y: yAxis
    })

    win.setIgnoreMouseEvents(true)

    win.loadURL(format({
        pathname: path.join(__dirname, '/pages/Overlay/index.html'),
        protocal: 'file',
        slashes: true
    }))

    win.on('closed', () => {
        win = null
    })

    win.show()
    
}


const createTray = () => {
    tray = new Tray(trayIcon)

    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Twitch Chat Overlay' },

        { 
            label: 'Position',
            submenu: [
                { label: 'Left', click() { win.setPosition(0, (height / 2) - 100) }},
                { label: 'Right', click() { win.setPosition(width - 320, (height / 2) - 100) }},
            ]
        },

        { type: 'separator' },
        { label: 'Reload', click: () => {
            win.webContents.reload()
        } },
        { role: 'quit' },


    ])

    tray.setContextMenu(contextMenu)
}

const api = () => {
    const client = new tmi.Client({
        options: { debug: true },
        connection: {
            reconnect: true,
            secure: true
        },
        identity: {
            username: process.env.TWITCH_USERNAME,  //
            password: process.env.TWITCH_AUTH_CLIENT, //
        },
        channels: [ process.env.TWITCH_USERNAME ]
    })
    
    client.connect()
    client.on('message', (channel, tags, message, self) => {
        if (self) return

            process.env.USER_NAME = self
            process.env.USER_TEXT = message
    })
}