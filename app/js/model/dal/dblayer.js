(function() {
  'use strict';

  var locallydb   = require('locallydb');
  var fs          = require('fs');

  var DbLayer = function() {
    this.dbpath      = null;
    this.account     = null;
    this.accountType = null;
    this.db          = null;
  };

  DbLayer.prototype = {

    initModel: function(dbpath) {

      this.dbpath      = dbpath;
      var isnew        = !fs.existsSync(dbpath);
      this.db          = new locallydb(dbpath);
      this.account     = this.db.collection('accounts');
      this.accountType = this.db.collection('account_types');

      if (isnew) {
        this.accountType.insert([
          {name: 'Compte chèque'},
          {name: "Compte d'épargne"},
          {name: 'Compte titre'}
        ]);
      }
    },
  };

  module.exports = new DbLayer();

}).call(this);
