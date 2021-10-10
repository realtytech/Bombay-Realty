var base_url = "http://bombay-realty.co.in/island-city-center";
//var property_id ='137';
var property_id ='139';
var projectName = 'Bombay Realty - ICc'

$("#enquiry-form #phone").keyup(function () {
    var flag = $('#enquiry-form .selected-flag').attr('title');
    var res = flag.split(":");
    var dialing_code = res[1];
    var country = $.trim(res[0].replace(/\(.*?\)/, ''));
    $("#enquiry-form #hdn_country").val(country);
    $("#enquiry-form #hdn_dialcode").val(dialing_code);
});

// create a custom phone number rule called 'intlTelNumber'
$.validator.addMethod("intlTelNumber", function(value, element) {
    return this.optional(element) || $(element).intlTelInput("isValidNumber");
}, "Please enter a valid mobile number");

$.validator.addMethod("alphabets", function (value, element) {
    return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
}, "Please enter Alphabets only");

$.validator.addMethod("email", function (value, element) {
    return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}, "Please enter a valid email address.");
/*Adding validator function*/

$('#enquiry-form').validate({
    rules: {
        name: {
            required: true,
            alphabets: true,  
            minlength: 3,
            maxlength: 100
        },
        phone: {
            required: true,
            intlTelNumber: true
        },
        email: {
            required: true,
            email: true
        }
    },
    onkeyup: false,
    errorPlacement: function(error, element) {},
    submitHandler: function(form) {

        //$('.loader-spinner').show();

        var source = getParameterByName('utm_source');

        var medium = getParameterByName('utm_medium');

        var campaign = getParameterByName('utm_campaign');

        var keyword = getParameterByName('keyword');

        var device = getParameterByName('device');

        var placement = getParameterByName('placement');

        var gclid = getParameterByName('gclid');

        var adgroup = getParameterByName('adgroup');

        var creative = getParameterByName('creative');

        var target = getParameterByName('target');

        var matchtype = getParameterByName('matchtype');

        var network = getParameterByName('network');

        var devicemodel = getParameterByName('devicemodel');

        var adposition = getParameterByName('adposition');

        var sfdc_campaign_code = getParameterByName('campaign_code');

        var campaignid = getParameterByName('campaignid');

        var feeditemid = getParameterByName('feeditemid');

        var content = getParameterByName('content');

        var campaign_code = getParameterByName('ncamp_code');

        var form_type = ""
        if($("#form_type").val() != '') 
        {
            form_type = $("#form_type").val();
        }
        else{
            form_type = 'main_form';
        }

        if(source=="")

            source="NA";

        if(medium == "")

            medium = "NA";

        if(campaign == "")

            campaign = "NA";

        if(keyword == "")

            keyword = "NA";

        if(device == "")

            device = "NA";

        if(placement == "")

            placement = "NA";

        if(gclid == "")

            gclid = "NA";

        if(adgroup == "")

            adgroup = "NA";

        if(creative == "")

            creative = "NA";

        if(target == "")

            target = "NA";

        if(matchtype == "")

            matchtype = "NA";

        if(network == "")

            network = "NA";

        if(devicemodel == "")

            devicemodel = "NA";

        if(adposition == "")

            adposition = "NA";

        if(campaignid == "")

            campaignid = "NA";

        if(feeditemid == "")

            feeditemid = "NA";

        if(content == "")

            content = "NA";

        // if(sfdc_campaign_code == "")

            //sfdc_campaign_code = "BRMD150221RH180LL";
           // sfdc_campaign_code = "BRMD150221RH180LL";
        srd = "7015g0000004xICC";

        

        var comments = 'NA';

        var budget = 'NA';

        var configuration = 'NA'

        var ip_add = $('#ip_address').val();
        var source_ip = $('#source_ip').val();

        var city = 'NA';

        var state = "NA";

        var sfdc_project_interested = 'Bombay Realty';

         var ind_project_name = 'Bombay Realty';  

        if($("#config_type").val() != '')
        {
             var ind_project_name = $("#config_type").val(); 
          //   var ind_project_id = 'NA';
        }
        else
        {
            // var ind_project_id = 'NA';
              var ind_project_name = 'NA';     
        }
        

        var name = $('#name').val();

        var email = $('#email').val();

        var mobile = $('#phone').val();

        var country      = $('#enquiry-form #hdn_country').val();

        var dialing_code = ($('#enquiry-form #hdn_dialcode').val()).trim();

        var url = $(location).attr('href'); //get current url  //code added by Aparnav
        var encodedUrl = encodeURIComponent(url);


        var data = {
            'name':name,'email':email,'mobile':mobile,
            'projectName':projectName,
            'did':srd,'UTMSource':source,'UTMmedium':medium, 'url':encodedUrl};
        console.log(data);
        storeLeadInSFDC(data);
        return;

        var lead_url = "https://lms.netbizlabs.com/admin/leads_api/store_api_lead/";

        // LEAD to LMS
        $("#enquiry-form .btn").prop('disabled', true);

        $.ajax({
            url        : lead_url,
            type       : 'POST',
            dataType   : 'text',
            data       : data,
            crossDomain: true,
            cache      : false,
            success: function (response) 
            {
                if(form_type == 'download_brochure'){
                    window.open(base_url+'IslandCityCenter.pdf', 'Download');
                }
                window.location.href = 'thankyou.html';

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Some error occurred');
            }
        });
    }
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setFormType(form_val,configuration)
{
    $("#form_type").val(form_val);
    $("#config_type").val(configuration);
}

function storeLeadInSFDC(data) {
    console.log(data)
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://l3g8sgyj77.execute-api.ap-south-1.amazonaws.com/Production",
        "method": "POST",
        "headers": {
          "content-type": "application/json",          
        },
        "processData": false,
        "data": JSON.stringify(data)
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        storeLeadInDB(data["name"], data["email"], data["mobile"], JSON.stringify(response));
        setTimeout(function redirect_response() { window.location.href = "thankyou.html"; }, 1000)
      }); 

}

