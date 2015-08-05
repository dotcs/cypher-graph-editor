'use strict';

var CypherUtils = require('./cypherUtils');
var forceLayout = require('./forceLayout');

module.exports = function() {
  var utils = new CypherUtils();
  var elements = window.document.getElementsByTagName('pre');
  _.each(elements, function(element) {
    var cypher = element.innerText;
    var graph = utils.parseCreate(cypher, {measure: true});
    // console.log(cypher);
    // console.log(JSON.stringify(graph));
    var id = element.attributes.viz.textContent;
    var size = {
      width: window.document.getElementById(id).clientWidth,
      height: window.document.getElementById(id).clientHeight
    };
    forceLayout(graph, id, size);
  });
};
