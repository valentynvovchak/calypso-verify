function sendAjax(){

    let serial = $('#verify_input').val();
    $.ajax({
    async: true,
    dataType: 'json',
    type: 'POST',
    url: `${document.location}`,
    data: {
      'serial': serial,
      'csrfmiddlewaretoken': $('input[name="csrfmiddlewaretoken"]').val() // from index.html
    },
    beforeSend: function() {
        $('#verify__submit_button').css('pointer-events', 'none');
    },
    success: function(data, status, xhr) {
        // alert(data['serial']);
        let result;
        if (data['first_verified'] && data['found']){
            result = `<span style="font-weight:bold;color: wheat;">Your product has already been verified.</span> <br> First verified:&nbsp; <span style="font-weight:bold;color: #ffd24d;">${data['first_verified']}</span>. <br>Verified: &nbsp;<span ${data['status'] === 'DANGER'? 'style="font-weight:bold;color: #ff3737;"': 'style="font-weight:bold;color: #ffd24d;"'}>${data['verifications']}</span> times. ${data['status'] === 'DANGER'? '<br> <span style="color: #ff3737;">Most likely your product is not authentic. Please contact the retailer where you purchased your product.</span>': ''}<br><br>`
        } else if(!data['found']){
            result = `<span style="font-weight:bold;color: #ff3737;">Your serial code is either incorrect or not registered in the database. <br>If you think the code you entered and the code of your product matches then please contact the retailer where you purchased your product.</span><br><br>`
        } else {
            result = `<span style="font-weight:bold;color: wheat;">Your product has NOT been verified yet. You are the first.</span> <br> You can be sure that your product is original !<br><br>`
        }

        $('#report').html(`
            <li class="report_item">
                <i style="color: ${data['icon_color']}" class="far ${data['icon_class']} report_item__icon"></i>
                <div style="width: 100%;" class="report_item__content">${result}<span style="color: #fedd72;font-size: 40px">*</span> <span style="size: 18px;opacity: 0.8;line-height: 0.5;">If this is your first time checking the authenticity of your Calypso product you should know:&nbsp;&nbsp; if result is showing greater than <span style="color: #fedd72; font-family: sans-serif;">1</span> there is a chance your product may not be authentic. </span></div>
            </li>
        `);
        $('#verify__submit_button').css('pointer-events', 'unset');
    },
    error: function(xhr, status, error) {
        $('#verify__submit_button').css('pointer-events', 'unset');
      alert('Internal Server Error. Please try again later.');
    }
});
}


(function($) {
    $(document).ready(function() {
        sendAjax();
    });


    $(`#verify__submit_button`).on('click', function(event) {
        event.preventDefault();
        sendAjax();
    });
}(jQuery));