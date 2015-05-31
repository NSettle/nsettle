module.exports = {
  dispatch: function(event, data){
    var temp_event = new CustomEvent(event, { detail: data });
    document.dispatchEvent(temp_event);
  },

  getRecipeUrl: function(recipe){
  	// alert(recipe.name);
  	return recipe.id
  }
}
