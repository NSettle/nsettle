var React = require('react');

var Autocomplete = React.createClass({

  getInitialState: function(){
    return {
      suggestionList: this.props.suggestionList,
      suggestionOpen:false
    }
  },

  _onChange:function(){
    //set a new state for suggestionList with the filtered array
  },

  //receive as props an array with all the suggestion

  _onAction:function(){
    this.props.onAction()
    //set focus on input
  },

  render: function() {

    // create list from suggestionList
    // var list = this.state.suggestionList.map()


    return (
    	<div>
      		<input type="text" onChange={this._onChange} onAction={this._onAction}/>
            <ul>
              //render list
            </ul>
      </div>
    );
  }
});

var ListItem = React.createClass({


  render:function(){
    return (
        <li onClick={this.props.onAction.bind(this)}></li>
    )
  }
})

module.exports = Autocomplete;
