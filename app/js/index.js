(function($) {
  'use strict';

  var gui            = require('nw.gui');
  var tiny           = require('../js/model/tiny-compta.js');
  var NewAccountCtrl = require('../js/controller/new_account.js');
  var WelcomeCtrl    = require('../js/controller/welcome.js');
  var NewLineCtrl    = require('../js/controller/new_line.js');

  tiny.init(gui.App.dataPath);

  var welcomeCtrl    = new WelcomeCtrl($('#app_content'), tiny, $);
  var newAccountCtrl = new NewAccountCtrl($('#app_content'), tiny);
  var newLineCtrl    = new NewLineCtrl($('#app_content'), tiny);

  $('#mnu_app_quit').on('click', function() {
    gui.App.closeAllWindows();
  });

  $('#mnu_new_account').on('click', function(e) {
    e.preventDefault();
    newAccountCtrl.render();
  });

  $('#mnu_new_line').on('click', function(e) {
    e.preventDefault();

    newLineCtrl.activeAccount = welcomeCtrl.selectedAccount;
    newLineCtrl.render();
  });

  $('.navbar-brand').on('click', function(e) {
    e.preventDefault();
    welcomeCtrl.render();
  });

  welcomeCtrl.render();

})(jQuery);
