
let axios = require('axios');

class BaseRequest{

    constructor( userMethod,userUrl, userHeader={}, userData={}) {
        this.method = userMethod;
        this.url = userUrl;
        this.header = userHeader;
        this.data = userData;

        }

        run(expectation){

            let resMethod = {
                method:this.method,
                url: this.url,
                headers: this.header,
                data: this.data
            };

            it(expectation, async function() {
                let responseStatus =0;
                await axios(resMethod)
                    .then( function (response) {
                        responseStatus  = response.status;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                expect(responseStatus).toBe(200);

            }, 10000);
        }
}

module.exports = BaseRequest;