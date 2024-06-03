var users = []; 
var idCounter = 1;

$("#checkoutForm").validate({
    rules:{
        firstName:{
            required:true
        },
        lastname:{
            required:true
        },
        companyName:{
            required:false
        },
        email:{
            required:true,
            email:true 
        },
        country:{
            required:true
        },
        address:{
            required:true
        },
        addressInfo:{
            required:false
        },
        state:{
            required:true
        },
        postal:{
            required:true,
            digits: true 
        },
        phone:{
            digits: true,
            required:true
        },
        orderNotes:{
            required:false
        },
        cardName:{
            required:true
        },
        cardNumber:{
            required:true,
            digits:true,
            minlength:16
        },
        expDate:{
            required:true
        },
        cvv:{
            required:true,
            digits:true,
            minlength:3
        }
    },
    
    submitHandler: function (form, event)
    {
        event.preventDefault();
        blockUi("#checkoutForm");
        let data=serializeForm(form);

        data['id']=idCounter;
        idCounter+=1;

        users.push(data);
        $("#checkoutForm")[0].reset(); 
        console.log(users);

        unblockUi("#checkoutForm");
        $(".success-message").show();

        setTimeout(function() {
            $(".success-message").hide();
        }, 5000);
    }
});

blockUi = (element) => {
    $(element).block({message: '<div class="loading-spinner"></div>'});
}

unblockUi = (element) => {
    $(element).unblock({});
}

serializeForm = (form) =>
{
    let jsonResult={};
    $.each($(form).serializeArray(), function(){
        jsonResult[this.name]=this.value;
    });
    return jsonResult;
}
