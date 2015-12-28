  //-------------------------------------------------------------moving slider----------------------------------------------
        function measureSliderContent() {
            var friendBoxes = $("#slider").children(".friendBox");
            var totalWidthfriendBoxes = 0;
            friendBoxes.each(
                function() {
                    var width = this.clientWidth;
                    totalWidthfriendBoxes += width;
                }
            );
            
            return { totalWidthfriendBoxes: totalWidthfriendBoxes, friendBoxesCount: friendBoxes.length };
        }

        function moveSlider(value) {

            var sliderMeasures = measureSliderContent();
            var sliderWidth = sliderMeasures.totalWidthfriendBoxes;
            var sliderMovement = sliderWidth - 680;

            var friendBoxesCount = parseInt(sliderMeasures.friendBoxesCount);
            var timeOfAnimation = friendBoxesCount * 250;

            if (value == 1) {
                $("#slider").animate({ "left": "-=" + sliderMovement + "px" }, timeOfAnimation,"linear");
            }
            else {
                $("#slider").animate({ "left": "+=" + sliderMovement + "px" }, timeOfAnimation, "linear");
            }
        }

        function stopSlider() {
            $("#slider").stop();
        }
        //-------------------------------------------------------------moving slider----------------------------------------------
