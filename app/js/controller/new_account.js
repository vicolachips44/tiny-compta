(function() {
  'use strict';

  var AbstractCtrl = require(__dirname + '/abstract_controller.js');

  var NewAccountCtrl = function(container, tiny) {
    AbstractCtrl.call(this, container, tiny);

    this.account     = this.tiny.dblayer.account;
    this.accountType = this.tiny.dblayer.accountType;
  };

  NewAccountCtrl.prototype = Object.create(AbstractCtrl.prototype);
  NewAccountCtrl.prototype.constructor = AbstractCtrl;

  NewAccountCtrl.prototype.render = function() {
    var view = {
      accountTypes: []
    };

    for (var i = 0; i < this.accountType.items.length; i++) {
      var item = this.accountType.items[i];
      view.accountTypes.push({
        id: item.cid,
        name: item.name
      });
    }

    this.container.html(
      this.mustache.render(this.viewBuffer, view)
    );

    this._initControls();
    this._mapEvents();
  };

  NewAccountCtrl.prototype._getViewName = function() {
    return 'new_account.html';
  };

  NewAccountCtrl.prototype._initControls = function() {
    this.container.find('#txtAccountName').focus();
  };

  NewAccountCtrl.prototype._mapEvents = function() {
    var self = this;

    this.container.find('#btnSaveAccount').on('click', function() {
      self.account.insert({
        name: self.container.find('#txtAccountName').val(),
        actId: self.container.find('#cmbAccountType').val(),
        lines: []
      });
    });
  };

  module.exports = NewAccountCtrl;

}).call(this);
