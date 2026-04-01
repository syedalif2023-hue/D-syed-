function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Syed Personal Cloud')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// File upload karne ke liye function
function uploadFileToDrive(base64Data, fileName) {
  try {
    var contentType = base64Data.substring(5, base64Data.indexOf(';'));
    var bytes = Utilities.base64Decode(base64Data.split(',')[1]);
    var blob = Utilities.newBlob(bytes, contentType, fileName);
    
    // Ye aapke Drive ke root folder mein save karega
    DriveApp.createFile(blob);
    return "Mubarak ho! File upload ho gayi.";
  } catch (e) {
    return "Error: " + e.toString();
  }
}

// Drive se files ki list lene ke liye function
function getFilesList() {
  var files = DriveApp.getFiles();
  var list = [];
  while (files.hasNext()) {
    var file = files.next();
    list.push({
      name: file.getName(),
      url: file.getDownloadUrl(),
      view: file.getUrl()
    });
  }
  return list;
}
