'use strict';

module.exports = function() {
     function advRender(req, res, next){
        var client = req.params.client;
        switch(client) {
            case "apm":
               res.render('advapm');
               break;
            case "hollywood":
               res.render('advhollywood');
               break; 
            case "popcorn":
               res.render('advpopcorn');
               break; 
            case "telford":
               res.render('advtelford');
               break;  
            case "paradise":
               res.render('advparadise');
               break; 
            case "langham":
               res.render('advlangham');
               break; 
            case "vcity":
               res.render('advvcity');
               break; 
            case "top":
               res.render('advtop');
               break; 
            case "k11":
               res.render('advk11');
               break; 
            default:
               res.render('advapm' );
        }
     }  
     function eventListing(req, res, next){
        res.render('event');
     }
  return {
        eventListing: eventListing,
        advRender: advRender
    };
};
