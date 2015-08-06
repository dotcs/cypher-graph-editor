'use strict';

/*
 * The idea of this library is taken from https://github.com/jexp/cypher-utils, written by
 * Michael Hunger (github: jexp, twitter: @mesirii)
 */

module.exports = function() {
  this.parseCreate = function(cypher, opts) {
    var time = Date.now();
    var keep_names = opts && opts.keep_names;
    var nodes = {};
    var rels = [];
    var PARENS = /(\s*\),?\s*|\s*\(\s*)/;

    function toArray(map) {
      var res = [];
      for (var k in map) {
        if (map.hasOwnProperty(k)) {
          res.push(map[k]);
        }
      }
      return res;
    }

    function splitClean(str, pattern) {
      return str.split(pattern)
        .map(function(s) { return s.trim(); })
        .filter(function(s) { return s.trim().length > 0 && !s.match(pattern); });
    }

    function keyIndex(key, map) {
      var count = 0;
      for (var k in map) {
        if (key === k) {
          return count;
        }
        count += 1;
      }
      return -1;
    }

    cypher = cypher.replace(/CREATE/ig, '');
    var parts = splitClean(cypher, PARENS);
    // console.log(parts)
    var id = 0;
    var lastNode, lastRel;
    var NODE_PATTERN = /^\s*(`[^`]+`|\w+)(:(?:`[^`]+`|[\w:]+))?\s*(\{.+\})?\s*$/;
    var REL_PATTERN = /^(<)?\s*-\s*(?:\[(`[^`]+`|\w+)?\s*(:(?:`[^`]+`|[\w]+))?\s*(\{.+\})?\])?\s*-\s*(>)?$/;
    var PROP_PATTERN = /^\s*`?(\w+)`?\s*:\s*(".+?"|'.+?'|\[.+?\]|.+?)\s*(,\s*|$)/;
    var ARRAY_VALUES_PATTERN = /^\s*(".+?"|'.+?'|.+?)\s*(,\s*|$)/;
    parts.forEach(function(p) {
      function parseProps(node, props) {
        function escapeQuotes(value) {
          value = value.trim().replace(/(^|\W)'([^']*?)'(\W|$)/g, '$1"$2"$3');
          if (value[0] === '"') {
            value = '"' + value.substring(1, value.length - 1).replace(/"/g, '\\"') + '"';
          }
          return value;
        }
        function parseArray(value) {
          value = value.substring(1, value.length - 1); // eliminate []
          var res = '';
          var _val;
          while (_val = value.match(ARRAY_VALUES_PATTERN)) { // eslint-disable-line no-cond-assign
            value = value.substring(_val[0].length); // next part
            var element = escapeQuotes(_val[1]);
            // console.log("#"+element+"#");
            if (res !== '') {
              res += ',';
            }
            res += element;
          }
          return '[' + res + ']';
        }
        function isArray(value) {
          return value[0] === '[';
        }
        var prop = null;
        props = props.substring(1, props.length - 1); // eliminate {}
        while (prop = props.match(PROP_PATTERN)) { // eslint-disable-line no-cond-assign
          props = props.substring(prop[0].length); // next part
          var pname = prop[1];
          var value = prop[2];
          value = isArray(value) ? parseArray(value) : escapeQuotes(value);
          node[pname] = JSON.parse(value);
        }
        return node;
      }

      function parseInner(m) {
        var name = m[1];
        var labels = [];

        var props = ''; // TODO ugly
        if (m.length > 1) {
          if (m[2] && m[2][0] === ':') {
            labels = splitClean(m[2], /:/);
          } else {
            props = m[2] || '';
          }
          if (m.length > 2 && m[3] && m[3][0] === '{') {
            props = m[3];
          }
        }

        return parseProps({
          _id: id,
          _name: name,
          _labels: labels
        }, props);
      }
      var m = p.match(NODE_PATTERN);
      if (m) {
        var node = parseInner(m);
        var name = node._name;
        if (!keep_names) {
          delete node._name;
        }
        if (!nodes[name]) {
          nodes[name] = node;
          id += 1;
        }
        lastNode = name;
        if (lastRel) {
          if (lastRel.source === null) {
            lastRel.source = keyIndex(name, nodes);
          }
          if (lastRel.target === null) {
            lastRel.target = keyIndex(name, nodes);
          }
        }
      } else {
        // console.log(p);
        m = p.match(REL_PATTERN);
        if (m) {
          var incoming = m[1] === '<' && m[5] !== '>';
          m.splice(5, 1);
          m.splice(1, 1);
          var rel = parseInner(m);
          rel._type = rel._labels[0];
          if (!keep_names) {
            delete rel._name;
          }
          delete rel._id;
          delete rel._labels;
          rel.source = incoming ? null : keyIndex(lastNode, nodes);
          rel.target = incoming ? keyIndex(lastNode, nodes) : null;
          lastRel = rel;
          rels.push(rel);
        }
      }
      // console.log(node);
    });

    if (opts && opts.measure) {
      console.log('time', Date.now() - time); // eslint-disable-line no-console
    }

    return {
      nodes: toArray(nodes),
      links: rels
    };
  };
};
