/*jshint esversion: 8 */
const { BrowserView, BrowserWindow, app } = require('electron');

const path = require('path'); //to be used in the preload options

function appInit() {
  const mainWindow = new BrowserWindow({
    width: 1301,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#2E2E2E'
  });
  const mainView = new BrowserView();

  mainWindow.addBrowserView(mainView);
  mainView.webContents.openDevTools();
  mainView.setBounds({
    x: 0,
    y: 0,
    width: 961,
    height: 800,
    minWidth: 665,
    webPreferences: {
      preload: path.join(__dirname, '/preload.js'), //this does not work!
      nodeIntegration: true //This does not seem to work either
    }
  });
  mainView.setAutoResize({ horizontal: true });

  let mainViewURL = 'http://www.electronjs.org/';
  mainView.webContents.loadURL(mainViewURL);


  const sideView = new BrowserView();
  mainWindow.addBrowserView(sideView);
  sideView.webContents.openDevTools();
  sideView.setBounds({
    x: 961,
    y: 0,
    width: 360,
    height: 800,
    resizable: false,
    minWidth: 360,
    maxWidth: 360,
    webPreferences: {
      preload: path.join(__dirname, '/preload.js'), //this does not work!
      nodeIntegration: true ,//This does not seem to work either
      nodeIntegrationInWorker: true //This does not seem to work either
    }
  });
  sideView.webContents.loadFile(__dirname + '/index.html');

  app.on('window-all-closed', () => {
    mainWindow.removeBrowserView(mainView);
    mainWindow.removeBrowserView(sideView);
    app.quit();
  });

}

app.whenReady().then(appInit);
