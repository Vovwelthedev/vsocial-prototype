/* ================================
   ELEMENTS
================================ */

const postImage = document.getElementById("postImage");
const previewImage = document.getElementById("previewImage");
const previewContainer = document.getElementById("preview_container");

const postBtn = document.getElementById("postBtn");
const caption = document.getElementById("caption");

const feed = document.querySelector(".feed");


/* ================================
   IMAGE PREVIEW
================================ */

postImage.addEventListener("change", function () {

    const file = postImage.files[0];

    if (!file) {
        return;
    }

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;

    previewContainer.style.display = "block";

});


/* ================================
   CREATE POST
================================ */

postBtn.addEventListener("click", function () {

    const file = postImage.files[0];

    const text = caption.value.trim();


    if (!file && text === "") {

        alert("Add a photo or write something first.");

        return;

    }


    const post = document.createElement("article");

    post.classList.add("post");


    /* POST HEADER */

    post.innerHTML = `

        <div class="post_header">

            <div class="post_user">

                <img
                    src="https://i.pravatar.cc/100?img=12"
                >

                <div>

                    <strong>Godwill</strong>

                    <span>@godwill · just now</span>

                </div>

            </div>

            <button class="more_button">

                <i class="fa-solid fa-ellipsis"></i>

            </button>

        </div>

    `;


    /* TEXT */

    if (text !== "") {

        const paragraph = document.createElement("p");

        paragraph.classList.add("post_text");

        paragraph.textContent = text;

        post.appendChild(paragraph);

    }


    /* IMAGE */

    if (file) {

        const image = document.createElement("img");

        image.classList.add("post_image");

        image.src = URL.createObjectURL(file);

        post.appendChild(image);

    }


    /* ACTIONS */

    const actions = document.createElement("div");

    actions.classList.add("post_actions");

    actions.innerHTML = `

        <button class="like_button">

            <i class="fa-regular fa-heart"></i>

            <span>0</span>

        </button>

        <button>

            <i class="fa-regular fa-comment"></i>

            <span>0</span>

        </button>

        <button>

            <i class="fa-solid fa-share"></i>

            <span>Share</span>

        </button>

        <button class="save_button">

            <i class="fa-regular fa-bookmark"></i>

        </button>

    `;


    post.appendChild(actions);


    /* ADD TO FEED */

    const firstPost = feed.querySelector(".post");

    feed.insertBefore(post, firstPost);


    /* RESET */

    caption.value = "";

    postImage.value = "";

    previewImage.src = "";

    previewContainer.style.display = "none";

});


/* ================================
   LIKE SYSTEM
================================ */

document.addEventListener("click", function (event) {

    const button = event.target.closest(".like_button");

    if (!button) {
        return;
    }


    const icon = button.querySelector("i");

    const number = button.querySelector("span");

    let likes = Number(number.textContent);


    if (icon.classList.contains("fa-regular")) {

        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");

        likes++;

    } else {

        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");

        likes--;

    }


    number.textContent = likes;

});


/* ================================
   SAVE SYSTEM
================================ */

document.addEventListener("click", function (event) {

    const button = event.target.closest(".save_button");

    if (!button) {
        return;
    }

    const icon = button.querySelector("i");


    if (icon.classList.contains("fa-regular")) {

        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");

    } else {

        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");

    }

});


/* ================================
   FOLLOW BUTTON
================================ */

document.addEventListener("click", function (event) {

    const button = event.target.closest(".suggestion button");

    if (!button) {
        return;
    }


    if (button.textContent === "Follow") {

        button.textContent = "Following";

    } else {

        button.textContent = "Follow";

    }

});


/* ================================
   FEED TABS
================================ */

/* ================================
   FEED TABS
================================ */

const feedTabs =
    document.querySelectorAll(".feed_tab");

const mainPosts =
    document.querySelectorAll(".feed > .post");

const createPost =
    document.querySelector(".create_post");

const stories =
    document.querySelector(".stories");

const storeFeed =
    document.getElementById("storeFeed");


feedTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {


        /* Remove active */

        feedTabs.forEach(function (item) {

            item.classList.remove("active");

        });


        /* Add active */

        tab.classList.add("active");


        const selected =
            tab.dataset.tab;


        /* =================
           FOR YOU
        ================= */

        if (selected === "forYou") {

            storeFeed.classList.remove("show");

            createPost.style.display = "block";

            stories.style.display = "flex";


            mainPosts.forEach(function (post) {

                post.style.display = "block";

            });

        }


        /* =================
           FOLLOWING
        ================= */

        if (selected === "following") {

            storeFeed.classList.remove("show");

            createPost.style.display = "block";

            stories.style.display = "flex";


            mainPosts.forEach(function (post) {

                post.style.display = "block";

            });

        }


        /* =================
           STORES
        ================= */

        if (selected === "stores") {

            createPost.style.display = "none";

            stories.style.display = "none";


            mainPosts.forEach(function (post) {

                post.style.display = "none";

            });


            storeFeed.classList.add("show");


            loadStoreProducts();

        }

    });

});

