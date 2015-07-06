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
    console.log('homepPage.jsx componentWillMount')
    document.addEventListener("splitWindow", this._splitWindow);
    document.addEventListener("scroll", this._setScroll);
    window.addEventListener("hashchange", this._hashChange);
    this._hashChange();
  },
  _hashChange: function(){
    console.log('############# hashchange #############',window.location.hash)
    if(window && window.location.hash)
    {
      console.log('changing hashhh')
      this.setState({ recipeHash: window.location.hash.split('#/')[1] })
    } 
  },
  componentWillUnmount: function() {
    document.removeEventListener("splitWindow", this._splitWindow);
    document.removeEventListener("scroll", this._setScroll);
  },
  _setScroll: function(ev) {
    scrollTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    
    if (!this.state.scrolledOver && scrollTop >= 400) {
      this.setState({ scrolledOver: true });
    }
    else if (this.state.scrolledOver && scrollTop < 400) {
      this.setState({ scrolledOver: false })
    }
    // this.setState({ scrollTop: top });
  },
  _splitWindow: function() {
    this.setState({ splitted: !this.state.splitted });
  },
  _dispatch: function() {
    utils.dispatch("splitWindow");
  },
  render: function() {
    //<RecipePage />
    return (
        <div>
          <RecipePage recipeHash={this.state.recipeHash}/>
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
          <header className={ this.state.splitted ? "splitted" : "" }>
            <div className="header-content text-center">
              
              <h1 className="landing" style={{ fontWeight: "bold" }}>
                {/* <img className="logo" src="static/img/logo-glyph.png" /> */ }
                Cocktail Wizard
              </h1>
              <div className="top-buffer-40 landing-autocomplete">
                <AddIngredientInput placeholder="add an ingredient..." splitView={this._splitWindow} splitted={this.state.splitted} />
              </div>
            </div>
          </header>

          <div className={ this.state.splitted ? "white-nav" : "white-nav before" } style={ this.state.scrolledOver ? { position: "fixed", top: "0px", transition: "none" } : this.state.scrolledOver === null ? {} : { transition: "none" } }>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <IngredientsShelf />
                </div>
              </div>
            </div>
          </div>
        <RecipeSearch recipesList={ allRecipes } splitted={this.state.splitted}/>
        </div>);
  }
});

module.exports = HomePage;
