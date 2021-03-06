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
            url: "https://api.themoviedb.org/3/movie/" + resourceId + "?language=en-US",
            data: {
                api_key: "eb4cda00c52a1c0b7c868aec79418356"
            },
            dataType: 'json',
            success: function (result, status, xhr) {
                $("#modalTitleH4").html(result["original_title"]);

                var image = result["poster_path"] == null ? "no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["poster_path"];
                var overview = result["overview"] == null ? "No information available" : result["overview"];

                var resultHtml = "<p class=\"text-center\"><img src=\"" + image + "\"/></p><p>" + overview + "</p>";
                resultHtml += "<p>Popularity: " + result["popularity"] + "</p><p>Release Date: " + result["release_date"] + "";

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
            url: "https://api.themoviedb.org/3/search/movie?language=en-US&query=" + $("#searchInput").val() + "&page=" + page + "&include_adult=false",
            data: { "api_key": "eb4cda00c52a1c0b7c868aec79418356" },
            dataType: "json",
            success: function (result, status, xhr) {
                var resultHtml = $("<div class=\"resultDiv\"><p>Title</p>");
                for (i = 0; i < result["results"].length; i++) {

                    var image = result["results"][i]["poster_path"] == null ? "no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["results"][i]["poster_path"];

                    resultHtml.append("<div class=\"result\" resourceId=\"" + result["results"][i]["id"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + result["results"][i]["original_title"] + "</a></p></div>")
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