/*
**************************************************************************************************************************
** CORAL Resources Module v. 1.0
**
** Copyright (c) 2010 University of Notre Dame
**
** This file is part of CORAL.
**
** CORAL is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
**
** CORAL is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
**
** You should have received a copy of the GNU General Public License along with CORAL.  If not, see <http://www.gnu.org/licenses/>.
**
**************************************************************************************************************************
*/


$(document).ready(function(){

  updateSearch($('#searchPage').val());      
      
	//perform search if enter is hit
	$('#searchResourceID').keyup(function(e) {
	      if(e.keyCode == 13) {
		searchValidResource();
	      }
	});

	//perform search if enter is hit
	$('#searchName').keyup(function(e) {
	      if(e.keyCode == 13) {
		updateSearch();
	      }
	});      
	
	//perform search if enter is hit
	$('#searchResourceISBNOrISSN').keyup(function(e) {
	      if(e.keyCode == 13) {
		updateSearch();
	      }
	});     
	
	//perform search if enter is hit
	$('#searchFund').keyup(function(e) {
	      if(e.keyCode == 13) {
		updateSearch();
	      }
	});   
	
	//perform search if enter is hit
	$('#searchResourceNote').keyup(function(e) {
	      if(e.keyCode == 13) {
		updateSearch();
	      }
	});     
	
	//perform search if enter is hit
	$('#searchCreateDateEnd').keyup(function(e) {
	      if(e.keyCode == 13) {
		updateSearch();
	      }
	});     
	
	//perform search if enter is hit
	$('#searchCreateDateEnd').keyup(function(e) {
	      if(e.keyCode == 13) {
		updateSearch();
	      }
	});   



	//for performing excel output
	$("#export").live('click', function () {
		window.open('export.php');
		return false;
	});

	$("#searchResourceIDButton").click(function () {
		searchValidResource();
		return false;
	});
	
	
	//bind change event to Records Per Page drop down
	$("#numberRecordsPerPage").live('change', function () {
	  setNumberOfRecords($(this).val())
	});
                   

	//bind change event to each of the page start
	$(".setPage").live('click', function () {
		setPageStart($(this).attr('id'));
	});
	
	$('#resourceSearchForm select').change(updateSearch);
	
	$('#resourceSearchForm').submit(function() {
	  updateSearch();
	  return false;
	})
 });
 
function updateSearch(pageNumber) {
  if (!pageNumber) {
    pageNumber = 1;
  }
  $('#searchPage').val(pageNumber);
  
  var form = $('#resourceSearchForm');
  $.post(
    form.attr('action'),
    form.serialize(),
    function(html) { 
     	$("#div_feedback").html("&nbsp;");
     	$('#div_searchResults').html(html);  
     }
   );
   
   window.scrollTo(0, 0);
}

function updateSearch2(){
      $("#div_feedback").html("<img src='images/circle.gif'>  <span style='font-size:90%'>Processing...</span>");
      
	
      $.ajax({
            
         type:       "POST",
         url:        "ajax_htmldata.php?action=getSearchResources",
         cache:      false,
         data:       { resourceID: $("#searchResourceID").val(), name: $("#searchName").val(), resourceISBNOrISSN: $("#searchResourceISBNOrISSN").val(), fund: $("#searchFund").val(), acquisitionTypeID: $("#searchAcquisitionTypeID").val(), workflowStep: $("#searchWorkflowStep").val(), statusID: $("#searchStatusID").val(), creatorLoginID: $("#searchCreatorLoginID").val(), resourceFormatID: $("#searchResourceFormatID").val(), resourceTypeID: $("#searchResourceTypeID").val(), noteTypeID: $("#searchNoteTypeID").val(), resourceNote: $("#searchResourceNote").val(), createDateStart: $("#searchCreateDateStart").val(), createDateEnd: $("#searchCreateDateEnd").val(), administeringSiteID: $("#searchAdministeringSiteID").val(), authorizedSiteID: $("#searchAuthorizedSiteID").val(), purchaseSiteID: $("#searchPurchaseSiteID").val(), authenticationTypeID: $("#searchAuthenticationTypeID").val(), catalogingStatus: $('#searchCatalogingStatus').val(), orderBy: orderBy, page: page, recordsPerPage: recordsPerPage, startWith: startWith },
         success:    function(html) { 
         	$("#div_feedback").html("&nbsp;");
         	$('#div_searchResults').html(html);  
         }


     });	
     
     //jump to top of page in case user was scrolled down
     window.scrollTo(0, 0);

	
}

