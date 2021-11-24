function openNav() {
    document.getElementById("mySidenav").style.width = "20vw";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
$(document).ready(function () {
    $('#one-tab').click();
    $('#one-tab-mobile').click();
});
$('#one-tab-mobile').trigger("click");

function openNavMobile() {
    document.getElementById("mySidenav-mobile").style.paddingTop = "60px";
    document.getElementById("mySidenav-mobile").style.height = "100vh";
}

function closeNavMobile() {
    document.getElementById("mySidenav-mobile").style.height = "0";
    document.getElementById("mySidenav-mobile").style.paddingTop = "0px";

}
form_body = `
<div>
<script src='//trkr.scdn1.secure.raxcdn.com/t/forms/5f5f2764923d4a24845d1af7/5f60e8487c0dac76c315d298.js'
data-form-id='5f60e8487c0dac76c315d298'></script></div>
`
brochure_form_body = `
<script src='//trkr.scdn1.secure.raxcdn.com/t/forms/5f5f2764923d4a24845d1af7/5f6eca597c0dac27292fb7e3.js' data-form-id='5f6eca597c0dac27292fb7e3'></script>`;

function showModal(type) {
    if (type == 'brochure') {
        $('#sellModal .modal-body').html(brochure_form_body);
        $("#sellModal").modal("show");
        localStorage.removeItem('myTimestamp');
    } else {
        $('#sellModal .modal-body').html(form_body);
        $("#sellModal").modal("show");
        localStorage.removeItem('myTimestamp');
    }
}
$(document).on('change', 'div', function () {
    x = $('.selldof_row label')
    for (i = 0; i < x.length; i++) {
        if (x[i].innerText == 'Project') {
            x[i].parentNode.parentNode.style.display = 'none'
        }
    }
    console.log(x);
});


window.onscroll = function (e) {
    var myDaemon = '';
    localStorage.setItem('myTimestamp', Date.now());
    if (myDaemon) clearInterval(myDaemon);
    myDaemon = setInterval(function () {
        var TimeDiffinSeconds = (Date.now() - localStorage.myTimestamp) / 1000;
        if (TimeDiffinSeconds > 10) {
            showModal();
            clearInterval(myDaemon);
            localStorage.removeItem('myTimestamp');
        }
    }, 1000);
}
var _selldo = [];
window.sell_do_form_rendered = function () {

}

window.sell_do_form_successfully_submitted = function (data, event) {

    var form_id = data['sell_do[campaign][form_id]'];

    if (form_id == '5f60e8487c0dac76c315d298')
        window.location.href = "./response.html?id=0";
    else if(form_id = '5f6eca597c0dac27292fb7e3'){
        window.location.href = "./response.html?id=1";
    }

}

document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazy");    
    var lazyloadThrottleTimeout;
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    
      
      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
      }, 20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });

  function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    // alert("You have entered an invalid email address!")
    return (false)
}

function queryParameter(name, url) {
	if (!url) url = location.href;
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url);
	return results == null ? null : results[1];
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
		setTimeout(function redirect_response() { window.location.href = "response.html"; }, 1000)
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


	var project = 'Rustomjee Seasons';
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
		"url": currentUrl,
		"srd": srd

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