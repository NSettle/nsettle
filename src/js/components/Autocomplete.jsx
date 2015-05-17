var React = require('react'),
    R = require('ramda'),
    ClickOutside = require('react-onclickoutside');

var Autocomplete = React.createClass({

  mixins: [
    ClickOutside
  ],

  handleClickOutside: function(e) {
    this.setState({ suggestionOpen: false });
  },


  getInitialState: function() {
    return {
      suggestionList: [],
      suggestionOpen: false,
      selectedIndex: -1
    }
  },
  
  _handleKey: function(ev) {
    if (ev.which == 13) {
      // Enter
    }
    else if (ev.which == 38) {
      // Up
    }
    else if (ev.which == 40) {
      // Down
    }
  },

  _searchSuggestions: function() {
    // set a new state for suggestionList with the filtered array

    var autocomplete = this.refs.autocomplete.getDOMNode();
    
    var selectedList = R.map(function(i) {
      return i.id;
    }, this.props.exclude);

    // -> Set up a counter in the future for max objects
    var suggestionList = R.filter(function(i) {
      if (i.name.indexOf(autocomplete.value) > -1 && selectedList.indexOf(i.id) <= -1) {
        return i;
      }
    }, this.props.suggestionList);

    this.setState({ suggestionOpen: true, suggestionList: suggestionList });
  },

  //receive props as an array with all the suggestion
  _onAction: function(item) {
    this.props.onAction(item);
    this.refs.autocomplete.getDOMNode().focus();

    var newIngredients = R.clone(this.state.suggestionList).filter(function(i) {
      return i.id != item.id;
    });

    this.setState({ suggestionList: newIngredients });
    // -> Set focus on input
  },

  render: function() {

    // create list from suggestionList
    // var list = this.state.suggestionList.map()
    var self = this;

    var list = this.state.suggestionList.map(function(item, idx) {
      return <ListItem key={'ListItem-'+idx} item={ item } onAction={ self._onAction } />;
    })

    return (
    	<div id="autocomplete">
      		<input type="text"  onFocus={ this._searchSuggestions} ref="autocomplete" onChange={this._searchSuggestions} onKeyPress={ this._handleKey } />
            { this.state.suggestionOpen ? <ul>{ list }</ul> : null }
        </div>
    );
  }
});

var ListItem = React.createClass({
  render:function(){
    return (
        <li onClick={ this.props.onAction.bind(null, this.props.item) }>
        <img src={ this.props.item.image } width="30" />
        { this.props.item.name }
        </li>
    );
  }
});

module.exports = Autocomplete;
