$(document).ready(function () {
    $("#reset").click(function (e) {
        location.reload();
    });

    $("#submit").click(function (e) {
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0) {
            CallAPI(1);
        }
    });

    $("#message").on("click", ".result", function () {
        var resourceId = $(this).attr("resourceId");
        $.ajax({
            url: "https://api.themoviedb.org/3/person/" + resourceId + "?language=en-US",
            data: {
                api_key: "3356865d41894a2fa9bfa84b2b5f59bb"
            },
            dataType: 'json',
            success: function (result, status, xhr) {
                $("#modalTitleH4").html(result["name"]);

                var image = result["profile_path"] == null ? "no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["profile_path"];
                var biography = result["biography"] == null ? "No information available" : result["biography"];

                var resultHtml = "<p class=\"text-center\"><img src=\"" + image + "\"/></p><p>" + biography + "</p>";
                resultHtml += "<p>Birdthday: " + result["birthday"] + "</p><p>Place of Birth: " + result["place_of_birth"] + "";

                $("#modalBodyDiv").html(resultHtml)

                $("#myModal").modal("show");
            },
            error: function (xhr, status, error) {
                $("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    });

    $(document).ajaxStart(function () {
        $(".imageDiv img").show();
    });

    $(document).ajaxStop(function () {
        $(".imageDiv img").hide();
    });

    function CallAPI(page) {
        $.ajax({
            url: "https://api.themoviedb.org/3/search/person?language=en-US&query=" + $("#searchInput").val() + "&page=" + page + "&include_adult=false",
            data: { "api_key": "3356865d41894a2fa9bfa84b2b5f59bb" },
            dataType: "json",
            success: function (result, status, xhr) {
                var resultHtml = $("<div class=\"resultDiv\"><p>Names</p>");
                for (i = 0; i < result["results"].length; i++) {

                    var image = result["results"][i]["profile_path"] == null ? "no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["results"][i]["profile_path"];

                    resultHtml.append("<div class=\"result\" resourceId=\"" + result["results"][i]["id"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + result["results"][i]["name"] + "</a></p></div>")
                }

                resultHtml.append("</div>");
                $("#message").html(resultHtml);

                Paging(result["total_pages"]);
            },
            error: function (xhr, status, error) {
                $("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    }

    function Validate() {
        var errorMessage = "";
        if ($("#searchInput").val() == "") {
            errorMessage += "► Enter Search Text";
        }
        return errorMessage;
    }

    function Paging(totalPage) {
        var obj = $("#pagination").twbsPagination({
            totalPages: totalPage,
            visiblePages: 5,
            onPageClick: function (event, page) {
                CallAPI(page);
            }
        });
    }

});