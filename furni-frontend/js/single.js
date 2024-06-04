document.addEventListener("DOMContentLoaded", function() {
    let shopBodySingle = document.querySelector(".we-help-section");
  
    if (shopBodySingle) {
        let id = localStorage.getItem("id");
        console.log("LOCALSTORAGE ID: ", id);
        fetchDataWithId(id);
    } else {
        console.error("Element with class 'we-help-section' not found.");
    }
  });
  
  fetchDataWithId = (id) => {
    let storedItemData = localStorage.getItem(`itemData_${id}`);
    if (storedItemData) {
        let itemData = JSON.parse(storedItemData);
        console.log("ITEM DATA (from storage): ", itemData);
        renderItem(itemData);
    } else {
        console.log("Fetching item data from API...");
        // Change the URL to point to your PHP endpoint
        $.get({
            url:  "/../furni-backend/items",
            dataType: "json",
            success: function(data) {
                let itemData = data.find(item => item.item_id == id);
                if (itemData) {
                    console.log("ITEM DATA (from API): ", itemData);
                    localStorage.setItem(`itemData_${id}`, JSON.stringify(itemData));
                    renderItem(itemData);
                } else {
                    console.error("Item not found with id: ", id);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                console.error("Error fetching data from API");
            }
        });
    }
  }
  
  renderItem = (itemData) => {
    let shopBodySingle = document.querySelector(".we-help-section");
    shopBodySingle.innerHTML = `
        <div class="container">
            <div class="row justify-content-between">
                <div class="col-lg-7 mb-5 mb-lg-0">
                    <div class="imgs-grid" style="margin-left: 50px;">
                        <div class="grid grid-1"><img src="${itemData.image}" alt="${itemData.item_name}"></div>
                    </div>
                </div>
                <div class="col-lg-5 ps-lg-5">
                    <h2 class="section-title mb-4">${itemData.item_name}</h2>
                    <p>${itemData.description}</p>
                    <ul class="list-unstyled custom-list my-4">
                        <li>${itemData.point1}</li>
                        <li>${itemData.point2}</li>
                        <li>${itemData.point3}</li>
                        <li>${itemData.point4}</li>
                    </ul>
                    <h2 class="section-title mb-4">$${itemData.price.toFixed(2)}</h2>
                </div>
            </div>
            <div class="form-group" style="text-align: right;">
                <button class="btn btn-black btn-lg py-3 btn-block" onclick="addToCart1(${itemData.item_id})">Add to cart</button>
            </div>
        </div>
      
    `;
    // Save item data to localStorage
    localStorage.setItem("itemData", JSON.stringify(itemData));
  }

  function addToCart1(item_id) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        console.error("User is not authenticated");
        return;
    }

    const token = user.token;
    const user_id = user.user_id;
    console.log("Retrieved token:", token);
    console.log("Retrieved user_id:", user_id);

    const dataToSend = { product_id: item_id, user_id: user_id, quantity: 1 };
    console.log("Data being sent to backend:", dataToSend);

    $.ajax({
        url: "/../furni-backend/add_to_cart",
        type: "POST",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify(dataToSend),
        contentType: "application/json",
        success: function(response) {
            console.log(response.message);
        },
        error: function(xhr, status, error) {
            console.error("Error adding item to cart:", error);
        }
    });
}


function fetchCartDataFromDB() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || !user.token) {
        console.error("User is not authenticated");
        return;
    }

    const token = user.token;

    $.ajax({
        url: "/../furni-backend/get_cart_items",  // Assuming you have an endpoint to get cart items
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(response) {
            console.log("Cart items fetched: ", response.data);
            renderItems(response.data);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching cart items:", error);
        }
    });
}

  


  