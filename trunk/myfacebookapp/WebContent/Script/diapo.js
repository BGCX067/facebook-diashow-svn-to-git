//variables
var img_array = new Array(); //array containing the pics
var id_img = 0; //Id of current image
var slide_timeout_value = 2*1000; //time between pics in sec --> (5s)
var slide_timeout = null; //Initialisation variable timeout for slide
var started = false; //mode : true --> started / false --> pause
var many_pics = false; //to know if there is one or more pictures to display


//install diaporama full screen
function diapo_screen()
{
	//background
	var back_ground = document.createElement('a');
	back_ground.setAttribute('id', 'diapo_screen');
	back_ground.title = 'click on the red button on the top-right corner for exit';
	
	
	//container for image and commands
	var container = document.createElement('div');
	container.setAttribute('id', 'container');
	container.style.width = '400px';
	container.style.height = '350px';
	

	//commands
	obj_play = document.createElement('img');
	obj_play.setAttribute('id', 'diapo_play');
	obj_play.setAttribute('src', 'Images/play.png');
	obj_play.title = 'start the slide mode';
	obj_play.onclick = diapo_play;
	obj_play.style.display = 'block';
	container.appendChild(obj_play);
	obj_pause = document.createElement('img');
	obj_pause.setAttribute('id', 'diapo_pause');
	obj_pause.setAttribute('src', 'Images/pause.png');
	obj_pause.title = 'quit the slide mode';
	obj_pause.onclick = diapo_pause;
	obj_pause.style.display = 'block';
	container.appendChild(obj_pause);
	obj_forward = document.createElement('img');
	obj_forward.setAttribute('id', 'diapo_forward');
	obj_forward.setAttribute('src', 'Images/forward.png');
	obj_forward.title = 'display the next picture';
	obj_forward.onclick = diapo_forward;
	obj_forward.style.display = 'block';
	container.appendChild(obj_forward);
	obj_previous = document.createElement('img');
	obj_previous.setAttribute('id', 'diapo_previous');
	obj_previous.setAttribute('src', 'Images/previous.png');
	obj_previous.title = 'display the previous picture';
	obj_previous.onclick = diapo_previous;
	obj_previous.style.display = 'block';
	container.appendChild(obj_previous);
	obj_close = document.createElement('img');
	obj_close.setAttribute('id', 'diapo_close');
	obj_close.setAttribute('src', 'Images/close.png');
	obj_close.title = 'close the diaporama show';
	obj_close.onclick = diapo_close;
	obj_close.style.display = 'block';
	back_ground.appendChild(obj_close);

	//creation of container for image
	var diap = document.createElement('div');
	diap.setAttribute('id', 'img_container');
	diap.style.width = '300px';
	diap.style.height = '300px';
	container.appendChild(diap);

	//positioning of the container
	array_PageSize = getPageSize();
	array_PageScroll = getPageScroll();
	back_ground.style.height = parseInt(parseFloat(array_PageSize[1]));

	container.style.left = parseInt((parseFloat(array_PageSize[0])/2)-200)+'px';
	container.style.top = parseInt(parseFloat(array_PageScroll[1])+(parseFloat(array_PageSize[3])/2)-175)+'px';
	diap.style.left = 50+'px';
	diap.style.top = 50+'px';
	obj_play.style.left = 50+'px';
	obj_play.style.top = 50+'px';
	obj_pause.style.left = 50+'px';
	obj_pause.style.top = 50+'px';
	obj_forward.style.left = 300+'px';
	obj_forward.style.top = 50+'px';
	obj_previous.style.left = 50+'px';
	obj_previous.style.top = 50+'px';
	

	obj_body = document.getElementsByTagName('body').item(0);
	obj_body.appendChild(back_ground);
	obj_body.appendChild(container);
}

//close the diaporama
function diapo_close()
{
	//delete elements
	obj_body = document.getElementsByTagName('body').item(0);
	obj_body.removeChild(document.getElementById('diapo_screen'));
	obj_body.removeChild(document.getElementById('container'));

	//reinitialisation
	id_img = 0;
	clearTimeout(slide_timeout);
	started = false;
	
	//display "diaporama" button & initial picture
	var hide_bg = document.getElementById('diapo');
	hide_bg.style.display = 'block';

}

