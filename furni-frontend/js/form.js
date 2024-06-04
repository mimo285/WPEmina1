if(Utils.get_from_localstorage("user")) {
    window.location = "../index.html";
  }
var users=[]; 
var idCounter = 1; 
$("#loginForm").validate({
    rules:{
        password:{
            required: true
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
        city:{
            required:true
        },
        zip:{
            required:true,
            digits: true 
        }
    },
    submitHandler: function (form, event)
    {
        event.preventDefault();
        blockUi("#loginForm");
        let data=serializeForm(form);

        data['id']=idCounter;
        idCounter+=1;

        users.push(data);
        $("#loginForm")[0].reset(); 
        console.log(users);
        
        unblockUi("#loginForm");
        $(".success-message").show();

        setTimeout(function() {
            $(".success-message").hide();
        }, 5000);
    
        $.post("/../WPEmina/furni-backend/auth/login", data)
        .done(function(response) {
            Utils.unblock_ui("#loginForm"); 
            $(".success-message").show(); 
            setTimeout(function() {
                $(".success-message").hide(); 
            }, 5000);
            $("#add-login-modal").modal("toggle"); 
            Utils.set_to_localstorage("user", response);
            window.location = "../index.html";
        })
        .fail(function(error) {
            Utils.unblock_ui("#loginForm"); 
            $(".error-message").show(); 
            setTimeout(function() {
                $(".error-message").hide(); 
            }, 5000);
        });
    }});

blockUi=(element) => {
    $(element).block({message: '<div class="loading-spinner"></div>'});
}

unblockUi=(element) => {
    $(element).unblock({});
}

serializeForm=(form)=>
{
    let jsonResult={};
    $.each($(form).serializeArray(), function(){
        jsonResult[this.name]=this.value;
    });
    return jsonResult;
}