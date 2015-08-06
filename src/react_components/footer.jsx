'use strict';

var React = require('react/addons');


module.exports = React.createClass({
  displayName: 'CypherInput',
  propTypes: {
    contributors: React.PropTypes.array.isRequired
  },
  formatContributor: function(contributor) {
    return `<li class="contributor"><span class="contributor__name">${contributor.name}</span> (
      <a class="contributor__link" href="http://github.com/${contributor.github}">github</a>,
      <a class="contributor__link" href="http://github.com/${contributor.twitter}">twitter</a>
    )</li>`;
  },
  render: function() {
    return (
      <div id="footer">
        <span>Build with <span className="loveIcon animPulsate">❤</span></span>
        <ul className="contributor-list"
            dangerouslySetInnerHTML={{__html: _.map(this.props.contributors, this.formatContributor).join('')}}>
        </ul>
      </div>
    );
  }
});