//function to display pictures
function diapo_image(img)
{
	
	if(!document.getElementById('diapo_screen'))
	{
		diapo_screen();
	}
	

	//collect the objects
	obj_diapo = document.getElementById('diapo_screen');
	obj_container = document.getElementById('img_container');
	obj_table = document.getElementById('container');
	obj_play = document.getElementById('diapo_play');
	obj_pause = document.getElementById('diapo_pause');
	obj_forward = document.getElementById('diapo_forward');
	obj_previous = document.getElementById('diapo_previous');
	obj_close = document.getElementById('diapo_close');
	
	//create image object for the size
	image = new Image;
	image.src = img;

	//create image or recover last one
	if(!document.getElementById('diapo_img')) {
		obj_img = document.createElement('img');
		obj_img.setAttribute('id', 'diapo_img');
		obj_img.title = 'You are so handsome!!!';
	}
	else 
	{
		obj_img = document.getElementById('diapo_img');
		obj_img.title = 'You are so handsome!!!';
	}

	//Resize container and image
	array_PageScroll = getPageScroll();
	array_PageSize = getPageSize();

	var width_container = 300;
	var height_container = 300;

	//image less/more than 300*300
	if(image.height < 300 || image.width < 300)
	{ 
		if(image.width < image.height)
		{
			width_container = 300;
			height_container = image.height*width_container/image.width;
		}
		else
		{
			height_container = 300;
			width_container = image.width*height_container/image.height;
		}
	}
	else
	{
		if(image.width > parseInt(parseFloat(array_PageSize[3])-20) || image.height > parseInt(parseFloat(array_PageSize[4])-20))
		{
			if(image.width > image.height){
				width_container = parseInt(parseFloat(array_PageSize[3])-20);
				height_container = image.height*width_container/image.width;
			}
			else
			{
				height_container = parseInt(parseFloat(array_PageSize[4])-20);
				width_container = image.width*height_container/image.height;
			}
		}
		else
		{
			width_container = image.width;
			height_container = image.height;
		}
	}

	obj_img.setAttribute('width', width_container+'px');
	obj_img.setAttribute('height', height_container+'px');

	obj_container.style.width = width_container+'px';
	obj_container.style.height = height_container+'px';

	if(document.getElementById('diapo_img')) {
		obj_container.removeChild(obj_img);
	}

	//Repositioning container
	obj_table.style.width = width_container+100+'px';
	obj_table.style.height = height_container+50+'px';
	obj_table.style.top = parseInt(parseFloat(array_PageScroll[1])+(parseFloat(array_PageSize[3])/2)-(height_container/2)-50)+'px';
	obj_table.style.left = parseInt((parseFloat(array_PageSize[0])/2)-(width_container/2)-50)+'px';
	obj_img.style.top = parseInt(parseFloat(obj_container.style.top))+'px';
	obj_img.style.left = parseInt(parseFloat(obj_container.style.left))+'px';

	//Positioning commands
	obj_play.style.left = parseInt((width_container/2)+50-150)+'px';
	if(started == false)
	{
		obj_play.style.top = 0+'px';
	}
	else
	{
		obj_play.style.top = 50+'px';
	}
	obj_pause.style.left = parseInt((width_container/2)+50-150)+'px';
	if(started == true)
	{
		obj_pause.style.top = 0+'px';
	}
	else
	{
		obj_pause.style.top = 50+'px';
	}
	obj_forward.style.left = parseInt(width_container+50)+'px';
	obj_forward.style.top = parseInt((height_container/2)+50-150)+'px';
	obj_previous.style.left = 0+'px';
	obj_previous.style.top = parseInt((height_container/2)+50-150)+'px';
	
	//display image
	obj_img.setAttribute('src', img);
	obj_img.style.display = 'block';
	obj_container.appendChild(obj_img);
	obj_table.appendChild(obj_container);

	//restart timeout
	if(started == true)
	{
		var maxi = img_array.length;
		id_img += 1;
		if(id_img == maxi){
			id_img = 0;
		}
		var next = img_array[id_img];
		slide_timeout = setTimeout("diapo_image('"+next+"')", slide_timeout_value);
	}
}

//function called by by the "index"
function diapo(images)
{
	//extract pics
	for(var i = 0; i < images.length; i++){
		img_array.push(images[i].src_big);
	}

	if(img_array.length > 1)
	{
		many_pics = true;
	}
	
	img = img_array[id_img];
	load_img = new Array();
	for(var i=0; i<img_array.length; i++)
	{
		//new Image object! src allows us to load the image from an URL and stock it in the object
		load_img[i] = new Image();
		load_img[i].src = img_array[i];
	}
	//full screen
	diapo_screen();

	//hide back ground
	var hide_bg = document.getElementById('diapo');
	hide_bg.style.display = 'none';

	//display pics
	if(!load_img[0].complete)
	{
		load_img[0].onload = function()
		{
			diapo_image(img);
		}
	}
	else
	{
		diapo_image(img);
	}
}

//diapo play and slide mode on
function diapo_play()
{
	if(many_pics == true)
	{
		started = true;
		//compute next ID
		var max = img_array.length;
		id_img += 1;
		if(id_img == max){
			id_img = 0;
		}
		var next = img_array[id_img];
		//start the timeout
		slide_timeout = setTimeout("diapo_image('"+next+"')", slide_timeout_value);
		//display 'Pause' instead of 'Play'
		obj1_play = document.getElementById('diapo_play');
		obj1_pause = document.getElementById('diapo_pause');
		obj1_play.style.top = 50+'px';
		obj1_pause.style.top = 0+'px';
	}
}

