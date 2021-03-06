import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

require('velocity-animate');

import 'angular';
import "popper.js";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './jquery-ui.min.js'; 
import './animate.css'; 
import './all.css'; 
import './jquery.scrolly.js'; 

import "./scss/main.scss";

var bestMallApp = angular.module('bestmallApp', ['ngFileUpload']);
if(document.location.hostname=="localhost"){
    var theLink='http://localhost:16080';
}else{
    var theLink='https://bestmallawards.appspot.com/';
}

bestMallApp.controller('homepageCon', ['$scope', 'Upload', '$timeout', function homgpageController($scope, Upload, $timeout) {
  $scope.nav = true;
  $scope.submitted = false;
  $scope.submitsuccess = false;
  $scope.validphoto = false;
  var nominateformData = {};
  $scope.showMobileNav = function(){
    $scope.nav = false;
    $('.mobile-nav').css('display','block');
  };
  $scope.closeMobileNav = function(){
    $scope.nav = true;
    $('.mobile-nav').css('display','none');
  };
  $scope.nominateFormSubmit = function(){
        $scope.submitted = true;
        if($scope.picFile){
            
            console.log($scope.picFile.$ngfBlobUrl);
            if ($scope.picFile.size > 1000000){
                $scope.validphoto = false;
                console.log("File is too large " + $scope.picFile.size);
            }
            else if(! /([^\s]+((jpg|jpeg|png))$)/.test($scope.picFile.type) ){
                console.log("Not image file " + $scope.picFile.type);
            }
            else{
                    $scope.validphoto = true;
            }
        }
        if ((!$scope.nominateform.$invalid) && ( $scope.validphoto)){
            nominateformData.name = $scope.name ; 
            nominateformData.url = $scope.url ; 
            nominateformData.fburl = $scope.fburl ; 
            nominateformData.description = $scope.description ; 
            var reader = new FileReader();
            reader.readAsDataURL($scope.picFile); 
            reader.onloadend = function() {
                var base64data = reader.result;                
                console.log(base64data);
           
                nominateformData.photo = base64data; 
                console.log(nominateformData); 

                $.post(theLink+'/NominSubmit',nominateformData,function(response){
                    if(window.console){console.log(response)}
                    if(response.status=="SUCCESS"){
                        $scope.nominateform.$setPristine();
                        $scope.submitsuccess = true;
                        $scope.$apply();
                    }else if(response.status=="FAIL"){
                        
                    }else{
                        
                    }
                    }, "json").fail(function(){
                    if(window.console){console.log("Server Error")}
                }, "json");
               
            }   
        }else{
            console.log('invalid');
        }
      
    } 
    $scope.clearPhotoPreview = function(){
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.picFile = null;
                $('.photopreview img').attr('src','');
                console.log($scope.nominateform);
            });
        }, 500);
       
    }
}]); 



