let isInitialized = false;

const initialize = async () => {
    if (isInitialized) {
        return;
    }

    console.log("Initializing...");

    let cartTotalPrice = 0;
    let cartBody;

    const cartTotal = document.querySelector(".cart-total");
    console.log("Cart Total:", cartTotal);

    const renderItems = async (cartDataArray) => {
        cartBody = document.querySelector(".product-cart");
        console.log("Cart Body:", cartBody);
        if (!cartBody) return;
        cartBody.innerHTML = '';
        for (const instance of cartDataArray) {
            let item = document.createElement("tr");

            try {
                let productInfo = await fetchProductData(instance.product_id);
                console.log("Item info: ", productInfo);

                cartTotalPrice += instance.quantity * productInfo.price;

                item.classList.add("tr");
                item.innerHTML = `
                    <td class="product-thumbnail">
                        <img src="${productInfo.image}" alt="Image" class="img-fluid">
                    </td>
                    <td class="product-name">
                        <h2 class="h5 text-black">${productInfo.item_name}</h2>
                    </td>
                    <td>$${productInfo.price}</td>
                    <td>
                        <div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px;">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-black decrease" type="button">&minus;</button>
                            </div>
                            <input type="text" class="form-control text-center quantity-amount" value="${instance.quantity}" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                            <div class="input-group-append">
                                <button class="btn btn-outline-black increase" type="button">&plus;</button>
                            </div>
                        </div>
                    </td>
                    <td>$${(instance.quantity * productInfo.price).toFixed(2)}</td>
                    <td><a href="#" class="btn btn-black btn-sm">X</a></td>
                `;

                cartBody.append(item);
            } catch (error) {
                console.error("Error rendering item:", error);
            }
        }
        cartTotal.textContent = cartTotalPrice.toFixed(2);
    };

    const fetchCartData = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user || !user.token) {
            console.error("User is not authenticated");
            return;
        }

        const token = user.token;
        try {
            const response = await $.ajax({
                url: "http://localhost/WPEmina/furni-backend/get_cart_items",
                type: "GET",
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                dataType: "json"
            });

            console.log("Cart data fetched: ", response.data);
            renderItems(response.data);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const fetchProductData = (id) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://localhost/WPEmina/furni-backend/items/${id}`,
                type: "GET",
                dataType: "json",
                success: function(data) {
                    console.log("Product data: ", data);
                    resolve(data);
                },
                error: function(error) {
                    reject(new Error(`Failed to fetch product data: ${error}`));
                }
            });
        });
    };

    fetchCartData().then(() => {
        console.log("Initialization complete.");
        isInitialized = true;
    }).catch((error) => {
        console.error(`Failed to initialize: ${error}`);
    });
};

document.addEventListener('DOMContentLoaded', initialize);
