const { app , BrowserWindow , Tray} = require('electron')
const { format } = require('url')

let win = null
let tray = null
const isMac = process.platform !== 'darwin'


const createOverlay = () => {
    win = new BrowserWindow({ 
        width: 800,
        height: 600,
        frame: true 
    })

    win.loadURL(format({
        pathname: path.join(__dirname, '/pages/Overlay/index.html'),
        protocal: 'file',
        slashes: true
    }))

    win.on('closed', () => {
        win = null
    })

    win.setOpacity(1)
    win.show()
}

app.on('ready', () => {createOverlay})



// word vector logo
// win.setOpacity()
// win.getOpacity()