bestMallApp.controller('secretCon', function secretController($scope) {
  $scope.nav = true;
  $scope.submitted = false;
  $scope.submitsuccess = false;
  $scope.someSelected = false; 
  $scope.secret_4 = {0: false, 1: false, 2: false, 3: false, 4: false}
  $scope.secret_6 = "0";
  $scope.secret_7 = "??????";
  $scope.secret_8 = "??????";
  var secretformData = {};
  $scope.showMobileNav = function(){
    $scope.nav = false;
    $('.mobile-nav').css('display','block');
  };
  $scope.closeMobileNav = function(){
    $scope.nav = true;
    $('.mobile-nav').css('display','none');
  };
  $scope.handleClick = function () {
    setTimeout(function () {
      $scope.$apply(function(){
            if( $scope.secret_4[0] || $scope.secret_4[1] || $scope.secret_4[2] || $scope.secret_4[3] || $scope.secret_4[4] ){
                $scope.someSelected = true; 
            }
            else{
                $scope.someSelected = false; 
            }
      });
    }, 0); 
    
    
  }
  $scope.secretFormSubmit = function(){
    
    $scope.submitted = true;
    if( $scope.secret_4[0] || $scope.secret_4[1] || $scope.secret_4[2] || $scope.secret_4[3] || $scope.secret_4[4] ){
        $scope.someSelected = true; 
    }
    else{
        $scope.someSelected = false; 
    }
    
    if (!$scope.secretForm.$invalid) {
      console.log('valid');
      secretformData.name = $scope.name ; 
      secretformData.age = $scope.age ; 
      if ($scope.sex == 1) secretformData.sex = "M" ; 
      if ($scope.sex == 2) secretformData.sex = "F" ; 
      switch ($scope.area) {
        case "1":
            secretformData.area = "?????????";
            break;
        case "2":
            secretformData.area = "??????";
            break;
        case "3":
            secretformData.area = "??????";
            break;
        case "4":
            secretformData.area = "?????????";
            break;
        case "5":
            secretformData.area = "????????????";
            break;
        case "6":
            secretformData.area = "????????????";
            break;
        case "7":
            secretformData.area = "?????????";
            break;
        case "8":
            secretformData.area = "????????????";
            break;
        case "9":
            secretformData.area = "????????????";
            break;
        case "10":
            secretformData.area = "?????????";
            break;
        case "11":
            secretformData.area = "?????????";
            break;
        case "12":
            secretformData.area = "??????";  
            break;
        case "13":
            secretformData.area = "?????????";
            break;
        case "14":
            secretformData.area = "?????????";
            break;
        case "15":
            secretformData.area = "?????????";
            break;
        case "16":
            secretformData.area = "?????????";
            break;
        case "17":
            secretformData.area = "?????????";
            break;
        case "18":
            secretformData.area = "?????????";
            break;
        default: 
            secretformData.area = "?????????";  
      }
      secretformData.phone = $scope.phone ;
      secretformData.email = $scope.email ;
      secretformData.secret_1 = $scope.secret_1 ;
      secretformData.secret_2 = $scope.secret_2 ;
      secretformData.secret_3 = $scope.secret_3 ;
      secretformData.secret_4 = [] ; 
      if ($scope.secret_4[0]){
        secretformData.secret_4.push('????????????') 
      }
      if ($scope.secret_4[1]){
        secretformData.secret_4.push('??????') 
      }
      if ($scope.secret_4[2]){
        secretformData.secret_4.push('????????????') 
      }
      if ($scope.secret_4[3]){
        secretformData.secret_4.push('??????') 
      }
      if ($scope.secret_4[4]){
        secretformData.secret_4.push('??????') 
      }
      secretformData.secret_4 = secretformData.secret_4.join(", ");
      secretformData.secret_5 = $scope.secret_5 ;
      if($scope.secret_6) {
        secretformData.secret_6 = "??????";
      }else{
        secretformData.secret_6 = "?????????";
      }
      if($scope.secret_7) {
        secretformData.secret_7 = $scope.secret_7;
      }
      if($scope.secret_8) {
        secretformData.secret_8 = $scope.secret_8;
      }
      if(window.console){console.log(secretformData);}
      
			
			$.post(theLink+'/SecretSubmit',JSON.stringify(secretformData),function(response){
				if(window.console){console.log(response)}
				if(response.status=="SUCCESS"){
                    $scope.secretForm.$setPristine();
                    $scope.submitsuccess = true;
                    $scope.$apply();

                    campaignLog(secretformData);
				}else if(response.status=="FAIL"){
					
				}else{
					
				}
			}, "json").fail(function(){
			 	if(window.console){console.log("Server Error")}
	   		}, "json");
    }
    else{
      console.log('invalid');
    }
  };

  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      $.post('',$( "#secretForm" ).serialize()).done(function( data ) {
                console.log(data);
                })
    }

  };
  $( "#q5" ).slider({
    range: false,
    min: 0,
    max: 9,
    range: "min",
    slide: function( event, ui ) {
        $("#secret_5").selectedIndex = ui.value;
    },
    change: function( event, ui ) {
        if (  $( "#q5" ).slider( "value" ) == 9 ){
            $(this).find('.ui-slider-handle').html('<div class="value-label">9????????????</div>');    
        }
        else{
            $(this).find('.ui-slider-handle').html('<div class="value-label">'+ $( "#q5" ).slider( "value" )+'</div>');  
        }
      
    },
    create: function( event, ui) {
        $(this).find('.ui-slider-handle').html('<div class="value-label">'+ $( "#q5" ).slider( "value" )+'</div>');  
    },
    stop: function ( event, ui){ 
         $("#secret_5").selectedIndex = ui.value;
        $scope.$apply(function () {
            if(  ui.value == 9 ){
              $scope.secret_5 =  "9????????????" ;
            }else{
              $scope.secret_5 =  ui.value.toString() ;
            }
         });
    }
  });
});

