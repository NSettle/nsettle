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
      selectedIndex: -1,
      keyword:''
    }
  },

  _handleKey: function(ev) {

    if (ev.which == 13) {
      ev.preventDefault();
      // Enter
      this._onAction(this.state.suggestionList[this.state.selectedIndex])
    }
    else if (ev.which == 38) {
      ev.preventDefault();
      // Up
      if(this.state.suggestionList.length>0)
      {
        if(this.state.selectedIndex == -1 || this.state.selectedIndex == 0)
        {
          this.setState({
            selectedIndex:this.state.suggestionList.length-1,
            keyword:this.state.suggestionList[this.state.suggestionList.length-1].name
          })
        }else{
          this.setState({
            selectedIndex:--this.state.selectedIndex,
            keyword:this.state.suggestionList[this.state.selectedIndex].name
          })
        }
      }

    }
    else if (ev.which == 40) {
      ev.preventDefault();
      // Down
      if(this.state.suggestionList.length>0)
      {
        if(this.state.selectedIndex == -1 || this.state.selectedIndex == this.state.suggestionList.length-1)
        {
          this.setState({
            selectedIndex:0,
            keyword:this.state.suggestionList[0].name
          })
        }else{
          this.setState({
            selectedIndex:++this.state.selectedIndex,
            keyword:this.state.suggestionList[this.state.selectedIndex].name
          })
        }
      }

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

    this.setState({ suggestionOpen: true, suggestionList: suggestionList, keyword:autocomplete.value });
  },

  //receive props as an array with all the suggestion
  _onAction: function(item) {
    this.props.onAction(item);
    this.refs.autocomplete.getDOMNode().focus();

    //var newIngredients = R.clone(this.state.suggestionList).filter(function(i) {
    //  return i.id != item.id;
    //});

    this.setState({ suggestionList: [], suggestionOpen: false, selectedIndex: -1});
    // -> Set focus on input
  },

  render: function() {
    // create list from suggestionList
    console.log('Autocomplete State:',this.state)

    var self = this;

    var list = this.state.suggestionList.map(function(item, idx) {
      return <ListItem key={'ListItem-'+idx} item={ item } onAction={ self._onAction } selected={self.state.selectedIndex == idx? true:false} />;
    })

    return (
    	<div id="autocomplete">
      		<input value={this.state.keyword} type="text"  onFocus={ this._searchSuggestions} ref="autocomplete" onChange={this._searchSuggestions} onKeyDown={ this._handleKey } placeholder={ this.props.placeholder } />
            { this.state.suggestionOpen ? <ul className="autocomplete-list">{ list }</ul> : null }
        </div>
    );
  }
});

var ListItem = React.createClass({
  render:function(){
    return (
        <li onClick={ this.props.onAction.bind(null, this.props.item) } className={this.props.selected? 'selected':null}>
        <img src={ this.props.item.image } width="30" />
        { this.props.item.name }
        </li>
    );
  }
});

module.exports = Autocomplete;
