
const token = "azQvzgDs8Z0AAAAAAAAAAVXByCzBUBtVTeGka0mZIpcS6_p0IQTxhsQZpr5bUGXJ";
let reporters = require('jasmine-reporters');

let TeamCityReporter = new reporters.TeamCityReporter ({
    savePath: __dirname,
    consolidateAll: false
});

jasmine.getEnv().addReporter(TeamCityReporter)

let BaseRequest = require('./../baseRequest');

describe("Upload file to dropbox", function() {
  let request = new BaseRequest(token,"post", "https://content.dropboxapi.com/2/files/upload",
                               {'Dropbox-API-Arg': '{"mode":"add","autorename":true,"mute":false,"path":"/pleaseWork.txt"}',
                                'Content-Type': 'application/octet-stream'},
                               {binary: "/pleaseWork.txt"});

  request.run("File loaded successfully");
});

describe("Get metadata", function(){
    let request = new BaseRequest(token, "post","https://api.dropboxapi.com/2/files/get_metadata",
                                 {'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${token}`},
                                 {"path":"/pleaseWork.txt"});

    request.run("Metadata gotten successfully");
});

describe("Delete file", function(){
    let request = new BaseRequest(token,'post','https://api.dropboxapi.com/2/files/delete_v2',
                                 {'Authorization': `Bearer ${token}`,
                                  'Content-Type': 'application/json'},
                                 {"path":"/pleaseWork.txt"});

    request.run("Deleted successfully");
});
