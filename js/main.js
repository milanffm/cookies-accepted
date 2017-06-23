
/**
 * Cookie Accept popup function
 */

function coociesAccepted() {

    var _body, _content, _cookieName, _cookieText, _cookieInfoLink, _cookieInfoLinkText, _cookieOk;
    var _lang = 'de';

    /**
     * set the language to en if ulrs contains /en/:
     */
    if (window.location.pathname.search('/en/') === 0) {
        _lang = 'en';
    }

    _body = document.querySelector('body');
    _content = document.createElement('div');
    _cookieName = 'cookiesAccepted';
    _cookieText = {
        de: 'Cookies erleichtern die Nutzung dieser Website. Wenn Sie diese Website nutzen, erklären Sie sich damit einverstanden, dass wir Cookies verwenden.',
        en: 'This web page uses Cookies for an actual representation of many contents.'
    };
    _cookieInfoLink = {
        de: 'datenschutz.html',
        en: 'datenschutz.html'
    };
    _cookieInfoLinkText = {
        de: 'weitere Informationen',
        en: 'more information'
    };
    _cookieOk = {
        de: 'ok',
        en: 'ok'
    };

    /**
     * create Cookie
     * @param name
     * @param value
     * @param days
     */
    function createCookie(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        }
        else {
            expires = '';

        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

    /**
     * read Cookie
     * @param name
     * @returns {*}
     */
    function readCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    /**
     * create Cookie Popup
     */

    function createPopup() {

        if (readCookie(_cookieName)) {
            console.log('cookie set');
            return
        }

        var _text = document.createElement('p'),
            _aInfo = document.createElement('a'),
            _ok = document.createElement('span');

        // set dom Elements
        _ok.classList.add('cookie-ok');
        _content.classList.add('accept-cookies');
        _aInfo.setAttribute('href', _cookieInfoLink[_lang]);
        _aInfo.innerHTML = _cookieInfoLinkText[_lang];
        _ok.innerHTML = _cookieOk[_lang];
        _text.innerHTML = _cookieText[_lang];
        _content.appendChild(_text);
        _content.appendChild(_aInfo);
        _content.appendChild(_ok);
        _body.appendChild(_content);

        // add Eventlistener
        _ok.addEventListener('click', closePopup);

    }

    /**
     * set cookie and close popup
     */
    function closePopup() {
        _body.removeChild(_content);
        createCookie(_cookieName, true, 365)
    }

    createPopup();

    console.log(_cookieName, readCookie(_cookieName));

}

/**
 * load the function after DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function() {
    coociesAccepted()
});
