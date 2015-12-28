 var insideFriendsListPanel = 0;
        var insideSearchFieldValue = 0;
        var insideSearchFieldInputValue = 0;

        function insideFriendsList(value) {
            insideFriendsListPanel = value;
            toggleDiv('searchField', value);
        }

        function insideSearchField(value) {
            insideSearchFieldValue = value;
            toggleDiv('searchField', value);
        }

        function insideSearchFieldInput(value) {
            insideSearchFieldInputValue = value;
            toggleDiv('searchField', value);
        }

        function toggleDiv(id, flagit) {
            if (insideFriendsListPanel == "1" || insideSearchFieldValue == "1" || insideSearchFieldInputValue == "1") {
                if (document.layers) document.layers['' + id + ''].visibility = "show"
                else if (document.all) document.all['' + id + ''].style.visibility = "visible"
                else if (document.getElementById) document.getElementById('' + id + '').style.visibility = "visible"
            }
            else
                if (insideFriendsListPanel == "0" && insideSearchFieldValue == "0" && insideSearchFieldInputValue == "0") {
                if (document.layers) document.layers['' + id + ''].visibility = "hide"
                else if (document.all) document.all['' + id + ''].style.visibility = "hidden"
                else if (document.getElementById) document.getElementById('' + id + '').style.visibility = "hidden"
            }
        }
