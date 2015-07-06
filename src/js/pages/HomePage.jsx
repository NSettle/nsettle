var React = require('react'),
    utils = require('../support/utils.jsx'),
    AddIngredientInput = require('../components/AddIngredientInput.jsx'),
    IngredientsShelf  = require('../components/IngredientsShelf.jsx'),
    RecipeSearch  = require('../components/RecipeSearch.jsx'),
    RecipePage = require('./RecipePage.jsx');

var scrollTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);

var HomePage = React.createClass({
  getInitialState: function() {
    return { splitted: false, scrolledOver: null };
  },
  componentWillMount: function() {
    document.addEventListener("splitWindow", this._splitWindow);
    document.addEventListener("scroll", this._setScroll);
    window.addEventListener("hashchange", this._hashChange);
    this._hashChange();
  },
  componentWillUnmount: function() {
    document.removeEventListener("splitWindow", this._splitWindow);
    document.removeEventListener("scroll", this._setScroll);
    window.removeEventListener("hashchange", this._hashChange);
  },
  _hashChange: function() {
    if(window && window.location.hash) {
      this.setState({ recipeHash: window.location.hash.split('#/')[1] })
    } 
  },
  _setScroll: function(ev) {
    scrollTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    
    if (!this.state.scrolledOver && scrollTop >= 400) {
      this.setState({ scrolledOver: true });
      utils.dispatch("closeSuggestion");
    }
    else if (this.state.scrolledOver && scrollTop < 400) {
      this.setState({ scrolledOver: false });
      utils.dispatch("closeSuggestion");
    }
  },
  _splitWindow: function() {
    console.log("Splitting window");
    if (this.state.splitted) {
      var self = this;
      this.setState({ scrolledOver: null });
      setTimeout(function() { self.setState({ splitted: false }) }, 10);
    }
    else {
      this.setState({ splitted: !this.state.splitted });
    }
  },
  render: function() {
    return (
        <div>
        	  {/*}<div className="row">
          		<div className="col-md-12">
              
                <div className="overlay"></div>
                <video autoPlay loop poster="static/img/background.jpg" id="bgvideo">
                  <source src="static/img/bartender.mp4" type="video/mp4"></source>
                </video>

                <img className="logo top-buffer-60" src="static/img/logo-glyph.png" />
                <h1 className="landing">
                  Welcome to <a href="#" onClick={ this._dispatch }>the</a><br />
                  <strong>Cocktail Wizard!</strong>
                </h1>
                <div className="top-buffer-40 landing-autocomplete">
                  <AddIngredientInput placeholder="add an ingredient..." />
                </div>
              </div>
          </div>*/}

          <RecipePage recipeHash={ this.state.recipeHash } />

          <header className={ this.state.splitted ? "splitted" : "" }>
            <div className="header-content text-center">
              <h1 className="landing" style={{ fontWeight: "bold" }}>
                Cocktail Wizard
              </h1>
              <div className="top-buffer-40 landing-autocomplete">
                <AddIngredientInput typed={true} placeholder="add an ingredient..." splitView={this._splitWindow} splitted={this.state.splitted} />
              </div>
            </div>
          </header>

          <div className={ this.state.splitted ? "white-nav" : "white-nav before" } style={ this.state.scrolledOver ? { position: "fixed", top: "0px", transition: "none" } : this.state.scrolledOver === null ? {} : { transition: "none" } }>
            <div className="container">
              <div className="row">
                <div className={ this.state.scrolledOver ? "input-scrolled input-nav" : "input-nav" }>
                  <AddIngredientInput typed={false} placeholder="add an ingredient..." splitted={this.state.splitted} />
                </div>
                <div className={ this.state.scrolledOver ? "shelf-scrolled shelf-nav" : "shelf-nav" }>
                  <IngredientsShelf />
                </div>
              </div>
            </div>
          </div>
          
          <RecipeSearch recipesList={ allRecipes } splitted={ this.state.splitted }/>

        </div>);
  }
});

module.exports = HomePage;
