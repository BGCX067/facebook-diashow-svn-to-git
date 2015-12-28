<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
    <link href="Styles/friendFrame.css" rel="stylesheet" type="text/css" />
    <link href="Styles/pickedFrame.css" rel="stylesheet" type="text/css" />
    <link href="Styles/diapo.css" rel="stylesheet" type="text/css" />
    <link href="Styles/allAlbumsFrames.css" rel="stylesheet" type="text/css" />
    <title>Facebook SlideShow</title>

    <script type="text/javascript" src="Script/jquery-1.3.2.js"></script>
    <script type="text/javascript" src="Script/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="Script/jScrollPane.js"></script>
    <script type="text/javascript" src="Script/allAlbumsFrame.js"></script>
    <script type="text/javascript" src="Script/diapo.js"></script>
    <script type="text/javascript" src="Script/slider.js"></script>
    <script type="text/javascript" src="Script/searchField.js"></script>
    <script type="text/javascript" src="Script/friendsBox.js"></script>
    <script src="Script/mover.js" type="text/javascript"></script>

    <script type="text/javascript">
       
         var friendsArray = <%= (String) session.getAttribute("friendsJSONString")%>;
         var albumArray;
         var photoArray; 

   
    </script>

</head>
<body style="padding: 5px;">
   
    <!----------------------------------------------------------------------------->
    <div id="friendsBoxTemplate" style="display: none;">
        <div class="friendBox" align="center">
            <center>
                <div class="friendsImg">
                    <div class="leftFrame">
                    </div>
                    <div class="leftUpperLowerFrame">
                    </div>
                    <div class="rightFrame">
                    </div>
                    <div class="rightUpperLowerFrame">
                    </div>
                    <div class="content" align="center" id="$friendsId">
                        <img style="height: 120px;" src="$profilePictureURL" class="allAlbumFrameOpener" />
                    </div>
                </div>
            </center>
            <p>
                <span class="friendsName">$friendsName </span>
            </p>
        </div>
    </div>
    <!----------------------------------------------------------------------------->
    <div id="albumFrameTemplate" style="display: none">
        <div class="albumFrame">
            <div class="albumFrameTop transparent">
            </div>
            <div class="albumFrameCenter ">
                <div class="albumFrameContent">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <div class="albumFrameImage">
                                    <img src="$coverPicURL" />
                                </div>
                            </td>
                            <td style="width: 90%;">
                                $name
                                <br />
                                $size
                            </td>
                            <td class="albumActionCell">
                                <a href="#" class="albumActionLink" onclick="performAlbumAction(this); return false;"
                                    aid="$aid" action="appendToPickedAlbums">+ </a>
                            </td>
                            <td>
                                <div style="width: 10px;">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div style="clear: both">
                </div>
            </div>
            <div class="albumFrameBottom transparent">
            </div>
        </div>
    </div>
    <!----------------------------------------------------------------------------->
    <div class="friendsFrame" onmouseover="insideFriendsList(1)" onmouseout="insideFriendsList(0)">
        <div class="left" onmouseover="moveSlider(-1)" onmouseout="stopSlider()">
        </div>
        <div class="middle">
            <div class="slider" id="slider">
            </div>
        </div>
        <div class="right" onmouseover="moveSlider(1)" onmouseout="stopSlider()">
        </div>
    </div>
    <!----------------------------------------------------------------------------->
    <div id="searchField" onmouseover="insideSearchField(1)" onmouseout="insideSearchField(0)">
        <div class="leftSearchField">
        </div>
        <div class="middleSearchField">
            <div class="topSearchField">
            </div>
            <input type="text" id="InputSearchFeald" onfocus="insideSearchFieldInput(1)" onblur="insideSearchFieldInput(0)">
            <div class="buttomSearchField">
            </div>
        </div>
        <div class="rightSearchField searchButton" onclick="getFriend();">
        </div>
    </div>
    <div  style=" position:absolute; left: 850px; top: 700px;">
	    <div id="diapo">
			<div class="screen"> 
				<img src="Images/noSlideShow.png" width="400px" >
			</div>
			<div class="button">
				<button onclick="startSlideShow()">Start</button>
			</div>
		</div>
	</div>
    <!----------------------------------------------------------------------------->
    <div class="pickedAlbumsFrame">
        <div class="upperArrows" onmouseover="moveMover(-1)" onmouseout="stopMover()">
        </div>
        <div class="middle">
            <div id="mover">
            </div>
        </div>
        <div class="bottomArrows" onmouseover="moveMover(1)" onmouseout="stopMover()">
        </div>
    </div>
    <!----------------------------------------------------------------------------->
    <div id="loadingProgress" style="position:absolute; width: 50px; height: 50px" > <img src='Images/loading.gif' /> </div>
    <div id="allAlbumFramesWrapper" style="width: 340px; height: 200px; position: absolute;"
        onclick="$('#allAlbumsFrames').jScrollPane();">
        <div id="allAlbumsFrames">
        </div>
    </div>
    <!----------------------------------------------------------------------------->
    
</body>
</html>
