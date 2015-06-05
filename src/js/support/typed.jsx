var timeOutCanceled = false;
var myTimeOut;
var timeAfterEachLetter = 90;
var timeAfterEachWord = 2000;
var timeAfterWordIsFulllyTyped = 3000;
var timeForErasingEachLetter = 15;


module.exports = {
  dispatch: function(event, data){
    document.onclick = function(){
      data.element.value = '';
      clearTimeout(myTimeOut);
      element.style.color = '#262626';
      timeOutCanceled = true;
    }

    element = data.element;
    element.style.color = '#999999';
    if(data.phrases.length)
    {
      var index = 0;

      var reverse = false;
        (function writer(i){
          if(timeOutCanceled)
          {
            element.value = '';
            return;
          }


          string = data.phrases[index];
          waitTime = timeAfterEachLetter;
          if(!reverse)
          {
            if(string.length <= i++){
              element.value = string;
              waitTime = timeAfterWordIsFulllyTyped;
              reverse = true;
            }
          }else{
            waitTime = timeForErasingEachLetter;
            if(0 >= i--){
              element.value = string;
              ++index;
              reverse = false;
              i=0;
              waitTime = timeAfterEachWord;
              if(index == data.phrases.length)
              {
                element.value = "";
                return;
              }

            }
          }

         element.value = string.substring(0,i);
         if( element.value[element.value.length-1] != " " )element.focus();
         var rand = Math.floor(Math.random() * (100)) + (waitTime);
         myTimeOut = setTimeout(function(){writer(i);},rand);
       })(0)
    }

    //var temp_event = new CustomEvent(event, { detail: data });
    //document.dispatchEvent(temp_event);
  }
}
