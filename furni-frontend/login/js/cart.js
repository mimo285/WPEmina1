let isInitialized = false;

const initialize = async () => {
    if (isInitialized) {
        return;
    }

    console.log("Initializing...");

    // Your initialization code here...
    let itemCount = 0;
    let cartTotalPrice = 0;
    let cartBody;

    // Initialize cartTotal with a reference to the DOM element
    const cartTotal = document.querySelector(".cart-total");
    console.log("Cart Total:", cartTotal); // Check if cartTotal is null

    const renderItems = async (cartDataArray) => {
        cartBody = document.querySelector(".product-cart");
        console.log("Cart Body:", cartBody); // Check if cartBody is null
        if (!cartBody) return; // Check if cartBody is null
        cartBody.innerHTML = '';
        for (const instance of cartDataArray) {
            let item = document.createElement("tr");

            try {
                let productInfo = await fetchDataWithId(instance.productId, "json/products.json");
                console.log("Item info: ", productInfo);

                cartTotalPrice += instance.quantity * productInfo.price;

                item.classList.add("tr");
                item.innerHTML = `
                    <td class="product-thumbnail">
                        <img src="${productInfo.image}" alt="Image" class="img-fluid">
                    </td>
                    <td class="product-name">
                        <h2 class="h5 text-black">${productInfo.name}</h2>
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
        // Set cartTotalPrice to cartTotal innerHTML after rendering each item
        cartTotal.textContent = cartTotalPrice.toFixed(2);
    };

    const fetchCartData = () => {
        let cart = localStorage.getItem('cart');
        let cartData = cart ? JSON.parse(cart) : [];
        console.log("Cart data fetched: ", cartData);
        renderItems(cartData);
    };

    const fetchDataWithId = (id, dataUrl) => {
        return new Promise((resolve, reject) => {
            $.get(dataUrl, (data) => {
                const foundInstance = data.find(instance => instance.id === id);
                if (foundInstance) {
                    console.log("instance: ", foundInstance);
                    resolve(foundInstance);
                } else {
                    reject(new Error(`Instance with ID ${id} not found`));
                }
            }).done(() => {
                console.log("DONE FETCHING DATA");
            }).fail((error) => {
                reject(new Error(`Failed to fetch data: ${error}`));
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