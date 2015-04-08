CP = {online: true};
CP.APP_NAME = 'cupom';
CP.VERSION = '1.1.1';
CP.jsv = Math.ceil(Math.random() * 999999999999999) + 1;

//cookie para debug
//document.cookie="RDD=RDD; expires=Thu, 18 Dec 2053 12:00:00 UTC";

if (document.cookie.toString().indexOf('RDD=RDD') === -1) {
    CP.URL_API = 'http://200.155.13.171:8080/m_apps/cupomw/';
    CP.URL_APP = 'http://200.155.13.171:8080/m_apps/cupomw/';
    CP.URL_PUB = 'http://200.155.13.171:8080/m_apps/public/';
} else {
    CP.URL_APP = 'http://127.0.0.1/m_apps/cupomw/';
    CP.URL_API = 'http://127.0.0.1/m_apps/cupomw/';
    CP.URL_PUB = 'http://127.0.0.1/m_apps/public/';
}

MSG_SEM_NET = "Sua conexão com a internet parece estar desligada. Por favor verifique sua conexão e tente de novo.";

function app_connected() {
    if (typeof navigator == 'undefined' || typeof Connection == 'undefined')
        return true;

    //API antiga (com .network.)
    if (typeof navigator.network != 'undefined'
            && typeof navigator.network.connection != 'undefined'
            && typeof navigator.network.connection.type != 'undefined'
            && navigator.network.connection.type == Connection.NONE)
        return false;

    //nova API (direto em navigator.connection)
    if (typeof navigator.connection != 'undefined'
            && typeof navigator.connection.type != 'undefined'
            && navigator.connection.type == Connection.NONE)
        return false;

    return true;
}

//verificao confiavel que o jqm terminou de renderizar
function jqm_rendered() {
    return $('#jqm_container').hasClass('ui-mobile-viewport');
}

function load_ini_script() {
    $('#divsemnet').remove();
    $('head').append('<script' + ' type="text/javascript"' + ' src="' + CP.URL_APP + 'js/app.js?v=' + CP.jsv + '"' + '><' + '/' + 'script>');
}

$(function() {
    var wait_one_int = true;
    if (app_connected()) {
        load_ini_script();
    } else {
        var init_interval = window.setInterval(function() {
            if (app_connected()) {
                load_ini_script();
                window.clearInterval(init_interval);
            } else {
                if (wait_one_int) {
                    wait_one_int = false;
                } else {
                    $('#divsemnet').remove();
                    $('body').append('<div id="divsemnet" style="font-family:Arial">' + MSG_SEM_NET + '</div>');
                }
            }
        }, 1000);
    }
});