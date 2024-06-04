$.validator.addMethod("equalToPassword", function(value, element) {
    var password = $("#password").val();
    return value === password;
}, "Passwords do not match");

$("#registrationForm").validate({
    rules:{
        firstName:{
            required:true
        },
        lastName:{
            required:true
        },
        password:{
            required:true
        },
        confirmPassword:{
            required:true,
            equalToPassword: true 
        },
        email:{
            required:true,
            email:true
        }
    },
    
    submitHandler: function (form, event)
    {
        event.preventDefault();
        blockUi("#registrationForm");
        let data=serializeForm(form);

        data['id']=idCounter;
        idCounter+=1;

        users.push(data);
        $("#registrationForm")[0].reset();
        console.log(users);

        unblockUi("#registrationForm");
        $(".success-message").show();

        setTimeout(function() {
            $(".success-message").hide();
        }, 5000);

        $('#add-patient-modal button[type="cancel"]').trigger("click");

        $.post("/../furni-backend/add_user", data)
        .done(function(data){
            Utils.unblock_ui("#add-patient-modal");
            $("#add-patient-modal").modal("toggle");
            
        
        })
            }
            
        });

