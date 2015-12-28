
$(document).ready(
//have a look at the last line of function fillFriends !!!!!!!!!!!!!!!!!!!!
            function() {
                $("#allAlbumFramesWrapper").hide();
                $("#loadingProgress").hide();
            });


var previousButton;
var suppressClosing = false;
var allAlbumsFrameOpen = false;



var serverURLAlbums = "/myfacebookapp/AlbumServlet";

function loadAlbumsFromServer(id, e, button) {
   var result = $.ajax({
       type: "GET",
       url: serverURLAlbums,
       data: "clickedFriendId="+ id,
       success: function(msg) {
           albumsArray = eval('('+ msg+')');
           
           openMenuAsynch(e, button);
           
       }});
   
}

function openMenu(e) {
	
	  var button = $(this);
	   previousButton = button;
	   	   
	   var userId = button.parent().attr("id");
	   $("#allAlbumsFrames").empty();
	   var menu = $("#allAlbumFramesWrapper");
	   menu.hide();
	   var offset = button.offset();
	   var h = (button.outerHeight) ? button.outerHeight() : button.height();
	   var w = (button.outerWidth) ? button.outerWidth() : button.width();
	   
	   var loadingProgress = $("#loadingProgress");
	   
	   var positionCssProperties = {
	       'top': offset.top + h + 20, 'left': offset.left + w / 2
	   };
	 
	   menu.css(positionCssProperties);
	   loadingProgress.css(positionCssProperties);
	   loadingProgress.css({"display": "block"});
	   
	   loadAlbumsFromServer(userId,e, button);
	   //openMenuAsynch(e, button);
}


function openMenuAsynch(e, button){
	if (allAlbumsFrameOpen) {
	       suppressClosing = true;
	   }

	   allAlbumsFrameOpen = true;

	   if (previousButton != null) {
	       previousButton.one('click', openMenu);
	   }
	
	   previousButton = button;
	   $("#allAlbumsFrames").empty();
	   fillAllAlbums(albumsArray);
     
	   var menu = $("#allAlbumFramesWrapper");
	  
	   $("#loadingProgress").hide();
	   
	   menu.click(function(e) {
	       e.stopPropagation();
	   });
	   menu.show(200, function() {
	       $(document).one('click', closeMenu);
	   });
	   $("#allAlbumsFrames").jScrollPane();
}


function closeMenu(e) {

    if (!suppressClosing) {
        $("#allAlbumFramesWrapper").hide(100);
        $("#loadingProgress").hide();
        previousButton.one('click', openMenu);
        allAlbumsFrameOpen = false;
    } else {
        suppressClosing = false;
        $(document).one('click', closeMenu);
    }
}


function createAlbumFrame(albumJSON) {;
    var albumId = albumJSON.aid;
    var albumName = albumJSON.name;
    var albumSize = albumJSON.size + " pictures";
    var albumCoverPicURL = albumJSON.src_small;

    var albumFrameTemplateHTML = $("#albumFrameTemplate").html();
    var albumFrameHTML = albumFrameTemplateHTML.replace("$aid", albumId)
                                                        .replace("$name", albumName)
                                                        .replace("$size", albumSize)
                                                        .replace("$coverPicURL", albumCoverPicURL);
    return albumFrameHTML;
}

function appendAlbumToAllAlbumsFrames(albumJSON) {
    var albumFrame = createAlbumFrame(albumJSON);
    $("#allAlbumsFrames").append(albumFrame);
}

function fillAllAlbums(albumArray) {
	var albumEmpty = (albumArray.length == 0 || albumArray == null);
	
	if(albumEmpty){
		var noAlbumJSON = {aid:-1, name: "No albums... :-(", src_small:"Images/noAlbum.png"};
		appendAlbumToAllAlbumsFrames(noAlbumJSON);
	}else{
		for (var index in albumArray) {
        	appendAlbumToAllAlbumsFrames(albumArray[index]);
    	}
	}
}

function performAlbumAction(actionLink) {
    //var aid = parseInt($(actionLink).attr("aid"));
    //alert(aid);
    var albumFrame = $(actionLink).parents(".albumFrame");
    var action = $(actionLink).attr("action");
    if (action == "appendToPickedAlbums") {
        $(actionLink).attr("action", "removeFromPickedAlbums");
        var deleteSign = "x";
        $(actionLink).text(deleteSign);

        var albumFrameTopHTML = "<div class='albumFrame'>";
        var albumFrameInnerHTML = albumFrame.html();
        var albumFrameBottomHTML = "</div>";

        var albumFrameOuterHTML = albumFrameTopHTML + albumFrameInnerHTML + albumFrameBottomHTML;

        albumFrame.fadeOut(1000, function() {
            albumFrame.remove();
            $("#allAlbumsFrames").jScrollPane();
        });


        var newlyAppendedAlbumFrame = $("#mover").append(albumFrameOuterHTML)[0].lastChild;
        $(newlyAppendedAlbumFrame).hide();
        $(newlyAppendedAlbumFrame).fadeIn(250);
    }
    if (action == "removeFromPickedAlbums") {
        albumFrame.fadeOut(250, function() { albumFrame.remove(); });
    }
    return false;

}

function getPickedAlbumsSepatedByPipe(){
    var pickedAlbums = "";
    $("#mover").children().each(function() {
        var pickedAlbum = $(this);
        var aid = pickedAlbum.find(".albumActionLink").attr("aid");
        var isEmptyAlbum = (aid == -1);
        if(!isEmptyAlbum){
           pickedAlbums+="|"+aid;
        }
    });
    var pickedAlbumsLength = pickedAlbums.length;
    //remove leading |
    return pickedAlbums.substring(1, pickedAlbumsLength);
    
   }

var serverURLPhotos = "/myfacebookapp/PictureServlet";

function loadPicturesFromServer(callback) {
	   var aids = getPickedAlbumsSepatedByPipe();
	   var result = $.ajax({
	       type: "GET",
	       url: serverURLPhotos,
	       data: "toViewAlbumIds="+ aids,
	       success: function(msg) {
	         		photoArray = eval('('+ msg+')');
	          // alert(photoArray);
	           callback();
	       }});
	   
	}

