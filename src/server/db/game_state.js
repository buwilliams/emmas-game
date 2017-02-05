var loki = require('loki');

function init(db_file) {
  var db;

  function connect() {
    db = new loki(db_file);
  }

  connect();

  return {

  }
}

module.exports = {
  init: init
}
