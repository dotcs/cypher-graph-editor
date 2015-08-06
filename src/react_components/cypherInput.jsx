'use strict';

var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var CypherUtils = require('../../lib/cypherUtils');
var utils = new CypherUtils();
var forceLayout = require('../../lib/forceLayout');
var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    Toggle = mui.Toggle,
    RaisedButton = mui.RaisedButton;
var Codemirror = require('react-codemirror'),
    CypherMode = require('codemirror/mode/cypher/cypher'); // eslint-disable-line no-unused-vars


module.exports = React.createClass({
  displayName: 'CypherInput',
  propTypes: {
    statement: React.PropTypes.string
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentWillMount: function() {
    this.setState({
      statement: this.props.statement.trim(),
      autoupdate: true,
      codemirrorOptions: {
        lineNumbers: true,
        mode: 'cypher',
        smartIndent: false
      }
    });
  },
  componentDidMount: function() {
    this.handleUpdate();
  },
  handleChange: function(newStatement) {
    this.setState({
      statement: newStatement
    });
    if (this.state.autoupdate) {
      this.handleUpdate();
    }
  },
  handleUpdate: function(e) {
    if (e) { e.preventDefault(); }
    var imageContainer = this.refs.graphDrawArea.getDOMNode();
    imageContainer.innerHTML = '';
    var graph = utils.parseCreate(this.state.statement, {measure: true});
    forceLayout(graph, imageContainer, {
      width: window.innerWidth,
      height: 500
    });
  },
  handleAutoUpdateStateChange: function() {
    this.setState({
      autoupdate: !this.state.autoupdate
    });
  },
  render: function() {
    //<input type="checkbox"
    //       checked={this.state.autoupdate ? 'checked' : ''}
    //       onChange={this.handleAutoUpdate}
    //  /> Update automatically while typing
    return (
      <div className="cypherInput">
        <Codemirror
          value={this.state.statement}
          onChange={this.handleChange}
          options={this.state.codemirrorOptions}
          />
        <div className="cypherInput__options">
          <div>
            <div className="options__toggle">
              <Toggle
                name="autoupdate"
                value="on"
                label="Automatically update graph"
                onToggle={this.handleAutoUpdateStateChange}
                defaultToggled={true}/>
            </div>
          </div>
          <ReactCSSTransitionGroup transitionName="animFade" transitionAppear={true}>
          {!this.state.autoupdate &&
              <div className="options__update">
                <RaisedButton onClick={this.handleUpdate} label="Manual update" />
              </div>
          }
          </ReactCSSTransitionGroup>
        </div>
        <div className="graph-drawarea" ref="graphDrawArea"></div>
      </div>
    );
  }
});
