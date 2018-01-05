module.exports = function() {

    var UaObj;

    UaObj = (function() {
        function UaObj() {
            this.checkUA();
        }

        UaObj.prototype.uaObj = {
            uaDevice: 'device-pc',
            uaOS: false,
            uaBrowser: false
        };

        UaObj.prototype.checkUA = function() {
            userAgent = navigator.userAgent.toLowerCase();
            appVersion = navigator.appVersion.toLowerCase();

            if (userAgent.indexOf('iphone') > 0 || userAgent.indexOf('ipod') > 0 || userAgent.indexOf('android') > 0) {
                this.uaObj.uaDevice = 'device-mobile';
            }

            if (userAgent.indexOf('ipad') > 0) {
                this.uaObj.uaDevice = 'ipad';
            }

            if (userAgent.indexOf('win') > 0) {
                this.uaObj.uaOS = 'win';
            } else if (userAgent.indexOf('mac') > 0) {
                this.uaObj.uaOS = 'mac';
            }

            if (userAgent.indexOf('opera') !== -1) {
                return this.uaObj.uaBrowser = 'opera';
            } else if (userAgent.indexOf("msie") !== -1) {
                if (appVersion.indexOf("msie 6.") !== -1) {
                    return this.uaObj.uaBrowser = 'ie6';
                } else if (appVersion.indexOf("msie 7.") !== -1) {
                    return this.uaObj.uaBrowser = 'ie7';
                } else if (appVersion.indexOf("msie 8.") !== -1) {
                    return this.uaObj.uaBrowser = 'ie8';
                } else if (appVersion.indexOf("msie 9.") !== -1) {
                    return this.uaObj.uaBrowser = 'ie9';
                } else {
                    return this.uaObj.uaBrowser = 'ie10';
                }
            } else if (userAgent.indexOf('trident') !== -1) {
                return this.uaObj.uaBrowser = 'ie11';
            } else if (userAgent.indexOf('chrome') !== -1) {
                return this.uaObj.uaBrowser = 'chrome';
            } else if (userAgent.indexOf('safari') !== -1) {
                return this.uaObj.uaBrowser = 'safari';
            } else if (userAgent.indexOf('firefox') !== -1) {
                return this.uaObj.uaBrowser = 'firefox';
            } else {
                return this.uaObj.uaBrowser = false;
            }
        };

        return UaObj;

    })();

    ua = new UaObj();
};
