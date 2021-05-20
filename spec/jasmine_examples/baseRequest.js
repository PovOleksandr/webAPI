
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

        getMethod(){return this.resMethod;}
}

module.exports = BaseRequest;
