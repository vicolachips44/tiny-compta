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
    var lineAy    = [];
    var balance   = 0;

    var selAccount = this.account.get(this.selectedAccount);
    if (selAccount) {
      balance += parseFloat(selAccount.initialAmount);
      var lines = selAccount.lines;
      for (var j = 0; j < lines.length; j++) {

        var line      = lines[j];
        var amountVal = parseFloat(line.amount);
        lineAy.push(line);

        balance += amountVal;
      }
    }

    var view = {
      accounts: this.account.items,
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
    this.cmbAccount = this.container.find('#cmbAccount');
    this.delButtons = this.container.find('.btn-default');
    this.balance    = this.container.find('#account_balance');

    this.cmbAccount.val(this.selectedAccount);
  };

  WelcomeCtrl.prototype._mapEvents = function() {
    var self = this;

    this.cmbAccount.on('change', function() {
      self.selectedAccount = parseInt(self.$(this).val());
      self.render();
    });

    this.delButtons.on('click', function(e) {
      e.preventDefault();

      var parentTr   = self.$(this).closest('tr');
      var tokens     = this.name.split('_');
      var selAccount = self.account.get(self.selectedAccount);
      var lines      = selAccount.lines;

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        if (line.id === tokens[1]) {
          lines.splice(i, 1);
          break;
        }
      }

      self.account.save();

      var amount  = parseFloat(parentTr.find('td:nth-child(2)').html());
      var balance = parseFloat(self.balance.html()) - amount;

      self.balance.html(balance.toFixed(2));

      parentTr.remove();
    });
  };

  module.exports = WelcomeCtrl;

}).call(this);