bestMallApp.controller('detailCon', function detailController($scope) {
  $scope.nav = true;
  $scope.showMobileNav = function(){
    $scope.nav = false;
    $('.mobile-nav').css('display','block');
  };
  $scope.closeMobileNav = function(){
    $scope.nav = true;
    $('.mobile-nav').css('display','none');
  };
});


bestMallApp.controller('speechCon', function detailController($scope) {
    $scope.nav = true;
    $scope.showMobileNav = function(){
      $scope.nav = false;
      $('.mobile-nav').css('display','block');
    };
    $scope.closeMobileNav = function(){
      $scope.nav = true;
      $('.mobile-nav').css('display','none');
    };
  });
  
  bestMallApp.controller('historyDetailCon', function detailController($scope) {
    $scope.nav = true;
    $scope.showMobileNav = function(){
      $scope.nav = false;
      $('.mobile-nav').css('display','block');
    };
    $scope.closeMobileNav = function(){
      $scope.nav = true;
      $('.mobile-nav').css('display','none');
    };
    $(".close").click(function(){
        $('video').each(function(){
            $(this)[0].pause();
        });
    })
  });
  
  bestMallApp.controller('resultCon', function detailController($scope) {
    $scope.nav = true;
    $scope.showMobileNav = function(){
      $scope.nav = false;
      $('.mobile-nav').css('display','block');
    };
    $scope.closeMobileNav = function(){
      $scope.nav = true;
      $('.mobile-nav').css('display','none');
    };
  });

   
  bestMallApp.controller('eventCon', function detailController($scope) {
    $scope.nav = true;
    $scope.showMobileNav = function(){
      $scope.nav = false;
      $('.mobile-nav').css('display','block');
    };
    $scope.closeMobileNav = function(){
      $scope.nav = true;
      $('.mobile-nav').css('display','none');
    };
  }); 

  bestMallApp.controller('publicCon', function publicController($scope) {
    var selectedMalls = {};
    var publicformData = {};
    $scope.publicformError = {};
    $scope.numOfMallsSelected = 0 ;
    $scope.submitsuccess = false;
    $scope.nav = true;
    $scope.malls = [
        {'name':'apm', 'id': 0, 'selected': false}, {'name':'D???PARK????????????', 'id': 1, 'selected': false}, {'name':'D2 Place', 'id': 2, 'selected': false} ,
        {'name':'Elements', 'id': 3, 'selected': false}, {'name':'Hysan Place', 'id': 4, 'selected': false}, {'name':'K11', 'id': 5, 'selected': false} ,
        {'name':'Lee Gardens', 'id': 6, 'selected': false}, {'name':'MegaBox', 'id': 7, 'selected': false}, {'name':'Mira Place', 'id': 8, 'selected': false} ,
        {'name':'Pacific Place', 'id': 9, 'selected': false}, {'name':'PopCorn', 'id': 10, 'selected': false}, {'name':'T.O.P This is Our Place', 'id': 11, 'selected': false} ,
        {'name':'The ONE', 'id': 12, 'selected': false}, {'name':'V city', 'id': 13, 'selected': false}, {'name':'YOHO mall ??????', 'id': 14, 'selected': false} ,
        {'name':'?????????', 'id': 15, 'selected': false}, {'name':'???????????????', 'id': 16, 'selected': false}, {'name':'????????????', 'id': 17, 'selected': false} ,
        {'name':'?????????', 'id': 18, 'selected': false}, {'name':'?????????', 'id': 19, 'selected': false}, {'name':'????????????', 'id': 20, 'selected': false} ,
        {'name':'?????????', 'id': 21, 'selected': false}, {'name':'?????????', 'id': 22, 'selected': false}, {'name':'????????????', 'id': 23, 'selected': false} ,
        {'name':'????????????????????????', 'id': 24, 'selected': false}, {'name':'???????????????', 'id': 25, 'selected': false}, {'name':'?????????', 'id': 26, 'selected': false} ,
        {'name':'?????????', 'id': 27, 'selected': false}, {'name':'???????????????', 'id': 28, 'selected': false}, {'name':'????????????', 'id': 29, 'selected': false} 
    ];
    $scope.showMobileNav = function(){
      $scope.nav = false;
      $('.mobile-nav').css('display','block');
    };
    $scope.closeMobileNav = function(){
      $scope.nav = true;
      $('.mobile-nav').css('display','none');
    };
    var filterByselected = function(item) {
        if (item.selected) {
          return true;
        } 
        else{
            return false; 
        }
        
     }
    var mallsvalidcheck= function() {
        var selectedMalls = $scope.publicForm.selectedMalls ;
        if(selectedMalls){ 
            
            if ( ($scope.numOfMallsSelected <= 0) || ( $scope.numOfMallsSelected != 10)){
                return false
            }else{
                return true
            }
        }
        else{
            return false
        }
    }
    var calculateSomeSelected = function(mall) {
        
        mall.selected = !mall.selected;
        if (mall.selected){
            $scope.numOfMallsSelected ++;
        }else{
            $scope.numOfMallsSelected --;
        }
        $scope.malls[mall.id].selected = mall.selected ;
        console.log( $scope.malls.filter(filterByselected));
        $scope.someSelected = Object.keys($scope.publicForm.selectedMalls).some(function (key) {
          return selectedMalls[key];
        });
       
        
    };
    $scope.checkboxChanged = calculateSomeSelected;

    $( "#q1" ).slider({
        range: false,
        min: 0,
        max: 5,
        range: "min",
        slide: function( event, ui ) {
            $("#public_1").selectedIndex = ui.value;
        },
        change: function( event, ui ) {
            if (  $( "#q1" ).slider( "value" ) == 5 ){
                $(this).find('.ui-slider-handle').html('<div class="value-label">5????????????</div>');    
            }
            else{
                $(this).find('.ui-slider-handle').html('<div class="value-label">'+ $( "#q1" ).slider( "value" )+'</div>');  
            }
          
        },
        create: function( event, ui) {
            $(this).find('.ui-slider-handle').html('<div class="value-label">'+ $( "#q1" ).slider( "value" )+'</div>');  
        },
        stop: function ( event, ui){ 
             $("#public_1").selectedIndex = ui.value;
            $scope.$apply(function () {
                if(  ui.value == 5 ){
                  $scope.public_1 =  "5????????????" ;
                }else{
                  $scope.public_1 =  ui.value.toString() ;
                }
             });
        }
      });

      $( "#q2" ).slider({
        range: false,
        min: 0,
        max: 1001,
        step: 1,
        range: "min",
        slide: function( event, ui ) {
            $("#public_2").selectedIndex = ui.value;
        },
        change: function( event, ui ) {
            if (  $( "#q2" ).slider( "value" ) == 9 ){
                $(this).find('.ui-slider-handle').html('<div class="value-label">HKD$1001?????????</div>');    
            }
            else{
                $(this).find('.ui-slider-handle').html('<div class="value-label">$'+ $( "#q2" ).slider( "value" )+'</div>');  
            }
          
        },
        create: function( event, ui) {
            $(this).find('.ui-slider-handle').html('<div class="value-label">'+ $( "#q2" ).slider( "value" )+'</div>');  
        },
        stop: function ( event, ui){ 
             $("#public_2").selectedIndex = ui.value;
            $scope.$apply(function () {
                if(  ui.value == 1001 ){
                  $scope.public_2 =  "HKD$1001?????????" ;
                }else{
                  $scope.public_2 =  "HKD$" + ui.value.toString() ;
                }
             });
        }
      });
      $( "#q3" ).slider({
        range: false,
        min: 0,
        max: 5,
        step: 1,
        range: "min",
        slide: function( event, ui ) {
            $("#public_3").val(ui.value);
        },
        change: function( event, ui ) {
            if (  $( "#q3" ).slider( "value" ) == 0 ){
                $(this).find('.ui-slider-handle').html('<div class="value-label">1????????????</div>');    
            }
            else if (  $( "#q3" ).slider( "value" ) == 5 ){
                $(this).find('.ui-slider-handle').html('<div class="value-label">5????????????</div>');    
            }
            else{
                $(this).find('.ui-slider-handle').html('<div class="value-label">'+ $( "#q3" ).slider( "value" )+'</div>');  
            }
          
        },
        create: function( event, ui) {
            $(this).find('.ui-slider-handle').html('<div class="value-label">'+ $( "#q3" ).slider( "value" )+'</div>');  
        },
        stop: function ( event, ui){ 
             $("#public_3").selectedIndex = ui.value;
            $scope.$apply(function () {
                if(  ui.value == 0 ){
                  $scope.public_3 =  "1????????????" ;
                }
                else if(  ui.value == 5 ){
                    $scope.public_3 =  "5????????????" ;
                }
                else{
                  $scope.public_3 =  ui.value.toString() + "??????";
                }
             });
        }
      });




 
    
      $scope.publicFormSubmit = function(){
         $scope.publicformError = {} ;
         if (!mallsvalidcheck()){
            $scope.publicformError.malls = true; 
         }else{
            var selectedmalls = $scope.malls.filter(filterByselected) ; 
            var arr = Object.keys(selectedmalls).map(function(key) {
                return selectedmalls[key].name;
            });
            publicformData.malls = arr.join(",") ;

         }
         if (!$scope.public_1){
            $scope.publicformError.public_1 = true; 
         }else{
            publicformData.q1 = $scope.public_1 ;
         }
         if (!$scope.public_2){
            $scope.publicformError.public_2 = true; 
         }else{
            publicformData.q2 = $scope.public_2 ;
         }
         if (!$scope.public_3){
            $scope.publicformError.public_3 = true; 
         }else{
            publicformData.q3 = $scope.public_3 ;
         }
         if (!$scope.public_4){
            $scope.publicformError.public_4 = true; 
         }else{
             publicformData.q4 =[] ; 
              if ($scope.public_4[0]){
                publicformData.q4.push('??????') 
              }
              if ($scope.public_4[1]){
                publicformData.q4.push('??????') 
              }
              if ($scope.public_4[2]){
                publicformData.q4.push('????????????') 
              }
              if ($scope.public_4[3]){
                publicformData.q4.push('???????????????') 
              }
              if ($scope.public_4[4]){
                publicformData.q4.push('????????????') 
              }
              publicformData.q4 = publicformData.q4.join(",");
         }
         if (!$scope.public_5){
            $scope.publicformError.public_5 = true; 
         }else{
            publicformData.q5 =[] ; 
            if ($scope.public_5[0]){
                publicformData.q5.push('????????????') 
              }
              if ($scope.public_5[1]){
                publicformData.q5.push('??????????????????') 
              }
              if ($scope.public_5[2]){
                publicformData.q5.push('????????????') 
              }
              if ($scope.public_5[3]){
                publicformData.q5.push('??????????????????') 
              }
              if ($scope.public_5[4]){
                publicformData.q5.push('???????????????') 
              }
              if ($scope.public_5[5]){
                publicformData.q5.push('??????????????????????????????') 
              }
              if ($scope.public_5[6]){
                publicformData.q5.push('???????????????') 
              }
              if ($scope.public_5[7]){
                publicformData.q5.push('???????????????????????????') 
              }
              if ($scope.public_5[8]){
                publicformData.q5.push('??????????????????') 
              }
              publicformData.q5 = publicformData.q5.join(",");
         }
         if (!$scope.public_6){
            $scope.publicformError.public_6 = true; 
         }else{
            publicformData.q6 = $scope.public_6 ;
         }
         
         if (!$scope.public_name){
            $scope.publicformError.public_name = true; 
         }else{
            publicformData.name = $scope.public_name ;
         }
         if (!$scope.public_sex){
            $scope.publicformError.public_sex = true; 
         }else{
            publicformData.sex = $scope.public_sex ;
         }
         if (!$scope.public_phone){
            $scope.publicformError.public_phone = true; 
         }else{
            publicformData.phone = $scope.public_phone ;
         }
         if (!$scope.public_email){
            $scope.publicformError.public_email = true; 
         }else{
            publicformData.email = $scope.public_email ;
         }
         if (!$scope.public_tnc){
            $scope.publicformError.public_tnc = true; 
         }else{
            publicformData.tnc = $scope.public_tnc ;
         }
         if (!$scope.public_promotion1){
            publicformData.public_promotion1 = "?????????"; 
         }else{
            publicformData.public_promotion1 = $scope.public_promotion1 ;
         }
         if (!$scope.public_promotion2){
            publicformData.public_promotion2 = "?????????"; 
         }else{
            publicformData.public_promotion2 = $scope.public_promotion2 ;
         }
         console.log($scope.publicForm);
         if ((!$scope.publicForm.$invalid) && (Object.keys($scope.publicformError).length == 0)) {
            console.log(publicformData);
            $.post(theLink+'/PublicSubmit',JSON.stringify(publicformData),function(response){
				if(window.console){console.log(response)}
				if(response.status=="SUCCESS"){
                    $scope.publicForm.$setPristine();
                    $scope.submitsuccess = true;
                    $scope.$apply();

                    campaignLog(publicformData);
				}else if(response.status=="FAIL"){
					
				}else{
					
				}
			}, "json").fail(function(){
			 	if(window.console){console.log("Server Error")}
	   		}, "json");
         }
         
         console.log($scope.publicformError);
      }
});

