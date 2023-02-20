/**
 * @name make window
 * @author PILLOSE
 * @description make window test
 * @version 0.0.1
 */

const windowOptions = {
    height : 40,
    width : 200,
    resizable : false,

    alwaysOnTop : true,
    minimizable : false,

    frame : false,

    opacity : 0.8
}

const options = {
    windowOptions : windowOptions
}

const path = process.env.APPDATA.replaceAll("\\", '/') + "/BetterDiscord/plugins/test.html"
const url = "file:///" + path

let win

module.exports = class ExamplePlugin {
    constructor() {
    }

    start() {
        win = BdApi.UI.openWindow(url, options)
    } 

    stop() {
    }
}
