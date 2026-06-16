const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  onForceLogout: (callback) => {
    const handler = () => callback();
    ipcRenderer.on('force-logout', handler);
    return () => ipcRenderer.removeListener('force-logout', handler);
  },
  logoutDone: () => ipcRenderer.send('logout-done'),
});
