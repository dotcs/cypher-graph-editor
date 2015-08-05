'use strict';

var React = require('react');
var CypherUtils = require('../../lib/cypherUtils');
var utils = new CypherUtils();
var forceLayout = require('../../lib/forceLayout');

module.exports = React.createClass({
  displayName: 'CypherInput',
  propTypes: {
    statement: React.PropTypes.string
  },
  componentWillMount: function() {
    this.setState({
      statement: this.props.statement.trim()
    });
  },
  componentDidMount: function() {
    this.handleUpdate();
  },
  handleChange: function(e) {
    this._update(e.target.value);
    this.setState({
      statement: e.target.value
    });
  },
  handleUpdate: function(e) {
    if (e) { e.preventDefault(); }
    var imageContainer = this.refs.graphDrawArea.getDOMNode();
    imageContainer.innerHTML = '';
    var graph = utils.parseCreate(this.state.statement, {measure: true});
    forceLayout(graph, imageContainer, {width: 500, height: 500});
  },
  render: function() {
    return (
      <div className="graph-component">
        <textarea
          onChange={this.handleChange}
          placeholder="Your cypher expression ..."
          value={this.state.statement}
          ></textarea>
        <button onClick={this.handleUpdate}>Update</button>
        <div className="graph-drawarea" ref="graphDrawArea"></div>
      </div>
    );
  }
});
