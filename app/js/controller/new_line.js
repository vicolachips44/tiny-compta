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
        account: account.name
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
    this.container.find('#txtLabel').focus();
  };

  NewLineCtrl.prototype._mapEvents = function() {
    var self = this;

    this.container.find('#btnSaveLine').on('click', function(e) {
      e.preventDefault();

      var account   = self.account.get(self.activeAccount);
      var lnid      = 0;
      var amountVal = parseFloat(self.container.find('#txtAmount').val());

      if (0 < account.lines.length) {
        lnid = _.last(account.lines).id + 1;
      }

      var line = {
        id: lnid,
        label: self.container.find('#txtLabel').val(),
        amount: amountVal.toFixed(2)
      };

      account.lines.push(line);
      self.account.save();

      self.container.find('#txtLabel').val('');
      self.container.find('#txtAmount').val('');
      self.container.find('#txtLabel').focus();
    });

  };

  module.exports = NewLineCtrl;

}).call(this);
