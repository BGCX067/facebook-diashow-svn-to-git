//-------------------------------------------------------------moving mover----------------------------------------------
function measureMoverContent() {
    var friendBoxes = $("#mover").children(".albumFrame");
    var totalHeightfriendBoxes = 0;
    friendBoxes.each(
                function() {
                    var height = this.clientHeight;
                    totalHeightfriendBoxes += height;
                }
            );
    var marginBetweenAlbumFrames = 5;

    var totalMarginBetween = marginBetweenAlbumFrames * (friendBoxes.length + 1);
    totalHeightfriendBoxes += totalMarginBetween;

    return { totalHeightfriendBoxes: totalHeightfriendBoxes, friendBoxesCount: friendBoxes.length };
}

function moveMover(value) {

    var moverMeasures = measureMoverContent();
    var moverHeight = moverMeasures.totalHeightfriendBoxes;
    var moverMovement = moverHeight - 450;

    if(moverMovement <= 0){
    	return
    }
    
    var friendBoxesCount = parseInt(moverMeasures.friendBoxesCount);
    var timeOfAnimation = friendBoxesCount * 150;

    if (value == 1) {
        $("#mover").animate({ "top": "-=" + moverMovement + "px" }, timeOfAnimation, "linear");
    }
    else {
        $("#mover").animate({ "top": "+=" + moverMovement + "px" }, timeOfAnimation, "linear");
    }
}

function stopMover() {
    $("#mover").stop();
}
//-------------------------------------------------------------moving mover----------------------------------------------