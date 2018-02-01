$(document).ready(function () {

    // ==============================================================
    // Send form via ajax
    // ==============================================================

        // Instance all ajax form
        var ajaxAllForms = [];

        // Ajax form options
        $("form.ajax-form").each(function() {

            var ajaxResponseBlock = $(this).find(".ajax-form-response");
            var ajaxResponseBody  = $(this).find(".ajax-form-response").find(".ajax-form-response-body");
            var ajaxSendButton    = $(this).find(".ajax-send-button");
            var ajaxSendProgress  = $(this).find(".ajax-progress-send-form");

            var formAjax = {
                formId : $(this).attr('id'),
                ajaxSendOptions : {
                    beforeSubmit:  function () {
                        // Change state progress send animation
                        ajaxSendProgress.find("img").show();
                        ajaxResponseBody.removeClass("success error");
                        ajaxResponseBlock.hide();
                        ajaxSendButton.prop("disabled", true);
                    },
                    success: function (data) {
                        // Change state progress send animation
                        setTimeout(function () {
                            ajaxSendProgress.find("img").hide();
                            (Number(data.status) === 1) ? ajaxResponseBody.addClass("success") : ajaxResponseBody.addClass("error");
                            ajaxResponseBody.html(data.message);
                            ajaxResponseBlock.show();
                            ajaxSendButton.prop("disabled", false);
                        }, 800);
                    },
                    error: function () {

                    },
                    url         : "/SendAjaxForms.php",
                    type        : "post",
                    dataType    : "json",
                    resetForm   : true
                }
            };

            ajaxAllForms.push(formAjax);

            // jQuery ajax form plugin
            $(this).ajaxForm();

        });

    // ==============================================================
    // Feedback form
    // ==============================================================

        var feedbackForm = $("#feedbackForm");

        // Validate form
        feedbackForm.validate({
            rules: {
                modalUserEmailAddress: {
                    required: true,
                    email: true
                },
                modalUserPhoneNumber: {
                    required: true
                },
                modalUserMessage: {
                    required: true,
                    minlength: 10
                },
                modalUserCheckbox: {
                    required: true
                },
                modalUserCheckbox2: {
                    required: true
                }
            },

            messages: {
                modalUserEmailAddress: {
                    required: "Укажите email",
                    email: "Email введен не корректно"
                },
                modalUserPhoneNumber: {
                    required: "Укажите контактный телефон"
                },
                modalUserMessage: {
                    required: "Введите сообщение",
                    minlength: jQuery.validator.format("Минимальная длина сообщения {0} символов!")
                },
                modalUserCheckbox: {
                    required: "Примите условие"
                },
                modalUserCheckbox2: {
                    required: "Примите условие 2"
                }
            }
        });

    // ==============================================================
    // Form in modal and send via ajax
    // ==============================================================

       // validate form1

       $("#form1").validate({
        rules: {
            form1UserName: {
                required: true,
                minlength: 2
            },
            form1UserPhone: {
                required: true
            }
        },

        messages: {
            form1UserName: {
                required: "Укажите имя",
                minlength: jQuery.validator.format("Минимальная длина {0} символов!")
            },
            form1UserPhone: {
                required: "Укажите телефон"
            }
        },
        submitHandler: function(formValidate) {

            // Search options form for send via ajax
            ajaxAllForms.forEach(function (form, i) {
                (form.formId === $("#form1").attr("id")) ? $("#form1").ajaxSubmit(form.ajaxSendOptions) : "";
            });
        }
        });

    // ==============================================================
    // Input masked template
    // ==============================================================

        $(".masked-phone-by").mask("+375 (99) 999-99-99");  // Belarus

    // ==============================================================
    // Scroll to top
    // ==============================================================

        function scrollToTop() {
            verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
            element = $('body');
            offset = element.offset();
            offsetTop = offset.top;
            $('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
        };

        $(document).on( 'scroll', function(){
            if ($(window).scrollTop() > 100) {
                $('.scroll-top').addClass('show');
            } else {
                $('.scroll-top').removeClass('show');
            }
        });

        $('.scroll-top').on('click', scrollToTop);

    // ==============================================================
    // Slow scroll to anchor
    // ==============================================================

        $('a.anchor-easy').bind('click', function(e) {
            e.preventDefault();
            var anchor = $(this).attr('href');
            $('html, body').animate({scrollTop: $(anchor).offset().top}, 1050, 'easeInOutExpo');
        });

    // ==============================================================
    // Magnific pop-up
    // ==============================================================

        $('.gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            mainClass: 'mfp-with-zoom',
            cursor: '',
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',

                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            },
            gallery: {
                enabled:true
            }
        });

});