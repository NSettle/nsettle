var React = require('react'),
    R = require('ramda'),
    Autocomplete = require('../components/Autocomplete.jsx'),
    IngredientsShelf  = require('../components/IngredientsShelf.jsx');

var AddIngredientInput = React.createClass({

    //added ingredient array
    getInitialState: function(){
        return {
            addedIngredients:[]
        }
    },

    //submit function

    //add to added ingredient array function

    _addIngredient: function(item) {
        var newIngredients = R.clone(this.state.addedIngredients);
        newIngredients.push(item);
        this.setState({ addedIngredients: newIngredients });
    },

    _removeIngredient: function(id) {
        var newIngredients = R.clone(this.state.addedIngredients).filter(function(i) {
            return i.id != id;
        });

        this.setState({ addedIngredients: newIngredients });
    },

    render: function() {

        return (
            <div>
                <IngredientsShelf onAction={ this._removeIngredient } ingredients={ this.state.addedIngredients }/>
                <Autocomplete onAction={ this._addIngredient } exclude={ this.state.addedIngredients } suggestionList={ allIngredients } />
            </div>
        );
    }
});

module.exports = AddIngredientInput;
