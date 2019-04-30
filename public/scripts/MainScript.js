$(function () {
    SetSmallWindowConfig();


    //$(".toast").on("click", function () {
    //    alert();
    //    $(this).fadeOut(500, function () {
    //        $(this).remove();
    //    });
    //});

    //تعریف عملکرد دکمه نمایش
    $(".toggle-min").click(function () {
        if ($("body").hasClass("nav-min")) {
            //$(".icon-bg").css({ "display": "none" });
            $("body").removeClass("nav-min");
            $(".icon-bg").css({ "right": "-47px" });
        }
        else {
            $("body").addClass("nav-min");
            $("#nav > li ul").slideUp();
            $("#nav > li").removeClass("open");
            //$(".icon-bg").css({ "display": "block" });
            $(".icon-bg").css({ "right": "0" });
        }
    });

    //باز و بسته کردن منوی سمت راست
    $(".menu-button").click(function () {
        if ($("body").hasClass("on-canvas")) {
            $("body").removeClass("on-canvas");
            $("#nav-container").css({ "display": "none" });
        }
        else {
            $("body").addClass("on-canvas");
            $("#nav-container").css({ "display": "block" });
            $(".icon-bg").css({ "right": "-47px" });
        }

    });

    //اعمال تغییرات در تغییر اندازه صفحه نمایش
    $(window).resize(function () {
        SetSmallWindowConfig();
    });

   

    //باز و بسته کردن جزئیات اعلانات بالای صفحه
    $(".dropdown a[data-toggle='dropdown']").click(function () {
        if ($(this).closest("li").hasClass("open")) {
            $(this).closest("li").removeClass("open");
        }
        else {
            $(".dropdown").removeClass("open");
            $(this).closest("li").addClass("open");
        }
    });

    
    $("body").on("click", "#content, #nav-container", function () {
        $(".dropdown").removeClass("open");
    });

    //باز و بسته کردن آکاردیونی
    $("#nav > li > a").click(function () {
        if (!$("body").hasClass("nav-min"))
            if ($(this).parent().hasClass("open")) {
                $(this).parent().removeClass("open");
                $(this).parent().find("ul").slideUp();
            }
            else {
                $("#nav > li ul").slideUp();
                $("#nav > li").removeClass("open");
                $(this).parent().addClass("open");
                $(this).parent().find("ul").slideDown();
            }
    });

    //افکت منو در حالتی که ماوس روی آن میرود
    $("#nav > li").mouseover(function () {
        if (!$("body").hasClass("nav-min"))
            $(this).find(".icon-bg").stop().animate({ "right": "0" }, 150);
    });

    //افکت منو در حالتی که ماوس از روی آن خارج می شود
    $("#nav > li").mouseleave(function () {
        if (!$("body").hasClass("nav-min"))
            $(this).find(".icon-bg").stop().animate({ "right": "-47" }, 150);
    });

    //گرفتن تاییدیه قبل از عمل
    $(document).on("click", ".btnDialogOk", function () {
        $(".modal-content").animate({ "top": "-400px" }, 700, function () {
            $("#messageContainer").remove();
            if (globalAjaxModel["url"]) DoGlobalAjax(globalAjaxModel["url"], globalAjaxModel["data"], globalAjaxModel["target"], globalAjaxModel["funcName"], globalAjaxModel["loader"]);
            globalAjaxModel["url"] = "";
        });
        return true;
    });

    $(document).on("click", ".btnDialogCancel", function () {
        $(".modal-content").animate({ "top": "-400px" }, 700, function () {
            $("#messageContainer").remove();
        });
    });


    // Changes panel while radio button selected index changes
    // Conditions: The radio buttons must hold in div with attribute data-prg-type='radioTab'
    // Act: Depend on which radio button index is cheched The equvalant div with attribute [data-prg-modal='radioTab'] display and the others will hide
    $(document).on("click", "div[data-prg-type='radioTab']  input[type='radio']", function () {
        var selectedRadioIndex = $(this).parent().parent().find("input[type = 'radio']").index(this) + 3;
        $(this).parent().parent().parent().children("div[data-prg-modal='radioTab']").hide();
        var tabPath = "div[data-prg-modal='radioTab']:nth-child(" + selectedRadioIndex + ")";
        $(this).parent().parent().parent().find(tabPath).css("display", "block");
    });

    
});
var globalAjaxModel = { url: "", data: "", target: "", funcName: "", loader: "" };

