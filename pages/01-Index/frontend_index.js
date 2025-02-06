$(document).ready(function() {
    let LoginButton = $(".LoginButton");

    $(LoginButton).hover(
        function() {
            $(this).css({
                "color": "black", 
                "background-color": "yellow"
            });
        },
        function() {
            $(this).css({
                "color": "", 
                "background-color": ""
            });
        }
    );
});
