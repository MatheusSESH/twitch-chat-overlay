const { app , BrowserWindow , Tray} = require('electron')
const { overlayWindow } = require('electron-overlay-window')
const { format } = require('url')
const path = require('path')


let win = null
let tray = null
const isMac = process.platform !== 'darwin'


app.on('ready', () => {
    createOverlay()
})

const createOverlay = () => {
    win = new BrowserWindow({ 
        ...overlayWindow.WINDOW_OPTS,
        alwaysOnTop: true, 
        y: 0, 
        x: 0,
        frame: false
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
