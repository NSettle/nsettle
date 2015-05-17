var React = require('react'),
    Autocomplete = require('../components/Autocomplete.jsx');

var HomePage = React.createClass({
  render: function() {
    return (
      <div className="container">
      	<div className="row">
        		<div className="col-md-12 text-center">

              <h1>Welome to Cock Wizard!</h1>
              <Autocomplete />

            </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