/* ================================
   LOAD STORE PRODUCTS
================================ */

function loadStoreProducts() {

    const container =
        document.getElementById(
            "storeFeedProducts"
        );


    container.innerHTML = "";


    const products =
        JSON.parse(
            localStorage.getItem(
                "vsocial_products"
            ) || "[]"
        );


    if (products.length === 0) {

        container.innerHTML = `

            <div style="
                grid-column: 1 / -1;
                background: white;
                padding: 60px 20px;
                text-align: center;
                border-radius: 12px;
            ">

                <i
                    class="fa-solid fa-store"
                    style="
                        font-size:40px;
                        color:#ccc;
                        margin-bottom:15px;
                    "
                ></i>

                <h3>No products yet</h3>

                <p style="
                    color:#888;
                    margin-top:5px;
                ">
                    Products from stores will appear here.
                </p>

            </div>

        `;

        return;

    }


    products.forEach(function (product) {


        const card =
            document.createElement("article");

        card.classList.add("feed_product");


        const actualPrice =
            product.discount &&
            Number(product.discount)
                < Number(product.price)

            ? product.discount

            : product.price;


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="feed_product_body">

                <div class="feed_product_category">

                    ${product.category}

                </div>


                <div class="feed_product_name">

                    ${product.name}

                </div>


                <div class="feed_product_price">

                    ₦${Number(
                        actualPrice
                    ).toLocaleString()}

                </div>


                <div class="feed_product_location">

                    <i class="fa-solid fa-location-dot"></i>

                    ${product.location}

                </div>


                <button class="feed_product_button">

                    View Product

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* ================================
   BOTTOM NAV
================================ */

const bottomItems =
    document.querySelectorAll(".bottom_item");


bottomItems.forEach(function (item) {

    item.addEventListener("click", function () {

        bottomItems.forEach(function (button) {

            button.classList.remove("active");

        });


        item.classList.add("active");

    });

});

/* ================================
   PRODUCT SYSTEM
================================ */

const productModal =
    document.getElementById("productModal");

const openProductModal =
    document.getElementById("openProductModal");

const closeProductModal =
    document.getElementById("closeProductModal");

const cancelProduct =
    document.getElementById("cancelProduct");

const productForm =
    document.getElementById("productForm");

const productImage =
    document.getElementById("productImage");

const productImagePreview =
    document.getElementById("productImagePreview");


/* OPEN */

openProductModal.addEventListener("click", function () {

    productModal.classList.add("show");

});


/* CLOSE */

function closeProductWindow() {

    productModal.classList.remove("show");

}


closeProductModal.addEventListener(
    "click",
    closeProductWindow
);

cancelProduct.addEventListener(
    "click",
    closeProductWindow
);


/* IMAGE PREVIEW */

productImage.addEventListener("change", function () {

    const file = productImage.files[0];

    if (!file) {
        return;
    }

    const imageURL =
        URL.createObjectURL(file);

    productImagePreview.src = imageURL;

    productImagePreview.style.display = "block";

});


/* PUBLISH */

productForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const file =
        productImage.files[0];


    if (!file) {

        alert("Please add a product image.");

        return;

    }


    const name =
        document.getElementById("productName").value;

    const price =
        document.getElementById("productPrice").value;

    const discount =
        document.getElementById("discountPrice").value;

    const category =
        document.getElementById("productCategory").value;

    const stock =
        document.getElementById("productStock").value;

    const condition =
        document.getElementById("productCondition").value;

    const location =
        document.getElementById("productLocation").value;

    const description =
        document.getElementById("productDescription").value;


    /*
        Convert image to a format
        that localStorage can keep.
    */

    const reader = new FileReader();


    reader.onload = function () {

        const products =
            JSON.parse(
                localStorage.getItem(
                    "vsocial_products"
                ) || "[]"
            );


        const product = {

            id: Date.now(),

            name: name,

            price: price,

            discount: discount,

            category: category,

            stock: stock,

            condition: condition,

            location: location,

            description: description,

            image: reader.result

        };


        products.unshift(product);


        localStorage.setItem(
            "vsocial_products",
            JSON.stringify(products)
        );


        /*
            Go directly to the Store
            after publishing.
        */

        window.location.href =
            "store.html";

    };


    reader.readAsDataURL(file);

});