//گرفتن تاییدیه قبل از عمل
function showDialog(message, url, data, target, funcName, loader) {

    globalAjaxModel["url"] = url;
    globalAjaxModel["data"] = data;
    globalAjaxModel["target"] = target;
    globalAjaxModel["funcName"] = funcName;
    globalAjaxModel["loader"] = loader;

    var messageBody =
   "<div id=\"messageContainer\">" +
   " <div style=\"position:fixed; width:100%; height:100%; right:0; left:0; top:0; bottom:0; background-color:black; opacity:0.5;" +
   " z-index:5000;\"></div>" +
   " <div style=\"position: fixed; width: 100%; height: 100%; right: 0; left: 0; top: 0; bottom: 0; z-index: 5005; \">" +
   "<div class=\"modal-content\" style=\"position:relative; width:50%; height:30%; right:auto; left:auto; top:20px;" +
   "background-color:white; margin:auto; z-index:5010; \">" +
   "<div class=\"modal-header ng-scope\"><h3>سوال</h3></div>" +
   "<div class=\"modal-body ng-scope\">" +
   "<span class=\"list-unstyled ng-scope\" ng-repeat=\"item in items\">" +
   message +
   "</span>" +
   "</div><div class=\"modal-footer ng-scope\">" +
   "<button class=\"btn btn-primary btnDialogOk\">بلی</button>" +
   " <button class=\"btn btn-warning btnDialogCancel\">خیر</button>" +
   "</div>" +
   " </div>" +
   "</div>" +
   "</div>";

    $("body").prepend(messageBody);
    $(".modal .fade .in").slideDown();


}

//باز و بسته کردن پنل ها - پنل های ساده و چک باکس دارها
$(document).on("click", "div.panel.expendable .panel-heading", function () {
    var hiddenPanel = $(this).next("div");
    hiddenPanel.toggle("fast", function () {
        if ($(this).parent().find("input[type='checkbox']").length > 0)
            if (hiddenPanel.css("display") == "block") {
                $(this).parent().find(".panel-heading").find("input[type='checkbox']").prop("checked", true);
            }
            else {
                $(this).parent().find(".panel-heading").find("input[type='checkbox']").prop("checked", false);
            }
    });
    return false;
});

//**********************
////باز و بسته کردن پنل ها - پنل های ساده و چک باکس دارهابرای تاریخچه
//$(document).on("click", "div.panel.historyDiv .panel-heading", function () {
//    var hiddenPanel = $(this).next("div");
//    hiddenPanel.toggle("fast", function () {
//        if (hiddenPanel.css("display") == "block") {
//            var docId = $(this).parents(".panel-body").find("div[data-prg-type='Card']").attr("data-prg-docid");
//            var docFlowId = $(this).parents(".panel-body").find("div[data-prg-type='Card']").attr("data-prg-docflowid");
//            var NodeId = $(this).parents(".panel-body").find("div[data-prg-type='Card']").attr("data-prg-currentnodeid");
//            var HistoryId = null;
//            var target = $(this).parent().find(".panel-body");
//            var URL = "/DashboardDetail/HistorySummary?docId=" + docId + "&docFlowId=" + docFlowId + "&HistoryId=" + HistoryId + "&NodeId=" + NodeId;
//            DoAjax(URL, target, "");
//        }
//    });
//    return false;
//});

//باز و بسته کردن دایو های بعدی با کلیک بروی دکمه در پنل
$(".panel.panel-default .panel-body .btn.btn-primary").click(function () {
    //alert($(this).attr("data-prg-typed"));
    var hiddenPanel = $(this).nextAll("div").first();
    hiddenPanel.toggle("fast", function () {
        hiddenPanel.stop().css({ "height": "auto" }).addClass("in");
    });
});

//باز و بسته کردن تب ها با کلیک بروی هدر آن
$(document).on("click", "ul[data-prg-type='tab'] li", function () {
    var selectedLiIndex = $(this).index();
    $(this).parent().find("li").removeClass("active");
    $(this).addClass("active");

    $(this).parent().next("div").find('div[data-prg-type="tabdiv"]').removeClass("active");
    $(this).parent().next("div").find('div[data-prg-type="tabdiv"]').eq(selectedLiIndex).addClass("active");
});

///ایجاد بالن پیغام
var balloonCount = 0;
$(document).on("click", ".btn-gap", function () {
    ShowBalloon($(this), "پیغام");
    //var isMessagebleButton = true;
    //if ($("toast-container").length < 1)
    //    $("body").append("<div id='toast-container' class='toast-bottom-left' aria-live='polite' role='alert'></div>");
    //if ($(this).hasClass("btn-info"))
    //    $("#toast-container").prepend("<div id = 'balloon" + (++balloonCount).toString() + "' class='toast toast-info' style='opacity: 0.75;'>" +
    //        "<button class='toast-close-button' role='button'>×</button> " +
    //        "<div class='toast-message'>" +
    //        "Heads up! This alert needs your attention, but it's not super important." +
    //        "</div></div>");
    //else if ($(this).hasClass("btn-success"))
    //    $("#toast-container").prepend("<div id = 'balloon" + (++balloonCount).toString() + "'  class='toast toast-success' style='opacity: 0.75;'>" +
    //    "<button class='toast-close-button' role='button'>×</button>" +
    //    "<div class='toast-message'>" +
    //    "Well done! You successfully read this important alert message." +
    //    "</div></div>");
    //else if ($(this).hasClass("btn-warning"))
    //    $("#toast-container").prepend("<div id = 'balloon" + (++balloonCount).toString() + "'  class='toast toast-warning' style='opacity: 0.75;'>" +
    //        "<button class='toast-close-button' role='button'>×</button>" +
    //        "<div class='toast-message'>" +
    //        "Warning! Best check yo self, you're not looking too good." +
    //        "</div></div>");
    //else if ($(this).hasClass("btn-danger"))
    //    $("#toast-container").prepend("<div id = 'balloon" + (++balloonCount).toString() + "'  class='toast toast-error' style='opacity: 0.75;'>" +
    //        "<button class='toast-close-button' role='button'>×</button>" +
    //        "<div class='toast-message'>" +
    //        "Oh snap! Change a few things up and try submitting again." +
    //        "</div></div>");
    //else
    //    isMessagebleButton = false;

    //if (isMessagebleButton) {
    //    $("#balloon" + balloonCount).delay(15000).fadeOut(500);
    //    if (balloonCount > 200) balloonCount = 0;
    //}
});

