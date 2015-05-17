var React = require('react'),
    Autocomplete = require('../components/Autocomplete.jsx'),
    IngredientShelf  = require('../components/IngredientShelf.jsx');

var allIngredients = [];

var AddIngredientInput = React.createClass({

    //added ingredient array
    getInitialState:function(){
        return {
            addedIngredients:[]
        }
    },

    //submit function

    //add to added ingredient array function

    _addIngredient:function(){
        //remember to add focus to input after ingredient is added
    },

    render: function() {
        return (
            <div>
                <IngredientsShelf  ingredients={this.state.addedIngredients}/>
                <Autocomplete onAction={this._addIngredient} suggestionList={allIngredients} />
            </div>
        );
    }
});

module.exports = AddIngredientInput;
