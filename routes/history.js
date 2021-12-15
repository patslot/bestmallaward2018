'use strict';

module.exports = function() {
 function renderHistoryDetail (req, res, next){
    var year = req.params.year;
    switch(year) {
        case "2017":
             res.render('historydetail2017',{years: year});
            break;
        case "2016":
             res.render('historydetail2016',{years: year});
            break;
        case "2015":
            res.render('historydetail2015',{years: year});
           break;    
        case "2014":
           res.render('historydetail2014',{years: year});
          break;   
        default:
             res.render('historydetail2017',{years: year});
    }
    
 }   
 function renderHistorylisting (req, res, next){
    res.render('history');
 }   
    return {
        renderHistorylisting: renderHistorylisting, 
        renderHistoryDetail: renderHistoryDetail
    };
};