//diapo pause and slide mode off
function diapo_pause()
{
	if(many_pics == true)
	{
		started = false;
		var max1 = img_array.length;
		//stop the timeout
		clearTimeout(slide_timeout);
		//display 'play' instead of 'pause'
		obj2_play = document.getElementById('diapo_play');
		obj2_pause = document.getElementById('diapo_pause');
		obj2_play.style.top = 0+'px';
		obj2_pause.style.top = 50+'px';
		//reset the ID to the current pic
		id_img -= 1;
		if(id_img == -1){
			id_img = max1;
		}
	}
}

//Diapo forward
function diapo_forward()
{
	if(many_pics == true)
	{
		if(started == false)
		{
			//compute next ID
			var limit1 = img_array.length;
			id_img += 1;
			if(id_img == limit1)
			{
				id_img = 0;
			}
			var next_image = img_array[id_img];
			diapo_image(next_image);
		}
		else
		{
			started = false; //slide is stopped when we click on next button
			clearTimeout(slide_timeout);
			var next_image = img_array[id_img];
			diapo_image(next_image);
		}
	}
}

//Diapo previous
function diapo_previous()
{
	if(many_pics == true)
	{
		if(started == false)
		{
			//compute previous ID
			var limit2 = img_array.length - 1;
			id_img -= 1;
			if(id_img < 0)
			{
				id_img = limit2;
			}
			var previous_image = img_array[id_img];
			diapo_image(previous_image);
		}
		else
		{
			started = false; //slide is stopped when we click on previous button
			clearTimeout(slide_timeout);
			var limit2 = img_array.length - 1;
			id_img -= 2;
			if(id_img < 0)
			{
				id_img = limit2;
			}
			var previous_image = img_array[id_img];
			diapo_image(previous_image);
		}
	}
}


//----------------------------------------------------------------------------------
//search friends

function getFriend()
{
	var friendName = $("#InputSearchFeald").val();
	alert(friendName);
	alert(friendsArray);
	

	if(friendName == "")
	{
		fillFriends(friendsArray);
	}
	else
	{
		
		var resultArray = new Array();
		for(var i = 0; i < friendsArray.length; i++){
			if(friendsArray[i].name == friendName)
			{
				resultArray.push(friendsArray[i]);
			}
		}

		fillFriends(resultArray);
	}
}

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//getPageScroll()
//Returns array with x,y page scroll values.
//Core code from - quirksmode.org
//Code by Lokesh Dhakar
function getPageScroll()
{
	var yScroll;
	if (self.pageYOffset) 
	{
		yScroll = self.pageYOffset;
	} 
	else if (document.documentElement && document.documentElement.scrollTop)
	{	
		// Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
	} 
	else if (document.body) 
	{	
		// all other Explorers
		yScroll = document.body.scrollTop;
	}
	arrayPageScroll = new Array('',yScroll)
	return arrayPageScroll;
}

//-----------------------------------------------------------------------------------
//getPageSize()
//Returns array with page width, height and window width, height
//Core code from - quirksmode.org
//Code by Lokesh Dhakar
//Edit for Firefox by pHaez

function getPageSize()
{
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) 
	{	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} 
	else if (document.body.scrollHeight > document.body.offsetHeight)
	{ 
		// all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} 
	else 
	{ 
		// Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) 
	{	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} 
	else if (document.documentElement && document.documentElement.clientHeight) 
	{ 
		// Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} 
	else if (document.body) 
	{ 
		// other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	//for small pages with total height less then height of the viewport
	if(yScroll < windowHeight)
	{
		pageHeight = windowHeight;
	} 
	else 
	{ 
		pageHeight = yScroll;
	}
	
	//for small pages with total width less then width of the viewport
	if(xScroll < windowWidth)
	{	
		pageWidth = windowWidth;
	} 
	else 
	{
		pageWidth = xScroll;
	}
	
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight)
	return arrayPageSize;
}

//Is an array?  --> yes : return true / No : return false	
function isArray(tab)
{
	if(typeof tab == 'object')
	{
		return true;
	}
	else
	{
		return false;
	}
}



function getFriend()
{
	var friendName = $("#InputSearchFeald").val();

	

	if(friendName == "")
	{
		fillFriends(friendsArray);
	}
	else
	{
		
		var resultArray = new Array();
		for(var i = 0; i < friendsArray.length; i++){
			var currntFriendName = friendsArray[i].name.toLowerCase();
			if(	contains(currntFriendName, friendName.toLowerCase()))
			{
				resultArray.push(friendsArray[i]);
			}
		}

		fillFriends(resultArray);
		
	}
	resetSliderPosition();
}

function resetSliderPosition(){
	$("#slider").css({"left":"0px"});
}

function contains(sourceString, value){

	var i = sourceString.indexOf(value);
	var contains = (i >= 0);
	if(contains){
		return true;
	}else{
		return false;
	}
}
             	
	function startSlideShow(){
		   var photoArray = null;
		loadPicturesFromServer(picturesLoaded);
	}
	    	       
	function picturesLoaded(){
	
		diapo(photoArray);
	}
