
class BaseRequest{

    constructor( userMethod,userUrl, userHeader={}, userData={}) {
        this.method = userMethod;
        this.url = userUrl;
        this.header = userHeader;
        this.data = userData;
        this.resMethod = {
            method:this.method,
            url: this.url,
            headers: this.header,
            data: this.data
            };
        }

        run(expectation){
            it(expectation, async function() {
                let responseStatus =0;
                await axios(this.resMethod)
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