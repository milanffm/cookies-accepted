(function (DOC) {
    'use strict';
    // options : cookie name, labels, links etc - DEFAULTS
    // **this can be opened as an API later, so that client has an option to set
    // this up
    var options = {
        cookieName: 'cookiesAccepted',
        cookieValue: true,
        cookieValidForDays: 365,
        lang: {
            default: 'de',
            switchFromURL: true,
            switches: [
                {en: '/en/'}
                //{it : '/it'} // make sure there us a i18n for this new switch
            ]
        },
        i18n: {
            de: {
                cookieText: 'Cookies erleichtern die Nutzung dieser Website. Wenn Sie diese Website nutzen, erklären Sie sich damit einverstanden, dass wir Cookies verwenden.',
                cookieInfoLink: 'datenschutz.html',
                cookieInfoLinkTxt: 'weitere Informationen',
                accept: 'ok'
            },
            en: {
                cookieText: 'This web page uses Cookies for an actual representation of many contents.',
                cookieInfoLink: 'datenschutz.html',
                cookieInfoLinkTxt: 'more information',
                accept: 'ok'
            }
        }
    };

    // set Cookie
    function setCookie() {
        var date = new Date();
        date.setTime(date.getTime() + (options.cookieValidForDays * 24 * 60 * 60 * 1000));
        DOC.cookie = options.cookieName + '=' + options.cookieValue + '; expires=' + date.toGMTString() + '; path=/';
    
    }

    // set Cookie
    // returns true / null
    function getCookie() {
        var theCookie = DOC.cookie.split(';').filter(function (ck) {
            return ck.indexOf(options.cookieName) >= 0;
        });
        return theCookie.length > 0 ? theCookie[0].split("=").pop() : null;
    }

    // create cookie popup
    // **DOM elements creation process can be save in a template, this will allow
    // clients to configure the look and feel completely
    function createPopup(lang) {
        var body = DOC.querySelector('body');
        var container = DOC.createElement('div');
        var paragraph = DOC.createElement('p');
        var link = DOC.createElement('a');
        var okButton = DOC.createElement('span');

        container.classList.add('accept-cookies');
        paragraph.innerHTML = options.i18n[lang].cookieText;
        link.setAttribute('href', options.i18n[lang].cookieInfoLink);
        link.innerHTML = options.i18n[lang].cookieInfoLinkTxt;
        okButton.classList.add('cookie-ok');
        okButton.innerHTML = options.i18n[lang].accept;
        okButton.addEventListener('click', function () {
            setCookie();
            body.removeChild(container);
        });
        container.appendChild(paragraph);
        container.appendChild(link);
        container.appendChild(okButton);
        body.appendChild(container);
    }

// check the cookie and render the popup
    if (!getCookie()) {
        // get the default language
        var lang = options.lang.default;
        console.log(lang);
        // if switchFromURL is true, lop through switches
        if (options.lang.switchFromURL) {
            var matchedLang = options.lang.switches.filter(function (swtch) {
                return window.location.pathname.search(Object.keys(swtch)[0]) > 0;
            });
            lang = matchedLang.length > 0 ? Object.keys(matchedLang[0])[0] : lang;
        }
        createPopup(lang);
    }
})(document);