function searchValidResource(){


      $.ajax({

	 type:       "GET",
	 url:        "ajax_htmldata.php?action=getIsValidResourceID",
	 cache:      false,
	 data:       "&resourceID=" + $("#searchResourceID").val(),
	 success:    function(resourceExists) { 
		if (resourceExists == 1){
			window.parent.location=("resource.php?resourceID=" + $("#searchResourceID").val());
		}else{
			updateSearch();
		}
	 }


     });

}
 
 
function setOrder(column, direction){
  $("#searchOrderBy").val(column + " " + direction)
  updateSearch();
}
 
 
function setPageStart(pageStartNumber){
  updateSearch(pageStartNumber);
}


function setNumberOfRecords(recordsPerPageNumber){
  $("#searchRecordsPerPage").val(recordsPerPageNumber);
  updateSearch();
}
 
 
 
  
  function setStartWith(startWithLetter){
    //first, set the previous selected letter (if any) to the regular class
  	$("span.searchLetterSelected").removeClass('searchLetterSelected').addClass('searchLetter');
  	
    if ($('#searchStartWith').val() == startWithLetter) {
      $('#searchStartWith').val('');
    } else {
    	//next, set the new start with letter to show selected
    	$("#span_letter_" + startWithLetter).removeClass('searchLetter').addClass('searchLetterSelected');
  	
    	$('#searchStartWith').val(startWithLetter);
  	}
  	updateSearch();
  }
 
 
 
  $(".newSearch").click(function () {
  	//reset fields
  	$('#resourceSearchForm input').not('#searchRecordsPerPage').val("");
  	$('#resourceSearchForm select').val("");


  	//reset startwith background color
  	$("span.searchLetterSelected").removeClass('searchLetterSelected').addClass('searchLetter');
  	//$("#span_letter_" + startWith).removeClass('searchLetterSelected').addClass('searchLetter');
  	//startWith='';
  	updateSearch();
  });
  
   
  $("#searchResourceID").focus(function () {
  	$("#div_searchID").css({'display':'block'}); 
  });

  $("#searchName").focus(function () {
  	$("#div_searchName").css({'display':'block'}); 
  });    
  $("#searchResourceISBNOrISSN").focus(function () {
  	$("#div_searchISBNOrISSN").css({'display':'block'}); 
  });  
  $("#searchFund").focus(function () {
  	$("#div_searchFund").css({'display':'block'}); 
  });  
  $("#searchResourceNote").focus(function () {
  	$("#div_searchResourceNote").css({'display':'block'}); 
  });
  $("#searchCreateDateStart").change(function () {
  	$("#div_searchCreateDate").css({'display':'block'}); 
  });
  $("#searchCreateDateEnd").change(function () {
  	$("#div_searchCreateDate").css({'display':'block'}); 
  });  
  
  
  $("#showMoreOptions").click(function () {
  	$("#div_additionalSearch").css({'display':'block'}); 
  	$("#hideShowOptions").html("");
  	//$("#hideShowOptions").html("<a href='javascript:void(0);' name='hideOptions' id='hideOptions'>hide options...</a>");
  });
  
  
  $("#hideOptions").click(function () {
  	$("#div_additionalSearch").css({'display':'none'}); 
  	$("#hideShowOptions").html("<a href='javascript:void(0);' name='showMoreOptions' id='showMoreOptions'>more options...</a>");
  });
