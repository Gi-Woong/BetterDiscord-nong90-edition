/**
 * @name make window
 * @author PILLOSE
 * @description make window test
 * @version 0.0.1
 */

const winOptions = {
    height : 40,
    width : 200,
    resizable : false,

    alwaysOnTop : true,
    minimizable : false,
    skipTaskbar: true,
    frame : false,

    opacity : 0.8,

    webPreferences : {
        nodeIntegration: true
    }
};

const html_path = process.env.APPDATA.replaceAll("\\", '/') + "/BetterDiscord/plugins/test.html";
const html_url = "file:///" + html_path;

const UI = BdApi.UI;

class Window {
    constructor() {
        this.winId = null;
    }

    async open(url, options) {
        this.winId = await UI.openWindow(url, options);
    }

    async exist() {
        return await UI.existWindow(this.winId);
    }

    async close() {
        return await UI.closeWindow(this.winId);
    }

    async run(script) {
        return await UI.runWindow(this.winId, script);
    }
}

const windows = [];

module.exports = class ExamplePlugin {
    constructor() {
    }

    start() {
        windows.push(new Window());
        windows[windows.length - 1].open(html_url, winOptions);
    } 

    async stop() {
        for (let w of windows) {
            if (await w.exist()) w.close();
        }
    }

    observer() {
        if (document.getElementById('guild-context') || document.getElementById('user-context')) {
            //this.isOk = false;
            var action_list = (document.getElementById('guild-context') !== null) ?
                document.getElementById('guild-context').children[0] : document.getElementById('user-context').children[0];

            if (action_list.childElementCount == 12) {
                var sep = action_list.children[1].cloneNode(true);
                var box = action_list.children[2].cloneNode(true);

                box.children[0].id = "plugin-test";
                box.children[0].children[0].innerText = "plugin test";

                action_list.append(sep);
                action_list.append(box);
            }
        }
    }
}
