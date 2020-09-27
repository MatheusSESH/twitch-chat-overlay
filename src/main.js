const { app, screen, BrowserWindow , Tray, Menu} = require('electron')
const { format } = require('url')
const path = require('path')
const { imge } = require('./utils/functions')


let win = null
let tray = null
const isMac = process.platform !== 'darwin'
const trayIcon = imge('tray-icon', 1)

app.on('ready', () => {
    createOverlay()
    createTray()
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