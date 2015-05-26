var React = require('react'),
    R = require('ramda'),
    Autocomplete = require('../components/Autocomplete.jsx'),
    IngredientsShelf  = require('../components/IngredientsShelf.jsx'),
    Utils = require('../support/utils.jsx');

var AddIngredientInput = React.createClass({

    mixins : [ Utils ],

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
        Utils.dispatch("ingredientsChanged", {"ingredients": newIngredients});
    },

    _removeIngredient: function(id) {
        var newIngredients = R.clone(this.state.addedIngredients).filter(function(i) {
            return i.id != id;
        });

        this.setState({ addedIngredients: newIngredients });
        Utils.dispatch("ingredientsChanged", {"ingredients": newIngredients});
    },

    render: function() {

        return (
            <div>
                <IngredientsShelf onAction={ this._removeIngredient } ingredients={ this.state.addedIngredients }/>
                <Autocomplete onAction={ this._addIngredient } exclude={ this.state.addedIngredients } suggestionList={ allIngredients } placeholder={ this.props.placeholder } />
            </div>
        );
    }
});

module.exports = AddIngredientInput;
