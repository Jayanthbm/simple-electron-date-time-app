const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

let overlayWindow;

app.on("ready", () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  overlayWindow = new BrowserWindow({
    width: 130,
    height: 40,
    x: width - 130,
    y: height - 50,
    resizable: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  overlayWindow.loadFile(path.join(__dirname, "widget.html"));

  // Watch for file changes and reload the window
  const watchFiles = () => {
    mainWindow.webContents.reload();
  };

  // Set up file watchers for HTML, CSS, and JavaScript files
  const htmlPath = path.join(__dirname, "widget.html");
  const cssPath = path.join(__dirname, "styles.css");

  // Reload the window when any of the specified files change
  require("chokidar")
    .watch([
      htmlPath,
      cssPath /*, Add paths to JavaScript files if applicable */,
    ])
    .on("change", () => {
      watchFiles();
    });
});
