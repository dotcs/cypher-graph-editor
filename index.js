'use strict';

var React = require('react');
var CypherInput = require('./src/react_components/cypherInput');

_.each(window.document.getElementsByClassName('js-react-cypherinput'), function(el) {
  var attributes = el.attributes;

  var initStatement;
  if ('data-initial-statement' in attributes) {
    initStatement = attributes['data-initial-statement'].value;
  }

  React.render(<CypherInput
    statement={initStatement}
    />, el);

});
