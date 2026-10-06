/* ==========================================
   STORE SYSTEM
========================================== */

const storeProducts =
    document.getElementById("storeProducts");

const emptyStore =
    document.getElementById("emptyStore");

const productCount =
    document.getElementById("productCount");

const sortProducts =
    document.getElementById("sortProducts");


/* ==========================================
   GET PRODUCTS
========================================== */

function getProducts() {

    const products =
        localStorage.getItem("vsocial_products");

    if (!products) {

        return [];

    }

    return JSON.parse(products);

}


/* ==========================================
   SAVE PRODUCTS
========================================== */

function saveProducts(products) {

    localStorage.setItem(
        "vsocial_products",
        JSON.stringify(products)
    );

}


/* ==========================================
   DISPLAY PRODUCTS
========================================== */

function displayProducts(products) {

    storeProducts.innerHTML = "";


    productCount.textContent =
        products.length;


    if (products.length === 0) {

        emptyStore.style.display = "block";

        return;

    }


    emptyStore.style.display = "none";


    products.forEach(function(product) {


        const card =
            document.createElement("article");

        card.classList.add("store_product");


        const image =
            product.image ||
            "https://via.placeholder.com/500";


        const discountHTML =
            product.discount &&
            Number(product.discount) < Number(product.price)

            ?

            `
                <span class="old_price">
                    ₦${Number(product.price).toLocaleString()}
                </span>
            `

            :

            "";


        const actualPrice =
            product.discount &&
            Number(product.discount) < Number(product.price)

            ?

            product.discount

            :

            product.price;


        card.innerHTML = `

            <img
                class="store_product_image"
                src="${image}"
                alt="${product.name}"
            >


            <div class="store_product_body">

                <div class="store_product_category">

                    ${product.category}

                </div>


                <div class="store_product_name">

                    ${product.name}

                </div>


                <div class="store_product_description">

                    ${product.description}

                </div>


                <div class="store_product_price">

                    <span class="current_price">

                        ₦${Number(
                            actualPrice
                        ).toLocaleString()}

                    </span>

                    ${discountHTML}

                </div>


                <div class="store_product_footer">

                    <span class="stock">

                        ${product.stock} in stock

                    </span>


                    <button class="buy_product">

                        View Product

                    </button>

                </div>

            </div>

        `;


        storeProducts.appendChild(card);

    });

}


/* ==========================================
   SORT
========================================== */

sortProducts.addEventListener(
    "change",
    function () {

        const products = getProducts();


        if (sortProducts.value === "priceLow") {

            products.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

        }


        if (sortProducts.value === "priceHigh") {

            products.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

        }


        displayProducts(products);

    }
);


/* ==========================================
   LOAD STORE
========================================== */

displayProducts(
    getProducts()
);


/* ==========================================
   ADD PRODUCT BUTTON
========================================== */

const emptyAddProduct =
    document.getElementById("emptyAddProduct");

const storeAddProduct =
    document.getElementById("storeAddProduct");


function openAddProduct() {

    window.location.href =
        "index.html";

}


emptyAddProduct.addEventListener(
    "click",
    openAddProduct
);

storeAddProduct.addEventListener(
    "click",
    openAddProduct
);