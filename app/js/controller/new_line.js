(function() {
  'use strict';

  var _ = require('underscore');

  var AbstractCtrl = require(__dirname + '/abstract_controller.js');

  var NewLineCtrl = function(container, tiny) {
    AbstractCtrl.call(this, container, tiny);

    this.account = this.tiny.dblayer.account;

    this.activeAccount = null;
  };

  NewLineCtrl.prototype = Object.create(AbstractCtrl.prototype);
  NewLineCtrl.prototype.constructor = AbstractCtrl;

  NewLineCtrl.prototype.render = function() {
    if (null === this.activeAccount) {
      return;
    }

    var account = this.account.get(this.activeAccount);
    if (account) {
      var view = {
        account: account.name,
        mvTypes: [
          {id: -1, name: 'débit'},
          {id: 1, name:'crédit'}
        ]
      };

      this.container.html(
        this.mustache.render(this.viewBuffer, view)
      );

      this._initControls();
      this._mapEvents();
    }
  };

  NewLineCtrl.prototype._getViewName = function() {
    return 'new_line.html';
  };

  NewLineCtrl.prototype._initControls = function() {
    this.txtLabel    = this.container.find('#txtLabel');
    this.txtAmount   = this.container.find('#txtAmount');
    this.cmbMvType   = this.container.find('#cmbMvType');
    this.btnSaveLine = this.container.find('#btnSaveLine');

    this.txtLabel.focus();
  };

  NewLineCtrl.prototype._mapEvents = function() {
    var self = this;

    this.btnSaveLine.on('click', function(e) {
      e.preventDefault();

      var account   = self.account.get(self.activeAccount);
      var lnid      = 0;
      var amountVal = parseFloat(
        self.txtAmount.val()) * parseInt(self.cmbMvType.val()
      );

      if (0 < account.lines.length) {
        lnid = _.last(account.lines).id + 1;
      }

      var line = {
        id: lnid,
        label: self.txtLabel.val(),
        amount: amountVal.toFixed(2)
      };

      account.lines.push(line);
      self.account.save();

      self.txtLabel.val('');
      self.txtAmount.val('');
      self.txtLabel.focus();
    });

  };

  module.exports = NewLineCtrl;

}).call(this);
