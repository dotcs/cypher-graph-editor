'use strict';

var React = require('react');
var mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    FlatButton = mui.FlatButton,
    AppBar = mui.AppBar;

var CypherInput = require('react_components/cypherInput');
var Footer = require('react_components/footer');

module.exports = React.createClass({
  displayName: 'App',
  propTypes: {},
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render: function() {
    return (
      <div id="app">
        <AppBar
          iconElementRight={
            <FlatButton href="https://github.com/dotcs/cypher-graph-editor" label="Github" linkButton={true} />
          }
          title="Cypher Graph Live Editor" />
        <CypherInput statement={`
CREATE (me:Person {name:"Michael"})
CREATE (fabian:Person {name:"Fabian"})
CREATE (peter:Person {name:"Peter"})
CREATE (graphgist:Project {name:"GraphGist"})
CREATE (me)-[:KNOWS {since:2006}]->(peter),
(me)-[:WORKS_ON]->(graphgist),
(fabian)-[:WORKS_ON]->(graphgist),
(fabian)-[:KNOWS {since:2015}]->(me)
CREATE (graphgist)<-[:WORKS_ON]-(peter)`} />
        <Footer
          contributors={[
            {name: 'Fabian Mueller', github: 'dotcs', twitter: 'dotcsDE'},
            {name: 'Michael Hunger', github: 'jexp', twitter: 'mesirii'}
          ]}
          />
      </div>
    );
  }
});
