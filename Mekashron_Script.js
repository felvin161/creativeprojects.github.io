$(document).ready(function () {
    $("#registrationForm").validate({
        rules: {
            email: { required: true, email: true},
            password: { required: true },
            firstName: { required: true },
            lastName: { required: true },
            phoneNumber: { required: true, number: true,  minlength: 10, maxlength: 10},
            countryID: { required: true, number: true,},
        },
        messages: {
            email: { required: "Email is required" },
            password: { required: "Please provide a password" },
            firstName: { required: "Please enter your firstName" },
            lastName: { required: "Please enter your lastName" },
            phoneNumber: { required: "Phone Number is required" },
            countryID: { required: "CountryID is required" },

        }
    });
});


function logintoMyAccount() {

    var EID = $("#txt_UserID").val();
    var password = $("#txt_Password").val();

    var service_request = '<?xml version="1.0" encoding="UTF-8"?>'+
                            '<env:Envelope '+
                                'xmlns:env="http://www.w3.org/2003/05/soap-envelope" '+
                                'xmlns:ns1="urn:ICUTech.Intf-IICUTech" '+
                                'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '+
                                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
                                'xmlns:enc="http://www.w3.org/2003/05/soap-encoding">'+
                                    '<env:Body>'+
                                        '<ns1:Login env:encodingStyle="http://www.w3.org/2003/05/soap-encoding">	'+
                                            '<UserName xsi:type="xsd:string">'+ EID +'</UserName>'+
                                            '<Password xsi:type="xsd:string">'+ password +'</Password>	'+
                                            '<IPs xsi:type="xsd:string"></IPs>'+
                                        '</ns1:Login>'+
                                    '</env:Body>	'+
                            '</env:Envelope>';

    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "http://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech");
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var xmlResponse =httpRequest.responseXML.documentElement;
            var fullNodeList = xmlResponse.getElementsByTagName("NS1:LoginResponse");
            var result = ""
            if(fullNodeList.length > 0){
               result = JSON.parse(fullNodeList[0].childNodes[0].innerHTML);
            }
            if(result.ResultCode === -1){
                $('#CredentialsNotMatch').fadeIn();
                $("#sec_Viewdetails").hide();
                $("#sec_Login").show();
            }
            else{

                $("#tx_EntityId").val(result.EntityId);
                $("#txt_My_firstname").val(result.FirstName);
                $("#txt_My_lastname").val(result.LastName);
                $("#txt_myEmail").val(result.Email);
                $("#txt_myMobile").val(result.Mobile);
                $("#txt_CountryCode").val(result.CountryID);
                $("#txt_myAdress").val(result.Address);
                $("#txt_myCity").val(result.City);
                $("#txt_mycountry").val(result.Country);
                $("#txt_myZip").val(result.Zip);
                $("#txt_myPhone").val(result.Phone);
                $("#sec_Login").hide();
                $("#sec_Viewdetails").show();

                $('#loginSuccess').fadeIn();
                setTimeout(function () {
                    $('#loginSuccess').fadeOut(1000);
                }, 2000);
            }
        }
    }
    httpRequest.send(service_request);
}

function DisplayRegistrationForm() {
    $("#sec_Login").hide();
    $("#sec_Register").show();
}

function RegisterMyAccount() {

    var Email, Password, FirstName, LastName, Mobile, CountryID;
    Email = $("#email").val();
    Password = $("#password").val();
    FirstName = $("#firstName").val();
    LastName = $("#lastName").val();
    Mobile = $("#phoneNumber").val();
    CountryID = $("#countryID").val();

    if ($("#registrationForm").valid()) {
        
        var service_request = '<?xml version="1.0" encoding="UTF-8"?>'+
                                '<env:Envelope '+
                                    'xmlns:env="http://www.w3.org/2003/05/soap-envelope" '+
                                    'xmlns:ns1="urn:ICUTech.Intf-IICUTech" '+
                                    'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '+
                                    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
                                    'xmlns:enc="http://www.w3.org/2003/05/soap-encoding">'+
                                        '<env:Body>'+
                                            '<ns1:RegisterNewCustomer env:encodingStyle="http://www.w3.org/2003/05/soap-encoding">'+
                                                '<Email xsi:type="xsd:string">'+ Email +'</Email>'+
                                                '<Password xsi:type="xsd:string">'+ Password +'</Password>'+
                                                '<FirstName xsi:type="xsd:string">'+ FirstName +'</FirstName>'+
                                                '<LastName xsi:type="xsd:string">'+ LastName +'</LastName>'+
                                                '<Mobile xsi:type="xsd:string">'+ Mobile +'</Mobile>'+
                                                '<CountryID xsi:type="xsd:int">'+ CountryID +'</CountryID>'+
                                                '<aID xsi:type="xsd:int">0</aID>'+
                                                '<SignupIP xsi:type="xsd:string"></SignupIP>'+
                                            '</ns1:RegisterNewCustomer>'+
                                        '</env:Body>'+
                                '</env:Envelope>';
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", "http://isapi.icu-tech.com/icutech-test.dll/soap/IICUTech");
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var xmlResponse =httpRequest.responseXML.documentElement;
                var fullNodeList = xmlResponse.getElementsByTagName("NS1:RegisterNewCustomerResponse");
                var result = ""
                if(fullNodeList.length > 0){
                   result = JSON.parse(fullNodeList[0].childNodes[0].innerHTML);
                }
                if(result.ResultCode === -1){
                    $("#Registration_Success").hide();
                    $("#Registration_error").text(result.ResultMessage)
                    $("#Registration_error").show();
                }
                else{
    
                    $("#Registration_error").hide();
                    $('#registrationForm')[0].reset();
                    $('#Registration_Success').fadeIn();
                    setTimeout(function () {
                        $('#Registration_Success').fadeOut(1000);
                    }, 2000);
                }
            }
        }
        httpRequest.send(service_request);
    }
    else {

        $("#Registration_error").text("Please Fill all the mandatory fields.")
        $("#Registration_error").show();
    }

}