var React = require('react'),
    R = require('ramda'),
    Autocomplete = require('../components/Autocomplete.jsx'),
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
        if(this.props.splitView && !this.props.splitted)
        {
            this.props.splitView();
        }    
    },

    _removeIngredient: function(id) {
        var newIngredients = R.clone(this.state.addedIngredients).filter(function(i) {
            return i.id != id;
        });

        this.setState({ addedIngredients: newIngredients });
        Utils.dispatch("ingredientsChanged", {"ingredients": newIngredients});
    },

    _updateIngredients:function  (e, data) {

        this.setState({
          addedIngredients: e.detail.ingredients
        })
        if(this.props.splitView && e.detail.ingredients.length<=0)
        {
            this.props.splitView();    
        }    

    },

    componentDidMount:function(){
        document.addEventListener('ingredientsChanged', this._updateIngredients);
      },

    render: function() {

        return (
            <div>
                <Autocomplete onAction={ this._addIngredient } exclude={ this.state.addedIngredients } suggestionList={ allIngredients } placeholder={ this.props.placeholder } typed={this.props.typed}/>
            </div>
        );
    }
});

module.exports = AddIngredientInput;
