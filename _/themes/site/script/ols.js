/*!
 * jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */
function submitQuestion(e, t) {
    var n;
    return window.event ? n = window.event.keyCode : n = e.which, n == 13 ? ($(t).parent().find(".askQuestion").trigger("click"), e.preventDefault(), !1) : !0
}
function initLoginBox() {
    cachedLoginForm = $(".hiddenLogin").html(), $.fancybox(cachedLoginForm, {
        autoDimensions: !1,
        width: 670,
        height: "auto",
        transitionIn: "fade",
        transitionOut: "fade",
        padding: 0,
        onClosed: function () {
            $.cookie("enterComment", 0, {
                path: "/"
            }), $(".hiddenLogin").html(cachedLoginForm)
        }
    }), $(".hiddenLogin").html(" "), $("a.popup").click(function (e) {
        return popupCenter($(this).attr("href"), $(this).attr("data-width"), $(this).attr("data-height"), "authPopup"), e.stopPropagation(), !1
    }), $(".loginTab").click(function () {
        $(".loginTab").removeClass("active"), $(this).addClass("active"), layer = $(this).attr("data-layer"), $(".signupContent").hide(), $("." + layer).show()
    }), $("#shortSignUpButton").click(function () {
        return validateSignAjax(this), !1
    }), $("#shortLoginButton").click(function () {
        return validateLoginAjax(this), !1
    }), $("#user_password", ".signup").keypress(function (e) {
        var t;
        if (window.event) t = window.event.keyCode;
        else {
            if (!e) return !0;
            t = e.which
        }
        return t == 13 ? (validateSignAjax($("#shortSignUpButton")), !1) : !0
    }), $("#user_password", ".login").keypress(function (e) {
        var t;
        if (window.event) t = window.event.keyCode;
        else {
            if (!e) return !0;
            t = e.which
        }
        return t == 13 ? (validateLoginAjax($("#shortLoginButton")), !1) : !0
    })
}
function initCommentBindings() {
    $(".reportComment").unbind("click").click(function (e) {
        id = $(this).parent().find(".comment_id").val(), reportLink = $(this);
        if ($(this).attr("data-user") == "false") {
            initLoginBox();
            return
        }
        $.ajax({
            type: "POST",
            url: "/comments/" + id,
            data: "_method=DELETE&id=" + id,
            success: function (e) {
                e == 1 ? $(reportLink).parent().parent().parent().remove() : $(reportLink).html("reported")
            }
        })
    }), $(".replyComment").unbind("click").click(function (e) {
        id = $(this).parent().find(".comment_id").val(), reportLink = $(this);
        if ($(this).attr("data-user") == "false") {
            initLoginBox();
            return
        }
        $(".replyComment").show(), $(".hiddenReply").hide(), $(this).hide(), $(this).parent().parent().parent().find(".hiddenReply").show(), savedField = $(this).parent().parent().parent().find(".replyField"), setTimeout("$(savedField).focus();", 100)
    }), $(".noReturns").unbind("keypress").bind("keypress",
        function (e) {
            return submitQuestion(e, this)
        }), $(".resizeThread").autoResize({
        onResize: function () {
            $(this).css({
                opacity: .8
            })
        },
        animateCallback: function () {
            $(this).css({
                opacity: 1
            })
        },
        animateDuration: 300,
        extraSpace: 1
    }), $(".askQuestion").unbind("click").click(function (e) {
        parent_id = 0, $(this).attr("data-parent-id") && (parent_id = $(this).attr("data-parent-id")), parent_id == 0 ? commentBody = $(this).parent().find(".commentBody") : commentBody = $("#reply" + parent_id);
        if ($(commentBody).val() == "") {
            $(commentBody).focus();
            return
        }
        if ($(this).html() == '<img src="/assets/ajax-loader_f.gif">') return;
        if ($(this).attr("data-user") == "false") {
            $.cookie("enterComment", $(commentBody).val(), {
                path: "/"
            }), initLoginBox();
            return
        }
        oldLabel = $(this).html(), $(this).html('<img src="/assets/ajax-loader_f.gif">'), button = $(this), $.ajax({
            type: "POST",
            url: "/comments",
            data: "question=" + $(commentBody).val() + "&id=" + $(commentBody).attr("data-id") + "&type=" + $(commentBody).attr("data-type") + "&parent_comment_id=" + parent_id + "&thread=" + $(commentBody).attr("data-thread"),
            success: function (e) {
                $(button).html(oldLabel), $("#renderComments").html(e), $(".commentBody").val(""), initCommentBindings(), $(".resizeThread").autoResize({
                    onResize: function () {
                        $(this).css({
                            opacity: .8
                        })
                    },
                    animateCallback: function () {
                        $(this).css({
                            opacity: 1
                        })
                    },
                    animateDuration: 300,
                    extraSpace: 1
                })
            }
        })
    })
}
function calcFee() {
    cents = $("#funding_target").val().replace("$", ""), cents = cents.replace(",", ""), cents = parseInt(cents) * 100, cents < 25e5 ? $("#CA_fee").html("$25") : cents < 1e7 ? $("#CA_fee").html("$35") : $("#CA_fee").html("$50");
    if (cents) {
        var e = cents / 100 * .001;
        $("#TX_fee").html("$" + e)
    }
}
function switchTabSubmit(e, t, n) {
    setStepSelected(n), hideHelper(), activeTab = n, $(".tabArrow").css("background-position", "0px"), arrow = activeTab - 1, $("#arrow" + arrow).css("background-position", "-20px"), $(".tab").removeClass("active"), $(e).addClass("active"), $(".tablayers").hide(), $(t).show(), $(".tabIcon").removeClass("active"), $("#tabIcon" + n).addClass("active"), $(".sideBox").hide(), $("#sideBox" + n).show(), n == 7 ? ($(".wizardContent").hide(), $("#renderPreview").show(), $(".rightBox").hide(), $(".previewCard").hide()) : n == 6 ? ($(".wizardContent").show(), $("#renderPreview").hide(), $(".rightBox").hide(), $(".previewCard").show()) : ($(".wizardContent").show(), $("#renderPreview").hide(), $(".rightBox").show(), $(".previewCard").hide()), $.cookie("tabIndex", n, {
        path: "/"
    })
}
function changeArrow(e) {
    if (activeTab != e) {
        if (e == 0) {
            $(".tabArrow").css("background-position", "0px"), arrow = activeTab - 1, $("#arrow" + arrow).css("background-position", "-20px"), $(".tab" + activeTab).addClass("active");
            return
        }
        e == 1 && (activeTab == 2 ? $("#arrow1").css("background-position", "-40px") : $("#arrow1").css("background-position", "0px")), e == 2 && (activeTab == 1 ? $("#arrow1").css("background-position", "-40px") : activeTab == 3 ? ($("#arrow2").css("background-position", "-40px"), $("#arrow1").css("background-position", "-20px")) : $("#arrow1").css("background-position", "-20px")), e == 3 && (activeTab == 2 ? $("#arrow2").css("background-position", "-40px") : activeTab == 4 ? ($("#arrow3").css("background-position", "-40px"), $("#arrow2").css("background-position", "-20px")) : $("#arrow2").css("background-position", "-20px")), e == 4 && (activeTab == 3 ? $("#arrow3").css("background-position", "-40px") : $("#arrow3").css("background-position", "-20px"))
    }
}
function doGetCaretPosition(e) {
    var t = 0;
    if (document.selection) {
        e.focus();
        var n = document.selection.createRange();
        n.moveStart("character", - e.value.length), t = n.text.length
    } else if (e.selectionStart || e.selectionStart == "0") return t = e.selectionStart, t
}
function setCaretPosition(e, t) {
    if (e.setSelectionRange) e.focus(), e.setSelectionRange(t, t);
    else if (e.createTextRange) {
        var n = e.createTextRange();
        n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", t), n.select()
    }
}
function disableEnterKey(e) {
    var t;
    return window.event ? t = window.event.keyCode : t = e.which, t == 13 ? ($("input").blur(), e.preventDefault(), !1) : !0
}
function showTooltip(e, t, n) {
    clearTimeout(helperTimeout), $(".formHelper").show(), $(".formHelper").animate({
        opacity: 1
    }, 100);
    var r = $(".topFormBox").offset().top,
        i = $(e).offset().top,
        s = parseInt($(".topFormBox").css("padding")),
        o = i - r - s - 5;
    opacity = $(".formHelper").css("opacity"), opacity == 1 ? ($(".formHelper").animate({
        marginTop: o
    }, 100), sTitle = t, sSubtitle = n, setTimeout("$('.helperTitle').html(sTitle)", 100), setTimeout("$('.helperSubtitle').html(sSubtitle)", 100)) : ($(".formHelper").css("margin-top", o), $(".helperTitle").html(t), $(".helperSubtitle").html(n))
}
function setCharCounter(e, t, n) {
    $(e).attr("id") && charCounter(e, t, n), e.keypress(function (e) {
        return disableEnterKey(e)
    }).keyup(function () {
            $(t).show(), charCounter(e, t, n)
        }).keydown(function () {
            $(t).show(), charCounter(e, t, n)
        })
}
function charCounter(e, t, n) {
    length = $(e).val().length, left = n - length, left > -1 && $(t).html(charWithPadding(left)), left == n && $(t).html(charWithPadding(n))
}
function wysiwyg_charCounter(e, t) {
    html_content = e.wysiwyg("getContent"), parent = e.parent(), counter = $(".wysiwyg_counter", parent);
    var n = document.createElement("DIV");
    n.innerHTML = html_content, content = n.textContent || n.innerText, content = $.trim(content), content = content.replace(/<[^>]*>|\s/g, ""), length = content.length, left = t - length, left > -1 && $(counter).html(charWithPadding(left)), left == t && $(counter).html(charWithPadding(t))
}
function charWithPadding(e) {
    return e < 100 ? "&nbsp;" + e : "" + e
}
function charCounterNic(e, t, n) {
    length = $(e).text().length, left = n - length - 1;
    if (left > -1) $(t).html(left);
    else if (event.keyCode != 8) return !1;
    left == n && $(t).html(n)
}
function hideHelper() {
    $(".formHelper").animate({
        opacity: 0
    }, 300), setTimeout("$('.formHelper').hide()", 500)
}
function calcRequiredQuestions() {
    questions_filled_out = parseInt($("#planSortable").children().length), questions_left = Company.num_questions - questions_filled_out + 1, questions_left < 1 ? $(".addBox").hide() : (questions_left == 1 ? plural = "" : plural = "s", $(".addBox").html("Please choose " + questions_left + " more question" + plural + "."), $(".addBox").show(), $("#moreQuestions").show(), $("#addQuestionButton").hide()), $("#num_questions_left").val(questions_left)
}
function fieldWithCounter(e, t, n) {
    $(e).attr("id") && charCounter(e, t, n), e.keypress(function (e) {
        return disableEnterKey(e)
    }).keyup(function () {
            charCounter(e, t, n)
        }).keydown(function () {
            charCounter(e, t, n)
        }).blur(function () {
            e.val() == "" ? e.css("color", "#777") : e.css("color", "#222")
        }).focus(function () {})
}
function attachPhotoActions() {
    $(".companyPhoto .deleteIcon").click(function () {
        var e = $($(this).parent()).find(".photo_id").val();
        return $.ajax({
            type: "POST",
            url: "/companies/" + Company.id + "/photos/" + e,
            data: "_method=DELETE&photo_id=" + e,
            success: function (e) {}
        }), $(this).parents(".companyPhoto").remove(), enableOrDisableSortable($("#photoSortable")), !1
    }), $(".companyPhoto .fileUploader").change(function () {
        var e = $(this).parents("li").find("img.photo");
        $("#photo_required").val(1), handleImageUpload(this, e, 100, 67)
    })
}
function attachEditables() {
    $(".qanda, .qanda .editHighlight").click(function () {
        startEditable($(this).parents(".qanda"))
    }), $(".question .deleteIcon").click(function () {
        var e = confirm("Are you sure you would like to delete this question?");
        if (e == 1) {
            var t = $($(this).parent().parent()).find(".question_name").val();
            t = $.trim(t), html = '<div class="question"><div class="question_name_text">' + t + '</div><div class="addIcon"></div></div>', $("#moreQuestions").prepend(html), $(".addIcon", $("#moreQuestions").children(":first-child")).click(function () {
                var e = $(this);
                return $(this).parent().stop().animate({
                        height: 0
                    }, 100,
                    function () {
                        var t = e.parents(".question").find(".question_name_text").text();
                        t = $.trim(t), addNewQuestion(t), $(this).remove()
                    }), !1
            }), $.ajax({
                type: "POST",
                url: "/questions/" + Company.id,
                data: "_method=DELETE&name=" + escape(t) + "&company_id=" + Company.id,
                success: function (e) {}
            }), $(this).parent().parent().remove(), enableOrDisableSortable($("#planSortable")), calcRequiredQuestions()
        }
        return !1
    })
}
function wysiwyg(e) {
    return e.wysiwyg({
        rmUnusedControls: !0,
        plugins: {
            rmFormat: {
                rmMsWordMarkup: !0
            }
        },
        controls: {
            bold: {
                visible: !0
            },
            italic: {
                visible: !0
            },
            underline: {
                visible: !0
            },
            justifyLeft: {
                visible: !0
            },
            justifyCenter: {
                visible: !0
            },
            insertOrderedList: {
                visible: !0
            },
            insertUnorderedList: {
                visible: !0
            },
            createLink: {
                visible: !0
            },
            html: {
                visible: !0
            }
        },
        initialContent: "",
        initialMinHeight: 60,
        autoSave: !1,
        autoGrow: !0,
        maxLength: 500,
        events: {
            keyup: function (t) {
                wysiwyg_charCounter(e, 500)
            },
            keydown: function (t) {
                wysiwyg_charCounter(e, 500)
            },
            click: function (t) {
                wysiwyg_charCounter(e, 500)
            }
        }
    })
}
function startEditable(e) {
    $("#planSortable").sortable("disable");
    var t = e.find(".editable"),
        n = e.find(".bodytext");
    t.show(), n.hide();
    var r = t.find("textarea.wysiwyg:visible"),
        i = wysiwyg(r);
    $("iframe", t).focus(), wysiwyg_charCounter(i, 500);
    var s = e.find(".penIcon"),
        o = e.find(".editable .deleteIcon");
    return s.unbind("click"), s.css("background-position", "-50px"), e.find(".editHighlight").unbind("click"), e.find(".cancelEdit").unbind("click").click(function () {
        return r.wysiwyg("destroy"), stopEditable(e), !1
    }), e.find(".saveEdit").click(function () {
        return r.wysiwyg("save"), name = $(".question_name", $(this).parent().parent()).val(), name = $.trim(name), val = r.wysiwyg("getContent"), val = val.replace("&nbsp;", " "), val && (stopEditable(e), displaySavingInProgress(), $.ajax({
            type: "POST",
            url: "/questions/" + Company.id,
            data: "_method=PUT&name=" + escape(name) + "&company_id=" + Company.id + "&value=" + escape(val),
            success: function (e) {
                displaySaved()
            }
        })), !1
    }), e.find(".saveUserEdit").click(function () {
        return r.wysiwyg("save"), name = $(".question_name", $(this).parent().parent()).val(), name = $.trim(name), val = r.wysiwyg("getContent"), val && (stopEditable(e), displaySavingInProgress(), $.ajax({
            type: "POST",
            url: "/users/" + User.id,
            data: "_method=PUT&user[" + escape(name) + "]=" + escape(val) + "&user_id=" + User.id,
            success: function (e) {
                displaySaved()
            }
        })), !1
    }), !1
}
function handleInvitations() {}
function handleImageUpload(e, t, n, r) {
    isImage = limitToImage($(e).val());
    if (!isImage) return !1;
    if (e.files && e.files[0]) {
        var i = new FileReader;
        i.onload = function (i) {
            $(t).show(), parent = $(t).parent(), $(".imageSpinner", parent).show();
            var s = $(e).parent().index() + 1,
                o = $(e).remove().appendTo("body");
            $(e).upload("/companies/" + Company.id + "/photos.json?sort_order=" + s,
                function (e) {
                    var s = JSON.parse(e);
                    t.attr("src", i.target.result).width(n).height(r).show(), $(".imageSpinner", parent).hide(), o.remove()
                })
        }, i.readAsDataURL(e.files[0])
    }
}
function limitToImage(e) {
    var t = e.split(".").pop().toLowerCase();
    return $.inArray(t, ["gif", "png", "jpg", "jpeg"]) == -1 ? (alert("Only images ending in .gif, .png, .jpg, and .jpeg are allowed."), !1) : !0
}
function handleQuestionUpload(e, t, n) {
    isImage = limitToImage($(e).val());
    if (!isImage) return !1;
    if (e.files && e.files[0]) {
        var r = new FileReader;
        r.onload = function (r) {
            img = new Image, img.onload = function () {
                upload_height = this.height, upload_width = this.width
            }, img.src = r.target.result, $(".questionSpinner", t).show(), $(".photoInstruction", t).hide(), $(e).upload("/ajax_question_photo?name=" + n + "&company_id=" + Company.id,
                function (e) {
                    ratio = upload_height / upload_width, target_height = 570 * ratio, image = $(".previewQuestionImage", $(t).parent()), $(t).hide(), image.attr("src", r.target.result).width(570).height(target_height).show(), $(".questionSpinner", t).hide(), $(".photoInstruction", t).show(), $(".deleteQuestionPhoto", $(t).parent()).show(), enableOrDisableSortable($("#planSortable"));
                    var n = JSON.parse(e)
                })
        }, r.readAsDataURL(e.files[0])
    }
}
function handleLogoUpload(e, t, n, r) {
    isImage = limitToImage($(e).val());
    if (!isImage) return !1;
    if (e.files && e.files[0]) {
        var i = new FileReader;
        $("#logoSpinner").show(), i.onload = function (i) {
            $(e).upload("/ajax_upload_logo?company_id=" + Company.id,
                function (e) {
                    t.attr("src", i.target.result).width(n).height(r).show(), $("#logoSpinner").hide();
                    var s = JSON.parse(e);
                    upfile.remove()
                })
        }, i.readAsDataURL(e.files[0])
    }
}
function handlePerkUpload(e, t, n, r) {
    isImage = limitToImage($(e).val());
    if (!isImage) return !1;
    if (e.files && e.files[0]) {
        var i = new FileReader;
        $("#perkSpinner").show(), i.onload = function (i) {
            $(e).upload("/perk_upload?id=" + fundraise_id,
                function (e) {
                    t.attr("src", i.target.result).width(n).height(r).show(), $("#perkSpinner").hide();
                    var s = JSON.parse(e);
                    upfile.remove()
                })
        }, i.readAsDataURL(e.files[0])
    }
}
function enableOrDisableSortable(e) {
    children = parseInt($(e).children().length), children < 2 ? ($(".position", e).hide(), $(e).sortable("disable")) : ($(".position", e).show(), $(e).sortable("enable"))
}
function stripSpaces(e) {
    usernamechanged || (value = $(e).val(), value = value.toLowerCase(), value = value.replace(/[^a-z0-9-]*/g, ""), value.length < 20 && ($("#company_url").val(value), $("#company_url").css("color", "#333"), $("#company_url").trigger("keydown")))
}
function saveDate(e) {
    displaySavingInProgress(), $.ajax({
        type: "POST",
        url: "/fundraises/" + fundraise_id,
        data: "_method=PUT&" + $(e).attr("name") + "=" + escape($(e).val()) + "&company_id=" + Company.id,
        success: function (e) {
            displaySaved()
        }
    })
}
function changePrivacyText(e) {
    e == "true" ? $(".privacyText").html("Visible to the Wefunder community. Indexed by search engines.") : $(".privacyText").html("Only viewable by users that you share your Wefunder URL with.")
}
function addNewQuestion(e) {
    var t = parseInt($("ul#planSortable li:last").attr("data-id") || 0) + 1,
        n = JST["templates/companies/question"]({
            name: e,
            id: t
        });
    $("#planSortable").append(n), $(".attach_file").unbind("click").click(function (e) {
        return alert("Not done yet! Hopefully soon."), !1
    }), $("html,body").animate({
        scrollTop: $("#moreQuestions").offset().top - 340
    }, "slow"), attachEditables(), $("#planSortable li:last .editHighlight").click(), enableOrDisableSortable($("#planSortable")), $("#custom_question").val(""), attachQuestionPhotoBindings(), $.ajax({
        type: "POST",
        url: "/questions",
        data: "name=" + escape($.trim(e)) + "&company_id=" + Company.id,
        success: function (e) {}
    })
}
function validateCompanySubmission(e) {
    if ($(e).html() == '<img style="margin-top:-5px; margin-left:-10px;" src="/assets/ajax-loader_f.gif">') return !1;
    $(e).html('<img style="margin-top:-5px; margin-left:-10px;" src="/assets/ajax-loader_f.gif">');
    var t = $(e).closest("form");
    t.find(".help-inline").remove(), t.find(".error").removeClass("error"), $(".tab").removeClass("submit_error"), $("#url_error").html("");
    var n = 0,
        r = 0,
        i = 0,
        s = 0,
        o = 0,
        u = 0,
        a = 0;
    $("#company_name").val().length < 1 && (displayError(e, $("#company_name"), "Company name required."), n = 1, r = 1), $("#company_tagline").val().length < 1 && (displayError(e, $("#company_tagline"), "Tagline required."), n = 1, r = 1), $("#company_description").val().length < 1 && (displayError(e, $("#company_description"), "About Company required."), n = 1, r = 1), $("#company_city").val().length < 1 && (displayError(e, $("#address_error"), "City required."), n = 1, r = 1), $("#company_state").val().length < 1 && (displayError(e, $("#address_error"), "State required."), n = 1, r = 1), $("#company_facebook_url").val() != "" && (value = $("#company_facebook_url").val().indexOf("facebook.com/", 0), value < 1 && (displayError(e, $("#company_facebook_url"), "Must be a Facebook URL"), n = 1, r = 1)), $("#company_owner_id").val() == 0 && (displayError(e, $("#company_owner_id"), "You need to log in or create an account!"), n = 1, i = 1), $("#photo_required").val() == 0 && (displayError(e, $("#photo_required_error"), "Please upload at least one photo."), n = 1, s = 1), $("#num_questions_left").val() > 0 && (displayError(e, $("#question_error"), "Please answer at least 6 questions."), n = 1, o = 1), $("#company_url").val().length == 0 ? (displayError(e, $("#no_valid_url"), "Username required."), n = 1, a = 1) : $("#no_valid_url").val() == 1 && (displayError(e, $("#no_valid_url"), "Username already taken."), n = 1, a = 1), $("#company_terms").is(":checked") || (displayError(e, $("#terms_of_use"), "Please read and agree to the Terms of Service."), n = 1, a = 1);
    if (n == 1) return displayMessageBar("Whoops!  You need to fix a few things.", "error"), u == 1 && ($("#tab5").addClass("submit_error"), switchTabSubmit($("#tab5"), $("#tabLayer5"), 5)), a == 1 && ($("#tab6").addClass("submit_error"), switchTabSubmit($("#tab6"), $("#tabLayer6"), 6)), o == 1 && ($("#tab4").addClass("submit_error"), switchTabSubmit($("#tab4"), $("#tabLayer4"), 4)), s == 1 && ($("#tab3").addClass("submit_error"), switchTabSubmit($("#tab3"), $("#tabLayer3"), 3)), i == 1 && ($("#tab2").addClass("submit_error"), switchTabSubmit($("#tab2"), $("#tabLayer2"), 2)), r == 1 && ($("#tab1").addClass("submit_error"), switchTabSubmit($("#tab1"), $("#tabLayer1"), 1)), !1;
    $("#company_owner_published").val(1), $.cookie("tabIndex", 1, {
        path: "/"
    }), $("form").submit()
}
function check_company_url(e, t) {
    $.ajax({
        type: "POST",
        url: "/check_unique_url",
        data: "url=" + $(e).val() + "&company_id=" + t,
        success: function (e) {
            $("#no_valid_url").val(e), e == 1 ? $("#url_error").html("Username already taken.") : $("#url_error").html("")
        }
    })
}
function deleteCompany(e, t) {
    var n = confirm("Are you sure you would like to delete this company?");
    n == 1 && ($.ajax({
        type: "POST",
        url: "/companies/" + t,
        data: "_method=PUT&company[deleted]=1&company_id=" + t,
        success: function (e) {}
    }), $(e).parent().parent().remove())
}
function loadPreviewCard() {
    $.ajax({
        type: "POST",
        url: "/companies/" + Company.id + "/render_card",
        data: "",
        success: function (e) {
            $(".previewCard").html(e), $(".photoSelect").bind("mouseover",
                function (e) {
                    id = parseInt($(this).attr("id").replace("link_", "")), $("#arrow" + id).removeClass("arrowIcon").addClass("arrowIcon_H")
                }), $(".photoSelect").bind("mouseout",
                function (e) {
                    id = parseInt($(this).attr("id").replace("link_", "")), $("#arrow" + id).removeClass("arrowIcon_H").removeClass("arrowIcon_A").addClass("arrowIcon")
                }), $(".photoSelect").bind("click",
                function (e) {
                    id = parseInt($(this).attr("id").replace("link_", "")), $("#arrow" + id).removeClass("arrowIcon_A").hide(), $("#blackSpinner" + id).show()
                }), $(".photoSelect").bind("mousedown",
                function (e) {
                    id = parseInt($(this).attr("id").replace("link_", "")), $("#arrow" + id).removeClass("arrowIcon_H").addClass("arrowIcon_A")
                })
        }
    })
}
function bindPhotoActions() {
    $(".photoCaptionInput").unbind("focus").focus(function (e) {
        $(this).attr("data-changed", "false")
    }), $(".photoCaptionInput").unbind("change").change(function (e) {
        $(this).attr("data-changed", "true")
    }), $(".photoCaptionInput").unbind("blur").blur(function (e) {
        var t = $(this).parent().parent().index() + 1;
        $(this).attr("data-changed") == "true" && (displaySavingInProgress(), $.ajax({
            type: "POST",
            url: "/companies/" + Company.id + "/photos/" + $(this).attr("data-photo-id"),
            data: "_method=PUT&photo[caption]=" + escape($(this).val()) + "&photo_id=" + $(this).attr("data-photo-id") + "&photo[sort_order]=" + t,
            success: function (e) {
                displaySaved()
            }
        }))
    })
}
function bindTeamActions() {
    $(".titleInput").unbind("change").change(function (e) {
        displaySavingInProgress(), role_id = $(this).attr("data-role-id"), $.ajax({
            type: "POST",
            url: "/company_roles/" + role_id,
            data: "_method=PUT&role[title]=" + escape($(this).val()),
            success: function (e) {
                displaySaved()
            }
        })
    }), $(".teamAdmin").unbind("change").change(function (e) {
        displaySavingInProgress(), role_id = $(this).attr("data-role-id"), $.ajax({
            type: "POST",
            url: "/company_roles/" + role_id,
            data: "_method=PUT&role[admin]=" + escape($(this).val()),
            success: function (e) {
                displaySaved()
            }
        })
    })
}
function resetClock() {
    $(".clockContainer").show(), $(".clockIcon").html(""), $(".status").html("Last saved:"), $(".minutes_ago").html("Just now"), $(".save", ".clockContainer").show(), minute = 0, clearTimeout(clockCounter), clockCounter = setTimeout("addMinute()", 6e4)
}
function addMinute() {
    minute += 1, minute == 1 ? plural = "" : plural = "s", $(".minutes_ago").html(minute + " minute" + plural + " ago"), clockCounter = setTimeout("addMinute()", 6e4)
}
function submitQuestionOnEnter(e) {
    var t;
    if (window.event) t = window.event.keyCode;
    else {
        if (!e) return !0;
        t = e.which
    }
    return t == 13 ? ($(".addCustomQuestion").trigger("click"), e.preventDefault(), !1) : !0
}
function stopEditable(e) {
    var t = e.find(".bodytext"),
        n = e.find(".editable"),
        r = n.find("textarea.wysiwyg"),
        i = e.find(".penIcon"),
        s = e.find(".editable .deleteIcon");
    n.hide(), t.show();
    var o = document.createElement("DIV");
    return o.innerHTML = r.val(), content = o.textContent || o.innerText, content.trim() == "" ? t.html(Company.default_question) : (text = r.val(), text = text.replace("&nbsp;", " "), t.html(text)), i.css("background-position", "0px"), i.show().unbind("click").click(function () {
        return startEditable(e), !1
    }), e.find(".editHighlight").unbind("click").click(function () {
        return startEditable(e), !1
    }), $("#planSortable").sortable("enable"), calcRequiredQuestions(), !1
}
function verifyVimeo(e) {
    if ($(e).html() == '<img src="/assets/ajax-loader_f.gif">') return;
    $(e).html('<img src="/assets/ajax-loader_f.gif">'), vimeoButton = e, $(".vimeoError").hide(), text = $(".vimeoID", $(e).parent().parent()).val();
    var t = text.indexOf("http://vimeo.com/");
    if (t == -1) {
        t = text.indexOf("https://vimeo.com/");
        if (t == -1) {
            $(".vimeoError").show().html("Not a valid vimeo URL.  Ex:  http://vimeo.com/867547"), $(".vimeoID", $(e).parent().parent()).focus(), $(vimeoButton).html("Save");
            return
        }
        vimeo_id = text.substring(18, text.length)
    } else vimeo_id = text.substring(17, text.length);
    $.ajax({
        type: "GET",
        url: "http://vimeo.com/api/v2/video/" + vimeo_id + ".json",
        data: "",
        success: function (e) {
            var t = $(e.responseText).text();
            t = $.trim(t), t = t.replace(/[\n]/g, "\\n");
            var t = jQuery.parseJSON(t);
            if (t == null) {
                $(".vimeoError").show().html("No video has been uploaded to video at this URL."), $(vimeoButton).html("Save");
                return
            }
            vimeo_id = t[0].id;
            if (vimeo_id == undefined) {
                $(".vimeoError").show().html("No video has been uploaded to video at this URL."), $(vimeoButton).html("Save");
                return
            }
            thumbnail_large = t[0].thumbnail_large, $.ajax({
                type: "POST",
                url: Company.path + "/" + Company.id,
                data: "_method=PUT&company[vimeo_id]=" + vimeo_id + "&company[video_thumb]=" + thumbnail_large + "&company_id=" + Company.id,
                success: function (e) {
                    $(vimeoButton).html("Save"), $.fancybox.close(), displaySavingInProgress(), setTimeout("displaySaved();", 500), $(".videoContainer").html('<iframe id="VideoPlayer" style="float:left; margin-right:25px" src="http://player.vimeo.com/video/' + vimeo_id + '?title=0&amp;byline=0&amp;portrait=0&api=1&player_id=VideoPlayer" width="272" height="182" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>')
                }
            })
        }
    })
}
function resetPreview() {
    $.ajax({
        type: "GET",
        url: "/companies/" + Company.id,
        data: "preview_company=1",
        success: function (e) {
            $("#renderPreview").html(e), resizeCompanyName()
        }
    })
}
function setStepSelected(e) {
    $(".tab").removeClass("hover"), $(".rightArrowSelected").removeClass("rightArrowSelected"), $(".leftArrowSelected").removeClass("leftArrowSelected"), e == 0 && $("#step0").addClass("rightArrowSelected"), e == 1 && ($("#step0").addClass("leftArrowSelected"), $("#step1").addClass("rightArrowSelected")), e == 2 && ($("#step1").addClass("leftArrowSelected"), $("#step2").addClass("rightArrowSelected")), e == 3 && ($("#step2").addClass("leftArrowSelected"), $("#step3").addClass("rightArrowSelected")), e == 4 && ($("#step3").addClass("leftArrowSelected"), $("#step4").addClass("rightArrowSelected")), e == 5 && ($("#step4").addClass("leftArrowSelected"), $("#step5").addClass("rightArrowSelected")), e == 6 && $("#step5").addClass("leftArrowSelected")
}
function setStepHover(e) {
    $(".rightArrowHover").removeClass("rightArrowHover"), $(".leftArrowHover").removeClass("leftArrowHover"), $(".rightArrowHoverSelected").removeClass("rightArrowHoverSelected"), $(".leftArrowHoverSelected").removeClass("leftArrowHoverSelected"), e == 0 && (activeTab == 1 ? $("#step0").addClass("rightArrowHoverSelected") : $("#step0").addClass("rightArrowHover")), e == 1 && (activeTab == 2 ? $("#step1").addClass("rightArrowHoverSelected") : $("#step1").addClass("rightArrowHover"), activeTab == 0 ? $("#step0").addClass("leftArrowHoverSelected") : $("#step0").addClass("leftArrowHover")), e == 2 && (activeTab == 3 ? $("#step2").addClass("rightArrowHoverSelected") : $("#step2").addClass("rightArrowHover"), activeTab == 1 ? $("#step1").addClass("leftArrowHoverSelected") : $("#step1").addClass("leftArrowHover")), e == 3 && (activeTab == 4 ? $("#step3").addClass("rightArrowHoverSelected") : $("#step3").addClass("rightArrowHover"), activeTab == 2 ? $("#step2").addClass("leftArrowHoverSelected") : $("#step2").addClass("leftArrowHover")), e == 4 && (activeTab == 5 ? $("#step4").addClass("rightArrowHoverSelected") : $("#step4").addClass("rightArrowHover"), activeTab == 3 ? $("#step3").addClass("leftArrowHoverSelected") : $("#step3").addClass("leftArrowHover")), e == 5 && (activeTab == 6 ? $("#step5").addClass("rightArrowHoverSelected") : $("#step5").addClass("rightArrowHover"), activeTab == 4 ? $("#step4").addClass("leftArrowHoverSelected") : $("#step4").addClass("leftArrowHover")), e == 6 && (activeTab == 5 ? $("#step5").addClass("leftArrowHoverSelected") : $("#step5").addClass("leftArrowHover"))
}
function attachQuestionPhotoBindings() {
    $(".attachPhotoToSummary, .previewQuestionImage").unbind("click").click(function () {
        $(".attachPhotoToSummary_Input", $(this).parent()).trigger("click")
    }), $(".attachPhotoToSummary_Input").unbind("change").change(function () {
        var e = $($(this).parent()).find(".question_name").val();
        e = $.trim(e);
        var t = $(".attachPhotoToSummary", $(this).parent());
        handleQuestionUpload(this, t, $.trim(e))
    }), $(".deleteQuestionPhoto").unbind("click").click(function () {
        $(this).hide();
        var e = $($(this).parent()).find(".question_name").val();
        e = $.trim(e), $(".previewQuestionImage", $(this).parent()).css("height", "0px").css("width", "0px"), $(".attachPhotoToSummary", $(this).parent()).show(), $.ajax({
            type: "POST",
            url: "/questions/" + Company.id,
            data: "_method=PUT&name=" + escape(e) + "&company_id=" + Company.id + "&deleteImage=true",
            success: function (e) {
                displaySaved()
            }
        })
    })
}
function resizeCompanyName() {
    var e, t = 360,
        n = $("#hidden-resizer");
    e = parseInt(n.css("font-size"), 10);
    while (n.width() > t) e = parseInt(n.css("font-size"), 10), n.css("font-size", e - 4);
    e < 42 && (e = 42, $(".name").css("white-space", "normal"));
    var r = e + 8;
    $(".name").css("font-size", e).html(n.html()), $(".name").css("line-height", r + "px")
}
function showNotePreview() {
    $.fancybox($("#previewNote").html(), {
        autoDimensions: !1,
        width: 1e3,
        height: "auto",
        transitionIn: "fade",
        transitionOut: "fade",
        padding: 0,
        onClosed: function () {},
        onComplete: function () {
            $(".noteContainer").html('<iframe src="http://docs.google.com/viewer?url=http%3A%2F%2Fwefunder.com%2Fnote.pdf&embedded=true" width="600" height="500" style="border: none;"></iframe>')
        }
    })
}
function learnMoreSlide(e) {
    $(e).remove(), $(".extraInfo").show(), $(".extraInfo").animate({
        height: slideHeight + "px"
    }, {
        duration: 900,
        easing: "easeOutBounce"
    }), goToByScroll("extraInfo")
}
function bindHoverIntent() {
    $(".picHoverArea").hoverIntent(triggerPopVar, untriggerPopVar), $(".avatarBorder").hoverIntent(triggerPop, untriggerPop)
}
function triggerPop() {
    onPic = 1, movePopUp($(this))
}
function untriggerPop() {}
function triggerPopVar() {
    onPic = 1
}
function untriggerPopVar() {
    onPic = 0, setTimeout("hidePop()", 1)
}
function hidePop() {
    onPic == 0 && ($pop = $(".popUp"), $pop.stop().animate({
            opacity: 0
        }, 200,
        function () {
            var e = $(".content", $pop);
            e.html(""), $pop.hide()
        }))
}
function movePopUp(e) {
    var t = $(".popUp"),
        n = $(".content", t);
    if (signupPage) var r = $(e).position().top + 8,
        i = $(e).position().left + 7;
    else var r = $(e).offset().top,
        i = $(e).offset().left;
    var s = (t.width() + 10 - $(e).width()) / 2 * -1,
        o = (t.height() + 30) * -1;
    t.css("margin-left", s), t.css("margin-top", o), t.is(":visible") ? (t.stop().animate({
            left: i,
            top: r
        }, 200,
        function () {}), n.stop().animate({
            opacity: .2
        }, 100,
        function () {
            n.html($(e).attr("title")), n.stop().animate({
                    opacity: 1
                }, 100,
                function () {})
        })) : (n.html($(e).attr("title")), t.css("top", r), t.css("left", i), t.show(), t.animate({
        opacity: 1
    }, 100))
}
function dollarsToCents(e) {
    dollarInt = parseInt(e.replace(/\,/g, "")), $("#user_petition_pledge_amount_in_cents").val(dollarInt * 100), $.cookie("petition_pledge_amount_in_cents", dollarInt * 100, {
        path: "/"
    })
}
function showProfileEditor() {
    $.fancybox($("#profilePop").html(), popupOptions()), $("img#cropbox").attr("data-original-width") && showImageEditor()
}
function showImageEditor() {
    if ($("#fancybox-content").is(":visible")) {
        var e = $("#fancybox-content img#cropbox");
        e.load(function () {
            var t = this.width,
                n = this.height,
                r = n;
            t < n && (r = t);
            var i = parseInt($("img#cropbox").attr("data-original-width")) / t || 1,
                s = parseInt($("img#cropbox").attr("data-original-height")) / n || 1;
            $("#fancybox-content .file_preview").replaceWith($('<div class="file_preview"><img src="' + e.attr("src") + '" style="position: relative;" /><div>').css({
                "float": "left",
                position: "relative",
                overflow: "hidden",
                width: "44px",
                height: "44px"
            })), e.imgAreaSelect({
                handles: !0,
                parent: "#fancybox-content",
                aspectRatio: "1:1",
                x1: t / 2 - r / 2,
                x2: t / 2 + r / 2,
                y1: n / 2 - r / 2,
                y2: n / 2 + r / 2,
                minHeight: 150,
                minWidth: 150,
                onInit: function (e, t) {
                    previewImage(e, t)
                },
                onSelectEnd: function (e, t) {
                    var n = $("#fancybox-content form"),
                        r = Math.round(t.x1 * i),
                        o = Math.round(t.y1 * s),
                        u = Math.round(t.x2 * i),
                        a = Math.round(t.y2 * s);
                    n.find("#user_crop_x").val(r), n.find("#user_crop_w").val(u - r), n.find("#user_crop_y").val(o), n.find("#user_crop_h").val(a - o)
                },
                onSelectChange: function (e, t) {
                    previewImage(e, t)
                }
            })
        }), $("#profilePop").unbind("click")
    } else setTimeout(showImageEditor, 50)
}
function previewImage(e, t) {
    var n = 44 / (t.width || 1),
        r = 44 / (t.height || 1);
    $("#fancybox-content .file_preview img").css({
        width: Math.round(n * e.width) + "px",
        height: Math.round(r * e.height) + "px",
        marginLeft: "-" + Math.round(n * t.x1) + "px",
        marginTop: "-" + Math.round(r * t.y1) + "px"
    })
}
function changeAmount() {
    $.fancybox($("#amountPop").html(), popupOptions())
}
function popupOptions() {
    return {
        autoDimensions: !1,
        width: 820,
        height: "auto",
        transitionIn: "fade",
        transitionOut: "fade",
        padding: 0
    }
}
function chooseAmount(e, t) {
    $(".investAmountButton").html($(e).html()), $("#title_pledged").html($(e).html()), $("#user_petition_pledge_amount_in_cents").val(t * 100), $.cookie("petition_pledge_amount_in_cents", t * 100, {
        path: "/"
    }), t > 5e3 ? $("#header_subtext").html("if Congress made it legal for <em>everyone</em>.") : $("#header_subtext").html("if Congress made it legal."), $.fancybox.close(), username = $("#user_username").val(), username && $.ajax({
        type: "POST",
        url: "/users/" + username,
        data: "_method=PUT&user[petition_pledge_amount_in_cents]=" + t * 100,
        success: function (e) {}
    })
}
function Countdown(e) {
    function t(e, t) {
        t.length < 2 && (t = "0" + t), window.document.getElementById(e).innerHTML = t
    }
    function n() {
        now = new Date, diff = new Date(this.then - now), seconds_left = Math.floor(diff.valueOf() / 1e3), seconds = Math.floor(seconds_left / 1) % 60, minutes = Math.floor(seconds_left / 60) % 60, hours = Math.floor(seconds_left / 3600) % 24, days = Math.floor(seconds_left / 86400) % 86400, t("days_timer", days), t("hours_timer", hours), t("minutes_timer", minutes), days != 1 && $("#days").html("DAYS"), days < 10 && $("#days_timer").html("0" + days), minutes < 10 && $("#minutes_timer").html("0" + minutes), hours < 10 && $("#hours_timer").html("0" + hours), $("#hours_timer").css("opacity", 1), $("#minutes_timer").css("opacity", 1), $("#days_timer").css("opacity", 1), n.timer = setTimeout(n, 1e3)
    }
    function r() {
        this.timer = setTimeout(n, 1e3)
    }
    this.then = e, r(e)
}
function Sanitize() {
    var e, t, n;
    n = arguments[0] || {}, this.config = {}, this.config.elements = n.elements ? n.elements : [], this.config.attributes = n.attributes ? n.attributes : {}, this.config.attributes[Sanitize.ALL] = this.config.attributes[Sanitize.ALL] ? this.
        config.attributes[Sanitize.ALL] : [], this.config.allow_comments = n.allow_comments ? n.allow_comments : !1, this.allowed_elements = {}, this.config.protocols = n.protocols ? n.protocols : {}, this.config.add_attributes = n.add_attributes ? n.add_attributes : {}, this.dom = n.dom ? n.dom : document;
    for (e = 0; e < this.config.elements.length; e++) this.allowed_elements[this.config.elements[e]] = !0;
    this.config.remove_element_contents = {}, this.config.remove_all_contents = !1;
    if (n.remove_contents) if (n.remove_contents instanceof Array) for (e = 0; e < n.remove_contents.length; e++) this.config.remove_element_contents[n.remove_contents[e]] = !0;
    else this.config.remove_all_contents = !0;
    this.transformers = n.transformers ? n.transformers : []
}
function displayPasswordReset() {
    forgotPasswordForm = '<div class="reset_password_div" style="padding:20px"><h1 style="font-size:24px">Reset Your Password</h1><p style="margin-top:0px">Please pick a new password.</p><div class="password_reset_error" style="color:red; display:none; margin-top:10px; margin-bottom:3px; font-weight:bold">Your password must be greater than 6 characters.</div><input class="reset_email" type="password" ><button style="margin-left:7px; margin-top:2px;" class="green onWhite med resetPasswordButton">Submit</button></div><div style="clear:both; height:15px"></div>', $.fancybox(forgotPasswordForm, {
        autoDimensions: !1,
        width: 500,
        height: "auto",
        transitionIn: "fade",
        transitionOut: "fade",
        padding: 0,
        onClosed: function () {}
    }), setTimeout("$('.reset_email').focus()", 500), $(".resetPasswordButton").click(function () {
        $(".password_reset_error").hide(), password = $(".reset_email").val();
        if (password == "") return $(".reset_email").focus(), !1;
        if (password.length < 6) return $(".password_reset_error").show(), !1;
        $(this).html('<img src="/assets/ajax-loader_f.gif">'), $.ajax({
            type: "POST",
            url: "/reset_password?password=" + password,
            success: function (e) {
                error = parseInt(e), error == 1 ? $(".password_reset_error").show() : $(".reset_password_div").html('<h1 style="font-size:24px">Your Password Has Been Saved</h1><p>Great!  You are all set now.</p>')
            }
        })
    })
}
function handleAvatarUpload(e, t, n, r) {
    isImage = limitToImage($(e).val());
    if (!isImage) return !1;
    if (e.files && e.files[0]) {
        var i = new FileReader;
        i.onload = function (i) {
            $("#avatarSpinner").show(), $(".photoLabel").hide();
            var s = $(e);
            User && $(e).parent().remove().appendTo("body").css("visibility", "hidden"), $(e).upload(User.root_url + "ajax_avatar?user_id=" + User.id,
                function (e) {
                    $("#avatarSpinner").hide(), $(".photoLabel").addClass("photoLabel2").removeClass("photoLabel").html("Replace Photo"), t.attr("src", i.target.result).width(n).height(r).show();
                    var o = JSON.parse(e);
                    s.remove()
                })
        }, i.readAsDataURL(e.files[0])
    }
}
function goToByScroll(e) {
    $("html,body").animate({
        scrollTop: $("#" + e).offset().top - 10
    }, "slow")
}
function scrollFB() {
    $("html,body").animate({
        scrollTop: $("#team_scroll").offset().top
    }, "fast")
}
function animateFlashBarUp() {
    $("#flashMessage").animate({
        height: "0"
    }, 300), setTimeout("removeFlashBar()", 290)
}
function removeFlashBar() {
    $("#flashMessage").hide()
}
function displayMessageBar(e, t) {
    var n = $(window).scrollTop();
    n < 45 && (n = 45), $("#StatusBar").removeClass("error").removeClass("warning").removeClass("success").removeClass("info").addClass(t), $("#StatusBar").html(e), $("#StatusBar").css("top", n + "px"), $("#StatusBar").css("font-size", "24px"), $("#StatusBar").css("line-height", "50px"), $("#StatusBar").show(), $("#StatusBar").animate({
        height: "54"
    }, 300), e != "error" && setTimeout("animateStatusBarUp()", 3e3)
}
function displaySavingInProgress() {
    var e = $(window).scrollTop();
    e < 45 && (e = 45), $("#StatusBar").removeClass("error").removeClass("warning").removeClass("success").addClass("info"), $("#StatusBar").html("Saving"), $("#StatusBar").css("top", e + "px"), $("#StatusBar").show(), $("#StatusBar").animate({
        height: "22"
    }, 300)
}
function displaySaved() {
    $("#StatusBar").removeClass("error").removeClass("warning").addClass("success").removeClass("info"), $("#StatusBar").html("Saved"), setTimeout("animateStatusBarUp()", 1e3)
}
function animateStatusBarUp() {
    $("#StatusBar").animate({
        height: "0"
    }, 300), setTimeout("removeStatusBar()", 290)
}
function removeStatusBar() {
    $("#StatusBar").hide()
}
function popupCenter(e, t, n, r) {
    var i = screen.width / 2 - t / 2,
        s = screen.height / 2 - n / 2;
    return window.open(e, r, "menubar=no,toolbar=no,status=no,width=" + t + ",height=" + n + ",toolbar=no,left=" + i + ",top=" + s)
}
function toggleUserMenu(e) {
    setWidth = $(".loginlink").width() + 14, setWidth < 88 && (setWidth = 88), left = $(".loginlink").position().left, $("#LogoutMenu").toggle(), $("#LogoutMenu").width(setWidth), $("#LogoutMenu").is(":visible") ? ($("#UserLinkMenu > .UserLink").css("color", "#21547E"), $("#UserLinkMenu > .UserLink").css("text-shadow", "#FFFFFF 0 1px 0"), $("#UserLinkMenu").css("background", "#fff"), $("#UserLinkMenu").css("border", "1px solid #7094AC")) : ($("#UserLinkMenu > .UserLink").css("color", "white"), $("#UserLinkMenu > .UserLink").css("text-shadow", "#000 0 1px 0"), $("#UserLinkMenu").css("background", "none"), $("#UserLinkMenu").css("border", "1px solid transparent"))
}
function userMenuMouseOver() {
    $("#LogoutMenu").is(":visible") ? $(".loginLink").css("border", "1px solid transparent") : ($(".userMenuLink").css("color", "#21547E"), $(".userMenuLink").css("text-shadow", "#FFFFFF 0 1px 0"), $("#UserMenuArrow").addClass("upArrowIcon").removeClass("WhiteTriangle"), $(".userMenuLink").css("background", "#fff"), $(".loginLink").css("border", "1px solid #6F9CB9"))
}
function userMenuMouseOut() {
    $("#LogoutMenu").is(":visible") || ($("#UserMenuArrow").addClass("WhiteTriangle").removeClass("upArrowIcon"), $(".userMenuLink").css("color", "white"), $(".userMenuLink").css("text-shadow", "#000 0 1px 0"), $(".userMenuLink").css("background", "none"))
}
function closeUserMenu() {
    $("#LogoutMenu").is(":visible") && ($("#LogoutMenu").hide(), $("#UserMenuArrow").addClass("WhiteTriangle").removeClass("upArrowIcon"), $(".userMenuLink").css("color", "white"), $(".userMenuLink").css("text-shadow", "#000 0 1px 0"), $(".userMenuLink").css("background", "none"), $(".userMenuLink").css("border", "1px solid transparent"))
}
function iconWhite(e) {
    $("#" + e).removeClass(e).addClass(e + "_h")
}
function iconBlue(e) {
    $("#" + e).removeClass(e + "_h").addClass(e)
}
function setAnimate(e) {
    $(e).css("text-align", "center"), $(e).html('<img src="/assets/ajax-loader_f.gif">')
}
function validateEmail(e) {
    var t = e.lastIndexOf("@"),
        n = e.lastIndexOf(".");
    return t < n && t > 0 && e.indexOf("@@") == -1 && n > 2 && e.length - n > 2
}
function validateSign(e) {
    var t = $(e).closest("form");
    t.find(".help-inline").remove(), t.find(".error").removeClass("error");
    if ($(e).html() == '<img src="/assets/ajax-loader_f.gif">') return;
    $(e).html('<img  src="/assets/ajax-loader_f.gif">');
    if ($("#user_full_name").val().length < 2) {
        displayError(e, $("#user_full_name"), "Full name required.");
        return
    }
    words = $.trim($("#user_full_name").val()), wordCount = words.split(" ").length;
    if (wordCount < 2) {
        displayError(e, $("#user_full_name"), "First and last name required.");
        return
    }
    if ($("#user_email").val().length < 2) {
        displayError(e, $("#user_email"), "Email required.");
        return
    }
    if ($("#user_password").val() && $("#user_password").val().length < 6) return displayError(e, $("#user_password"), "Password needs at least 6 characters."), !1;
    var n = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!validateEmail($("#user_email").val())) {
        displayError(e, $("#user_email"), "Valid email required.");
        return
    }
    $("#manualSign").submit()
}
function validateSignAjax(e) {
    var t = $(".signup");
    t.find(".help-inline").remove(), t.find(".error").removeClass("error");
    if ($(e).html() == '<img src="/assets/ajax-loader_f.gif">') return !1;
    $(e).html('<img src="/assets/ajax-loader_f.gif">');
    if ($("#user_full_name", t).val().length < 2) return displayError(e, $("#user_full_name", t), "Full name required."), !1;
    words = $.trim($("#user_full_name", t).val()), wordCount = words.split(" ").length;
    if (wordCount < 2) return displayError(e, $("#user_full_name", t), "First and last name required."), !1;
    if ($("#user_email", t).val().length < 2) return displayError(e, $("#user_email", t), "Email required."), !1;
    var n = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return validateEmail($("#user_email", t).val()) ? $("#user_password", t).val().length < 6 ? (displayError(e, $("#user_password", t), "Password needs at least 6 characters."), !1) : ($.ajax({
        type: "POST",
        url: "/users",
        data: "user[full_name]=" + escape($("#user_full_name", t).val()) + "&user[email]=" + $("#user_email", t).val() + "&user[password]=" + $("#user_password", t).val(),
        success: function (e) {
            window.location.reload()
        }
    }), !1) : (displayError(e, $("#user_email", t), "Valid email required."), !1)
}
function validateLoginAjax(e) {
    var t = $(".login");
    t.find(".help-inline").remove(), t.find(".error").removeClass("error");
    if ($(e).html() == '<img src="/assets/ajax-loader_f.gif">') return !1;
    $(e).html('<img src="/assets/ajax-loader_f.gif">');
    if ($("#user_email", t).val().length < 2) return displayError(e, $("#user_email", t), "Email required."), !1;
    var n = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return validateEmail($("#user_email", t).val()) ? $("#user_password", t).val().length < 6 ? (displayError(e, $("#user_password", t), "Password needs at least 6 characters."), !1) : ($.ajax({
        type: "POST",
        url: "/sessions",
        data: "user[email]=" + $("#user_email", t).val() + "&user[password]=" + $("#user_password", t).val(),
        success: function (e) {
            window.location.reload()
        }
    }), !1) : (displayError(e, $("#user_email", t), "Valid email required."), !1)
}
function displayError(e, t, n) {
    var r = $("<span/>").addClass("help-inline").text(n);
    $(t).after(r), $(t).parent().addClass("error"), $(t).focus(), $(e).attr("data-default") ? $(e).html($(e).attr("data-default")) : $(e).html("Sign Up")
}
function showNavTooltip(e, t, n) {
    e == "tooltip" ? ($(".navTip").css("color", "#8D8D8D"), $(".navTip").css("background", "#F8F8F8"), $(".navTip").css("border", "1px solid #fff"), $(".pointUp", ".navTip").css("background") != "url(/assets/whiteUp.png)" && $(".pointUp", ".navTip").css("background", "url(/assets/whiteUp.png)"), left = $(t).position().left) : ($(".navTip").css("color", "#837443"), $(".navTip").css("background", "#F0EBC1"), $(".navTip").css("border", "1px solid #FFFACD"), $(".pointUp", ".navTip").css("background") != "url(/assets/yellowUp.png)" && $(".pointUp", ".navTip").css("background", "url(/assets/yellowUp.png)"), left = $(t).position().left), $(".text", ".navTip").html(n), width = $(".navTip").width(), center = left - (width - 14) / 2, $(".navTip").is(":visible") ? $(".navTip").css("left", center) : ($(".navTip").show(), $(".navTip").css("left", center))
}
function hideNavTooltip() {
    $(".navTip").animate({
        opacity: 0
    }, 200), setTimeout("$('.navTip').hide().css('opacity',1)", 220)
}
function submitOnEnter(e) {
    var t;
    if (window.event) t = window.event.keyCode;
    else {
        if (!e) return !0;
        t = e.which
    }
    return t == 13 ? (validateSign($(".submit")), !1) : !0
}
function openHiddenBar(e) {
    $(".topHiddenBar").show(), e ? $(".topHiddenBar").animate({
        height: "66px"
    }, 300) : $(".topHiddenBar").css("height", "66px"), $(".sunlight").hide(), $("#logo_cover").show(), $(".plusIcon").hide(), setTimeout("$('.hiddenSocial').animate({opacity: 1},100);", 1e3)
}
function closeHiddenBar() {
    $(".topHiddenBar").animate({
        height: "0"
    }, 300), setTimeout("$('#logo_cover').hide(); ", 200), setTimeout("$('.hiddenSocial').hide(); ", 100), setTimeout("$('.sunlight').show(); $('.plusIcon').show();", 300)
}
function upHiddenBar() {
    $(".topHiddenBar").animate({
        height: "66px"
    }, 300), $(".sunlight").hide(), setTimeout("$('#logo_cover').show(); ", 100), $(".plusIcon").hide(), setTimeout("$('.hiddenSocial').show(); ", 200)
}
function homeLearnMoreSlide(e) {
    $("#contentContainer").css("margin-top", parseInt($("#contentContainer").css("margin-top")) + 480), $(e).remove(), $(".homeLearnMore").show(), $(".homeLearnMore").animate({
        height: "480px"
    }, {
        duration: 500,
        easing: "easeOutBounce"
    }), goToByScroll("homeLearnMore")
}(function (e, t) {
    function u(e) {
        var t = o[e] = {},
            n, r;
        e = e.split(/\s+/);
        for (n = 0, r = e.length; n < r; n++) t[e[n]] = !0;
        return t
    }
    function c(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(l, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : s.isNumeric(r) ? +r : f.test(r) ? s.parseJSON(r) : r
                } catch (o) {}
                s.data(e, n, r)
            } else r = t
        }
        return r
    }
    function h(e) {
        for (var t in e) {
            if (t === "data" && s.isEmptyObject(e[t])) continue;
            if (t !== "toJSON") return !1
        }
        return !0
    }
    function p(e, t, n) {
        var r = t + "defer",
            i = t + "queue",
            o = t + "mark",
            u = s._data(e, r);
        u && (n === "queue" || !s._data(e, i)) && (n === "mark" || !s._data(e, o)) && setTimeout(function () {
            !s._data(e, i) && !s._data(e, o) && (s.removeData(e, r, !0), u.fire())
        }, 0)
    }
    function H() {
        return !1
    }
    function B() {
        return !0
    }
    function W(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }
    function X(e, t, n) {
        t = t || 0;
        if (s.isFunction(t)) return s.grep(e,
            function (e, r) {
                var i = !! t.call(e, r, e);
                return i === n
            });
        if (t.nodeType) return s.grep(e,
            function (e, r) {
                return e === t === n
            });
        if (typeof t == "string") {
            var r = s.grep(e,
                function (e) {
                    return e.nodeType === 1
                });
            if (q.test(t)) return s.filter(t, r, !n);
            t = s.filter(t, r)
        }
        return s.grep(e,
            function (e, r) {
                return s.inArray(e, t) >= 0 === n
            })
    }
    function V(e) {
        var t = $.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement) while (t.length) n.createElement(t.pop());
        return n
    }
    function at(e, t) {
        return s.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function ft(e, t) {
        if (t.nodeType !== 1 || !s.hasData(e)) return;
        var n, r, i, o = s._data(e),
            u = s._data(t, o),
            a = o.events;
        if (a) {
            delete u.handle, u.events = {};
            for (n in a) for (r = 0, i = a[n].length; r < i; r++) s.event.add(t, n, a[n][r])
        }
        u.data && (u.data = s.extend({}, u.data))
    }
    function lt(e, t) {
        var n;
        if (t.nodeType !== 1) return;
        t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? t.outerHTML = e.outerHTML : n !== "input" || e.type !== "checkbox" && e.type !== "radio" ? n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text) : (e.checked && (t.defaultChecked = t.checked = e.checked), t.value !== e.value && (t.value = e.value)), t.removeAttribute(s.expando), t.removeAttribute("_submit_attached"), t.removeAttribute("_change_attached")
    }
    function ct(e) {
        return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
    }
    function ht(e) {
        if (e.type === "checkbox" || e.type === "radio") e.defaultChecked = e.checked
    }
    function pt(e) {
        var t = (e.nodeName || "").toLowerCase();
        t === "input" ? ht(e) : t !== "script" && typeof e.getElementsByTagName != "undefined" && s.grep(e.getElementsByTagName("input"), ht)
    }
    function dt(e) {
        var t = n.createElement("div");
        return ut.appendChild(t), t.innerHTML = e.outerHTML, t.firstChild
    }
    function kt(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight,
            i = t === "width" ? 1 : 0,
            o = 4;
        if (r > 0) {
            if (n !== "border") for (; i < o; i += 2) n || (r -= parseFloat(s.css(e, "padding" + xt[i])) || 0), n === "margin" ? r += parseFloat(s.css(e, n + xt[i])) || 0 : r -= parseFloat(s.css(e, "border" + xt[i] + "Width")) || 0;
            return r + "px"
        }
        r = Tt(e, t);
        if (r < 0 || r == null) r = e.style[t];
        if (bt.test(r)) return r;
        r = parseFloat(r) || 0;
        if (n) for (; i < o; i += 2) r += parseFloat(s.css(e, "padding" + xt[i])) || 0, n !== "padding" && (r += parseFloat(s.css(e, "border" + xt[i] + "Width")) || 0), n === "margin" && (r += parseFloat(s.css(e, n + xt[i])) || 0);
        return r + "px"
    }
    function Qt(e) {
        return function (t, n) {
            typeof t != "string" && (n = t, t = "*");
            if (s.isFunction(n)) {
                var r = t.toLowerCase().split(qt),
                    i = 0,
                    o = r.length,
                    u, a, f;
                for (; i < o; i++) u = r[i], f = /^\+/.test(u), f && (u = u.substr(1) || "*"), a = e[u] = e[u] || [], a[f ? "unshift" : "push"](n)
            }
        }
    }
    function Gt(e, n, r, i, s, o) {
        s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
        var u = e[s],
            a = 0,
            f = u ? u.length : 0,
            l = e === Wt,
            c;
        for (; a < f && (l || !c); a++) c = u[a](n, r, i), typeof c == "string" && (!l || o[c] ? c = t : (n.dataTypes.unshift(c), c = Gt(e, n, r, i, c, o)));
        return (l || !c) && !o["*"] && (c = Gt(e, n, r, i, "*", o)), c
    }
    function Yt(e, n) {
        var r, i, o = s.ajaxSettings.flatOptions || {};
        for (r in n) n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
        i && s.extend(!0, e, i)
    }
    function Zt(e, t, n, r) {
        if (s.isArray(t)) s.each(t,
            function (t, i) {
                n || At.test(e) ? r(e, i) : Zt(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
            });
        else if (!n && s.type(t) === "object") for (var i in t) Zt(e + "[" + i + "]", t[i], n, r);
        else r(e, t)
    }
    function en(e, n, r) {
        var i = e.contents,
            s = e.dataTypes,
            o = e.responseFields,
            u, a, f, l;
        for (a in o) a in r && (n[o[a]] = r[a]);
        while (s[0] === "*") s.shift(), u === t && (u = e.mimeType || n.getResponseHeader("content-type"));
        if (u) for (a in i) if (i[a] && i[a].test(u)) {
            s.unshift(a);
            break
        }
        if (s[0] in r) f = s[0];
        else {
            for (a in r) {
                if (!s[0] || e.converters[a + " " + s[0]]) {
                    f = a;
                    break
                }
                l || (l = a)
            }
            f = f || l
        }
        if (f) return f !== s[0] && s.unshift(f), r[f]
    }
    function tn(e, n) {
        e.dataFilter && (n = e.dataFilter(n, e.dataType));
        var r = e.dataTypes,
            i = {},
            o, u, a = r.length,
            f, l = r[0],
            c, h, p, d, v;
        for (o = 1; o < a; o++) {
            if (o === 1) for (u in e.converters) typeof u == "string" && (i[u.toLowerCase()] = e.converters[u]);
            c = l, l = r[o];
            if (l === "*") l = c;
            else if (c !== "*" && c !== l) {
                h = c + " " + l, p = i[h] || i["* " + l];
                if (!p) {
                    v = t;
                    for (d in i) {
                        f = d.split(" ");
                        if (f[0] === c || f[0] === "*") {
                            v = i[f[1] + " " + l];
                            if (v) {
                                d = i[d], d === !0 ? p = v : v === !0 && (p = d);
                                break
                            }
                        }
                    }
                }!p && !v && s.error("No conversion from " + h.replace(" ", " to ")), p !== !0 && (n = p ? p(n) : v(d(n)))
            }
        }
        return n
    }
    function an() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }
    function fn() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }
    function yn() {
        return setTimeout(bn, 0), gn = s.now()
    }
    function bn() {
        gn = t
    }
    function wn(e, t) {
        var n = {};
        return s.each(mn.concat.apply([], mn.slice(0, t)),
            function () {
                n[this] = e
            }), n
    }
    function En(e) {
        if (!ln[e]) {
            var t = n.body,
                r = s("<" + e + ">").appendTo(t),
                i = r.css("display");
            r.remove();
            if (i === "none" || i === "") {
                cn || (cn = n.createElement("iframe"), cn.frameBorder = cn.width = cn.height = 0), t.appendChild(cn);
                if (!hn || !cn.createElement) hn = (cn.contentWindow || cn.contentDocument).document, hn.write((s.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), hn.close();
                r = hn.createElement(e), hn.body.appendChild(r), i = s.css(r, "display"), t.removeChild(cn)
            }
            ln[e] = i
        }
        return ln[e]
    }
    function Nn(e) {
        return s.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }
    var n = e.document,
        r = e.navigator,
        i = e.location,
        s = function () {
            function H() {
                if (i.isReady) return;
                try {
                    n.documentElement.doScroll("left")
                } catch (e) {
                    setTimeout(H, 1);
                    return
                }
                i.ready()
            }
            var i = function (e, t) {
                return new i.fn.init(e, t, u)
            },
                s = e.jQuery,
                o = e.$,
                u, a = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                f = /\S/,
                l = /^\s+/,
                c = /\s+$/,
                h = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                p = /^[\],:{}\s]*$/,
                d = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                v = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                m = /(?:^|:|,)(?:\s*\[)+/g,
                g = /(webkit)[ \/]([\w.]+)/,
                y = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                b = /(msie) ([\w.]+)/,
                w = /(mozilla)(?:.*? rv:([\w.]+))?/,
                E = /-([a-z]|[0-9])/ig,
                S = /^-ms-/,
                x = function (e, t) {
                    return (t + "").toUpperCase()
                },
                T = r.userAgent,
                N, C, k, L = Object.prototype.toString,
                A = Object.prototype.hasOwnProperty,
                O = Array.prototype.push,
                M = Array.prototype.slice,
                _ = String.prototype.trim,
                D = Array.prototype.indexOf,
                P = {};
            return i.fn = i.prototype = {
                constructor: i,
                init: function (e, r, s) {
                    var o, u, f, l;
                    if (!e) return this;
                    if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
                    if (e === "body" && !r && n.body) return this.context = n, this[0] = n.body, this.selector = e, this.length = 1, this;
                    if (typeof e == "string") {
                        e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? o = [null, e, null] : o = a.exec(e);
                        if (o && (o[1] || !r)) {
                            if (o[1]) return r = r instanceof i ? r[0] : r, l = r ? r.ownerDocument || r : n, f = h.exec(e), f ? i.isPlainObject(r) ? (e = [n.createElement(f[1])], i.fn.attr.call(e, r, !0)) : e = [l.createElement(f[1])] : (f = i.buildFragment([o[1]], [l]), e = (f.cacheable ? i.clone(f.fragment) : f.fragment).childNodes), i.merge(this, e);
                            u = n.getElementById(o[2]);
                            if (u && u.parentNode) {
                                if (u.id !== o[2]) return s.find(e);
                                this.length = 1, this[0] = u
                            }
                            return this.context = n, this.selector = e, this
                        }
                        return !r || r.jquery ? (r || s).find(e) : this.constructor(r).find(e)
                    }
                    return i.isFunction(e) ? s.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), i.makeArray(e, this))
                },
                selector: "",
                jquery: "1.7.2",
                length: 0,
                size: function () {
                    return this.length
                },
                toArray: function () {
                    return M.call(this, 0)
                },
                get: function (e) {
                    return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
                },
                pushStack: function (e, t, n) {
                    var r = this.constructor();
                    return i.isArray(e) ? O.apply(r, e) : i.merge(r, e), r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
                },
                each: function (e, t) {
                    return i.each(this, e, t)
                },
                ready: function (e) {
                    return i.bindReady(), C.add(e), this
                },
                eq: function (e) {
                    return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1)
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                slice: function () {
                    return this.pushStack(M.apply(this, arguments), "slice", M.call(arguments).join(","))
                },
                map: function (e) {
                    return this.pushStack(i.map(this,
                        function (t, n) {
                            return e.call(t, n, t)
                        }))
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: O,
                sort: [].sort,
                splice: [].splice
            }, i.fn.init.prototype = i.fn, i.extend = i.fn.extend = function () {
                var e, n, r, s, o, u, a = arguments[0] || {},
                    f = 1,
                    l = arguments.length,
                    c = !1;
                typeof a == "boolean" && (c = a, a = arguments[1] || {}, f = 2), typeof a != "object" && !i.isFunction(a) && (a = {}), l === f && (a = this, --f);
                for (; f < l; f++) if ((e = arguments[f]) != null) for (n in e) {
                    r = a[n], s = e[n];
                    if (a === s) continue;
                    c && s && (i.isPlainObject(s) || (o = i.isArray(s))) ? (o ? (o = !1, u = r && i.isArray(r) ? r : []) : u = r && i.isPlainObject(r) ? r : {}, a[n] = i.extend(c, u, s)) : s !== t && (a[n] = s)
                }
                return a
            }, i.extend({
                noConflict: function (t) {
                    return e.$ === i && (e.$ = o), t && e.jQuery === i && (e.jQuery = s), i
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function (e) {
                    e ? i.readyWait++ : i.ready(!0)
                },
                ready: function (e) {
                    if (e === !0 && !--i.readyWait || e !== !0 && !i.isReady) {
                        if (!n.body) return setTimeout(i.ready, 1);
                        i.isReady = !0;
                        if (e !== !0 && --i.readyWait > 0) return;
                        C.fireWith(n, [i]), i.fn.trigger && i(n).trigger("ready").off("ready")
                    }
                },
                bindReady: function () {
                    if (C) return;
                    C = i.Callbacks("once memory");
                    if (n.readyState === "complete") return setTimeout(i.ready, 1);
                    if (n.addEventListener) n.addEventListener("DOMContentLoaded", k, !1), e.addEventListener("load", i.ready, !1);
                    else if (n.attachEvent) {
                        n.attachEvent("onreadystatechange", k), e.attachEvent("onload", i.ready);
                        var t = !1;
                        try {
                            t = e.frameElement == null
                        } catch (r) {}
                        n.documentElement.doScroll && t && H()
                    }
                },
                isFunction: function (e) {
                    return i.type(e) === "function"
                },
                isArray: Array.isArray || function (e) {
                    return i.type(e) === "array"
                },
                isWindow: function (e) {
                    return e != null && e == e.window
                },
                isNumeric: function (e) {
                    return !isNaN(parseFloat(e)) && isFinite(e)
                },
                type: function (e) {
                    return e == null ? String(e) : P[L.call(e)] || "object"
                },
                isPlainObject: function (e) {
                    if (!e || i.type(e) !== "object" || e.nodeType || i.isWindow(e)) return !1;
                    try {
                        if (e.constructor && !A.call(e, "constructor") && !A.call(e.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (n) {
                        return !1
                    }
                    var r;
                    for (r in e);
                    return r === t || A.call(e, r)
                },
                isEmptyObject: function (e) {
                    for (var t in e) return !1;
                    return !0
                },
                error: function (e) {
                    throw new Error(e)
                },
                parseJSON: function (t) {
                    if (typeof t != "string" || !t) return null;
                    t = i.trim(t);
                    if (e.JSON && e.JSON.parse) return e.JSON.parse(t);
                    if (p.test(t.replace(d, "@").replace(v, "]").replace(m, ""))) return (new Function("return " + t))();
                    i.error("Invalid JSON: " + t)
                },
                parseXML: function (n) {
                    if (typeof n != "string" || !n) return null;
                    var r, s;
                    try {
                        e.DOMParser ? (s = new DOMParser, r = s.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
                    } catch (o) {
                        r = t
                    }
                    return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && i.error("Invalid XML: " + n), r
                },
                noop: function () {},
                globalEval: function (t) {
                    t && f.test(t) && (e.execScript || function (t) {
                        e.eval.call(e, t)
                    })(t)
                },
                camelCase: function (e) {
                    return e.replace(S, "ms-").replace(E, x)
                },
                nodeName: function (e, t) {
                    return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
                },
                each: function (e, n, r) {
                    var s, o = 0,
                        u = e.length,
                        a = u === t || i.isFunction(e);
                    if (r) {
                        if (a) {
                            for (s in e) if (n.apply(e[s], r) === !1) break
                        } else for (; o < u;) if (n.apply(e[o++], r) === !1) break
                    } else if (a) {
                        for (s in e) if (n.call(e[s], s, e[s]) === !1) break
                    } else for (; o < u;) if (n.call(e[o], o, e[o++]) === !1) break;
                    return e
                },
                trim: _ ? function (e) {
                    return e == null ? "" : _.call(e)
                } : function (e) {
                    return e == null ? "" : e.toString().replace(l, "").replace(c, "")
                },
                makeArray: function (e, t) {
                    var n = t || [];
                    if (e != null) {
                        var r = i.type(e);
                        e.length == null || r === "string" || r === "function" || r === "regexp" || i.isWindow(e) ? O.call(n, e) : i.merge(n, e)
                    }
                    return n
                },
                inArray: function (e, t, n) {
                    var r;
                    if (t) {
                        if (D) return D.call(t, e, n);
                        r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                        for (; n < r; n++) if (n in t && t[n] === e) return n
                    }
                    return -1
                },
                merge: function (e, n) {
                    var r = e.length,
                        i = 0;
                    if (typeof n.length == "number") for (var s = n.length; i < s; i++) e[r++] = n[i];
                    else while (n[i] !== t) e[r++] = n[i++];
                    return e.length = r, e
                },
                grep: function (e, t, n) {
                    var r = [],
                        i;
                    n = !! n;
                    for (var s = 0, o = e.length; s < o; s++) i = !! t(e[s], s), n !== i && r.push(e[s]);
                    return r
                },
                map: function (e, n, r) {
                    var s, o, u = [],
                        a = 0,
                        f = e.length,
                        l = e instanceof i || f !== t && typeof f == "number" && (f > 0 && e[0] && e[f - 1] || f === 0 || i.isArray(e));
                    if (l) for (; a < f; a++) s = n(e[a], a, r), s != null && (u[u.length] = s);
                    else for (o in e) s = n(e[o], o, r), s != null && (u[u.length] = s);
                    return u.concat.apply([], u)
                },
                guid: 1,
                proxy: function (e, n) {
                    if (typeof n == "string") {
                        var r = e[n];
                        n = e, e = r
                    }
                    if (!i.isFunction(e)) return t;
                    var s = M.call(arguments, 2),
                        o = function () {
                            return e.apply(n, s.concat(M.call(arguments)))
                        };
                    return o.guid = e.guid = e.guid || o.guid || i.guid++, o
                },
                access: function (e, n, r, s, o, u, a) {
                    var f, l = r == null,
                        c = 0,
                        h = e.length;
                    if (r && typeof r == "object") {
                        for (c in r) i.access(e, n, c, r[c], 1, u, s);
                        o = 1
                    } else if (s !== t) {
                        f = a === t && i.isFunction(s), l && (f ? (f = n, n = function (e, t, n) {
                            return f.call(i(e), n)
                        }) : (n.call(e, s), n = null));
                        if (n) for (; c < h; c++) n(e[c], r, f ? s.call(e[c], c, n(e[c], r)) : s, a);
                        o = 1
                    }
                    return o ? e : l ? n.call(e) : h ? n(e[0], r) : u
                },
                now: function () {
                    return (new Date).getTime()
                },
                uaMatch: function (e) {
                    e = e.toLowerCase();
                    var t = g.exec(e) || y.exec(e) || b.exec(e) || e.indexOf("compatible") < 0 && w.exec(e) || [];
                    return {
                        browser: t[1] || "",
                        version: t[2] || "0"
                    }
                },
                sub: function () {
                    function e(t, n) {
                        return new e.fn.init(t, n)
                    }
                    i.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (r, s) {
                        return s && s instanceof i && !(s instanceof e) && (s = e(s)), i.fn.init.call(this, r, s, t)
                    }, e.fn.init.prototype = e.fn;
                    var t = e(n);
                    return e
                },
                browser: {}
            }), i.each("Boolean Number String Function Array Date RegExp Object".split(" "),
                function (e, t) {
                    P["[object " + t + "]"] = t.toLowerCase()
                }), N = i.uaMatch(T), N.browser && (i.browser[N.browser] = !0, i.browser.version = N.version), i.browser.webkit && (i.browser.safari = !0), f.test(" ") && (l = /^[\s\xA0]+/, c = /[\s\xA0]+$/), u = i(n), n.addEventListener ? k = function () {
                n.removeEventListener("DOMContentLoaded", k, !1), i.ready()
            } : n.attachEvent && (k = function () {
                n.readyState === "complete" && (n.detachEvent("onreadystatechange", k), i.ready())
            }), i
        }(),
        o = {};
    s.Callbacks = function (e) {
        e = e ? o[e] || u(e) : {};
        var n = [],
            r = [],
            i, a, f, l, c, h, p = function (t) {
            var r, i, o, u, a;
            for (r = 0, i = t.length; r < i; r++) o = t[r], u = s.type(o), u === "array" ? p(o) : u === "function" && (!e.unique || !v.has(o)) && n.push(o)
        },
            d = function (t, s) {
                s = s || [], i = !e.memory || [t, s], a = !0, f = !0, h = l || 0, l = 0, c = n.length;
                for (; n && h < c; h++) if (n[h].apply(t, s) === !1 && e.stopOnFalse) {
                    i = !0;
                    break
                }
                f = !1, n && (e.once ? i === !0 ? v.disable() : n = [] : r && r.length && (i = r.shift(), v.fireWith(i[0], i[1])))
            },
            v = {
                add: function () {
                    if (n) {
                        var e = n.length;
                        p(arguments), f ? c = n.length : i && i !== !0 && (l = e, d(i[0], i[1]))
                    }
                    return this
                },
                remove: function () {
                    if (n) {
                        var t = arguments,
                            r = 0,
                            i = t.length;
                        for (; r < i; r++) for (var s = 0; s < n.length; s++) if (t[r] === n[s]) {
                            f && s <= c && (c--, s <= h && h--), n.splice(s--, 1);
                            if (e.unique) break
                        }
                    }
                    return this
                },
                has: function (e) {
                    if (n) {
                        var t = 0,
                            r = n.length;
                        for (; t < r; t++) if (e === n[t]) return !0
                    }
                    return !1
                },
                empty: function () {
                    return n = [], this
                },
                disable: function () {
                    return n = r = i = t, this
                },
                disabled: function () {
                    return !n
                },
                lock: function () {
                    return r = t, (!i || i === !0) && v.disable(), this
                },
                locked: function () {
                    return !r
                },
                fireWith: function (t, n) {
                    return r && (f ? e.once || r.push([t, n]) : (!e.once || !i) && d(t, n)), this
                },
                fire: function () {
                    return v.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!a
                }
            };
        return v
    };
    var a = [].slice;
    s.extend({
        Deferred: function (e) {
            var t = s.Callbacks("once memory"),
                n = s.Callbacks("once memory"),
                r = s.Callbacks("memory"),
                i = "pending",
                o = {
                    resolve: t,
                    reject: n,
                    notify: r
                },
                u = {
                    done: t.add,
                    fail: n.add,
                    progress: r.add,
                    state: function () {
                        return i
                    },
                    isResolved: t.fired,
                    isRejected: n.fired,
                    then: function (e, t, n) {
                        return a.done(e).fail(t).progress(n), this
                    },
                    always: function () {
                        return a.done.apply(a, arguments).fail.apply(a, arguments), this
                    },
                    pipe: function (e, t, n) {
                        return s.Deferred(function (r) {
                            s.each({
                                    done: [e, "resolve"],
                                    fail: [t, "reject"],
                                    progress: [n, "notify"]
                                },
                                function (e, t) {
                                    var n = t[0],
                                        i = t[1],
                                        o;
                                    s.isFunction(n) ? a[e](function () {
                                        o = n.apply(this, arguments), o && s.isFunction(o.promise) ? o.promise().then(r.resolve, r.reject, r.notify) : r[i + "With"](this === a ? r : this, [o])
                                    }) : a[e](r[i])
                                })
                        }).promise()
                    },
                    promise: function (e) {
                        if (e == null) e = u;
                        else for (var t in u) e[t] = u[t];
                        return e
                    }
                },
                a = u.promise({}),
                f;
            for (f in o) a[f] = o[f].fire, a[f + "With"] = o[f].fireWith;
            return a.done(function () {
                i = "resolved"
            }, n.disable, r.lock).fail(function () {
                    i = "rejected"
                }, t.disable, r.lock), e && e.call(a, a), a
        },
        when: function (e) {
            function c(e) {
                return function (n) {
                    t[e] = arguments.length > 1 ? a.call(arguments, 0) : n, --o || f.resolveWith(f, t)
                }
            }
            function h(e) {
                return function (t) {
                    i[e] = arguments.length > 1 ? a.call(arguments, 0) : t, f.notifyWith(l, i)
                }
            }
            var t = a.call(arguments, 0),
                n = 0,
                r = t.length,
                i = new Array(r),
                o = r,
                u = r,
                f = r <= 1 && e && s.isFunction(e.promise) ? e : s.Deferred(),
                l = f.promise();
            if (r > 1) {
                for (; n < r; n++) t[n] && t[n].promise && s.isFunction(t[n].promise) ? t[n].promise().then(c(n), f.reject, h(n)) : --o;
                o || f.resolveWith(f, t)
            } else f !== e && f.resolveWith(f, r ? [e] : []);
            return l
        }
    }), s.support = function () {
        var t, r, i, o, u, a, f, l, c, h, p, d, v = n.createElement("div"),
            m = n.documentElement;
        v.setAttribute("className", "t"), v.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", r = v.getElementsByTagName("*"), i = v.getElementsByTagName("a")[0];
        if (!r || !r.length || !i) return {};
        o = n.createElement("select"), u = o.appendChild(n.createElement("option")), a = v.getElementsByTagName("input")[0], t = {
            leadingWhitespace: v.firstChild.nodeType === 3,
            tbody: !v.getElementsByTagName("tbody").length,
            htmlSerialize: !! v.getElementsByTagName("link").length,
            style: /top/.test(i.getAttribute("style")),
            hrefNormalized: i.getAttribute("href") === "/a",
            opacity: /^0.55/.test(i.style.opacity),
            cssFloat: !! i.style.cssFloat,
            checkOn: a.value === "on",
            optSelected: u.selected,
            getSetAttribute: v.className !== "t",
            enctype: !! n.createElement("form").enctype,
            html5Clone: n.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            pixelMargin: !0
        }, s.boxModel = t.boxModel = n.compatMode === "CSS1Compat", a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !u.disabled;
        try {
            delete v.test
        } catch (g) {
            t.deleteExpando = !1
        }!v.addEventListener && v.attachEvent && v.fireEvent && (v.attachEvent("onclick",
            function () {
                t.noCloneEvent = !1
            }), v.cloneNode(!0).fireEvent("onclick")), a = n.createElement("input"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = a.value === "t", a.setAttribute("checked", "checked"), a.setAttribute("name", "t"), v.appendChild(a), f = n.createDocumentFragment(), f.appendChild(v.lastChild), t.checkClone = f.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = a.checked, f.removeChild(a), f.appendChild(v);
        if (v.attachEvent) for (p in {
            submit: 1,
            change: 1,
            focusin: 1
        }) h = "on" + p, d = h in v, d || (v.setAttribute(h, "return;"), d = typeof v[h] == "function"), t[p + "Bubbles"] = d;
        return f.removeChild(v), f = o = u = v = a = null, s(function () {
            var r, i, o, u, a, f, c, h, p, m, g, y, b, w = n.getElementsByTagName("body")[0];
            if (!w) return;
            h = 1, b = "padding:0;margin:0;border:", g = "position:absolute;top:0;left:0;width:1px;height:1px;", y = b + "0;visibility:hidden;", p = "style='" + g + b + "5px solid #000;", m = "<div " + p + "display:block;'><div style='" + b + "0;display:block;overflow:hidden;'></div></div>" + "<table " + p + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", r = n.createElement("div"), r.style.cssText = y + "width:0;height:0;position:static;top:0;margin-top:" + h + "px", w.insertBefore(r, w.firstChild), v = n.createElement("div"), r.appendChild(v), v.innerHTML = "<table><tr><td style='" + b + "0;display:none'></td><td>t</td></tr></table>", l = v.getElementsByTagName("td"), d = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", t.reliableHiddenOffsets = d && l[0].offsetHeight === 0, e.getComputedStyle && (v.innerHTML = "", c = n.createElement("div"), c.style.width = "0", c.style.marginRight = "0", v.style.width = "2px", v.appendChild(c), t.reliableMarginRight = (parseInt((e.getComputedStyle(c, null) || {
                marginRight: 0
            }).marginRight, 10) || 0) === 0), typeof v.style.zoom != "undefined" && (v.innerHTML = "", v.style.width = v.style.padding = "1px", v.style.border = 0, v.style.overflow = "hidden", v.style.display = "inline", v.style.zoom = 1, t.inlineBlockNeedsLayout = v.offsetWidth === 3, v.style.display = "block", v.style.overflow = "visible", v.innerHTML = "<div style='width:5px;'></div>", t.shrinkWrapBlocks = v.offsetWidth !== 3), v.style.cssText = g + y, v.innerHTML = m, i = v.firstChild, o = i.firstChild, a = i.nextSibling.firstChild.firstChild, f = {
                doesNotAddBorder: o.offsetTop !== 5,
                doesAddBorderForTableAndCells: a.offsetTop === 5
            }, o.style.position = "fixed", o.style.top = "20px", f.fixedPosition = o.offsetTop === 20 || o.offsetTop === 15, o.style.position = o.style.top = "", i.style.overflow = "hidden", i.style.position = "relative", f.subtractsBorderForOverflowNotVisible = o.offsetTop === -5, f.doesNotIncludeMarginInBodyOffset = w.offsetTop !== h, e.getComputedStyle && (v.style.marginTop = "1%", t.pixelMargin = (e.getComputedStyle(v, null) || {
                marginTop: 0
            }).marginTop !== "1%"), typeof r.style.zoom != "undefined" && (r.style.zoom = 1), w.removeChild(r), c = v = r = null, s.extend(t, f)
        }), t
    }();
    var f = /^(?:\{.*\}|\[.*\])$/,
        l = /([A-Z])/g;
    s.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (s.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (e) {
            return e = e.nodeType ? s.cache[e[s.expando]] : e[s.expando], !! e && !h(e)
        },
        data: function (e, n, r, i) {
            if (!s.acceptData(e)) return;
            var o, u, a, f = s.expando,
                l = typeof n == "string",
                c = e.nodeType,
                h = c ? s.cache : e,
                p = c ? e[f] : e[f] && f,
                d = n === "events";
            if ((!p || !h[p] || !d && !i && !h[p].data) && l && r === t) return;
            p || (c ? e[f] = p = ++s.uuid : p = f), h[p] || (h[p] = {}, c || (h[p].toJSON = s.noop));
            if (typeof n == "object" || typeof n == "function") i ? h[p] = s.extend(h[p], n) : h[p].data = s.extend(h[p].data, n);
            return o = u = h[p], i || (u.data || (u.data = {}), u = u.data), r !== t && (u[s.camelCase(n)] = r), d && !u[n] ? o.events : (l ? (a = u[n], a == null && (a = u[s.camelCase(n)])) : a = u, a)
        },
        removeData: function (e, t, n) {
            if (!s.acceptData(e)) return;
            var r, i, o, u = s.expando,
                a = e.nodeType,
                f = a ? s.cache : e,
                l = a ? e[u] : u;
            if (!f[l]) return;
            if (t) {
                r = n ? f[l] : f[l].data;
                if (r) {
                    s.isArray(t) || (t in r ? t = [t] : (t = s.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
                    for (i = 0, o = t.length; i < o; i++) delete r[t[i]];
                    if (!(n ? h : s.isEmptyObject)(r)) return
                }
            }
            if (!n) {
                delete f[l].data;
                if (!h(f[l])) return
            }
            s.support.deleteExpando || !f.setInterval ? delete f[l] : f[l] = null, a && (s.support.deleteExpando ? delete e[u] : e.removeAttribute ? e.removeAttribute(u) : e[u] = null)
        },
        _data: function (e, t, n) {
            return s.data(e, t, n, !0)
        },
        acceptData: function (e) {
            if (e.nodeName) {
                var t = s.noData[e.nodeName.toLowerCase()];
                if (t) return t !== !0 && e.getAttribute("classid") === t
            }
            return !0
        }
    }), s.fn.extend({
        data: function (e, n) {
            var r, i, o, u, a, f = this[0],
                l = 0,
                h = null;
            if (e === t) {
                if (this.length) {
                    h = s.data(f);
                    if (f.nodeType === 1 && !s._data(f, "parsedAttrs")) {
                        o = f.attributes;
                        for (a = o.length; l < a; l++) u = o[l].name, u.indexOf("data-") === 0 && (u = s.camelCase(u.substring(5)), c(f, u, h[u]));
                        s._data(f, "parsedAttrs", !0)
                    }
                }
                return h
            }
            return typeof e == "object" ? this.each(function () {
                s.data(this, e)
            }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", s.access(this,
                function (n) {
                    if (n === t) return h = this.triggerHandler("getData" + i, [r[0]]), h === t && f && (h = s.data(f, e), h = c(f, e, h)), h === t && r[1] ? this.data(r[0]) : h;
                    r[1] = n, this.each(function () {
                        var t = s(this);
                        t.triggerHandler("setData" + i, r), s.data(this, e, n), t.triggerHandler("changeData" + i, r)
                    })
                }, null, n, arguments.length > 1, null, !1))
        },
        removeData: function (e) {
            return this.each(function () {
                s.removeData(this, e)
            })
        }
    }), s.extend({
        _mark: function (e, t) {
            e && (t = (t || "fx") + "mark", s._data(e, t, (s._data(e, t) || 0) + 1))
        },
        _unmark: function (e, t, n) {
            e !== !0 && (n = t, t = e, e = !1);
            if (t) {
                n = n || "fx";
                var r = n + "mark",
                    i = e ? 0 : (s._data(t, r) || 1) - 1;
                i ? s._data(t, r, i) : (s.removeData(t, r, !0), p(t, n, "mark"))
            }
        },
        queue: function (e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = s._data(e, t), n && (!r || s.isArray(n) ? r = s._data(e, t, s.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function (e, t) {
            t = t || "fx";
            var n = s.queue(e, t),
                r = n.shift(),
                i = {};
            r === "inprogress" && (r = n.shift()), r && (t === "fx" && n.unshift("inprogress"), s._data(e, t + ".run", i), r.call(e,
                function () {
                    s.dequeue(e, t)
                }, i)), n.length || (s.removeData(e, t + "queue " + t + ".run", !0), p(e, t, "queue"))
        }
    }), s.fn.extend({
        queue: function (e, n) {
            var r = 2;
            return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? s.queue(this[0], e) : n === t ? this : this.each(function () {
                var t = s.queue(this, e, n);
                e === "fx" && t[0] !== "inprogress" && s.dequeue(this, e)
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                s.dequeue(this, e)
            })
        },
        delay: function (e, t) {
            return e = s.fx ? s.fx.speeds[e] || e : e, t = t || "fx", this.queue(t,
                function (t, n) {
                    var r = setTimeout(t, e);
                    n.stop = function () {
                        clearTimeout(r)
                    }
                })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (e, n) {
            function h() {
                --u || r.resolveWith(i, [i])
            }
            typeof e != "string" && (n = e, e = t), e = e || "fx";
            var r = s.Deferred(),
                i = this,
                o = i.length,
                u = 1,
                a = e + "defer",
                f = e + "queue",
                l = e + "mark",
                c;
            while (o--) if (c = s.data(i[o], a, t, !0) || (s.data(i[o], f, t, !0) || s.data(i[o], l, t, !0)) && s.data(i[o], a, s.Callbacks("once memory"), !0)) u++, c.add(h);
            return h(), r.promise(n)
        }
    });
    var d = /[\n\t\r]/g,
        v = /\s+/,
        m = /\r/g,
        g = /^(?:button|input)$/i,
        y = /^(?:button|input|object|select|textarea)$/i,
        b = /^a(?:rea)?$/i,
        w = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        E = s.support.getSetAttribute,
        S, x, T;
    s.fn.extend({
        attr: function (e, t) {
            return s.access(this, s.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
            return this.each(function () {
                s.removeAttr(this, e)
            })
        },
        prop: function (e, t) {
            return s.access(this, s.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
            return e = s.propFix[e] || e, this.each(function () {
                try {
                    this[e] = t, delete this[e]
                } catch (n) {}
            })
        },
        addClass: function (e) {
            var t, n, r, i, o, u, a;
            if (s.isFunction(e)) return this.each(function (t) {
                s(this).addClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string") {
                t = e.split(v);
                for (n = 0, r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1) if (!i.className && t.length === 1) i.className = e;
                    else {
                        o = " " + i.className + " ";
                        for (u = 0, a = t.length; u < a; u++)~o.indexOf(" " + t[u] + " ") || (o += t[u] + " ");
                        i.className = s.trim(o)
                    }
                }
            }
            return this
        },
        removeClass: function (e) {
            var n, r, i, o, u, a, f;
            if (s.isFunction(e)) return this.each(function (t) {
                s(this).removeClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string" || e === t) {
                n = (e || "").split(v);
                for (r = 0, i = this.length; r < i; r++) {
                    o = this[r];
                    if (o.nodeType === 1 && o.className) if (e) {
                        u = (" " + o.className + " ").replace(d, " ");
                        for (a = 0, f = n.length; a < f; a++) u = u.replace(" " + n[a] + " ", " ");
                        o.className = s.trim(u)
                    } else o.className = ""
                }
            }
            return this
        },
        toggleClass: function (e, t) {
            var n = typeof e,
                r = typeof t == "boolean";
            return s.isFunction(e) ? this.each(function (n) {
                s(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function () {
                if (n === "string") {
                    var i, o = 0,
                        u = s(this),
                        a = t,
                        f = e.split(v);
                    while (i = f[o++]) a = r ? a : !u.hasClass(i), u[a ? "addClass" : "removeClass"](i)
                } else if (n === "undefined" || n === "boolean") this.className && s._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : s._data(this, "__className__") || ""
            })
        },
        hasClass: function (e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++) if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(d, " ").indexOf(t) > -1) return !0;
            return !1
        },
        val: function (e) {
            var n, r, i, o = this[0];
            if (!arguments.length) {
                if (o) return n = s.valHooks[o.type] || s.valHooks[o.nodeName.toLowerCase()], n && "get" in n && (r = n.get(o, "value")) !== t ? r : (r = o.value, typeof r == "string" ? r.replace(m, "") : r == null ? "" : r);
                return
            }
            return i = s.isFunction(e), this.each(function (r) {
                var o = s(this),
                    u;
                if (this.nodeType !== 1) return;
                i ? u = e.call(this, r, o.val()) : u = e, u == null ? u = "" : typeof u == "number" ? u += "" : s.isArray(u) && (u = s.map(u,
                    function (e) {
                        return e == null ? "" : e + ""
                    })), n = s.valHooks[this.type] || s.valHooks[this.nodeName.toLowerCase()];
                if (!n || !("set" in n) || n.set(this, u, "value") === t) this.value = u
            })
        }
    }), s.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function (e) {
                    var t, n, r, i, o = e.selectedIndex,
                        u = [],
                        a = e.options,
                        f = e.type === "select-one";
                    if (o < 0) return null;
                    n = f ? o : 0, r = f ? o + 1 : a.length;
                    for (; n < r; n++) {
                        i = a[n];
                        if (i.selected && (s.support.optDisabled ? !i.disabled : i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !s.nodeName(i.parentNode, "optgroup"))) {
                            t = s(i).val();
                            if (f) return t;
                            u.push(t)
                        }
                    }
                    return f && !u.length && a.length ? s(a[o]).val() : u
                },
                set: function (e, t) {
                    var n = s.makeArray(t);
                    return s(e).find("option").each(function () {
                        this.selected = s.inArray(s(this).val(), n) >= 0
                    }), n.length || (e.selectedIndex = -1), n
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function (e, n, r, i) {
            var o, u, a, f = e.nodeType;
            if (!e || f === 3 || f === 8 || f === 2) return;
            if (i && n in s.attrFn) return s(e)[n](r);
            if (typeof e.getAttribute == "undefined") return s.prop(e, n, r);
            a = f !== 1 || !s.isXMLDoc(e), a && (n = n.toLowerCase(), u = s.attrHooks[n] || (w.test(n) ? x : S));
            if (r !== t) {
                if (r === null) {
                    s.removeAttr(e, n);
                    return
                }
                return u && "set" in u && a && (o = u.set(e, r, n)) !== t ? o : (e.setAttribute(n, "" + r), r)
            }
            return u && "get" in u && a && (o = u.get(e, n)) !== null ? o : (o = e.getAttribute(n), o === null ? t : o)
        },
        removeAttr: function (e, t) {
            var n, r, i, o, u, a = 0;
            if (t && e.nodeType === 1) {
                r = t.toLowerCase().split(v), o = r.length;
                for (; a < o; a++) i = r[a], i && (n = s.propFix[i] || i, u = w.test(i), u || s.attr(e, i, ""), e.removeAttribute(E ? i : n), u && n in e && (e[n] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (g.test(e.nodeName) && e.parentNode) s.error("type property can't be changed");
                    else if (!s.support.radioValue && t === "radio" && s.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            },
            value: {
                get: function (e, t) {
                    return S && s.nodeName(e, "button") ? S.get(e, t) : t in e ? e.value : null
                },
                set: function (e, t, n) {
                    if (S && s.nodeName(e, "button")) return S.set(e, t, n);
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (e, n, r) {
            var i, o, u, a = e.nodeType;
            if (!e || a === 3 || a === 8 || a === 2) return;
            return u = a !== 1 || !s.isXMLDoc(e), u && (n = s.propFix[n] || n, o = s.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && (i = o.get(e, n)) !== null ? i : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : y.test(e.nodeName) || b.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), s.attrHooks.tabindex = s.propHooks.tabIndex, x = {
        get: function (e, n) {
            var r, i = s.prop(e, n);
            return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
        },
        set: function (e, t, n) {
            var r;
            return t === !1 ? s.removeAttr(e, n) : (r = s.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
        }
    }, E || (T = {
        name: !0,
        id: !0,
        coords: !0
    }, S = s.valHooks.button = {
        get: function (e, n) {
            var r;
            return r = e.getAttributeNode(n), r && (T[n] ? r.nodeValue !== "" : r.specified) ? r.nodeValue : t
        },
        set: function (e, t, r) {
            var i = e.getAttributeNode(r);
            return i || (i = n.createAttribute(r), e.setAttributeNode(i)), i.nodeValue = t + ""
        }
    }, s.attrHooks.tabindex.set = S.set, s.each(["width", "height"],
        function (e, t) {
            s.attrHooks[t] = s.extend(s.attrHooks[t], {
                set: function (e, n) {
                    if (n === "") return e.setAttribute(t, "auto"), n
                }
            })
        }), s.attrHooks.contenteditable = {
        get: S.get,
        set: function (e, t, n) {
            t === "" && (t = "false"), S.set(e, t, n)
        }
    }), s.support.hrefNormalized || s.each(["href", "src", "width", "height"],
        function (e, n) {
            s.attrHooks[n] = s.extend(s.attrHooks[n], {
                get: function (e) {
                    var r = e.getAttribute(n, 2);
                    return r === null ? t : r
                }
            })
        }), s.support.style || (s.attrHooks.style = {
        get: function (e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function (e, t) {
            return e.style.cssText = "" + t
        }
    }), s.support.optSelected || (s.propHooks.selected = s.extend(s.propHooks.selected, {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    })), s.support.enctype || (s.propFix.enctype = "encoding"), s.support.checkOn || s.each(["radio", "checkbox"],
        function () {
            s.valHooks[this] = {
                get: function (e) {
                    return e.getAttribute("value") === null ? "on" : e.value
                }
            }
        }), s.each(["radio", "checkbox"],
        function () {
            s.valHooks[this] = s.extend(s.valHooks[this], {
                set: function (e, t) {
                    if (s.isArray(t)) return e.checked = s.inArray(s(e).val(), t) >= 0
                }
            })
        });
    var N = /^(?:textarea|input|select)$/i,
        C = /^([^\.]*)?(?:\.(.+))?$/,
        k = /(?:^|\s)hover(\.\S+)?\b/,
        L = /^key/,
        A = /^(?:mouse|contextmenu)|click/,
        O = /^(?:focusinfocus|focusoutblur)$/,
        M = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        _ = function (e) {
            var t = M.exec(e);
            return t && (t[1] = (t[1] || "").toLowerCase(), t[3] = t[3] && new RegExp("(?:^|\\s)" + t[3] + "(?:\\s|$)")), t
        },
        D = function (e, t) {
            var n = e.attributes || {};
            return (!t[1] || e.nodeName.toLowerCase() === t[1]) && (!t[2] || (n.id || {}).value === t[2]) && (!t[3] || t[3].test((n["class"] || {}).value))
        },
        P = function (e) {
            return s.event.special.hover ? e : e.replace(k, "mouseenter$1 mouseleave$1")
        };
    s.event = {
        add: function (e, n, r, i, o) {
            var u, a, f, l, c, h, p, d, v, m, g, y;
            if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(u = s._data(e))) return;
            r.handler && (v = r, r = v.handler, o = v.selector), r.guid || (r.guid = s.guid++), f = u.events, f || (u.events = f = {}), a = u.handle, a || (u.handle = a = function (e) {
                return typeof s == "undefined" || !! e && s.event.triggered === e.type ? t : s.event.dispatch.apply(a.elem, arguments)
            }, a.elem = e), n = s.trim(P(n)).split(" ");
            for (l = 0; l < n.length; l++) {
                c = C.exec(n[l]) || [], h = c[1], p = (c[2] || "").split(".").sort(), y = s.event.special[h] || {}, h = (o ? y.delegateType : y.bindType) || h, y = s.event.special[h] || {}, d = s.extend({
                    type: h,
                    origType: c[1],
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: o,
                    quick: o && _(o),
                    namespace: p.join(".")
                }, v), g = f[h];
                if (!g) {
                    g = f[h] = [], g.delegateCount = 0;
                    if (!y.setup || y.setup.call(e, i, p, a) === !1) e.addEventListener ? e.addEventListener(h, a, !1) : e.attachEvent && e.attachEvent("on" + h, a)
                }
                y.add && (y.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), o ? g.splice(g.delegateCount++, 0, d) : g.push(d), s.event.global[h] = !0
            }
            e = null
        },
        global: {},
        remove: function (e, t, n, r, i) {
            var o = s.hasData(e) && s._data(e),
                u, a, f, l, c, h, p, d, v, m, g, y;
            if (!o || !(d = o.events)) return;
            t = s.trim(P(t || "")).split(" ");
            for (u = 0; u < t.length; u++) {
                a = C.exec(t[u]) || [], f = l = a[1], c = a[2];
                if (!f) {
                    for (f in d) s.event.remove(e, f + t[u], n, r, !0);
                    continue
                }
                v = s.event.special[f] || {}, f = (r ? v.delegateType : v.bindType) || f, g = d[f] || [], h = g.length, c = c ? new RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (p = 0; p < g.length; p++) y = g[p], (i || l === y.origType) && (!n || n.guid === y.guid) && (!c || c.test(y.namespace)) && (!r || r === y.selector || r === "**" && y.selector) && (g.splice(p--, 1), y.selector && g.delegateCount--, v.remove && v.remove.call(e, y));
                g.length === 0 && h !== g.length && ((!v.teardown || v.teardown.call(e, c) === !1) && s.removeEvent(e, f, o.handle), delete d[f])
            }
            s.isEmptyObject(d) && (m = o.handle, m && (m.elem = null), s.removeData(e, ["events", "handle"], !0))
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function (n, r, i, o) {
            if (!i || i.nodeType !== 3 && i.nodeType !== 8) {
                var u = n.type || n,
                    a = [],
                    f, l, c, h, p, d, v, m, g, y;
                if (O.test(u + s.event.triggered)) return;
                u.indexOf("!") >= 0 && (u = u.slice(0, - 1), l = !0), u.indexOf(".") >= 0 && (a = u.split("."), u = a.shift(), a.sort());
                if ((!i || s.event.customEvent[u]) && !s.event.global[u]) return;
                n = typeof n == "object" ? n[s.expando] ? n : new s.Event(u, n) : new s.Event(u), n.type = u, n.isTrigger = !0, n.exclusive = l, n.namespace = a.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + a.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, d = u.indexOf(":") < 0 ? "on" + u : "";
                if (!i) {
                    f = s.cache;
                    for (c in f) f[c].events && f[c].events[u] && s.event.trigger(n, r, f[c].handle.elem, !0);
                    return
                }
                n.result = t, n.target || (n.target = i), r = r != null ? s.makeArray(r) : [], r.unshift(n), v = s.event.special[u] || {};
                if (v.trigger && v.trigger.apply(i, r) === !1) return;
                g = [
                    [i, v.bindType || u]
                ];
                if (!o && !v.noBubble && !s.isWindow(i)) {
                    y = v.delegateType || u, h = O.test(y + u) ? i : i.parentNode, p = null;
                    for (; h; h = h.parentNode) g.push([h, y]), p = h;
                    p && p === i.ownerDocument && g.push([p.defaultView || p.parentWindow || e, y])
                }
                for (c = 0; c < g.length && !n.isPropagationStopped(); c++) h = g[c][0], n.type = g[c][1], m = (s._data(h, "events") || {})[n.type] && s._data(h, "handle"), m && m.apply(h, r), m = d && h[d], m && s.acceptData(h) && m.apply(h, r) === !1 && n.preventDefault();
                return n.type = u, !o && !n.isDefaultPrevented() && (!v._default || v._default.apply(i.ownerDocument, r) === !1) && (u !== "click" || !s.nodeName(i, "a")) && s.acceptData(i) && d && i[u] && (u !== "focus" && u !== "blur" || n.target.offsetWidth !== 0) && !s.isWindow(i) && (p = i[d], p && (i[d] = null), s.event.triggered = u, i[u](), s.event.triggered = t, p && (i[d] = p)), n.result
            }
            return
        },
        dispatch: function (n) {
            n = s.event.fix(n || e.event);
            var r = (s._data(this, "events") || {})[n.type] || [],
                i = r.delegateCount,
                o = [].slice.call(arguments, 0),
                u = !n.exclusive && !n.namespace,
                a = s.event.special[n.type] || {},
                f = [],
                l, c, h, p, d, v, m, g, y, b, w;
            o[0] = n, n.delegateTarget = this;
            if (a.preDispatch && a.preDispatch.call(this, n) === !1) return;
            if (i && (!n.button || n.type !== "click")) {
                p = s(this), p.context = this.ownerDocument || this;
                for (h = n.target; h != this; h = h.parentNode || this) if (h.disabled !== !0) {
                    v = {}, g = [], p[0] = h;
                    for (l = 0; l < i; l++) y = r[l], b = y.selector, v[b] === t && (v[b] = y.quick ? D(h, y.quick) : p.is(b)), v[b] && g.push(y);
                    g.length && f.push({
                        elem: h,
                        matches: g
                    })
                }
            }
            r.length > i && f.push({
                elem: this,
                matches: r.slice(i)
            });
            for (l = 0; l < f.length && !n.isPropagationStopped(); l++) {
                m = f[l], n.currentTarget = m.elem;
                for (c = 0; c < m.matches.length && !n.isImmediatePropagationStopped(); c++) {
                    y = m.matches[c];
                    if (u || !n.namespace && !y.namespace || n.namespace_re && n.namespace_re.test(y.namespace)) n.data = y.data, n.handleObj = y, d = ((s.event.special[y.origType] || {}).handle || y.handler).apply(m.elem, o), d !== t && (n.result = d, d === !1 && (n.preventDefault(), n.stopPropagation()))
                }
            }
            return a.postDispatch && a.postDispatch.call(this, n), n.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, r) {
                var i, s, o, u = r.button,
                    a = r.fromElement;
                return e.pageX == null && r.clientX != null && (i = e.target.ownerDocument || n, s = i.documentElement, o = i.body, e.pageX = r.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = r.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? r.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e
            }
        },
        fix: function (e) {
            if (e[s.expando]) return e;
            var r, i, o = e,
                u = s.event.fixHooks[e.type] || {},
                a = u.props ? this.props.concat(u.props) : this.props;
            e = s.Event(o);
            for (r = a.length; r;) i = a[--r], e[i] = o[i];
            return e.target || (e.target = o.srcElement || n), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey === t && (e.metaKey = e.ctrlKey), u.filter ? u.filter(e, o) : e
        },
        special: {
            ready: {
                setup: s.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function (e, t, n) {
                    s.isWindow(this) && (this.onbeforeunload = n)
                },
                teardown: function (e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = s.extend(new s.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? s.event.trigger(i, null, t) : s.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, s.event.handle = s.event.dispatch, s.removeEvent = n.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        e.detachEvent && e.detachEvent("on" + t, n)
    }, s.Event = function (e, t) {
        if (!(this instanceof s.Event)) return new s.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? B : H) : this.type = e, t && s.extend(this, t), this.timeStamp = e && e.timeStamp || s.now(), this[s.expando] = !0
    }, s.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = B;
            var e = this.originalEvent;
            if (!e) return;
            e.preventDefault ? e.preventDefault() : e.returnValue = !1
        },
        stopPropagation: function () {
            this.isPropagationStopped = B;
            var e = this.originalEvent;
            if (!e) return;
            e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = B, this.stopPropagation()
        },
        isDefaultPrevented: H,
        isPropagationStopped: H,
        isImmediatePropagationStopped: H
    }, s.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        function (e, t) {
            s.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function (e) {
                    var n = this,
                        r = e.relatedTarget,
                        i = e.handleObj,
                        o = i.selector,
                        u;
                    if (!r || r !== n && !s.contains(n, r)) e.type = i.origType, u = i.handler.apply(this, arguments), e.type = t;
                    return u
                }
            }
        }), s.support.submitBubbles || (s.event.special.submit = {
        setup: function () {
            if (s.nodeName(this, "form")) return !1;
            s.event.add(this, "click._submit keypress._submit",
                function (e) {
                    var n = e.target,
                        r = s.nodeName(n, "input") || s.nodeName(n, "button") ? n.form : t;
                    r && !r._submit_attached && (s.event.add(r, "submit._submit",
                        function (e) {
                            e._submit_bubble = !0
                        }), r._submit_attached = !0)
                })
        },
        postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && s.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function () {
            if (s.nodeName(this, "form")) return !1;
            s.event.remove(this, "._submit")
        }
    }), s.support.changeBubbles || (s.event.special.change = {
        setup: function () {
            if (N.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") s.event.add(this, "propertychange._change",
                    function (e) {
                        e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                    }), s.event.add(this, "click._change",
                    function (e) {
                        this._just_changed && !e.isTrigger && (this._just_changed = !1, s.event.simulate("change", this, e, !0))
                    });
                return !1
            }
            s.event.add(this, "beforeactivate._change",
                function (e) {
                    var t = e.target;
                    N.test(t.nodeName) && !t._change_attached && (s.event.add(t, "change._change",
                        function (e) {
                            this.parentNode && !e.isSimulated && !e.isTrigger && s.event.simulate("change", this.parentNode, e, !0)
                        }), t._change_attached = !0)
                })
        },
        handle: function (e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments)
        },
        teardown: function () {
            return s.event.remove(this, "._change"), N.test(this.nodeName)
        }
    }), s.support.focusinBubbles || s.each({
            focus: "focusin",
            blur: "focusout"
        },
        function (e, t) {
            var r = 0,
                i = function (e) {
                    s.event.simulate(t, e.target, s.event.fix(e), !0)
                };
            s.event.special[t] = {
                setup: function () {
                    r++ === 0 && n.addEventListener(e, i, !0)
                },
                teardown: function () {
                    --r === 0 && n.removeEventListener(e, i, !0)
                }
            }
        }), s.fn.extend({
        on: function (e, n, r, i, o) {
            var u, a;
            if (typeof e == "object") {
                typeof n != "string" && (r = r || n, n = t);
                for (a in e) this.on(a, n, r, e[a], o);
                return this
            }
            r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
            if (i === !1) i = H;
            else if (!i) return this;
            return o === 1 && (u = i, i = function (e) {
                return s().off(e), u.apply(this, arguments)
            }, i.guid = u.guid || (u.guid = s.guid++)), this.each(function () {
                s.event.add(this, e, i, r, n)
            })
        },
        one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function (e, n, r) {
            if (e && e.preventDefault && e.handleObj) {
                var i = e.handleObj;
                return s(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this
            }
            if (typeof e == "object") {
                for (var o in e) this.off(o, n, e[o]);
                return this
            }
            if (n === !1 || typeof n == "function") r = n, n = t;
            return r === !1 && (r = H), this.each(function () {
                s.event.remove(this, e, r, n)
            })
        },
        bind: function (e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function (e, t) {
            return this.off(e, null, t)
        },
        live: function (e, t, n) {
            return s(this.context).on(e, this.selector, t, n), this
        },
        die: function (e, t) {
            return s(this.context).off(e, this.selector || "**", t), this
        },
        delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function (e, t, n) {
            return arguments.length == 1 ? this.off(e, "**") : this.off(t, e, n)
        },
        trigger: function (e, t) {
            return this.each(function () {
                s.event.trigger(e, t, this)
            })
        },
        triggerHandler: function (e, t) {
            if (this[0]) return s.event.trigger(e, t, this[0], !0)
        },
        toggle: function (e) {
            var t = arguments,
                n = e.guid || s.guid++,
                r = 0,
                i = function (n) {
                    var i = (s._data(this, "lastToggle" + e.guid) || 0) % r;
                    return s._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1
                };
            i.guid = n;
            while (r < t.length) t[r++].guid = n;
            return this.click(i)
        },
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), s.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
        function (e, t) {
            s.fn[t] = function (e, n) {
                return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }, s.attrFn && (s.attrFn[t] = !0), L.test(t) && (s.event.fixHooks[t] = s.event.keyHooks), A.test(t) && (s.event.fixHooks[t] = s.event.mouseHooks)
        }),
        function () {
            function S(e, t, n, i, s, o) {
                for (var u = 0, a = i.length; u < a; u++) {
                    var f = i[u];
                    if (f) {
                        var l = !1;
                        f = f[e];
                        while (f) {
                            if (f[r] === n) {
                                l = i[f.sizset];
                                break
                            }
                            f.nodeType === 1 && !o && (f[r] = n, f.sizset = u);
                            if (f.nodeName.toLowerCase() === t) {
                                l = f;
                                break
                            }
                            f = f[e]
                        }
                        i[u] = l
                    }
                }
            }
            function x(e, t, n, i, s, o) {
                for (var u = 0, a = i.length; u < a; u++) {
                    var f = i[u];
                    if (f) {
                        var l = !1;
                        f = f[e];
                        while (f) {
                            if (f[r] === n) {
                                l = i[f.sizset];
                                break
                            }
                            if (f.nodeType === 1) {
                                o || (f[r] = n, f.sizset = u);
                                if (typeof t != "string") {
                                    if (f === t) {
                                        l = !0;
                                        break
                                    }
                                } else if (h.filter(t, [f]).length > 0) {
                                    l = f;
                                    break
                                }
                            }
                            f = f[e]
                        }
                        i[u] = l
                    }
                }
            }
            var e = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                r = "sizcache" + (Math.random() + "").replace(".", ""),
                i = 0,
                o = Object.prototype.toString,
                u = !1,
                a = !0,
                f = /\\/g,
                l = /\r\n/g,
                c = /\W/;
            [0, 0].sort(function () {
                return a = !1, 0
            });
            var h = function (t, r, i, s) {
                i = i || [], r = r || n;
                var u = r;
                if (r.nodeType !== 1 && r.nodeType !== 9) return [];
                if (!t || typeof t != "string") return i;
                var a, f, l, c, p, m, g, b, w = !0,
                    E = h.isXML(r),
                    S = [],
                    x = t;
                do {
                    e.exec(""), a = e.exec(x);
                    if (a) {
                        x = a[3], S.push(a[1]);
                        if (a[2]) {
                            c = a[3];
                            break
                        }
                    }
                } while (a);
                if (S.length > 1 && v.exec(t)) if (S.length === 2 && d.relative[S[0]]) f = T(S[0] + S[1], r, s);
                else {
                    f = d.relative[S[0]] ? [r] : h(S.shift(), r);
                    while (S.length) t = S.shift(), d.relative[t] && (t += S.shift()), f = T(t, f, s)
                } else {
                    !s && S.length > 1 && r.nodeType === 9 && !E && d.match.ID.test(S[0]) && !d.match.ID.test(S[S.length - 1]) && (p = h.find(S.shift(), r, E), r = p.expr ? h.filter(p.expr, p.set)[0] : p.set[0]);
                    if (r) {
                        p = s ? {
                            expr: S.pop(),
                            set: y(s)
                        } : h.find(S.pop(), S.length !== 1 || S[0] !== "~" && S[0] !== "+" || !r.parentNode ? r : r.parentNode, E), f = p.expr ? h.filter(p.expr, p.set) : p.set, S.length > 0 ? l = y(f) : w = !1;
                        while (S.length) m = S.pop(), g = m, d.relative[m] ? g = S.pop() : m = "", g == null && (g = r), d.relative[m](l, g, E)
                    } else l = S = []
                }
                l || (l = f), l || h.error(m || t);
                if (o.call(l) === "[object Array]") if (!w) i.push.apply(i, l);
                else if (r && r.nodeType === 1) for (b = 0; l[b] != null; b++) l[b] && (l[b] === !0 || l[b].nodeType === 1 && h.contains(r, l[b])) && i.push(f[b]);
                else for (b = 0; l[b] != null; b++) l[b] && l[b].nodeType === 1 && i.push(f[b]);
                else y(l, i);
                return c && (h(c, u, i, s), h.uniqueSort(i)), i
            };
            h.uniqueSort = function (e) {
                if (w) {
                    u = a, e.sort(w);
                    if (u) for (var t = 1; t < e.length; t++) e[t] === e[t - 1] && e.splice(t--, 1)
                }
                return e
            }, h.matches = function (e, t) {
                return h(e, null, null, t)
            }, h.matchesSelector = function (e, t) {
                return h(t, null, null, [e]).length > 0
            }, h.find = function (e, t, n) {
                var r, i, s, o, u, a;
                if (!e) return [];
                for (i = 0, s = d.order.length; i < s; i++) {
                    u = d.order[i];
                    if (o = d.leftMatch[u].exec(e)) {
                        a = o[1], o.splice(1, 1);
                        if (a.substr(a.length - 1) !== "\\") {
                            o[1] = (o[1] || "").replace(f, ""), r = d.find[u](o, t, n);
                            if (r != null) {
                                e = e.replace(d.match[u], "");
                                break
                            }
                        }
                    }
                }
                return r || (r = typeof t.getElementsByTagName != "undefined" ? t.getElementsByTagName("*") : []), {
                    set: r,
                    expr: e
                }
            }, h.filter = function (e, n, r, i) {
                var s, o, u, a, f, l, c, p, v, m = e,
                    g = [],
                    y = n,
                    b = n && n[0] && h.isXML(n[0]);
                while (e && n.length) {
                    for (u in d.filter) if ((s = d.leftMatch[u].exec(e)) != null && s[2]) {
                        l = d.filter[u], c = s[1], o = !1, s.splice(1, 1);
                        if (c.substr(c.length - 1) === "\\") continue;
                        y === g && (g = []);
                        if (d.preFilter[u]) {
                            s = d.preFilter[u](s, y, r, g, i, b);
                            if (!s) o = a = !0;
                            else if (s === !0) continue
                        }
                        if (s) for (p = 0;
                                    (f = y[p]) != null; p++) f && (a = l(f, s, p, y), v = i ^ a, r && a != null ? v ? o = !0 : y[p] = !1 : v && (g.push(f), o = !0));
                        if (a !== t) {
                            r || (y = g), e = e.replace(d.match[u], "");
                            if (!o) return [];
                            break
                        }
                    }
                    if (e === m) {
                        if (o != null) break;
                        h.error(e)
                    }
                    m = e
                }
                return y
            }, h.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            };
            var p = h.getText = function (e) {
                var t, n, r = e.nodeType,
                    i = "";
                if (r) {
                    if (r === 1 || r === 9 || r === 11) {
                        if (typeof e.textContent == "string") return e.textContent;
                        if (typeof e.innerText == "string") return e.innerText.replace(l, "");
                        for (e = e.firstChild; e; e = e.nextSibling) i += p(e)
                    } else if (r === 3 || r === 4) return e.nodeValue
                } else for (t = 0; n = e[t]; t++) n.nodeType !== 8 && (i += p(n));
                return i
            },
                d = h.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function (e) {
                            return e.getAttribute("href")
                        },
                        type: function (e) {
                            return e.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function (e, t) {
                            var n = typeof t == "string",
                                r = n && !c.test(t),
                                i = n && !r;
                            r && (t = t.toLowerCase());
                            for (var s = 0, o = e.length, u; s < o; s++) if (u = e[s]) {
                                while ((u = u.previousSibling) && u.nodeType !== 1);
                                e[s] = i || u && u.nodeName.toLowerCase() === t ? u || !1 : u === t
                            }
                            i && h.filter(t, e, !0)
                        },
                        ">": function (e, t) {
                            var n, r = typeof t == "string",
                                i = 0,
                                s = e.length;
                            if (r && !c.test(t)) {
                                t = t.toLowerCase();
                                for (; i < s; i++) {
                                    n = e[i];
                                    if (n) {
                                        var o = n.parentNode;
                                        e[i] = o.nodeName.toLowerCase() === t ? o : !1
                                    }
                                }
                            } else {
                                for (; i < s; i++) n = e[i], n && (e[i] = r ? n.parentNode : n.parentNode === t);
                                r && h.filter(t, e, !0)
                            }
                        },
                        "": function (e, t, n) {
                            var r, s = i++,
                                o = x;
                            typeof t == "string" && !c.test(t) && (t = t.toLowerCase(), r = t, o = S), o("parentNode", t, s, e, r, n)
                        },
                        "~": function (e, t, n) {
                            var r, s = i++,
                                o = x;
                            typeof t == "string" && !c.test(t) && (t = t.toLowerCase(), r = t, o = S), o("previousSibling", t, s, e, r, n)
                        }
                    },
                    find: {
                        ID: function (e, t, n) {
                            if (typeof t.getElementById != "undefined" && !n) {
                                var r = t.getElementById(e[1]);
                                return r && r.parentNode ? [r] : []
                            }
                        },
                        NAME: function (e, t) {
                            if (typeof t.getElementsByName != "undefined") {
                                var n = [],
                                    r = t.getElementsByName(e[1]);
                                for (var i = 0, s = r.length; i < s; i++) r[i].getAttribute("name") === e[1] && n.push(r[i]);
                                return n.length === 0 ? null : n
                            }
                        },
                        TAG: function (e, t) {
                            if (typeof t.getElementsByTagName != "undefined") return t.getElementsByTagName(e[1])
                        }
                    },
                    preFilter: {
                        CLASS: function (e, t, n, r, i, s) {
                            e = " " + e[1].replace(f, "") + " ";
                            if (s) return e;
                            for (var o = 0, u;
                                 (u = t[o]) != null; o++) u && (i ^ (u.className && (" " + u.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0) ? n || r.push(u) : n && (t[o] = !1));
                            return !1
                        },
                        ID: function (e) {
                            return e[1].replace(f, "")
                        },
                        TAG: function (e, t) {
                            return e[1].replace(f, "").toLowerCase()
                        },
                        CHILD: function (e) {
                            if (e[1] === "nth") {
                                e[2] || h.error(e[0]), e[2] = e[2].replace(/^\+|\s*/g, "");
                                var t = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                                e[2] = t[1] + (t[2] || 1) - 0, e[3] = t[3] - 0
                            } else e[2] && h.error(e[0]);
                            return e[0] = i++, e
                        },
                        ATTR: function (e, t, n, r, i, s) {
                            var o = e[1] = e[1].replace(f, "");
                            return !s && d.attrMap[o] && (e[1] = d.attrMap[o]), e[4] = (e[4] || e[5] || "").replace(f, ""), e[2] === "~=" && (e[4] = " " + e[4] + " "), e
                        },
                        PSEUDO: function (t, n, r, i, s) {
                            if (t[1] === "not") {
                                if (!((e.exec(t[3]) || "").length > 1 || /^\w/.test(t[3]))) {
                                    var o = h.filter(t[3], n, r, !0 ^ s);
                                    return r || i.push.apply(i, o), !1
                                }
                                t[3] = h(t[3], null, null, n)
                            } else if (d.match.POS.test(t[0]) || d.match.CHILD.test(t[0])) return !0;
                            return t
                        },
                        POS: function (e) {
                            return e.unshift(!0), e
                        }
                    },
                    filters: {
                        enabled: function (e) {
                            return e.disabled === !1 && e.type !== "hidden"
                        },
                        disabled: function (e) {
                            return e.disabled === !0
                        },
                        checked: function (e) {
                            return e.checked === !0
                        },
                        selected: function (e) {
                            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                        },
                        parent: function (e) {
                            return !!e.firstChild
                        },
                        empty: function (e) {
                            return !e.firstChild
                        },
                        has: function (e, t, n) {
                            return !!h(n[3], e).length
                        },
                        header: function (e) {
                            return /h\d/i.test(e.nodeName)
                        },
                        text: function (e) {
                            var t = e.getAttribute("type"),
                                n = e.type;
                            return e.nodeName.toLowerCase() === "input" && "text" === n && (t === n || t === null)
                        },
                        radio: function (e) {
                            return e.nodeName.toLowerCase() === "input" && "radio" === e.type
                        },
                        checkbox: function (e) {
                            return e.nodeName.toLowerCase() === "input" && "checkbox" === e.type
                        },
                        file: function (e) {
                            return e.nodeName.toLowerCase() === "input" && "file" === e.type
                        },
                        password: function (e) {
                            return e.nodeName.toLowerCase() === "input" && "password" === e.type
                        },
                        submit: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return (t === "input" || t === "button") && "submit" === e.type
                        },
                        image: function (e) {
                            return e.nodeName.toLowerCase() === "input" && "image" === e.type
                        },
                        reset: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return (t === "input" || t === "button") && "reset" === e.type
                        },
                        button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return t === "input" && "button" === e.type || t === "button"
                        },
                        input: function (e) {
                            return /input|select|textarea|button/i.test(e.nodeName)
                        },
                        focus: function (e) {
                            return e === e.ownerDocument.activeElement
                        }
                    },
                    setFilters: {
                        first: function (e, t) {
                            return t === 0
                        },
                        last: function (e, t, n, r) {
                            return t === r.length - 1
                        },
                        even: function (e, t) {
                            return t % 2 === 0
                        },
                        odd: function (e, t) {
                            return t % 2 === 1
                        },
                        lt: function (e, t, n) {
                            return t < n[3] - 0
                        },
                        gt: function (e, t, n) {
                            return t > n[3] - 0
                        },
                        nth: function (e, t, n) {
                            return n[3] - 0 === t
                        },
                        eq: function (e, t, n) {
                            return n[3] - 0 === t
                        }
                    },
                    filter: {
                        PSEUDO: function (e, t, n, r) {
                            var i = t[1],
                                s = d.filters[i];
                            if (s) return s(e, n, t, r);
                            if (i === "contains") return (e.textContent || e.innerText || p([e]) || "").indexOf(t[3]) >= 0;
                            if (i === "not") {
                                var o = t[3];
                                for (var u = 0, a = o.length; u < a; u++) if (o[u] === e) return !1;
                                return !0
                            }
                            h.error(i)
                        },
                        CHILD: function (e, t) {
                            var n, i, s, o, u, a, f, l = t[1],
                                c = e;
                            switch (l) {
                                case "only":
                                case "first":
                                    while (c = c.previousSibling) if (c.nodeType === 1) return !1;
                                    if (l === "first") return !0;
                                    c = e;
                                case "last":
                                    while (c = c.nextSibling) if (c.nodeType === 1) return !1;
                                    return !0;
                                case "nth":
                                    n = t[2], i = t[3];
                                    if (n === 1 && i === 0) return !0;
                                    s = t[0], o = e.parentNode;
                                    if (o && (o[r] !== s || !e.nodeIndex)) {
                                        a = 0;
                                        for (c = o.firstChild; c; c = c.nextSibling) c.nodeType === 1 && (c.nodeIndex = ++a);
                                        o[r] = s
                                    }
                                    return f = e.nodeIndex - i, n === 0 ? f === 0 : f % n === 0 && f / n >= 0
                            }
                        },
                        ID: function (e, t) {
                            return e.nodeType === 1 && e.getAttribute("id") === t
                        },
                        TAG: function (e, t) {
                            return t === "*" && e.nodeType === 1 || !! e.nodeName && e.nodeName.toLowerCase() === t
                        },
                        CLASS: function (e, t) {
                            return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
                        },
                        ATTR: function (e, t) {
                            var n = t[1],
                                r = h.attr ? h.attr(e, n) : d.attrHandle[n] ? d.attrHandle[n](e) : e[n] != null ? e[n] : e.getAttribute(n),
                                i = r + "",
                                s = t[2],
                                o = t[4];
                            return r == null ? s === "!=" : !s && h.attr ? r != null : s === "=" ? i === o : s === "*=" ? i.indexOf(o) >= 0 : s === "~=" ? (" " + i + " ").indexOf(o) >= 0 : o ? s === "!=" ? i !== o : s === "^=" ? i.indexOf(o) === 0 : s === "$=" ? i.substr(i.length - o.length) === o : s === "|=" ? i === o || i.substr(0, o.length + 1) === o + "-" : !1 : i && r !== !1
                        },
                        POS: function (e, t, n, r) {
                            var i = t[2],
                                s = d.setFilters[i];
                            if (s) return s(e, n, t, r)
                        }
                    }
                },
                v = d.match.POS,
                m = function (e, t) {
                    return "\\" + (t - 0 + 1)
                };
            for (var g in d.match) d.match[g] = new RegExp(d.match[g].source + /(?![^\[]*\])(?![^\(]*\))/.source), d.leftMatch[g] = new RegExp(/(^(?:.|\r|\n)*?)/.source + d.match[g].source.replace(/\\(\d+)/g, m));
            d.match.globalPOS = v;
            var y = function (e, t) {
                return e = Array.prototype.slice.call(e, 0), t ? (t.push.apply(t, e), t) : e
            };
            try {
                Array.prototype.slice.call(n.documentElement.childNodes, 0)[0].nodeType
            } catch (b) {
                y = function (e, t) {
                    var n = 0,
                        r = t || [];
                    if (o.call(e) === "[object Array]") Array.prototype.push.apply(r, e);
                    else if (typeof e.length == "number") for (var i = e.length; n < i; n++) r.push(e[n]);
                    else for (; e[n]; n++) r.push(e[n]);
                    return r
                }
            }
            var w, E;
            n.documentElement.compareDocumentPosition ? w = function (e, t) {
                return e === t ? (u = !0, 0) : !e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition ? -1 : 1 : e.compareDocumentPosition(t) & 4 ? -1 : 1
            } : (w = function (e, t) {
                if (e === t) return u = !0, 0;
                if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
                var n, r, i = [],
                    s = [],
                    o = e.parentNode,
                    a = t.parentNode,
                    f = o;
                if (o === a) return E(e, t);
                if (!o) return -1;
                if (!a) return 1;
                while (f) i.unshift(f), f = f.parentNode;
                f = a;
                while (f) s.unshift(f), f = f.parentNode;
                n = i.length, r = s.length;
                for (var l = 0; l < n && l < r; l++) if (i[l] !== s[l]) return E(i[l], s[l]);
                return l === n ? E(e, s[l], - 1) : E(i[l], t, 1)
            }, E = function (e, t, n) {
                if (e === t) return n;
                var r = e.nextSibling;
                while (r) {
                    if (r === t) return -1;
                    r = r.nextSibling
                }
                return 1
            }),
                function () {
                    var e = n.createElement("div"),
                        r = "script" + (new Date).getTime(),
                        i = n.documentElement;
                    e.innerHTML = "<a name='" + r + "'/>", i.insertBefore(e, i.firstChild), n.getElementById(r) && (d.find.ID = function (e, n, r) {
                        if (typeof n.getElementById != "undefined" && !r) {
                            var i = n.getElementById(e[1]);
                            return i ? i.id === e[1] || typeof i.getAttributeNode != "undefined" && i.getAttributeNode("id").nodeValue === e[1] ? [i] : t : []
                        }
                    }, d.filter.ID = function (e, t) {
                        var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
                        return e.nodeType === 1 && n && n.nodeValue === t
                    }), i.removeChild(e), i = e = null
                }(),
                function () {
                    var e = n.createElement("div");
                    e.appendChild(n.createComment("")), e.getElementsByTagName("*").length > 0 && (d.find.TAG = function (e, t) {
                        var n = t.getElementsByTagName(e[1]);
                        if (e[1] === "*") {
                            var r = [];
                            for (var i = 0; n[i]; i++) n[i].nodeType === 1 && r.push(n[i]);
                            n = r
                        }
                        return n
                    }), e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute != "undefined" && e.firstChild.getAttribute("href") !== "#" && (d.attrHandle.href = function (e) {
                        return e.getAttribute("href", 2)
                    }), e = null
                }(), n.querySelectorAll && function () {
                var e = h,
                    t = n.createElement("div"),
                    r = "__sizzle__";
                t.innerHTML = "<p class='TEST'></p>";
                if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) return;
                h = function (t, i, s, o) {
                    i = i || n;
                    if (!o && !h.isXML(i)) {
                        var u = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(t);
                        if (u && (i.nodeType === 1 || i.nodeType === 9)) {
                            if (u[1]) return y(i.getElementsByTagName(t), s);
                            if (u[2] && d.find.CLASS && i.getElementsByClassName) return y(i.getElementsByClassName(u[2]), s)
                        }
                        if (i.nodeType === 9) {
                            if (t === "body" && i.body) return y([i.body], s);
                            if (u && u[3]) {
                                var a = i.getElementById(u[3]);
                                if (!a || !a.parentNode) return y([], s);
                                if (a.id === u[3]) return y([a], s)
                            }
                            try {
                                return y(i.querySelectorAll(t), s)
                            } catch (f) {}
                        } else if (i.nodeType === 1 && i.nodeName.toLowerCase() !== "object") {
                            var l = i,
                                c = i.getAttribute("id"),
                                p = c || r,
                                v = i.parentNode,
                                m = /^\s*[+~]/.test(t);
                            c ? p = p.replace(/'/g, "\\$&") : i.setAttribute("id", p), m && v && (i = i.parentNode);
                            try {
                                if (!m || v) return y(i.querySelectorAll("[id='" + p + "'] " + t), s)
                            } catch (g) {} finally {
                                c || l.removeAttribute("id")
                            }
                        }
                    }
                    return e(t, i, s, o)
                };
                for (var i in e) h[i] = e[i];
                t = null
            }(),
                function () {
                    var e = n.documentElement,
                        t = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
                    if (t) {
                        var r = !t.call(n.createElement("div"), "div"),
                            i = !1;
                        try {
                            t.call(n.documentElement, "[test!='']:sizzle")
                        } catch (s) {
                            i = !0
                        }
                        h.matchesSelector = function (e, n) {
                            n = n.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                            if (!h.isXML(e)) try {
                                if (i || !d.match.PSEUDO.test(n) && !/!=/.test(n)) {
                                    var s = t.call(e, n);
                                    if (s || !r || e.document && e.document.nodeType !== 11) return s
                                }
                            } catch (o) {}
                            return h(n, null, null, [e]).length > 0
                        }
                    }
                }(),
                function () {
                    var e = n.createElement("div");
                    e.innerHTML = "<div class='test e'></div><div class='test'></div>";
                    if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) return;
                    e.lastChild.className = "e";
                    if (e.getElementsByClassName("e").length === 1) return;
                    d.order.splice(1, 0, "CLASS"), d.find.CLASS = function (e, t, n) {
                        if (typeof t.getElementsByClassName != "undefined" && !n) return t.getElementsByClassName(e[1])
                    }, e = null
                }(), n.documentElement.contains ? h.contains = function (e, t) {
                return e !== t && (e.contains ? e.contains(t) : !0)
            } : n.documentElement.compareDocumentPosition ? h.contains = function (e, t) {
                return !!(e.compareDocumentPosition(t) & 16)
            } : h.contains = function () {
                return !1
            }, h.isXML = function (e) {
                var t = (e ? e.ownerDocument || e : 0).documentElement;
                return t ? t.nodeName !== "HTML" : !1
            };
            var T = function (e, t, n) {
                var r, i = [],
                    s = "",
                    o = t.nodeType ? [t] : t;
                while (r = d.match.PSEUDO.exec(e)) s += r[0], e = e.replace(d.match.PSEUDO, "");
                e = d.relative[e] ? e + "*" : e;
                for (var u = 0, a = o.length; u < a; u++) h(e, o[u], i, n);
                return h.filter(s, i)
            };
            h.attr = s.attr, h.selectors.attrMap = {}, s.find = h, s.expr = h.selectors, s.expr[":"] = s.expr.filters, s.unique = h.uniqueSort, s.text = h.getText, s.isXMLDoc = h.isXML, s.contains = h.contains
        }();
    var j = /Until$/,
        F = /^(?:parents|prevUntil|prevAll)/,
        I = /,/,
        q = /^.[^:#\[\.,]*$/,
        R = Array.prototype.slice,
        U = s.expr.match.globalPOS,
        z = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    s.fn.extend({
        find: function (e) {
            var t = this,
                n, r;
            if (typeof e != "string") return s(e).filter(function () {
                for (n = 0, r = t.length; n < r; n++) if (s.contains(t[n], this)) return !0
            });
            var i = this.pushStack("", "find", e),
                o, u, a;
            for (n = 0, r = this.length; n < r; n++) {
                o = i.length, s.find(e, this[n], i);
                if (n > 0) for (u = o; u < i.length; u++) for (a = 0; a < o; a++) if (i[a] === i[u]) {
                    i.splice(u--, 1);
                    break
                }
            }
            return i
        },
        has: function (e) {
            var t = s(e);
            return this.filter(function () {
                for (var e = 0, n = t.length; e < n; e++) if (s.contains(this, t[e])) return !0
            })
        },
        not: function (e) {
            return this.pushStack(X(this, e, !1), "not", e)
        },
        filter: function (e) {
            return this.pushStack(X(this, e, !0), "filter", e)
        },
        is: function (e) {
            return !!e && (typeof e == "string" ? U.test(e) ? s(e, this.context).index(this[0]) >= 0 : s.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function (e, t) {
            var n = [],
                r, i, o = this[0];
            if (s.isArray(e)) {
                var u = 1;
                while (o && o.ownerDocument && o !== t) {
                    for (r = 0; r < e.length; r++) s(o).is(e[r]) && n.push({
                        selector: e[r],
                        elem: o,
                        level: u
                    });
                    o = o.parentNode, u++
                }
                return n
            }
            var a = U.test(e) || typeof e != "string" ? s(e, t || this.context) : 0;
            for (r = 0, i = this.length; r < i; r++) {
                o = this[r];
                while (o) {
                    if (a ? a.index(o) > -1 : s.find.matchesSelector(o, e)) {
                        n.push(o);
                        break
                    }
                    o = o.parentNode;
                    if (!o || !o.ownerDocument || o === t || o.nodeType === 11) break
                }
            }
            return n = n.length > 1 ? s.unique(n) : n, this.pushStack(n, "closest", e)
        },
        index: function (e) {
            return e ? typeof e == "string" ? s.inArray(this[0], s(e)) : s.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function (e, t) {
            var n = typeof e == "string" ? s(e, t) : s.makeArray(e && e.nodeType ? [e] : e),
                r = s.merge(this.get(), n);
            return this.pushStack(W(n[0]) || W(r[0]) ? r : s.unique(r))
        },
        andSelf: function () {
            return this.add(this.prevObject)
        }
    }), s.each({
            parent: function (e) {
                var t = e.parentNode;
                return t && t.nodeType !== 11 ? t : null
            },
            parents: function (e) {
                return s.dir(e, "parentNode")
            },
            parentsUntil: function (e, t, n) {
                return s.dir(e, "parentNode", n)
            },
            next: function (e) {
                return s.nth(e, 2, "nextSibling")
            },
            prev: function (e) {
                return s.nth(e, 2, "previousSibling")
            },
            nextAll: function (e) {
                return s.dir(e, "nextSibling")
            },
            prevAll: function (e) {
                return s.dir(e, "previousSibling")
            },
            nextUntil: function (e, t, n) {
                return s.dir(e, "nextSibling", n)
            },
            prevUntil: function (e, t, n) {
                return s.dir(e, "previousSibling", n)
            },
            siblings: function (e) {
                return s.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function (e) {
                return s.sibling(e.firstChild)
            },
            contents: function (e) {
                return s.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : s.makeArray(e.childNodes)
            }
        },
        function (e, t) {
            s.fn[e] = function (n, r) {
                var i = s.map(this, t, n);
                return j.test(e) || (r = n), r && typeof r == "string" && (i = s.filter(r, i)), i = this.length > 1 && !z[e] ? s.unique(i) : i, (this.length > 1 || I.test(r)) && F.test(e) && (i = i.reverse()), this.pushStack(i, e, R.call(arguments).join(","))
            }
        }), s.extend({
        filter: function (e, t, n) {
            return n && (e = ":not(" + e + ")"), t.length === 1 ? s.find.matchesSelector(t[0], e) ? [t[0]] : [] : s.find.matches(e, t)
        },
        dir: function (e, n, r) {
            var i = [],
                o = e[n];
            while (o && o.nodeType !== 9 && (r === t || o.nodeType !== 1 || !s(o).is(r))) o.nodeType === 1 && i.push(o), o = o[n];
            return i
        },
        nth: function (e, t, n, r) {
            t = t || 1;
            var i = 0;
            for (; e; e = e[n]) if (e.nodeType === 1 && ++i === t) break;
            return e
        },
        sibling: function (e, t) {
            var n = [];
            for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    });
    var $ = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        J = / jQuery\d+="(?:\d+|null)"/g,
        K = /^\s+/,
        Q = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        G = /<([\w:]+)/,
        Y = /<tbody/i,
        Z = /<|&#?\w+;/,
        et = /<(?:script|style)/i,
        tt = /<(?:script|object|embed|option|style)/i,
        nt = new RegExp("<(?:" + $ + ")[\\s/>]", "i"),
        rt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        it = /\/(java|ecma)script/i,
        st = /^\s*<!(?:\[CDATA\[|\-\-)/,
        ot = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        ut = V(n);
    ot.optgroup = ot.option, ot.tbody = ot.tfoot = ot.colgroup = ot.caption = ot.thead, ot.th = ot.td, s.support.htmlSerialize || (ot._default = [1, "div<div>", "</div>"]), s.fn.extend({
        text: function (e) {
            return s.access(this,
                function (e) {
                    return e === t ? s.text(this) : this.empty().append((this[0] && this[0].ownerDocument || n).createTextNode(e))
                }, null, e, arguments.length)
        },
        wrapAll: function (e) {
            if (s.isFunction(e)) return this.each(function (t) {
                s(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = s(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    var e = this;
                    while (e.firstChild && e.firstChild.nodeType === 1) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function (e) {
            return s.isFunction(e) ? this.each(function (t) {
                s(this).wrapInner(e.call(this, t))
            }) : this.each(function () {
                var t = s(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function (e) {
            var t = s.isFunction(e);
            return this.each(function (n) {
                s(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                s.nodeName(this, "body") || s(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, !0,
                function (e) {
                    this.nodeType === 1 && this.appendChild(e)
                })
        },
        prepend: function () {
            return this.domManip(arguments, !0,
                function (e) {
                    this.nodeType === 1 && this.insertBefore(e, this.firstChild)
                })
        },
        before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1,
                function (e) {
                    this.parentNode.insertBefore(e, this)
                });
            if (arguments.length) {
                var e = s.clean(arguments);
                return e.push.apply(e, this.toArray()), this.pushStack(e, "before", arguments)
            }
        },
        after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1,
                function (e) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                });
            if (arguments.length) {
                var e = this.pushStack(this, "after", arguments);
                return e.push.apply(e, s.clean(arguments)), e
            }
        },
        remove: function (e, t) {
            for (var n = 0, r;
                 (r = this[n]) != null; n++) if (!e || s.filter(e, [r]).length)!t && r.nodeType === 1 && (s.cleanData(r.getElementsByTagName("*")), s.cleanData([r])), r.parentNode && r.parentNode.removeChild(r);
            return this
        },
        empty: function () {
            for (var e = 0, t;
                 (t = this[e]) != null; e++) {
                t.nodeType === 1 && s.cleanData(t.getElementsByTagName("*"));
                while (t.firstChild) t.removeChild(t.firstChild)
            }
            return this
        },
        clone: function (e, t) {
            return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
                return s.clone(this, e, t)
            })
        },
        html: function (e) {
            return s.access(this,
                function (e) {
                    var n = this[0] || {},
                        r = 0,
                        i = this.length;
                    if (e === t) return n.nodeType === 1 ? n.innerHTML.replace(J, "") : null;
                    if (typeof e == "string" && !et.test(e) && (s.support.leadingWhitespace || !K.test(e)) && !ot[(G.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = e.replace(Q, "<$1></$2>");
                        try {
                            for (; r < i; r++) n = this[r] || {}, n.nodeType === 1 && (s.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
                            n = 0
                        } catch (o) {}
                    }
                    n && this.empty().append(e)
                }, null, e, arguments.length)
        },
        replaceWith: function (e) {
            return this[0] && this[0].parentNode ? s.isFunction(e) ? this.each(function (t) {
                var n = s(this),
                    r = n.html();
                n.replaceWith(e.call(this, t, r))
            }) : (typeof e != "string" && (e = s(e).detach()), this.each(function () {
                var t = this.nextSibling,
                    n = this.parentNode;
                s(this).remove(), t ? s(t).before(e) : s(n).append(e)
            })) : this.length ? this.pushStack(s(s.isFunction(e) ? e() : e), "replaceWith", e) : this
        },
        detach: function (e) {
            return this.remove(e, !0)
        },
        domManip: function (e, n, r) {
            var i, o, u, a, f = e[0],
                l = [];
            if (!s.support.checkClone && arguments.length === 3 && typeof f == "string" && rt.test(f)) return this.each(function () {
                s(this).domManip(e, n, r, !0)
            });
            if (s.isFunction(f)) return this.each(function (i) {
                var o = s(this);
                e[0] = f.call(this, i, n ? o.html() : t), o.domManip(e, n, r)
            });
            if (this[0]) {
                a = f && f.parentNode, s.support.parentNode && a && a.nodeType === 11 && a.childNodes.length === this.length ? i = {
                    fragment: a
                } : i = s.buildFragment(e, this, l), u = i.fragment, u.childNodes.length === 1 ? o = u = u.firstChild : o = u.firstChild;
                if (o) {
                    n = n && s.nodeName(o, "tr");
                    for (var c = 0, h = this.length, p = h - 1; c < h; c++) r.call(n ? at(this[c], o) : this[c], i.cacheable || h > 1 && c < p ? s.clone(u, !0, !0) : u)
                }
                l.length && s.each(l,
                    function (e, t) {
                        t.src ? s.ajax({
                            type: "GET",
                            global: !1,
                            url: t.src,
                            async: !1,
                            dataType: "script"
                        }) : s.globalEval((t.text || t.textContent || t.innerHTML || "").replace(st, "/*$0*/")), t.parentNode && t.parentNode.removeChild(t)
                    })
            }
            return this
        }
    }), s.buildFragment = function (e, t, r) {
        var i, o, u, a, f = e[0];
        return t && t[0] && (a = t[0].ownerDocument || t[0]), a.createDocumentFragment || (a = n), e.length === 1 && typeof f == "string" && f.length < 512 && a === n && f.charAt(0) === "<" && !tt.test(f) && (s.support.checkClone || !rt.test(f)) && (s.support.html5Clone || !nt.test(f)) && (o = !0, u = s.fragments[f], u && u !== 1 && (i = u)), i || (i = a.createDocumentFragment(), s.clean(e, a, i, r)), o && (s.fragments[f] = u ? i : 1), {
            fragment: i,
            cacheable: o
        }
    }, s.fragments = {}, s.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        },
        function (e, t) {
            s.fn[e] = function (n) {
                var r = [],
                    i = s(n),
                    o = this.length === 1 && this[0].parentNode;
                if (o && o.nodeType === 11 && o.childNodes.length === 1 && i.length === 1) return i[t](this[0]), this;
                for (var u = 0, a = i.length; u < a; u++) {
                    var f = (u > 0 ? this.clone(!0) : this).get();
                    s(i[u])[t](f), r = r.concat(f)
                }
                return this.pushStack(r, e, i.selector)
            }
        }), s.extend({
        clone: function (e, t, n) {
            var r, i, o, u = s.support.html5Clone || s.isXMLDoc(e) || !nt.test("<" + e.nodeName + ">") ? e.cloneNode(!0) : dt(e);
            if ((!s.support.noCloneEvent || !s.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !s.isXMLDoc(e)) {
                lt(e, u), r = ct(e), i = ct(u);
                for (o = 0; r[o]; ++o) i[o] && lt(r[o], i[o])
            }
            if (t) {
                ft(e, u);
                if (n) {
                    r = ct(e), i = ct(u);
                    for (o = 0; r[o]; ++o) ft(r[o], i[o])
                }
            }
            return r = i = null, u
        },
        clean: function (e, t, r, i) {
            var o, u, a, f = [];
            t = t || n, typeof t.createElement == "undefined" && (t = t.ownerDocument || t[0] && t[0].ownerDocument || n);
            for (var l = 0, c;
                 (c = e[l]) != null; l++) {
                typeof c == "number" && (c += "");
                if (!c) continue;
                if (typeof c == "string") if (!Z.test(c)) c = t.createTextNode(c);
                else {
                    c = c.replace(Q, "<$1></$2>");
                    var h = (G.exec(c) || ["", ""])[1].toLowerCase(),
                        p = ot[h] || ot._default,
                        d = p[0],
                        v = t.createElement("div"),
                        m = ut.childNodes,
                        g;
                    t === n ? ut.appendChild(v) : V(t).appendChild(v), v.innerHTML = p[1] + c + p[2];
                    while (d--) v = v.lastChild;
                    if (!s.support.tbody) {
                        var y = Y.test(c),
                            b = h === "table" && !y ? v.firstChild && v.firstChild.childNodes : p[1] === "<table>" && !y ? v.childNodes : [];
                        for (a = b.length - 1; a >= 0; --a) s.nodeName(b[a], "tbody") && !b[a].childNodes.length && b[a].parentNode.removeChild(b[a])
                    }!s.support.leadingWhitespace && K.test(c) && v.insertBefore(t.createTextNode(K.exec(c)[0]), v.firstChild), c = v.childNodes, v && (v.parentNode.removeChild(v), m.length > 0 && (g = m[m.length - 1], g && g.parentNode && g.parentNode.removeChild(g)))
                }
                var w;
                if (!s.support.appendChecked) if (c[0] && typeof (w = c.length) == "number") for (a = 0; a < w; a++) pt(c[a]);
                else pt(c);
                c.nodeType ? f.push(c) : f = s.merge(f, c)
            }
            if (r) {
                o = function (e) {
                    return !e.type || it.test(e.type)
                };
                for (l = 0; f[l]; l++) {
                    u = f[l];
                    if (i && s.nodeName(u, "script") && (!u.type || it.test(u.type))) i.push(u.parentNode ? u.parentNode.removeChild(u) : u);
                    else {
                        if (u.nodeType === 1) {
                            var E = s.grep(u.getElementsByTagName("script"), o);
                            f.splice.apply(f, [l + 1, 0].concat(E))
                        }
                        r.appendChild(u)
                    }
                }
            }
            return f
        },
        cleanData: function (e) {
            var t, n, r = s.cache,
                i = s.event.special,
                o = s.support.deleteExpando;
            for (var u = 0, a;
                 (a = e[u]) != null; u++) {
                if (a.nodeName && s.noData[a.nodeName.toLowerCase()]) continue;
                n = a[s.expando];
                if (n) {
                    t = r[n];
                    if (t && t.events) {
                        for (var f in t.events) i[f] ? s.event.remove(a, f) : s.removeEvent(a, f, t.handle);
                        t.handle && (t.handle.elem = null)
                    }
                    o ? delete a[s.expando] : a.removeAttribute && a.removeAttribute(s.expando), delete r[n]
                }
            }
        }
    });
    var vt = /alpha\([^)]*\)/i,
        mt = /opacity=([^)]*)/,
        gt = /([A-Z]|^ms)/g,
        yt = /^[\-+]?(?:\d*\.)?\d+$/i,
        bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        wt = /^([\-+])=([\-+.\de]+)/,
        Et = /^margin/,
        St = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        xt = ["Top", "Right", "Bottom", "Left"],
        Tt, Nt, Ct;
    s.fn.css = function (e, n) {
        return s.access(this,
            function (e, n, r) {
                return r !== t ? s.style(e, n, r) : s.css(e, n)
            }, e, n, arguments.length > 1)
    }, s.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = Tt(e, "opacity");
                        return n === "" ? "1" : n
                    }
                    return e.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": s.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
            var o, u, a = s.camelCase(n),
                f = e.style,
                l = s.cssHooks[a];
            n = s.cssProps[a] || a;
            if (r === t) return l && "get" in l && (o = l.get(e, !1, i)) !== t ? o : f[n];
            u = typeof r, u === "string" && (o = wt.exec(r)) && (r = +(o[1] + 1) * +o[2] + parseFloat(s.css(e, n)), u = "number");
            if (r == null || u === "number" && isNaN(r)) return;
            u === "number" && !s.cssNumber[a] && (r += "px");
            if (!l || !("set" in l) || (r = l.set(e, r)) !== t) try {
                f[n] = r
            } catch (c) {}
        },
        css: function (e, n, r) {
            var i, o;
            n = s.camelCase(n), o = s.cssHooks[n], n = s.cssProps[n] || n, n === "cssFloat" && (n = "float");
            if (o && "get" in o && (i = o.get(e, !0, r)) !== t) return i;
            if (Tt) return Tt(e, n)
        },
        swap: function (e, t, n) {
            var r = {},
                i, s;
            for (s in t) r[s] = e.style[s], e.style[s] = t[s];
            i = n.call(e);
            for (s in t) e.style[s] = r[s];
            return i
        }
    }), s.curCSS = s.css, n.defaultView && n.defaultView.getComputedStyle && (Nt = function (e, t) {
        var n, r, i, o, u = e.style;
        return t = t.replace(gt, "-$1").toLowerCase(), (r = e.ownerDocument.defaultView) && (i = r.getComputedStyle(e, null)) && (n = i.getPropertyValue(t), n === "" && !s.contains(e.ownerDocument.documentElement, e) && (n = s.style(e, t))), !s.support.pixelMargin && i && Et.test(t) && bt.test(n) && (o = u.width, u.width = n, n = i.width, u.width = o), n
    }), n.documentElement.currentStyle && (Ct = function (e, t) {
        var n, r, i, s = e.currentStyle && e.currentStyle[t],
            o = e.style;
        return s == null && o && (i = o[t]) && (s = i), bt.test(s) && (n = o.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), o.left = t === "fontSize" ? "1em" : s, s = o.pixelLeft + "px", o.left = n, r && (e.runtimeStyle.left = r)), s === "" ? "auto" : s
    }), Tt = Nt || Ct, s.each(["height", "width"],
        function (e, t) {
            s.cssHooks[t] = {
                get: function (e, n, r) {
                    if (n) return e.offsetWidth !== 0 ? kt(e, t, r) : s.swap(e, St,
                        function () {
                            return kt(e, t, r)
                        })
                },
                set: function (e, t) {
                    return yt.test(t) ? t + "px" : t
                }
            }
        }), s.support.opacity || (s.cssHooks.opacity = {
        get: function (e, t) {
            return mt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : t ? "1" : ""
        },
        set: function (e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = s.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                o = r && r.filter || n.filter || "";
            n.zoom = 1;
            if (t >= 1 && s.trim(o.replace(vt, "")) === "") {
                n.removeAttribute("filter");
                if (r && !r.filter) return
            }
            n.filter = vt.test(o) ? o.replace(vt, i) : o + " " + i
        }
    }), s(function () {
        s.support.reliableMarginRight || (s.cssHooks.marginRight = {
            get: function (e, t) {
                return s.swap(e, {
                        display: "inline-block"
                    },
                    function () {
                        return t ? Tt(e, "margin-right") : e.style.marginRight
                    })
            }
        })
    }), s.expr && s.expr.filters && (s.expr.filters.hidden = function (e) {
        var t = e.offsetWidth,
            n = e.offsetHeight;
        return t === 0 && n === 0 || !s.support.reliableHiddenOffsets && (e.style && e.style.display || s.css(e, "display")) === "none"
    }, s.expr.filters.visible = function (e) {
        return !s.expr.filters.hidden(e)
    }), s.each({
            margin: "",
            padding: "",
            border: "Width"
        },
        function (e, t) {
            s.cssHooks[e + t] = {
                expand: function (n) {
                    var r, i = typeof n == "string" ? n.split(" ") : [n],
                        s = {};
                    for (r = 0; r < 4; r++) s[e + xt[r] + t] = i[r] || i[r - 2] || i[0];
                    return s
                }
            }
        });
    var Lt = /%20/g,
        At = /\[\]$/,
        Ot = /\r?\n/g,
        Mt = /#.*$/,
        _t = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        Dt = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Pt = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        Ht = /^(?:GET|HEAD)$/,
        Bt = /^\/\//,
        jt = /\?/,
        Ft = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        It = /^(?:select|textarea)/i,
        qt = /\s+/,
        Rt = /([?&])_=[^&]*/,
        Ut = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        zt = s.fn.load,
        Wt = {},
        Xt = {},
        Vt, $t, Jt = ["*/"] + ["*"];
    try {
        Vt = i.href
    } catch (Kt) {
        Vt = n.createElement("a"), Vt.href = "", Vt = Vt.href
    }
    $t = Ut.exec(Vt.toLowerCase()) || [], s.fn.extend({
        load: function (e, n, r) {
            if (typeof e != "string" && zt) return zt.apply(this, arguments);
            if (!this.length) return this;
            var i = e.indexOf(" ");
            if (i >= 0) {
                var o = e.slice(i, e.length);
                e = e.slice(0, i)
            }
            var u = "GET";
            n && (s.isFunction(n) ? (r = n, n = t) : typeof n == "object" && (n = s.param(n, s.ajaxSettings.traditional), u = "POST"));
            var a = this;
            return s.ajax({
                url: e,
                type: u,
                dataType: "html",
                data: n,
                complete: function (e, t, n) {
                    n = e.responseText, e.isResolved() && (e.done(function (e) {
                        n = e
                    }), a.html(o ? s("<div>").append(n.replace(Ft, "")).find(o) : n)), r && a.each(r, [n, t, e])
                }
            }), this
        },
        serialize: function () {
            return s.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? s.makeArray(this.elements) : this
            }).filter(function () {
                    return this.name && !this.disabled && (this.checked || It.test(this.nodeName) || Dt.test(this.type))
                }).map(function (e, t) {
                    var n = s(this).val();
                    return n == null ? null : s.isArray(n) ? s.map(n,
                        function (e, n) {
                            return {
                                name: t.name,
                                value: e.replace(Ot, "\r\n")
                            }
                        }) : {
                        name: t.name,
                        value: n.replace(Ot, "\r\n")
                    }
                }).get()
        }
    }), s.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
        function (e, t) {
            s.fn[t] = function (e) {
                return this.on(t, e)
            }
        }), s.each(["get", "post"],
        function (e, n) {
            s[n] = function (e, r, i, o) {
                return s.isFunction(r) && (o = o || i, i = r, r = t), s.ajax({
                    type: n,
                    url: e,
                    data: r,
                    success: i,
                    dataType: o
                })
            }
        }), s.extend({
        getScript: function (e, n) {
            return s.get(e, t, n, "script")
        },
        getJSON: function (e, t, n) {
            return s.get(e, t, n, "json")
        },
        ajaxSetup: function (e, t) {
            return t ? Yt(e, s.ajaxSettings) : (t = e, e = s.ajaxSettings), Yt(e, t), e
        },
        ajaxSettings: {
            url: Vt,
            isLocal: Pt.test($t[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Jt
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": s.parseJSON,
                "text xml": s.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Qt(Wt),
        ajaxTransport: Qt(Xt),
        ajax: function (e, n) {
            function S(e, n, c, h) {
                if (y === 2) return;
                y = 2, m && clearTimeout(m), v = t, p = h || "", E.readyState = e > 0 ? 4 : 0;
                var d, g, w, S = n,
                    x = c ? en(r, E, c) : t,
                    T, N;
                if (e >= 200 && e < 300 || e === 304) {
                    if (r.ifModified) {
                        if (T = E.getResponseHeader("Last-Modified")) s.lastModified[l] = T;
                        if (N = E.getResponseHeader("Etag")) s.etag[l] = N
                    }
                    if (e === 304) S = "notmodified", d = !0;
                    else try {
                        g = tn(r, x), S = "success", d = !0
                    } catch (C) {
                        S = "parsererror", w = C
                    }
                } else {
                    w = S;
                    if (!S || e) S = "error", e < 0 && (e = 0)
                }
                E.status = e, E.statusText = "" + (n || S), d ? u.resolveWith(i, [g, S, E]) : u.rejectWith(i, [E, S, w]), E.statusCode(f), f = t, b && o.trigger("ajax" + (d ? "Success" : "Error"), [E, r, d ? g : w]), a.fireWith(i, [E, S]), b && (o.trigger("ajaxComplete", [E, r]), --s.active || s.event.trigger("ajaxStop"))
            }
            typeof e == "object" && (n = e, e = t), n = n || {};
            var r = s.ajaxSetup({}, n),
                i = r.context || r,
                o = i !== r && (i.nodeType || i instanceof s) ? s(i) : s.event,
                u = s.Deferred(),
                a = s.Callbacks("once memory"),
                f = r.statusCode || {},
                l, c = {},
                h = {},
                p, d, v, m, g, y = 0,
                b, w, E = {
                readyState: 0,
                setRequestHeader: function (e, t) {
                    if (!y) {
                        var n = e.toLowerCase();
                        e = h[n] = h[n] || e, c[e] = t
                    }
                    return this
                },
                getAllResponseHeaders: function () {
                    return y === 2 ? p : null
                },
                getResponseHeader: function (e) {
                    var n;
                    if (y === 2) {
                        if (!d) {
                            d = {};
                            while (n = _t.exec(p)) d[n[1].toLowerCase()] = n[2]
                        }
                        n = d[e.toLowerCase()]
                    }
                    return n === t ? null : n
                },
                overrideMimeType: function (e) {
                    return y || (r.mimeType = e), this
                },
                abort: function (e) {
                    return e = e || "abort", v && v.abort(e), S(0, e), this
                }
            };
            u.promise(E), E.success = E.done, E.error = E.fail, E.complete = a.add, E.statusCode = function (e) {
                if (e) {
                    var t;
                    if (y < 2) for (t in e) f[t] = [f[t], e[t]];
                    else t = e[E.status], E.then(t, t)
                }
                return this
            }, r.url = ((e || r.url) + "").replace(Mt, "").replace(Bt, $t[1] + "//"), r.dataTypes = s.trim(r.dataType || "*").toLowerCase().split(qt), r.crossDomain == null && (g = Ut.exec(r.url.toLowerCase()), r.crossDomain = !(!g || g[1] == $t[1] && g[2] == $t[2] && (g[3] || (g[1] === "http:" ? 80 : 443)) == ($t[3] || ($t[1] === "http:" ? 80 : 443)))), r.data && r.processData && typeof r.data != "string" && (r.data = s.param(r.data, r.traditional)), Gt(Wt, r, n, E);
            if (y === 2) return !1;
            b = r.global, r.type = r.type.toUpperCase(), r.hasContent = !Ht.test(r.type), b && s.active++ === 0 && s.event.trigger("ajaxStart");
            if (!r.hasContent) {
                r.data && (r.url += (jt.test(r.url) ? "&" : "?") + r.data, delete r.data), l = r.url;
                if (r.cache === !1) {
                    var x = s.now(),
                        T = r.url.replace(Rt, "$1_=" + x);
                    r.url = T + (T === r.url ? (jt.test(r.url) ? "&" : "?") + "_=" + x : "")
                }
            }(r.data && r.hasContent && r.contentType !== !1 || n.contentType) && E.setRequestHeader("Content-Type", r.contentType), r.ifModified && (l = l || r.url, s.lastModified[l] && E.setRequestHeader("If-Modified-Since", s.lastModified[l]), s.etag[l] && E.setRequestHeader("If-None-Match", s.etag[l])), E.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + (r.dataTypes[0] !== "*" ? ", " + Jt + "; q=0.01" : "") : r.accepts["*"]);
            for (w in r.headers) E.setRequestHeader(w, r.headers[w]);
            if (!r.beforeSend || r.beforeSend.call(i, E, r) !== !1 && y !== 2) {
                for (w in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) E[w](r[w]);
                v = Gt(Xt, r, n, E);
                if (!v) S(-1, "No Transport");
                else {
                    E.readyState = 1, b && o.trigger("ajaxSend", [E, r]), r.async && r.timeout > 0 && (m = setTimeout(function () {
                        E.abort("timeout")
                    }, r.timeout));
                    try {
                        y = 1, v.send(c, S)
                    } catch (N) {
                        if (!(y < 2)) throw N;
                        S(-1, N)
                    }
                }
                return E
            }
            return E.abort(), !1
        },
        param: function (e, n) {
            var r = [],
                i = function (e, t) {
                    t = s.isFunction(t) ? t() : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            n === t && (n = s.ajaxSettings.traditional);
            if (s.isArray(e) || e.jquery && !s.isPlainObject(e)) s.each(e,
                function () {
                    i(this.name, this.value)
                });
            else for (var o in e) Zt(o, e[o], n, i);
            return r.join("&").replace(Lt, "+")
        }
    }), s.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var nn = s.now(),
        rn = /(\=)\?(&|$)|\?\?/i;
    s.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            return s.expando + "_" + nn++
        }
    }), s.ajaxPrefilter("json jsonp",
        function (t, n, r) {
            var i = typeof t.data == "string" && /^application\/x\-www\-form\-urlencoded/.test(t.contentType);
            if (t.dataTypes[0] === "jsonp" || t.jsonp !== !1 && (rn.test(t.url) || i && rn.test(t.data))) {
                var o, u = t.jsonpCallback = s.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
                    a = e[u],
                    f = t.url,
                    l = t.data,
                    c = "$1" + u + "$2";
                return t.jsonp !== !1 && (f = f.replace(rn, c), t.url === f && (i && (l = l.replace(rn, c)), t.data === l && (f += (/\?/.test(f) ? "&" : "?") + t.jsonp + "=" + u))), t.url = f, t.data = l, e[u] = function (e) {
                    o = [e]
                }, r.always(function () {
                    e[u] = a, o && s.isFunction(a) && e[u](o[0])
                }), t.converters["script json"] = function () {
                    return o || s.error(u + " was not called"), o[0]
                }, t.dataTypes[0] = "json", "script"
            }
        }), s.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (e) {
                return s.globalEval(e), e
            }
        }
    }), s.ajaxPrefilter("script",
        function (e) {
            e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
        }), s.ajaxTransport("script",
        function (e) {
            if (e.crossDomain) {
                var r, i = n.head || n.getElementsByTagName("head")[0] || n.documentElement;
                return {
                    send: function (s, o) {
                        r = n.createElement("script"), r.async = "async", e.scriptCharset && (r.charset = e.scriptCharset), r.src = e.url, r.onload = r.onreadystatechange = function (e, n) {
                            if (n || !r.readyState || /loaded|complete/.test(r.readyState)) r.onload = r.onreadystatechange = null, i && r.parentNode && i.removeChild(r), r = t, n || o(200, "success")
                        }, i.insertBefore(r, i.firstChild)
                    },
                    abort: function () {
                        r && r.onload(0, 1)
                    }
                }
            }
        });
    var sn = e.ActiveXObject ? function () {
        for (var e in un) un[e](0, 1)
    } : !1,
        on = 0,
        un;
    s.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return !this.isLocal && an() || fn()
    } : an,
        function (e) {
            s.extend(s.support, {
                ajax: !! e,
                cors: !! e && "withCredentials" in e
            })
        }(s.ajaxSettings.xhr()), s.support.ajax && s.ajaxTransport(function (n) {
        if (!n.crossDomain || s.support.cors) {
            var r;
            return {
                send: function (i, o) {
                    var u = n.xhr(),
                        a, f;
                    n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async);
                    if (n.xhrFields) for (f in n.xhrFields) u[f] = n.xhrFields[f];
                    n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (f in i) u.setRequestHeader(f, i[f])
                    } catch (l) {}
                    u.send(n.hasContent && n.data || null), r = function (e, i) {
                        var f, l, c, h, p;
                        try {
                            if (r && (i || u.readyState === 4)) {
                                r = t, a && (u.onreadystatechange = s.noop, sn && delete un[a]);
                                if (i) u.readyState !== 4 && u.abort();
                                else {
                                    f = u.status, c = u.getAllResponseHeaders(), h = {}, p = u.responseXML, p && p.documentElement && (h.xml = p);
                                    try {
                                        h.text = u.responseText
                                    } catch (e) {}
                                    try {
                                        l = u.statusText
                                    } catch (d) {
                                        l = ""
                                    }!f && n.isLocal && !n.crossDomain ? f = h.text ? 200 : 404 : f === 1223 && (f = 204)
                                }
                            }
                        } catch (v) {
                            i || o(-1, v)
                        }
                        h && o(f, l, h, c)
                    }, !n.async || u.readyState === 4 ? r() : (a = ++on, sn && (un || (un = {}, s(e).unload(sn)), un[a] = r), u.onreadystatechange = r)
                },
                abort: function () {
                    r && r(0, 1)
                }
            }
        }
    });
    var ln = {},
        cn, hn, pn = /^(?:toggle|show|hide)$/,
        dn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        vn, mn = [
        ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
        ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
        ["opacity"]
    ],
        gn;
    s.fn.extend({
        show: function (e, t, n) {
            var r, i;
            if (e || e === 0) return this.animate(wn("show", 3), e, t, n);
            for (var o = 0, u = this.length; o < u; o++) r = this[o], r.style && (i = r.style.display, !s._data(r, "olddisplay") && i === "none" && (i = r.style.display = ""), (i === "" && s.css(r, "display") === "none" || !s.contains(r.ownerDocument.documentElement, r)) && s._data(r, "olddisplay", En(r.nodeName)));
            for (o = 0; o < u; o++) {
                r = this[o];
                if (r.style) {
                    i = r.style.display;
                    if (i === "" || i === "none") r.style.display = s._data(r, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function (e, t, n) {
            if (e || e === 0) return this.animate(wn("hide", 3), e, t, n);
            var r, i, o = 0,
                u = this.length;
            for (; o < u; o++) r = this[o], r.style && (i = s.css(r, "display"), i !== "none" && !s._data(r, "olddisplay") && s._data(r, "olddisplay", i));
            for (o = 0; o < u; o++) this[o].style && (this[o].style.display = "none");
            return this
        },
        _toggle: s.fn.toggle,
        toggle: function (e, t, n) {
            var r = typeof e == "boolean";
            return s.isFunction(e) && s.isFunction(t) ? this._toggle.apply(this, arguments) : e == null || r ? this.each(function () {
                var t = r ? e : s(this).is(":hidden");
                s(this)[t ? "show" : "hide"]()
            }) : this.animate(wn("toggle", 3), e, t, n), this
        },
        fadeTo: function (e, t, n, r) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function (e, t, n, r) {
            function o() {
                i.queue === !1 && s._mark(this);
                var t = s.extend({}, i),
                    n = this.nodeType === 1,
                    r = n && s(this).is(":hidden"),
                    o, u, a, f, l, c, h, p, d, v, m;
                t.animatedProperties = {};
                for (a in e) {
                    o = s.camelCase(a), a !== o && (e[o] = e[a], delete e[a]);
                    if ((l = s.cssHooks[o]) && "expand" in l) {
                        c = l.expand(e[o]), delete e[o];
                        for (a in c) a in e || (e[a] = c[a])
                    }
                }
                for (o in e) {
                    u = e[o], s.isArray(u) ? (t.animatedProperties[o] = u[1], u = e[o] = u[0]) : t.animatedProperties[o] = t.specialEasing && t.specialEasing[o] || t.easing || "swing";
                    if (u === "hide" && r || u === "show" && !r) return t.complete.call(this);
                    n && (o === "height" || o === "width") && (t.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], s.css(this, "display") === "inline" && s.css(this, "float") === "none" && (!s.support.inlineBlockNeedsLayout || En(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                t.overflow != null && (this.style.overflow = "hidden");
                for (a in e) f = new s.fx(this, t, a), u = e[a], pn.test(u) ? (m = s._data(this, "toggle" + a) || (u === "toggle" ? r ? "show" : "hide" : 0), m ? (s._data(this, "toggle" + a, m === "show" ? "hide" : "show"), f[m]()) : f[u]()) : (h = dn.exec(u), p = f.cur(), h ? (d = parseFloat(h[2]), v = h[3] || (s.cssNumber[a] ? "" : "px"), v !== "px" && (s.style(this, a, (d || 1) + v), p = (d || 1) / f.cur() * p, s.style(this, a, p + v)), h[1] && (d = (h[1] === "-=" ? -1 : 1) * d + p), f.custom(p, d, v)) : f.custom(p, u, ""));
                return !0
            }
            var i = s.speed(t, n, r);
            return s.isEmptyObject(e) ? this.each(i.complete, [!1]) : (e = s.extend({}, e), i.queue === !1 ? this.each(o) : this.queue(i.queue, o))
        },
        stop: function (e, n, r) {
            return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                function u(e, t, n) {
                    var i = t[n];
                    s.removeData(e, n, !0), i.stop(r)
                }
                var t, n = !1,
                    i = s.timers,
                    o = s._data(this);
                r || s._unmark(!0, this);
                if (e == null) for (t in o) o[t] && o[t].stop && t.indexOf(".run") === t.length - 4 && u(this, o, t);
                else o[t = e + ".run"] && o[t].stop && u(this, o, t);
                for (t = i.length; t--;) i[t].elem === this && (e == null || i[t].queue === e) && (r ? i[t](!0) : i[t].saveState(), n = !0, i.splice(t, 1));
                (!r || !n) && s.dequeue(this, e)
            })
        }
    }), s.each({
            slideDown: wn("show", 1),
            slideUp: wn("hide", 1),
            slideToggle: wn("toggle", 1),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        },
        function (e, t) {
            s.fn[e] = function (e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), s.extend({
        speed: function (e, t, n) {
            var r = e && typeof e == "object" ? s.extend({}, e) : {
                complete: n || !n && t || s.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !s.isFunction(t) && t
            };
            r.duration = s.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in s.fx.speeds ? s.fx.speeds[r.duration] : s.fx.speeds._default;
            if (r.queue == null || r.queue === !0) r.queue = "fx";
            return r.old = r.complete, r.complete = function (e) {
                s.isFunction(r.old) && r.old.call(this), r.queue ? s.dequeue(this, r.queue) : e !== !1 && s._unmark(this)
            }, r
        },
        easing: {
            linear: function (e) {
                return e
            },
            swing: function (e) {
                return -Math.cos(e * Math.PI) / 2 + .5
            }
        },
        timers: [],
        fx: function (e, t, n) {
            this.options = t, this.elem = e, this.prop = n, t.orig = t.orig || {}
        }
    }), s.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (s.fx.step[this.prop] || s.fx.step._default)(this)
        },
        cur: function () {
            if (this.elem[this.prop] == null || !! this.elem.style && this.elem.style[this.prop] != null) {
                var e, t = s.css(this.elem, this.prop);
                return isNaN(e = parseFloat(t)) ? !t || t === "auto" ? 0 : t : e
            }
            return this.elem[this.prop]
        },
        custom: function (e, n, r) {
            function u(e) {
                return i.step(e)
            }
            var i = this,
                o = s.fx;
            this.startTime = gn || yn(), this.end = n, this.now = this.start = e, this.pos = this.state = 0, this.unit = r || this.unit || (s.cssNumber[this.prop] ? "" : "px"), u.queue = this.options.queue, u.elem = this.elem, u.saveState = function () {
                s._data(i.elem, "fxshow" + i.prop) === t && (i.options.hide ? s._data(i.elem, "fxshow" + i.prop, i.start) : i.options.show && s._data(i.elem, "fxshow" + i.prop, i.end))
            }, u() && s.timers.push(u) && !vn && (vn = setInterval(o.tick, o.interval))
        },
        show: function () {
            var e = s._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = e || s.style(this.elem, this.prop), this.options.show = !0, e !== t ? this.custom(this.cur(), e) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), s(this.elem).show()
        },
        hide: function () {
            this.options.orig[this.prop] = s._data(this.elem, "fxshow" + this.prop) || s.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function (e) {
            var t, n, r, i = gn || yn(),
                o = !0,
                u = this.elem,
                a = this.options;
            if (e || i >= a.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), a.animatedProperties[this.prop] = !0;
                for (t in a.animatedProperties) a.animatedProperties[t] !== !0 && (o = !1);
                if (o) {
                    a.overflow != null && !s.support.shrinkWrapBlocks && s.each(["", "X", "Y"],
                        function (e, t) {
                            u.style["overflow" + t] = a.overflow[e]
                        }), a.hide && s(u).hide();
                    if (a.hide || a.show) for (t in a.animatedProperties) s.style(u, t, a.orig[t]), s.removeData(u, "fxshow" + t, !0), s.removeData(u, "toggle" + t, !0);
                    r = a.complete, r && (a.complete = !1, r.call(u))
                }
                return !1
            }
            return a.duration == Infinity ? this.now = i : (n = i - this.startTime, this.state = n / a.duration, this.pos = s.easing[a.animatedProperties[this.prop]](this.state, n, 0, 1, a.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
        }
    }, s.extend(s.fx, {
        tick: function () {
            var e, t = s.timers,
                n = 0;
            for (; n < t.length; n++) e = t[n], !e() && t[n] === e && t.splice(n--, 1);
            t.length || s.fx.stop()
        },
        interval: 13,
        stop: function () {
            clearInterval(vn), vn = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function (e) {
                s.style(e.elem, "opacity", e.now)
            },
            _default: function (e) {
                e.elem.style && e.elem.style[e.prop] != null ? e.elem.style[e.prop] = e.now + e.unit : e.elem[e.prop] = e.now
            }
        }
    }), s.each(mn.concat.apply([], mn),
        function (e, t) {
            t.indexOf("margin") && (s.fx.step[t] = function (e) {
                s.style(e.elem, t, Math.max(0, e.now) + e.unit)
            })
        }), s.expr && s.expr.filters && (s.expr.filters.animated = function (e) {
        return s.grep(s.timers,
            function (t) {
                return e === t.elem
            }).length
    });
    var Sn, xn = /^t(?:able|d|h)$/i,
        Tn = /^(?:body|html)$/i;
    "getBoundingClientRect" in n.documentElement ? Sn = function (e, t, n, r) {
        try {
            r = e.getBoundingClientRect()
        } catch (i) {}
        if (!r || !s.contains(n, e)) return r ? {
            top: r.top,
            left: r.left
        } : {
            top: 0,
            left: 0
        };
        var o = t.body,
            u = Nn(t),
            a = n.clientTop || o.clientTop || 0,
            f = n.clientLeft || o.clientLeft || 0,
            l = u.pageYOffset || s.support.boxModel && n.scrollTop || o.scrollTop,
            c = u.pageXOffset || s.support.boxModel && n.scrollLeft || o.scrollLeft,
            h = r.top + l - a,
            p = r.left + c - f;
        return {
            top: h,
            left: p
        }
    } : Sn = function (e, t, n) {
        var r, i = e.offsetParent,
            o = e,
            u = t.body,
            a = t.defaultView,
            f = a ? a.getComputedStyle(e, null) : e.currentStyle,
            l = e.offsetTop,
            c = e.offsetLeft;
        while ((e = e.parentNode) && e !== u && e !== n) {
            if (s.support.fixedPosition && f.position === "fixed") break;
            r = a ? a.getComputedStyle(e, null) : e.currentStyle, l -= e.scrollTop, c -= e.scrollLeft, e === i && (l += e.offsetTop, c += e.offsetLeft, s.support.doesNotAddBorder && (!s.support.doesAddBorderForTableAndCells || !xn.test(e.nodeName)) && (l += parseFloat(r.borderTopWidth) || 0, c += parseFloat(r.borderLeftWidth) || 0), o = i, i = e.offsetParent), s.support.subtractsBorderForOverflowNotVisible && r.overflow !== "visible" && (l += parseFloat(r.borderTopWidth) || 0, c += parseFloat(r.borderLeftWidth) || 0), f = r
        }
        if (f.position === "relative" || f.position === "static") l += u.offsetTop, c += u.offsetLeft;
        return s.support.fixedPosition && f.position === "fixed" && (l += Math.max(n.scrollTop, u.scrollTop), c += Math.max(n.scrollLeft, u.scrollLeft)), {
            top: l,
            left: c
        }
    }, s.fn.offset = function (e) {
        if (arguments.length) return e === t ? this : this.each(function (t) {
            s.offset.setOffset(this, e, t)
        });
        var n = this[0],
            r = n && n.ownerDocument;
        return r ? n === r.body ? s.offset.bodyOffset(n) : Sn(n, r, r.documentElement) : null
    }, s.offset = {
        bodyOffset: function (e) {
            var t = e.offsetTop,
                n = e.offsetLeft;
            return s.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(s.css(e, "marginTop")) || 0, n += parseFloat(s.css(e, "marginLeft")) || 0), {
                top: t,
                left: n
            }
        },
        setOffset: function (e, t, n) {
            var r = s.css(e, "position");
            r === "static" && (e.style.position = "relative");
            var i = s(e),
                o = i.offset(),
                u = s.css(e, "top"),
                a = s.css(e, "left"),
                f = (r === "absolute" || r === "fixed") && s.inArray("auto", [u, a]) > -1,
                l = {},
                c = {},
                h, p;
            f ? (c = i.position(), h = c.top, p = c.left) : (h = parseFloat(u) || 0, p = parseFloat(a) || 0), s.isFunction(t) && (t = t.call(e, n, o)), t.top != null && (l.top = t.top - o.top + h), t.left != null && (l.left = t.left - o.left + p), "using" in t ? t.using.call(e, l) : i.css(l)
        }
    }, s.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var e = this[0],
                t = this.offsetParent(),
                n = this.offset(),
                r = Tn.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
            return n.top -= parseFloat(s.css(e, "marginTop")) || 0, n.left -= parseFloat(s.css(e, "marginLeft")) || 0, r.top += parseFloat(s.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(s.css(t[0], "borderLeftWidth")) || 0, {
                top: n.top - r.top,
                left: n.left - r.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent || n.body;
                while (e && !Tn.test(e.nodeName) && s.css(e, "position") === "static") e = e.offsetParent;
                return e
            })
        }
    }), s.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        },
        function (e, n) {
            var r = /Y/.test(n);
            s.fn[e] = function (i) {
                return s.access(this,
                    function (e, i, o) {
                        var u = Nn(e);
                        if (o === t) return u ? n in u ? u[n] : s.support.boxModel && u.document.documentElement[i] || u.document.body[i] : e[i];
                        u ? u.scrollTo(r ? s(u).scrollLeft() : o, r ? o : s(u).scrollTop()) : e[i] = o
                    }, e, i, arguments.length, null)
            }
        }), s.each({
            Height: "height",
            Width: "width"
        },
        function (e, n) {
            var r = "client" + e,
                i = "scroll" + e,
                o = "offset" + e;
            s.fn["inner" + e] = function () {
                var e = this[0];
                return e ? e.style ? parseFloat(s.css(e, n, "padding")) : this[n]() : null
            }, s.fn["outer" + e] = function (e) {
                var t = this[0];
                return t ? t.style ? parseFloat(s.css(t, n, e ? "margin" : "border")) : this[n]() : null
            }, s.fn[n] = function (e) {
                return s.access(this,
                    function (e, n, u) {
                        var a, f, l, c;
                        if (s.isWindow(e)) return a = e.document, f = a.documentElement[r], s.support.boxModel && f || a.body && a.body[r] || f;
                        if (e.nodeType === 9) return a = e.documentElement, a[r] >= a[i] ? a[r] : Math.max(e.body[i], a[i], e.body[o], a[o]);
                        if (u === t) return l = s.css(e, n), c = parseFloat(l), s.isNumeric(c) ? c : l;
                        s(e).css(n, u)
                    }, n, e, arguments.length, null)
            }
        }), e.jQuery = e.$ = s, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [],
        function () {
            return s
        })
})(window),
    function (e, t) {
        var n;
        e.rails = n = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not(button[type])",
            disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
            fileInputSelector: "input:file",
            linkDisableSelector: "a[data-disable-with]",
            CSRFProtection: function (t) {
                var n = e('meta[name="csrf-token"]').attr("content");
                n && t.setRequestHeader("X-CSRF-Token", n)
            },
            fire: function (t, n, r) {
                var i = e.Event(n);
                return t.trigger(i, r), i.result !== !1
            },
            confirm: function (e) {
                return confirm(e)
            },
            ajax: function (t) {
                return e.ajax(t)
            },
            href: function (e) {
                return e.attr("href")
            },
            handleRemote: function (r) {
                var i, s, o, u, a, f;
                if (n.fire(r, "ajax:before")) {
                    u = r.data("cross-domain") || null, a = r.data("type") || e.ajaxSettings && e.ajaxSettings.dataType;
                    if (r.is("form")) {
                        i = r.attr("method"), s = r.attr("action"), o = r.serializeArray();
                        var l = r.data("ujs:submit-button");
                        l && (o.push(l), r.data("ujs:submit-button", null))
                    } else r.is(n.inputChangeSelector) ? (i = r.data("method"), s = r.data("url"), o = r.serialize(), r.data("params") && (o = o + "&" + r.data("params"))) : (i = r.data("method"), s = n.href(r), o = r.data("params") || null);
                    return f = {
                        type: i || "GET",
                        data: o,
                        dataType: a,
                        crossDomain: u,
                        beforeSend: function (e, i) {
                            return i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script), n.fire(r, "ajax:beforeSend", [e, i])
                        },
                        success: function (e, t, n) {
                            r.trigger("ajax:success", [e, t, n])
                        },
                        complete: function (e, t) {
                            r.trigger("ajax:complete", [e, t])
                        },
                        error: function (e, t, n) {
                            r.trigger("ajax:error", [e, t, n])
                        }
                    }, s && (f.url = s), n.ajax(f)
                }
                return !1
            },
            handleMethod: function (r) {
                var i = n.href(r),
                    s = r.data("method"),
                    o = r.attr("target"),
                    u = e("meta[name=csrf-token]").attr("content"),
                    a = e("meta[name=csrf-param]").attr("content"),
                    f = e('<form method="post" action="' + i + '"></form>'),
                    l = '<input name="_method" value="' + s + '" type="hidden" />';
                a !== t && u !== t && (l += '<input name="' + a + '" value="' + u + '" type="hidden" />'), o && f.attr("target", o), f.hide().append(l).appendTo("body"), f.submit()
            },
            disableFormElements: function (t) {
                t.find(n.disableSelector).each(function () {
                    var t = e(this),
                        n = t.is("button") ? "html" : "val";
                    t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0)
                })
            },
            enableFormElements: function (t) {
                t.find(n.enableSelector).each(function () {
                    var t = e(this),
                        n = t.is("button") ? "html" : "val";
                    t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1)
                })
            },
            allowAction: function (e) {
                var t = e.data("confirm"),
                    r = !1,
                    i;
                return t ? (n.fire(e, "confirm") && (r = n.confirm(t), i = n.fire(e, "confirm:complete", [r])), r && i) : !0
            },
            blankInputs: function (t, n, r) {
                var i = e(),
                    s, o = n || "input,textarea";
                return t.find(o).each(function () {
                    s = e(this);
                    if (r ? s.val() : !s.val()) i = i.add(s)
                }), i.length ? i : !1
            },
            nonBlankInputs: function (e, t) {
                return n.blankInputs(e, t, !0)
            },
            stopEverything: function (t) {
                return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
            },
            callFormSubmitBindings: function (n, r) {
                var i = n.data("events"),
                    s = !0;
                return i !== t && i.submit !== t && e.each(i.submit,
                    function (e, t) {
                        if (typeof t.handler == "function") return s = t.handler(r)
                    }), s
            },
            disableElement: function (e) {
                e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable",
                    function (e) {
                        return n.stopEverything(e)
                    })
            },
            enableElement: function (e) {
                e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.data("ujs:enable-with", !1)), e.unbind("click.railsDisable")
            }
        }, e.ajaxPrefilter(function (e, t, r) {
            e.crossDomain || n.CSRFProtection(r)
        }), e(document).delegate(n.linkDisableSelector, "ajax:complete",
            function () {
                n.enableElement(e(this))
            }), e(document).delegate(n.linkClickSelector, "click.rails",
            function (r) {
                var i = e(this),
                    s = i.data("method"),
                    o = i.data("params");
                if (!n.allowAction(i)) return n.stopEverything(r);
                i.is(n.linkDisableSelector) && n.disableElement(i);
                if (i.data("remote") !== t) return (r.metaKey || r.ctrlKey) && (!s || s === "GET") && !o ? !0 : (n.handleRemote(i) === !1 && n.enableElement(i), !1);
                if (i.data("method")) return n.handleMethod(i), !1
            }), e(document).delegate(n.inputChangeSelector, "change.rails",
            function (t) {
                var r = e(this);
                return n.allowAction(r) ? (n.handleRemote(r), !1) : n.stopEverything(t)
            }), e(document).delegate(n.formSubmitSelector, "submit.rails",
            function (r) {
                var i = e(this),
                    s = i.data("remote") !== t,
                    o = n.blankInputs(i, n.requiredInputSelector),
                    u = n.nonBlankInputs(i, n.fileInputSelector);
                if (!n.allowAction(i)) return n.stopEverything(r);
                if (o && i.attr("novalidate") == t && n.fire(i, "ajax:aborted:required", [o])) return n.stopEverything(r);
                if (s) return u ? n.fire(i, "ajax:aborted:file", [u]) : !e.support.submitBubbles && e().jquery < "1.7" && n.callFormSubmitBindings(i, r) === !1 ? n.stopEverything(r) : (n.handleRemote(i), !1);
                setTimeout(function () {
                    n.disableFormElements(i)
                }, 13)
            }), e(document).delegate(n.formInputClickSelector, "click.rails",
            function (t) {
                var r = e(this);
                if (!n.allowAction(r)) return n.stopEverything(t);
                var i = r.attr("name"),
                    s = i ? {
                        name: i,
                        value: r.val()
                    } : null;
                r.closest("form").data("ujs:submit-button", s)
            }), e(document).delegate(n.formSubmitSelector, "ajax:beforeSend.rails",
            function (t) {
                this == t.target && n.disableFormElements(e(this))
            }), e(document).delegate(n.formSubmitSelector, "ajax:complete.rails",
            function (t) {
                this == t.target && n.enableFormElements(e(this))
            })
    }(jQuery),
    function (e) {
        e.fn.validate = function () {
            return this.filter("form[data-validate]").each(function () {
                var t = e(this),
                    n = window[t.attr("id")];
                t.submit(function () {
                    return t.isValid(n.validators)
                }).bind("ajax:beforeSend",
                    function (e) {
                        if (e.target == this) return t.isValid(n.validators)
                    }).bind("form:validate:after",
                    function (e) {
                        clientSideValidations.callbacks.form.after(t, e)
                    }).bind("form:validate:before",
                    function (e) {
                        clientSideValidations.callbacks.form.before(t, e)
                    }).bind("form:validate:fail",
                    function (e) {
                        clientSideValidations.callbacks.form.fail(t, e)
                    }).bind("form:validate:pass",
                    function (e) {
                        clientSideValidations.callbacks.form.pass(t, e)
                    }).find("[data-validate]:input:not(:radio)").live("focusout",
                    function () {
                        e(this).isValid(n.validators)
                    }).live("change",
                    function () {
                        e(this).data("changed", !0)
                    }).live("element:validate:after",
                    function (t) {
                        clientSideValidations.callbacks.element.after(e(this), t)
                    }).live("element:validate:before",
                    function (t) {
                        clientSideValidations.callbacks.element.before(e(this), t)
                    }).live("element:validate:fail",
                    function (t, n) {
                        var i = e(this);
                        clientSideValidations.callbacks.element.fail(i, n,
                            function () {
                                r(i, n)
                            }, t)
                    }).live("element:validate:pass",
                    function (t) {
                        var n = e(this);
                        clientSideValidations.callbacks.element.pass(n,
                            function () {
                                i(n)
                            }, t)
                    }).end().find("[data-validate]:checkbox").live("click",
                    function () {
                        e(this).isValid(n.validators)
                    }).end().find("[id*=_confirmation]").each(function () {
                        var r = e(this),
                            i = t.find("#" + this.id.match(/(.+)_confirmation/)[1] + "[data-validate]:input");
                        i[0] && e("#" + r.attr("id")).live("focusout",
                            function () {
                                i.data("changed", !0).isValid(n.validators)
                            }).live("keyup",
                            function () {
                                i.data("changed", !0).isValid(n.validators)
                            })
                    });
                var r = function (e, t) {
                    clientSideValidations.formBuilders[n.type].add(e, n, t)
                },
                    i = function (e) {
                        clientSideValidations.formBuilders[n.type].remove(e, n)
                    }
            })
        }, e.fn.isValid = function (r) {
            return e(this[0]).is("form") ? t(e(this[0]), r) : n(e(this[0]), r[this[0].name])
        };
        var t = function (t, n) {
            var r = !0;
            return t.trigger("form:validate:before").find("[data-validate]:input").each(function () {
                e(this).isValid(n) || (r = !1)
            }), r ? t.trigger("form:validate:pass") : t.trigger("form:validate:fail"), t.trigger("form:validate:after"), r
        },
            n = function (e, t) {
                e.trigger("element:validate:before");
                if (e.data("changed") !== !1) {
                    var n = !0;
                    e.data("changed", !1);
                    for (kind in clientSideValidations.validators.all()) if (t[kind] && (message = clientSideValidations.validators.all()[kind](e, t[kind]))) {
                        e.trigger("element:validate:fail", message).data("valid", !1), n = !1;
                        break
                    }
                    n && (e.data("valid", null), e.trigger("element:validate:pass"))
                }
                return e.trigger("element:validate:after"), e.data("valid") === !1 ? !1 : !0
            };
        e(function () {
            e("form[data-validate]").validate()
        })
    }(jQuery);
var clientSideValidations = {
    validators: {
        all: function () {
            return jQuery.extend({}, clientSideValidations.validators.local, clientSideValidations.validators.remote)
        },
        local: {
            presence: function (e, t) {
                if (/^\s*$/.test(e.val() || "")) return t.message
            },
            acceptance: function (e, t) {
                switch (e.attr("type")) {
                    case "checkbox":
                        if (!e.attr("checked")) return t.message;
                        break;
                    case "text":
                        if (e.val() != (t.accept || "1")) return t.message
                }
            },
            format: function (e, t) {
                if ((message = this.presence(e, t)) && t.allow_blank == 1) return;
                if (message) return message;
                if (t["with"] && !t["with"].test(e.val())) return t.message;
                if (t.without && t.without.test(e.val())) return t.message
            },
            numericality: function (e, t) {
                if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d*)?$/.test(e.val()) && e.val() != "") return t.messages.numericality;
                if (t.only_integer && !/^[+-]?\d+$/.test(e.val())) return t.messages.only_integer;
                var n = {
                    greater_than: ">",
                    greater_than_or_equal_to: ">=",
                    equal_to: "==",
                    less_than: "<",
                    less_than_or_equal_to: "<="
                };
                for (var r in n) if (t[r] != undefined && !(new Function("return " + e.val() + n[r] + t[r]))()) return t.messages[r];
                if (t.odd && !(parseInt(e.val()) % 2)) return t.messages.odd;
                if (t.even && parseInt(e.val()) % 2) return t.messages.even
            },
            length: function (e, t) {
                var n = {};
                t.is ? n.message = t.messages.is : t.minimum && (n.message = t.messages.minimum);
                if ((message = this.presence(e, n)) && t.allow_blank == 1) return;
                if (message) return message;
                var r = {
                    is: "==",
                    minimum: ">=",
                    maximum: "<="
                },
                    i = t.js_tokenizer || "split('')",
                    s = (new Function("element", "return (element.val()." + i + " || '').length;"))(e);
                for (var o in r) if (t[o] && !(new Function("return " + s + r[o] + t[o]))()) return t.messages[o]
            },
            exclusion: function (e, t) {
                if ((message = this.presence(e, t)) && t.allow_blank == 1) return;
                if (message) return message;
                if (t["in"]) {
                    for (var n = 0; n < t["in"].length; n++) if (t["in"][n] == e.val()) return t.message
                } else if (t.range) {
                    var r = t.range[0],
                        i = t.range[1];
                    if (e.val() >= r && e.val() <= i) return t.message
                }
            },
            inclusion: function (e, t) {
                if ((message = this.presence(e, t)) && t.allow_blank == 1) return;
                if (message) return message;
                if (t["in"]) {
                    for (var n = 0; n < t["in"].length; n++) if (t["in"][n] == e.val()) return;
                    return t.message
                }
                if (t.range) {
                    var r = t.range[0],
                        i = t.range[1];
                    if (e.val() >= r && e.val() <= i) return;
                    return t.message
                }
            },
            confirmation: function (e, t) {
                if (e.val() != jQuery("#" + e.attr("id") + "_confirmation").val()) return t.message
            }
        },
        remote: {
            uniqueness: function (e, t) {
                if ((message = clientSideValidations.validators.local.presence(e, t)) && t.allow_blank === !0) return;
                if (message) return message;
                var n = {};
                n.case_sensitive = !! t.case_sensitive, t.id && (n.id = t.id);
                if (t.scope) {
                    n.scope = {};
                    for (key in t.scope) {
                        var r = jQuery('[name="' + e.attr("name").replace(/\[\w+]$/, "[" + key + "]" + '"]'));
                        r[0] && r.val() != t.scope[key] ? (n.scope[key] = r.val(), r.unbind("change." + e.id).bind("change." + e.id,
                            function () {
                                e.trigger("change"), e.trigger("focusout")
                            })) : n.scope[key] = t.scope[key]
                    }
                }
                if (/_attributes]/.test(e.attr("name"))) {
                    var i = e.attr("name").match(/\[\w+_attributes]/g).pop().match(/\[(\w+)_attributes]/).pop();
                    i += /(\[\w+])$/.exec(e.attr("name"))[1]
                } else var i = e.attr("name");
                t["class"] && (i = t["class"] + "[" + i.split("[")[1]), n[i] = e.val();
                if (jQuery.ajax({
                    url: "/validators/uniqueness",
                    data: n,
                    async: false
                }).status == 200) return t.message
            }
        }
    },
    formBuilders: {
        "ActionView::Helpers::FormBuilder": {
            add: function (e, t, n) {
                if (e.data("valid") !== !1 && jQuery('label.message[for="' + e.attr("id") + '"]')[0] == undefined) {
                    var r = jQuery(t.input_tag),
                        i = jQuery(t.label_tag),
                        s = jQuery('label[for="' + e.attr("id") + '"]:not(.message)');
                    e.attr("autofocus") && e.attr("autofocus", !1), e.before(r), r.find("span#input_tag").replaceWith(e), r.find("label.message").attr("for", e.attr("id")), i.find("label.message").attr("for", e.attr("id")), s.replaceWith(i), i.find("label#label_tag").replaceWith(s)
                }
                jQuery('label.message[for="' + e.attr("id") + '"]').text(n)
            },
            remove: function (e, t) {
                var n = jQuery(t.input_tag).attr("class"),
                    r = e.closest("." + n),
                    i = jQuery('label[for="' + e.attr("id") + '"]:not(.message)'),
                    s = i.closest("." + n);
                r[0] && (r.find("#" + e.attr("id")).detach(), r.replaceWith(e), i.detach(), s.replaceWith(i))
            }
        },
        "SimpleForm::FormBuilder": {
            add: function (e, t, n) {
                if (e.data("valid") !== !1) {
                    var r = e.closest(t.wrapper_tag);
                    r.addClass(t.wrapper_error_class);
                    var i = $("<" + t.error_tag + ' class="' + t.error_class + '">' + n + "</" + t.error_tag + ">");
                    r.append(i)
                } else e.parent().find(t.error_tag + "." + t.error_class).text(n)
            },
            remove: function (e, t) {
                var n = e.closest(t.wrapper_tag + "." + t.wrapper_error_class);
                n.removeClass(t.wrapper_error_class);
                var r = n.find(t.error_tag + "." + t.error_class);
                r.remove()
            }
        },
        "Formtastic::FormBuilder": {
            add: function (e, t, n) {
                if (e.data("valid") !== !1) {
                    var r = e.closest("li");
                    r.addClass("error");
                    var i = $('<p class="' + t.inline_error_class + '">' + n + "</p>");
                    r.append(i)
                } else e.parent().find("p." + t.inline_error_class).text(n)
            },
            remove: function (e, t) {
                var n = e.closest("li.error");
                n.removeClass("error");
                var r = n.find("p." + t.inline_error_class);
                r.remove()
            }
        },
        "NestedForm::Builder": {
            add: function (e, t, n) {
                clientSideValidations.formBuilders["ActionView::Helpers::FormBuilder"].add(e, t, n)
            },
            remove: function (e, t, n) {
                clientSideValidations.formBuilders["ActionView::Helpers::FormBuilder"].remove(e, t, n)
            }
        }
    },
    callbacks: {
        element: {
            after: function (e, t) {},
            before: function (e, t) {},
            fail: function (e, t, n, r) {
                n()
            },
            pass: function (e, t, n) {
                t()
            }
        },
        form: {
            after: function (e, t) {},
            before: function (e, t) {},
            fail: function (e, t) {},
            pass: function (e, t) {}
        }
    }
};
activeTab = 1, usernamechanged = !1, usernamechanged = !1, $(document).ready(function () {
    function e() {
        return {
            autoDimensions: !1,
            width: 500,
            height: "auto",
            transitionIn: "fade",
            transitionOut: "fade",
            padding: 0
        }
    }
    setCharCounter($("#company_role_apply_reason"), $("#reasonCounter"), 300), changePrivacyText($("input[name=company[privacy_search]]:checked").val()), $("#custom_amount").numeric({
        allow: ", . $ "
    }), $(".applyToInvestSubmit").click(function () {
        if ($(this).attr("data-owner") == "true") {
            alert("You can't fund your own company!");
            return
        }
        if ($(this).html() == '<img src="/assets/ajax-loader_f.gif" style="margin-top:-5px; margin-left:-10px">') return;
        $(this).html('<img src="/assets/ajax-loader_f.gif" style="margin-top:-5px; margin-left:-10px">'), error = !1, $(".error").hide(), $("#status").is(":checked") || (error = !0, $("#error_status").show(), $("#error_status").html("Please verify your status by checking the box.")), $("#user_full_legal_name").val().length < 2 && (error = !0, $("#error_address").show(), $("#error_address").html("Your full legal name and address is required.")), $("#user_address").val().length < 2 && (error = !0, $("#error_address").show(), $("#error_address").html("Your full legal name and address is required.")), $("#user_state").val().length < 1 && (error = !0, $("#error_address").show(), $("#error_address").html("Your full legal name and address is required.")), $("#user_city").val().length < 1 && (error = !0, $("#error_address").show(), $("#error_address").html("Your full legal name and address is required.")), $("#amount").val() == "9" ? (amount_to_invest = $("#custom_amount").val().replace("$", ""), amount_to_invest = amount_to_invest.replace(",", ""), amount_to_invest = parseFloat(amount_to_invest)) : amount_to_invest = $("#amount").val(), amount_to_invest || (error = !0, $("#error_amount").show(), $("#error_amount").html("Please enter a custom amount.")), error || $.ajax({
            type: "POST",
            url: "/invest/apply?amount=" + amount_to_invest + "&reason=" + escape($("#apply_reason").val()) + "&fundraise_id=" + $("#fundraise_id").val(),
            data: $("form").serialize(),
            success: function (e) {
                $("#purchaseBox").html(e)
            }
        })
    }), $(".savePrivacy").change(function () {
        changePrivacyText($("input[name=company[privacy_search]]:checked").val())
    }), $("#fundraise_state_ma").click(function () {
        $("#legal_ma").toggle()
    }), $(".editFundraise").click(function () {
        return $(this).hide(), $("#funding_step2").hide(), $(".fundraise_status_bar").html("Your application to fund raise is under review.  <a  onclick=\"$('#funding_step2').show(); $(this).hide()\">Edit</a>"), $("html,body").animate({
            scrollTop: $("html").offset().top
        }, "fast"), $.ajax({
            type: "POST",
            url: "/fundraises/" + fundraise_id,
            data: "_method=PUT&fundraise[approval_state]=2&company_id=" + Company.id,
            success: function (e) {}
        }), !1
    }), $(".fundingOption").click(function () {
        $(".fundingOption").removeClass("activeOption"), $(this).addClass("activeOption"), $(".fundraiseOptionCheck", $(this)).attr("checked", "checked"), val = $(".fundraiseOptionCheck", $(this)).val(), val == 1 ? ($("#funding_step2").hide(), $(".fundraise_status_bar").hide()) : ($("#funding_step2").show(), $(".fundraise_status_bar").show()), $.ajax({
            type: "POST",
            url: Company.path + "/" + Company.id,
            data: "_method=PUT&company[fundraising_status]=" + val + "&company_id=" + Company.id,
            success: function (e) {}
        })
    }), $(".termTab").click(function () {
        $(".termTab").removeClass("active"), $(this).addClass("active"), layer = $(this).attr("data-layer"), $(".tabContent").hide(), $("." + layer).show(), $("#company_funding_type").val(layer), $("#company_funding_type").trigger("change")
    }), funding_type = $("#company_funding_type").val(), funding_type ? ($("." + funding_type + "Tab").addClass("active"), $("." + funding_type).show()) : ($(".noteTab").addClass("active"), $(".note").show()), $("#fundraise_funding_started_at").datepicker({
        changeMonth: !0,
        numberOfMonths: 1,
        minDate: 1,
        maxDate: "+1Y",
        onSelect: function (e) {
            $("#fundraise_funding_closed_at").datepicker("option", "minDate", e), saveDate(this)
        }
    }), $("#fundraise_funding_closed_at").datepicker({
        changeMonth: !0,
        numberOfMonths: 1,
        maxDate: "+1Y",
        onSelect: function (e) {
            $("#fundraise_funding_started_at").datepicker("option", "maxDate", e), saveDate(this)
        }
    }), $("#fundraise_funding_closed_at").datepicker("option", "minDate", $("#fundraise_funding_started_at").val()), helperTimeout = null, $("#company_phone").mask("(999) 999-9999"), $(".publish").click(function () {
        return validateCompanySubmission(this), !1
    }), $(".loginRequired").click(function () {
        $.cookie("fundCompany", 1, {
            path: "/"
        }), cachedLoginForm = $(".hiddenLogin").html(), $.fancybox(cachedLoginForm, {
            autoDimensions: !1,
            width: 670,
            height: "auto",
            transitionIn: "fade",
            transitionOut: "fade",
            padding: 0,
            onClosed: function () {
                $.cookie("fundCompany", 0, {
                    path: "/"
                }), $(".hiddenLogin").html(cachedLoginForm)
            }
        }), $(".hiddenLogin").html(" "), $("a.popup").click(function (e) {
            return popupCenter($(this).attr("href"), $(this).attr("data-width"), $(this).attr("data-height"), "authPopup"), e.stopPropagation(), !1
        }), $(".loginTab").click(function () {
            $(".loginTab").removeClass("active"), $(this).addClass("active"), layer = $(this).attr("data-layer"), $(".signupContent").hide(), $("." + layer).show()
        }), $("#shortSignUpButton").click(function () {
            return validateSignAjax(this), !1
        }), $("#shortLoginButton").click(function () {
            return validateLoginAjax(this), !1
        }), $("#user_password", ".signup").keypress(function (e) {
            var t;
            if (window.event) t = window.event.keyCode;
            else {
                if (!e) return !0;
                t = e.which
            }
            return t == 13 ? (validateSignAjax($("#shortSignUpButton")), !1) : !0
        }), $("#user_password", ".login").keypress(function (e) {
            var t;
            if (window.event) t = window.event.keyCode;
            else {
                if (!e) return !0;
                t = e.which
            }
            return t == 13 ? (validateLoginAjax($("#shortLoginButton")), !1) : !0
        });
        return
    }), $(".supportButton").click(function () {
        if ($(this).attr("data-owner") == "true") {
            alert("You can't vote on your own company!");
            return
        }
        if ($(this).attr("data-user") == "false") {
            $.cookie("voteCompany", 1, {
                path: "/"
            }), cachedLoginForm = $(".hiddenLogin").html(), $.fancybox(cachedLoginForm, {
                autoDimensions: !1,
                width: 670,
                height: "auto",
                transitionIn: "fade",
                transitionOut: "fade",
                padding: 0,
                onClosed: function () {
                    $.cookie("voteCompany", 0, {
                        path: "/"
                    }), $(".hiddenLogin").html(cachedLoginForm)
                }
            }), $(".hiddenLogin").html(" "), $("a.popup").click(function (e) {
                return popupCenter($(this).attr("href"), $(this).attr("data-width"), $(this).attr("data-height"), "authPopup"), e.stopPropagation(), !1
            }), $(".loginTab").click(function () {
                $(".loginTab").removeClass("active"), $(this).addClass("active"), layer = $(this).attr("data-layer"), $(".signupContent").hide(), $("." + layer).show()
            }), $("#shortSignUpButton").click(function () {
                return validateSignAjax(this), !1
            }), $("#shortLoginButton").click(function () {
                return validateLoginAjax(this), !1
            }), $("#user_password", ".signup").keypress(function (e) {
                var t;
                if (window.event) t = window.event.keyCode;
                else {
                    if (!e) return !0;
                    t = e.which
                }
                return t == 13 ? (validateSignAjax($("#shortSignUpButton")), !1) : !0
            }), $("#user_password", ".login").keypress(function (e) {
                var t;
                if (window.event) t = window.event.keyCode;
                else {
                    if (!e) return !0;
                    t = e.which
                }
                return t == 13 ? (validateLoginAjax($("#shortLoginButton")), !1) : !0
            });
            return
        }
        return addSupporter = !1, $(this).hasClass("wefunderCoin") ? ($(this).remove(), $(".sHeadline").html("You are a Follower!"), text = $(".sDesc").html(), text = text.replace("Vote", "You voted"), $(".sDesc").html(text), score = parseInt($(".blueHeaderCoin").html()), score += 1, $(".blueHeaderCoin").html(score), addSupporter = !0) : $(this).html() == "Follow" ? ($(this).html("Following"), addSupporter = !0, $(this).addClass("blue2").removeClass("white")) : ($(this).html("Follow"), $(".sunlight").show(), $("#logo_cover").hide(), $(".topHiddenBar").animate({
            height: "0px"
        }, 300), $(".hiddenSocial").animate({
            opacity: 0
        }, 100), $(this).removeClass("blue2").addClass("white")), addSupporter == 1 ? (openHiddenBar(!0), text = $(".roleType").html(), text = text.replace("You are a of", "You are a follower of"), $(".roleType").html(text), addSupporter = !0, $.ajax({
            type: "POST",
            url: "/add_supporter",
            data: "company_id=" + Company.id,
            success: function (e) {
                $("#supportersList").html(e)
            }
        })) : $.ajax({
            type: "POST",
            url: "/company_roles/0",
            data: "_method=DELETE&delete_supporter_for_id=" + Company.id,
            success: function (e) {}
        }), !1
    }), $(".wysiwyg").bind("paste",
        function (e) {
            var t = $(this);
            setTimeout(function () {
                var e = $(t).val(),
                    n = document.createElement("DIV");
                n.innerHTML = e, content = n.textContent || n.innerText, content = $.trim(content), $(t).val(content)
            }, 100)
        }), $("#company_link").bind("paste",
        function (e) {
            var t = $(this);
            setTimeout(function () {
                var e = $(t).val();
                e = e.replace("http://", ""), $(t).val(e)
            }, 100)
        }), $("#company_twitter_url").bind("paste",
        function (e) {
            var t = $(this);
            setTimeout(function () {
                var e = $(t).val();
                e = e.replace("http://twitter.com/#!/", ""), e.match(/@/) || (e = "@" + e), $(t).val(e)
            }, 100)
        }), $("#funding_target").focus(function () {
        $(this).css("color", "#333"), $(this).val() == "" && $(this).val("$")
    }).blur(function () {
            $(this).val() == "$" && ($(this).val(""), $(this).css("color", "#A9A9AE"))
        }).click(function () {
            $(this).val() == "$" && setCaretPosition(this, 1)
        }).keyup(function () {
            $(this).val().length < 2 && $(this).val("$")
        }), $("#company_twitter_url").focus(function () {
        $(this).css("color", "#333"), $(this).val() == "" && $(this).val("@")
    }).blur(function () {
            $(this).val() == "@" && ($(this).val(""), $(this).css("color", "#A9A9AE"))
        }).click(function () {
            $(this).val() == "@" && setCaretPosition(this, 1)
        }).keyup(function () {
            $(this).val().length < 2 && $(this).val("@")
        }), $("#company_facebook_url").bind("paste",
        function (e) {
            var t = $(this);
            setTimeout(function () {
                var e = $(t).val();
                e = e.replace("http://www.facebook.com/", ""), e.match("http://facebook.com/") || (e = "http://facebook.com/" + e), $(t).val(e), $("#company_facebook_url").trigger("change")
            }, 100)
        }), $("#company_company_url").bind("paste",
        function (e) {
            var t = $(this);
            setTimeout(function () {
                var e = $(t).val();
                e = e.replace("http://", ""), e = "http://" + e, $(t).val(e), $("#company_company_url").trigger("change")
            }, 100)
        }), $("#company_facebook_url").focus(function () {
        $(this).css("color", "#333"), $(this).val() == "" && $(this).val("http://facebook.com/")
    }).blur(function () {
            $(this).val() == "http://facebook.com/" && ($(this).val(""), $(this).css("color", "#A9A9AE"))
        }).click(function () {
            $(this).val() == "http://facebook.com/" && setCaretPosition(this, 21)
        }).keyup(function () {
            $(this).val().length < 20 && $(this).val("http://facebook.com/")
        }), $(".noReturns").bind("paste",
        function (e) {
            var t = $(this);
            setTimeout(function () {
                var e = $(t).val();
                e = e.replace(/\n/g, " "), $(t).val(e)
            }, 100)
        }), $(".noReturns").bind("keypress",
        function (e) {
            return disableEnterKey(e)
        }), $("#company_company_url, #user_home_url").focus(function () {
        $(this).css("color", "#333"), $(this).val() == "" && $(this).val("http://")
    }).blur(function () {
            $(this).val() == "http://" && ($(this).val(""), $(this).css("color", "#A9A9AE"))
        }).click(function () {
            pos = doGetCaretPosition(this), pos < 7 && setCaretPosition(this, 7)
        }).keydown(function () {
            event.keyCode == 8 && (pos = doGetCaretPosition(this), pos < 8 && setCaretPosition(this, 8))
        }).keyup(function () {
            $(this).val().length < 7 && $(this).val("http://")
        }), $("#company_phone").focus(function () {
        $(this).val() == "(___) ___-____" && setCaretPosition(this, 0), $(this).val() == "" && setCaretPosition(this, 0)
    }), $("#company_url").blur(function () {
        check_company_url(this, Company.id)
    }), $("#company_postal_code").keydown(function () {
        return event.ctrlKey || event.altKey || 47 < event.keyCode && event.keyCode < 58 && event.shiftKey == 0 || 95 < event.keyCode && event.keyCode < 106 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode > 34 && event.keyCode < 40 || event.keyCode == 46
    }), $("#funding_target").numeric({
        allow: ", "
    }), $(".tl").tooltip(), $(".resize").autoResize({
        onResize: function () {
            $(this).css({
                opacity: .8
            })
        },
        animateCallback: function () {
            $(this).css({
                opacity: 1
            })
        },
        animateDuration: 300,
        extraSpace: 1
    }), $(".resize").trigger("change"), $("#company_company_url, #company_twitter_url, #company_facebook_url, #user_home_url").trigger("blur"), tabIndex = $.cookie("tabIndex"), tabIndex ? switchTabSubmit($("#tab" + tabIndex), $("#tabLayer" + tabIndex), tabIndex) : switchTabSubmit($("#tab0"), $("#tabLayer0"), 0), $("#photoSortable").sortable({
        update: function (e, t) {
            index = 0, $("#photoSortable").children().each(function (e, t) {
                index += 1, photo_id = $(this).find(".photo_id").val(), $.ajax({
                    type: "POST",
                    url: "/companies/" + Company.id + "/photos/" + photo_id,
                    data: "_method=PUT&photo[id]=" + escape(photo_id) + "&photo[sort_order]=" + index + "&photo_id=" + photo_id,
                    success: function (e) {}
                })
            })
        }
    }), $("#investorSortable").sortable({
        update: function (e, t) {
            index = 0, $("#investorSortable").children().each(function (e, t) {
                index += 1, role_id = $(this).find(".role_id").val(), $.ajax({
                    type: "POST",
                    url: "/company_roles/" + role_id,
                    data: "_method=PUT&role[sort_order]=" + index,
                    success: function (e) {}
                })
            })
        }
    }), $("#investorSortable").disableSelection(), $("#founderSortable").sortable({
        update: function (e, t) {
            index = 0, $("#founderSortable").children().each(function (e, t) {
                index += 1, role_id = $(this).find(".role_id").val(), $.ajax({
                    type: "POST",
                    url: "/company_roles/" + role_id,
                    data: "_method=PUT&role[sort_order]=" + index,
                    success: function (e) {}
                })
            })
        }
    }), $("#planSortable").sortable({
        update: function (e, t) {
            index = 0, $("#planSortable").children().each(function (e, t) {
                index += 1, name = $(this).find(".question_name").val(), name = $.trim(name), $.ajax({
                    type: "POST",
                    url: "/questions/" + Company.id,
                    data: "_method=PUT&name=" + escape(name) + "&sort_order=" + index + "&company_id=" + Company.id,
                    success: function (e) {}
                })
            })
        }
    }), $("a#MakerBotPic").fancybox({
        titleShow: !1,
        transitionIn: "elastic",
        transitionOut: "elastic",
        easingIn: "easeOutBack",
        easingOut: "easeInBack"
    }), $(".preview, .attach_file").click(function (e) {
        return alert("Not done yet! Hopefully soon."), !1
    }), $(".autosave").focus(function (e) {
        $(this).attr("data-changed", "false")
    }), $(".autosave").change(function (e) {
        $(this).attr("data-changed", "true")
    }), $(".autosave").change(function (e) {
        return $(this).attr("data-changed") == "true" && (displaySavingInProgress(), $.ajax({
            type: "POST",
            url: Company.path + "/" + Company.id,
            data: "_method=PUT&" + $(this).attr("name") + "=" + escape($(this).val()) + "&company_id=" + Company.id,
            success: function (e) {
                displaySaved()
            }
        })), !1
    }), $(".autosave_fundraise").change(function (e) {
        return displaySavingInProgress(), $.ajax({
            type: "POST",
            url: "/fundraises/" + fundraise_id,
            data: "_method=PUT&" + $(this).attr("name") + "=" + escape($(this).val()) + "&company_id=" + Company.id,
            success: function (e) {
                displaySaved()
            }
        }), !1
    }), $(".autosave_checkbox").change(function (e) {
        return $(this).is(":checked") ? value = 1 : value = 0, displaySavingInProgress(), $.ajax({
            type: "POST",
            url: Company.path + "/" + Company.id,
            data: "_method=PUT&" + $(this).attr("name") + "=" + value + "&company_id=" + Company.id,
            success: function (e) {
                displaySaved()
            }
        }), !1
    }), $(".autosave_fundraise_checkbox").change(function (e) {
        return $(this).is(":checked") ? value = 1 : value = 0, displaySavingInProgress(), $.ajax({
            type: "POST",
            url: "/fundraises/" + fundraise_id,
            data: "_method=PUT&" + $(this).attr("name") + "=" + value + "&company_id=" + Company.id,
            success: function (e) {
                displaySaved()
            }
        }), !1
    }), $("#funding_target").change(function (e) {
        return cents = $("#funding_target").val().replace("$", ""), cents = cents.replace(",", ""), cents = parseInt(cents) * 100, $("#company_funding_target_in_cents").val(cents), calcFee(), displaySavingInProgress(), $.ajax({
            type: "POST",
            url: "/fundraises/" + fundraise_id,
            data: "_method=PUT&fundraise[funding_target_in_cents]=" + cents + "&company_id=" + Company.id,
            success: function (e) {
                displaySaved()
            }
        }), !1
    }), bindPhotoActions(), $("#company_url").keydown(function () {
        $("#hiddenUsername").html($("#company_url").val()), $("#hiddenUsername").width() > 65
    }), $("#company_url").keydown(function () {
        $("#hiddenUsername").width() > 65
    }), $(".tab").mousedown(function () {
        if ($(this).attr("id") == "tab1" && activeTab == 1) return;
        if ($(this).attr("id") == "tab2" && activeTab == 2) return;
        if ($(this).attr("id") == "tab3" && activeTab == 3) return;
        if ($(this).attr("id") == "tab4" && activeTab == 4) return;
        $(".tabIcon", this).addClass("active"), $(".tabIcon", this).css("opacity", .3)
    }), $(".tab").mouseup(function () {
        $(".tabIcon", this).animate({
            opacity: 1
        }, 200)
    }), enableOrDisableSortable($("#planSortable")), enableOrDisableSortable($("#founderSortable")), enableOrDisableSortable($("#investorSortable")), enableOrDisableSortable($("#photoSortable")), $("#company_name").keyup(function () {
        stripSpaces($(this))
    }).change(function () {
            stripSpaces($(this))
        }).blur(function () {
            usernamechanged || (usernamechanged = !0, $("#company_url").trigger("change")), $(this).val() != "" && $("#company_description").attr("placeholder", "About " + $(this).val())
        }), $("#company_postal_code").keyup(function () {
        this.value = this.value.replace(/[^\d]/, "")
    }), $(".strip_http").bind("paste",
        function (e) {
            var t = $(this);
            setTimeout(function () {
                var e = $(t).val();
                test = e.indexOf("https://", 0), test > 0 ? e = e.replace("https://", "") : e = e.replace("http://", ""), $(t).val(e), $(t).trigger("change")
            }, 100)
        }), $(".fieldWithTooltip").focus(function () {
        showTooltip(this, $(this).attr("data-tooltip-title"), $(this).attr("data-tooltip-desc"))
    }), $(".fieldWithTooltip").blur(function () {
        $(this).attr("id") != "company_twitter_url" && ($(this).attr("id") == "company_facebook_url" ? $(this).val() != "" && (value = $(this).val().indexOf("facebook.com/", 0), value < 1 ? showTooltip(this, '<span style="color:red">Error.</span>', "Must be a Facebook URL") : helperTimeout = setTimeout("hideHelper()", 200)) : helperTimeout = setTimeout("hideHelper()", 200))
    }), fieldWithCounter($("#company_tagline"), $("#tagCounter"), 80, "A short and memorable phrase"), fieldWithCounter($("#company_description"), $("#summaryCounter"), 400, "One paragraph about your company"), fieldWithCounter($("#fundraise_funding_purpose"), $("#noteCounter"), 500, null), $(".bottomBar button.next").click(function () {
        $("html,body").animate({
            scrollTop: $("html").offset().top
        }, "fast");
        var e = $(this).attr("data-target");
        return parseInt(e) > 6 ? !0 : (switchTabSubmit($("#tab" + e), $("#tabLayer" + e), e), !1)
    }), $(".addPhoto").unbind("click").click(function () {
        return $.ajax({
            type: "POST",
            url: "/companies/" + Company.id + "/photos",
            data: "add=" + $("#photoSortable").children().length + "&photo_id=0&company_id=" + Company.id,
            success: function (e) {
                var t = JST["templates/companies/photo"]({
                    id: e
                });
                $("#photoSortable").append(t), attachPhotoActions(t), enableOrDisableSortable($("#photoSortable")), bindPhotoActions()
            }
        }), !1
    }), $(".penIcon").click(function () {
        return startEditable($(this).parents(".qanda")), !1
    }), attachEditables(), attachPhotoActions(), $("#company_url").change(function () {}).focus(function () {
        $(this).val() == "" && ($(this).val(""), $(this).css("color", "#333"))
    }).blur(function () {
            $(this).val() == "" && ($(this).val(""), $(this).css("color", "#aaa"))
        }), $("#private_note").keyup(function () {
        charCounter(this, $("#judge_counter"), 400)
    }).keydown(function () {
            charCounter(this, $("#judge_counter"), 400)
        }).blur(function () {
            $(this).val() == "" ? $(this).css("color", "#777") : $(this).css("color", "#222")
        }), $(".invitations button").click(function (e) {
        var t = $(this).parents(".invitations").find("input[type=text]");
        value = t.val(), validateEmail(value) == 0 ? showTooltip(this, '<span style="color:red">Error.</span>', "Must be valid email") : hideHelper();
        if ($(this).html() == '<img src="/assets/ajax-loader_f.gif">' || value.length == 0 || validateEmail(value) == 0) return $(t).focus(), !1;
        oldButtonText = $(this).html(), button = $(this), $(this).html('<img src="/assets/ajax-loader_f.gif">');
        var n = $("#" + t.attr("data-target")),
            r = t.attr("data-target").replace("Sortable", "");
        return $.ajax({
            type: "POST",
            url: "/company_roles",
            data: "role[role]=" + r + "&role[company_id]=" + Company.id + "&role[invitation_email]=" + escape(value),
            success: function (e) {
                n.append(e), t.val(""), handleInvitations(), bindTeamActions(), $(button).html(oldButtonText)
            }
        }), !1
    }), $(".companyMember .deleteIcon").live("click",
        function () {
            return role_id = $(this).parent().find(".role_id").val(), $.ajax({
                type: "POST",
                url: "/company_roles/" + role_id,
                data: "_method=DELETE&role_id=" + role_id,
                success: function (e) {}
            }), $(this).parents(".companyMember").remove(), handleInvitations(), !1
        }), $("#company_logo").change(function () {
        var e = $("#logoPreview").removeClass("nologo");
        handleLogoUpload(this, e, 74, 74)
    }), $("#fundraise_perk_photo").change(function () {
        var e = $("#photoPreview").removeClass("nophoto");
        handlePerkUpload(this, e, 41, 41)
    }), $("#attachLogo").click(function () {
        return $("#company_logo").click(), !1
    }), $("#attachPhoto").click(function () {
        return $("#fundraise_perk_photo").click(), !1
    }), $("#uploadVideo").click(function () {
        return $.fancybox($("#videoEditorPop").html(), e()), !1
    }), $(".nologo").click(function () {
        return $("#company_logo").click(), !1
    }), $(".nophoto").click(function () {
        return $("#fundraise_perk_photo").click(), !1
    }), $(".qHeader").click(function () {
        return header = $(this).attr("id"), $("#layer_" + header).toggle("fast"), !1
    }), $(".addIcon").click(function () {
        var e = $(this);
        return $(this).parent().stop().animate({
                height: 0
            }, 100,
            function () {
                var t = e.parents(".question").find(".question_name_text").text();
                t = $.trim(t), addNewQuestion(t), $(this).remove()
            }), !1
    }), $(".addCustomQuestion").click(function () {
        var e = $("#custom_question").val();
        return e.length > 0 ? addNewQuestion(e) : $("#custom_question").focus(), !1
    }), $("#addQuestionButton").click(function () {
        return $(this).hide(), $("#moreQuestions").show("fast"), !1
    })
}), $(document).ready(function () {
    $("#company_channel").change(function () {
        $(".previewChannel").html($(this).val())
    }), $(".fundingOptionInactive").click(function () {
        holder = $(this), $(this).css("background-color", "rgba(33,33,33,.05)"), setTimeout(' $(holder).css("background-color","rgba(33,33,33,.02)")', 100), $(".orangeLockText", $(this)).animate({
            color: "#F79335"
        }, 400), tempholder = $(".orangeLockText", $(this)), setTimeout('$(tempholder).animate({ color: "#C86376" }, 600); $(tempholder).css("background-position","-40px 0px");', 1e3)
    }), $(".fundingOptionInactive").mouseleave(function () {}), jQuery(function () {
        jQuery.support.placeholder = !1, test = document.createElement("input"), "placeholder" in test && (jQuery.support.placeholder = !0);
        if (!$.support.placeholder) {
            var e = document.activeElement;
            $(":text, textarea").focus(function () {
                $(this).attr("placeholder") != "" && $(this).val() == $(this).attr("placeholder") && $(this).val("").removeClass("hasPlaceholder")
            }).blur(function () {
                    $(this).attr("placeholder") != "" && ($(this).val() == "" || $(this).val() == $(this).attr("placeholder")) && $(this).val($(this).attr("placeholder")).addClass("hasPlaceholder")
                }), $(":text").blur(), $(e).focus(), $("form").submit(function () {
                $(this).find(".hasPlaceholder").each(function () {
                    $(this).val("")
                })
            })
        }
    }), $.cookie("fbScroll") == 1 && ($.cookie("fbScroll", 0, {
        path: "/"
    }), setTimeout("scrollFB()", 500)), $(".photoSelect").bind("mouseover",
        function (e) {
            id = parseInt($(this).attr("id").replace("link_", "")), $("#arrow" + id).removeClass("arrowIcon").addClass("arrowIcon_H")
        }), $(".photoSelect").bind("mouseout",
        function (e) {
            id = parseInt($(this).attr("id").replace("link_", "")), $("#arrow" + id).removeClass("arrowIcon_H").removeClass("arrowIcon_A").addClass("arrowIcon")
        }), $(".photoSelect").bind("click",
        function (e) {
            id = parseInt($(this).attr("id").replace("link_", "")), $("#arrow" + id).removeClass("arrowIcon_A").hide(), $("#blackSpinner" + id).show()
        }), $(".photoSelect").bind("mousedown",
        function (e) {
            id = parseInt($(this).attr("id").replace("link_", "")), $("#arrow" + id).removeClass("arrowIcon_H").addClass("arrowIcon_A")
        }), $(".arrowHook").bind("mouseover",
        function (e) {
            $(this).removeClass("arrowIcon").addClass("arrowIcon_H")
        }), $(".arrowHook").bind("mouseout",
        function (e) {
            $(this).removeClass("arrowIcon_H").removeClass("arrowIcon_A").addClass("arrowIcon")
        }), $(".arrowHook").bind("click",
        function (e) {
            $(".mainPhoto", $(this).parent().parent()).trigger("click"), $(this).removeClass("arrowIcon_A").hide(), $("#blackSpinner" + id).show()
        }), $(".arrowHook").bind("mousedown",
        function (e) {
            $(this).removeClass("arrowIcon_H").addClass("arrowIcon_A")
        }), $(".draftLabel").bind("click",
        function (e) {
            $(".mainPhoto", $(this).parent()).click()
        }), $(".draftLabel").bind("mouseover",
        function (e) {
            $(".photoSelect", $(this).parent()).trigger("mouseover")
        }), $(".draftLabel").bind("mouseout",
        function (e) {
            $(".photoSelect", $(this).parent()).trigger("mouseout")
        }), $(".draftLabel").bind("mousedown",
        function (e) {
            $(".photoSelect", $(this).parent()).trigger("mousedown")
        }), $("#custom_question").bind("keypress",
        function (e) {
            submitQuestionOnEnter(e)
        })
}), $(document).ready(function () {
    bindTeamActions(), minute = 0, clockCounter = setTimeout("addMinute()", 6e4), $(".save", ".clockContainer").click(function (e) {
        $(".minutes_ago").html(""), $(".clockIcon").html('<img class="clockSpinner" src="/assets/clockSpinner.gif">'), $(".status").html("Saving"), $(".save", ".clockContainer").hide(), $.ajax({
            type: "POST",
            url: "/publish?save=1&company_id=" + Company.id,
            data: $("form").serialize(),
            success: function (e) {
                setTimeout("resetClock()", 500)
            },
            error: function (e) {
                alert("Error. You have no Internet connection. Please try saving again later."), $(".clockContainer").show(), $(".clockIcon").html(""), $(".status").html("Error"), $(".minutes_ago").html("Please try again"), $(".save", ".clockContainer").show()
            }
        })
    }), $("form").ajaxSuccess(function () {
        resetClock()
    })
}), $(document).ready(function () {
    attachQuestionPhotoBindings(), $(".tab").mouseover(function () {
        $(".tab").removeClass("hover"), $(this).hasClass("active") || ($(this).addClass("hover"), setStepHover($(this).attr("data-tab")))
    }).mouseout(function () {
            $(".tab").removeClass("hover"), $(".rightArrowHover").removeClass("rightArrowHover"), $(".leftArrowHover").removeClass("leftArrowHover"), $(".rightArrowHoverSelected").removeClass("rightArrowHoverSelected"), $(".leftArrowHoverSelected").removeClass("leftArrowHoverSelected")
        }).mousedown(function () {
            $("html,body").animate({
                scrollTop: $("html").offset().top
            }, "fast"), $(".tab").removeClass("hover"), $(".tab").removeClass("active"), $(".rightArrowHover").removeClass("rightArrowHover"), $(".leftArrowHover").removeClass("leftArrowHover"), $(".rightArrowHoverSelected").removeClass("rightArrowHoverSelected"), $(".leftArrowHoverSelected").removeClass("leftArrowHoverSelected"), activeTab = $(this).attr("data-tab"), setStepSelected($(this).attr("data-tab"));
            var e = $(this).attr("data-tab");
            switchTabSubmit(this, $("#tabLayer" + e), e)
        })
}), jQuery.ajax = function (e) {
    function o(e) {
        return !r.test(e) && /:\/\//.test(e)
    }
    var t = location.protocol,
        n = location.hostname,
        r = RegExp(t + "//" + n),
        i = "http" + (/^https/.test(t) ? "s" : "") + "://query.yahooapis.com/v1/public/yql?callback=?",
        s = 'select * from html where url="{URL}" and xpath="*"';
    return function (t) {
        var n = t.url;
        return /get/i.test(t.type) && !/json/i.test(t.dataType) && o(n) && (t.url = i, t.dataType = "json", t.data = {
            q: s.replace("{URL}", n + (t.data ? (/\?/.test(n) ? "&" : "?") + jQuery.param(t.data) : "")),
            format: "xml"
        }, !t.success && t.complete && (t.success = t.complete, delete t.complete), t.success = function (e) {
            return function (t) {
                e && e.call(this, {
                    responseText: (t.results[0] || "").replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, "")
                }, "success")
            }
        }(t.success)), e.apply(this, arguments)
    }
}(jQuery.ajax),
    function () {}.call(this),
    function (e) {
        e.fn.iframeAutoHeight = function (t) {
            function r(e) {
                n.debug && n.debug === !0 && window.console && console.log(e)
            }
            function i(t, n) {
                r("Diagnostics from '" + n + "'");
                try {
                    r("  " + e(t, window.top.document).contents().find("body")[0].scrollHeight + " for ...find('body')[0].scrollHeight"), r("  " + e(t.contentWindow.document).height() + " for ...contentWindow.document).height()"), r("  " + e(t.contentWindow.document.body).height() + " for ...contentWindow.document.body).height()")
                } catch (i) {
                    r("  unable to check in this state")
                }
                r("End diagnostics -> results vary by browser and when diagnostics are requested")
            }
            var n = e.extend({
                heightOffset: 0,
                minHeight: 0,
                callback: function (e) {},
                debug: !1,
                diagnostics: !1
            }, t);
            return r(n), this.each(function () {
                function s(t) {
                    n.diagnostics && i(t, "resizeHeight");
                    var s = e(t, window.top.document).contents().find("body"),
                        o = s[0].scrollHeight + n.heightOffset;
                    o < n.minHeight && (r("new height is less than minHeight"), o = n.minHeight + n.heightOffset), r("New Height: " + o), t.style.height = o + "px", n.callback.apply(e(t), [{
                        newFrameHeight: o
                    }])
                }
                var t = 0;
                r(this), n.diagnostics && i(this, "each iframe");
                if (e.browser.safari || e.browser.opera) {
                    r("browser is webkit or opera"), e(this).load(function () {
                        var e = 0,
                            n = this;
                        n.style.height = "0px";
                        var i = function () {
                            s(n)
                        };
                        t === 0 && (e = 500), r("load delay: " + e), setTimeout(i, e), t++
                    });
                    var o = e(this).attr("src");
                    e(this).attr("src", ""), e(this).attr("src", o)
                } else e(this).load(function () {
                    s(this)
                })
            })
        }
    }(jQuery),
    function (e) {
        e.fn.autoResize = function (t) {
            var n = e.extend({
                onResize: function () {},
                animate: !0,
                animateDuration: 150,
                animateCallback: function () {},
                extraSpace: 20,
                limit: 1e3
            }, t);
            return this.filter("textarea").each(function () {
                var t = e(this).css({
                    resize: "none",
                    "overflow-y": "hidden"
                }),
                    r = t.height(),
                    i = function () {
                        var n = ["height", "width", "lineHeight", "textDecoration", "letterSpacing"],
                            r = {};
                        return e.each(n,
                            function (e, n) {
                                r[n] = t.css(n)
                            }), t.clone().removeAttr("id").removeAttr("name").css({
                            position: "absolute",
                            top: 0,
                            left: -9999
                        }).css(r).attr("tabIndex", "-1").insertBefore(t)
                    }(),
                    s = null,
                    o = function () {
                        i.height(0).val(e(this).val()).scrollTop(1e4);
                        var o = Math.max(i.scrollTop(), r) + n.extraSpace,
                            u = e(this).add(i);
                        if (s === o) return;
                        s = o;
                        if (o >= n.limit) {
                            e(this).css("overflow-y", "");
                            return
                        }
                        n.onResize.call(this), n.animate && t.css("display") === "block" ? u.stop().animate({
                            height: o
                        }, n.animateDuration, n.animateCallback) : u.height(o)
                    };
                t.unbind(".dynSiz").bind("keyup.dynSiz", o).bind("keydown.dynSiz", o).bind("change.dynSiz", o)
            }), this
        }
    }(jQuery),
    function (e) {
        e.fn.extend({
            stateSelect: function (t) {
                if (!e.browser.msie || e.browser.msie && e.browser.version > 6) return this.each(function () {
                    var t = e(this).find(":selected"),
                        n = t.html();
                    n || (n = "&nbsp;"), e(this).before('<div class="customSelect small" style="margin-top:0px;" ><div style="overflow:hidden; width:55px;" class="select_content">' + n + '</div><div class="arrow"></div></div>').css({
                        position: "absolute",
                        marginLeft: -92,
                        zIndex: 2,
                        height: 72,
                        padding: 10,
                        marginTop: 0,
                        width: 93,
                        opacity: 0,
                        fontSize: e(this).prev().css("font-size")
                    });
                    var r = e(this).prev(),
                        i = r.find(".select_content");
                    r.css({
                        display: "inline-block"
                    });
                    var s = parseInt(r.height()) + parseInt(r.css("padding-top")) + parseInt(r.css("padding-bottom"));
                    e(this).height(s).change(function () {
                        i.text(e(this).find(":selected").val()).parent().addClass("changed")
                    })
                })
            }
        })
    }(jQuery),
    function (e, t) {
        function n(t, n) {
            var i = t.nodeName.toLowerCase();
            if ("area" === i) {
                var s = t.parentNode,
                    o = s.name,
                    u;
                return !t.href || !o || s.nodeName.toLowerCase() !== "map" ? !1 : (u = e("img[usemap=#" + o + "]")[0], !! u && r(u))
            }
            return (/input|select|textarea|button|object/.test(i) ? !t.disabled : "a" == i ? t.href || n : n) && r(t)
        }
        function r(t) {
            return !e(t).parents().andSelf().filter(function () {
                return e.curCSS(this, "visibility") === "hidden" || e.expr.filters.hidden(this)
            }).length
        }
        e.ui = e.ui || {};
        if (e.ui.version) return;
        e.extend(e.ui, {
            version: "1.8.21",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        }), e.fn.extend({
            propAttr: e.fn.prop || e.fn.attr,
            _focus: e.fn.focus,
            focus: function (t, n) {
                return typeof t == "number" ? this.each(function () {
                    var r = this;
                    setTimeout(function () {
                        e(r).focus(), n && n.call(r)
                    }, t)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function () {
                var t;
                return e.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(e.curCSS(this, "position", 1)) && /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
                }).eq(0) : t = this.parents().filter(function () {
                    return /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
                }).eq(0), / fixed / .test(this.css("position")) || !t.length ? e(document) : t
            },
            zIndex: function (n) {
                if (n !== t) return this.css("zIndex", n);
                if (this.length) {
                    var r = e(this[0]),
                        i, s;
                    while (r.length && r[0] !== document) {
                        i = r.css("position");
                        if (i === "absolute" || i === "relative" || i === "fixed") {
                            s = parseInt(r.css("zIndex"), 10);
                            if (!isNaN(s) && s !== 0) return s
                        }
                        r = r.parent()
                    }
                }
                return 0
            },
            disableSelection: function () {
                return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection",
                    function (e) {
                        e.preventDefault()
                    })
            },
            enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        }), e.each(["Width", "Height"],
            function (n, r) {
                function i(t, n, r, i) {
                    return e.each(s,
                        function () {
                            n -= parseFloat(e.curCSS(t, "padding" + this, !0)) || 0, r && (n -= parseFloat(e.curCSS(t, "border" + this + "Width", !0)) || 0), i && (n -= parseFloat(e.curCSS(t, "margin" + this, !0)) || 0)
                        }), n
                }
                var s = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                    o = r.toLowerCase(),
                    u = {
                        innerWidth: e.fn.innerWidth,
                        innerHeight: e.fn.innerHeight,
                        outerWidth: e.fn.outerWidth,
                        outerHeight: e.fn.outerHeight
                    };
                e.fn["inner" + r] = function (n) {
                    return n === t ? u["inner" + r].call(this) : this.each(function () {
                        e(this).css(o, i(this, n) + "px")
                    })
                }, e.fn["outer" + r] = function (t, n) {
                    return typeof t != "number" ? u["outer" + r].call(this, t) : this.each(function () {
                        e(this).css(o, i(this, t, !0, n) + "px")
                    })
                }
            }), e.extend(e.expr[":"], {
            data: function (t, n, r) {
                return !!e.data(t, r[3])
            },
            focusable: function (t) {
                return n(t, !isNaN(e.attr(t, "tabindex")))
            },
            tabbable: function (t) {
                var r = e.attr(t, "tabindex"),
                    i = isNaN(r);
                return (i || r >= 0) && n(t, !i)
            }
        }), e(function () {
            var t = document.body,
                n = t.appendChild(n = document.createElement("div"));
            n.offsetHeight, e.extend(n.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            }), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart" in n, t.removeChild(n).style.display = "none"
        }), e.extend(e.ui, {
            plugin: {
                add: function (t, n, r) {
                    var i = e.ui[t].prototype;
                    for (var s in r) i.plugins[s] = i.plugins[s] || [], i.plugins[s].push([n, r[s]])
                },
                call: function (e, t, n) {
                    var r = e.plugins[t];
                    if (!r || !e.element[0].parentNode) return;
                    for (var i = 0; i < r.length; i++) e.options[r[i][0]] && r[i][1].apply(e.element, n)
                }
            },
            contains: function (e, t) {
                return document.compareDocumentPosition ? e.compareDocumentPosition(t) & 16 : e !== t && e.contains(t)
            },
            hasScroll: function (t, n) {
                if (e(t).css("overflow") === "hidden") return !1;
                var r = n && n === "left" ? "scrollLeft" : "scrollTop",
                    i = !1;
                return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
            },
            isOverAxis: function (e, t, n) {
                return e > t && e < t + n
            },
            isOver: function (t, n, r, i, s, o) {
                return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
            }
        })
    }(jQuery),
    function (e, t) {
        if (e.cleanData) {
            var n = e.cleanData;
            e.cleanData = function (t) {
                for (var r = 0, i;
                     (i = t[r]) != null; r++) try {
                    e(i).triggerHandler("remove")
                } catch (s) {}
                n(t)
            }
        } else {
            var r = e.fn.remove;
            e.fn.remove = function (t, n) {
                return this.each(function () {
                    return n || (!t || e.filter(t, [this]).length) && e("*", this).add([this]).each(function () {
                        try {
                            e(this).triggerHandler("remove")
                        } catch (t) {}
                    }), r.call(e(this), t, n)
                })
            }
        }
        e.widget = function (t, n, r) {
            var i = t.split(".")[0],
                s;
            t = t.split(".")[1], s = i + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][s] = function (n) {
                return !!e.data(n, t)
            }, e[i] = e[i] || {}, e[i][t] = function (e, t) {
                arguments.length && this._createWidget(e, t)
            };
            var o = new n;
            o.options = e.extend(!0, {}, o.options), e[i][t].prototype = e.extend(!0, o, {
                namespace: i,
                widgetName: t,
                widgetEventPrefix: e[i][t].prototype.widgetEventPrefix || t,
                widgetBaseClass: s
            }, r), e.widget.bridge(t, e[i][t])
        }, e.widget.bridge = function (n, r) {
            e.fn[n] = function (i) {
                var s = typeof i == "string",
                    o = Array.prototype.slice.call(arguments, 1),
                    u = this;
                return i = !s && o.length ? e.extend.apply(null, [!0, i].concat(o)) : i, s && i.charAt(0) === "_" ? u : (s ? this.each(function () {
                    var r = e.data(this, n),
                        s = r && e.isFunction(r[i]) ? r[i].apply(r, o) : r;
                    if (s !== r && s !== t) return u = s, !1
                }) : this.each(function () {
                    var t = e.data(this, n);
                    t ? t.option(i || {})._init() : e.data(this, n, new r(i, this))
                }), u)
            }
        }, e.Widget = function (e, t) {
            arguments.length && this._createWidget(e, t)
        }, e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            options: {
                disabled: !1
            },
            _createWidget: function (t, n) {
                e.data(n, this.widgetName, this), this.element = e(n), this.options = e.extend(!0, {}, this.options, this._getCreateOptions(), t);
                var r = this;
                this.element.bind("remove." + this.widgetName,
                    function () {
                        r.destroy()
                    }), this._create(), this._trigger("create"), this._init()
            },
            _getCreateOptions: function () {
                return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
            },
            _create: function () {},
            _init: function () {},
            destroy: function () {
                this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
            },
            widget: function () {
                return this.element
            },
            option: function (n, r) {
                var i = n;
                if (arguments.length === 0) return e.extend({}, this.options);
                if (typeof n == "string") {
                    if (r === t) return this.options[n];
                    i = {}, i[n] = r
                }
                return this._setOptions(i), this
            },
            _setOptions: function (t) {
                var n = this;
                return e.each(t,
                    function (e, t) {
                        n._setOption(e, t)
                    }), this
            },
            _setOption: function (e, t) {
                return this.options[e] = t, e === "disabled" && this.widget()[t ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", t), this
            },
            enable: function () {
                return this._setOption("disabled", !1)
            },
            disable: function () {
                return this._setOption("disabled", !0)
            },
            _trigger: function (t, n, r) {
                var i, s, o = this.options[t];
                r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
                if (s) for (i in s) i in n || (n[i] = s[i]);
                return this.element.trigger(n, r), !(e.isFunction(o) && o.call(this.element[0], n, r) === !1 || n.isDefaultPrevented())
            }
        }
    }(jQuery),
    function (e, t) {
        var n = !1;
        e(document).mouseup(function (e) {
            n = !1
        }), e.widget("ui.mouse", {
            options: {
                cancel: ":input,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function () {
                var t = this;
                this.element.bind("mousedown." + this.widgetName,
                    function (e) {
                        return t._mouseDown(e)
                    }).bind("click." + this.widgetName,
                    function (n) {
                        if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
                    }), this.started = !1
            },
            _mouseDestroy: function () {
                this.element.unbind("." + this.widgetName), e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function (t) {
                if (n) return;
                this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var r = this,
                    i = t.which == 1,
                    s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                if (!i || s || !this._mouseCapture(t)) return !0;
                this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    r.mouseDelayMet = !0
                }, this.options.delay));
                if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
                    this._mouseStarted = this._mouseStart(t) !== !1;
                    if (!this._mouseStarted) return t.preventDefault(), !0
                }
                return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
                    return r._mouseMove(e)
                }, this._mouseUpDelegate = function (e) {
                    return r._mouseUp(e)
                }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
            },
            _mouseMove: function (t) {
                return !e.browser.msie || document.documentMode >= 9 || !! t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
            },
            _mouseUp: function (t) {
                return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target == this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
            },
            _mouseDistanceMet: function (e) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function (e) {
                return this.mouseDelayMet
            },
            _mouseStart: function (e) {},
            _mouseDrag: function (e) {},
            _mouseStop: function (e) {},
            _mouseCapture: function (e) {
                return !0
            }
        })
    }(jQuery),
    function (e, t) {
        e.ui = e.ui || {};
        var n = /left|center|right/,
            r = /top|center|bottom/,
            i = "center",
            s = {},
            o = e.fn.position,
            u = e.fn.offset;
        e.fn.position = function (t) {
            if (!t || !t.of) return o.apply(this, arguments);
            t = e.extend({}, t);
            var u = e(t.of),
                l = u[0],
                h = (t.collision || "flip").split(" "),
                p = t.offset ? t.offset.split(" ") : [0, 0],
                v, m, y;
            return l.nodeType === 9 ? (v = u.width(), m = u.height(), y = {
                top: 0,
                left: 0
            }) : l.setTimeout ? (v = u.width(), m = u.height(), y = {
                top: u.scrollTop(),
                left: u.scrollLeft()
            }) : l.preventDefault ? (t.at = "left top", v = m = 0, y = {
                top: t.of.pageY,
                left: t.of.pageX
            }) : (v = u.outerWidth(), m = u.outerHeight(), y = u.offset()), e.each(["my", "at"],
                function () {
                    var e = (t[this] || "").split(" ");
                    e.length === 1 && (e = n.test(e[0]) ? e.concat([i]) : r.test(e[0]) ? [i].concat(e) : [i, i]), e[0] = n.test(e[0]) ? e[0] : i, e[1] = r.test(e[1]) ? e[1] : i, t[this] = e
                }), h.length === 1 && (h[1] = h[0]), p[0] = parseInt(p[0], 10) || 0, p.length === 1 && (p[1] = p[0]), p[1] = parseInt(p[1], 10) || 0, t.at[0] === "right" ? y.left += v : t.at[0] === i && (y.left += v / 2), t.at[1] === "bottom" ? y.top += m : t.at[1] === i && (y.top += m / 2), y.left += p[0], y.top += p[1], this.each(function () {
                var n = e(this),
                    r = n.outerWidth(),
                    o = n.outerHeight(),
                    u = parseInt(e.curCSS(this, "marginLeft", !0)) || 0,
                    l = parseInt(e.curCSS(this, "marginTop", !0)) || 0,
                    c = r + u + (parseInt(e.curCSS(this, "marginRight", !0)) || 0),
                    d = o + l + (parseInt(e.curCSS(this, "marginBottom", !0)) || 0),
                    g = e.extend({}, y),
                    w;
                t.my[0] === "right" ? g.left -= r : t.my[0] === i && (g.left -= r / 2), t.my[1] === "bottom" ? g.top -= o : t.my[1] === i && (g.top -= o / 2), s.fractions || (g.left = Math.round(g.left), g.top = Math.round(g.top)), w = {
                    left: g.left - u,
                    top: g.top - l
                }, e.each(["left", "top"],
                    function (n, i) {
                        e.ui.position[h[n]] && e.ui.position[h[n]][i](g, {
                            targetWidth: v,
                            targetHeight: m,
                            elemWidth: r,
                            elemHeight: o,
                            collisionPosition: w,
                            collisionWidth: c,
                            collisionHeight: d,
                            offset: p,
                            my: t.my,
                            at: t.at
                        })
                    }), e.fn.bgiframe && n.bgiframe(), n.offset(e.extend(g, {
                    using: t.using
                }))
            })
        }, e.ui.position = {
            fit: {
                left: function (t, n) {
                    var r = e(window),
                        i = n.collisionPosition.left + n.collisionWidth - r.width() - r.scrollLeft();
                    t.left = i > 0 ? t.left - i : Math.max(t.left - n.collisionPosition.left, t.left)
                },
                top: function (t, n) {
                    var r = e(window),
                        i = n.collisionPosition.top + n.collisionHeight - r.height() - r.scrollTop();
                    t.top = i > 0 ? t.top - i : Math.max(t.top - n.collisionPosition.top, t.top)
                }
            },
            flip: {
                left: function (t, n) {
                    if (n.at[0] === i) return;
                    var r = e(window),
                        s = n.collisionPosition.left + n.collisionWidth - r.width() - r.scrollLeft(),
                        o = n.my[0] === "left" ? -n.elemWidth : n.my[0] === "right" ? n.elemWidth : 0,
                        u = n.at[0] === "left" ? n.targetWidth : -n.targetWidth,
                        f = -2 * n.offset[0];
                    t.left += n.collisionPosition.left < 0 ? o + u + f : s > 0 ? o + u + f : 0
                },
                top: function (t, n) {
                    if (n.at[1] === i) return;
                    var r = e(window),
                        s = n.collisionPosition.top + n.collisionHeight - r.height() - r.scrollTop(),
                        o = n.my[1] === "top" ? -n.elemHeight : n.my[1] === "bottom" ? n.elemHeight : 0,
                        u = n.at[1] === "top" ? n.targetHeight : -n.targetHeight,
                        f = -2 * n.offset[1];
                    t.top += n.collisionPosition.top < 0 ? o + u + f : s > 0 ? o + u + f : 0
                }
            }
        }, e.offset.setOffset || (e.offset.setOffset = function (t, n) {
            /static/.test(e.curCSS(t, "position")) && (t.style.position = "relative");
            var r = e(t),
                i = r.offset(),
                s = parseInt(e.curCSS(t, "top", !0), 10) || 0,
                o = parseInt(e.curCSS(t, "left", !0), 10) || 0,
                u = {
                    top: n.top - i.top + s,
                    left: n.left - i.left + o
                };
            "using" in n ? n.using.call(t, u) : r.css(u)
        }, e.fn.offset = function (t) {
            var n = this[0];
            return !n || !n.ownerDocument ? null : t ? e.isFunction(t) ? this.each(function (n) {
                e(this).offset(t.call(this, n, e(this).offset()))
            }) : this.each(function () {
                e.offset.setOffset(this, t)
            }) : u.call(this)
        }),
            function () {
                var t = document.getElementsByTagName("body")[0],
                    n = document.createElement("div"),
                    r, i, o, u, l;
                r = document.createElement(t ? "div" : "body"), o = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, t && e.extend(o, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (var c in o) r.style[c] = o[c];
                r.appendChild(n), i = t || document.documentElement, i.insertBefore(r, i.firstChild), n.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", u = e(n).offset(function (e, t) {
                    return t
                }).offset(), r.innerHTML = "", i.removeChild(r), l = u.top + u.left + (t ? 2e3 : 0), s.fractions = l > 21 && l < 22
            }()
    }(jQuery),
    function (e, t) {
        e.widget("ui.draggable", e.ui.mouse, {
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1
            },
            _create: function () {
                this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
            },
            destroy: function () {
                if (!this.element.data("draggable")) return;
                return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
            },
            _mouseCapture: function (t) {
                var n = this.options;
                return this.helper || n.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (n.iframeFix && e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function () {
                    e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1e3
                    }).css(e(this).offset()).appendTo("body")
                }), !0) : !1)
            },
            _mouseStart: function (t) {
                var n = this.options;
                return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, e.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), n.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
            },
            _mouseDrag: function (t, n) {
                this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute");
                if (!n) {
                    var r = this._uiHash();
                    if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
                    this.position = r.position
                }
                if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
                if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
                return e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
            },
            _mouseStop: function (t) {
                var n = !1;
                e.ui.ddmanager && !this.options.dropBehaviour && (n = e.ui.ddmanager.drop(this, t)), this.dropped && (n = this.dropped, this.dropped = !1);
                var r = this.element[0],
                    i = !1;
                while (r && (r = r.parentNode)) r == document && (i = !0);
                if (!i && this.options.helper === "original") return !1;
                if (this.options.revert == "invalid" && !n || this.options.revert == "valid" && n || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n)) {
                    var s = this;
                    e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10),
                        function () {
                            s._trigger("stop", t) !== !1 && s._clear()
                        })
                } else this._trigger("stop", t) !== !1 && this._clear();
                return !1
            },
            _mouseUp: function (t) {
                return this.options.iframeFix === !0 && e("div.ui-draggable-iframeFix").each(function () {
                    this.parentNode.removeChild(this)
                }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
            },
            cancel: function () {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
            },
            _getHandle: function (t) {
                var n = !this.options.handle || !e(this.options.handle, this.element).length ? !0 : !1;
                return e(this.options.handle, this.element).find("*").andSelf().each(function () {
                    this == t.target && (n = !0)
                }), n
            },
            _createHelper: function (t) {
                var n = this.options,
                    r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
                return r.parents("body").length || r.appendTo(n.appendTo == "parent" ? this.element[0].parentNode : n.appendTo), r[0] != this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"), r
            },
            _adjustOffsetFromHelper: function (t) {
                typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function () {
                this.offsetParent = this.helper.offsetParent();
                var t = this.offsetParent.offset();
                this.cssPosition == "absolute" && this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
                if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.browser.msie) t = {
                    top: 0,
                    left: 0
                };
                return {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function () {
                if (this.cssPosition == "relative") {
                    var e = this.element.position();
                    return {
                        top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function () {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function () {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function () {
                var t = this.options;
                t.containment == "parent" && (t.containment = this.helper[0].parentNode);
                if (t.containment == "document" || t.containment == "window") this.containment = [t.containment == "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t.containment == "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (t.containment == "document" ? 0 : e(window).scrollLeft()) + e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (t.containment == "document" ? 0 : e(window).scrollTop()) + (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                if (!/^(document|window|parent)$/.test(t.containment) && t.containment.constructor != Array) {
                    var n = e(t.containment),
                        r = n[0];
                    if (!r) return;
                    var i = n.offset(),
                        s = e(r).css("overflow") != "hidden";
                    this.containment = [(parseInt(e(r).css("borderLeftWidth"), 10) || 0) + (parseInt(e(r).css("paddingLeft"), 10) || 0), (parseInt(e(r).css("borderTopWidth"), 10) || 0) + (parseInt(e(r).css("paddingTop"), 10) || 0), (s ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(e(r).css("borderLeftWidth"), 10) || 0) - (parseInt(e(r).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (s ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(e(r).css("borderTopWidth"), 10) || 0) - (parseInt(e(r).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n
                } else t.containment.constructor == Array && (this.containment = t.containment)
            },
            _convertPositionTo: function (t, n) {
                n || (n = this.position);
                var r = t == "absolute" ? 1 : -1,
                    i = this.options,
                    s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    o = /(html|body)/i.test(s[0].tagName);
                return {
                    top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r),
                    left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r)
                }
            },
            _generatePosition: function (t) {
                var n = this.options,
                    r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    i = /(html|body)/i.test(r[0].tagName),
                    s = t.pageX,
                    o = t.pageY;
                if (this.originalPosition) {
                    var u;
                    if (this.containment) {
                        if (this.relative_container) {
                            var f = this.relative_container.offset();
                            u = [this.containment[0] + f.left, this.containment[1] + f.top, this.containment[2] + f.left, this.containment[3] + f.top]
                        } else u = this.containment;
                        t.pageX - this.offset.click.left < u[0] && (s = u[0] + this.offset.click.left), t.pageY - this.offset.click.top < u[1] && (o = u[1] + this.offset.click.top), t.pageX - this.offset.click.left > u[2] && (s = u[2] + this.offset.click.left), t.pageY - this.offset.click.top > u[3] && (o = u[3] + this.offset.click.top)
                    }
                    if (n.grid) {
                        var l = n.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY;
                        o = u ? l - this.offset.click.top < u[1] || l - this.offset.click.top > u[3] ? l - this.offset.click.top < u[1] ? l + n.grid[1] : l - n.grid[1] : l : l;
                        var c = n.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX;
                        s = u ? c - this.offset.click.left < u[0] || c - this.offset.click.left > u[2] ? c - this.offset.click.left < u[0] ? c + n.grid[0] : c - n.grid[0] : c : c
                    }
                }
                return {
                    top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
                    left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
                }
            },
            _clear: function () {
                this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
            },
            _trigger: function (t, n, r) {
                return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), t == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
            },
            plugins: {},
            _uiHash: function (e) {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), e.extend(e.ui.draggable, {
            version: "1.8.21"
        }), e.ui.plugin.add("draggable", "connectToSortable", {
            start: function (t, n) {
                var r = e(this).data("draggable"),
                    i = r.options,
                    s = e.extend({}, n, {
                        item: r.element
                    });
                r.sortables = [], e(i.connectToSortable).each(function () {
                    var n = e.data(this, "sortable");
                    n && !n.options.disabled && (r.sortables.push({
                        instance: n,
                        shouldRevert: n.options.revert
                    }), n.refreshPositions(), n._trigger("activate", t, s))
                })
            },
            stop: function (t, n) {
                var r = e(this).data("draggable"),
                    i = e.extend({}, n, {
                        item: r.element
                    });
                e.each(r.sortables,
                    function () {
                        this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper == "original" && this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
                    })
            },
            drag: function (t, n) {
                var r = e(this).data("draggable"),
                    i = this,
                    s = function (t) {
                        var n = this.offset.click.top,
                            r = this.offset.click.left,
                            i = this.positionAbs.top,
                            s = this.positionAbs.left,
                            o = t.height,
                            u = t.width,
                            f = t.top,
                            l = t.left;
                        return e.ui.isOver(i + n, s + r, f, l, o, u)
                    };
                e.each(r.sortables,
                    function (s) {
                        this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                            return n.helper[0]
                        }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
                    })
            }
        }), e.ui.plugin.add("draggable", "cursor", {
            start: function (t, n) {
                var r = e("body"),
                    i = e(this).data("draggable").options;
                r.css("cursor") && (i._cursor = r.css("cursor")), r.css("cursor", i.cursor)
            },
            stop: function (t, n) {
                var r = e(this).data("draggable").options;
                r._cursor && e("body").css("cursor", r._cursor)
            }
        }), e.ui.plugin.add("draggable", "opacity", {
            start: function (t, n) {
                var r = e(n.helper),
                    i = e(this).data("draggable").options;
                r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
            },
            stop: function (t, n) {
                var r = e(this).data("draggable").options;
                r._opacity && e(n.helper).css("opacity", r._opacity)
            }
        }), e.ui.plugin.add("draggable", "scroll", {
            start: function (t, n) {
                var r = e(this).data("draggable");
                r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML" && (r.overflowOffset = r.scrollParent.offset())
            },
            drag: function (t, n) {
                var r = e(this).data("draggable"),
                    i = r.options,
                    s = !1;
                if (r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML") {
                    if (!i.axis || i.axis != "x") r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop - i.scrollSpeed);
                    if (!i.axis || i.axis != "y") r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft - i.scrollSpeed)
                } else {
                    if (!i.axis || i.axis != "x") t.pageY - e(document).scrollTop() < i.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - i.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < i.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + i.scrollSpeed));
                    if (!i.axis || i.axis != "y") t.pageX - e(document).scrollLeft() < i.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - i.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < i.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + i.scrollSpeed))
                }
                s !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(r, t)
            }
        }), e.ui.plugin.add("draggable", "snap", {
            start: function (t, n) {
                var r = e(this).data("draggable"),
                    i = r.options;
                r.snapElements = [], e(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function () {
                    var t = e(this),
                        n = t.offset();
                    this != r.element[0] && r.snapElements.push({
                        item: this,
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        top: n.top,
                        left: n.left
                    })
                })
            },
            drag: function (t, n) {
                var r = e(this).data("draggable"),
                    i = r.options,
                    s = i.snapTolerance,
                    o = n.offset.left,
                    u = o + r.helperProportions.width,
                    f = n.offset.top,
                    l = f + r.helperProportions.height;
                for (var c = r.snapElements.length - 1; c >= 0; c--) {
                    var h = r.snapElements[c].left,
                        p = h + r.snapElements[c].width,
                        d = r.snapElements[c].top,
                        v = d + r.snapElements[c].height;
                    if (!(h - s < o && o < p + s && d - s < f && f < v + s || h - s < o && o < p + s && d - s < l && l < v + s || h - s < u && u < p + s && d - s < f && f < v + s || h - s < u && u < p + s && d - s < l && l < v + s)) {
                        r.snapElements[c].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, e.extend(r._uiHash(), {
                            snapItem: r.snapElements[c].item
                        })), r.snapElements[c].snapping = !1;
                        continue
                    }
                    if (i.snapMode != "inner") {
                        var m = Math.abs(d - l) <= s,
                            g = Math.abs(v - f) <= s,
                            y = Math.abs(h - u) <= s,
                            b = Math.abs(p - o) <= s;
                        m && (n.position.top = r._convertPositionTo("relative", {
                            top: d - r.helperProportions.height,
                            left: 0
                        }).top - r.margins.top), g && (n.position.top = r._convertPositionTo("relative", {
                            top: v,
                            left: 0
                        }).top - r.margins.top), y && (n.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: h - r.helperProportions.width
                        }).left - r.margins.left), b && (n.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: p
                        }).left - r.margins.left)
                    }
                    var w = m || g || y || b;
                    if (i.snapMode != "outer") {
                        var m = Math.abs(d - f) <= s,
                            g = Math.abs(v - l) <= s,
                            y = Math.abs(h - o) <= s,
                            b = Math.abs(p - u) <= s;
                        m && (n.position.top = r._convertPositionTo("relative", {
                            top: d,
                            left: 0
                        }).top - r.margins.top), g && (n.position.top = r._convertPositionTo("relative", {
                            top: v - r.helperProportions.height,
                            left: 0
                        }).top - r.margins.top), y && (n.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: h
                        }).left - r.margins.left), b && (n.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: p - r.helperProportions.width
                        }).left - r.margins.left)
                    }!r.snapElements[c].snapping && (m || g || y || b || w) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, e.extend(r._uiHash(), {
                        snapItem: r.snapElements[c].item
                    })), r.snapElements[c].snapping = m || g || y || b || w
                }
            }
        }), e.ui.plugin.add("draggable", "stack", {
            start: function (t, n) {
                var r = e(this).data("draggable").options,
                    i = e.makeArray(e(r.stack)).sort(function (t, n) {
                        return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
                    });
                if (!i.length) return;
                var s = parseInt(i[0].style.zIndex) || 0;
                e(i).each(function (e) {
                    this.style.zIndex = s + e
                }), this[0].style.zIndex = s + i.length
            }
        }), e.ui.plugin.add("draggable", "zIndex", {
            start: function (t, n) {
                var r = e(n.helper),
                    i = e(this).data("draggable").options;
                r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
            },
            stop: function (t, n) {
                var r = e(this).data("draggable").options;
                r._zIndex && e(n.helper).css("zIndex", r._zIndex)
            }
        })
    }(jQuery),
    function (e, t) {
        e.widget("ui.droppable", {
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                activeClass: !1,
                addClasses: !0,
                greedy: !1,
                hoverClass: !1,
                scope: "default",
                tolerance: "intersect"
            },
            _create: function () {
                var t = this.options,
                    n = t.accept;
                this.isover = 0, this.isout = 1, this.accept = e.isFunction(n) ? n : function (e) {
                    return e.is(n)
                }, this.proportions = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }, e.ui.ddmanager.droppables[t.scope] = e.ui.ddmanager.droppables[t.scope] || [], e.ui.ddmanager.droppables[t.scope].push(this), t.addClasses && this.element.addClass("ui-droppable")
            },
            destroy: function () {
                var t = e.ui.ddmanager.droppables[this.options.scope];
                for (var n = 0; n < t.length; n++) t[n] == this && t.splice(n, 1);
                return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
            },
            _setOption: function (t, n) {
                t == "accept" && (this.accept = e.isFunction(n) ? n : function (e) {
                    return e.is(n)
                }), e.Widget.prototype._setOption.apply(this, arguments)
            },
            _activate: function (t) {
                var n = e.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass), n && this._trigger("activate", t, this.ui(n))
            },
            _deactivate: function (t) {
                var n = e.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass), n && this._trigger("deactivate", t, this.ui(n))
            },
            _over: function (t) {
                var n = e.ui.ddmanager.current;
                if (!n || (n.currentItem || n.element)[0] == this.element[0]) return;
                this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(n)))
            },
            _out: function (t) {
                var n = e.ui.ddmanager.current;
                if (!n || (n.currentItem || n.element)[0] == this.element[0]) return;
                this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(n)))
            },
            _drop: function (t, n) {
                var r = n || e.ui.ddmanager.current;
                if (!r || (r.currentItem || r.element)[0] == this.element[0]) return !1;
                var i = !1;
                return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                    var t = e.data(this, "droppable");
                    if (t.options.greedy && !t.options.disabled && t.options.scope == r.options.scope && t.accept.call(t.element[0], r.currentItem || r.element) && e.ui.intersect(r, e.extend(t, {
                        offset: t.element.offset()
                    }), t.options.tolerance)) return i = !0, !1
                }), i ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(r)), this.element) : !1
            },
            ui: function (e) {
                return {
                    draggable: e.currentItem || e.element,
                    helper: e.helper,
                    position: e.position,
                    offset: e.positionAbs
                }
            }
        }), e.extend(e.ui.droppable, {
            version: "1.8.21"
        }), e.ui.intersect = function (t, n, r) {
            if (!n.offset) return !1;
            var i = (t.positionAbs || t.position.absolute).left,
                s = i + t.helperProportions.width,
                o = (t.positionAbs || t.position.absolute).top,
                u = o + t.helperProportions.height,
                f = n.offset.left,
                l = f + n.proportions.width,
                c = n.offset.top,
                h = c + n.proportions.height;
            switch (r) {
                case "fit":
                    return f <= i && s <= l && c <= o && u <= h;
                case "intersect":
                    return f < i + t.helperProportions.width / 2 && s - t.helperProportions.width / 2 < l && c < o + t.helperProportions.height / 2 && u - t.helperProportions.height / 2 < h;
                case "pointer":
                    var p = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left,
                        d = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top,
                        v = e.ui.isOver(d, p, c, f, n.proportions.height, n.proportions.width);
                    return v;
                case "touch":
                    return (o >= c && o <= h || u >= c && u <= h || o < c && u > h) && (i >= f && i <= l || s >= f && s <= l || i < f && s > l);
                default:
                    return !1
            }
        }, e.ui.ddmanager = {
            current: null,
            droppables: {
                "default": []
            },
            prepareOffsets: function (t, n) {
                var r = e.ui.ddmanager.droppables[t.options.scope] || [],
                    i = n ? n.type : null,
                    s = (t.currentItem || t.element).find(":data(droppable)").andSelf();
                e: for (var o = 0; o < r.length; o++) {
                    if (r[o].options.disabled || t && !r[o].accept.call(r[o].element[0], t.currentItem || t.element)) continue;
                    for (var u = 0; u < s.length; u++) if (s[u] == r[o].element[0]) {
                        r[o].proportions.height = 0;
                        continue e
                    }
                    r[o].visible = r[o].element.css("display") != "none";
                    if (!r[o].visible) continue;
                    i == "mousedown" && r[o]._activate.call(r[o], n), r[o].offset = r[o].element.offset(), r[o].proportions = {
                        width: r[o].element[0].offsetWidth,
                        height: r[o].element[0].offsetHeight
                    }
                }
            },
            drop: function (t, n) {
                var r = !1;
                return e.each(e.ui.ddmanager.droppables[t.options.scope] || [],
                    function () {
                        if (!this.options) return;
                        !this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance) && (r = this._drop.call(this, n) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, n))
                    }), r
            },
            dragStart: function (t, n) {
                t.element.parents(":not(body,html)").bind("scroll.droppable",
                    function () {
                        t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
                    })
            },
            drag: function (t, n) {
                t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, n), e.each(e.ui.ddmanager.droppables[t.options.scope] || [],
                    function () {
                        if (this.options.disabled || this.greedyChild || !this.visible) return;
                        var r = e.ui.intersect(t, this, this.options.tolerance),
                            i = !r && this.isover == 1 ? "isout" : r && this.isover == 0 ? "isover" : null;
                        if (!i) return;
                        var s;
                        if (this.options.greedy) {
                            var o = this.element.parents(":data(droppable):eq(0)");
                            o.length && (s = e.data(o[0], "droppable"), s.greedyChild = i == "isover" ? 1 : 0)
                        }
                        s && i == "isover" && (s.isover = 0, s.isout = 1, s._out.call(s, n)), this[i] = 1, this[i == "isout" ? "isover" : "isout"] = 0, this[i == "isover" ? "_over" : "_out"].call(this, n), s && i == "isout" && (s.isout = 0, s.isover = 1, s._over.call(s, n))
                    })
            },
            dragStop: function (t, n) {
                t.element.parents(":not(body,html)").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
            }
        }
    }(jQuery),
    function (e, t) {
        e.widget("ui.sortable", e.ui.mouse, {
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3
            },
            _create: function () {
                var e = this.options;
                this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? e.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
            },
            destroy: function () {
                e.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
                for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
                return this
            },
            _setOption: function (t, n) {
                t === "disabled" ? (this.options[t] = n, this.widget()[n ? "addClass" : "removeClass"]("ui-sortable-disabled")) : e.Widget.prototype._setOption.apply(this, arguments)
            },
            _mouseCapture: function (t, n) {
                var r = this;
                if (this.reverting) return !1;
                if (this.options.disabled || this.options.type == "static") return !1;
                this._refreshItems(t);
                var i = null,
                    s = this,
                    o = e(t.target).parents().each(function () {
                        if (e.data(this, r.widgetName + "-item") == s) return i = e(this), !1
                    });
                e.data(t.target, r.widgetName + "-item") == s && (i = e(t.target));
                if (!i) return !1;
                if (this.options.handle && !n) {
                    var u = !1;
                    e(this.options.handle, i).find("*").andSelf().each(function () {
                        this == t.target && (u = !0)
                    });
                    if (!u) return !1
                }
                return this.currentItem = i, this._removeCurrentsFromItems(), !0
            },
            _mouseStart: function (t, n, r) {
                var i = this.options,
                    s = this;
                this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, e.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), i.containment && this._setContainment(), i.cursor && (e("body").css("cursor") && (this._storedCursor = e("body").css("cursor")), e("body").css("cursor", i.cursor)), i.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", i.opacity)), i.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", i.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
                if (!r) for (var o = this.containers.length - 1; o >= 0; o--) this.containers[o]._trigger("activate", t, s._uiHash(this));
                return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
            },
            _mouseDrag: function (t) {
                this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
                if (this.options.scroll) {
                    var n = this.options,
                        r = !1;
                    this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < n.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + n.scrollSpeed : t.pageY - this.overflowOffset.top < n.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - n.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < n.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + n.scrollSpeed : t.pageX - this.overflowOffset.left < n.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - n.scrollSpeed)) : (t.pageY - e(document).scrollTop() < n.scrollSensitivity ? r = e(document).scrollTop(e(document).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < n.scrollSensitivity && (r = e(document).scrollTop(e(document).scrollTop() + n.scrollSpeed)), t.pageX - e(document).scrollLeft() < n.scrollSensitivity ? r = e(document).scrollLeft(e(document).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < n.scrollSensitivity && (r = e(document).scrollLeft(e(document).scrollLeft() + n.scrollSpeed))), r !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)
                }
                this.positionAbs = this._convertPositionTo("absolute");
                if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
                if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
                for (var i = this.items.length - 1; i >= 0; i--) {
                    var s = this.items[i],
                        o = s.item[0],
                        u = this._intersectsWithPointer(s);
                    if (!u) continue;
                    if (o != this.currentItem[0] && this.placeholder[u == 1 ? "next" : "prev"]()[0] != o && !e.ui.contains(this.placeholder[0], o) && (this.options.type == "semi-dynamic" ? !e.ui.contains(this.element[0], o) : !0)) {
                        this.direction = u == 1 ? "down" : "up";
                        if (this.options.tolerance != "pointer" && !this._intersectsWithSides(s)) break;
                        this._rearrange(t, s), this._trigger("change", t, this._uiHash());
                        break
                    }
                }
                return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function (t, n) {
                if (!t) return;
                e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t);
                if (this.options.revert) {
                    var r = this,
                        i = r.placeholder.offset();
                    r.reverting = !0, e(this.helper).animate({
                            left: i.left - this.offset.parent.left - r.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                            top: i.top - this.offset.parent.top - r.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                        }, parseInt(this.options.revert, 10) || 500,
                        function () {
                            r._clear(t)
                        })
                } else this._clear(t, n);
                return !1
            },
            cancel: function () {
                var t = this;
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                    for (var n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("deactivate", null, t._uiHash(this)), this.containers[n].containerCache.over && (this.containers[n]._trigger("out", null, t._uiHash(this)), this.containers[n].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function (t) {
                var n = this._getItemsAsjQuery(t && t.connected),
                    r = [];
                return t = t || {}, e(n).each(function () {
                    var n = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[-=_](.+)/);
                    n && r.push((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] : n[2]))
                }), !r.length && t.key && r.push(t.key + "="), r.join("&")
            },
            toArray: function (t) {
                var n = this._getItemsAsjQuery(t && t.connected),
                    r = [];
                return t = t || {}, n.each(function () {
                    r.push(e(t.item || this).attr(t.attribute || "id") || "")
                }), r
            },
            _intersectsWith: function (e) {
                var t = this.positionAbs.left,
                    n = t + this.helperProportions.width,
                    r = this.positionAbs.top,
                    i = r + this.helperProportions.height,
                    s = e.left,
                    o = s + e.width,
                    u = e.top,
                    a = u + e.height,
                    f = this.offset.click.top,
                    l = this.offset.click.left,
                    c = r + f > u && r + f < a && t + l > s && t + l < o;
                return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? c : s < t + this.helperProportions.width / 2 && n - this.helperProportions.width / 2 < o && u < r + this.helperProportions.height / 2 && i - this.helperProportions.height / 2 < a
            },
            _intersectsWithPointer: function (t) {
                var n = this.options.axis === "x" || e.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                    r = this.options.axis === "y" || e.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                    i = n && r,
                    s = this._getDragVerticalDirection(),
                    o = this._getDragHorizontalDirection();
                return i ? this.floating ? o && o == "right" || s == "down" ? 2 : 1 : s && (s == "down" ? 2 : 1) : !1
            },
            _intersectsWithSides: function (t) {
                var n = e.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                    r = e.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                    i = this._getDragVerticalDirection(),
                    s = this._getDragHorizontalDirection();
                return this.floating && s ? s == "right" && r || s == "left" && !r : i && (i == "down" && n || i == "up" && !n)
            },
            _getDragVerticalDirection: function () {
                var e = this.positionAbs.top - this.lastPositionAbs.top;
                return e != 0 && (e > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function () {
                var e = this.positionAbs.left - this.lastPositionAbs.left;
                return e != 0 && (e > 0 ? "right" : "left")
            },
            refresh: function (e) {
                return this._refreshItems(e), this.refreshPositions(), this
            },
            _connectWith: function () {
                var e = this.options;
                return e.connectWith.constructor == String ? [e.connectWith] : e.connectWith
            },
            _getItemsAsjQuery: function (t) {
                var n = this,
                    r = [],
                    i = [],
                    s = this._connectWith();
                if (s && t) for (var o = s.length - 1; o >= 0; o--) {
                    var u = e(s[o]);
                    for (var f = u.length - 1; f >= 0; f--) {
                        var l = e.data(u[f], this.widgetName);
                        l && l != this && !l.options.disabled && i.push([e.isFunction(l.options.items) ? l.options.items.call(l.element) : e(l.options.items, l.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), l])
                    }
                }
                i.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
                for (var o = i.length - 1; o >= 0; o--) i[o][0].each(function () {
                    r.push(this)
                });
                return e(r)
            },
            _removeCurrentsFromItems: function () {
                var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                for (var t = 0; t < this.items.length; t++) for (var n = 0; n < e.length; n++) e[n] == this.items[t].item[0] && this.items.splice(t, 1)
            },
            _refreshItems: function (t) {
                this.items = [], this.containers = [this];
                var n = this.items,
                    r = this,
                    i = [
                        [e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                            item: this.currentItem
                        }) : e(this.options.items, this.element), this]
                    ],
                    s = this._connectWith();
                if (s && this.ready) for (var o = s.length - 1; o >= 0; o--) {
                    var u = e(s[o]);
                    for (var f = u.length - 1; f >= 0; f--) {
                        var l = e.data(u[f], this.widgetName);
                        l && l != this && !l.options.disabled && (i.push([e.isFunction(l.options.items) ? l.options.items.call(l.element[0], t, {
                            item: this.currentItem
                        }) : e(l.options.items, l.element), l]), this.containers.push(l))
                    }
                }
                for (var o = i.length - 1; o >= 0; o--) {
                    var c = i[o][1],
                        h = i[o][0];
                    for (var f = 0, p = h.length; f < p; f++) {
                        var d = e(h[f]);
                        d.data(this.widgetName + "-item", c), n.push({
                            item: d,
                            instance: c,
                            width: 0,
                            height: 0,
                            left: 0,
                            top: 0
                        })
                    }
                }
            },
            refreshPositions: function (t) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                for (var n = this.items.length - 1; n >= 0; n--) {
                    var r = this.items[n];
                    if (r.instance != this.currentContainer && this.currentContainer && r.item[0] != this.currentItem[0]) continue;
                    var i = this.options.toleranceElement ? e(this.options.toleranceElement, r.item) : r.item;
                    t || (r.width = i.outerWidth(), r.height = i.outerHeight());
                    var s = i.offset();
                    r.left = s.left, r.top = s.top
                }
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else for (var n = this.containers.length - 1; n >= 0; n--) {
                    var s = this.containers[n].element.offset();
                    this.containers[n].containerCache.left = s.left, this.containers[n].containerCache.top = s.top, this.containers[n].containerCache.width = this.containers[n].element.outerWidth(), this.containers[n].containerCache.height = this.containers[n].element.outerHeight()
                }
                return this
            },
            _createPlaceholder: function (t) {
                var n = t || this,
                    r = n.options;
                if (!r.placeholder || r.placeholder.constructor == String) {
                    var i = r.placeholder;
                    r.placeholder = {
                        element: function () {
                            var t = e(document.createElement(n.currentItem[0].nodeName)).addClass(i || n.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                            return i || (t.style.visibility = "hidden"), t
                        },
                        update: function (e, t) {
                            if (i && !r.forcePlaceholderSize) return;
                            t.height() || t.height(n.currentItem.innerHeight() - parseInt(n.currentItem.css("paddingTop") || 0, 10) - parseInt(n.currentItem.css("paddingBottom") || 0, 10)), t.width() || t.width(n.currentItem.innerWidth() - parseInt(n.currentItem.css("paddingLeft") || 0, 10) - parseInt(n.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
                n.placeholder = e(r.placeholder.element.call(n.element, n.currentItem)), n.currentItem.after(n.placeholder), r.placeholder.update(n, n.placeholder)
            },
            _contactContainers: function (t) {
                var n = null,
                    r = null;
                for (var i = this.containers.length - 1; i >= 0; i--) {
                    if (e.ui.contains(this.currentItem[0], this.containers[i].element[0])) continue;
                    if (this._intersectsWith(this.containers[i].containerCache)) {
                        if (n && e.ui.contains(this.containers[i].element[0], n.element[0])) continue;
                        n = this.containers[i], r = i
                    } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", t, this._uiHash(this)), this.containers[i].containerCache.over = 0)
                }
                if (!n) return;
                if (this.containers.length === 1) this.containers[r]._trigger("over", t, this._uiHash(this)), this.containers[r].containerCache.over = 1;
                else if (this.currentContainer != this.containers[r]) {
                    var s = 1e4,
                        o = null,
                        u = this.positionAbs[this.containers[r].floating ? "left" : "top"];
                    for (var f = this.items.length - 1; f >= 0; f--) {
                        if (!e.ui.contains(this.containers[r].element[0], this.items[f].item[0])) continue;
                        var l = this.containers[r].floating ? this.items[f].item.offset().left : this.items[f].item.offset().top;
                        Math.abs(l - u) < s && (s = Math.abs(l - u), o = this.items[f], this.direction = l - u > 0 ? "down" : "up")
                    }
                    if (!o && !this.options.dropOnEmpty) return;
                    this.currentContainer = this.containers[r], o ? this._rearrange(t, o, null, !0) : this._rearrange(t, null, this.containers[r].element, !0), this._trigger("change", t, this._uiHash()), this.containers[r]._trigger("change", t, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[r]._trigger("over", t, this._uiHash(this)), this.containers[r].containerCache.over = 1
                }
            },
            _createHelper: function (t) {
                var n = this.options,
                    r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t, this.currentItem])) : n.helper == "clone" ? this.currentItem.clone() : this.currentItem;
                return r.parents("body").length || e(n.appendTo != "parent" ? n.appendTo : this.currentItem[0].parentNode)[0].appendChild(r[0]), r[0] == this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), (r[0].style.width == "" || n.forceHelperSize) && r.width(this.currentItem.width()), (r[0].style.height == "" || n.forceHelperSize) && r.height(this.currentItem.height()), r
            },
            _adjustOffsetFromHelper: function (t) {
                typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function () {
                this.offsetParent = this.helper.offsetParent();
                var t = this.offsetParent.offset();
                this.cssPosition == "absolute" && this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
                if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.browser.msie) t = {
                    top: 0,
                    left: 0
                };
                return {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function () {
                if (this.cssPosition == "relative") {
                    var e = this.currentItem.position();
                    return {
                        top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function () {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function () {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function () {
                var t = this.options;
                t.containment == "parent" && (t.containment = this.helper[0].parentNode);
                if (t.containment == "document" || t.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                if (!/^(document|window|parent)$/.test(t.containment)) {
                    var n = e(t.containment)[0],
                        r = e(t.containment).offset(),
                        i = e(n).css("overflow") != "hidden";
                    this.containment = [r.left + (parseInt(e(n).css("borderLeftWidth"), 10) || 0) + (parseInt(e(n).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(e(n).css("borderTopWidth"), 10) || 0) + (parseInt(e(n).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (i ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(e(n).css("borderLeftWidth"), 10) || 0) - (parseInt(e(n).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (i ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(e(n).css("borderTopWidth"), 10) || 0) - (parseInt(e(n).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
                }
            },
            _convertPositionTo: function (t, n) {
                n || (n = this.position);
                var r = t == "absolute" ? 1 : -1,
                    i = this.options,
                    s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    o = /(html|body)/i.test(s[0].tagName);
                return {
                    top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (e.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r),
                    left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (e.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r)
                }
            },
            _generatePosition: function (t) {
                var n = this.options,
                    r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    i = /(html|body)/i.test(r[0].tagName);
                this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
                var s = t.pageX,
                    o = t.pageY;
                if (this.originalPosition) {
                    this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (s = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (s = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top));
                    if (n.grid) {
                        var u = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1];
                        o = this.containment ? u - this.offset.click.top < this.containment[1] || u - this.offset.click.top > this.containment[3] ? u - this.offset.click.top < this.containment[1] ? u + n.grid[1] : u - n.grid[1] : u : u;
                        var f = this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0];
                        s = this.containment ? f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2] ? f - this.offset.click.left < this.containment[0] ? f + n.grid[0] : f - n.grid[0] : f : f
                    }
                }
                return {
                    top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (e.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
                    left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (e.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
                }
            },
            _rearrange: function (e, t, n, r) {
                n ? n[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var i = this,
                    s = this.counter;
                window.setTimeout(function () {
                    s == i.counter && i.refreshPositions(!r)
                }, 0)
            },
            _clear: function (t, n) {
                this.reverting = !1;
                var r = [],
                    i = this;
                !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
                if (this.helper[0] == this.currentItem[0]) {
                    for (var s in this._storedCSS) if (this._storedCSS[s] == "auto" || this._storedCSS[s] == "static") this._storedCSS[s] = "";
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else this.currentItem.show();
                this.fromOutside && !n && r.push(function (e) {
                    this._trigger("receive", e, this._uiHash(this.fromOutside))
                }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !n && r.push(function (e) {
                    this._trigger("update", e, this._uiHash())
                });
                if (!e.ui.contains(this.element[0], this.currentItem[0])) {
                    n || r.push(function (e) {
                        this._trigger("remove", e, this._uiHash())
                    });
                    for (var s = this.containers.length - 1; s >= 0; s--) e.ui.contains(this.containers[s].element[0], this.currentItem[0]) && !n && (r.push(function (e) {
                        return function (t) {
                            e._trigger("receive", t, this._uiHash(this))
                        }
                    }.call(this, this.containers[s])), r.push(function (e) {
                        return function (t) {
                            e._trigger("update", t, this._uiHash(this))
                        }
                    }.call(this, this.containers[s])))
                }
                for (var s = this.containers.length - 1; s >= 0; s--) n || r.push(function (e) {
                    return function (t) {
                        e._trigger("deactivate", t, this._uiHash(this))
                    }
                }.call(this, this.containers[s])), this.containers[s].containerCache.over && (r.push(function (e) {
                    return function (t) {
                        e._trigger("out", t, this._uiHash(this))
                    }
                }.call(this, this.containers[s])), this.containers[s].containerCache.over = 0);
                this._storedCursor && e("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
                if (this.cancelHelperRemoval) {
                    if (!n) {
                        this._trigger("beforeStop", t, this._uiHash());
                        for (var s = 0; s < r.length; s++) r[s].call(this, t);
                        this._trigger("stop", t, this._uiHash())
                    }
                    return !1
                }
                n || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
                if (!n) {
                    for (var s = 0; s < r.length; s++) r[s].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !0
            },
            _trigger: function () {
                e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function (t) {
                var n = t || this;
                return {
                    helper: n.helper,
                    placeholder: n.placeholder || e([]),
                    position: n.position,
                    originalPosition: n.originalPosition,
                    offset: n.positionAbs,
                    item: n.currentItem,
                    sender: t ? t.element : null
                }
            }
        }), e.extend(e.ui.sortable, {
            version: "1.8.21"
        })
    }(jQuery),
    function (e, t) {
        function n() {
            return ++i
        }
        function r() {
            return ++s
        }
        var i = 0,
            s = 0;
        e.widget("ui.tabs", {
            options: {
                add: null,
                ajaxOptions: null,
                cache: !1,
                cookie: null,
                collapsible: !1,
                disable: null,
                disabled: [],
                enable: null,
                event: "click",
                fx: null,
                idPrefix: "ui-tabs-",
                load: null,
                panelTemplate: "<div></div>",
                remove: null,
                select: null,
                show: null,
                spinner: "<em>Loading&#8230;</em>",
                tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
            },
            _create: function () {
                this._tabify(!0)
            },
            _setOption: function (e, t) {
                if (e == "selected") {
                    if (this.options.collapsible && t == this.options.selected) return;
                    this.select(t)
                } else this.options[e] = t, this._tabify()
            },
            _tabId: function (e) {
                return e.title && e.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + n()
            },
            _sanitizeSelector: function (e) {
                return e.replace(/:/g, "\\:")
            },
            _cookie: function () {
                var t = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + r());
                return e.cookie.apply(null, [t].concat(e.makeArray(arguments)))
            },
            _ui: function (e, t) {
                return {
                    tab: e,
                    panel: t,
                    index: this.anchors.index(e)
                }
            },
            _cleanup: function () {
                this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                    var t = e(this);
                    t.html(t.data("label.tabs")).removeData("label.tabs")
                })
            },
            _tabify: function (n) {
                function r(t, n) {
                    t.css("display", ""), !e.support.opacity && n.opacity && t[0].style.removeAttribute("filter")
                }
                var i = this,
                    s = this.options,
                    o = /^#.+/;
                this.list = this.element.find("ol,ul").eq(0), this.lis = e(" > li:has(a[href])", this.list), this.anchors = this.lis.map(function () {
                    return e("a", this)[0]
                }), this.panels = e([]), this.anchors.each(function (t, n) {
                    var r = e(n).attr("href"),
                        u = r.split("#")[0],
                        f;
                    u && (u === location.toString().split("#")[0] || (f = e("base")[0]) && u === f.href) && (r = n.hash, n.href = r);
                    if (o.test(r)) i.panels = i.panels.add(i.element.find(i._sanitizeSelector(r)));
                    else if (r && r !== "#") {
                        e.data(n, "href.tabs", r), e.data(n, "load.tabs", r.replace(/#.*$/, ""));
                        var l = i._tabId(n);
                        n.href = "#" + l;
                        var c = i.element.find("#" + l);
                        c.length || (c = e(s.panelTemplate).attr("id", l).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(i.panels[t - 1] || i.list), c.data("destroy.tabs", !0)), i.panels = i.panels.add(c)
                    } else s.disabled.push(t)
                }), n ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), s.selected === t ? (location.hash && this.anchors.each(function (e, t) {
                    if (t.hash == location.hash) return s.selected = e, !1
                }), typeof s.selected != "number" && s.cookie && (s.selected = parseInt(i._cookie(), 10)), typeof s.selected != "number" && this.lis.filter(".ui-tabs-selected").length && (s.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), s.selected = s.selected || (this.lis.length ? 0 : -1)) : s.selected === null && (s.selected = -1), s.selected = s.selected >= 0 && this.anchors[s.selected] || s.selected < 0 ? s.selected : 0, s.disabled = e.unique(s.disabled.concat(e.map(this.lis.filter(".ui-state-disabled"),
                    function (e, t) {
                        return i.lis.index(e)
                    }))).sort(), e.inArray(s.selected, s.disabled) != -1 && s.disabled.splice(e.inArray(s.selected, s.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), s.selected >= 0 && this.anchors.length && (i.element.find(i._sanitizeSelector(i.anchors[s.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(s.selected).addClass("ui-tabs-selected ui-state-active"), i.element.queue("tabs",
                    function () {
                        i._trigger("show", null, i._ui(i.anchors[s.selected], i.element.find(i._sanitizeSelector(i.anchors[s.selected].hash))[0]))
                    }), this.load(s.selected)), e(window).bind("unload",
                    function () {
                        i.lis.add(i.anchors).unbind(".tabs"), i.lis = i.anchors = i.panels = null
                    })) : s.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[s.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"), s.cookie && this._cookie(s.selected, s.cookie);
                for (var u = 0, f; f = this.lis[u]; u++) e(f)[e.inArray(u, s.disabled) != -1 && !e(f).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
                s.cache === !1 && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs");
                if (s.event !== "mouseover") {
                    var l = function (e, t) {
                        t.is(":not(.ui-state-disabled)") && t.addClass("ui-state-" + e)
                    },
                        c = function (e, t) {
                            t.removeClass("ui-state-" + e)
                        };
                    this.lis.bind("mouseover.tabs",
                        function () {
                            l("hover", e(this))
                        }), this.lis.bind("mouseout.tabs",
                        function () {
                            c("hover", e(this))
                        }), this.anchors.bind("focus.tabs",
                        function () {
                            l("focus", e(this).closest("li"))
                        }), this.anchors.bind("blur.tabs",
                        function () {
                            c("focus", e(this).closest("li"))
                        })
                }
                var h, p;
                s.fx && (e.isArray(s.fx) ? (h = s.fx[0], p = s.fx[1]) : h = p = s.fx);
                var d = p ? function (t, n) {
                    e(t).closest("li").addClass("ui-tabs-selected ui-state-active"), n.hide().removeClass("ui-tabs-hide").animate(p, p.duration || "normal",
                        function () {
                            r(n, p), i._trigger("show", null, i._ui(t, n[0]))
                        })
                } : function (t, n) {
                    e(t).closest("li").addClass("ui-tabs-selected ui-state-active"), n.removeClass("ui-tabs-hide"), i._trigger("show", null, i._ui(t, n[0]))
                },
                    v = h ? function (e, t) {
                        t.animate(h, h.duration || "normal",
                            function () {
                                i.lis.removeClass("ui-tabs-selected ui-state-active"), t.addClass("ui-tabs-hide"), r(t, h), i.element.dequeue("tabs")
                            })
                    } : function (e, t, n) {
                        i.lis.removeClass("ui-tabs-selected ui-state-active"), t.addClass("ui-tabs-hide"), i.element.dequeue("tabs")
                    };
                this.anchors.bind(s.event + ".tabs",
                    function () {
                        var t = this,
                            n = e(t).closest("li"),
                            r = i.panels.filter(":not(.ui-tabs-hide)"),
                            o = i.element.find(i._sanitizeSelector(t.hash));
                        if (n.hasClass("ui-tabs-selected") && !s.collapsible || n.hasClass("ui-state-disabled") || n.hasClass("ui-state-processing") || i.panels.filter(":animated").length || i._trigger("select", null, i._ui(this, o[0])) === !1) return this.blur(), !1;
                        s.selected = i.anchors.index(this), i.abort();
                        if (s.collapsible) {
                            if (n.hasClass("ui-tabs-selected")) return s.selected = -1, s.cookie && i._cookie(s.selected, s.cookie), i.element.queue("tabs",
                                function () {
                                    v(t, r)
                                }).dequeue("tabs"), this.blur(), !1;
                            if (!r.length) return s.cookie && i._cookie(s.selected, s.cookie), i.element.queue("tabs",
                                function () {
                                    d(t, o)
                                }), i.load(i.anchors.index(this)), this.blur(), !1
                        }
                        s.cookie && i._cookie(s.selected, s.cookie);
                        if (!o.length) throw "jQuery UI Tabs: Mismatching fragment identifier.";
                        r.length && i.element.queue("tabs",
                            function () {
                                v(t, r)
                            }), i.element.queue("tabs",
                            function () {
                                d(t, o)
                            }), i.load(i.anchors.index(this)), e.browser.msie && this.blur()
                    }), this.anchors.bind("click.tabs",
                    function () {
                        return !1
                    })
            },
            _getIndex: function (e) {
                return typeof e == "string" && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e
            },
            destroy: function () {
                var t = this.options;
                return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.each(function () {
                    var t = e.data(this, "href.tabs");
                    t && (this.href = t);
                    var n = e(this).unbind(".tabs");
                    e.each(["href", "load", "cache"],
                        function (e, t) {
                            n.removeData(t + ".tabs")
                        })
                }), this.lis.unbind(".tabs").add(this.panels).each(function () {
                    e.data(this, "destroy.tabs") ? e(this).remove() : e(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
                }), t.cookie && this._cookie(null, t.cookie), this
            },
            add: function (n, r, i) {
                i === t && (i = this.anchors.length);
                var s = this,
                    o = this.options,
                    u = e(o.tabTemplate.replace(/#\{href\}/g, n).replace(/#\{label\}/g, r)),
                    f = n.indexOf("#") ? this._tabId(e("a", u)[0]) : n.replace("#", "");
                u.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
                var l = s.element.find("#" + f);
                return l.length || (l = e(o.panelTemplate).attr("id", f).data("destroy.tabs", !0)), l.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), i >= this.lis.length ? (u.appendTo(this.list), l.appendTo(this.list[0].parentNode)) : (u.insertBefore(this.lis[i]), l.insertBefore(this.panels[i])), o.disabled = e.map(o.disabled,
                    function (e, t) {
                        return e >= i ? ++e : e
                    }), this._tabify(), this.anchors.length == 1 && (o.selected = 0, u.addClass("ui-tabs-selected ui-state-active"), l.removeClass("ui-tabs-hide"), this.element.queue("tabs",
                    function () {
                        s._trigger("show", null, s._ui(s.anchors[0], s.panels[0]))
                    }), this.load(0)), this._trigger("add", null, this._ui(this.anchors[i], this.panels[i])), this
            },
            remove: function (t) {
                t = this._getIndex(t);
                var n = this.options,
                    r = this.lis.eq(t).remove(),
                    i = this.panels.eq(t).remove();
                return r.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(t + (t + 1 < this.anchors.length ? 1 : -1)), n.disabled = e.map(e.grep(n.disabled,
                    function (e, n) {
                        return e != t
                    }),
                    function (e, n) {
                        return e >= t ? --e : e
                    }), this._tabify(), this._trigger("remove", null, this._ui(r.find("a")[0], i[0])), this
            },
            enable: function (t) {
                t = this._getIndex(t);
                var n = this.options;
                if (e.inArray(t, n.disabled) == -1) return;
                return this.lis.eq(t).removeClass("ui-state-disabled"), n.disabled = e.grep(n.disabled,
                    function (e, n) {
                        return e != t
                    }), this._trigger("enable", null, this._ui(this.anchors[t], this.panels[t])), this
            },
            disable: function (e) {
                e = this._getIndex(e);
                var t = this,
                    n = this.options;
                return e != n.selected && (this.lis.eq(e).addClass("ui-state-disabled"), n.disabled.push(e), n.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[e], this.panels[e]))), this
            },
            select: function (e) {
                e = this._getIndex(e);
                if (e == -1) {
                    if (!this.options.collapsible || this.options.selected == -1) return this;
                    e = this.options.selected
                }
                return this.anchors.eq(e).trigger(this.options.event + ".tabs"), this
            },
            load: function (t) {
                t = this._getIndex(t);
                var n = this,
                    r = this.options,
                    i = this.anchors.eq(t)[0],
                    s = e.data(i, "load.tabs");
                this.abort();
                if (!s || this.element.queue("tabs").length !== 0 && e.data(i, "cache.tabs")) {
                    this.element.dequeue("tabs");
                    return
                }
                this.lis.eq(t).addClass("ui-state-processing");
                if (r.spinner) {
                    var o = e("span", i);
                    o.data("label.tabs", o.html()).html(r.spinner)
                }
                return this.xhr = e.ajax(e.extend({}, r.ajaxOptions, {
                    url: s,
                    success: function (s, o) {
                        n.element.find(n._sanitizeSelector(i.hash)).html(s), n._cleanup(), r.cache && e.data(i, "cache.tabs", !0), n._trigger("load", null, n._ui(n.anchors[t], n.panels[t]));
                        try {
                            r.ajaxOptions.success(s, o)
                        } catch (u) {}
                    },
                    error: function (e, s, o) {
                        n._cleanup(), n._trigger("load", null, n._ui(n.anchors[t], n.panels[t]));
                        try {
                            r.ajaxOptions.error(e, s, t, i)
                        } catch (o) {}
                    }
                })), n.element.dequeue("tabs"), this
            },
            abort: function () {
                return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this
            },
            url: function (e, t) {
                return this.anchors.eq(e).removeData("cache.tabs").data("load.tabs", t), this
            },
            length: function () {
                return this.anchors.length
            }
        }), e.extend(e.ui.tabs, {
            version: "1.8.21"
        }), e.extend(e.ui.tabs.prototype, {
            rotation: null,
            rotate: function (e, t) {
                var n = this,
                    r = this.options,
                    i = n._rotate || (n._rotate = function (t) {
                        clearTimeout(n.rotation), n.rotation = setTimeout(function () {
                            var e = r.selected;
                            n.select(++e < n.anchors.length ? e : 0)
                        }, e), t && t.stopPropagation()
                    }),
                    s = n._unrotate || (n._unrotate = t ? function (e) {
                        i()
                    } : function (e) {
                        e.clientX && n.rotate(null)
                    });
                return e ? (this.element.bind("tabsshow", i), this.anchors.bind(r.event + ".tabs", s), i()) : (clearTimeout(n.rotation), this.element.unbind("tabsshow", i), this.anchors.unbind(r.event + ".tabs", s), delete this._rotate, delete this._unrotate), this
            }
        })
    }(jQuery),
    function ($, undefined) {
        function Datepicker() {
            this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
        }
        function bindHover(e) {
            var t = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return e.bind("mouseout",
                function (e) {
                    var n = $(e.target).closest(t);
                    if (!n.length) return;
                    n.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
                }).bind("mouseover",
                function (n) {
                    var r = $(n.target).closest(t);
                    if ($.datepicker._isDisabledDatepicker(instActive.inline ? e.parent()[0] : instActive.input[0]) || !r.length) return;
                    r.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), r.addClass("ui-state-hover"), r.hasClass("ui-datepicker-prev") && r.addClass("ui-datepicker-prev-hover"), r.hasClass("ui-datepicker-next") && r.addClass("ui-datepicker-next-hover")
                })
        }
        function extendRemove(e, t) {
            $.extend(e, t);
            for (var n in t) if (t[n] == null || t[n] == undefined) e[n] = t[n];
            return e
        }
        function isArray(e) {
            return e && ($.browser.safari && typeof e == "object" && e.length || e.constructor && e.constructor.toString().match(/\Array\(\)/))
        }
        $.extend($.ui, {
            datepicker: {
                version: "1.8.21"
            }
        });
        var PROP_NAME = "datepicker",
            dpuuid = (new Date).getTime(),
            instActive;
        $.extend(Datepicker.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            log: function () {
                this.debug && console.log.apply("", arguments)
            },
            _widgetDatepicker: function () {
                return this.dpDiv
            },
            setDefaults: function (e) {
                return extendRemove(this._defaults, e || {}), this
            },
            _attachDatepicker: function (target, settings) {
                var inlineSettings = null;
                for (var attrName in this._defaults) {
                    var attrValue = target.getAttribute("date:" + attrName);
                    if (attrValue) {
                        inlineSettings = inlineSettings || {};
                        try {
                            inlineSettings[attrName] = eval(attrValue)
                        } catch (err) {
                            inlineSettings[attrName] = attrValue
                        }
                    }
                }
                var nodeName = target.nodeName.toLowerCase(),
                    inline = nodeName == "div" || nodeName == "span";
                target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
                var inst = this._newInst($(target), inline);
                inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
            },
            _newInst: function (e, t) {
                var n = e[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
                return {
                    id: n,
                    input: e,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: t,
                    dpDiv: t ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
                }
            },
            _connectDatepicker: function (e, t) {
                var n = $(e);
                t.append = $([]), t.trigger = $([]);
                if (n.hasClass(this.markerClassName)) return;
                this._attachments(n, t), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",
                    function (e, n, r) {
                        t.settings[n] = r
                    }).bind("getData.datepicker",
                    function (e, n) {
                        return this._get(t, n)
                    }), this._autoSize(t), $.data(e, PROP_NAME, t), t.settings.disabled && this._disableDatepicker(e)
            },
            _attachments: function (e, t) {
                var n = this._get(t, "appendText"),
                    r = this._get(t, "isRTL");
                t.append && t.append.remove(), n && (t.append = $('<span class="' + this._appendClass + '">' + n + "</span>"), e[r ? "before" : "after"](t.append)), e.unbind("focus", this._showDatepicker), t.trigger && t.trigger.remove();
                var i = this._get(t, "showOn");
                (i == "focus" || i == "both") && e.focus(this._showDatepicker);
                if (i == "button" || i == "both") {
                    var s = this._get(t, "buttonText"),
                        o = this._get(t, "buttonImage");
                    t.trigger = $(this._get(t, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                        src: o,
                        alt: s,
                        title: s
                    }) : $('<button type="button"></button>').addClass(this._triggerClass).html(o == "" ? s : $("<img/>").attr({
                        src: o,
                        alt: s,
                        title: s
                    }))), e[r ? "before" : "after"](t.trigger), t.trigger.click(function () {
                        return $.datepicker._datepickerShowing && $.datepicker._lastInput == e[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != e[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(e[0])) : $.datepicker._showDatepicker(e[0]), !1
                    })
                }
            },
            _autoSize: function (e) {
                if (this._get(e, "autoSize") && !e.inline) {
                    var t = new Date(2009, 11, 20),
                        n = this._get(e, "dateFormat");
                    if (n.match(/[DM]/)) {
                        var r = function (e) {
                            var t = 0,
                                n = 0;
                            for (var r = 0; r < e.length; r++) e[r].length > t && (t = e[r].length, n = r);
                            return n
                        };
                        t.setMonth(r(this._get(e, n.match(/MM/) ? "monthNames" : "monthNamesShort"))), t.setDate(r(this._get(e, n.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - t.getDay())
                    }
                    e.input.attr("size", this._formatDate(e, t).length)
                }
            },
            _inlineDatepicker: function (e, t) {
                var n = $(e);
                if (n.hasClass(this.markerClassName)) return;
                n.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker",
                    function (e, n, r) {
                        t.settings[n] = r
                    }).bind("getData.datepicker",
                    function (e, n) {
                        return this._get(t, n)
                    }), $.data(e, PROP_NAME, t), this._setDate(t, this._getDefaultDate(t), !0), this._updateDatepicker(t), this._updateAlternate(t), t.settings.disabled && this._disableDatepicker(e), t.dpDiv.css("display", "block")
            },
            _dialogDatepicker: function (e, t, n, r, i) {
                var s = this._dialogInst;
                if (!s) {
                    this.uuid += 1;
                    var o = "dp" + this.uuid;
                    this._dialogInput = $('<input type="text" id="' + o + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), s = this._dialogInst = this._newInst(this._dialogInput, !1), s.settings = {}, $.data(this._dialogInput[0], PROP_NAME, s)
                }
                extendRemove(s.settings, r || {}), t = t && t.constructor == Date ? this._formatDate(s, t) : t, this._dialogInput.val(t), this._pos = i ? i.length ? i : [i.pageX, i.pageY] : null;
                if (!this._pos) {
                    var u = document.documentElement.clientWidth,
                        a = document.documentElement.clientHeight,
                        f = document.documentElement.scrollLeft || document.body.scrollLeft,
                        l = document.documentElement.scrollTop || document.body.scrollTop;
                    this._pos = [u / 2 - 100 + f, a / 2 - 150 + l]
                }
                return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), s.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, s), this
            },
            _destroyDatepicker: function (e) {
                var t = $(e),
                    n = $.data(e, PROP_NAME);
                if (!t.hasClass(this.markerClassName)) return;
                var r = e.nodeName.toLowerCase();
                $.removeData(e, PROP_NAME), r == "input" ? (n.append.remove(), n.trigger.remove(), t.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (r == "div" || r == "span") && t.removeClass(this.markerClassName).empty()
            },
            _enableDatepicker: function (e) {
                var t = $(e),
                    n = $.data(e, PROP_NAME);
                if (!t.hasClass(this.markerClassName)) return;
                var r = e.nodeName.toLowerCase();
                if (r == "input") e.disabled = !1, n.trigger.filter("button").each(function () {
                    this.disabled = !1
                }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    });
                else if (r == "div" || r == "span") {
                    var i = t.children("." + this._inlineClass);
                    i.children().removeClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                }
                this._disabledInputs = $.map(this._disabledInputs,
                    function (t) {
                        return t == e ? null : t
                    })
            },
            _disableDatepicker: function (e) {
                var t = $(e),
                    n = $.data(e, PROP_NAME);
                if (!t.hasClass(this.markerClassName)) return;
                var r = e.nodeName.toLowerCase();
                if (r == "input") e.disabled = !0, n.trigger.filter("button").each(function () {
                    this.disabled = !0
                }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    });
                else if (r == "div" || r == "span") {
                    var i = t.children("." + this._inlineClass);
                    i.children().addClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                }
                this._disabledInputs = $.map(this._disabledInputs,
                    function (t) {
                        return t == e ? null : t
                    }), this._disabledInputs[this._disabledInputs.length] = e
            },
            _isDisabledDatepicker: function (e) {
                if (!e) return !1;
                for (var t = 0; t < this._disabledInputs.length; t++) if (this._disabledInputs[t] == e) return !0;
                return !1
            },
            _getInst: function (e) {
                try {
                    return $.data(e, PROP_NAME)
                } catch (t) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function (e, t, n) {
                var r = this._getInst(e);
                if (arguments.length == 2 && typeof t == "string") return t == "defaults" ? $.extend({}, $.datepicker._defaults) : r ? t == "all" ? $.extend({}, r.settings) : this._get(r, t) : null;
                var i = t || {};
                typeof t == "string" && (i = {}, i[t] = n);
                if (r) {
                    this._curInst == r && this._hideDatepicker();
                    var s = this._getDateDatepicker(e, !0),
                        o = this._getMinMaxDate(r, "min"),
                        u = this._getMinMaxDate(r, "max");
                    extendRemove(r.settings, i), o !== null && i.dateFormat !== undefined && i.minDate === undefined && (r.settings.minDate = this._formatDate(r, o)), u !== null && i.dateFormat !== undefined && i.maxDate === undefined && (r.settings.maxDate = this._formatDate(r, u)), this._attachments($(e), r), this._autoSize(r), this._setDate(r, s), this._updateAlternate(r), this._updateDatepicker(r)
                }
            },
            _changeDatepicker: function (e, t, n) {
                this._optionDatepicker(e, t, n)
            },
            _refreshDatepicker: function (e) {
                var t = this._getInst(e);
                t && this._updateDatepicker(t)
            },
            _setDateDatepicker: function (e, t) {
                var n = this._getInst(e);
                n && (this._setDate(n, t), this._updateDatepicker(n), this._updateAlternate(n))
            },
            _getDateDatepicker: function (e, t) {
                var n = this._getInst(e);
                return n && !n.inline && this._setDateFromField(n, t), n ? this._getDate(n) : null
            },
            _doKeyDown: function (e) {
                var t = $.datepicker._getInst(e.target),
                    n = !0,
                    r = t.dpDiv.is(".ui-datepicker-rtl");
                t._keyEvent = !0;
                if ($.datepicker._datepickerShowing) switch (e.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(), n = !1;
                        break;
                    case 13:
                        var i = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", t.dpDiv);
                        i[0] && $.datepicker._selectDay(e.target, t.selectedMonth, t.selectedYear, i[0]);
                        var s = $.datepicker._get(t, "onSelect");
                        if (s) {
                            var o = $.datepicker._formatDate(t);
                            s.apply(t.input ? t.input[0] : null, [o, t])
                        } else $.datepicker._hideDatepicker();
                        return !1;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(e.target, e.ctrlKey ? -$.datepicker._get(t, "stepBigMonths") : -$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(e.target, e.ctrlKey ? +$.datepicker._get(t, "stepBigMonths") : +$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 35:
                        (e.ctrlKey || e.metaKey) && $.datepicker._clearDate(e.target), n = e.ctrlKey || e.metaKey;
                        break;
                    case 36:
                        (e.ctrlKey || e.metaKey) && $.datepicker._gotoToday(e.target), n = e.ctrlKey || e.metaKey;
                        break;
                    case 37:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), n = e.ctrlKey || e.metaKey, e.originalEvent.altKey && $.datepicker._adjustDate(e.target, e.ctrlKey ? -$.datepicker._get(t, "stepBigMonths") : -$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 38:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, - 7, "D"), n = e.ctrlKey || e.metaKey;
                        break;
                    case 39:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), n = e.ctrlKey || e.metaKey, e.originalEvent.altKey && $.datepicker._adjustDate(e.target, e.ctrlKey ? +$.datepicker._get(t, "stepBigMonths") : +$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 40:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, 7, "D"), n = e.ctrlKey || e.metaKey;
                        break;
                    default:
                        n = !1
                } else e.keyCode == 36 && e.ctrlKey ? $.datepicker._showDatepicker(this) : n = !1;
                n && (e.preventDefault(), e.stopPropagation())
            },
            _doKeyPress: function (e) {
                var t = $.datepicker._getInst(e.target);
                if ($.datepicker._get(t, "constrainInput")) {
                    var n = $.datepicker._possibleChars($.datepicker._get(t, "dateFormat")),
                        r = String.fromCharCode(e.charCode == undefined ? e.keyCode : e.charCode);
                    return e.ctrlKey || e.metaKey || r < " " || !n || n.indexOf(r) > -1
                }
            },
            _doKeyUp: function (e) {
                var t = $.datepicker._getInst(e.target);
                if (t.input.val() != t.lastVal) try {
                    var n = $.datepicker.parseDate($.datepicker._get(t, "dateFormat"), t.input ? t.input.val() : null, $.datepicker._getFormatConfig(t));
                    n && ($.datepicker._setDateFromField(t), $.datepicker._updateAlternate(t), $.datepicker._updateDatepicker(t))
                } catch (r) {
                    $.datepicker.log(r)
                }
                return !0
            },
            _showDatepicker: function (e) {
                e = e.target || e, e.nodeName.toLowerCase() != "input" && (e = $("input", e.parentNode)[0]);
                if ($.datepicker._isDisabledDatepicker(e) || $.datepicker._lastInput == e) return;
                var t = $.datepicker._getInst(e);
                $.datepicker._curInst && $.datepicker._curInst != t && ($.datepicker._curInst.dpDiv.stop(!0, !0), t && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                var n = $.datepicker._get(t, "beforeShow"),
                    r = n ? n.apply(e, [e, t]) : {};
                if (r === !1) return;
                extendRemove(t.settings, r), t.lastVal = null, $.datepicker._lastInput = e, $.datepicker._setDateFromField(t), $.datepicker._inDialog && (e.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(e), $.datepicker._pos[1] += e.offsetHeight);
                var i = !1;
                $(e).parents().each(function () {
                    return i |= $(this).css("position") == "fixed", !i
                }), i && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
                var s = {
                    left: $.datepicker._pos[0],
                    top: $.datepicker._pos[1]
                };
                $.datepicker._pos = null, t.dpDiv.empty(), t.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), $.datepicker._updateDatepicker(t), s = $.datepicker._checkOffset(t, s, i), t.dpDiv.css({
                    position: $.datepicker._inDialog && $.blockUI ? "static" : i ? "fixed" : "absolute",
                    display: "none",
                    left: s.left + "px",
                    top: s.top + "px"
                });
                if (!t.inline) {
                    var o = $.datepicker._get(t, "showAnim"),
                        u = $.datepicker._get(t, "duration"),
                        a = function () {
                            var e = t.dpDiv.find("iframe.ui-datepicker-cover");
                            if ( !! e.length) {
                                var n = $.datepicker._getBorders(t.dpDiv);
                                e.css({
                                    left: -n[0],
                                    top: -n[1],
                                    width: t.dpDiv.outerWidth(),
                                    height: t.dpDiv.outerHeight()
                                })
                            }
                        };
                    t.dpDiv.zIndex($(e).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[o] ? t.dpDiv.show(o, $.datepicker._get(t, "showOptions"), u, a) : t.dpDiv[o || "show"](o ? u : null, a), (!o || !u) && a(), t.input.is(":visible") && !t.input.is(":disabled") && t.input.focus(), $.datepicker._curInst = t
                }
            },
            _updateDatepicker: function (e) {
                var t = this;
                t.maxRows = 4;
                var n = $.datepicker._getBorders(e.dpDiv);
                instActive = e, e.dpDiv.empty().append(this._generateHTML(e));
                var r = e.dpDiv.find("iframe.ui-datepicker-cover");
                !r.length || r.css({
                    left: -n[0],
                    top: -n[1],
                    width: e.dpDiv.outerWidth(),
                    height: e.dpDiv.outerHeight()
                }), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var i = this._getNumberOfMonths(e),
                    s = i[1],
                    o = 17;
                e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", o * s + "em"), e.dpDiv[(i[0] != 1 || i[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e == $.datepicker._curInst && $.datepicker._datepickerShowing && e.input && e.input.is(":visible") && !e.input.is(":disabled") && e.input[0] != document.activeElement && e.input.focus();
                if (e.yearshtml) {
                    var u = e.yearshtml;
                    setTimeout(function () {
                        u === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), u = e.yearshtml = null
                    }, 0)
                }
            },
            _getBorders: function (e) {
                var t = function (e) {
                    return {
                        thin: 1,
                        medium: 2,
                        thick: 3
                    }[e] || e
                };
                return [parseFloat(t(e.css("border-left-width"))), parseFloat(t(e.css("border-top-width")))]
            },
            _checkOffset: function (e, t, n) {
                var r = e.dpDiv.outerWidth(),
                    i = e.dpDiv.outerHeight(),
                    s = e.input ? e.input.outerWidth() : 0,
                    o = e.input ? e.input.outerHeight() : 0,
                    u = document.documentElement.clientWidth + $(document).scrollLeft(),
                    a = document.documentElement.clientHeight + $(document).scrollTop();
                return t.left -= this._get(e, "isRTL") ? r - s : 0, t.left -= n && t.left == e.input.offset().left ? $(document).scrollLeft() : 0, t.top -= n && t.top == e.input.offset().top + o ? $(document).scrollTop() : 0, t.left -= Math.min(t.left, t.left + r > u && u > r ? Math.abs(t.left + r - u) : 0), t.top -= Math.min(t.top, t.top + i > a && a > i ? Math.abs(i + o) : 0), t
            },
            _findPos: function (e) {
                var t = this._getInst(e),
                    n = this._get(t, "isRTL");
                while (e && (e.type == "hidden" || e.nodeType != 1 || $.expr.filters.hidden(e))) e = e[n ? "previousSibling" : "nextSibling"];
                var r = $(e).offset();
                return [r.left, r.top]
            },
            _hideDatepicker: function (e) {
                var t = this._curInst;
                if (!t || e && t != $.data(e, PROP_NAME)) return;
                if (this._datepickerShowing) {
                    var n = this._get(t, "showAnim"),
                        r = this._get(t, "duration"),
                        i = function () {
                            $.datepicker._tidyDialog(t)
                        };
                    $.effects && $.effects[n] ? t.dpDiv.hide(n, $.datepicker._get(t, "showOptions"), r, i) : t.dpDiv[n == "slideDown" ? "slideUp" : n == "fadeIn" ? "fadeOut" : "hide"](n ? r : null, i), n || i(), this._datepickerShowing = !1;
                    var s = this._get(t, "onClose");
                    s && s.apply(t.input ? t.input[0] : null, [t.input ? t.input.val() : "", t]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
                }
            },
            _tidyDialog: function (e) {
                e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function (e) {
                if (!$.datepicker._curInst) return;
                var t = $(e.target),
                    n = $.datepicker._getInst(t[0]);
                (t[0].id != $.datepicker._mainDivId && t.parents("#" + $.datepicker._mainDivId).length == 0 && !t.hasClass($.datepicker.markerClassName) && !t.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || t.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != n) && $.datepicker._hideDatepicker()
            },
            _adjustDate: function (e, t, n) {
                var r = $(e),
                    i = this._getInst(r[0]);
                if (this._isDisabledDatepicker(r[0])) return;
                this._adjustInstDate(i, t + (n == "M" ? this._get(i, "showCurrentAtPos") : 0), n), this._updateDatepicker(i)
            },
            _gotoToday: function (e) {
                var t = $(e),
                    n = this._getInst(t[0]);
                if (this._get(n, "gotoCurrent") && n.currentDay) n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear;
                else {
                    var r = new Date;
                    n.selectedDay = r.getDate(), n.drawMonth = n.selectedMonth = r.getMonth(), n.drawYear = n.selectedYear = r.getFullYear()
                }
                this._notifyChange(n), this._adjustDate(t)
            },
            _selectMonthYear: function (e, t, n) {
                var r = $(e),
                    i = this._getInst(r[0]);
                i["selected" + (n == "M" ? "Month" : "Year")] = i["draw" + (n == "M" ? "Month" : "Year")] = parseInt(t.options[t.selectedIndex].value, 10), this._notifyChange(i), this._adjustDate(r)
            },
            _selectDay: function (e, t, n, r) {
                var i = $(e);
                if ($(r).hasClass(this._unselectableClass) || this._isDisabledDatepicker(i[0])) return;
                var s = this._getInst(i[0]);
                s.selectedDay = s.currentDay = $("a", r).html(), s.selectedMonth = s.currentMonth = t, s.selectedYear = s.currentYear = n, this._selectDate(e, this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear))
            },
            _clearDate: function (e) {
                var t = $(e),
                    n = this._getInst(t[0]);
                this._selectDate(t, "")
            },
            _selectDate: function (e, t) {
                var n = $(e),
                    r = this._getInst(n[0]);
                t = t != null ? t : this._formatDate(r), r.input && r.input.val(t), this._updateAlternate(r);
                var i = this._get(r, "onSelect");
                i ? i.apply(r.input ? r.input[0] : null, [t, r]) : r.input && r.input.trigger("change"), r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], typeof r.input[0] != "object" && r.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function (e) {
                var t = this._get(e, "altField");
                if (t) {
                    var n = this._get(e, "altFormat") || this._get(e, "dateFormat"),
                        r = this._getDate(e),
                        i = this.formatDate(n, r, this._getFormatConfig(e));
                    $(t).each(function () {
                        $(this).val(i)
                    })
                }
            },
            noWeekends: function (e) {
                var t = e.getDay();
                return [t > 0 && t < 6, ""]
            },
            iso8601Week: function (e) {
                var t = new Date(e.getTime());
                t.setDate(t.getDate() + 4 - (t.getDay() || 7));
                var n = t.getTime();
                return t.setMonth(0), t.setDate(1), Math.floor(Math.round((n - t) / 864e5) / 7) + 1
            },
            parseDate: function (e, t, n) {
                if (e == null || t == null) throw "Invalid arguments";
                t = typeof t == "object" ? t.toString() : t + "";
                if (t == "") return null;
                var r = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff;
                r = typeof r != "string" ? r : (new Date).getFullYear() % 100 + parseInt(r, 10);
                var i = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                    s = (n ? n.dayNames : null) || this._defaults.dayNames,
                    o = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                    u = (n ? n.monthNames : null) || this._defaults.monthNames,
                    a = -1,
                    f = -1,
                    l = -1,
                    c = -1,
                    h = !1,
                    p = function (t) {
                        var n = y + 1 < e.length && e.charAt(y + 1) == t;
                        return n && y++, n
                    },
                    d = function (e) {
                        var n = p(e),
                            r = e == "@" ? 14 : e == "!" ? 20 : e == "y" && n ? 4 : e == "o" ? 3 : 2,
                            i = new RegExp("^\\d{1," + r + "}"),
                            s = t.substring(g).match(i);
                        if (!s) throw "Missing number at position " + g;
                        return g += s[0].length, parseInt(s[0], 10)
                    },
                    v = function (e, n, r) {
                        var i = $.map(p(e) ? r : n,
                            function (e, t) {
                                return [[t, e]]
                            }).sort(function (e, t) {
                                return -(e[1].length - t[1].length)
                            }),
                            s = -1;
                        $.each(i,
                            function (e, n) {
                                var r = n[1];
                                if (t.substr(g, r.length).toLowerCase() == r.toLowerCase()) return s = n[0], g += r.length, !1
                            });
                        if (s != -1) return s + 1;
                        throw "Unknown name at position " + g
                    },
                    m = function () {
                        if (t.charAt(g) != e.charAt(y)) throw "Unexpected literal at position " + g;
                        g++
                    },
                    g = 0;
                for (var y = 0; y < e.length; y++) if (h) e.charAt(y) == "'" && !p("'") ? h = !1 : m();
                else switch (e.charAt(y)) {
                        case "d":
                            l = d("d");
                            break;
                        case "D":
                            v("D", i, s);
                            break;
                        case "o":
                            c = d("o");
                            break;
                        case "m":
                            f = d("m");
                            break;
                        case "M":
                            f = v("M", o, u);
                            break;
                        case "y":
                            a = d("y");
                            break;
                        case "@":
                            var b = new Date(d("@"));
                            a = b.getFullYear(), f = b.getMonth() + 1, l = b.getDate();
                            break;
                        case "!":
                            var b = new Date((d("!") - this._ticksTo1970) / 1e4);
                            a = b.getFullYear(), f = b.getMonth() + 1, l = b.getDate();
                            break;
                        case "'":
                            p("'") ? m() : h = !0;
                            break;
                        default:
                            m()
                    }
                if (g < t.length) throw "Extra/unparsed characters found in date: " + t.substring(g);
                a == -1 ? a = (new Date).getFullYear() : a < 100 && (a += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (a <= r ? 0 : -100));
                if (c > -1) {
                    f = 1, l = c;
                    do {
                        var w = this._getDaysInMonth(a, f - 1);
                        if (l <= w) break;
                        f++, l -= w
                    } while (!0)
                }
                var b = this._daylightSavingAdjust(new Date(a, f - 1, l));
                if (b.getFullYear() != a || b.getMonth() + 1 != f || b.getDate() != l) throw "Invalid date";
                return b
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
            formatDate: function (e, t, n) {
                if (!t) return "";
                var r = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                    i = (n ? n.dayNames : null) || this._defaults.dayNames,
                    s = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                    o = (n ? n.monthNames : null) || this._defaults.monthNames,
                    u = function (t) {
                        var n = h + 1 < e.length && e.charAt(h + 1) == t;
                        return n && h++, n
                    },
                    a = function (e, t, n) {
                        var r = "" + t;
                        if (u(e)) while (r.length < n) r = "0" + r;
                        return r
                    },
                    f = function (e, t, n, r) {
                        return u(e) ? r[t] : n[t]
                    },
                    l = "",
                    c = !1;
                if (t) for (var h = 0; h < e.length; h++) if (c) e.charAt(h) == "'" && !u("'") ? c = !1 : l += e.charAt(h);
                else switch (e.charAt(h)) {
                        case "d":
                            l += a("d", t.getDate(), 2);
                            break;
                        case "D":
                            l += f("D", t.getDay(), r, i);
                            break;
                        case "o":
                            l += a("o", Math.round(((new Date(t.getFullYear(), t.getMonth(), t.getDate())).getTime() - (new Date(t.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            l += a("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            l += f("M", t.getMonth(), s, o);
                            break;
                        case "y":
                            l += u("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + t.getYear() % 100;
                            break;
                        case "@":
                            l += t.getTime();
                            break;
                        case "!":
                            l += t.getTime() * 1e4 + this._ticksTo1970;
                            break;
                        case "'":
                            u("'") ? l += "'" : c = !0;
                            break;
                        default:
                            l += e.charAt(h)
                    }
                return l
            },
            _possibleChars: function (e) {
                var t = "",
                    n = !1,
                    r = function (t) {
                        var n = i + 1 < e.length && e.charAt(i + 1) == t;
                        return n && i++, n
                    };
                for (var i = 0; i < e.length; i++) if (n) e.charAt(i) == "'" && !r("'") ? n = !1 : t += e.charAt(i);
                else switch (e.charAt(i)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            t += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            r("'") ? t += "'" : n = !0;
                            break;
                        default:
                            t += e.charAt(i)
                    }
                return t
            },
            _get: function (e, t) {
                return e.settings[t] !== undefined ? e.settings[t] : this._defaults[t]
            },
            _setDateFromField: function (e, t) {
                if (e.input.val() == e.lastVal) return;
                var n = this._get(e, "dateFormat"),
                    r = e.lastVal = e.input ? e.input.val() : null,
                    i, s;
                i = s = this._getDefaultDate(e);
                var o = this._getFormatConfig(e);
                try {
                    i = this.parseDate(n, r, o) || s
                } catch (u) {
                    this.log(u), r = t ? "" : r
                }
                e.selectedDay = i.getDate(), e.drawMonth = e.selectedMonth = i.getMonth(), e.drawYear = e.selectedYear = i.getFullYear(), e.currentDay = r ? i.getDate() : 0, e.currentMonth = r ? i.getMonth() : 0, e.currentYear = r ? i.getFullYear() : 0, this._adjustInstDate(e)
            },
            _getDefaultDate: function (e) {
                return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
            },
            _determineDate: function (e, t, n) {
                var r = function (e) {
                    var t = new Date;
                    return t.setDate(t.getDate() + e), t
                },
                    i = function (t) {
                        try {
                            return $.datepicker.parseDate($.datepicker._get(e, "dateFormat"), t, $.datepicker._getFormatConfig(e))
                        } catch (n) {}
                        var r = (t.toLowerCase().match(/^c/) ? $.datepicker._getDate(e) : null) || new Date,
                            i = r.getFullYear(),
                            s = r.getMonth(),
                            o = r.getDate(),
                            u = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                            f = u.exec(t);
                        while (f) {
                            switch (f[2] || "d") {
                                case "d":
                                case "D":
                                    o += parseInt(f[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    o += parseInt(f[1], 10) * 7;
                                    break;
                                case "m":
                                case "M":
                                    s += parseInt(f[1], 10), o = Math.min(o, $.datepicker._getDaysInMonth(i, s));
                                    break;
                                case "y":
                                case "Y":
                                    i += parseInt(f[1], 10), o = Math.min(o, $.datepicker._getDaysInMonth(i, s))
                            }
                            f = u.exec(t)
                        }
                        return new Date(i, s, o)
                    },
                    s = t == null || t === "" ? n : typeof t == "string" ? i(t) : typeof t == "number" ? isNaN(t) ? n : r(t) : new Date(t.getTime());
                return s = s && s.toString() == "Invalid Date" ? n : s, s && (s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0)), this._daylightSavingAdjust(s)
            },
            _daylightSavingAdjust: function (e) {
                return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
            },
            _setDate: function (e, t, n) {
                var r = !t,
                    i = e.selectedMonth,
                    s = e.selectedYear,
                    o = this._restrictMinMax(e, this._determineDate(e, t, new Date));
                e.selectedDay = e.currentDay = o.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth(), e.drawYear = e.selectedYear = e.currentYear = o.getFullYear(), (i != e.selectedMonth || s != e.selectedYear) && !n && this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(r ? "" : this._formatDate(e))
            },
            _getDate: function (e) {
                var t = !e.currentYear || e.input && e.input.val() == "" ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
                return t
            },
            _generateHTML: function (e) {
                var t = new Date;
                t = this._daylightSavingAdjust(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
                var n = this._get(e, "isRTL"),
                    r = this._get(e, "showButtonPanel"),
                    i = this._get(e, "hideIfNoPrevNext"),
                    s = this._get(e, "navigationAsDateFormat"),
                    o = this._getNumberOfMonths(e),
                    u = this._get(e, "showCurrentAtPos"),
                    a = this._get(e, "stepMonths"),
                    f = o[0] != 1 || o[1] != 1,
                    l = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
                    c = this._getMinMaxDate(e, "min"),
                    h = this._getMinMaxDate(e, "max"),
                    p = e.drawMonth - u,
                    d = e.drawYear;
                p < 0 && (p += 12, d--);
                if (h) {
                    var v = this._daylightSavingAdjust(new Date(h.getFullYear(), h.getMonth() - o[0] * o[1] + 1, h.getDate()));
                    v = c && v < c ? c : v;
                    while (this._daylightSavingAdjust(new Date(d, p, 1)) > v) p--, p < 0 && (p = 11, d--)
                }
                e.drawMonth = p, e.drawYear = d;
                var m = this._get(e, "prevText");
                m = s ? this.formatDate(m, this._daylightSavingAdjust(new Date(d, p - a, 1)), this._getFormatConfig(e)) : m;
                var g = this._canAdjustMonth(e, - 1, d, p) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + e.id + "', -" + a + ", 'M');\"" + ' title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "e" : "w") + '">' + m + "</span></a>" : i ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "e" : "w") + '">' + m + "</span></a>",
                    y = this._get(e, "nextText");
                y = s ? this.formatDate(y, this._daylightSavingAdjust(new Date(d, p + a, 1)), this._getFormatConfig(e)) : y;
                var b = this._canAdjustMonth(e, 1, d, p) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + e.id + "', +" + a + ", 'M');\"" + ' title="' + y + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "w" : "e") + '">' + y + "</span></a>" : i ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + y + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "w" : "e") + '">' + y + "</span></a>",
                    w = this._get(e, "currentText"),
                    E = this._get(e, "gotoCurrent") && e.currentDay ? l : t;
                w = s ? this.formatDate(w, E, this._getFormatConfig(e)) : w;
                var S = e.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(e, "closeText") + "</button>",
                    x = r ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (n ? S : "") + (this._isInRange(e, E) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + e.id + "');\"" + ">" + w + "</button>" : "") + (n ? "" : S) + "</div>" : "",
                    T = parseInt(this._get(e, "firstDay"), 10);
                T = isNaN(T) ? 0 : T;
                var N = this._get(e, "showWeek"),
                    C = this._get(e, "dayNames"),
                    k = this._get(e, "dayNamesShort"),
                    L = this._get(e, "dayNamesMin"),
                    A = this._get(e, "monthNames"),
                    O = this._get(e, "monthNamesShort"),
                    M = this._get(e, "beforeShowDay"),
                    _ = this._get(e, "showOtherMonths"),
                    D = this._get(e, "selectOtherMonths"),
                    P = this._get(e, "calculateWeek") || this.iso8601Week,
                    H = this._getDefaultDate(e),
                    B = "";
                for (var j = 0; j < o[0]; j++) {
                    var F = "";
                    this.maxRows = 4;
                    for (var I = 0; I < o[1]; I++) {
                        var q = this._daylightSavingAdjust(new Date(d, p, e.selectedDay)),
                            R = " ui-corner-all",
                            U = "";
                        if (f) {
                            U += '<div class="ui-datepicker-group';
                            if (o[1] > 1) switch (I) {
                                case 0:
                                    U += " ui-datepicker-group-first", R = " ui-corner-" + (n ? "right" : "left");
                                    break;
                                case o[1] - 1:
                                    U += " ui-datepicker-group-last", R = " ui-corner-" + (n ? "left" : "right");
                                    break;
                                default:
                                    U += " ui-datepicker-group-middle", R = ""
                            }
                            U += '">'
                        }
                        U += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + R + '">' + (/all|left/.test(R) && j == 0 ? n ? b : g : "") + (/all|right/.test(R) && j == 0 ? n ? g : b : "") + this._generateMonthYearHeader(e, p, d, c, h, j > 0 || I > 0, A, O) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>";
                        var z = N ? '<th class="ui-datepicker-week-col">' + this._get(e, "weekHeader") + "</th>" : "";
                        for (var W = 0; W < 7; W++) {
                            var X = (W + T) % 7;
                            z += "<th" + ((W + T + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + ">" + '<span title="' + C[X] + '">' + L[X] + "</span></th>"
                        }
                        U += z + "</tr></thead><tbody>";
                        var V = this._getDaysInMonth(d, p);
                        d == e.selectedYear && p == e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, V));
                        var J = (this._getFirstDayOfMonth(d, p) - T + 7) % 7,
                            K = Math.ceil((J + V) / 7),
                            Q = f ? this.maxRows > K ? this.maxRows : K : K;
                        this.maxRows = Q;
                        var G = this._daylightSavingAdjust(new Date(d, p, 1 - J));
                        for (var Y = 0; Y < Q; Y++) {
                            U += "<tr>";
                            var Z = N ? '<td class="ui-datepicker-week-col">' + this._get(e, "calculateWeek")(G) + "</td>" : "";
                            for (var W = 0; W < 7; W++) {
                                var et = M ? M.apply(e.input ? e.input[0] : null, [G]) : [!0, ""],
                                    tt = G.getMonth() != p,
                                    nt = tt && !D || !et[0] || c && G < c || h && G > h;
                                Z += '<td class="' + ((W + T + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (tt ? " ui-datepicker-other-month" : "") + (G.getTime() == q.getTime() && p == e.selectedMonth && e._keyEvent || H.getTime() == G.getTime() && H.getTime() == q.getTime() ? " " + this._dayOverClass : "") + (nt ? " " + this._unselectableClass + " ui-state-disabled" : "") + (tt && !_ ? "" : " " + et[1] + (G.getTime() == l.getTime() ? " " + this._currentClass : "") + (G.getTime() == t.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!tt || _) && et[2] ? ' title="' + et[2] + '"' : "") + (nt ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + e.id + "'," + G.getMonth() + "," + G.getFullYear() + ', this);return false;"') + ">" + (tt && !_ ? "&#xa0;" : nt ? '<span class="ui-state-default">' + G.getDate() + "</span>" : '<a class="ui-state-default' + (G.getTime() == t.getTime() ? " ui-state-highlight" : "") + (G.getTime() == l.getTime() ? " ui-state-active" : "") + (tt ? " ui-priority-secondary" : "") + '" href="#">' + G.getDate() + "</a>") + "</td>", G.setDate(G.getDate() + 1), G = this._daylightSavingAdjust(G)
                            }
                            U += Z + "</tr>"
                        }
                        p++, p > 11 && (p = 0, d++), U += "</tbody></table>" + (f ? "</div>" + (o[0] > 0 && I == o[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), F += U
                    }
                    B += F
                }
                return B += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !e.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), e._keyEvent = !1, B
            },
            _generateMonthYearHeader: function (e, t, n, r, i, s, o, u) {
                var a = this._get(e, "changeMonth"),
                    f = this._get(e, "changeYear"),
                    l = this._get(e, "showMonthAfterYear"),
                    c = '<div class="ui-datepicker-title">',
                    h = "";
                if (s || !a) h += '<span class="ui-datepicker-month">' + o[t] + "</span>";
                else {
                    var p = r && r.getFullYear() == n,
                        d = i && i.getFullYear() == n;
                    h += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + e.id + "', this, 'M');\" " + ">";
                    for (var v = 0; v < 12; v++)(!p || v >= r.getMonth()) && (!d || v <= i.getMonth()) && (h += '<option value="' + v + '"' + (v == t ? ' selected="selected"' : "") + ">" + u[v] + "</option>");
                    h += "</select>"
                }
                l || (c += h + (s || !a || !f ? "&#xa0;" : ""));
                if (!e.yearshtml) {
                    e.yearshtml = "";
                    if (s || !f) c += '<span class="ui-datepicker-year">' + n + "</span>";
                    else {
                        var m = this._get(e, "yearRange").split(":"),
                            g = (new Date).getFullYear(),
                            y = function (e) {
                                var t = e.match(/c[+-].*/) ? n + parseInt(e.substring(1), 10) : e.match(/[+-].*/) ? g + parseInt(e, 10) : parseInt(e, 10);
                                return isNaN(t) ? g : t
                            },
                            b = y(m[0]),
                            w = Math.max(b, y(m[1] || ""));
                        b = r ? Math.max(b, r.getFullYear()) : b, w = i ? Math.min(w, i.getFullYear()) : w, e.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + e.id + "', this, 'Y');\" " + ">";
                        for (; b <= w; b++) e.yearshtml += '<option value="' + b + '"' + (b == n ? ' selected="selected"' : "") + ">" + b + "</option>";
                        e.yearshtml += "</select>", c += e.yearshtml, e.yearshtml = null
                    }
                }
                return c += this._get(e, "yearSuffix"), l && (c += (s || !a || !f ? "&#xa0;" : "") + h), c += "</div>", c
            },
            _adjustInstDate: function (e, t, n) {
                var r = e.drawYear + (n == "Y" ? t : 0),
                    i = e.drawMonth + (n == "M" ? t : 0),
                    s = Math.min(e.selectedDay, this._getDaysInMonth(r, i)) + (n == "D" ? t : 0),
                    o = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(r, i, s)));
                e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), (n == "M" || n == "Y") && this._notifyChange(e)
            },
            _restrictMinMax: function (e, t) {
                var n = this._getMinMaxDate(e, "min"),
                    r = this._getMinMaxDate(e, "max"),
                    i = n && t < n ? n : t;
                return i = r && i > r ? r : i, i
            },
            _notifyChange: function (e) {
                var t = this._get(e, "onChangeMonthYear");
                t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
            },
            _getNumberOfMonths: function (e) {
                var t = this._get(e, "numberOfMonths");
                return t == null ? [1, 1] : typeof t == "number" ? [1, t] : t
            },
            _getMinMaxDate: function (e, t) {
                return this._determineDate(e, this._get(e, t + "Date"), null)
            },
            _getDaysInMonth: function (e, t) {
                return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
            },
            _getFirstDayOfMonth: function (e, t) {
                return (new Date(e, t, 1)).getDay()
            },
            _canAdjustMonth: function (e, t, n, r) {
                var i = this._getNumberOfMonths(e),
                    s = this._daylightSavingAdjust(new Date(n, r + (t < 0 ? t : i[0] * i[1]), 1));
                return t < 0 && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())), this._isInRange(e, s)
            },
            _isInRange: function (e, t) {
                var n = this._getMinMaxDate(e, "min"),
                    r = this._getMinMaxDate(e, "max");
                return (!n || t.getTime() >= n.getTime()) && (!r || t.getTime() <= r.getTime())
            },
            _getFormatConfig: function (e) {
                var t = this._get(e, "shortYearCutoff");
                return t = typeof t != "string" ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                    shortYearCutoff: t,
                    dayNamesShort: this._get(e, "dayNamesShort"),
                    dayNames: this._get(e, "dayNames"),
                    monthNamesShort: this._get(e, "monthNamesShort"),
                    monthNames: this._get(e, "monthNames")
                }
            },
            _formatDate: function (e, t, n, r) {
                t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
                var i = t ? typeof t == "object" ? t : this._daylightSavingAdjust(new Date(r, n, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
                return this.formatDate(this._get(e, "dateFormat"), i, this._getFormatConfig(e))
            }
        }), $.fn.datepicker = function (e) {
            if (!this.length) return this;
            $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
            var t = Array.prototype.slice.call(arguments, 1);
            return typeof e != "string" || e != "isDisabled" && e != "getDate" && e != "widget" ? e == "option" && arguments.length == 2 && typeof arguments[1] == "string" ? $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this[0]].concat(t)) : this.each(function () {
                typeof e == "string" ? $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this].concat(t)) : $.datepicker._attachDatepicker(this, e)
            }) : $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this[0]].concat(t))
        }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.21", window["DP_jQuery_" + dpuuid] = $
    }(jQuery), jQuery.effects || function (e, t) {
    function n(t) {
        var n;
        return t && t.constructor == Array && t.length == 3 ? t : (n = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t)) ? [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10)] : (n = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t)) ? [parseFloat(n[1]) * 2.55, parseFloat(n[2]) * 2.55, parseFloat(n[3]) * 2.55] : (n = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t)) ? [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)] : (n = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t)) ? [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)] : (n = /rgba\(0, 0, 0, 0\)/.exec(t)) ? f.transparent : f[e.trim(t).toLowerCase()]
    }
    function r(t, r) {
        var i;
        do {
            i = e.curCSS(t, r);
            if (i != "" && i != "transparent" || e.nodeName(t, "body")) break;
            r = "backgroundColor"
        } while (t = t.parentNode);
        return n(i)
    }
    function i() {
        var e = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            t = {},
            n, r;
        if (e && e.length && e[0] && e[e[0]]) {
            var i = e.length;
            while (i--) n = e[i], typeof e[n] == "string" && (r = n.replace(/\-(\w)/g,
                function (e, t) {
                    return t.toUpperCase()
                }), t[r] = e[n])
        } else for (n in e) typeof e[n] == "string" && (t[n] = e[n]);
        return t
    }
    function s(t) {
        var n, r;
        for (n in t) r = t[n], (r == null || e.isFunction(r) || n in c || /scrollbar/.test(n) || !/color/i.test(n) && isNaN(parseFloat(r))) && delete t[n];
        return t
    }
    function o(e, t) {
        var n = {
            _: 0
        },
            r;
        for (r in t) e[r] != t[r] && (n[r] = t[r]);
        return n
    }
    function u(t, n, r, i) {
        typeof t == "object" && (i = n, r = null, n = t, t = n.effect), e.isFunction(n) && (i = n, r = null, n = {});
        if (typeof n == "number" || e.fx.speeds[n]) i = r, r = n, n = {};
        return e.isFunction(r) && (i = r, r = null), n = n || {}, r = r || n.duration, r = e.fx.off ? 0 : typeof r == "number" ? r : r in e.fx.speeds ? e.fx.speeds[r] : e.fx.speeds._default, i = i || n.complete, [t, n, r, i]
    }
    function a(t) {
        return !t || typeof t == "number" || e.fx.speeds[t] ? !0 : typeof t == "string" && !e.effects[t] ? !0 : !1
    }
    e.effects = {}, e.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"],
        function (t, i) {
            e.fx.step[i] = function (e) {
                e.colorInit || (e.start = r(e.elem, i), e.end = n(e.end), e.colorInit = !0), e.elem.style[i] = "rgb(" + Math.max(Math.min(parseInt(e.pos * (e.end[0] - e.start[0]) + e.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[1] - e.start[1]) + e.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[2] - e.start[2]) + e.start[2], 10), 255), 0) + ")"
            }
        });
    var f = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    },
        l = ["add", "remove", "toggle"],
        c = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
    e.effects.animateClass = function (t, n, r, u) {
        return e.isFunction(r) && (u = r, r = null), this.queue(function () {
            var a = e(this),
                f = a.attr("style") || " ",
                c = s(i.call(this)),
                p, v = a.attr("class") || "";
            e.each(l,
                function (e, n) {
                    t[n] && a[n + "Class"](t[n])
                }), p = s(i.call(this)), a.attr("class", v), a.animate(o(c, p), {
                queue: !1,
                duration: n,
                easing: r,
                complete: function () {
                    e.each(l,
                        function (e, n) {
                            t[n] && a[n + "Class"](t[n])
                        }), typeof a.attr("style") == "object" ? (a.attr("style").cssText = "", a.attr("style").cssText = f) : a.attr("style", f), u && u.apply(this, arguments), e.dequeue(this)
                }
            })
        })
    }, e.fn.extend({
        _addClass: e.fn.addClass,
        addClass: function (t, n, r, i) {
            return n ? e.effects.animateClass.apply(this, [{
                add: t
            },
                n, r, i]) : this._addClass(t)
        },
        _removeClass: e.fn.removeClass,
        removeClass: function (t, n, r, i) {
            return n ? e.effects.animateClass.apply(this, [{
                remove: t
            },
                n, r, i]) : this._removeClass(t)
        },
        _toggleClass: e.fn.toggleClass,
        toggleClass: function (n, r, i, s, o) {
            return typeof r == "boolean" || r === t ? i ? e.effects.animateClass.apply(this, [r ? {
                add: n
            } : {
                remove: n
            },
                i, s, o]) : this._toggleClass(n, r) : e.effects.animateClass.apply(this, [{
                toggle: n
            },
                r, i, s])
        },
        switchClass: function (t, n, r, i, s) {
            return e.effects.animateClass.apply(this, [{
                add: n,
                remove: t
            },
                r, i, s])
        }
    }), e.extend(e.effects, {
        version: "1.8.21",
        save: function (e, t) {
            for (var n = 0; n < t.length; n++) t[n] !== null && e.data("ec.storage." + t[n], e[0].style[t[n]])
        },
        restore: function (e, t) {
            for (var n = 0; n < t.length; n++) t[n] !== null && e.css(t[n], e.data("ec.storage." + t[n]))
        },
        setMode: function (e, t) {
            return t == "toggle" && (t = e.is(":hidden") ? "show" : "hide"), t
        },
        getBaseline: function (e, t) {
            var n, r;
            switch (e[0]) {
                case "top":
                    n = 0;
                    break;
                case "middle":
                    n = .5;
                    break;
                case "bottom":
                    n = 1;
                    break;
                default:
                    n = e[0] / t.height
            }
            switch (e[1]) {
                case "left":
                    r = 0;
                    break;
                case "center":
                    r = .5;
                    break;
                case "right":
                    r = 1;
                    break;
                default:
                    r = e[1] / t.width
            }
            return {
                x: r,
                y: n
            }
        },
        createWrapper: function (t) {
            if (t.parent().is(".ui-effects-wrapper")) return t.parent();
            var n = {
                width: t.outerWidth(!0),
                height: t.outerHeight(!0),
                "float": t.css("float")
            },
                r = e("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }),
                i = document.activeElement;
            try {
                i.id
            } catch (s) {
                i = document.body
            }
            return t.wrap(r), (t[0] === i || e.contains(t[0], i)) && e(i).focus(), r = t.parent(), t.css("position") == "static" ? (r.css({
                position: "relative"
            }), t.css({
                position: "relative"
            })) : (e.extend(n, {
                position: t.css("position"),
                zIndex: t.css("z-index")
            }), e.each(["top", "left", "bottom", "right"],
                function (e, r) {
                    n[r] = t.css(r), isNaN(parseInt(n[r], 10)) && (n[r] = "auto")
                }), t.css({
                position: "relative",
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto"
            })), r.css(n).show()
        },
        removeWrapper: function (t) {
            var n, r = document.activeElement;
            return t.parent().is(".ui-effects-wrapper") ? (n = t.parent().replaceWith(t), (t[0] === r || e.contains(t[0], r)) && e(r).focus(), n) : t
        },
        setTransition: function (t, n, r, i) {
            return i = i || {}, e.each(n,
                function (e, n) {
                    var s = t.cssUnit(n);
                    s[0] > 0 && (i[n] = s[0] * r + s[1])
                }), i
        }
    }), e.fn.extend({
        effect: function (t, n, r, i) {
            var s = u.apply(this, arguments),
                o = {
                    options: s[1],
                    duration: s[2],
                    callback: s[3]
                },
                a = o.options.mode,
                f = e.effects[t];
            return e.fx.off || !f ? a ? this[a](o.duration, o.callback) : this.each(function () {
                o.callback && o.callback.call(this)
            }) : f.call(this, o)
        },
        _show: e.fn.show,
        show: function (e) {
            if (a(e)) return this._show.apply(this, arguments);
            var t = u.apply(this, arguments);
            return t[1].mode = "show", this.effect.apply(this, t)
        },
        _hide: e.fn.hide,
        hide: function (e) {
            if (a(e)) return this._hide.apply(this, arguments);
            var t = u.apply(this, arguments);
            return t[1].mode = "hide", this.effect.apply(this, t)
        },
        __toggle: e.fn.toggle,
        toggle: function (t) {
            if (a(t) || typeof t == "boolean" || e.isFunction(t)) return this.__toggle.apply(this, arguments);
            var n = u.apply(this, arguments);
            return n[1].mode = "toggle", this.effect.apply(this, n)
        },
        cssUnit: function (t) {
            var n = this.css(t),
                r = [];
            return e.each(["em", "px", "%", "pt"],
                function (e, t) {
                    n.indexOf(t) > 0 && (r = [parseFloat(n), t])
                }), r
        }
    }), e.easing.jswing = e.easing.swing, e.extend(e.easing, {
        def: "easeOutQuad",
        swing: function (t, n, r, i, s) {
            return e.easing[e.easing.def](t, n, r, i, s)
        },
        easeInQuad: function (e, t, n, r, i) {
            return r * (t /= i) * t + n
        },
        easeOutQuad: function (e, t, n, r, i) {
            return -r * (t /= i) * (t - 2) + n
        },
        easeInOutQuad: function (e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
        },
        easeInCubic: function (e, t, n, r, i) {
            return r * (t /= i) * t * t + n
        },
        easeOutCubic: function (e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t + 1) + n
        },
        easeInOutCubic: function (e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n
        },
        easeInQuart: function (e, t, n, r, i) {
            return r * (t /= i) * t * t * t + n
        },
        easeOutQuart: function (e, t, n, r, i) {
            return -r * ((t = t / i - 1) * t * t * t - 1) + n
        },
        easeInOutQuart: function (e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n
        },
        easeInQuint: function (e, t, n, r, i) {
            return r * (t /= i) * t * t * t * t + n
        },
        easeOutQuint: function (e, t, n, r, i) {
            return r * ((t = t / i - 1) * t * t * t * t + 1) + n
        },
        easeInOutQuint: function (e, t, n, r, i) {
            return (t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) + n
        },
        easeInSine: function (e, t, n, r, i) {
            return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
        },
        easeOutSine: function (e, t, n, r, i) {
            return r * Math.sin(t / i * (Math.PI / 2)) + n
        },
        easeInOutSine: function (e, t, n, r, i) {
            return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
        },
        easeInExpo: function (e, t, n, r, i) {
            return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
        },
        easeOutExpo: function (e, t, n, r, i) {
            return t == i ? n + r : r * (-Math.pow(2, - 10 * t / i) + 1) + n
        },
        easeInOutExpo: function (e, t, n, r, i) {
            return t == 0 ? n : t == i ? n + r : (t /= i / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n : r / 2 * (-Math.pow(2, - 10 * --t) + 2) + n
        },
        easeInCirc: function (e, t, n, r, i) {
            return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
        },
        easeOutCirc: function (e, t, n, r, i) {
            return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
        },
        easeInOutCirc: function (e, t, n, r, i) {
            return (t /= i / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        },
        easeInElastic: function (e, t, n, r, i) {
            var s = 1.70158,
                o = 0,
                u = r;
            if (t == 0) return n;
            if ((t /= i) == 1) return n + r;
            o || (o = i * .3);
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
        },
        easeOutElastic: function (e, t, n, r, i) {
            var s = 1.70158,
                o = 0,
                u = r;
            if (t == 0) return n;
            if ((t /= i) == 1) return n + r;
            o || (o = i * .3);
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return u * Math.pow(2, - 10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
        },
        easeInOutElastic: function (e, t, n, r, i) {
            var s = 1.70158,
                o = 0,
                u = r;
            if (t == 0) return n;
            if ((t /= i / 2) == 2) return n + r;
            o || (o = i * .3 * 1.5);
            if (u < Math.abs(r)) {
                u = r;
                var s = o / 4
            } else var s = o / (2 * Math.PI) * Math.asin(r / u);
            return t < 1 ? -0.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n : u * Math.pow(2, - 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
        },
        easeInBack: function (e, n, r, i, s, o) {
            return o == t && (o = 1.70158), i * (n /= s) * n * ((o + 1) * n - o) + r
        },
        easeOutBack: function (e, n, r, i, s, o) {
            return o == t && (o = 1.70158), i * ((n = n / s - 1) * n * ((o + 1) * n + o) + 1) + r
        },
        easeInOutBack: function (e, n, r, i, s, o) {
            return o == t && (o = 1.70158), (n /= s / 2) < 1 ? i / 2 * n * n * (((o *= 1.525) + 1) * n - o) + r : i / 2 * ((n -= 2) * n * (((o *= 1.525) + 1) * n + o) + 2) + r
        },
        easeInBounce: function (t, n, r, i, s) {
            return i - e.easing.easeOutBounce(t, s - n, 0, i, s) + r
        },
        easeOutBounce: function (e, t, n, r, i) {
            return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        },
        easeInOutBounce: function (t, n, r, i, s) {
            return n < s / 2 ? e.easing.easeInBounce(t, n * 2, 0, i, s) * .5 + r : e.easing.easeOutBounce(t, n * 2 - s, 0, i, s) * .5 + i * .5 + r
        }
    })
}(jQuery),
    function (e) {
        function t(e, t, n) {
            var r = parseInt(e.css("top"), 10);
            if (t == "left") {
                var i = "-" + this.image_wrapper_height + "px";
                e.css("top", this.image_wrapper_height + "px")
            } else {
                var i = this.image_wrapper_height + "px";
                e.css("top", "-" + this.image_wrapper_height + "px")
            }
            return n && (n.css("bottom", "-" + n[0].offsetHeight + "px"), n.animate({
                bottom: 0
            }, this.settings.animation_speed * 2)), this.current_description && this.current_description.animate({
                bottom: "-" + this.current_description[0].offsetHeight + "px"
            }, this.settings.animation_speed * 2), {
                old_image: {
                    top: i
                },
                new_image: {
                    top: r
                }
            }
        }
        function n(e, t, n) {
            var r = parseInt(e.css("left"), 10);
            if (t == "left") {
                var i = "-" + this.image_wrapper_width + "px";
                e.css("left", this.image_wrapper_width + "px")
            } else {
                var i = this.image_wrapper_width + "px";
                e.css("left", "-" + this.image_wrapper_width + "px")
            }
            return n && (n.css("bottom", "-" + n[0].offsetHeight + "px"), n.animate({
                bottom: 0
            }, this.settings.animation_speed * 2)), this.current_description && this.current_description.animate({
                bottom: "-" + this.current_description[0].offsetHeight + "px"
            }, this.settings.animation_speed * 2), {
                old_image: {
                    left: i
                },
                new_image: {
                    left: r
                }
            }
        }
        function r(e, t, n) {
            var r = e.width(),
                i = e.height(),
                s = parseInt(e.css("left"), 10),
                o = parseInt(e.css("top"), 10);
            return e.css({
                width: 0,
                height: 0,
                top: this.image_wrapper_height / 2,
                left: this.image_wrapper_width / 2
            }), {
                old_image: {
                    width: 0,
                    height: 0,
                    top: this.image_wrapper_height / 2,
                    left: this.image_wrapper_width / 2
                },
                new_image: {
                    width: r,
                    height: i,
                    top: o,
                    left: s
                }
            }
        }
        function i(e, t, n) {
            return e.css("opacity", 0), {
                old_image: {
                    opacity: 0
                },
                new_image: {
                    opacity: 1
                }
            }
        }
        function s(e, t, n) {
            return e.css("opacity", 0), {
                old_image: {
                    opacity: 0
                },
                new_image: {
                    opacity: 1
                },
                speed: 0
            }
        }
        function o(e, t) {
            this.init(e, t)
        }
        function u(e, t) {
            this.init(e, t)
        }
        e.fn.adGallery = function (t) {
            var n = {
                loader_image: "/assets/loader.gif",
                start_at_index: 0,
                description_wrapper: !1,
                thumb_opacity: .7,
                animate_first_image: !1,
                animation_speed: 400,
                width: !1,
                height: !1,
                display_next_and_prev: !0,
                display_back_and_forward: !0,
                scroll_jump: 0,
                slideshow: {
                    enable: !0,
                    autostart: !1,
                    speed: 5e3,
                    start_label: "Start",
                    stop_label: "Stop",
                    stop_on_scroll: !0,
                    countdown_prefix: "(",
                    countdown_sufix: ")",
                    onStart: !1,
                    onStop: !1
                },
                effect: "slide-hori",
                enable_keyboard_move: !0,
                cycle: !0,
                callbacks: {
                    init: !1,
                    afterImageVisible: !1,
                    beforeImageVisible: !1
                }
            },
                r = e.extend(!1, n, t);
            t && t.slideshow && (r.slideshow = e.extend(!1, n.slideshow, t.slideshow)), r.slideshow.enable || (r.slideshow.autostart = !1);
            var i = [];
            return e(this).each(function () {
                var e = new o(this, r);
                i[i.length] = e
            }), i
        }, o.prototype = {
            wrapper: !1,
            image_wrapper: !1,
            gallery_info: !1,
            nav: !1,
            loader: !1,
            preloads: !1,
            thumbs_wrapper: !1,
            scroll_back: !1,
            scroll_forward: !1,
            next_link: !1,
            prev_link: !1,
            slideshow: !1,
            image_wrapper_width: 0,
            image_wrapper_height: 0,
            current_index: 0,
            current_image: !1,
            current_description: !1,
            nav_display_width: 0,
            settings: !1,
            images: !1,
            in_transition: !1,
            animations: !1,
            init: function (t, n) {
                var r = this;
                this.wrapper = e(t), this.settings = n, this.setupElements(), this.setupAnimations(), this.settings.width ? (this.image_wrapper_width = this.settings.width, this.image_wrapper.width(this.settings.width), this.wrapper.width(this.settings.width)) : this.image_wrapper_width = this.image_wrapper.width(), this.settings.height ? (this.image_wrapper_height = this.settings.height, this.image_wrapper.height(this.settings.height)) : this.image_wrapper_height = this.image_wrapper.height(), this.nav_display_width = this.nav.width(), this.current_index = 0, this.current_image = !1, this.current_description = !1, this.in_transition = !1, this.findImages(), this.settings.display_next_and_prev && this.initNextAndPrev();
                var i = function (e) {
                    return r.nextImage(e)
                };
                this.slideshow = new u(i, this.settings.slideshow), this.controls.append(this.slideshow.create()), this.settings.slideshow.enable ? this.slideshow.enable() : this.slideshow.disable(), this.settings.display_back_and_forward && this.initBackAndForward(), this.settings.enable_keyboard_move && this.initKeyEvents();
                var s = parseInt(this.settings.start_at_index, 10);
                window.location.hash && window.location.hash.indexOf("#ad-image") === 0 && (s = window.location.hash.replace(/[^0-9]+/g, ""), s * 1 != s && (s = this.settings.start_at_index)), this.loading(!0), this.showImage(s,
                    function () {
                        r.settings.slideshow.autostart && (r.preloadImage(s + 1), r.slideshow.start())
                    }), this.fireCallback(this.settings.callbacks.init)
            },
            setupAnimations: function () {
                this.animations = {
                    "slide-vert": t,
                    "slide-hori": n,
                    resize: r,
                    fade: i,
                    none: s
                }
            },
            setupElements: function () {
                this.controls = this.wrapper.find(".ad-controls"), this.gallery_info = e('<p class="ad-info"></p>'), this.controls.append(this.gallery_info), this.image_wrapper = this.wrapper.find(".ad-image-wrapper"), this.image_wrapper.empty(), this.nav = this.wrapper.find(".ad-nav"), this.thumbs_wrapper = this.nav.find(".ad-thumbs"), this.preloads = e('<div class="ad-preloads"></div>'), this.loader = e('<img class="ad-loader" src="' + this.settings.loader_image + '">'), this.image_wrapper.append(this.loader), this.loader.hide(), e(document.body).append(this.preloads)
            },
            loading: function (e) {
                e ? this.loader.show() : this.loader.hide()
            },
            addAnimation: function (t, n) {
                e.isFunction(n) && (this.animations[t] = n)
            },
            findImages: function () {
                var t = this;
                this.images = [];
                var n = 0,
                    r = 0,
                    i = this.thumbs_wrapper.find("a"),
                    s = i.length;
                this.settings.thumb_opacity < 1 && i.find("img").css("opacity", this.settings.thumb_opacity), i.each(function (i) {
                    var s = e(this),
                        o = s.attr("href"),
                        u = s.find("img");
                    t.isImageLoaded(u[0]) ? (n += u[0].parentNode.parentNode.offsetWidth, r++) : u.load(function () {
                        n += this.parentNode.parentNode.offsetWidth, r++
                    }), s.addClass("ad-thumb" + i), s.click(function () {
                        return t.showImage(i), t.slideshow.stop(), !1
                    }).hover(function () {
                            !e(this).is(".ad-active") && t.settings.thumb_opacity < 1 && e(this).find("img").fadeTo(300, 1), t.preloadImage(i)
                        },
                        function () {
                            !e(this).is(".ad-active") && t.settings.thumb_opacity < 1 && e(this).find("img").fadeTo(300, t.settings.thumb_opacity)
                        });
                    var s = !1;
                    u.data("ad-link") ? s = u.data("ad-link") : u.attr("longdesc") && u.attr("longdesc").length && (s = u.attr("longdesc"));
                    var a = !1;
                    u.data("ad-desc") ? a = u.data("ad-desc") : u.attr("alt") && u.attr("alt").length && (a = u.attr("alt"));
                    var f = !1;
                    u.data("ad-title") ? f = u.data("ad-title") : u.attr("title") && u.attr("title").length && (f = u.attr("title")), t.images[i] = {
                        thumb: u.attr("src"),
                        image: o,
                        error: !1,
                        preloaded: !1,
                        desc: a,
                        title: f,
                        size: !1,
                        link: s
                    }
                });
                var o = setInterval(function () {
                    if (s == r) {
                        n -= 100;
                        var e = t.nav.find(".ad-thumb-list");
                        e.css("width", n + "px");
                        var i = 1,
                            u = e.height();
                        while (i < 201) {
                            e.css("width", n + i + "px");
                            if (u != e.height()) break;
                            u = e.height(), i++
                        }
                        clearInterval(o)
                    }
                }, 100)
            },
            initKeyEvents: function () {
                var t = this;
                e(document).keydown(function (e) {
                    e.keyCode == 39 ? (t.nextImage(), t.slideshow.stop()) : e.keyCode == 37 && (t.prevImage(), t.slideshow.stop())
                })
            },
            initNextAndPrev: function () {
                this.next_link = e('<div class="ad-next"><div class="ad-next-image"></div></div>'), this.prev_link = e('<div class="ad-prev"><div class="ad-prev-image"></div></div>'), this.image_wrapper.append(this.next_link), this.image_wrapper.append(this.prev_link);
                var t = this;
                this.prev_link.add(this.next_link).mouseover(function (n) {
                    e(this).css("height", t.image_wrapper_height), e(this).find("div").show()
                }).mouseout(function (t) {
                        e(this).find("div").css("opacity", .7)
                    }).mouseover(function (t) {
                        e(this).find("div").css("opacity", 1)
                    }).click(function () {
                        e(this).is(".ad-next") ? (t.nextImage(), t.slideshow.stop()) : (t.prevImage(), t.slideshow.stop())
                    }).find("div").css("opacity", .7)
            },
            initBackAndForward: function () {
                var t = this;
                this.scroll_forward = e('<div class="ad-forward"></div>'), this.scroll_back = e('<div class="ad-back"></div>'), this.nav.append(this.scroll_forward), this.nav.prepend(this.scroll_back);
                var n = 0,
                    r = !1;
                e(this.scroll_back).add(this.scroll_forward).click(function () {
                    var n = t.nav_display_width - 50;
                    if (t.settings.scroll_jump > 0) var n = t.settings.scroll_jump;
                    if (e(this).is(".ad-forward")) var r = t.thumbs_wrapper.scrollLeft() + n;
                    else var r = t.thumbs_wrapper.scrollLeft() - n;
                    return t.settings.slideshow.stop_on_scroll && t.slideshow.stop(), t.thumbs_wrapper.animate({
                        scrollLeft: r + "px"
                    }), !1
                }).css("opacity", .6).hover(function () {
                        var i = "left";
                        e(this).is(".ad-forward") && (i = "right"), r = setInterval(function () {
                            n++, n > 30 && t.settings.slideshow.stop_on_scroll && t.slideshow.stop();
                            var e = t.thumbs_wrapper.scrollLeft() + 1;
                            i == "left" && (e = t.thumbs_wrapper.scrollLeft() - 1), t.thumbs_wrapper.scrollLeft(e)
                        }, 10), e(this).css("opacity", 1)
                    },
                    function () {
                        n = 0, clearInterval(r), e(this).css("opacity", .6)
                    })
            },
            _afterShow: function () {
                this.gallery_info.html(this.current_index + 1 + " / " + this.images.length), this.current_index == 0 ? e("#VideoPlayer").show() : e(".hiddenVimeoPause").trigger("click"), this.settings.cycle || (this.prev_link.show().css("height", this.image_wrapper_height), this.next_link.show().css("height", this.image_wrapper_height), this.current_index == this.images.length - 1 && this.next_link.hide(), this.current_index == 0 && this.prev_link.hide()), this.fireCallback(this.settings.callbacks.afterImageVisible)
            },
            _getContainedImageSize: function (e, t) {
                if (t > this.image_wrapper_height) {
                    var n = e / t;
                    t = this.image_wrapper_height, e = this.image_wrapper_height * n
                }
                if (e > this.image_wrapper_width) {
                    var n = t / e;
                    e = this.image_wrapper_width, t = this.image_wrapper_width * n
                }
                return {
                    width: e,
                    height: t
                }
            },
            _centerImage: function (e, t, n) {
                e.css("top", "0px");
                if (n < this.image_wrapper_height) {
                    var r = this.image_wrapper_height - n;
                    e.css("top", r / 2 + "px")
                }
                e.css("left", "0px");
                if (t < this.image_wrapper_width) {
                    var r = this.image_wrapper_width - t;
                    e.css("left", r / 2 + "px")
                }
            },
            _getDescription: function (t) {
                var n = !1;
                if (t.desc.length || t.title.length) {
                    var r = "";
                    t.title.length && (r = '<strong class="ad-description-title">' + t.title + "</strong>");
                    var n = "";
                    t.desc.length && (n = "<span>" + t.desc + "</span>"), n = e('<p class="ad-image-description">' + r + n + "</p>")
                }
                return n
            },
            showImage: function (e, t) {
                if (this.images[e] && !this.in_transition) {
                    var n = this,
                        r = this.images[e];
                    this.in_transition = !0, r.preloaded ? this._showWhenLoaded(e, t) : (this.loading(!0), this.preloadImage(e,
                        function () {
                            n.loading(!1), n._showWhenLoaded(e, t)
                        }))
                }
            },
            _showWhenLoaded: function (t, n) {
                if (this.images[t]) {
                    var r = this,
                        i = this.images[t],
                        s = e(document.createElement("div")).addClass("ad-image"),
                        o = e(new Image).attr("src", i.image);
                    if (i.link) {
                        var u = e('<a href="' + i.link + '" target="_blank"></a>');
                        u.append(o), s.append(u)
                    } else s.append(o);
                    this.image_wrapper.prepend(s);
                    var a = this._getContainedImageSize(i.size.width, i.size.height);
                    o.attr("width", a.width), o.attr("height", a.height), s.css({
                        width: a.width + "px",
                        height: a.height + "px"
                    }), this._centerImage(s, a.width, a.height);
                    var f = this._getDescription(i, s);
                    if (f) if (!this.settings.description_wrapper) {
                        s.append(f);
                        var l = a.width - parseInt(f.css("padding-left"), 10) - parseInt(f.css("padding-right"), 10);
                        f.css("width", l + "px")
                    } else this.settings.description_wrapper.append(f);
                    this.highLightThumb(this.nav.find(".ad-thumb" + t));
                    var c = "right";
                    this.current_index < t && (c = "left"), this.fireCallback(this.settings.callbacks.beforeImageVisible);
                    if (this.current_image || this.settings.animate_first_image) {
                        var h = this.settings.animation_speed,
                            p = "swing",
                            d = this.animations[this.settings.effect].call(this, s, c, f);
                        typeof d.speed != "undefined" && (h = d.speed), typeof d.easing != "undefined" && (p = d.easing);
                        if (this.current_image) {
                            var v = this.current_image,
                                m = this.current_description;
                            v.animate(d.old_image, h, p,
                                function () {
                                    v.remove(), m && m.remove()
                                })
                        }
                        s.animate(d.new_image, h, p,
                            function () {
                                r.current_index = t, r.current_image = s, r.current_description = f, r.in_transition = !1, r._afterShow(), r.fireCallback(n)
                            })
                    } else this.current_index = t, this.current_image = s, r.current_description = f, this.in_transition = !1, r._afterShow(), this.fireCallback(n)
                }
            },
            nextIndex: function () {
                if (this.current_index == this.images.length - 1) {
                    if (!this.settings.cycle) return !1;
                    var e = 0
                } else var e = this.current_index + 1;
                return e
            },
            nextImage: function (e) {
                var t = this.nextIndex();
                return t === !1 ? !1 : (this.preloadImage(t + 1), this.showImage(t, e), !0)
            },
            prevIndex: function () {
                if (this.current_index == 0) {
                    if (!this.settings.cycle) return !1;
                    var e = this.images.length - 1
                } else var e = this.current_index - 1;
                return e
            },
            prevImage: function (e) {
                var t = this.prevIndex();
                return t === !1 ? !1 : (this.preloadImage(t - 1), this.showImage(t, e), !0)
            },
            preloadAll: function () {
                function n() {
                    t < e.images.length && (t++, e.preloadImage(t, n))
                }
                var e = this,
                    t = 0;
                e.preloadImage(t, n)
            },
            preloadImage: function (t, n) {
                if (this.images[t]) {
                    var r = this.images[t];
                    if (!this.images[t].preloaded) {
                        var i = e(new Image);
                        i.attr("src", r.image);
                        if (!this.isImageLoaded(i[0])) {
                            this.preloads.append(i);
                            var s = this;
                            i.load(function () {
                                r.preloaded = !0, r.size = {
                                    width: this.width,
                                    height: this.height
                                }, s.fireCallback(n)
                            }).error(function () {
                                    r.error = !0, r.preloaded = !1, r.size = !1
                                })
                        } else r.preloaded = !0, r.size = {
                            width: i[0].width,
                            height: i[0].height
                        }, this.fireCallback(n)
                    } else this.fireCallback(n)
                }
            },
            isImageLoaded: function (e) {
                return typeof e.complete != "undefined" && !e.complete ? !1 : typeof e.naturalWidth != "undefined" && e.naturalWidth == 0 ? !1 : !0
            },
            highLightThumb: function (e) {
                this.thumbs_wrapper.find(".ad-active").removeClass("ad-active"), e.addClass("ad-active"), this.settings.thumb_opacity < 1 && (this.thumbs_wrapper.find("a:not(.ad-active) img").fadeTo(300, this.settings.thumb_opacity), e.find("img").fadeTo(300, 1));
                var t = e[0].parentNode.offsetLeft;
                t -= this.nav_display_width / 2 - e[0].offsetWidth / 2, this.thumbs_wrapper.animate({
                    scrollLeft: t + "px"
                })
            },
            fireCallback: function (t) {
                e.isFunction(t) && t.call(this)
            }
        }, u.prototype = {
            start_link: !1,
            stop_link: !1,
            countdown: !1,
            controls: !1,
            settings: !1,
            nextimage_callback: !1,
            enabled: !1,
            running: !1,
            countdown_interval: !1,
            init: function (e, t) {
                var n = this;
                this.nextimage_callback = e, this.settings = t
            },
            create: function () {
                this.start_link = e('<span class="ad-slideshow-start">' + this.settings.start_label + "</span>"), this.stop_link = e('<span class="ad-slideshow-stop">' + this.settings.stop_label + "</span>"), this.countdown = e('<span class="ad-slideshow-countdown"></span>'), this.controls = e('<div class="ad-slideshow-controls"></div>'), this.controls.append(this.start_link).append(this.stop_link).append(this.countdown), this.countdown.hide();
                var t = this;
                return this.start_link.click(function () {
                    t.start()
                }), this.stop_link.click(function () {
                    t.stop()
                }), e(document).keydown(function (e) {
                    e.keyCode == 83 && (t.running ? t.stop() : t.start())
                }), this.controls
            },
            disable: function () {
                this.enabled = !1, this.stop(), this.controls.hide()
            },
            enable: function () {
                this.enabled = !0, this.controls.show()
            },
            toggle: function () {
                this.enabled ? this.disable() : this.enable()
            },
            start: function () {
                if (this.running || !this.enabled) return !1;
                var e = this;
                return this.running = !0, this.controls.addClass("ad-slideshow-running"), this._next(), this.fireCallback(this.settings.onStart), !0
            },
            stop: function () {
                return this.running ? (this.running = !1, this.countdown.hide(), this.controls.removeClass("ad-slideshow-running"), clearInterval(this.countdown_interval), this.fireCallback(this.settings.onStop), !0) : !1
            },
            _next: function () {
                var e = this,
                    t = this.settings.countdown_prefix,
                    n = this.settings.countdown_sufix;
                clearInterval(e.countdown_interval), this.countdown.show().html(t + this.settings.speed / 1e3 + n);
                var r = 0;
                this.countdown_interval = setInterval(function () {
                    r += 1e3;
                    if (r >= e.settings.speed) {
                        var i = function () {
                            e.running && e._next(), r = 0
                        };
                        e.nextimage_callback(i) || e.stop(), r = 0
                    }
                    var s = parseInt(e.countdown.text().replace(/[^0-9]/g, ""), 10);
                    s--, s > 0 && e.countdown.html(t + s + n)
                }, 1e3)
            },
            fireCallback: function (t) {
                e.isFunction(t) && t.call(this)
            }
        }
    }(jQuery),
    function (e) {
        e.fn.alphanumeric = function (t) {
            var n = e(this),
                r = "abcdefghijklmnopqrstuvwxyz",
                i = e.extend({
                    ichars: "!@#$%^&*()+=[]\\';,/{}|\":<>?~`.- _",
                    nchars: "",
                    allow: ""
                }, t),
                s = i.allow.split(""),
                o = 0,
                u, a;
            for (o; o < s.length; o++) i.ichars.indexOf(s[o]) != -1 && (s[o] = "\\" + s[o]);
            return i.nocaps && (i.nchars += r.toUpperCase()), i.allcaps && (i.nchars += r), i.allow = s.join("|"), a = new RegExp(i.allow, "gi"), u = (i.ichars + i.nchars).replace(a, ""), n.keypress(function (e) {
                var t = String.fromCharCode(e.charCode ? e.charCode : e.which);
                u.indexOf(t) != -1 && !e.ctrlKey && e.preventDefault()
            }), n.blur(function () {
                var e = n.val(),
                    t = 0;
                for (t; t < e.length; t++) if (u.indexOf(e[t]) != -1) return n.val(""), !1;
                return !1
            }), n
        }, e.fn.numeric = function (t) {
            var n = "abcdefghijklmnopqrstuvwxyz",
                r = n.toUpperCase();
            return this.each(function () {
                e(this).alphanumeric(e.extend({
                    nchars: n + r
                }, t))
            })
        }, e.fn.alpha = function (t) {
            var n = "1234567890";
            return this.each(function () {
                e(this).alphanumeric(e.extend({
                    nchars: n
                }, t))
            })
        }
    }(jQuery), eval(function (e, t, n, r, i, s) {
    i = function (e) {
        return (e < t ? "" : i(parseInt(e / t))) + ((e %= t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
    };
    if (!"".replace(/^/, String)) {
        while (n--) s[i(n)] = r[n] || i(n);
        r = [function (e) {
            return s[e]
        }], i = function () {
            return "\\w+"
        }, n = 1
    }
    while (n--) r[n] && (e = e.replace(new RegExp("\\b" + i(n) + "\\b", "g"), r[n]));
    return e
}('(2($){$.c.f=2(p){p=$.d({g:"!@#$%^&*()+=[]\\\\\\\';,/{}|\\":<>?~`.- ",4:"",9:""},p);7 3.b(2(){5(p.G)p.4+="Q";5(p.w)p.4+="n";s=p.9.z(\'\');x(i=0;i<s.y;i++)5(p.g.h(s[i])!=-1)s[i]="\\\\"+s[i];p.9=s.O(\'|\');6 l=N M(p.9,\'E\');6 a=p.g+p.4;a=a.H(l,\'\');$(3).J(2(e){5(!e.r)k=o.q(e.K);L k=o.q(e.r);5(a.h(k)!=-1)e.j();5(e.u&&k==\'v\')e.j()});$(3).B(\'D\',2(){7 F})})};$.c.I=2(p){6 8="n";8+=8.P();p=$.d({4:8},p);7 3.b(2(){$(3).f(p)})};$.c.t=2(p){6 m="A";p=$.d({4:m},p);7 3.b(2(){$(3).f(p)})}})(C);', 53, 53, "||function|this|nchars|if|var|return|az|allow|ch|each|fn|extend||alphanumeric|ichars|indexOf||preventDefault||reg|nm|abcdefghijklmnopqrstuvwxyz|String||fromCharCode|charCode||alpha|ctrlKey||allcaps|for|length|split|1234567890|bind|jQuery|contextmenu|gi|false|nocaps|replace|numeric|keypress|which|else|RegExp|new|join|toUpperCase|ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("|"), 0, {})),
    function (e) {
        e.fn.autoGrowInput = function (t) {
            return t = e.extend({
                maxWidth: 1e3,
                minWidth: 0,
                comfortZone: 70
            }, t), this.filter("input").each(function () {
                var n = t.minWidth || e(this).width(),
                    r = "",
                    i = e(this),
                    s = e("<tester/>").css({
                        position: "absolute",
                        top: -9999,
                        left: -9999,
                        width: "auto",
                        fontSize: i.css("fontSize"),
                        fontFamily: i.css("fontFamily"),
                        fontWeight: i.css("fontWeight"),
                        letterSpacing: i.css("letterSpacing"),
                        whiteSpace: "nowrap"
                    }),
                    u = function () {
                        if (r === (r = i.val())) return;
                        var e = r.replace(/&/g, "&amp;").replace(/\s/g, "&nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        s.html(e);
                        var u = s.width(),
                            a = u + t.comfortZone >= n ? u + t.comfortZone : n,
                            f = i.width(),
                            l = a < f && a >= n || a > n && a < t.maxWidth;
                        l && i.width(a)
                    };
                s.insertAfter(i), e(this).bind("keyup keydown blur update onchange", u), e("#company_name").bind("keyup keydown blur update onchange", u)
            }), this
        }
    }(jQuery),
    function (e) {
        e.fn.iframeAutoHeight = function (t) {
            function n(e) {
                i.debug && i.debug === !0 && window.console && console.log(e)
            }
            function r(t, r) {
                n("Diagnostics from '" + r + "'");
                try {
                    n("  " + e(t, window.top.document).contents().find("body")[0].scrollHeight + " for ...find('body')[0].scrollHeight"), n("  " + e(t.contentWindow.document).height() + " for ...contentWindow.document).height()"), n("  " + e(t.contentWindow.document.body).height() + " for ...contentWindow.document.body).height()")
                } catch (i) {
                    n("  unable to check in this state")
                }
                n("End diagnostics -> results vary by browser and when diagnostics are requested")
            }
            var i = e.extend({
                heightOffset: 0,
                minHeight: 0,
                callback: function (e) {},
                animate: !1,
                debug: !1,
                diagnostics: !1
            }, t);
            return n(i), this.each(function () {
                function t(t) {
                    i.diagnostics && r(t, "resizeHeight");
                    var s = e(t, window.top.document).contents().find("body"),
                        o = s[0].scrollHeight + i.heightOffset;
                    n(o), o < i.minHeight && (n("new height is less than minHeight"), o = i.minHeight + i.heightOffset), n("New Height: " + o), i.animate ? e(t).animate({
                        height: o + "px"
                    }, {
                        duration: 500
                    }) : t.style.height = o + "px", i.callback.apply(e(t), [{
                        newFrameHeight: o
                    }])
                }
                var s = 0;
                n(this), i.diagnostics && r(this, "each iframe");
                if (e.browser.safari || e.browser.opera) {
                    n("browser is webkit or opera"), e(this).load(function () {
                        var e = 0,
                            r = this,
                            o = function () {
                                t(r)
                            };
                        s === 0 ? e = 500 : r.style.height = i.minHeight + "px", n("load delay: " + e), setTimeout(o, e), s++
                    });
                    var o = e(this).attr("src");
                    e(this).attr("src", ""), e(this).attr("src", o)
                } else e(this).load(function () {
                    t(this)
                })
            })
        }
    }(jQuery), jQuery.cookie = function (e, t, n) {
    if (typeof t == "undefined") {
        var a = null;
        if (document.cookie && document.cookie != "") {
            var f = document.cookie.split(";");
            for (var l = 0; l < f.length; l++) {
                var c = jQuery.trim(f[l]);
                if (c.substring(0, e.length + 1) == e + "=") {
                    a = decodeURIComponent(c.substring(e.length + 1));
                    break
                }
            }
        }
        return a
    }
    n = n || {}, t === null && (t = "", n.expires = -1);
    var r = "";
    if (n.expires && (typeof n.expires == "number" || n.expires.toUTCString)) {
        var i;
        typeof n.expires == "number" ? (i = new Date, i.setTime(i.getTime() + n.expires * 24 * 60 * 60 * 1e3)) : i = n.expires, r = "; expires=" + i.toUTCString()
    }
    var s = n.path ? "; path=" + n.path : "",
        o = n.domain ? "; domain=" + n.domain : "",
        u = n.secure ? "; secure" : "";
    document.cookie = [e, "=", encodeURIComponent(t), r, s, o, u].join("")
}, eval(function (e, t, n, r, i, s) {
    i = function (e) {
        return (e < t ? "" : i(parseInt(e / t))) + ((e %= t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
    };
    if (!"".replace(/^/, String)) {
        while (n--) s[i(n)] = r[n] || i(n);
        r = [function (e) {
            return s[e]
        }], i = function () {
            return "\\w+"
        }, n = 1
    }
    while (n--) r[n] && (e = e.replace(new RegExp("\\b" + i(n) + "\\b", "g"), r[n]));
    return e
}("h.i['1a']=h.i['z'];h.O(h.i,{y:'D',z:9(x,t,b,c,d){6 h.i[h.i.y](x,t,b,c,d)},17:9(x,t,b,c,d){6 c*(t/=d)*t+b},D:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},13:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},X:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},U:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},R:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},N:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},M:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},L:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},K:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},J:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},I:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},G:9(x,t,b,c,d){6-c*8.C(t/d*(8.g/2))+c+b},15:9(x,t,b,c,d){6 c*8.n(t/d*(8.g/2))+b},12:9(x,t,b,c,d){6-c/2*(8.C(8.g*t/d)-1)+b},Z:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},Y:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},W:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},V:9(x,t,b,c,d){6-c*(8.o(1-(t/=d)*t)-1)+b},S:9(x,t,b,c,d){6 c*8.o(1-(t=t/d-1)*t)+b},Q:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.o(1-t*t)-1)+b;6 c/2*(8.o(1-(t-=2)*t)+1)+b},P:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b},H:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.g)/p)+c+b},T:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.w(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.r(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.g)/p)*.5+c+b},F:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*(t/=d)*t*((s+1)*t-s)+b},E:9(x,t,b,c,d,s){e(s==u)s=1.l;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},16:9(x,t,b,c,d,s){e(s==u)s=1.l;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.B))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.B))+1)*t+s)+2)+b},A:9(x,t,b,c,d){6 c-h.i.v(x,d-t,0,c,d)+b},v:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.q*t*t)+b}m e(t<(2/2.k)){6 c*(7.q*(t-=(1.5/2.k))*t+.k)+b}m e(t<(2.5/2.k)){6 c*(7.q*(t-=(2.14/2.k))*t+.11)+b}m{6 c*(7.q*(t-=(2.18/2.k))*t+.19)+b}},1b:9(x,t,b,c,d){e(t<d/2)6 h.i.A(x,t*2,0,c,d)*.5+b;6 h.i.v(x,t*2-d,0,c,d)*.5+c*.5+b}});", 62, 74, "||||||return||Math|function|||||if|var|PI|jQuery|easing|pow|75|70158|else|sin|sqrt||5625|asin|||undefined|easeOutBounce|abs||def|swing|easeInBounce|525|cos|easeOutQuad|easeOutBack|easeInBack|easeInSine|easeOutElastic|easeInOutQuint|easeOutQuint|easeInQuint|easeInOutQuart|easeOutQuart|easeInQuart|extend|easeInElastic|easeInOutCirc|easeInOutCubic|easeOutCirc|easeInOutElastic|easeOutCubic|easeInCirc|easeInOutExpo|easeInCubic|easeOutExpo|easeInExpo||9375|easeInOutSine|easeInOutQuad|25|easeOutSine|easeInOutBack|easeInQuad|625|984375|jswing|easeInOutBounce".split("|"), 0, {})),
    function (e) {
        var t, n, r, i, s, o, u, a, f, l, c = 0,
            h = {},
            p = [],
            d = 0,
            v = {},
            m = [],
            g = null,
            y = new Image,
            b = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,
            w = /[^\.]\.(swf)\s*$/i,
            E, S = 1,
            x = 0,
            T = "",
            N, C, k = !1,
            L = e.extend(e("<div/>")[0], {
                prop: 0
            }),
            A = e.browser.msie && e.browser.version < 7 && !window.XMLHttpRequest,
            O = function () {
                n.hide(), y.onerror = y.onload = null, g && g.abort(), t.empty()
            },
            M = function () {
                !1 === h.onError(p, c, h) ? (n.hide(), k = !1) : (h.titleShow = !1, h.width = "auto", h.height = "auto", t.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>'), D())
            },
            _ = function () {
                var r = p[c],
                    i, s, u, a, f, l;
                O(), h = e.extend({}, e.fn.fancybox.defaults, typeof e(r).data("fancybox") == "undefined" ? h : e(r).data("fancybox")), l = h.onStart(p, c, h);
                if (l === !1) k = !1;
                else {
                    typeof l == "object" && (h = e.extend(h, l)), u = h.title || (r.nodeName ? e(r).attr("title") : r.title) || "", r.nodeName && !h.orig && (h.orig = e(r).children("img:first").length ? e(r).children("img:first") : e(r)), u === "" && h.orig && h.titleFromAlt && (u = h.orig.attr("alt")), i = h.href || (r.nodeName ? e(r).attr("href") : r.href) || null;
                    if (/^(?:javascript)/i.test(i) || i == "#") i = null;
                    h.type ? (s = h.type, i || (i = h.content)) : h.content ? s = "html" : i && (s = i.match(b) ? "image" : i.match(w) ? "swf" : e(r).hasClass("iframe") ? "iframe" : i.indexOf("#") === 0 ? "inline" : "ajax");
                    if (s) {
                        s == "inline" && (r = i.substr(i.indexOf("#")), s = e(r).length > 0 ? "inline" : "ajax"), h.type = s, h.href = i, h.title = u, h.autoDimensions && (h.type == "html" || h.type == "inline" || h.type == "ajax" ? (h.width = "auto", h.height = "auto") : h.autoDimensions = !1), h.modal && (h.overlayShow = !0, h.hideOnOverlayClick = !1, h.hideOnContentClick = !1, h.enableEscapeButton = !1, h.showCloseButton = !1), h.padding = parseInt(h.padding, 10), h.margin = parseInt(h.margin, 10), t.css("padding", h.padding + h.margin), e(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",
                            function () {
                                e(this).replaceWith(o.children())
                            });
                        switch (s) {
                            case "html":
                                t.html(h.content), D();
                                break;
                            case "inline":
                                if (e(r).parent().is("#fancybox-content") === !0) {
                                    k = !1;
                                    break
                                }
                                e('<div class="fancybox-inline-tmp" />').hide().insertBefore(e(r)).bind("fancybox-cleanup",
                                    function () {
                                        e(this).replaceWith(o.children())
                                    }).bind("fancybox-cancel",
                                    function () {
                                        e(this).replaceWith(t.children())
                                    }), e(r).appendTo(t), D();
                                break;
                            case "image":
                                k = !1, e.fancybox.showActivity(), y = new Image, y.onerror = function () {
                                    M()
                                }, y.onload = function () {
                                    k = !0, y.onerror = y.onload = null, h.width = y.width, h.height = y.height, e("<img />").attr({
                                        id: "fancybox-img",
                                        src: y.src,
                                        alt: h.title
                                    }).appendTo(t), P()
                                }, y.src = i;
                                break;
                            case "swf":
                                h.scrolling = "no", a = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + h.width + '" height="' + h.height + '"><param name="movie" value="' + i + '"></param>', f = "", e.each(h.swf,
                                    function (e, t) {
                                        a += '<param name="' + e + '" value="' + t + '"></param>', f += " " + e + '="' + t + '"'
                                    }), a += '<embed src="' + i + '" type="application/x-shockwave-flash" width="' + h.width + '" height="' + h.height + '"' + f + "></embed></object>", t.html(a), D();
                                break;
                            case "ajax":
                                k = !1, e.fancybox.showActivity(), h.ajax.win = h.ajax.success, g = e.ajax(e.extend({}, h.ajax, {
                                    url: i,
                                    data: h.ajax.data || {},
                                    error: function (e) {
                                        e.status > 0 && M()
                                    },
                                    success: function (e, r, s) {
                                        if ((typeof s == "object" ? s : g).status == 200) {
                                            if (typeof h.ajax.win == "function") {
                                                l = h.ajax.win(i, e, r, s);
                                                if (l === !1) {
                                                    n.hide();
                                                    return
                                                }
                                                if (typeof l == "string" || typeof l == "object") e = l
                                            }
                                            t.html(e), D()
                                        }
                                    }
                                }));
                                break;
                            case "iframe":
                                P()
                        }
                    } else M()
                }
            },
            D = function () {
                var n = h.width,
                    r = h.height;
                n = n.toString().indexOf("%") > -1 ? parseInt((e(window).width() - h.margin * 2) * parseFloat(n) / 100, 10) + "px" : n == "auto" ? "auto" : n + "px", r = r.toString().indexOf("%") > -1 ? parseInt((e(window).height() - h.margin * 2) * parseFloat(r) / 100, 10) + "px" : r == "auto" ? "auto" : r + "px", t.wrapInner('<div style="width:' + n + ";height:" + r + ";overflow: " + (h.scrolling == "auto" ? "auto" : h.scrolling == "yes" ? "scroll" : "hidden") + ';position:relative;"></div>'), h.width = t.width(), h.height = t.height(), P()
            },
            P = function () {
                var g, y;
                n.hide();
                if (i.is(":visible") && !1 === v.onCleanup(m, d, v)) e.event.trigger("fancybox-cancel"), k = !1;
                else {
                    k = !0, e(o.add(r)).unbind(), e(window).unbind("resize.fb scroll.fb"), e(document).unbind("keydown.fb"), i.is(":visible") && v.titlePosition !== "outside" && i.css("height", i.height()), m = p, d = c, v = h, v.overlayShow ? (r.css({
                        "background-color": v.overlayColor,
                        opacity: v.overlayOpacity,
                        cursor: v.hideOnOverlayClick ? "pointer" : "auto",
                        height: e(document).height()
                    }), r.is(":visible") || (A && e("select:not(#fancybox-tmp select)").filter(function () {
                        return this.style.visibility !== "hidden"
                    }).css({
                            visibility: "hidden"
                        }).one("fancybox-cleanup",
                        function () {
                            this.style.visibility = "inherit"
                        }), r.show())) : r.hide(), C = I(), T = v.title || "", x = 0, a.empty().removeAttr("style").removeClass();
                    if (v.titleShow !== !1) {
                        e.isFunction(v.titleFormat) ? g = v.titleFormat(T, m, d, v) : g = T && T.length ? v.titlePosition == "float" ? '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + T + '</td><td id="fancybox-title-float-right"></td></tr></table>' : '<div id="fancybox-title-' + v.titlePosition + '">' + T + "</div>" : !1, T = g;
                        if ( !! T && T !== "") {
                            a.addClass("fancybox-title-" + v.titlePosition).html(T).appendTo("body").show();
                            switch (v.titlePosition) {
                                case "inside":
                                    a.css({
                                        width: C.width - v.padding * 2,
                                        marginLeft: v.padding,
                                        marginRight: v.padding
                                    }), x = a.outerHeight(!0), a.appendTo(s), C.height += x;
                                    break;
                                case "over":
                                    a.css({
                                        marginLeft: v.padding,
                                        width: C.width - v.padding * 2,
                                        bottom: v.padding
                                    }).appendTo(s);
                                    break;
                                case "float":
                                    a.css("left", parseInt((a.width() - C.width - 40) / 2, 10) * -1).appendTo(i);
                                    break;
                                default:
                                    a.css({
                                        width: C.width - v.padding * 2,
                                        paddingLeft: v.padding,
                                        paddingRight: v.padding
                                    }).appendTo(i)
                            }
                        }
                    }
                    a.hide(), i.is(":visible") ? (e(u.add(f).add(l)).hide(), g = i.position(), N = {
                        top: g.top,
                        left: g.left,
                        width: i.width(),
                        height: i.height()
                    }, y = N.width == C.width && N.height == C.height, o.fadeTo(v.changeFade, .3,
                        function () {
                            var n = function () {
                                o.html(t.contents()).fadeTo(v.changeFade, 1, B)
                            };
                            e.event.trigger("fancybox-change"), o.empty().removeAttr("filter").css({
                                "border-width": v.padding,
                                width: C.width - v.padding * 2,
                                height: h.autoDimensions ? "auto" : C.height - x - v.padding * 2
                            }), y ? n() : (L.prop = 0, e(L).animate({
                                prop: 1
                            }, {
                                duration: v.changeSpeed,
                                easing: v.easingChange,
                                step: j,
                                complete: n
                            }))
                        })) : (i.removeAttr("style"), o.css("border-width", v.padding), v.transitionIn == "elastic" ? (N = q(), o.html(t.contents()), i.show(), v.opacity && (C.opacity = 0), L.prop = 0, e(L).animate({
                        prop: 1
                    }, {
                        duration: v.speedIn,
                        easing: v.easingIn,
                        step: j,
                        complete: B
                    })) : (v.titlePosition == "inside" && x > 0 && a.show(), o.css({
                        width: C.width - v.padding * 2,
                        height: h.autoDimensions ? "auto" : C.height - x - v.padding * 2
                    }).html(t.contents()), i.css(C).fadeIn(v.transitionIn == "none" ? 0 : v.speedIn, B)))
                }
            },
            H = function () {
                (v.enableEscapeButton || v.enableKeyboardNav) && e(document).bind("keydown.fb",
                    function (t) {
                        t.keyCode == 27 && v.enableEscapeButton ? (t.preventDefault(), e.fancybox.close()) : (t.keyCode == 37 || t.keyCode == 39) && v.enableKeyboardNav && t.target.tagName !== "INPUT" && t.target.tagName !== "TEXTAREA" && t.target.tagName !== "SELECT" && (t.preventDefault(), e.fancybox[t.keyCode == 37 ? "prev" : "next"]())
                    }), v.showNavArrows ? ((v.cyclic && m.length > 1 || d !== 0) && f.show(), (v.cyclic && m.length > 1 || d != m.length - 1) && l.show()) : (f.hide(), l.hide())
            },
            B = function () {
                e.support.opacity || (o.get(0).style.removeAttribute("filter"), i.get(0).style.removeAttribute("filter")), h.autoDimensions && o.css("height", "auto"), i.css("height", "auto"), T && T.length && a.show(), v.showCloseButton && u.show(), H(), v.hideOnContentClick && o.bind("click", e.fancybox.close), v.hideOnOverlayClick && r.bind("click", e.fancybox.close), e(window).bind("resize.fb", e.fancybox.resize), v.centerOnScroll && e(window).bind("scroll.fb", e.fancybox.center), v.type == "iframe" && e('<iframe id="fancybox-frame" name="fancybox-frame' + (new Date).getTime() + '" frameborder="0" hspace="0" ' + (e.browser.msie ? 'allowtransparency="true""' : "") + ' scrolling="' + h.scrolling + '" src="' + v.href + '"></iframe>').appendTo(o), i.show(), k = !1, e.fancybox.center(), v.onComplete(m, d, v);
                var t, n;
                m.length - 1 > d && (t = m[d + 1].href, typeof t != "undefined" && t.match(b) && (n = new Image, n.src = t)), d > 0 && (t = m[d - 1].href, typeof t != "undefined" && t.match(b) && (n = new Image, n.src = t))
            },
            j = function (e) {
                var t = {
                    width: parseInt(N.width + (C.width - N.width) * e, 10),
                    height: parseInt(N.height + (C.height - N.height) * e, 10),
                    top: parseInt(N.top + (C.top - N.top) * e, 10),
                    left: parseInt(N.left + (C.left - N.left) * e, 10)
                };
                typeof C.opacity != "undefined" && (t.opacity = e < .5 ? .5 : e), i.css(t), o.css({
                    width: t.width - v.padding * 2,
                    height: t.height - x * e - v.padding * 2
                })
            },
            F = function () {
                return [e(window).width() - v.margin * 2, e(window).height() - v.margin * 2, e(document).scrollLeft() + v.margin, e(document).scrollTop() + v.margin]
            },
            I = function () {
                var e = F(),
                    t = {},
                    n = v.autoScale,
                    r = v.padding * 2;
                return t.width = v.width.toString().indexOf("%") > -1 ? parseInt(e[0] * parseFloat(v.width) / 100, 10) : v.width + r, t.height = v.height.toString().indexOf("%") > -1 ? parseInt(e[1] * parseFloat(v.height) / 100, 10) : v.height + r, n && (t.width > e[0] || t.height > e[1]) && (h.type == "image" || h.type == "swf" ? (n = v.width / v.height, t.width > e[0] && (t.width = e[0], t.height = parseInt((t.width - r) / n + r, 10)), t.height > e[1] && (t.height = e[1], t.width = parseInt((t.height - r) * n + r, 10))) : (t.width = Math.min(t.width, e[0]), t.height = Math.min(t.height, e[1]))), t.top = parseInt(Math.max(e[3] - 20, e[3] + (e[1] - t.height - 40) * .5), 10), t.left = parseInt(Math.max(e[2] - 20, e[2] + (e[0] - t.width - 40) * .5), 10), t
            },
            q = function () {
                var t = h.orig ? e(h.orig) : !1,
                    n = {};
                return t && t.length ? (n = t.offset(), n.top += parseInt(t.css("paddingTop"), 10) || 0, n.left += parseInt(t.css("paddingLeft"), 10) || 0, n.top += parseInt(t.css("border-top-width"), 10) || 0, n.left += parseInt(t.css("border-left-width"), 10) || 0, n.width = t.width(), n.height = t.height(), n = {
                    width: n.width + v.padding * 2,
                    height: n.height + v.padding * 2,
                    top: n.top - v.padding - 20,
                    left: n.left - v.padding - 20
                }) : (t = F(), n = {
                    width: v.padding * 2,
                    height: v.padding * 2,
                    top: parseInt(t[3] + t[1] * .5, 10),
                    left: parseInt(t[2] + t[0] * .5, 10)
                }), n
            },
            R = function () {
                n.is(":visible") ? (e("div", n).css("top", S * -40 + "px"), S = (S + 1) % 12) : clearInterval(E)
            };
        e.fn.fancybox = function (t) {
            return e(this).length ? (e(this).data("fancybox", e.extend({}, t, e.metadata ? e(this).metadata() : {})).unbind("click.fb").bind("click.fb",
                function (t) {
                    t.preventDefault(), k || (k = !0, e(this).blur(), p = [], c = 0, t = e(this).attr("rel") || "", !t || t == "" || t === "nofollow" ? p.push(this) : (p = e("a[rel=" + t + "], area[rel=" + t + "]"), c = p.index(this)), _())
                }), this) : this
        }, e.fancybox = function (t, n) {
            var r;
            if (!k) {
                k = !0, r = typeof n != "undefined" ? n : {}, p = [], c = parseInt(r.index, 10) || 0;
                if (e.isArray(t)) {
                    for (var i = 0, s = t.length; i < s; i++) typeof t[i] == "object" ? e(t[i]).data("fancybox", e.extend({}, r, t[i])) : t[i] = e({}).data("fancybox", e.extend({
                        content: t[i]
                    }, r));
                    p = jQuery.merge(p, t)
                } else typeof t == "object" ? e(t).data("fancybox", e.extend({}, r, t)) : t = e({}).data("fancybox", e.extend({
                    content: t
                }, r)), p.push(t);
                if (c > p.length || c < 0) c = 0;
                _()
            }
        }, e.fancybox.showActivity = function () {
            clearInterval(E), n.show(), E = setInterval(R, 66)
        }, e.fancybox.hideActivity = function () {
            n.hide()
        }, e.fancybox.next = function () {
            return e.fancybox.pos(d + 1)
        }, e.fancybox.prev = function () {
            return e.fancybox.pos(d - 1)
        }, e.fancybox.pos = function (e) {
            k || (e = parseInt(e), p = m, e > -1 && e < m.length ? (c = e, _()) : v.cyclic && m.length > 1 && (c = e >= m.length ? 0 : m.length - 1, _()))
        }, e.fancybox.cancel = function () {
            k || (k = !0, e.event.trigger("fancybox-cancel"), O(), h.onCancel(p, c, h), k = !1)
        }, e.fancybox.close = function () {
            function t() {
                r.fadeOut("fast"), a.empty().hide(), i.hide(), e.event.trigger("fancybox-cleanup"), o.empty(), v.onClosed(m, d, v), m = h = [], d = c = 0, v = h = {}, k = !1
            }
            if (!k && !i.is(":hidden")) {
                k = !0;
                if (v && !1 === v.onCleanup(m, d, v)) k = !1;
                else {
                    O(), e(u.add(f).add(l)).hide(), e(o.add(r)).unbind(), e(window).unbind("resize.fb scroll.fb"), e(document).unbind("keydown.fb"), o.find("iframe").attr("src", A && /^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank"), v.titlePosition !== "inside" && a.empty(), i.stop();
                    if (v.transitionOut == "elastic") {
                        N = q();
                        var n = i.position();
                        C = {
                            top: n.top,
                            left: n.left,
                            width: i.width(),
                            height: i.height()
                        }, v.opacity && (C.opacity = 1), a.empty().hide(), L.prop = 1, e(L).animate({
                            prop: 0
                        }, {
                            duration: v.speedOut,
                            easing: v.easingOut,
                            step: j,
                            complete: t
                        })
                    } else i.fadeOut(v.transitionOut == "none" ? 0 : v.speedOut, t)
                }
            }
        }, e.fancybox.resize = function () {
            r.is(":visible") && r.css("height", e(document).height()), e.fancybox.center(!0)
        }, e.fancybox.center = function (e) {
            var t, n;
            k || (n = e === !0 ? 1 : 0, t = F(), !n && (i.width() > t[0] || i.height() > t[1]) || i.stop().animate({
                top: parseInt(Math.max(t[3] - 20, t[3] + (t[1] - o.height() - 40) * .5 - v.padding)),
                left: parseInt(Math.max(t[2] - 20, t[2] + (t[0] - o.width() - 40) * .5 - v.padding))
            }, typeof e == "number" ? e : 200))
        }, e.fancybox.init = function () {
            e("#fancybox-wrap").length || (e("body").append(t = e('<div id="fancybox-tmp"></div>'), n = e('<div id="fancybox-loading"><div></div></div>'), r = e('<div id="fancybox-overlay"></div>'), i = e('<div id="fancybox-wrap"></div>')), s = e('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(i), s.append(o = e('<div id="fancybox-content"></div>'), u = e('<a id="fancybox-close"></a>'), a = e('<div id="fancybox-title"></div>'), f = e('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), l = e('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')), u.click(e.fancybox.close), n.click(e.fancybox.cancel), f.click(function (t) {
                t.preventDefault(), e.fancybox.prev()
            }), l.click(function (t) {
                t.preventDefault(), e.fancybox.next()
            }), e.fn.mousewheel && i.bind("mousewheel.fb",
                function (t, n) {
                    if (k) t.preventDefault();
                    else if (e(t.target).get(0).clientHeight == 0 || e(t.target).get(0).scrollHeight === e(t.target).get(0).clientHeight) t.preventDefault(), e.fancybox[n > 0 ? "prev" : "next"]()
                }), e.support.opacity || i.addClass("fancybox-ie"), A && (n.addClass("fancybox-ie6"), i.addClass("fancybox-ie6"), e('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(s)))
        }, e.fn.fancybox.defaults = {
            padding: 10,
            margin: 40,
            opacity: !1,
            modal: !1,
            cyclic: !1,
            scrolling: "auto",
            width: 560,
            height: 340,
            autoScale: !0,
            autoDimensions: !0,
            centerOnScroll: !1,
            ajax: {},
            swf: {
                wmode: "transparent"
            },
            hideOnOverlayClick: !0,
            hideOnContentClick: !1,
            overlayShow: !0,
            overlayOpacity: .7,
            overlayColor: "#777",
            titleShow: !0,
            titlePosition: "float",
            titleFormat: null,
            titleFromAlt: !1,
            transitionIn: "fade",
            transitionOut: "fade",
            speedIn: 300,
            speedOut: 300,
            changeSpeed: 300,
            changeFade: "fast",
            easingIn: "swing",
            easingOut: "swing",
            showCloseButton: !0,
            showNavArrows: !0,
            enableEscapeButton: !0,
            enableKeyboardNav: !0,
            onStart: function () {},
            onCancel: function () {},
            onComplete: function () {},
            onCleanup: function () {},
            onClosed: function () {},
            onError: function () {}
        }, e(document).ready(function () {
            e.fancybox.init()
        })
    }(jQuery),
    function (e) {
            e.fn.hoverIntent = function (t, n) {
            var r = {
                sensitivity: 7,
                interval: 100,
                timeout: 0
            };
            r = e.extend(r, n ? {
                over: t,
                out: n
            } : t);
            var i, s, o, u, a = function (e) {
                i = e.pageX, s = e.pageY
            },
                f = function (t, n) {
                    n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
                    if (Math.abs(o - i) + Math.abs(u - s) < r.sensitivity) return e(n).unbind("mousemove", a), n.hoverIntent_s = 1, r.over.apply(n, [t]);
                    o = i, u = s, n.hoverIntent_t = setTimeout(function () {
                        f(t, n)
                    }, r.interval)
                },
                l = function (e, t) {
                    return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), t.hoverIntent_s = 0, r.out.apply(t, [e])
                },
                c = function (t) {
                    var n = jQuery.extend({}, t),
                        i = this;
                    i.hoverIntent_t && (i.hoverIntent_t = clearTimeout(i.hoverIntent_t)), t.type == "mouseenter" ? (o = n.pageX, u = n.pageY, e(i).bind("mousemove", a), i.hoverIntent_s != 1 && (i.hoverIntent_t = setTimeout(function () {
                        f(n, i)
                    }, r.interval))) : (e(i).unbind("mousemove", a), i.hoverIntent_s == 1 && (i.hoverIntent_t = setTimeout(function () {
                        l(n, i)
                    }, r.timeout)))
                };
            return this.bind("mouseenter", c).bind("mouseleave", c)
        }
    }(jQuery),
    function (e) {
        function s() {
            return e("<div/>")
        }
        var t = Math.abs,
            n = Math.max,
            r = Math.min,
            i = Math.round;
        e.imgAreaSelect = function (o, u) {
            function Q(e) {
                return e + y.left - S.left
            }
            function G(e) {
                return e + y.top - S.top
            }
            function Y(e) {
                return e - y.left + S.left
            }
            function Z(e) {
                return e - y.top + S.top
            }
            function et(e) {
                return e.pageX - S.left
            }
            function tt(e) {
                return e.pageY - S.top
            }
            function nt(e) {
                var t = e || k,
                    n = e || L;
                return {
                    x1: i(q.x1 * t),
                    y1: i(q.y1 * n),
                    x2: i(q.x2 * t),
                    y2: i(q.y2 * n),
                    width: i(q.x2 * t) - i(q.x1 * t),
                    height: i(q.y2 * n) - i(q.y1 * n)
                }
            }
            function rt(e, t, n, r, s) {
                var o = s || k,
                    u = s || L;
                q = {
                    x1: i(e / o || 0),
                    y1: i(t / u || 0),
                    x2: i(n / o || 0),
                    y2: i(r / u || 0)
                }, q.width = q.x2 - q.x1, q.height = q.y2 - q.y1
            }
            function it() {
                if (!a.width()) return;
                y = {
                    left: i(a.offset().left),
                    top: i(a.offset().top)
                }, b = a.innerWidth(), w = a.innerHeight(), y.top += a.outerHeight() - w >> 1, y.left += a.outerWidth() - b >> 1, O = i(u.minWidth / k) || 0, M = i(u.minHeight / L) || 0, _ = i(r(u.maxWidth / k || 1 << 24, b)), D = i(r(u.maxHeight / L || 1 << 24, w)), e().jquery == "1.3.2" && T == "fixed" && !R.getBoundingClientRect && (y.top += n(document.body.scrollTop, R.scrollTop), y.left += n(document.body.scrollLeft, R.scrollLeft)), S = /absolute|relative/.test(E.css("position")) ? {
                    left: i(E.offset().left) - E.scrollLeft(),
                    top: i(E.offset().top) - E.scrollTop()
                } : T == "fixed" ? {
                    left: e(document).scrollLeft(),
                    top: e(document).scrollTop()
                } : {
                    left: 0,
                    top: 0
                }, m = Q(0), g = G(0), (q.x2 > b || q.y2 > w) && ht()
            }
            function st(t) {
                if (!H) return;
                l.css({
                    left: Q(q.x1),
                    top: G(q.y1)
                }).add(c).width(V = q.width).height(J = q.height), c.add(h).add(d).css({
                    left: 0,
                    top: 0
                }), h.width(n(V - h.outerWidth() + h.innerWidth(), 0)).height(n(J - h.outerHeight() + h.innerHeight(), 0)), e(p[0]).css({
                    left: m,
                    top: g,
                    width: q.x1,
                    height: w
                }), e(p[1]).css({
                    left: m + q.x1,
                    top: g,
                    width: V,
                    height: q.y1
                }), e(p[2]).css({
                    left: m + q.x2,
                    top: g,
                    width: b - q.x2,
                    height: w
                }), e(p[3]).css({
                    left: m + q.x1,
                    top: g + q.y2,
                    width: V,
                    height: w - q.y2
                }), V -= d.outerWidth(), J -= d.outerHeight();
                switch (d.length) {
                    case 8:
                        e(d[4]).css({
                            left: V >> 1
                        }), e(d[5]).css({
                            left: V,
                            top: J >> 1
                        }), e(d[6]).css({
                            left: V >> 1,
                            top: J
                        }), e(d[7]).css({
                            top: J >> 1
                        });
                    case 4:
                        d.slice(1, 3).css({
                            left: V
                        }), d.slice(2, 4).css({
                            top: J
                        })
                }
                t !== !1 && (e.imgAreaSelect.keyPress != Et && e(document).unbind(e.imgAreaSelect.keyPress, e.imgAreaSelect.onKeyPress), u.keys && e(document)[e.imgAreaSelect.keyPress](e.imgAreaSelect.onKeyPress = Et)), e.browser.msie && h.outerWidth() - h.innerWidth() == 2 && (h.css("margin", 0), setTimeout(function () {
                    h.css("margin", "auto")
                }, 0))
            }
            function ot(e) {
                it(), st(e), B = Q(q.x1), j = G(q.y1), F = Q(q.x2), I = G(q.y2)
            }
            function ut(e, t) {
                u.fadeSpeed ? e.fadeOut(u.fadeSpeed, t) : e.hide()
            }
            function at(e) {
                var t = Y(et(e)) - q.x1,
                    n = Z(tt(e)) - q.y1;
                K || (it(), K = !0, l.one("mouseout",
                    function () {
                        K = !1
                    })), A = "", u.resizable && (n <= u.resizeMargin ? A = "n" : n >= q.height - u.resizeMargin && (A = "s"), t <= u.resizeMargin ? A += "w" : t >= q.width - u.resizeMargin && (A += "e")), l.css("cursor", A ? A + "-resize" : u.movable ? "move" : ""), v && v.toggle()
            }
            function ft(t) {
                e("body").css("cursor", ""), (u.autoHide || q.width * q.height == 0) && ut(l.add(p),
                    function () {
                        e(this).hide()
                    }), e(document).unbind("mousemove", pt), l.mousemove(at), u.onSelectEnd(o, nt())
            }
            function lt(t) {
                return t.which != 1 ? !1 : (it(), A ? (e("body").css("cursor", A + "-resize"), B = Q(q[/w/.test(A) ? "x2" : "x1"]), j = G(q[/n/.test(A) ? "y2" : "y1"]), e(document).mousemove(pt).one("mouseup", ft), l.unbind("mousemove", at)) : u.movable ? (N = m + q.x1 - et(t), C = g + q.y1 - tt(t), l.unbind("mousemove", at), e(document).mousemove(vt).one("mouseup",
                    function () {
                        u.onSelectEnd(o, nt()), e(document).unbind("mousemove", vt), l.mousemove(at)
                    })) : a.mousedown(t), !1)
            }
            function ct(e) {
                P && (e ? (F = n(m, r(m + b, B + t(I - j) * P * (F > B || -1))), I = i(n(g, r(g + w, j + t(F - B) / P * (I > j || -1)))), F = i(F)) : (I = n(g, r(g + w, j + t(F - B) / P * (I > j || -1))), F = i(n(m, r(m + b, B + t(I - j) * P * (F > B || -1)))), I = i(I)))
            }
            function ht() {
                B = r(B, m + b), j = r(j, g + w), t(F - B) < O && (F = B - O * (F < B || -1), F < m ? B = m + O : F > m + b && (B = m + b - O)), t(I - j) < M && (I = j - M * (I < j || -1), I < g ? j = g + M : I > g + w && (j = g + w - M)), F = n(m, r(F, m + b)), I = n(g, r(I, g + w)), ct(t(F - B) < t(I - j) * P), t(F - B) > _ && (F = B - _ * (F < B || -1), ct()), t(I - j) > D && (I = j - D * (I < j || -1), ct(!0)), q = {
                    x1: Y(r(B, F)),
                    x2: Y(n(B, F)),
                    y1: Z(r(j, I)),
                    y2: Z(n(j, I)),
                    width: t(F - B),
                    height: t(I - j)
                }, st(), u.onSelectChange(o, nt())
            }
            function pt(e) {
                return F = /w|e|^$/.test(A) || P ? et(e) : Q(q.x2), I = /n|s|^$/.test(A) || P ? tt(e) : G(q.y2), ht(), !1
            }
            function dt(t, n) {
                F = (B = t) + q.width, I = (j = n) + q.height, e.extend(q, {
                    x1: Y(B),
                    y1: Z(j),
                    x2: Y(F),
                    y2: Z(I)
                }), st(), u.onSelectChange(o, nt())
            }
            function vt(e) {
                return B = n(m, r(N + et(e), m + b - q.width)), j = n(g, r(C + tt(e), g + w - q.height)), dt(B, j), e.preventDefault(), !1
            }
            function mt() {
                e(document).unbind("mousemove", mt), it(), F = B, I = j, ht(), A = "", p.is(":visible") || l.add(p).hide().fadeIn(u.fadeSpeed || 0), H = !0, e(document).unbind("mouseup", gt).mousemove(pt).one("mouseup", ft), l.unbind("mousemove", at), u.onSelectStart(o, nt())
            }
            function gt() {
                e(document).unbind("mousemove", mt).unbind("mouseup", gt), ut(l.add(p)), rt(Y(B), Z(j), Y(B), Z(j)), !this instanceof e.imgAreaSelect && (u.onSelectChange(o, nt()), u.onSelectEnd(o, nt()))
            }
            function yt(t) {
                return t.which != 1 || p.is(":animated") ? !1 : (it(), N = B = et(t), C = j = tt(t), e(document).mousemove(mt).mouseup(gt), !1)
            }
            function bt() {
                ot(!1)
            }
            function wt() {
                f = !0, xt(u = e.extend({
                    classPrefix: "imgareaselect",
                    movable: !0,
                    parent: "body",
                    resizable: !0,
                    resizeMargin: 10,
                    onInit: function () {},
                    onSelectStart: function () {},
                    onSelectChange: function () {},
                    onSelectEnd: function () {}
                }, u)), l.add(p).css({
                    visibility: ""
                }), u.show && (H = !0, it(), st(), l.add(p).hide().fadeIn(u.fadeSpeed || 0)), setTimeout(function () {
                    u.onInit(o, nt())
                }, 0)
            }
            function St(e, t) {
                for (option in t) u[option] !== undefined && e.css(t[option], u[option])
            }
            function xt(t) {
                t.parent && (E = e(t.parent)).append(l.add(p)), e.extend(u, t), it();
                if (t.handles != null) {
                    d.remove(), d = e([]), W = t.handles ? t.handles == "corners" ? 4 : 8 : 0;
                    while (W--) d = d.add(s());
                    d.addClass(u.classPrefix + "-handle").css({
                        position: "absolute",
                        fontSize: 0,
                        zIndex: x + 1 || 1
                    }), !parseInt(d.css("width")) >= 0 && d.width(5).height(5), (X = u.borderWidth) && d.css({
                        borderWidth: X,
                        borderStyle: "solid"
                    }), St(d, {
                        borderColor1: "border-color",
                        borderColor2: "background-color",
                        borderOpacity: "opacity"
                    })
                }
                k = u.imageWidth / b || 1, L = u.imageHeight / w || 1, t.x1 != null && (rt(t.x1, t.y1, t.x2, t.y2), t.show = !t.hide), t.keys && (u.keys = e.extend({
                    shift: 1,
                    ctrl: "resize"
                }, t.keys)), p.addClass(u.classPrefix + "-outer"), c.addClass(u.classPrefix + "-selection");
                for (W = 0; W++ < 4;) e(h[W - 1]).addClass(u.classPrefix + "-border" + W);
                St(c, {
                    selectionColor: "background-color",
                    selectionOpacity: "opacity"
                }), St(h, {
                    borderOpacity: "opacity",
                    borderWidth: "border-width"
                }), St(p, {
                    outerColor: "background-color",
                    outerOpacity: "opacity"
                }), (X = u.borderColor1) && e(h[0]).css({
                    borderStyle: "solid",
                    borderColor: X
                }), (X = u.borderColor2) && e(h[1]).css({
                    borderStyle: "dashed",
                    borderColor: X
                }), l.append(c.add(h).add(v).add(d)), e.browser.msie && ((X = p.css("filter").match(/opacity=(\d+)/)) && p.css("opacity", X[1] / 100), (X = h.css("filter").match(/opacity=(\d+)/)) && h.css("opacity", X[1] / 100)), t.hide ? ut(l.add(p)) : t.show && f && (H = !0, l.add(p).fadeIn(u.fadeSpeed || 0), ot()), P = (z = (u.aspectRatio || "").split(/:/))[0] / z[1], a.add(p).unbind("mousedown", yt);
                if (u.disable || u.enable === !1) l.unbind("mousemove", at).unbind("mousedown", lt), e(window).unbind("resize", bt);
                else {
                    if (u.enable || u.disable === !1)(u.resizable || u.movable) && l.mousemove(at).mousedown(lt), e(window).resize(bt);
                    u.persistent || a.add(p).mousedown(yt)
                }
                u.enable = u.disable = undefined
            }
            var a = e(o),
                f, l = s(),
                c = s(),
                h = s().add(s()).add(s()).add(s()),
                p = s().add(s()).add(s()).add(s()),
                d = e([]),
                v, m, g, y = {
                left: 0,
                top: 0
            },
                b, w, E, S = {
                left: 0,
                top: 0
            },
                x = 0,
                T = "absolute",
                N, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                width: 0,
                height: 0
            },
                R = document.documentElement,
                U, z, W, X, V, J, K, Et = function (e) {
                var t = u.keys,
                    i, s, o = e.keyCode;
                i = !isNaN(t.alt) && (e.altKey || e.originalEvent.altKey) ? t.alt : !isNaN(t.ctrl) && e.ctrlKey ? t.ctrl : !isNaN(t.shift) && e.shiftKey ? t.shift : isNaN(t.arrows) ? 10 : t.arrows;
                if (t.arrows == "resize" || t.shift == "resize" && e.shiftKey || t.ctrl == "resize" && e.ctrlKey || t.alt == "resize" && (e.altKey || e.originalEvent.altKey)) {
                    switch (o) {
                        case 37:
                            i = -i;
                        case 39:
                            s = n(B, F), B = r(B, F), F = n(s + i, B), ct();
                            break;
                        case 38:
                            i = -i;
                        case 40:
                            s = n(j, I), j = r(j, I), I = n(s + i, j), ct(!0);
                            break;
                        default:
                            return
                    }
                    ht()
                } else {
                    B = r(B, F), j = r(j, I);
                    switch (o) {
                        case 37:
                            dt(n(B - i, m), j);
                            break;
                        case 38:
                            dt(B, n(j - i, g));
                            break;
                        case 39:
                            dt(B + r(i, b - Y(F)), j);
                            break;
                        case 40:
                            dt(B, j + r(i, w - Z(I)));
                            break;
                        default:
                            return
                    }
                }
                return !1
            };
            this.remove = function () {
                xt({
                    disable: !0
                }), l.add(p).remove()
            }, this.getOptions = function () {
                return u
            }, this.setOptions = xt, this.getSelection = nt, this.setSelection = rt, this.cancelSelection = gt, this.update = ot, U = a;
            while (U.length) x = n(x, isNaN(U.css("z-index")) ? x : U.css("z-index")), U.css("position") == "fixed" && (T = "fixed"), U = U.parent(":not(body)");
            x = u.zIndex || x, e.browser.msie && a.attr("unselectable", "on"), e.imgAreaSelect.keyPress = e.browser.msie || e.browser.safari ? "keydown" : "keypress", e.browser.opera && (v = s().css({
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: x + 2 || 2
            })), l.add(p).css({
                visibility: "hidden",
                position: T,
                overflow: "hidden",
                zIndex: x || "0"
            }), l.css({
                zIndex: x + 2 || 2
            }), c.add(h).css({
                position: "absolute",
                fontSize: 0
            }), o.complete || o.readyState == "complete" || !a.is("img") ? wt() : a.one("load", wt), e.browser.msie && e.browser.version >= 7 && (o.src = o.src)
        }, e.fn.imgAreaSelect = function (t) {
            return t = t || {}, this.each(function () {
                e(this).data("imgAreaSelect") ? t.remove ? (e(this).data("imgAreaSelect").remove(), e(this).removeData("imgAreaSelect")) : e(this).data("imgAreaSelect").setOptions(t) : t.remove || (t.enable === undefined && t.disable === undefined && (t.enable = !0), e(this).data("imgAreaSelect", new e.imgAreaSelect(this, t)))
            }), t.instance ? e(this).data("imgAreaSelect") : this
        }
    }(jQuery),
    function (e) {
        var t = (e.browser.msie ? "paste" : "input") + ".mask",
            n = window.orientation != undefined;
        e.mask = {
            definitions: {
                9: "[0-9]",
                a: "[A-Za-z]",
                "*": "[A-Za-z0-9]"
            },
            dataName: "rawmaskFn"
        }, e.fn.extend({
            caret: function (e, t) {
                if (this.length == 0) return;
                if (typeof e == "number") return t = typeof t == "number" ? t : e, this.each(function () {
                    if (this.setSelectionRange) this.setSelectionRange(e, t);
                    else if (this.createTextRange) {
                        var n = this.createTextRange();
                        n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select()
                    }
                });
                if (this[0].setSelectionRange) e = this[0].selectionStart, t = this[0].selectionEnd;
                else if (document.selection && document.selection.createRange) {
                    var n = document.selection.createRange();
                    e = 0 - n.duplicate().moveStart("character", - 1e5), t = e + n.text.length
                }
                return {
                    begin: e,
                    end: t
                }
            },
            unmask: function () {
                return this.trigger("unmask")
            },
            mask: function (r, i) {
                if (!r && this.length > 0) {
                    var s = e(this[0]);
                    return s.data(e.mask.dataName)()
                }
                i = e.extend({
                    placeholder: "_",
                    completed: null
                }, i);
                var o = e.mask.definitions,
                    u = [],
                    a = r.length,
                    f = null,
                    l = r.length;
                return e.each(r.split(""),
                    function (e, t) {
                        t == "?" ? (l--, a = e) : o[t] ? (u.push(new RegExp(o[t])), f == null && (f = u.length - 1)) : u.push(null)
                    }), this.trigger("unmask").each(function () {
                    function p(e) {
                        while (++e <= l && !u[e]);
                        return e
                    }
                    function d(e) {
                        while (--e >= 0 && !u[e]);
                        return e
                    }
                    function v(e, t) {
                        if (e < 0) return;
                        for (var n = e, r = p(t); n < l; n++) if (u[n]) {
                            if (!(r < l && u[n].test(c[r]))) break;
                            c[n] = c[r], c[r] = i.placeholder, r = p(r)
                        }
                        w(), s.caret(Math.max(f, e))
                    }
                    function m(e) {
                        for (var t = e, n = i.placeholder; t < l; t++) if (u[t]) {
                            var r = p(t),
                                s = c[t];
                            c[t] = n;
                            if (!(r < l && u[r].test(s))) break;
                            n = s
                        }
                    }
                    function g(e) {
                        var t = e.which;
                        if (t == 8 || t == 46 || n && t == 127) {
                            var r = s.caret(),
                                i = r.begin,
                                o = r.end;
                            return o - i == 0 && (i = t != 46 ? d(i) : o = p(i - 1), o = t == 46 ? p(o) : o), b(i, o), v(i, o - 1), !1
                        }
                        if (t == 27) return s.val(h), s.caret(0, E()), !1
                    }
                    function y(e) {
                        var t = e.which,
                            n = s.caret();
                        if (e.ctrlKey || e.altKey || e.metaKey || t < 32) return !0;
                        if (t) {
                            n.end - n.begin != 0 && (b(n.begin, n.end), v(n.begin, n.end - 1));
                            var r = p(n.begin - 1);
                            if (r < l) {
                                var o = String.fromCharCode(t);
                                if (u[r].test(o)) {
                                    m(r), c[r] = o, w();
                                    var a = p(r);
                                    s.caret(a), i.completed && a >= l && i.completed.call(s)
                                }
                            }
                            return !1
                        }
                    }
                    function b(e, t) {
                        for (var n = e; n < t && n < l; n++) u[n] && (c[n] = i.placeholder)
                    }
                    function w() {
                        return s.val(c.join("")).val()
                    }
                    function E(e) {
                        var t = s.val(),
                            n = -1;
                        for (var r = 0, o = 0; r < l; r++) if (u[r]) {
                            c[r] = i.placeholder;
                            while (o++ < t.length) {
                                var h = t.charAt(o - 1);
                                if (u[r].test(h)) {
                                    c[r] = h, n = r;
                                    break
                                }
                            }
                            if (o > t.length) break
                        } else c[r] == t.charAt(o) && r != a && (o++, n = r);
                        if (!e && n + 1 < a) s.val(""), b(0, l);
                        else if (e || n + 1 >= a) w(), e || s.val(s.val().substring(0, n + 1));
                        return a ? r : f
                    }
                    var s = e(this),
                        c = e.map(r.split(""),
                            function (e, t) {
                                if (e != "?") return o[e] ? i.placeholder : e
                            }),
                        h = s.val();
                    s.data(e.mask.dataName,
                        function () {
                            return e.map(c,
                                function (e, t) {
                                    return u[t] && e != i.placeholder ? e : null
                                }).join("")
                        }), s.attr("readonly") || s.one("unmask",
                        function () {
                            s.unbind(".mask").removeData(e.mask.dataName)
                        }).bind("focus.mask",
                        function () {
                            h = s.val();
                            var t = E();
                            w();
                            var n = function () {
                                t == r.length ? s.caret(0, t) : s.caret(t)
                            };
                            (e.browser.msie ? n : function () {
                                setTimeout(n, 0)
                            })()
                        }).bind("blur.mask",
                        function () {
                            E(), s.val() != h && s.change()
                        }).bind("keydown.mask", g).bind("keypress.mask", y).bind(t,
                        function () {
                            setTimeout(function () {
                                s.caret(E(!0))
                            }, 0)
                        }), E()
                })
            }
        })
    }(jQuery),
    function (e) {
        function t(t) {
            var n = t || window.event,
                r = [].slice.call(arguments, 1),
                i = 0,
                s = 0,
                o = 0;
            return t = e.event.fix(n), t.type = "mousewheel", t.wheelDelta && (i = t.wheelDelta / 120), t.detail && (i = -t.detail / 3), o = i, n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS && (o = 0, s = -1 * i), n.wheelDeltaY !== undefined && (o = n.wheelDeltaY / 120), n.wheelDeltaX !== undefined && (s = -1 * n.wheelDeltaX / 120), r.unshift(t, i, s, o), e.event.handle.apply(this, r)
        }
        var n = ["DOMMouseScroll", "mousewheel"];
        e.event.special.mousewheel = {
            setup: function () {
                if (this.addEventListener) for (var e = n.length; e;) this.addEventListener(n[--e], t, !1);
                else this.onmousewheel = t
            },
            teardown: function () {
                if (this.removeEventListener) for (var e = n.length; e;) this.removeEventListener(n[--e], t, !1);
                else this.onmousewheel = null
            }
        }, e.fn.extend({
            mousewheel: function (e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function (e) {
                return this.unbind("mousewheel", e)
            }
        })
    }(jQuery),
    function (e) {
        function t(t, n, r) {
            var i = r.relative ? t.position().top : t.offset().top,
                s = r.relative ? t.position().left : t.offset().left,
                o = r.position[0];
            i -= n.outerHeight() - r.offset[0], s += t.outerWidth() + r.offset[1], / iPad / i.test(navigator.userAgent) && (i -= e(window).scrollTop());
            var u = n.outerHeight() + t.outerHeight();
            return o == "center" && (i += u / 2), o == "bottom" && (i += u), o = r.position[1], t = n.outerWidth() + t.outerWidth(), o == "center" && (s -= t / 2), o == "left" && (s -= t), {
                top: i,
                left: s
            }
        }
        function n(n, i) {
            var s = this,
                u = n.add(s),
                a, l = 0,
                c = 0,
                h = n.attr("title"),
                d = n.attr("data-tooltip"),
                v = r[i.effect],
                m, g = n.is(":input"),
                y = g && n.is(":checkbox, :radio, select, :button, :submit"),
                b = n.attr("type"),
                w = i.events[b] || i.events[g ? y ? "widget" : "input" : "def"];
            if (!v) throw 'Nonexistent effect "' + i.effect + '"';
            w = w.split(/,\s*/);
            if (w.length != 2) throw "Tooltip: bad events configuration for " + b;
            n.bind(w[0],
                function (e) {
                    clearTimeout(l), i.predelay ? c = setTimeout(function () {
                        s.show(e)
                    }, i.predelay) : s.show(e)
                }).bind(w[1],
                function (e) {
                    clearTimeout(c), i.delay ? l = setTimeout(function () {
                        s.hide(e)
                    }, i.delay) : s.hide(e)
                }), h && i.cancelDefault && (n.removeAttr("title"), n.data("title", h)), e.extend(s, {
                show: function (r) {
                    if (!a) {
                        d ? a = e(d) : i.tip ? a = e(i.tip).eq(0) : h ? a = e(i.layout).addClass(i.tipClass).appendTo(document.body).hide().append(h) : (a = n.next(), a.length || (a = n.parent().next()));
                        if (!a.length) throw "Cannot find tooltip for " + n
                    }
                    if (s.isShown()) return s;
                    a.stop(!0, !0);
                    var o = t(n, a, i);
                    return i.tip && a.html(n.data("title")), r = r || e.Event(), r.type = "onBeforeShow", u.trigger(r, [o]), r.isDefaultPrevented() ? s : (o = t(n, a, i), a.css({
                        position: "absolute",
                        top: o.top,
                        left: o.left
                    }), m = !0, v[0].call(s,
                        function () {
                            r.type = "onShow", m = "full", u.trigger(r)
                        }), o = i.events.tooltip.split(/,\s*/), a.data("__set") || (a.bind(o[0],
                        function () {
                            clearTimeout(l), clearTimeout(c)
                        }), o[1] && !n.is("input:not(:checkbox, :radio), textarea") && a.bind(o[1],
                        function (e) {
                            e.relatedTarget != n[0] && n.trigger(w[1].split(" ")[0])
                        }), a.data("__set", !0)), s)
                },
                hide: function (t) {
                    if (!a || !s.isShown()) return s;
                    t = t || e.Event(), t.type = "onBeforeHide", u.trigger(t);
                    if (!t.isDefaultPrevented()) return m = !1, r[i.effect][1].call(s,
                        function () {
                            t.type = "onHide", u.trigger(t)
                        }), s
                },
                isShown: function (e) {
                    return e ? m == "full" : m
                },
                getConf: function () {
                    return i
                },
                getTip: function () {
                    return a
                },
                getTrigger: function () {
                    return n
                }
            }), e.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),
                function (t, n) {
                    e.isFunction(i[n]) && e(s).bind(n, i[n]), s[n] = function (t) {
                        return t && e(s).bind(n, t), s
                    }
                })
        }
        e.tools = e.tools || {
            version: "1.2.5"
        }, e.tools.tooltip = {
            conf: {
                effect: "toggle",
                fadeOutSpeed: "fast",
                predelay: 0,
                delay: 30,
                opacity: 1,
                tip: 0,
                position: ["top", "center"],
                offset: [0, 0],
                relative: !1,
                cancelDefault: !0,
                events: {
                    def: "mouseenter,mouseleave",
                    input: "focus,blur",
                    widget: "focus mouseenter,blur mouseleave",
                    tooltip: "mouseenter,mouseleave"
                },
                layout: "<div/>",
                tipClass: "tooltip"
            },
            addEffect: function (e, t, n) {
                r[e] = [t, n]
            }
        };
        var r = {
            toggle: [function (e) {
                var t = this.getConf(),
                    n = this.getTip();
                t = t.opacity, t < 1 && n.css({
                    opacity: t
                }), n.show(), e.call()
            },
                function (e) {
                    this.getTip().hide(), e.call()
                }],
            fade: [function (e) {
                var t = this.getConf();
                this.getTip().fadeTo(t.fadeInSpeed, t.opacity, e)
            },
                function (e) {
                    this.getTip().fadeOut(this.getConf().fadeOutSpeed, e)
                }]
        };
        e.fn.tooltip = function (t) {
            var r = this.data("tooltip");
            return r ? r : (t = e.extend(!0, {}, e.tools.tooltip.conf, t), typeof t.position == "string" && (t.position = t.position.split(/,?\s/)), this.each(function () {
                r = new n(e(this), t), e(this).data("tooltip", r)
            }), t.api ? r : this)
        }
    }(jQuery),
    function (e) {
        function n(t) {
            return e.map(r(t),
                function (e) {
                    return '<input type="hidden" name="' + e.name + '" value="' + e.value + '"/>'
                }).join("")
        }
        function r(t) {
            function r(e, t) {
                n.push({
                    name: e,
                    value: t
                })
            }
            if (e.isArray(t)) return t;
            var n = [];
            return typeof t == "object" ? e.each(t,
                function (t) {
                    e.isArray(this) ? e.each(this,
                        function () {
                            r(t, this)
                        }) : r(t, e.isFunction(this) ? this() : this)
                }) : typeof t == "string" && e.each(t.split("&"),
                function () {
                    var t = e.map(this.split("="),
                        function (e) {
                            return decodeURIComponent(e.replace(/\+/g, " "))
                        });
                    r(t[0], t[1])
                }), n
        }
        function i(t, n) {
            var r, i = e(t).contents().get(0);
            if (i && (e.isXMLDoc(i) || i.XMLDocument)) return i.XMLDocument || i;
            r = e(i).find("body").text();
            switch (n) {
                case "xml":
                    r = s(r);
                    break;
                case "json":
                    r = window.eval("(" + r + ")")
            }
            return r
        }
        function s(e) {
            if (window.DOMParser) return (new DOMParser).parseFromString(e, "application/xml");
            var t = new ActiveXObject("Microsoft.XMLDOM");
            return t.async = !1, t.loadXML(e), t
        }
        var t = 0;
        e.fn.upload = function (r, s, o, u) {
            var a = this,
                f, l, c, h = "jquery_upload" + ++t,
                p = e('<iframe name="' + h + '" style="position:absolute;top:-9999px" />').appendTo("body"),
                d = '<form target="' + h + '" method="post" enctype="multipart/form-data" />';
            return e.isFunction(s) && (u = o, o = s, s = {}), l = e("input:checkbox", this), c = e("input:checked", this), d = a.wrapAll(d).parent("form").attr("action", r), l.removeAttr("checked"), c.attr("checked", !0), f = n(s), f = f ? e(f).appendTo(d) : null, d.submit(function () {
                p.load(function () {
                    var t = i(this, u),
                        n = e("input:checked", a);
                    d.after(a).remove(), l.removeAttr("checked"), n.attr("checked", !0), f && f.remove(), setTimeout(function () {
                        p.remove(), u === "script" && e.globalEval(t), o && o.call(a, t)
                    }, 0)
                })
            }).submit(), this
        }
    }(jQuery),
    function (e) {
        "use strict";

        function r() {
            this.controls = {
                bold: {
                    groupIndex: 0,
                    visible: !0,
                    tags: ["b", "strong"],
                    css: {
                        fontWeight: "bold"
                    },
                    tooltip: "Bold",
                    hotkey: {
                        ctrl: 1,
                        key: 66
                    }
                },
                copy: {
                    groupIndex: 8,
                    visible: !1,
                    tooltip: "Copy"
                },
                createLink: {
                    groupIndex: 6,
                    visible: !0,
                    exec: function () {
                        var n = this;
                        e.wysiwyg.controls && e.wysiwyg.controls.link ? e.wysiwyg.controls.link.init(this) : e.wysiwyg.autoload ? e.wysiwyg.autoload.control("wysiwyg.link.js",
                            function () {
                                n.controls.createLink.exec.apply(n)
                            }) : t.error("$.wysiwyg.controls.link not defined. You need to include wysiwyg.link.js file")
                    },
                    tags: ["a"],
                    tooltip: "Create link"
                },
                unLink: {
                    groupIndex: 6,
                    visible: !0,
                    exec: function () {
                        this.editorDoc.execCommand("unlink", !1, null)
                    },
                    tooltip: "Remove link"
                },
                cut: {
                    groupIndex: 8,
                    visible: !1,
                    tooltip: "Cut"
                },
                decreaseFontSize: {
                    groupIndex: 9,
                    visible: !1,
                    tags: ["small"],
                    tooltip: "Decrease font size",
                    exec: function () {
                        this.decreaseFontSize()
                    }
                },
                h1: {
                    groupIndex: 7,
                    visible: !0,
                    className: "h1",
                    command: e.browser.msie || e.browser.safari ? "FormatBlock" : "heading",
                    arguments: e.browser.msie || e.browser.safari ? "<h1>" : "h1",
                    tags: ["h1"],
                    tooltip: "Header 1"
                },
                h2: {
                    groupIndex: 7,
                    visible: !0,
                    className: "h2",
                    command: e.browser.msie || e.browser.safari ? "FormatBlock" : "heading",
                    arguments: e.browser.msie || e.browser.safari ? "<h2>" : "h2",
                    tags: ["h2"],
                    tooltip: "Header 2"
                },
                h3: {
                    groupIndex: 7,
                    visible: !0,
                    className: "h3",
                    command: e.browser.msie || e.browser.safari ? "FormatBlock" : "heading",
                    arguments: e.browser.msie || e.browser.safari ? "<h3>" : "h3",
                    tags: ["h3"],
                    tooltip: "Header 3"
                },
                highlight: {
                    tooltip: "Highlight",
                    className: "highlight",
                    groupIndex: 1,
                    visible: !1,
                    css: {
                        backgroundColor: "rgb(255, 255, 102)"
                    },
                    exec: function () {
                        var t, n, r, i;
                        e.browser.msie || e.browser.safari ? t = "backcolor" : t = "hilitecolor";
                        if (e.browser.msie) n = this.getInternalRange().parentElement();
                        else {
                            r = this.getInternalSelection(), n = r.extentNode || r.focusNode;
                            while (n.style === undefined) {
                                n = n.parentNode;
                                if (n.tagName && n.tagName.toLowerCase() === "body") return
                            }
                        }
                        n.style.backgroundColor === "rgb(255, 255, 102)" || n.style.backgroundColor === "#ffff66" ? i = "#ffffff" : i = "#ffff66", this.editorDoc.execCommand(t, !1, i)
                    }
                },
                html: {
                    groupIndex: 10,
                    visible: !1,
                    exec: function () {
                        var t;
                        this.options.resizeOptions && e.fn.resizable && (t = this.element.height()), this.viewHTML ? (this.setContent(this.original.value), e(this.original).hide(), this.editor.show(), this.options.resizeOptions && e.fn.resizable && (t === this.element.height() && this.element.height(t + this.editor.height()), this.element.resizable(e.extend(!0, {
                            alsoResize: this.editor
                        }, this.options.resizeOptions))), this.ui.toolbar.find("li").each(function () {
                            var t = e(this);
                            t.hasClass("html") ? t.removeClass("active") : t.removeClass("disabled")
                        })) : (this.saveContent(), e(this.original).css({
                            width: this.element.outerWidth() - 6,
                            height: this.element.height() - this.ui.toolbar.height() - 6,
                            resize: "none"
                        }).show(), this.editor.hide(), this.options.resizeOptions && e.fn.resizable && (t === this.element.height() && this.element.height(this.ui.toolbar.height()), this.element.resizable("destroy")), this.ui.toolbar.find("li").each(function () {
                            var t = e(this);
                            t.hasClass("html") ? t.addClass("active") : !1 === t.hasClass("fullscreen") && t.removeClass("active").addClass("disabled")
                        })), this.viewHTML = !this.viewHTML
                    },
                    tooltip: "View source code"
                },
                increaseFontSize: {
                    groupIndex: 9,
                    visible: !1,
                    tags: ["big"],
                    tooltip: "Increase font size",
                    exec: function () {
                        this.increaseFontSize()
                    }
                },
                indent: {
                    groupIndex: 2,
                    visible: !0,
                    tooltip: "Indent"
                },
                insertHorizontalRule: {
                    groupIndex: 6,
                    visible: !0,
                    tags: ["hr"],
                    tooltip: "Insert Horizontal Rule"
                },
                insertImage: {
                    groupIndex: 6,
                    visible: !0,
                    exec: function () {
                        var n = this;
                        e.wysiwyg.controls && e.wysiwyg.controls.image ? e.wysiwyg.controls.image.init(this) : e.wysiwyg.autoload ? e.wysiwyg.autoload.control("wysiwyg.image.js",
                            function () {
                                n.controls.insertImage.exec.apply(n)
                            }) : t.error("$.wysiwyg.controls.image not defined. You need to include wysiwyg.image.js file")
                    },
                    tags: ["img"],
                    tooltip: "Insert image"
                },
                insertOrderedList: {
                    groupIndex: 5,
                    visible: !0,
                    tags: ["ol"],
                    tooltip: "Insert Ordered List"
                },
                insertTable: {
                    groupIndex: 6,
                    visible: !0,
                    exec: function () {
                        var n = this;
                        e.wysiwyg.controls && e.wysiwyg.controls.table ? e.wysiwyg.controls.table(this) : e.wysiwyg.autoload ? e.wysiwyg.autoload.control("wysiwyg.table.js",
                            function () {
                                n.controls.insertTable.exec.apply(n)
                            }) : t.error("$.wysiwyg.controls.table not defined. You need to include wysiwyg.table.js file")
                    },
                    tags: ["table"],
                    tooltip: "Insert table"
                },
                insertUnorderedList: {
                    groupIndex: 5,
                    visible: !0,
                    tags: ["ul"],
                    tooltip: "Insert Unordered List"
                },
                italic: {
                    groupIndex: 0,
                    visible: !0,
                    tags: ["i", "em"],
                    css: {
                        fontStyle: "italic"
                    },
                    tooltip: "Italic",
                    hotkey: {
                        ctrl: 1,
                        key: 73
                    }
                },
                justifyCenter: {
                    groupIndex: 1,
                    visible: !0,
                    tags: ["center"],
                    css: {
                        textAlign: "center"
                    },
                    tooltip: "Justify Center"
                },
                justifyFull: {
                    groupIndex: 1,
                    visible: !0,
                    css: {
                        textAlign: "justify"
                    },
                    tooltip: "Justify Full"
                },
                justifyLeft: {
                    visible: !0,
                    groupIndex: 1,
                    css: {
                        textAlign: "left"
                    },
                    tooltip: "Justify Left"
                },
                justifyRight: {
                    groupIndex: 1,
                    visible: !0,
                    css: {
                        textAlign: "right"
                    },
                    tooltip: "Justify Right"
                },
                ltr: {
                    groupIndex: 10,
                    visible: !1,
                    exec: function () {
                        var t = this.dom.getElement("p");
                        return t ? (e(t).attr("dir", "ltr"), !0) : !1
                    },
                    tooltip: "Left to Right"
                },
                outdent: {
                    groupIndex: 2,
                    visible: !0,
                    tooltip: "Outdent"
                },
                paragraph: {
                    groupIndex: 7,
                    visible: !1,
                    className: "paragraph",
                    command: "FormatBlock",
                    arguments: e.browser.msie || e.browser.safari ? "<p>" : "p",
                    tags: ["p"],
                    tooltip: "Paragraph"
                },
                paste: {
                    groupIndex: 8,
                    visible: !1,
                    tooltip: "Paste"
                },
                redo: {
                    groupIndex: 4,
                    visible: !0,
                    tooltip: "Redo"
                },
                removeFormat: {
                    groupIndex: 10,
                    visible: !0,
                    exec: function () {
                        this.removeFormat()
                    },
                    tooltip: "Remove formatting"
                },
                rtl: {
                    groupIndex: 10,
                    visible: !1,
                    exec: function () {
                        var t = this.dom.getElement("p");
                        return t ? (e(t).attr("dir", "rtl"), !0) : !1
                    },
                    tooltip: "Right to Left"
                },
                strikeThrough: {
                    groupIndex: 0,
                    visible: !0,
                    tags: ["s", "strike"],
                    css: {
                        textDecoration: "line-through"
                    },
                    tooltip: "Strike-through"
                },
                subscript: {
                    groupIndex: 3,
                    visible: !0,
                    tags: ["sub"],
                    tooltip: "Subscript"
                },
                superscript: {
                    groupIndex: 3,
                    visible: !0,
                    tags: ["sup"],
                    tooltip: "Superscript"
                },
                underline: {
                    groupIndex: 0,
                    visible: !0,
                    tags: ["u"],
                    css: {
                        textDecoration: "underline"
                    },
                    tooltip: "Underline",
                    hotkey: {
                        ctrl: 1,
                        key: 85
                    }
                },
                undo: {
                    groupIndex: 4,
                    visible: !0,
                    tooltip: "Undo"
                },
                code: {
                    visible: !0,
                    groupIndex: 6,
                    tooltip: "Code snippet",
                    exec: function () {
                        var t = this.getInternalRange(),
                            n = e(t.commonAncestorContainer),
                            r = t.commonAncestorContainer.nodeName.toLowerCase();
                        n.parent("code").length ? n.unwrap() : r !== "body" && n.wrap("<code/>")
                    }
                },
                cssWrap: {
                    visible: !1,
                    groupIndex: 6,
                    tooltip: "CSS Wrapper",
                    exec: function () {
                        e.wysiwyg.controls.cssWrap.init(this)
                    }
                }
            }, this.defaults = {
                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" style="margin:0; padding: 5px;"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body style="margin:0;">INITIAL_CONTENT</body></html>',
                debug: !1,
                controls: {},
                css: {},
                events: {},
                autoGrow: !1,
                autoSave: !0,
                brIE: !0,
                formHeight: 270,
                formWidth: 440,
                iFrameClass: null,
                initialContent: "<p>Initial content</p>",
                maxHeight: 1e4,
                maxLength: 0,
                messages: {
                    nonSelection: "Select the text you wish to link"
                },
                toolbarHtml: '<ul role="menu" class="toolbar"></ul>',
                removeHeadings: !1,
                replaceDivWithP: !1,
                resizeOptions: !1,
                rmUnusedControls: !1,
                rmUnwantedBr: !0,
                tableFiller: "Lorem ipsum",
                initialMinHeight: null,
                controlImage: {
                    forceRelativeUrls: !1
                },
                controlLink: {
                    forceRelativeUrls: !1
                },
                plugins: {
                    autoload: !1,
                    i18n: !1,
                    rmFormat: {
                        rmMsWordMarkup: !1
                    }
                },
                dialog: "default"
            }, this.availableControlProperties = ["arguments", "callback", "className", "command", "css", "custom", "exec", "groupIndex", "hotkey", "icon", "tags", "tooltip", "visible"], this.editor = null, this.editorDoc = null, this.element = null, this.options = {}, this.original = null, this.savedRange = null, this.timers = [], this.validKeyCodes = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46], this.isDestroyed = !1, this.dom = {
                ie: {
                    parent: null
                },
                w3c: {
                    parent: null
                }
            }, this.dom.parent = this, this.dom.ie.parent = this.dom, this.dom.w3c.parent = this.dom, this.ui = {}, this.ui.self = this, this.ui.toolbar = null, this.ui.initialHeight = null, this.dom.getAncestor = function (e, t) {
                t = t.toLowerCase();
                while (e && typeof e.tagName != "undefined" && "body" !== e.tagName.toLowerCase()) {
                    if (t === e.tagName.toLowerCase()) return e;
                    e = e.parentNode
                }
                if (!e.tagName && (e.previousSibling || e.nextSibling)) {
                    if (e.previousSibling && e.previousSibling.tagName.toLowerCase() == t) return e.previousSibling;
                    if (e.nextSibling && e.nextSibling.tagName.toLowerCase() == t) return e.nextSibling
                }
                return null
            }, this.dom.getElement = function (e) {
                var t = this;
                return e = e.toLowerCase(), window.getSelection ? t.w3c.getElement(e) : t.ie.getElement(e)
            }, this.dom.ie.getElement = function (e) {
                var t = this.parent,
                    n = t.parent.getInternalSelection(),
                    r = n.createRange(),
                    i;
                if ("Control" === n.type) {
                    if (1 !== r.length) return null;
                    i = r.item(0)
                } else i = r.parentElement();
                return t.getAncestor(i, e)
            }, this.dom.w3c.getElement = function (e) {
                var t = this.parent,
                    n = t.parent.getInternalRange(),
                    r;
                if (!n) return null;
                r = n.commonAncestorContainer, 3 === r.nodeType && (r = r.parentNode), r === n.startContainer && (r = r.childNodes[n.startOffset]);
                if (!r.tagName && (r.previousSibiling || r.nextSibling)) {
                    if (r.previousSibiling && r.previousSibiling.tagName.toLowerCase() == e) return r.previousSibiling;
                    if (r.nextSibling && r.nextSibling.tagName.toLowerCase() == e) return r.nextSibling
                }
                return t.getAncestor(r, e)
            }, this.ui.addHoverClass = function () {
                e(this).addClass("wysiwyg-button-hover")
            }, this.ui.appendControls = function () {
                var t = this,
                    n = this.self,
                    r = n.parseControls(),
                    i = !0,
                    s = [],
                    o = {},
                    u, a, f = function (e, n) {
                    n.groupIndex && a !== n.groupIndex && (a = n.groupIndex, i = !1);
                    if (!n.visible) return;
                    i || (t.appendItemSeparator(), i = !0), n.custom ? t.appendItemCustom(e, n) : t.appendItem(e, n)
                };
                e.each(r,
                    function (e, t) {
                        var n = "empty";
                        undefined !== t.groupIndex && ("" === t.groupIndex ? n = "empty" : n = t.groupIndex), undefined === o[n] && (s.push(n), o[n] = {}), o[n][e] = t
                    }), s.sort(function (e, t) {
                    return "number" == typeof e && typeof e == typeof t ? e - t : (e = e.toString(), t = t.toString(), e > t ? 1 : e === t ? 0 : -1)
                }), 0 < s.length && (a = s[0]);
                for (u = 0; u < s.length; u += 1) e.each(o[s[u]], f)
            }, this.ui.appendItem = function (t, n) {
                var r = this.self,
                    i = n.className || n.command || t || "empty",
                    s = n.tooltip || n.command || t || "";
                return e('<li role="menuitem" unselectable="on">' + i + "</li>").addClass(i).attr("title", s).hover(this.addHoverClass, this.removeHoverClass).click(function (i) {
                    if (e(this).hasClass("disabled")) return !1;
                    r.triggerControl.apply(r, [t, n]);
                    var s = e(i.target);
                    for (var o in r.controls) if (s.hasClass(o)) {
                        r.ui.toolbar.find("." + o).toggleClass("active"), r.editorDoc.rememberCommand = !0;
                        break
                    }
                    return this.blur(), r.ui.returnRange(), r.ui.focus(), !0
                }).appendTo(r.ui.toolbar)
            }, this.ui.appendItemCustom = function (t, n) {
                var r = this.self,
                    i = n.tooltip || n.command || t || "";
                return n.callback && e(window).bind("trigger-" + t + ".wysiwyg", n.callback), e('<li role="menuitem" unselectable="on" style="background: url(\'' + n.icon + "') no-repeat;\"></li>").addClass("custom-command-" + t).addClass("wysiwyg-custom-command").addClass(t).attr("title", i).hover(this.addHoverClass, this.removeHoverClass).click(function () {
                    return e(this).hasClass("disabled") ? !1 : (r.triggerControl.apply(r, [t, n]), this.blur(), r.ui.returnRange(), r.ui.focus(), r.triggerControlCallback(t), !0)
                }).appendTo(r.ui.toolbar)
            }, this.ui.appendItemSeparator = function () {
                var t = this.self;
                return e('<li role="separator" class="separator"></li>').appendTo(t.ui.toolbar)
            }, this.autoSaveFunction = function () {
                this.saveContent()
            }, this.ui.checkTargets = function (t) {
                var n = this.self;
                e.each(n.options.controls,
                    function (r, i) {
                        var s = i.className || i.command || r || "empty",
                            o, u, a, f, l = function (e, t) {
                            var r;
                            "function" == typeof t ? (r = t, r(f.css(e).toString().toLowerCase(), n) && n.ui.toolbar.find("." + s).addClass("active")) : f.css(e).toString().toLowerCase() === t && n.ui.toolbar.find("." + s).addClass("active")
                        };
                        "fullscreen" !== s && n.ui.toolbar.find("." + s).removeClass("active");
                        if (i.tags || i.options && i.options.tags) {
                            o = i.tags || i.options && i.options.tags, u = t;
                            while (u) {
                                if (u.nodeType !== 1) break;
                                e.inArray(u.tagName.toLowerCase(), o) !== -1 && n.ui.toolbar.find("." + s).addClass("active"), u = u.parentNode
                            }
                        }
                        if (i.css || i.options && i.options.css) {
                            a = i.css || i.options && i.options.css, f = e(t);
                            while (f) {
                                if (f[0].nodeType !== 1) break;
                                e.each(a, l), f = f.parent()
                            }
                        }
                    })
            }, this.ui.designMode = function () {
                var e = 3,
                    t = this.self,
                    n;
                n = function (e) {
                    if ("on" === t.editorDoc.designMode) {
                        t.timers.designMode && window.clearTimeout(t.timers.designMode), t.innerDocument() !== t.editorDoc && t.ui.initFrame();
                        return
                    }
                    try {
                        t.editorDoc.designMode = "on"
                    } catch (r) {}
                    e -= 1, e > 0 && (t.timers.designMode = window.setTimeout(function () {
                        n(e)
                    }, 100))
                }, n(e)
            }, this.destroy = function () {
                this.isDestroyed = !0;
                var t, n = this.element.closest("form");
                for (t = 0; t < this.timers.length; t += 1) window.clearTimeout(this.timers[t]);
                return n.unbind(".wysiwyg"), this.element.remove(), e.removeData(this.original, "wysiwyg"), e(this.original).show(), this
            }, this.getRangeText = function () {
                var e = this.getInternalRange();
                return e.toString ? e = e.toString() : e.text && (e = e.text), e
            }, this.execute = function (e, t) {
                typeof t == "undefined" && (t = null), this.editorDoc.execCommand(e, !1, t)
            }, this.extendOptions = function (t) {
                var n = {};
                return "object" == typeof t.controls && (n = t.controls, delete t.controls), t = e.extend(!0, {}, this.defaults, t), t.controls = e.extend(!0, {}, n, this.controls, n), t.rmUnusedControls && e.each(t.controls,
                    function (e) {
                        n[e] || delete t.controls[e]
                    }), t
            }, this.ui.focus = function () {
                var e = this.self;
                return e.editor.get(0).contentWindow.focus(), e
            }, this.ui.returnRange = function () {
                var e = this.self,
                    n;
                if (e.savedRange !== null) {
                    if (window.getSelection) {
                        n = window.getSelection(), n.rangeCount > 0 && n.removeAllRanges();
                        try {
                            n.addRange(e.savedRange)
                        } catch (r) {
                            t.error(r)
                        }
                    } else window.document.createRange ? window.getSelection().addRange(e.savedRange) : window.document.selection && e.savedRange.select();
                    e.savedRange = null
                }
            }, this.increaseFontSize = function () {
                if (e.browser.mozilla || e.browser.opera) this.editorDoc.execCommand("increaseFontSize", !1, null);
                else if (e.browser.safari) {
                    var n = this.getInternalRange(),
                        r = this.getInternalSelection(),
                        i = this.editorDoc.createElement("big");
                    if (!0 === n.collapsed && 3 === n.commonAncestorContainer.nodeType) {
                        var s = n.commonAncestorContainer.nodeValue.toString(),
                            o = s.lastIndexOf(" ", n.startOffset) + 1,
                            u = -1 === s.indexOf(" ", n.startOffset) ? s : s.indexOf(" ", n.startOffset);
                        n.setStart(n.commonAncestorContainer, o), n.setEnd(n.commonAncestorContainer, u), n.surroundContents(i), r.addRange(n)
                    } else n.surroundContents(i), r.removeAllRanges(), r.addRange(n)
                } else t.error("Internet Explorer?")
            }, this.decreaseFontSize = function () {
                if (e.browser.mozilla || e.browser.opera) this.editorDoc.execCommand("decreaseFontSize", !1, null);
                else if (e.browser.safari) {
                    var n = this.getInternalRange(),
                        r = this.getInternalSelection(),
                        i = this.editorDoc.createElement("small");
                    if (!0 === n.collapsed && 3 === n.commonAncestorContainer.nodeType) {
                        var s = n.commonAncestorContainer.nodeValue.toString(),
                            o = s.lastIndexOf(" ", n.startOffset) + 1,
                            u = -1 === s.indexOf(" ", n.startOffset) ? s : s.indexOf(" ", n.startOffset);
                        n.setStart(n.commonAncestorContainer, o), n.setEnd(n.commonAncestorContainer, u), n.surroundContents(i), r.addRange(n)
                    } else n.surroundContents(i), r.removeAllRanges(), r.addRange(n)
                } else t.error("Internet Explorer?")
            }, this.getContent = function () {
                return this.viewHTML && this.setContent(this.original.value), this.events.filter("getContent", this.editorDoc.body.innerHTML)
            }, this.events = {
                _events: {},
                bind: function (e, t) {
                    typeof this._events.eventName != "object" && (this._events[e] = []), this._events[e].push(t)
                },
                trigger: function (t, n) {
                    if (typeof this._events.eventName == "object") {
                        var r = this.editor;
                        e.each(this._events[t],
                            function (e, t) {
                                typeof t == "function" && t.apply(r, n)
                            })
                    }
                },
                filter: function (t, n) {
                    if (typeof this._events[t] == "object") {
                        var r = this.editor,
                            i = Array.prototype.slice.call(arguments, 1);
                        e.each(this._events[t],
                            function (e, t) {
                                typeof t == "function" && (n = t.apply(r, i))
                            })
                    }
                    return n
                }
            }, this.getElementByAttributeValue = function (t, n, r) {
                var i, s, o = this.editorDoc.getElementsByTagName(t);
                for (i = 0; i < o.length; i += 1) {
                    s = o[i].getAttribute(n), e.browser.msie && (s = s.substr(s.length - r.length));
                    if (s === r) return o[i]
                }
                return !1
            }, this.getInternalRange = function () {
                var e = this.getInternalSelection();
                return e ? e.rangeCount && e.rangeCount > 0 ? e.getRangeAt(0) : e.createRange ? e.createRange() : null : null
            }, this.getInternalSelection = function () {
                if (this.editor.get(0).contentWindow) {
                    if (this.editor.get(0).contentWindow.getSelection) return this.editor.get(0).contentWindow.getSelection();
                    if (this.editor.get(0).contentWindow.selection) return this.editor.get(0).contentWindow.selection
                }
                return this.editorDoc.getSelection ? this.editorDoc.getSelection() : this.editorDoc.selection ? this.editorDoc.selection : null
            }, this.getRange = function () {
                var e = this.getSelection();
                if (!e) return null;
                if (e.rangeCount && e.rangeCount > 0) e.getRangeAt(0);
                else if (e.createRange) return e.createRange();
                return null
            }, this.getSelection = function () {
                return window.getSelection ? window.getSelection() : window.document.selection
            }, this.ui.grow = function () {
                var t = this.self,
                    n = e(t.editorDoc.body),
                    r = e.browser.msie ? n[0].scrollHeight : n.height() + 2 + 10,
                    i = t.ui.initialHeight,
                    s = Math.max(r, i);
                return s = Math.min(s, t.options.maxHeight), t.editor.attr("scrolling", s < t.options.maxHeight ? "no" : "auto"), n.css("color", "#424242"), n.css("line-height", "24px"), n.css("font-size", "16px"), n.css("margin-top", "-20px"), n.css("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif"), n.css("-webkit-font-smoothing", "antialiased"), n.css("overflow", s < t.options.maxHeight ? "hidden" : ""), t.editor.get(0).height = s, t
            }, this.init = function (t, n) {
                var r = this,
                    i = e(t).closest("form"),
                    s = t.width || t.clientWidth || 0,
                    o = t.height || t.clientHeight || 0;
                this.options = this.extendOptions(n), this.original = t, this.ui.toolbar = e(this.options.toolbarHtml), e.browser.msie && parseInt(e.browser.version, 10) < 8 && (this.options.autoGrow = !1), s === 0 && t.cols && (s = t.cols * 8 + 21), o === 0 && t.rows && (o = t.rows * 16 + 16), this.editor = e(window.location.protocol === "https:" ? '<iframe src="javascript:false;"></iframe>' : "<iframe></iframe>").attr("frameborder", "0"), this.options.iFrameClass ? this.editor.addClass(this.options.iFrameClass) : (this.editor.css({
                    minHeight: (o - 6).toString() + "px",
                    width: s > 50 ? (s - 8).toString() + "px" : ""
                }), e.browser.msie && parseInt(e.browser.version, 10) < 7 && this.editor.css("height", o.toString() + "px"));
                if (t.id) {
                    var u = t.id + "-wysiwyg-iframe";
                    document.getElementById(u) || this.editor.attr("id", u)
                }
                this.editor.attr("tabindex", e(t).attr("tabindex")), this.element = e("<div/>").addClass("wysiwyg"), this.options.iFrameClass || this.element.css({
                    width: s > 0 ? s.toString() + "px" : "100%"
                }), e(t).hide().before(this.element), this.viewHTML = !1, this.initialContent = e(t).val(), this.ui.initFrame(), this.options.resizeOptions && e.fn.resizable && this.element.resizable(e.extend(!0, {
                    alsoResize: this.editor
                }, this.options.resizeOptions)), this.options.autoSave && i.bind("submit.wysiwyg",
                    function () {
                        r.autoSaveFunction()
                    }), i.bind("reset.wysiwyg",
                    function () {
                        r.resetFunction()
                    })
            }, this.ui.initFrame = function () {
                var n = this.self,
                    r, i, s;
                n.ui.appendControls(), n.element.append(n.ui.toolbar).append(e("<div><!-- --></div>").css({
                    clear: "both"
                })).append(n.editor), n.editorDoc = n.innerDocument();
                if (n.isDestroyed) return null;
                n.ui.designMode(), n.editorDoc.open(), n.editorDoc.write(n.options.html.replace(/INITIAL_CONTENT/,
                    function () {
                        return n.wrapInitialContent()
                    })), n.editorDoc.close(), e.wysiwyg.plugin.bind(n), e(n.editorDoc).trigger("initFrame.wysiwyg"), e(n.editorDoc).bind("click.wysiwyg",
                    function (e) {
                        n.ui.checkTargets(e.target ? e.target : e.srcElement)
                    }), setInterval(function () {
                    var r = null;
                    try {
                        var i = n.getInternalRange();
                        i && (r = {
                            range: i,
                            parent: e.browser.msie ? i.parentElement() : i.endContainer.parentNode,
                            width: (e.browser.msie ? i.boundingWidth : i.startOffset - i.endOffset) || 0
                        })
                    } catch (s) {
                        t.error(s)
                    }
                    r && r.width == 0 && !n.editorDoc.rememberCommand && n.ui.checkTargets(r.parent)
                }, 400), e(n.original).focus(function () {
                    if (e(this).filter(":visible").length === 0) return;
                    n.ui.focus()
                }), e(n.editorDoc).bind("paste",
                    function (t) {
                        var r = e(this);
                        setTimeout(function () {
                            var e = n.getContent();
                            e = e.replace(/&lt;/g, "<").replace(/&gt;/g, ">"), e = e.replace(/<meta\s[^>]+>/g, ""), e = e.replace(/<link\s[^>]+>/g, ""), e = e.replace(/<title>[\s\S]*?<\/title>/g, ""), e = e.replace(/<style(?:\s[^>]*)?>[\s\S]*?<\/style>/gm, ""), e = e.replace(/<w:([^\s>]+)(?:\s[^\/]+)?\/>/g, ""), e = e.replace(/<w:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/w:\1>/gm, ""), e = e.replace(/<m:([^\s>]+)(?:\s[^\/]+)?\/>/g, ""), e = e.replace(/<m:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/m:\1>/gm, ""), e = e.replace(/<xml>[\s\S]*?<\/xml>/g, ""), e = e.replace(/<object(?:\s[^>]*)?>[\s\S]*?<\/object>/g, ""), e = e.replace(/<o:([^\s>]+)(?:\s[^\/]+)?\/>/g, ""), e = e.replace(/<o:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/o:\1>/gm, ""), e = e.replace(/<st1:([^\s>]+)(?:\s[^\/]+)?\/>/g, ""), e = e.replace(/<st1:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/st1:\1>/gm, ""), e = e.replace(/<!--[^>]+>\s*<[^>]+>/gm, ""), e = e.replace(/^[\s\n]+/gm, ""), e = e.replace(/<(\/)*(\\?xml:|a|span|p|hr|button|h1|h2|h3|h4|h5|style|font|del|ins|st1:|[ovwxp]:)(.*?)>/gi, ""), e = e.replace(/(class|style|type|start|href)="(.*?)"/gi, ""), e = e.replace(/\s*mso-[^:]+:[^;"]+;?/gi, ""), e = e.replace(/<\s*(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3"), e = e.replace(/<(\w[^>]*) onmouseover="([^\"]*)"([^>]*)/gi, "<$1$3"), e = e.replace(/<(\w[^>]*) onmouseout="([^\"]*)"([^>]*)/gi, "<$1$3"), e = e.replace(/<script(.*?)script>/gi, ""), e = e.replace(/<!--(.*?)-->/gi, ""), e = e.replace(/<\/?(span)[^>]*>/gi, ""), e = e.replace(/<\/?(span)[^>]*>/gi, ""), e = e.replace(/<\/?(img|font|style|p|div|v:\w+)[^>]*>/gi, ""), e = e.replace(/\s*style="\s*"/gi, ""), e = e.replace(/<SPAN\s*[^>]*>\s*&nbsp;\s*<\/SPAN>/gi, "&nbsp;"), e = e.replace(/<SPAN\s*[^>]*><\/SPAN>/gi, ""), n.setContent("<p>" + e + "</p>")
                        }, 100)
                    }), e(n.editorDoc).keydown(function (e) {
                    var t;
                    if (e.keyCode === 8) {
                        t = /^<([\w]+)[^>]*>(<br\/?>)?<\/\1>$/;
                        if (t.test(n.getContent())) return e.stopPropagation(), !1
                    }
                    return n.editorDoc.rememberCommand = !1, !0
                }), e.browser.msie ? n.options.brIE && e(n.editorDoc).keydown(function (e) {
                    if (e.keyCode === 13) {
                        var t = n.getRange();
                        return t.pasteHTML("<br/>"), t.collapse(!1), t.select(), !1
                    }
                    return !0
                }) : e(n.editorDoc).keydown(function (e) {
                    var t, r;
                    if (e.ctrlKey || e.metaKey) for (t in n.options.controls) {
                        r = n.options.controls[t];
                        if (r.hotkey && r.hotkey.ctrl && e.keyCode === r.hotkey.key) return n.triggerControl.apply(n, [t, r]), !1
                    }
                    return !0
                }), n.options.plugins.rmFormat.rmMsWordMarkup && e(n.editorDoc).bind("keyup.wysiwyg",
                    function (t) {
                        (t.ctrlKey || t.metaKey) && 86 === t.keyCode && e.wysiwyg.rmFormat && ("object" == typeof n.options.plugins.rmFormat.rmMsWordMarkup ? e.wysiwyg.rmFormat.run(n, {
                            rules: {
                                msWordMarkup: n.options.plugins.rmFormat.rmMsWordMarkup
                            }
                        }) : e.wysiwyg.rmFormat.run(n, {
                            rules: {
                                msWordMarkup: {
                                    enabled: !0
                                }
                            }
                        }))
                    }), n.options.autoSave && e(n.editorDoc).keydown(function () {
                    n.autoSaveFunction()
                }).keyup(function () {
                        n.autoSaveFunction()
                    }).mousedown(function () {
                        n.autoSaveFunction()
                    }).bind(e.support.noCloneEvent ? "input.wysiwyg" : "paste.wysiwyg",
                    function () {
                        n.autoSaveFunction()
                    }), n.options.autoGrow && (n.options.initialMinHeight !== null ? (n.ui.initialHeight = n.options.initialMinHeight, n.ui.grow()) : n.ui.initialHeight = e(n.editorDoc).height(), e(n.editorDoc.body).css("border", "0px solid white; "), i = function () {
                    n.ui.grow()
                }, e(n.editorDoc).keyup(i), e(n.editorDoc).bind("editorRefresh.wysiwyg", i), n.ui.grow()), n.options.css && (String === n.options.css.constructor ? e.browser.msie ? (r = n.editorDoc.createStyleSheet(n.options.css), e(r).attr({
                    media: "all"
                })) : (r = e("<link/>").attr({
                    href: n.options.css,
                    media: "all",
                    rel: "stylesheet",
                    type: "text/css"
                }), e(n.editorDoc).find("head").append(r)) : n.timers.initFrame_Css = window.setTimeout(function () {
                    e(n.editorDoc.body).css(n.options.css)
                }, 0)), n.initialContent.length === 0 && ("function" == typeof n.options.initialContent ? n.setContent(n.options.initialContent()) : n.setContent(n.options.initialContent)), n.options.maxLength > 0 && e(n.editorDoc).keydown(function (t) {
                    e(n.editorDoc).text().length >= n.options.maxLength && e.inArray(t.which, n.validKeyCodes) === -1 && t.preventDefault()
                }), e.each(n.options.events,
                    function (t, r) {
                        e(n.editorDoc).bind(t + ".wysiwyg",
                            function (e) {
                                r.apply(n.editorDoc, [e, n])
                            })
                    }), e.browser.msie ? e(n.editorDoc).bind("beforedeactivate.wysiwyg",
                    function () {
                        n.savedRange = n.getInternalRange()
                    }) : e(n.editorDoc).bind("blur.wysiwyg",
                    function () {
                        n.savedRange = n.getInternalRange()
                    }), e(n.editorDoc.body).addClass("wysiwyg"), n.options.events && n.options.events.save && (s = n.options.events.save, e(n.editorDoc).bind("keyup.wysiwyg", s), e(n.editorDoc).bind("change.wysiwyg", s), e.support.noCloneEvent ? e(n.editorDoc).bind("input.wysiwyg", s) : (e(n.editorDoc).bind("paste.wysiwyg", s), e(n.editorDoc).bind("cut.wysiwyg", s)));
                if (n.options.xhtml5 && n.options.unicode) {
                    var o = {
                        ne: 8800,
                        le: 8804,
                        para: 182,
                        xi: 958,
                        darr: 8595,
                        nu: 957,
                        oacute: 243,
                        Uacute: 218,
                        omega: 969,
                        prime: 8242,
                        pound: 163,
                        igrave: 236,
                        thorn: 254,
                        forall: 8704,
                        emsp: 8195,
                        lowast: 8727,
                        brvbar: 166,
                        alefsym: 8501,
                        nbsp: 160,
                        delta: 948,
                        clubs: 9827,
                        lArr: 8656,
                        Omega: 937,
                        Auml: 196,
                        cedil: 184,
                        and: 8743,
                        plusmn: 177,
                        ge: 8805,
                        raquo: 187,
                        uml: 168,
                        equiv: 8801,
                        laquo: 171,
                        rdquo: 8221,
                        Epsilon: 917,
                        divide: 247,
                        fnof: 402,
                        chi: 967,
                        Dagger: 8225,
                        iacute: 237,
                        rceil: 8969,
                        sigma: 963,
                        Oslash: 216,
                        acute: 180,
                        frac34: 190,
                        lrm: 8206,
                        upsih: 978,
                        Scaron: 352,
                        part: 8706,
                        exist: 8707,
                        nabla: 8711,
                        image: 8465,
                        prop: 8733,
                        zwj: 8205,
                        omicron: 959,
                        aacute: 225,
                        Yuml: 376,
                        Yacute: 221,
                        weierp: 8472,
                        rsquo: 8217,
                        otimes: 8855,
                        kappa: 954,
                        thetasym: 977,
                        harr: 8596,
                        Ouml: 214,
                        Iota: 921,
                        ograve: 242,
                        sdot: 8901,
                        copy: 169,
                        oplus: 8853,
                        acirc: 226,
                        sup: 8835,
                        zeta: 950,
                        Iacute: 205,
                        Oacute: 211,
                        crarr: 8629,
                        Nu: 925,
                        bdquo: 8222,
                        lsquo: 8216,
                        apos: 39,
                        Beta: 914,
                        eacute: 233,
                        egrave: 232,
                        lceil: 8968,
                        Kappa: 922,
                        piv: 982,
                        Ccedil: 199,
                        ldquo: 8220,
                        Xi: 926,
                        cent: 162,
                        uarr: 8593,
                        hellip: 8230,
                        Aacute: 193,
                        ensp: 8194,
                        sect: 167,
                        Ugrave: 217,
                        aelig: 230,
                        ordf: 170,
                        curren: 164,
                        sbquo: 8218,
                        macr: 175,
                        Phi: 934,
                        Eta: 919,
                        rho: 961,
                        Omicron: 927,
                        sup2: 178,
                        euro: 8364,
                        aring: 229,
                        Theta: 920,
                        mdash: 8212,
                        uuml: 252,
                        otilde: 245,
                        eta: 951,
                        uacute: 250,
                        rArr: 8658,
                        nsub: 8836,
                        agrave: 224,
                        notin: 8713,
                        ndash: 8211,
                        Psi: 936,
                        Ocirc: 212,
                        sube: 8838,
                        szlig: 223,
                        micro: 181,
                        not: 172,
                        sup1: 185,
                        middot: 183,
                        iota: 953,
                        ecirc: 234,
                        lsaquo: 8249,
                        thinsp: 8201,
                        sum: 8721,
                        ntilde: 241,
                        scaron: 353,
                        cap: 8745,
                        atilde: 227,
                        lang: 10216,
                        __replacement: 65533,
                        isin: 8712,
                        gamma: 947,
                        Euml: 203,
                        ang: 8736,
                        upsilon: 965,
                        Ntilde: 209,
                        hearts: 9829,
                        Alpha: 913,
                        Tau: 932,
                        spades: 9824,
                        dagger: 8224,
                        THORN: 222,
                        "int": 8747,
                        lambda: 955,
                        Eacute: 201,
                        Uuml: 220,
                        infin: 8734,
                        rlm: 8207,
                        Aring: 197,
                        ugrave: 249,
                        Egrave: 200,
                        Acirc: 194,
                        rsaquo: 8250,
                        ETH: 208,
                        oslash: 248,
                        alpha: 945,
                        Ograve: 210,
                        Prime: 8243,
                        mu: 956,
                        ni: 8715,
                        real: 8476,
                        bull: 8226,
                        beta: 946,
                        icirc: 238,
                        eth: 240,
                        prod: 8719,
                        larr: 8592,
                        ordm: 186,
                        perp: 8869,
                        Gamma: 915,
                        reg: 174,
                        ucirc: 251,
                        Pi: 928,
                        psi: 968,
                        tilde: 732,
                        asymp: 8776,
                        zwnj: 8204,
                        Agrave: 192,
                        deg: 176,
                        AElig: 198,
                        times: 215,
                        Delta: 916,
                        sim: 8764,
                        Otilde: 213,
                        Mu: 924,
                        uArr: 8657,
                        circ: 710,
                        theta: 952,
                        Rho: 929,
                        sup3: 179,
                        diams: 9830,
                        tau: 964,
                        Chi: 935,
                        frac14: 188,
                        oelig: 339,
                        shy: 173,
                        or: 8744,
                        dArr: 8659,
                        phi: 966,
                        iuml: 239,
                        Lambda: 923,
                        rfloor: 8971,
                        iexcl: 161,
                        cong: 8773,
                        ccedil: 231,
                        Icirc: 206,
                        frac12: 189,
                        loz: 9674,
                        rarr: 8594,
                        cup: 8746,
                        radic: 8730,
                        frasl: 8260,
                        euml: 235,
                        OElig: 338,
                        hArr: 8660,
                        Atilde: 195,
                        Upsilon: 933,
                        there4: 8756,
                        ouml: 246,
                        oline: 8254,
                        Ecirc: 202,
                        yacute: 253,
                        auml: 228,
                        permil: 8240,
                        sigmaf: 962,
                        iquest: 191,
                        empty: 8709,
                        pi: 960,
                        Ucirc: 219,
                        supe: 8839,
                        Igrave: 204,
                        yen: 165,
                        rang: 10217,
                        trade: 8482,
                        lfloor: 8970,
                        minus: 8722,
                        Zeta: 918,
                        sub: 8834,
                        epsilon: 949,
                        yuml: 255,
                        Sigma: 931,
                        Iuml: 207,
                        ocirc: 244
                    };
                    n.events.bind("getContent",
                        function (e) {
                            return e.replace(/&(?:amp;)?(?!amp|lt|gt|quot)([a-z][a-z0-9]*);/gi,
                                function (e, t) {
                                    o[t] || (t = t.toLowerCase(), o[t] || (t = "__replacement"));
                                    var n = o[t];
                                    return String.fromCharCode(n)
                                })
                        })
                }
                e(n.original).trigger("ready.jwysiwyg", [n.editorDoc, n])
            }, this.innerDocument = function () {
                var e = this.editor.get(0);
                if (e.nodeName.toLowerCase() === "iframe") {
                    if (e.contentDocument) return e.contentDocument;
                    if (e.contentWindow) return e.contentWindow.document;
                    if (this.isDestroyed) return null;
                    t.error("Unexpected error in innerDocument")
                }
                return e
            }, this.insertHtml = function (t) {
                var n, r;
                return !t || t.length === 0 ? this : (e.browser.msie ? (this.ui.focus(), this.editorDoc.execCommand("insertImage", !1, "#jwysiwyg#"), n = this.getElementByAttributeValue("img", "src", "#jwysiwyg#"), n && e(n).replaceWith(t)) : e.browser.mozilla ? 1 === e(t).length ? (r = this.getInternalRange(), r.deleteContents(), r.insertNode(e(t).get(0))) : this.editorDoc.execCommand("insertHTML", !1, t) : this.editorDoc.execCommand("insertHTML", !1, t) || (this.editor.focus(), this.editorDoc.execCommand("insertHTML", !1, t)), this.saveContent(), this)
            }, this.parseControls = function () {
                var t = this;
                return e.each(this.options.controls,
                    function (n, r) {
                        e.each(r,
                            function (r) {
                                if (-1 === e.inArray(r, t.availableControlProperties)) throw n + '["' + r + '"]: property "' + r + '" not exists in Wysiwyg.availableControlProperties'
                            })
                    }), this.options.parseControls ? this.options.parseControls.call(this) : this.options.controls
            }, this.removeFormat = function () {
                return e.browser.msie && this.ui.focus(), this.options.removeHeadings && this.editorDoc.execCommand("formatBlock", !1, "<p>"), this.editorDoc.execCommand("removeFormat", !1, null), this.editorDoc.execCommand("unlink", !1, null), e.wysiwyg.rmFormat && e.wysiwyg.rmFormat.enabled && ("object" == typeof this.options.plugins.rmFormat.rmMsWordMarkup ? e.wysiwyg.rmFormat.run(this, {
                    rules: {
                        msWordMarkup: this.options.plugins.rmFormat.rmMsWordMarkup
                    }
                }) : e.wysiwyg.rmFormat.run(this, {
                    rules: {
                        msWordMarkup: {
                            enabled: !0
                        }
                    }
                })), this
            }, this.ui.removeHoverClass = function () {
                e(this).removeClass("wysiwyg-button-hover")
            }, this.resetFunction = function () {
                this.setContent(this.initialContent)
            }, this.saveContent = function () {
                if (this.viewHTML) return;
                if (this.original) {
                    var t, n;
                    t = this.getContent(), this.options.rmUnwantedBr && (t = t.replace(/<br\/?>$/, "")), this.options.replaceDivWithP && (n = e("<div/>").addClass("temp").append(t), n.children("div").each(function () {
                        var t = e(this),
                            n = t.find("p"),
                            r;
                        if (0 === n.length) {
                            n = e("<p></p>");
                            if (this.attributes.length > 0) for (r = 0; r < this.attributes.length; r += 1) n.attr(this.attributes[r].name, t.attr(this.attributes[r].name));
                            n.append(t.html()), t.replaceWith(n)
                        }
                    }), t = n.html()), e(this.original).val(t), this.options.events && this.options.events.save && this.options.events.save.call(this)
                }
                return this
            }, this.setContent = function (e) {
                return this.editorDoc.body.innerHTML = e, this.saveContent(), this
            }, this.triggerControl = function (e, n) {
                var r = n.command || e,
                    i = n.arguments || [];
                if (n.exec) n.exec.apply(this);
                else {
                    this.ui.focus(), this.ui.withoutCss();
                    try {
                        this.editorDoc.execCommand(r, !1, i)
                    } catch (s) {
                        t.error(s)
                    }
                }
                this.options.autoSave && this.autoSaveFunction()
            }, this.triggerControlCallback = function (t) {
                e(window).trigger("trigger-" + t + ".wysiwyg", [this])
            }, this.ui.withoutCss = function () {
                var t = this.self;
                if (e.browser.mozilla) try {
                    t.editorDoc.execCommand("styleWithCSS", !1, !1)
                } catch (n) {
                    try {
                        t.editorDoc.execCommand("useCSS", !1, !0)
                    } catch (r) {}
                }
                return t
            }, this.wrapInitialContent = function () {
                var e = this.initialContent,
                    t = e.match(/<\/?p>/gi);
                return t ? e : "<p>" + e + "</p>"
            }
        }
        var t = window.console ? window.console : {
            log: e.noop,
            error: function (t) {
                e.error(t)
            }
        },
            n = "prop" in e.fn && "removeProp" in e.fn;
        e.wysiwyg = {
            messages: {
                noObject: "Something goes wrong, check object"
            },
            addControl: function (t, n, r) {
                return t.each(function () {
                    var t = e(this).data("wysiwyg"),
                        i = {},
                        s;
                    if (!t) return this;
                    i[n] = e.extend(!0, {
                        visible: !0,
                        custom: !0
                    }, r), e.extend(!0, t.options.controls, i), s = e(t.options.toolbarHtml), t.ui.toolbar.replaceWith(s), t.ui.toolbar = s, t.ui.appendControls()
                })
            },
            clear: function (t) {
                return t.each(function () {
                    var t = e(this).data("wysiwyg");
                    if (!t) return this;
                    t.setContent("")
                })
            },
            console: t,
            destroy: function (t) {
                return t.each(function () {
                    var t = e(this).data("wysiwyg");
                    if (!t) return this;
                    t.destroy()
                })
            },
            document: function (t) {
                var n = t.data("wysiwyg");
                return n ? e(n.editorDoc) : undefined
            },
            getContent: function (e) {
                var t = e.data("wysiwyg");
                return t ? t.getContent() : undefined
            },
            getSelection: function (e) {
                var t = e.data("wysiwyg");
                return t ? t.getRangeText() : undefined
            },
            init: function (t, n) {
                return t.each(function () {
                    var t = e.extend(!0, {}, n),
                        i;
                    if ("textarea" !== this.nodeName.toLowerCase() || e(this).data("wysiwyg")) return;
                    i = new r, i.init(this, t), e.data(this, "wysiwyg", i), e(i.editorDoc).trigger("afterInit.wysiwyg")
                })
            },
            insertHtml: function (t, n) {
                return t.each(function () {
                    var t = e(this).data("wysiwyg");
                    if (!t) return this;
                    t.insertHtml(n)
                })
            },
            plugin: {
                listeners: {},
                bind: function (t) {
                    var n = this;
                    e.each(this.listeners,
                        function (r, i) {
                            var s, o;
                            for (s = 0; s < i.length; s += 1) o = n.parseName(i[s]), e(t.editorDoc).bind(r + ".wysiwyg", {
                                    plugin: o
                                },
                                function (n) {
                                    e.wysiwyg[n.data.plugin.name][n.data.plugin.method].apply(e.wysiwyg[n.data.plugin.name], [t])
                                })
                        })
                },
                exists: function (t) {
                    var n;
                    return "string" != typeof t ? !1 : (n = this.parseName(t), !e.wysiwyg[n.name] || !e.wysiwyg[n.name][n.method] ? !1 : !0)
                },
                listen: function (t, n) {
                    var r;
                    return r = this.parseName(n), !e.wysiwyg[r.name] || !e.wysiwyg[r.name][r.method] ? !1 : (this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push(n), !0)
                },
                parseName: function (e) {
                    var t;
                    return "string" != typeof e ? !1 : (t = e.split("."), 2 > t.length ? !1 : {
                        name: t[0],
                        method: t[1]
                    })
                },
                register: function (n) {
                    return n.name || t.error("Plugin name missing"), e.each(e.wysiwyg,
                        function (e) {
                            e === n.name && t.error("Plugin with name '" + n.name + "' was already registered")
                        }), e.wysiwyg[n.name] = n, !0
                }
            },
            removeFormat: function (t) {
                return t.each(function () {
                    var t = e(this).data("wysiwyg");
                    if (!t) return this;
                    t.removeFormat()
                })
            },
            save: function (t) {
                return t.each(function () {
                    var t = e(this).data("wysiwyg");
                    if (!t) return this;
                    t.saveContent()
                })
            },
            selectAll: function (e) {
                var t = e.data("wysiwyg"),
                    n, r, i;
                if (!t) return this;
                n = t.editorDoc.body, window.getSelection ? (i = t.getInternalSelection(), i.selectAllChildren(n)) : (r = n.createTextRange(), r.moveToElementText(n), r.select())
            },
            setContent: function (t, n) {
                return t.each(function () {
                    var t = e(this).data("wysiwyg");
                    if (!t) return this;
                    t.setContent(n)
                })
            },
            triggerControl: function (n, r) {
                return n.each(function () {
                    var n = e(this).data("wysiwyg");
                    if (!n) return this;
                    n.controls[r] || t.error("Control '" + r + "' not exists"), n.triggerControl.apply(n, [r, n.controls[r]])
                })
            },
            support: {
                prop: n
            },
            utils: {
                extraSafeEntities: [
                    ["<", ">", "'", '"', " "],
                    [32]
                ],
                encodeEntities: function (t) {
                    var n = this,
                        r, i = [];
                    return this.extraSafeEntities[1].length === 0 && e.each(this.extraSafeEntities[0],
                        function (e, t) {
                            n.extraSafeEntities[1].push(t.charCodeAt(0))
                        }), r = t.split(""), e.each(r,
                        function (t) {
                            var s = r[t].charCodeAt(0);
                            e.inArray(s, n.extraSafeEntities[1]) && (s < 65 || s > 127 || s > 90 && s < 97) ? i.push("&#" + s + ";") : i.push(r[t])
                        }), i.join("")
                }
            }
        }, e.wysiwyg.dialog = function (t, n) {
            var r = t && t.options && t.options.dialog ? t.options.dialog : n.theme ? n.theme : "default",
                i = new e.wysiwyg.dialog.createDialog(r),
                s = this,
                o = e(s);
            return this.options = {
                modal: !0,
                draggable: !0,
                title: "Title",
                content: "Content",
                width: "auto",
                height: "auto",
                zIndex: 2e3,
                open: !1,
                close: !1
            }, this.isOpen = !1, e.extend(this.options, n), this.object = i, this.open = function () {
                this.isOpen = !0, i.init.apply(s, []);
                var e = i.show.apply(s, []);
                o.trigger("afterOpen", [e])
            }, this.show = function () {
                this.isOpen = !0, o.trigger("beforeShow");
                var e = i.show.apply(s, []);
                o.trigger("afterShow")
            }, this.hide = function () {
                this.isOpen = !1, o.trigger("beforeHide");
                var e = i.hide.apply(s, []);
                o.trigger("afterHide", [e])
            }, this.close = function () {
                this.isOpen = !1;
                var e = i.hide.apply(s, []);
                o.trigger("beforeClose", [e]), i.destroy.apply(s, []), o.trigger("afterClose", [e])
            }, this.options.open && o.bind("afterOpen", this.options.open), this.options.close && o.bind("afterClose", this.options.close), this
        }, e.extend(!0, e.wysiwyg.dialog, {
            _themes: {},
            _theme: "",
            register: function (t, n) {
                e.wysiwyg.dialog._themes[t] = n
            },
            deregister: function (t) {
                delete e.wysiwyg.dialog._themes[t]
            },
            createDialog: function (t) {
                return new e.wysiwyg.dialog._themes[t]
            },
            getDimensions: function () {
                var t = document.body.scrollWidth,
                    n = document.body.scrollHeight;
                return e.browser.opera && (n = Math.max(e(document).height(), e(window).height(), document.documentElement.clientHeight)), [t, n]
            }
        }), e(function () {
            jQuery.ui && e.wysiwyg.dialog.register("jqueryui",
                function () {
                    var t = this;
                    this._$dialog = null, this.init = function () {
                        var n = this,
                            r = this.options.content;
                        typeof r == "object" && (typeof r.html == "function" ? r = r.html() : typeof r.toString == "function" && (r = r.toString())), t._$dialog = e("<div></div>").attr("title", this.options.title).html(r);
                        var i = this.options.height == "auto" ? 300 : this.options.height,
                            s = this.options.width == "auto" ? 450 : this.options.width;
                        return t._$dialog.dialog({
                            modal: this.options.modal,
                            draggable: this.options.draggable,
                            height: i,
                            width: s
                        }), t._$dialog
                    }, this.show = function () {
                        return t._$dialog.dialog("open"), t._$dialog
                    }, this.hide = function () {
                        return t._$dialog.dialog("close"), t._$dialog
                    }, this.destroy = function () {
                        return t._$dialog.dialog("destroy"), t._$dialog
                    }
                }), e.wysiwyg.dialog.register("default",
                function () {
                    var t = this;
                    this._$dialog = null, this.init = function () {
                        var n = this,
                            r = this.options.content;
                        typeof r == "object" && (typeof r.html == "function" ? r = r.html() : typeof r.toString == "function" && (r = r.toString())), t._$dialog = e('<div class="wysiwyg-dialog"></div>').css({
                            "z-index": this.options.zIndex
                        });
                        var i = e('<div class="wysiwyg-dialog-topbar"><div class="wysiwyg-dialog-close-wrapper"></div><div class="wysiwyg-dialog-title">' + this.options.title + "</div></div>"),
                            s = e('<a href="#" class="wysiwyg-dialog-close-button">X</a>');
                        s.click(function () {
                            n.close()
                        }), i.find(".wysiwyg-dialog-close-wrapper").prepend(s);
                        var o = e('<div class="wysiwyg-dialog-content">' + r + "</div>");
                        t._$dialog.append(i).append(o);
                        var u = this.options.height == "auto" ? 300 : this.options.height,
                            a = this.options.width == "auto" ? 450 : this.options.width;
                        return t._$dialog.hide().css({
                            width: a,
                            height: u,
                            left: (e(window).width() - a) / 2,
                            top: (e(window).height() - u) / 3
                        }), e("body").append(t._$dialog), t._$dialog
                    }, this.show = function () {
                        if (this.options.modal) {
                            var n = e.wysiwyg.dialog.getDimensions(),
                                r = e('<div class="wysiwyg-dialog-modal-div"></div>').css({
                                    width: n[0],
                                    height: n[1]
                                });
                            t._$dialog.wrap(r)
                        }
                        if (this.options.draggable) {
                            var i = !1;
                            t._$dialog.find("div.wysiwyg-dialog-topbar").bind("mousedown",
                                function (t) {
                                    t.preventDefault(), e(this).css({
                                        cursor: "move"
                                    });
                                    var n = e(this),
                                        r = e(this).parents(".wysiwyg-dialog"),
                                        s = t.pageX - parseInt(r.css("left"), 10),
                                        o = t.pageY - parseInt(r.css("top"), 10);
                                    i = !0, e(this).css({
                                        cursor: "move"
                                    }), e(document).bind("mousemove",
                                        function (e) {
                                            e.preventDefault(), i && r.css({
                                                top: e.pageY - o,
                                                left: e.pageX - s
                                            })
                                        }).bind("mouseup",
                                        function (t) {
                                            t.preventDefault(), i = !1, n.css({
                                                cursor: "auto"
                                            }), e(document).unbind("mousemove").unbind("mouseup")
                                        })
                                })
                        }
                        return t._$dialog.show(), t._$dialog
                    }, this.hide = function () {
                        return t._$dialog.hide(), t._$dialog
                    }, this.destroy = function () {
                        return this.options.modal && t._$dialog.unwrap(), this.options.draggable && t._$dialog.find("div.wysiwyg-dialog-topbar").unbind("mousedown"), t._$dialog.remove(), t._$dialog
                    }
                })
        }), e.fn.wysiwyg = function (n) {
            var r = arguments,
                i;
            if ("undefined" != typeof e.wysiwyg[n]) return r = Array.prototype.concat.call([r[0]], [this], Array.prototype.slice.call(r, 1)), e.wysiwyg[n].apply(e.wysiwyg, Array.prototype.slice.call(r, 1));
            if ("object" == typeof n || !n) return Array.prototype.unshift.call(r, this), e.wysiwyg.init.apply(e.wysiwyg, r);
            if (e.wysiwyg.plugin.exists(n)) return i = e.wysiwyg.plugin.parseName(n), r = Array.prototype.concat.call([r[0]], [this], Array.prototype.slice.call(r, 1)), e.wysiwyg[i.name][i.method].apply(e.wysiwyg[i.name], Array.prototype.slice.call(r, 1));
            t.error("Method '" + n + "' does not exist on jQuery.wysiwyg.\nTry to include some extra controls or plugins")
        }, e.fn.getWysiwyg = function () {
            return this.data("wysiwyg")
        }
    }(jQuery),
    function (e) {
        "use strict";
        if (undefined === e.wysiwyg) throw "wysiwyg.colorpicker.js depends on $.wysiwyg";
        e.wysiwyg.controls || (e.wysiwyg.controls = {}), e.wysiwyg.controls.colorpicker = {
            modalOpen: !1,
            color: {
                back: {
                    prev: "#ffffff",
                    palette: []
                },
                fore: {
                    prev: "#123456",
                    palette: []
                }
            },
            addColorToPalette: function (t, n) {
                -1 === e.inArray(n, this.color[t].palette) ? this.color[t].palette.push(n) : this.color[t].palette.sort(function (e, t) {
                    return e === n ? 1 : 0
                })
            },
            init: function (t) {
                if (e.wysiwyg.controls.colorpicker.modalOpen === !0) return !1;
                e.wysiwyg.controls.colorpicker.modalOpen = !0;
                var n = this,
                    r, i, s, o, u, a;
                o = {
                    legend: "Colorpicker",
                    color: "Color",
                    submit: "Apply",
                    reset: "Cancel"
                }, s = '<form class="wysiwyg"><fieldset><legend>{legend}</legend><ul class="palette"></ul><label>{color}: <input type="text" name="color" value="#123456"/></label><div class="wheel"></div><input type="submit" class="button" value="{submit}"/> <input type="reset" value="{reset}"/></fieldset></form>';
                for (u in o) e.wysiwyg.i18n && (a = e.wysiwyg.i18n.t(o[u], "dialogs.colorpicker"), a === o[u] && (a = e.wysiwyg.i18n.t(o[u], "dialogs")), o[u] = a), s = s.replace("{" + u + "}", o[u]);
                e.modal ? (r = e(s), e.farbtastic && (this.renderPalette(r, "fore"), r.find(".wheel").farbtastic(r.find("input:text"))), e.modal(r.html(), {
                    maxWidth: t.defaults.formWidth,
                    maxHeight: t.defaults.formHeight,
                    overlayClose: !0,
                    onShow: function (r) {
                        e("input:submit", r.data).click(function (i) {
                            var s = e('input[name="color"]', r.data).val();
                            return n.color.fore.prev = s, n.addColorToPalette("fore", s), e.browser.msie && t.ui.returnRange(), t.editorDoc.execCommand("ForeColor", !1, s), e.modal.close(), !1
                        }), e("input:reset", r.data).click(function (n) {
                            return e.browser.msie && t.ui.returnRange(), e.modal.close(), !1
                        }), e("fieldset", r.data).click(function (e) {
                            e.stopPropagation()
                        })
                    },
                    onClose: function (t) {
                        e.wysiwyg.controls.colorpicker.modalOpen = !1, e.modal.close()
                    }
                })) : e.fn.dialog ? (r = e(s), e.farbtastic && (this.renderPalette(r, "fore"), r.find(".wheel").farbtastic(r.find("input:text"))), i = r.appendTo("body"), i.dialog({
                    modal: !0,
                    open: function (s, o) {
                        e("input:submit", r).click(function (r) {
                            var s = e('input[name="color"]', i).val();
                            return n.color.fore.prev = s, n.addColorToPalette("fore", s), e.browser.msie && t.ui.returnRange(), t.editorDoc.execCommand("ForeColor", !1, s), e(i).dialog("close"), !1
                        }), e("input:reset", r).click(function (n) {
                            return e.browser.msie && t.ui.returnRange(), e(i).dialog("close"), !1
                        }), e("fieldset", r).click(function (e) {
                            e.stopPropagation()
                        })
                    },
                    close: function (t, n) {
                        e.wysiwyg.controls.colorpicker.modalOpen = !1, i.dialog("destroy"), i.remove()
                    }
                })) : e.farbtastic && (r = e("<div/>").css({
                    position: "fixed",
                    "z-index": 2e3,
                    left: "50%",
                    top: "50%",
                    background: "rgb(0, 0, 0)",
                    "margin-top": -1 * Math.round(t.defaults.formHeight / 2),
                    "margin-left": -1 * Math.round(t.defaults.formWidth / 2)
                }).html(s), this.renderPalette(r, "fore"), r.find("input[name=color]").val(n.color.fore.prev), r.find(".wheel").farbtastic(r.find("input:text")), e("input:submit", r).click(function (i) {
                    var s = e('input[name="color"]', r).val();
                    return n.color.fore.prev = s, n.addColorToPalette("fore", s), e.browser.msie && t.ui.returnRange(), t.editorDoc.execCommand("ForeColor", !1, s), e(r).remove(), e.wysiwyg.controls.colorpicker.modalOpen = !1, !1
                }), e("input:reset", r).click(function (n) {
                    return e.browser.msie && t.ui.returnRange(), e(r).remove(), e.wysiwyg.controls.colorpicker.modalOpen = !1, !1
                }), e("body").append(r), r.click(function (e) {
                    e.stopPropagation()
                }))
            },
            renderPalette: function (t, n) {
                var r = t.find(".palette"),
                    i = function () {
                        var n = e(this).text();
                        t.find("input[name=color]").val(n), e.farbtastic && t.find("input[name=color]").trigger("keyup")
                    },
                    s, o, u;
                for (u = this.color[n].palette.length - 1; u > -1; u -= 1) s = e("<div/>").css({
                    "float": "left",
                    width: "16px",
                    height: "16px",
                    margin: "0px 5px 0px 0px",
                    "background-color": this.color[n].palette[u]
                }), o = e("<li>" + this.color[n].palette[u] + "</li>").css({
                    "float": "left",
                    "list-style": "none"
                }).append(s).bind("click.wysiwyg", i), r.append(o).css({
                    margin: "0px",
                    padding: "0px"
                })
            }
        }
    }(jQuery),
    function (e) {
        if (undefined === e.wysiwyg) throw "wysiwyg.cssWrap.js depends on $.wysiwyg";
        e.wysiwyg.controls || (e.wysiwyg.controls = {}), e.wysiwyg.controls.cssWrap = {
            init: function (t) {
                var n = this,
                    r, i, s, o = {
                    legend: "Wrap Element",
                    wrapperType: "Wrapper Type",
                    ID: "ID",
                    "class": "Class",
                    wrap: "Wrap",
                    unwrap: "Unwrap",
                    cancel: "Cancel"
                };
                r = '<form class="wysiwyg"><fieldset><legend>{legend}</legend><div class="wysiwyg-dialogRow"><label>{wrapperType}: &nbsp;<select name="type"><option value="span">Span</option><option value="div">Div</option></select></label></div><div class="wysiwyg-dialogRow"><label>{ID}: &nbsp;<input name="id" type="text" /></label></div><div class="wysiwyg-dialogRow"><label>{class}: &nbsp;<input name="class" type="text" /></label></div><div class="wysiwyg-dialogRow"><input type="button" class="button cssWrap-unwrap" style="display:none;" value="{unwrap}"/></label><input type="submit"  class="button cssWrap-submit" value="{wrap}"/></label><input type="reset" class="button cssWrap-cancel" value="{cancel}"/></div></fieldset></form>';
                for (i in o) e.wysiwyg.i18n && (s = e.wysiwyg.i18n.t(o[i]), s === o[i] && (s = e.wysiwyg.i18n.t(o[i], "dialogs")), o[i] = s), r = r.replace("{" + i + "}", o[i]);
                return e(".wysiwyg-dialog-wrapper").length || (e(r).appendTo("body"), e("form.wysiwyg").dialog({
                    modal: !0,
                    open: function (n, r) {
                        var i = e(this),
                            s = t.getInternalRange(),
                            o, u;
                        if (!s) return alert("You must select some elements before you can wrap them."), i.dialog("close"), 0;
                        e.browser.msie && t.ui.focus(), o = e(s.commonAncestorContainer), u = s.commonAncestorContainer.nodeName.toLowerCase(), o.parent(".wysiwygCssWrapper").length && (alert(o.parent(".wysiwygCssWrapper").get(0).nodeName.toLowerCase()), i.find("select[name=type]").val(o.parent(".wysiwygCssWrapper").get(0).nodeName.toLowerCase()), i.find("select[name=type]").attr("disabled", "disabled"), i.find("input[name=id]").val(o.parent(".wysiwygCssWrapper").attr("id")), i.find("input[name=class]").val(o.parent(".wysiwygCssWrapper").attr("class").replace("wysiwygCssWrapper ", "")), e("form.wysiwyg").find(".cssWrap-unwrap").show(), e("form.wysiwyg").find(".cssWrap-unwrap").click(function (e) {
                            return e.preventDefault(), u !== "body" && o.unwrap(), i.dialog("close"), 1
                        })), e("form.wysiwyg").find(".cssWrap-submit").click(function (t) {
                            t.preventDefault();
                            var n = e("form.wysiwyg").find("select[name=type]").val(),
                                r = e("form.wysiwyg").find("input[name=id]").val(),
                                s = e("form.wysiwyg").find("input[name=class]").val();
                            u !== "body" && (o.parent(".wysiwygCssWrapper").length ? (o.parent(".wysiwygCssWrapper").attr("id", s), o.parent(".wysiwygCssWrapper").attr("class", s)) : o.wrap("<" + n + ' id="' + r + '" class="' + "wysiwygCssWrapper " + s + '"/>')), i.dialog("close")
                        }), e("form.wysiwyg").find(".cssWrap-cancel").click(function (e) {
                            return e.preventDefault(), i.dialog("close"), 1
                        })
                    },
                    close: function () {
                        e(this).dialog("destroy"), e(this).remove()
                    }
                }), t.saveContent()), e(t.editorDoc).trigger("editorRefresh.wysiwyg"), 1
            }
        }
    }(jQuery),
    function (e) {
        "use strict";
        if (undefined === e.wysiwyg) throw "wysiwyg.image.js depends on $.wysiwyg";
        e.wysiwyg.controls || (e.wysiwyg.controls = {}), e.wysiwyg.controls.image = {
            groupIndex: 6,
            visible: !0,
            exec: function () {
                e.wysiwyg.controls.image.init(this)
            },
            tags: ["img"],
            tooltip: "Insert image",
            init: function (t) {
                var n = this,
                    r, i, s, o, u, a, f, l, c = {
                    alt: "",
                    self: t.dom ? t.dom.getElement("img") : null,
                    src: "http://",
                    title: ""
                };
                a = {
                    legend: "Insert Image",
                    preview: "Preview",
                    url: "URL",
                    title: "Title",
                    description: "Description",
                    width: "Width",
                    height: "Height",
                    original: "Original W x H",
                    "float": "Float",
                    floatNone: "None",
                    floatLeft: "Left",
                    floatRight: "Right",
                    submit: "Insert Image",
                    reset: "Cancel",
                    fileManagerIcon: "Select file from server"
                }, o = '<form class="wysiwyg" id="wysiwyg-addImage"><fieldset><div class="form-row"><span class="form-row-key">{preview}:</span><div class="form-row-value"><img src="" alt="{preview}" style="margin: 2px; padding:5px; max-width: 100%; overflow:hidden; max-height: 100px; border: 1px solid rgb(192, 192, 192);"/></div></div><div class="form-row"><label for="name">{url}:</label><div class="form-row-value"><input type="text" name="src" value=""/>', e.wysiwyg.fileManager && e.wysiwyg.fileManager.ready && (o += '<div class="wysiwyg-fileManager" title="{fileManagerIcon}"/>'), o += '</div></div><div class="form-row"><label for="name">{title}:</label><div class="form-row-value"><input type="text" name="imgtitle" value=""/></div></div><div class="form-row"><label for="name">{description}:</label><div class="form-row-value"><input type="text" name="description" value=""/></div></div><div class="form-row"><label for="name">{width} x {height}:</label><div class="form-row-value"><input type="text" name="width" value="" class="width-small"/> x <input type="text" name="height" value="" class="width-small"/></div></div><div class="form-row"><label for="name">{original}:</label><div class="form-row-value"><input type="text" name="naturalWidth" value="" class="width-small" disabled="disabled"/> x <input type="text" name="naturalHeight" value="" class="width-small" disabled="disabled"/></div></div><div class="form-row"><label for="name">{float}:</label><div class="form-row-value"><select name="float"><option value="">{floatNone}</option><option value="left">{floatLeft}</option><option value="right">{floatRight}</option></select></div></div><div class="form-row form-row-last"><label for="name"></label><div class="form-row-value"><input type="submit" class="button" value="{submit}"/> <input type="reset" value="{reset}"/></div></div></fieldset></form>';
                for (f in a) e.wysiwyg.i18n && (l = e.wysiwyg.i18n.t(a[f], "dialogs.image"), l === a[f] && (l = e.wysiwyg.i18n.t(a[f], "dialogs")), a[f] = l), u = new RegExp("{" + f + "}", "g"), o = o.replace(u, a[f]);
                c.self && (c.src = c.self.src ? c.self.src : "", c.alt = c.self.alt ? c.self.alt : "", c.title = c.self.title ? c.self.title : "", c.width = c.self.width ? c.self.width : "", c.height = c.self.height ? c.self.height : "", c.styleFloat = e(c.self).css("float")), i = new e.wysiwyg.dialog(t, {
                    title: a.legend,
                    content: o
                }), e(i).bind("afterOpen",
                    function (r, s) {
                        s.find("form#wysiwyg-addImage").submit(function (e) {
                            return e.preventDefault(), n.processInsert(s.container, t, c), i.close(), !1
                        }), e.wysiwyg.fileManager && e("div.wysiwyg-fileManager").bind("click",
                            function () {
                                e.wysiwyg.fileManager.init(function (e) {
                                    s.find("input[name=src]").val(e), s.find("input[name=src]").trigger("change")
                                })
                            }), e("input:reset", s).click(function (e) {
                            return i.close(), !1
                        }), e("fieldset", s).click(function (e) {
                            e.stopPropagation()
                        }), n.makeForm(s, c)
                    }), i.open(), e(t.editorDoc).trigger("editorRefresh.wysiwyg")
            },
            processInsert: function (t, n, r) {
                var i, s = e('input[name="src"]', t).val(),
                    o = e('input[name="imgtitle"]', t).val(),
                    u = e('input[name="description"]', t).val(),
                    a = e('input[name="width"]', t).val(),
                    f = e('input[name="height"]', t).val(),
                    l = e('select[name="float"]', t).val(),
                    c = [],
                    h = "",
                    p, d;
                n.options.controlImage && n.options.controlImage.forceRelativeUrls && (d = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""), 0 === s.indexOf(d) && (s = s.substr(d.length))), r.self ? (e(r.self).attr("src", s).attr("title", o).attr("alt", u).css("float", l), a.toString().match(/^[0-9]+(px|%)?$/) ? e(r.self).css("width", a) : e(r.self).css("width", ""), f.toString().match(/^[0-9]+(px|%)?$/) ? e(r.self).css("height", f) : e(r.self).css("height", ""), n.saveContent()) : (p = a.toString().match(/^[0-9]+(px|%)?$/), p && (p[1] ? c.push("width: " + a + ";") : c.push("width: " + a + "px;")), p = f.toString().match(/^[0-9]+(px|%)?$/), p && (p[1] ? c.push("height: " + f + ";") : c.push("height: " + f + "px;")), l.length > 0 && c.push("float: " + l + ";"), c.length > 0 && (h = ' style="' + c.join(" ") + '"'), i = "<img src='" + s + "' title='" + o + "' alt='" + u + "'" + h + "/>", n.insertHtml(i))
            },
            makeForm: function (e, t) {
                return e.find("input[name=src]").val(t.src), e.find("input[name=imgtitle]").val(t.title), e.find("input[name=description]").val(t.alt), e.find('input[name="width"]').val(t.width), e.find('input[name="height"]').val(t.height), e.find('select[name="float"]').val(t.styleFloat), e.find("img").attr("src", t.src), e.find("img").bind("load",
                    function () {
                        e.find("img").get(0).naturalWidth ? (e.find('input[name="naturalWidth"]').val(e.find("img").get(0).naturalWidth), e.find('input[name="naturalHeight"]').val(e.find("img").get(0).naturalHeight)) : e.find("img").attr("naturalWidth") && (e.find('input[name="naturalWidth"]').val(e.find("img").attr("naturalWidth")), e.find('input[name="naturalHeight"]').val(e.find("img").attr("naturalHeight")))
                    }), e.find("input[name=src]").bind("change",
                    function () {
                        e.find("img").attr("src", this.value)
                    }), e
            }
        }, e.wysiwyg.insertImage = function (t, n, r) {
            return t.each(function () {
                var t = e(this).data("wysiwyg"),
                    i, s;
                if (!t) return this;
                if (!n || n.length === 0) return this;
                e.browser.msie && t.ui.focus();
                if (r) {
                    t.editorDoc.execCommand("insertImage", !1, "#jwysiwyg#"), i = t.getElementByAttributeValue("img", "src", "#jwysiwyg#");
                    if (i) {
                        i.src = n;
                        for (s in r) r.hasOwnProperty(s) && i.setAttribute(s, r[s])
                    }
                } else t.editorDoc.execCommand("insertImage", !1, n);
                return t.saveContent(), e(t.editorDoc).trigger("editorRefresh.wysiwyg"), this
            })
        }
    }(jQuery),
    function (e) {
        "use strict";
        if (undefined === e.wysiwyg) throw "wysiwyg.link.js depends on $.wysiwyg";
        e.wysiwyg.controls || (e.wysiwyg.controls = {}), e.wysiwyg.controls.link = {
            init: function (t) {
                var n = this,
                    r, i, s, o, u, a, f, l, c, h, p, d;
                f = {
                    legend: "Insert Link",
                    url: "Link URL",
                    title: "Link Title",
                    target: "Link Target",
                    submit: "Insert Link",
                    reset: "Cancel"
                }, a = '<form class="wysiwyg"><fieldset><legend>{legend}</legend><label>{url}: <input type="text" name="linkhref" value=""/></label><label>{title}: <input type="text" name="linktitle" value=""/></label><label>{target}: <input type="text" name="linktarget" value=""/></label><input type="submit" class="button" value="{submit}"/> <input type="reset" value="{reset}"/></fieldset></form>';
                for (l in f) e.wysiwyg.i18n && (c = e.wysiwyg.i18n.t(f[l], "dialogs.link"), c === f[l] && (c = e.wysiwyg.i18n.t(f[l], "dialogs")), f[l] = c), h = new RegExp("{" + l + "}", "g"), a = a.replace(h, f[l]);
                o = {
                    self: t.dom.getElement("a"),
                    href: "http://",
                    title: "",
                    target: ""
                }, o.self && (o.href = o.self.href ? o.self.href : o.href, o.title = o.self.title ? o.self.title : "", o.target = o.self.target ? o.self.target : "");
                if (e.fn.dialog) {
                    r = e(a), r.find("input[name=linkhref]").val(o.href), r.find("input[name=linktitle]").val(o.title), r.find("input[name=linktarget]").val(o.target);
                    if (e.browser.msie) try {
                        i = r.appendTo(t.editorDoc.body)
                    } catch (v) {
                        i = r.appendTo("body")
                    } else i = r.appendTo("body");
                    i.dialog({
                        modal: !0,
                        open: function (n, r) {
                            e("input:submit", i).click(function (n) {
                                n.preventDefault();
                                var r = e('input[name="linkhref"]', i).val(),
                                    s = e('input[name="linktitle"]', i).val(),
                                    a = e('input[name="linktarget"]', i).val(),
                                    f, l;
                                t.options.controlLink.forceRelativeUrls && (f = window.location.protocol + "//" + window.location.hostname, 0 === r.indexOf(f) && (r = r.substr(f.length))), o.self ? "string" == typeof r && (r.length > 0 ? e(o.self).attr("href", r).attr("title", s).attr("target", a) : e(o.self).replaceWith(o.self.innerHTML)) : (e.browser.msie && t.ui.returnRange(), u = t.getRangeText(), l = t.dom.getElement("img"), u && u.length > 0 || l ? (e.browser.msie && t.ui.focus(), "string" == typeof r && (r.length > 0 ? t.editorDoc.execCommand("createLink", !1, r) : t.editorDoc.execCommand("unlink", !1, null)), o.self = t.dom.getElement("a"), e(o.self).attr("href", r).attr("title", s), e(o.self).attr("target", a)) : t.options.messages.nonSelection && window.alert(t.options.messages.nonSelection)), t.saveContent(), e(i).dialog("close")
                            }), e("input:reset", i).click(function (t) {
                                t.preventDefault(), e(i).dialog("close")
                            })
                        },
                        close: function (e, t) {
                            i.dialog("destroy"), i.remove()
                        }
                    })
                } else o.self ? (s = window.prompt("URL", o.href), t.options.controlLink.forceRelativeUrls && (p = window.location.protocol + "//" + window.location.hostname, 0 === s.indexOf(p) && (s = s.substr(p.length))), "string" == typeof s && (s.length > 0 ? e(o.self).attr("href", s) : e(o.self).replaceWith(o.self.innerHTML))) : (u = t.getRangeText(), d = t.dom.getElement("img"), u && u.length > 0 || d ? e.browser.msie ? (t.ui.focus(), t.editorDoc.execCommand("createLink", !0, null)) : (s = window.prompt(f.url, o.href), t.options.controlLink.forceRelativeUrls && (p = window.location.protocol + "//" + window.location.hostname, 0 === s.indexOf(p) && (s = s.substr(p.length))), "string" == typeof s && (s.length > 0 ? t.editorDoc.execCommand("createLink", !1, s) : t.editorDoc.execCommand("unlink", !1, null))) : t.options.messages.nonSelection && window.alert(t.options.messages.nonSelection)), t.saveContent();
                e(t.editorDoc).trigger("editorRefresh.wysiwyg")
            }
        }, e.wysiwyg.createLink = function (t, n) {
            return t.each(function () {
                var t = e(this).data("wysiwyg"),
                    r;
                return t ? !n || n.length === 0 ? this : (r = t.getRangeText(), r && r.length > 0 ? (e.browser.msie && t.ui.focus(), t.editorDoc.execCommand("unlink", !1, null), t.editorDoc.execCommand("createLink", !1, n)) : t.options.messages.nonSelection && window.alert(t.options.messages.nonSelection), this) : this
            })
        }
    }(jQuery),
    function (e) {
        if (undefined === e.wysiwyg) throw "wysiwyg.rmFormat.js depends on $.wysiwyg";
        var t = {
            name: "rmFormat",
            version: "",
            defaults: {
                rules: {
                    heading: !1,
                    table: !1,
                    inlineCSS: !1,
                    msWordMarkup: {
                        enabled: !1,
                        tags: {
                            a: {
                                rmWhenEmpty: !0
                            },
                            b: {
                                rmWhenEmpty: !0
                            },
                            div: {
                                rmWhenEmpty: !0,
                                rmWhenNoAttr: !0
                            },
                            em: {
                                rmWhenEmpty: !0
                            },
                            font: {
                                rmAttr: {
                                    face: "",
                                    size: ""
                                },
                                rmWhenEmpty: !0,
                                rmWhenNoAttr: !0
                            },
                            h1: {
                                rmAttr: "all",
                                rmWhenEmpty: !0
                            },
                            h2: {
                                rmAttr: "all",
                                rmWhenEmpty: !0
                            },
                            h3: {
                                rmAttr: "all",
                                rmWhenEmpty: !0
                            },
                            h4: {
                                rmAttr: "all",
                                rmWhenEmpty: !0
                            },
                            h5: {
                                rmAttr: "all",
                                rmWhenEmpty: !0
                            },
                            h6: {
                                rmAttr: "all",
                                rmWhenEmpty: !0
                            },
                            i: {
                                rmWhenEmpty: !0
                            },
                            p: {
                                rmAttr: "all",
                                rmWhenEmpty: !0
                            },
                            span: {
                                rmAttr: {
                                    lang: ""
                                },
                                rmWhenEmpty: !0,
                                rmWhenNoAttr: !0
                            },
                            strong: {
                                rmWhenEmpty: !0
                            },
                            u: {
                                rmWhenEmpty: !0
                            }
                        }
                    }
                }
            },
            options: {},
            enabled: !1,
            debug: !1,
            domRemove: function (t) {
                return this.options.rules.heading && t.nodeName.toLowerCase().match(/^h[1-6]$/) ? (e(t).replaceWith(e("<p/>").html(e(t).contents())), !0) : this.options.rules.table && t.nodeName.toLowerCase().match(/^(table|t[dhr]|t(body|foot|head))$/) ? (e(t).replaceWith(e(t).contents()), !0) : !1
            },
            removeStyle: function (t) {
                this.options.rules.inlineCSS && e(t).removeAttr("style")
            },
            domTraversing: function (e, t, n, r, i) {
                null === r && (r = !1);
                var s, o;
                while (e) {
                    this.debug && console.log(i, "canRemove=", r), this.removeStyle(e);
                    if (e.firstElementChild) return this.debug && console.log(i, "domTraversing", e.firstElementChild), this.domTraversing(e.firstElementChild, t, n, r, i + 1);
                    this.debug && console.log(i, "routine", e), s = !1, t === e && (r = !0);
                    if (r) {
                        e.previousElementSibling ? o = e.previousElementSibling : o = e.parentNode, this.debug && console.log(i, e.nodeName, e.previousElementSibling, e.parentNode, o), s = this.domRemove(e), this.domRemove(e) && (this.debug && console.log("p", o), e = o);
                        if (t !== n && n === e) return !0
                    }!1 === s && (e = e.nextElementSibling)
                }
                return !1
            },
            msWordMarkup: function (e) {
                var t, n, r, i, s, o, u;
                e = e.replace(/&lt;/g, "<").replace(/&gt;/g, ">"), e = e.replace(/<meta\s[^>]+>/g, ""), e = e.replace(/<link\s[^>]+>/g, ""), e = e.replace(/<title>[\s\S]*?<\/title>/g, ""), e = e.replace(/<style(?:\s[^>]*)?>[\s\S]*?<\/style>/gm, ""), e = e.replace(/<w:([^\s>]+)(?:\s[^\/]+)?\/>/g, ""), e = e.replace(/<w:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/w:\1>/gm, ""), e = e.replace(/<m:([^\s>]+)(?:\s[^\/]+)?\/>/g, ""), e = e.replace(/<m:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/m:\1>/gm, ""), e = e.replace(/<xml>[\s\S]*?<\/xml>/g, ""), e = e.replace(/<object(?:\s[^>]*)?>[\s\S]*?<\/object>/g, ""), e = e.replace(/<o:([^\s>]+)(?:\s[^\/]+)?\/>/g, ""), e = e.replace(/<o:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/o:\1>/gm, ""), e = e.replace(/<st1:([^\s>]+)(?:\s[^\/]+)?\/>/g, ""), e = e.replace(/<st1:([^\s>]+)(?:\s[^>]+)?>[\s\S]*?<\/st1:\1>/gm, ""), e = e.replace(/<!--[^>]+>\s*<[^>]+>/gm, ""), e = e.replace(/^[\s\n]+/gm, "");
                if (this.options.rules.msWordMarkup.tags) {
                    for (t in this.options.rules.msWordMarkup.tags) {
                        r = this.options.rules.msWordMarkup.tags[t];
                        if ("string" == typeof r) "" === r && (i = new RegExp("<" + t + "(?:\\s[^>]+)?/?>", "gmi"), e = e.replace(i, "<" + t + ">"));
                        else if ("object" == typeof r) {
                            i = new RegExp("<" + t + "(\\s[^>]+)?/?>", "gmi"), o = i.exec(e), u = "", o && o[1] && (u = o[1]);
                            if (r.rmAttr) if ("all" === r.rmAttr) u = "";
                            else if ("object" == typeof r.rmAttr && u) for (n in r.rmAttr) s = new RegExp(n + '="[^"]*"', "mi"), u = u.replace(s, "");
                            u && (u = u.replace(/[\s\n]+/gm, " "), " " === u && (u = "")), e = e.replace(i, "<" + t + u + ">")
                        }
                    }
                    for (t in this.options.rules.msWordMarkup.tags) {
                        r = this.options.rules.msWordMarkup.tags[t];
                        if ("string" != typeof r && "object" == typeof r) {
                            r.rmWhenEmpty && (i = new RegExp("<" + t + "(\\s[^>]+)?>(?:[\\s\\n]|<br/?>)*?</" + t + ">", "gmi"), e = e.replace(i, ""));
                            if (r.rmWhenNoAttr) {
                                i = new RegExp("<" + t + ">(?!<" + t + ">)([\\s\\S]*?)</" + t + ">", "mi"), o = i.exec(e);
                                while (o) e = e.replace(i, o[1]), o = i.exec(e)
                            }
                        }
                    }
                }
                return e
            },
            run: function (t, n) {
                n = n || {}, this.options = e.extend(!0, this.defaults, n);
                if (this.options.rules.heading || this.options.rules.table) {
                    var r = t.getInternalRange(),
                        i, s, o, u;
                    i = r.startContainer, i.nodeType === 3 && (i = i.parentNode), s = r.endContainer, s.nodeType === 3 && (s = s.parentNode), this.debug && (console.log("start", i, i.nodeType, i.nodeName, i.parentNode), console.log("end", s, s.nodeType, s.nodeName, s.parentNode)), o = r.commonAncestorContainer, o.nodeType === 3 && (o = o.parentNode), this.debug && (console.log("node", o, o.nodeType, o.nodeName.toLowerCase(), o.parentNode, o.firstElementChild), console.log(i === s)), u = null, i === s ? u = this.domTraversing(o, i, s, !0, 1) : u = this.domTraversing(o.firstElementChild, i, s, null, 1), this.debug && console.log("DomTraversing=", u)
                }
                this.options.rules.msWordMarkup.enabled && t.setContent(this.msWordMarkup(t.getContent()))
            }
        };
        e.wysiwyg.plugin.register(t)
    }(jQuery),
    function (e) {
        "use strict";
        if (undefined === e.wysiwyg) throw "wysiwyg.table.js depends on $.wysiwyg";
        e.wysiwyg.controls || (e.wysiwyg.controls = {});
        var t = function (e, t, n) {
            if (isNaN(t) || isNaN(e) || t === null || e === null) return;
            var r, i, s = ['<table border="1" style="width: 100%;"><tbody>'];
            e = parseInt(e, 10), t = parseInt(t, 10), n === null && (n = "&nbsp;"), n = "<td>" + n + "</td>";
            for (r = t; r > 0; r -= 1) {
                s.push("<tr>");
                for (i = e; i > 0; i -= 1) s.push(n);
                s.push("</tr>")
            }
            return s.push("</tbody></table>"), this.insertHtml(s.join(""))
        };
        e.wysiwyg.controls.table = function (n) {
            var r, i, s, o, u, a, f, l, c;
            a = {
                legend: "Insert table",
                cols: "Count of columns",
                rows: "Count of rows",
                submit: "Insert table",
                reset: "Cancel"
            }, u = '<form class="wysiwyg" id="wysiwyg-tableInsert"><fieldset><legend>{legend}</legend><label>{cols}: <input type="text" name="colCount" value="3" /></label><br/><label>{rows}: <input type="text" name="rowCount" value="3" /></label><br/><input type="submit" class="button" value="{submit}"/> <input type="reset" value="{reset}"/></fieldset></form>';
            for (f in a) e.wysiwyg.i18n && (l = e.wysiwyg.i18n.t(a[f], "dialogs.table"), l === a[f] && (l = e.wysiwyg.i18n.t(a[f], "dialogs")), a[f] = l), c = new RegExp("{" + f + "}", "g"), u = u.replace(c, a[f]);
            n.insertTable || (n.insertTable = t), r = new e.wysiwyg.dialog(n, {
                title: a.legend,
                content: u,
                open: function (e, t) {
                    t.find("form#wysiwyg-tableInsert").submit(function (e) {
                        return e.preventDefault(), o = t.find("input[name=rowCount]").val(), s = t.find("input[name=colCount]").val(), n.insertTable(s, o, n.defaults.tableFiller), r.close(), !1
                    }), t.find("input:reset").click(function (e) {
                        return e.preventDefault(), r.close(), !1
                    })
                }
            }), r.open(), e(n.editorDoc).trigger("editorRefresh.wysiwyg")
        }, e.wysiwyg.insertTable = function (n, r, i, s) {
            return n.each(function () {
                var n = e(this).data("wysiwyg");
                return n.insertTable || (n.insertTable = t), n ? (n.insertTable(r, i, s), e(n.editorDoc).trigger("editorRefresh.wysiwyg"), this) : this
            })
        }
    }(jQuery);
var Petition = {
    userPage: 1
};
$(document).ready(function () {
    $("#message").focus(function () {
        $(this).css("background", "#FFFFCC")
    }), $("#message").blur(function () {
        $(this).css("background", "transparent")
    }), $('input[type="text"]').bind("invalid",
        function () {
            $(".innerLightGrayGreenBorder").html("Sign & Submit")
        }), $('input[type="email"]').bind("invalid",
        function () {
            $(".innerLightGrayGreenBorder").html("Sign & Submit")
        }), $("#pledge_dollars").numeric({
        allow: ".,"
    }), bindHoverIntent(),
        $("a#interviewVideo").fancybox({
        type: "iframe",
        titleShow: !1,
        transitionIn: "elastic",
        transitionOut: "elastic",
        easingIn: "easeOutBack",
        easingOut: "easeInBack"
    }), $("a#rallyVideo").fancybox({
        type: "iframe",
        titleShow: !1,
        transitionIn: "elastic",
        transitionOut: "elastic",
        easingIn: "easeOutBack",
        easingOut: "easeInBack"
    }), $(".supporterLoggedIn a.supporterPhoto").hover(function () {
            $(this).find(".prompt").show()
        },
        function () {
            $(this).find(".prompt").hide()
        }), $(".supporterLoggedIn .supporterPhoto").click(function () {
        showProfileEditor()
    }), $(".playVideo").hover(function () {
            $(".video", this).css("opacity", 1)
        },
        function () {
            $(".video", this).css("opacity", .5)
        })
}), clientSideValidations.validators.remote.current_password = function (e, t) {
    if ($.ajax({
        url: "/validators/current_password.json",
        data: {
            id: e.val()
        },
        async: false
    }).status == 404) return t.message
}, Sanitize.REGEX_PROTOCOL = /^([A-Za-z0-9\+\-\.\&\;\*\s]*?)(?:\:|&*0*58|&*x0*3a)/i, Sanitize.RELATIVE = "__relative__", Sanitize.prototype.clean_node = function (e) {
    function n(e, t) {
        var n;
        for (n = 0; n < t.length; n++) if (t[n] == e) return n;
        return -1
    }
    function r() {
        var e = [],
            t = {},
            n, r;
        for (n = 0; n < arguments.length; n++) {
            if (!arguments[n] || !arguments[n].length) continue;
            for (r = 0; r < arguments[n].length; r++) {
                if (t[arguments[n][r]]) continue;
                t[arguments[n][r]] = !0, e.push(arguments[n][r])
            }
        }
        return e
    }
    function s(e) {
        var t;
        switch (e.nodeType) {
            case 1:
                o.call(this, e);
                break;
            case 3:
                var t = e.cloneNode(!1);
                this.current_element.appendChild(t);
                break;
            case 5:
                var t = e.cloneNode(!1);
                this.current_element.appendChild(t);
                break;
            case 8:
                if (this.config.allow_comments) {
                    var t = e.cloneNode(!1);
                    this.current_element.appendChild(t)
                };
            default:
        }
    }
    function o(e) {
        var t, i, o, a, f, l, c, h, p, d, v, m, g = u.call(this, e);
        e = g.node, f = e.nodeName.toLowerCase(), a = this.current_element;
        if (this.allowed_elements[f] || g.whitelist) {
            this.current_element = this.dom.createElement(e.nodeName), a.appendChild(this.current_element), l = r(this.config.attributes[f], this.config.attributes.__ALL__, g.attr_whitelist);
            for (t = 0; t < l.length; t++) h = l[t], c = e.attributes[h], c && (m = !0, this.config.protocols[f] && this.config.protocols[f][h] && (d = this.config.protocols[f][h], v = c.nodeValue.toLowerCase().match(Sanitize.REGEX_PROTOCOL), v ? m = n(v[1], d) != -1 : m = n(Sanitize.RELATIVE, d) != -1), m && (p = document.createAttribute(h), p.value = c.nodeValue, this.current_element.setAttributeNode(p)));
            if (this.config.add_attributes[f]) for (h in this.config.add_attributes[f]) p = document.createAttribute(h), p.value = this.config.add_attributes[f][h], this.current_element.setAttributeNode(p)
        } else if (n(e, this.whitelist_nodes) != -1) {
            this.current_element = e.cloneNode(!0);
            while (this.current_element.childNodes.length > 0) this.current_element.removeChild(this.current_element.firstChild);
            a.appendChild(this.current_element)
        }
        if (!this.config.remove_all_contents && !this.config.remove_element_contents[f]) for (t = 0; t < e.childNodes.length; t++) s.call(this, e.childNodes[t]);
        this.current_element.normalize && this.current_element.normalize(), this.current_element = a
    }
    function u(e) {
        var t = {
            attr_whitelist: [],
            node: e,
            whitelist: !1
        },
            i, s, o;
        for (i = 0; i < this.transformers.length; i++) {
            o = this.transformers[i]({
                allowed_elements: this.allowed_elements,
                config: this.config,
                node: e,
                node_name: e.nodeName.toLowerCase(),
                whitelist_nodes: this.whitelist_nodes,
                dom: this.dom
            });
            if (o == null) continue;
            if (typeof o != "object") throw new Error("transformer output must be an object or null");
            if (o.whitelist_nodes && o.whitelist_nodes instanceof Array) for (s = 0; s < o.whitelist_nodes.length; s++) n(o.whitelist_nodes[s], this.whitelist_nodes) == -1 && this.whitelist_nodes.push(o.whitelist_nodes[s]);
            t.whitelist = o.whitelist ? !0 : !1, o.attr_whitelist && (t.attr_whitelist = r(t.attr_whitelist, o.attr_whitelist)), t.node = o.node ? o.node : t.node
        }
        return t
    }
    var t = this.dom.createDocumentFragment();
    this.current_element = t, this.whitelist_nodes = [];
    for (i = 0; i < e.childNodes.length; i++) s.call(this, e.childNodes[i]);
    return t.normalize && t.normalize(), t
},
    function () {
        this.JST || (this.JST = {}), this.JST["templates/companies/photo"] = function (obj) {
            var __p = [],
                print = function () {
                    __p.push.apply(__p, arguments)
                };
            with(obj || {}) __p.push('<li class="companyPhoto" data-id="', id, '">\n  <img class="imageSpinner" src="/assets/photoAnimator.gif">\n  <img class="photo move transparent avatarBorder" style="display: none;"/>\n  <input name="photo[image]" type="file" class="fileUploader"/>\n  <input class="photo_id" type="hidden" value="', id, '">\n  <div class="captionBox">\n    <strong>Caption</strong>:<br/>\n    <input name="photo[caption]" data-photo-id="', id, '" class="photoCaptionInput" style="width:380px" maxlength="80"/>\n  </div>\n\n  <img src="/assets/iconMove.png" class="position move"/>\n  <img src="/assets/iconDelete2.png" class="deleteIcon"/>\n  <div class="clear"></div>\n</li>\n');
            return __p.join("")
        }
    }.call(this),
    function () {
        this.JST || (this.JST = {}), this.JST["templates/companies/question"] = function (obj) {
            var __p = [],
                print = function () {
                    __p.push.apply(__p, arguments)
                };
            with(obj || {}) __p.push('<li class="qanda" data-id="', id, '">\n  <div class="question">\n    <h3>', name, '  <span class="penIcon"></span></h3>\n    <img src="/assets/iconMove.png" class="move position sortQ" style="right:20px;"/>\n    <img alt="Icondelete2" class="deleteIcon" src="/assets/iconDelete2.png" style="right:0px; top:5px; position:absolute" />\n  </div>\n\n  <div class="clear"></div>\n\n  <div class="bodytext editHighlight">\n    <p>&nbsp;</p>\n  </div>\n\n  <div class="editable" style="display:none">\n    <div  class="wysiwyg_counter">500</div>\n    <input type="hidden" class="question_name" value="', name, ' ">\n    <textarea name="test" class="bizplan wysiwyg" maxlength="500">\n        <p>&nbsp;</p>\n    </textarea>\n\n    <div style="margin-top:-5px">\n      <button class="small green onWhite saveEdit">Save</button>\n      <button class="small white cancelEdit">Cancel</button>\n    </div>\n  </div>\n\n    <img class="previewQuestionImage" src="">\n    <div class="deleteQuestionPhoto">Delete Photo</div>\n\n    <input type="file" name="question[image]" class="attachPhotoToSummary_Input" style="position:absolute; margin-top:-30px; opacity:0; visibility:hidden">\n\n    <div class="attachPhotoToSummary"><img class="questionSpinner" src="/assets/photoAnimator.gif"><div class="photoInstruction">Attach an Image<div style="font-size:12px; font-weight:normal">At least 600 x 200 pixels.  PNG, JPEG, or GIF.</div></div></div>\n  <hr style="width:100%; margin-top:40px; margin-bottom:20px;">\n\n</li>\n\n\n');
            return __p.join("")
        }
    }.call(this), $(document).ready(function () {
    $("#user_username").keyup(function () {
        $("#change_username").html($(this).val())
    }), helperTimeout = null, $(".disallowReturn").keypress(function () {
        return disableEnterKey(event)
    }), $(".myProfile, .photoLabel").mouseover(function () {
        $(".photoLabel").css("color", "#fff"), $(".photoLabel2").show()
    }).mouseout(function () {
            $(".photoLabel").css("color", "#E0E0E0"), $(".photoLabel2").hide()
        }).click(function () {
            $(this).attr("src") == User.root_url + "assets/missing_avatar.png" ? $("#user_avatar").click() : showProfileEditor()
        }), $("#user_tagline").keyup(function () {
        charCounter(this, $("#tagCounter"), 140), $(".top_bio").html($(this).val())
    }).keydown(function () {
            charCounter(this, $("#tagCounter"), 140)
        }).blur(function () {
            $(this).val() == ""
        }), $(".forgotPassword").click(function () {
        forgotPasswordForm = '<div class="reset_password_div" style="padding:20px"><h1 style="font-size:24px">Forgot your password?</h1><p style="margin-top:0px">Tell us the email you used to sign up, and we\'ll get you on your way.</p><div class="password_reset_error" style="color:red; display:none; margin-top:10px; margin-bottom:3px; font-weight:bold">No account with that email address exists.</div><input class="reset_email" type="text" placeholder="email address"><button style="margin-left:7px; margin-top:2px;" class="green onWhite med resetPasswordButton">Reset</button></div><div style="clear:both; height:15px"></div>', $.fancybox(forgotPasswordForm, {
            autoDimensions: !1,
            width: 500,
            height: "auto",
            transitionIn: "fade",
            transitionOut: "fade",
            padding: 0,
            onClosed: function () {}
        }), setTimeout("$('.reset_email').focus()", 500), $(".resetPasswordButton").click(function () {
            $(".password_reset_error").hide(), email = $(".reset_email").val();
            if (email == "") return $(".reset_email").focus(), !1;
            $(this).html('<img src="/assets/ajax-loader_f.gif">'), button = $(this), $.ajax({
                type: "POST",
                url: "/reset_password?email=" + email,
                success: function (e) {
                    error = parseInt(e), error == 1 ? ($(".password_reset_error").show(), $(button).html("Reset")) : $(".reset_password_div").html('<h1 style="font-size:24px">Your Password Has Been Reset</h1><p>Please check your email for further instructions.</p>')
                }
            })
        })
    }), $("#user_avatar").change(function () {
        var e = $(".avatarPreview").removeClass("nologo");
        handleAvatarUpload(this, e, 150, 150)
    }), $("#user_home_url").change(function () {
        $(".homeUrlHolder").html("<a target='_blank' href='" + $("#user_home_url").val() + "' >" + $("#user_home_url").val() + "</a> &middot;")
    }), $("#user_city, #user_state").change(function () {
        var e = $("#user_city").val().charAt(0).toUpperCase() + $("#user_city").val().slice(1);
        $(".cityHolder").html(e + " " + $("#user_state").val())
    }), $(".contentEditable").focus(function () {
        savedThis = $(this), $(this).html() == $(this).attr("data-default") && window.setTimeout(function () {
            var e, t;
            window.getSelection && document.createRange ? (t = document.createRange(), t.selectNodeContents(document.getElementById($(savedThis).attr("id"))), e = window.getSelection(), e.removeAllRanges(), e.addRange(t)) : document.body.createTextRange && (t = document.body.createTextRange(), t.moveToElementText(document.getElementById($(savedThis).attr("id"))), t.select())
        }, 1)
    }), $(".contentEditable").blur(function (e) {
        if ($(this).attr("data-html") == "false") var t = new Sanitize;
        else var t = new Sanitize({
            elements: ["br", "ul", "li", "b", "div", "a", "iframe", "img"],
            attributes: {
                img: ["class", "style", "src"],
                a: ["href", "target"],
                div: ["class", "style"],
                iframe: ["class", "style", "width", "height", "type", "src", "frameborder"]
            },
            protocols: {
                a: {
                    href: ["http", "https", "mailto"]
                }
            }
        });
        cleanedValue = t.clean_node(this), $(this).html(cleanedValue), extraCleanedValue = $.trim($(this).html()), extraCleanedValue = extraCleanedValue.replace(/&nbsp;/g, ""), extraCleanedValue = extraCleanedValue.replace(/&amp;/g, "&");
        var n = escape(extraCleanedValue);
        extraCleanedValue == $(this).attr("data-default") && (extraCleanedValue = ""), extraCleanedValue == "" && $(this).html($(this).attr("data-default")), $(this).attr("name") == "user[tagline]" && extraCleanedValue != $(this).attr("data-default") && $("#user_tagline").val(extraCleanedValue), displaySavingInProgress(), $.ajax({
            type: "POST",
            url: $(this).attr("data-url"),
            data: "_method=PUT&" + $(this).attr("name") + "=" + extraCleanedValue,
            success: function (e) {
                displaySaved()
            }
        })
    }), $(".contentEditable").keydown(function (e) {
        length = $(this).html().length;
        if ($(this).attr("data-limit") < length) return event.keyCode == 8 || event.keyCode == 46 ? !0 : !1
    }), $(".autoUserSave").focus(function (e) {
        $(this).attr("data-changed", "false")
    }), $(".autoUserSave").change(function (e) {
        $(this).attr("data-changed", "true")
    }), $(".autoUserSave").change(function (e) {
        return $(this).attr("data-changed") == "true" && (displaySavingInProgress(), $.ajax({
            type: "POST",
            url: $(this).parent("form").attr("action"),
            data: "_method=PUT&" + $(this).attr("name") + "=" + escape($(this).val()),
            success: function (e) {
                displaySaved()
            }
        })), !1
    })
}), $(document).ready(function () {
    $(window).scroll(function () {
        if ($("#StatusBar").is(":visible")) {
            var e = $(window).scrollTop();
            e < 40 ? e = 40 - e : e = 0, $("#StatusBar").css("top", e + "px")
        }
    })
}), $(document).ready(function () {
    $(".closeX").click(function (e) {
        $(".topNoticeBar").animate({
            height: 0
        }, 300), $.cookie("topNoticeBarHide", 1, {
            path: "/",
            expires: 1
        })
    }), $(".EmailSignup").click(function (e) {
        if ($(this).html() == '<img src="/assets/ajax-loader_f.gif">') return !1;
        var t = $(".digest_email", $(this).parent()).val();
        if (t == "") return $(".digest_email", $(this).parent()).focus(), !1;
        if (!validateEmail(t)) return $(".digest_email", $(this).parent()).focus(), !1;
        $(this).html('<img src="/assets/ajax-loader_f.gif">'), container = $(this).parent(), $.ajax({
            type: "POST",
            url: "/email_signup",
            data: "email=" + t,
            success: function (e) {
                $(container).html("Thanks!  You've been signed up.")
            }
        })
    }), $("a.popup").click(function (e) {
        return popupCenter($(this).attr("href"), $(this).attr("data-width"), $(this).attr("data-height"), "authPopup"), e.stopPropagation(), !1
    })
}), $(document).ajaxSend(function (e, t, n) {
    var r = $("meta[name=csrf-token]").attr("content");
    t.setRequestHeader("X-CSRF-Token", r)
});