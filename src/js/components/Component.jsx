var React = require('react');

var Component = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
    	<div className="row">
      		<div className="col-md-6">Peniano: {this.state.secondsElapsed}</div>
      		<div className="col-md-6">Peniana</div>
      </div>
    );
  }
});

module.exports = Component;
