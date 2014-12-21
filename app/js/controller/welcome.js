(function() {
  'use strict';

  var AbstractCtrl = require(__dirname + '/abstract_controller.js');

  var WelcomeCtrl = function(container, tiny, $) {
    AbstractCtrl.call(this, container, tiny);

    this.account         = this.tiny.dblayer.account;
    this.$               = $;
    this.selectedAccount = 0;
  };

  WelcomeCtrl.prototype = Object.create(AbstractCtrl.prototype);
  WelcomeCtrl.prototype.constructor = AbstractCtrl;

  WelcomeCtrl.prototype._getViewName = function() {
      return 'welcome.html';
  };

  WelcomeCtrl.prototype.render = function() {
    var accountAy = [];
    var lineAy    = [];
    var balance   = 0;

    for (var i = 0; i < this.account.items.length; i++) {
      var item = this.account.items[i];

      accountAy.push({
        id: item.cid,
        name: item.name
      });
    }

    var selAccount = this.account.get(this.selectedAccount);
    if (selAccount) {
      var lines = selAccount.lines;
      for (var j = 0; j < lines.length; j++) {

        var line      = lines[j];
        var amountVal = parseFloat(line.amount);

        lineAy.push({
          id: line.id,
          label: line.label,
          amount: amountVal
        });

        balance += amountVal;
      }
    }

    var view = {
      accounts: accountAy,
      lines: lineAy,
      balance: balance.toFixed(2)
    };

    this.container.html(
      this.mustache.render(this.viewBuffer, view)
    );

    this._initControls();
    this._mapEvents();
  };

  WelcomeCtrl.prototype._initControls = function() {
    this.container.find('#cmbAccount').val(this.selectedAccount);
  };

  WelcomeCtrl.prototype._mapEvents = function() {
    var self = this;

    this.container.find('#cmbAccount').on('change', function() {
      self.selectedAccount = parseInt(self.$(this).val());
      self.render();
    });

    this.container.find('.btn-default').on('click', function(e) {
      e.preventDefault();

      var parentTr   = self.$(this).closest('tr');
      var tokens     = this.name.split('_');
      var selAccount = self.account.get(self.selectedAccount);
      var lines      = selAccount.lines;

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        if (line.id == tokens[1]) {
          lines.splice(i, 1);
          break;
        }
      }

      self.account.save();

      var blcSelector = self.container.find('#account_balance');
      var amount      = parseFloat(parentTr.find('td:nth-child(2)').html());
      var balance     = parseFloat(blcSelector.html()) - amount;

      blcSelector.html(balance.toFixed(2));

      parentTr.remove();
    });
  };

  module.exports = WelcomeCtrl;

}).call(this);
