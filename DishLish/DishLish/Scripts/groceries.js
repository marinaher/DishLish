$(document).ready(function () {
    $(function () {
        $("#add").click(function () {
            var input = $('#input').val();
            var check = $('<button class="checked btn">Check</button>');
            var newEl = $('<li class="liEl"></li>');
            if (input === '') return;
            newEl.append(input);
            newEl.append(check);
            $('#list').append(newEl);
            newEl.addClass("animated bounce");
            $('#input').val('');

            if ($("#dropDown").val() == "vegetableCategory") {
                $(newEl).css("background-color", "#3D9970");
            }
            else if ($("#dropDown").val() == "meatCategory") {
                $(newEl).css("background-color", "#FF6A6A");
            }
            else if ($("#dropDown").val() == "grainCategory") {
                $(newEl).css("background-color", "#68838B");
            }
            else if ($("#dropDown").val() == "dairyCategory") {
                $(newEl).css("background-color", "#CDCDC1");
            }
            else if ($("#dropDown").val() == "fruitCategory") {
                $(newEl).css("background-color", "#FF3E96");
            }
            else if ($("#dropDown").val() == "otherCategory") {
                $(newEl).css("background-color", "#7AC5CD");
            }

            $(check).click(function () {
                $(this).parent().css('text-decoration', 'line-through');

            });
        });

        $('#remove').click(function (evt) {
            var lastEl = $('li.liEl').last();
            lastEl.remove();
        });

        $('#input').keypress(function (evt) {
            if (evt.keyCode === 13) {
                $("#add").click();
            }
        });
    });
})