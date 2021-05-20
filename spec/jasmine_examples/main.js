
const token = "azQvzgDs8Z0AAAAAAAAAAVXByCzBUBtVTeGka0mZIpcS6_p0IQTxhsQZpr5bUGXJ";
let reporters = require('jasmine-reporters');

let TeamCityReporter = new reporters.TeamCityReporter ({
    savePath: __dirname,
    consolidateAll: false
});

jasmine.getEnv().addReporter(TeamCityReporter)

let BaseRequest = require('./baseRequest');

describe("Upload file to dropbox", function() {
  let axios = require('axios');
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  let request = BaseRequest("post", "https://content.dropboxapi.com/2/files/upload",
      {'Dropbox-API-Arg': '{"mode":"add","autorename":true,"mute":false,"path":"/pleaseWork.txt"}',
                'Content-Type': 'application/octet-stream'},
        {binary: "/pleaseWork.txt"});

  let postMethod = request.getMethod();

  it("All loaded successfuly", async function() {
      let responseStatus =0;
      await axios(postMethod)
      .then( function (response) {
        responseStatus  = response.status;
      })
      .catch(function (error) {
         console.log(error);
      });

  expect(responseStatus).toBe(200);
    
  }, 10000);
});

describe("Get metadata", function(){
  let axios = require('axios');
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  let getMethod = {
       method: 'post',
       url: 'https://api.dropboxapi.com/2/files/get_metadata',
       headers: { 
         'Content-Type': 'application/json', 
         'Authorization': `Bearer ${token}`
       },
       data : {
        "path":"/pleaseWork.txt"
       }
    };

  it("Metadata gotten successfuly", async function() {

    let responseStatus =0;
    await axios(getMethod)
    .then(function (response) {
      responseStatus = response.status;
    })
    .catch(function (error) {
      console.log(error);
    });

    expect(responseStatus).toBe(200);
  }, 10000);
});

describe("Delete file", function(){
  let axios = require('axios');
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  it("Deleted successfuly", async function() {
    let deleteMethod = {
    method: 'post',
    url: 'https://api.dropboxapi.com/2/files/delete_v2',
    headers: { 
    'Authorization': `Bearer ${token}`, 
    'Content-Type': 'application/json'
    },
    data : {
        "path":"/pleaseWork.txt"
    }
};
  let responseStatus =0;
  await axios(deleteMethod)
    .then(function (response) {
      responseStatus = response.status;
    })
    .catch(function (error) {
       console.log(error);
    });
  expect(responseStatus).toBe(200);    
  }, 10000);
});