function storeLeadInDB(name, email, mobile, response, formName) {
    var currentUrl = window.location.href;
    var utm_source = queryParameter('utm_source', currentUrl);
    var utm_medium = queryParameter('utm_medium', currentUrl)
    var utm_campaign = queryParameter('utm_campaign', currentUrl)
    var utm_adgroup = queryParameter('utm_adgroup', currentUrl)
    var utm_keyword = queryParameter('utm_keyword', currentUrl)
    var utm_adset = queryParameter('utm_adset', currentUrl)
    var utm_ad = queryParameter('utm_ad', currentUrl)
    var utm_device = queryParameter('utm_device', currentUrl)
    var utm_site = queryParameter('utm_site', currentUrl)
    var utm_placement = queryParameter('utm_placement', currentUrl);
    var gclid = queryParameter('gclid', currentUrl);
    var fbclid = queryParameter('fbclid', currentUrl);
    var srd = queryParameter('srd', currentUrl);


    var project = 'Bombay Realty - ICC';
    var timestamp = Date();
    data = {
        "formId": String(Math.floor(Date.now() / 1000)),
        "name": name,
        "email": email,
        "mobile": mobile,
        "project": project,
        "lead_creation_date": timestamp,
        "utm_source": utm_source,
        "utm_medium": utm_medium,
        "utm_campaign": utm_campaign,
        "utm_adgroup": utm_adgroup,
        "utm_keyword": utm_keyword,
        "utm_adset": utm_adset,
        "utm_ad": utm_ad,
        "utm_device": utm_device,
        "utm_site": utm_site,
        "utm_placement": utm_placement,
        "gclid": gclid,
        "fbclid": fbclid,
        "response": response,
        "formName": formName,
        "url":currentUrl,
        "srd":srd

    }
    const formURL = 'https://dj2kxzt125.execute-api.ap-south-1.amazonaws.com/Prod/submitForm';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', formURL, true);
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // Send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = response => {
        if (response.target.status === 200) {
            //   form.reset();
            console.error(JSON.parse(response));

            //   submitResponse.innerHTML = 'Form submitted. Success!';
        } else {
            //   submitResponse.innerHTML = 'Error! Please try again.';
            console.error(JSON.parse(response));
        }
    };

}

function queryParameter(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}