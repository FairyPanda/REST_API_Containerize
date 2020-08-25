export default class Errorhandler {
    constructor(error) {
        this.errormessage = null;
        if (error == null) {
            this.errormessage = null;
        }
        else if (typeof (error.response) == "undefined" || error.response == "" || error.response == {}) {
            this.errormessage = error;
        }
        else if (typeof (error.response.data) == "undefined" || error.response.data == "" || error.response.data == {}) {
            this.errormessage = error;
        }
        else {
            var message = JSON.stringify(error.response.data);
            message = message.replace(/,/g, "\n");
            message = message.replace(/{/g, "");
            message = message.replace(/}/g, "");
            message = message.replace(/\[/g, "");
            message = message.replace(/\]/g, "");
            message = message.replace(/\"/g, "");
            this.errormessage = message;
        }
    }
    showalert(successmessage) {
        if (this.errormessage) {
            alert(this.errormessage);
        }
        else if (successmessage) {
            alert(successmessage);
        }
    }
}