var React = require('react'),
    Autocomplete = require('../components/Autocomplete.jsx'),
    IngredientsShelf  = require('../components/IngredientsShelf.jsx');

var allIngredients = [{id:0,name:"alpha",image:"http://cdn2.thegloss.com/wp-content/uploads/2011/02/drink.jpg"}, {id:1,name:"beta",image:"http://cdn2.thegloss.com/wp-content/uploads/2011/02/drink.jpg"}, {id:2,name:"gama",image:"http://cdn2.thegloss.com/wp-content/uploads/2011/02/drink.jpg"}, {id:3,name:"teta",image:"http://cdn2.thegloss.com/wp-content/uploads/2011/02/drink.jpg"}];

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

    _removeIngredient:function(){
        //remember to add focus to input after ingredient is added
    },

    render: function() {
        return (
            <div>
                <IngredientsShelf  onAction={this._removeIngredient} ingredients={this.state.addedIngredients}/>
                <Autocomplete onAction={this._addIngredient} suggestionList={allIngredients} />
            </div>
        );
    }
});

module.exports = AddIngredientInput;