//تغییر رنگ باکس بالایی با کلیک روی ریدو ها
$('label[data-prg-boxcolor]').on("click", function () {
    var color = $(this).attr("data-prg-boxcolor");
    $('.panel .bg-info').css('background-color', color);
});

//close warning box
$(document).on("click", 'span[data-prg-type="CloseAlert"]', (function () {
    $(this).parents('div[data-prg-type="Alert"]').remove();
}));


var balloonCount = 0;
function ShowBalloon(type, message) {
    var isMessagebleButton = true;
    var className = type;
    if (type instanceof jQuery)
        className = type.attr("class");
    var balloonClass = "";
    if ($("toast-container").length < 1)
        $("body").append("<div id='toast-container' class='toast-bottom-left' aria-live='polite' role='alert'></div>");

    if (className.toLowerCase().indexOf("btn-info") != -1 || className.toLowerCase().indexOf("infoballoon") != -1)
        balloonClass = "toast-info";
    else if (className.toLowerCase().indexOf("btn-success") != -1 || className.toLowerCase().indexOf("successballoon") != -1)
        balloonClass = "toast-success";
    else if (className.toLowerCase().indexOf("btn-warning") != -1 || className.toLowerCase().indexOf("warningballoon") != -1)
        balloonClass = "toast-warning";
    else if (className.toLowerCase().indexOf("btn-error") != -1 || className.toLowerCase().indexOf("errorballoon") != -1)
        balloonClass = "toast-error";
    else
        isMessagebleButton = false;

    if (isMessagebleButton)
        $("#toast-container").prepend("<div id = 'balloon" + (++balloonCount).toString() + "' class='toast " + balloonClass + "' style='opacity: 0.85; height:70px;'>" +
            "<button class='toast-close-button' role='button'>×</button> " +
            "<div class='toast-message'>" + message +
            "</div></div>");


    if (isMessagebleButton) {
        $("#balloon" + balloonCount).delay(15000).fadeOut(500, function() {
            $("#balloon" + balloonCount).remove();
        });
        if (balloonCount > 200) balloonCount = 0;
    }
}



//تنظیم صفحه برای حالت های کوچکتر مرورگر
function SetSmallWindowConfig() {
    if ($(window).width() < 760) {
        $("body").removeClass("nav-min");
        $("#nav-container").css({ "display": "none" });
    }
    else
        $("#nav-container").css({ "display": "block" });
}

//توابع پاپ آپ popover
$(function () {
    $(document).on("click", "a[data-prg-popover='click']", (function () {
        Loadpopover(this, "", "");
    }));
});
var flagpopoverclick = false;
function Loadpopover(element, Title, body) {
    $('div.Loadpopover').remove();
    var $div = $("<div>", { class: "Loadpopover" });
    $(element).append($div);
    var DatePickerContainerDiv = "<div id='LoadpopoverDiv' class='popoverControl'>" +
                                         "<div class='arrow'></div><div class='popover-title'>" + Title + "</div><div class='popover-content'>" + body + "</div></div>";

    $(element).parent().find("div[class='Loadpopover']").append(DatePickerContainerDiv);
    flagpopoverclick = true;
}


function popoverClose() {
    if (flagpopoverclick != true) {
        $('div.Loadpopover').remove();
    }
    flagpopoverclick = false;
}

$(document).click(function () {
    popoverClose();
});

////توابع پاپ آپ tooltip
var flagpopoverclickmouse = false;
function Loadpopovermouse(element, Title, body) {
    $('div.Loadpopovermouse').remove();
    var $div = $("<div>", { class: "Loadpopovermouse" });
    $(element).append($div);
    var DatePickerContainerDiv = DatePickerContainerDiv = "<div class='tooltip bottom'><div class='tooltip-arrow'></div><div class='tooltip-inner'>" + body + "</div></div>";

    $(element).parent().find("div[class='Loadpopovermouse']").append(DatePickerContainerDiv);
    flagpopoverclickmouse = true;
}

