 $(document).ready(
            function() {
            	fillFriends(friendsArray);
            });
     
      
        /*insert real data about a friend into a html template*/
        function createFriendBox(friendJSON) {
            var friendsId = friendJSON.uid;
            var profilePictureURL = friendJSON.pic_big;
            var friendsName = friendJSON.name;

            var friendsBoxTemplateHTML = $("#friendsBoxTemplate").html();
            var friendsBoxHTML = friendsBoxTemplateHTML.replace("$friendsId", friendsId)
                                                        .replace("$profilePictureURL", profilePictureURL)
                                                        .replace("$friendsName", friendsName);
            return friendsBoxHTML;
        }

        /*appends a friend to the slider*/
        function appendFriendToSlider(friendJSON) {
            var friendsBoxHTML = createFriendBox(friendJSON);

            $("#slider").append(friendsBoxHTML);

        }

        /*append each friend in the friendArray to #slider*/
        function fillFriends(friendsArray) {
            for (var index in friendsArray) {
                appendFriendToSlider(friendsArray[index]);
            }
            $('.allAlbumFrameOpener').one('click', openMenu);
        }
        