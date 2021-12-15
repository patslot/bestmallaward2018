'use strict';

module.exports = function() {
       
  return {
        render:  function(req, res, next) {
            res.render('result');
        }
    };
};
