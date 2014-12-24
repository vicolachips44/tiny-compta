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
      accountTypes: this.accountType.items
    };

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
    this.txtAccName       = this.container.find('#txtName');
    this.cmbAccType       = this.container.find('#cmbType');
    this.btnSaveAcc       = this.container.find('#btnSave');
    this.txtInitialAmount = this.container.find('#txtInitialAmount');

    this.txtAccName.focus();
  };

  NewAccountCtrl.prototype._mapEvents = function() {
    var self = this;

    this.btnSaveAcc.on('click', function() {
      self.account.insert({
        name: self.txtAccName.val(),
        accountTypeId: self.cmbAccType.val(),
        initialAmount: parseFloat(self.txtInitialAmount.val()).toFixed(2),
        lines: []
      });
    });
  };

  module.exports = NewAccountCtrl;

}).call(this);
