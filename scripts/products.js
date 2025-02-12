// function to load products from local JSON file declared here
async function loadProducts() {
    const productRes = await fetch('../products.json')

    return productRes.json()
}

// function to showcase products declared here
async function showProducts() {
    const products = await loadProducts()

    const productsContainer = document.getElementById('products-container')

    products.forEach(product => {
        const productCard = document.createElement('div')

        productCard.classList.add('border-2',
            'border-blue-200',
            'rounded-2xl',
            'overflow-hidden',
            'p-3',
            'shadow-xl')

        productCard.innerHTML = `
                    <figure class="h-[350px]">
                        <img class="size-full object-contain object-center"
                            src="${product.image}"
                            alt="image of ${product.name}">
                    </figure>

                    <figcaption class="mt-2 space-y-3 p-2">
                        <h2 class="text-2xl font-semibold">${product.name}</h2>

                        <p class="text-sm text-gray-400">${product.description}</p>

                        <p class="text-3xl font-bold text-blue-500">
                            <i class="fa-solid fa-dollar-sign"></i>
                            ${product.price}
                        </p>
                        
                        <button
                            class="add-to-cart bg-blue-500 text-white w-full rounded-lg py-3 cursor-pointer hover:opacity-70 active:scale-95 duration-300"
                        >
                            <i class="fa-solid fa-cart-plus"></i>
                            Add To Cart
                        </button>
                    </figcaption>
                `

        productCard.querySelector('.add-to-cart')
            .addEventListener('click', () =>
                addToCart(product)
            )

        productsContainer.appendChild(productCard)
    });
}

// function to calculate shopping cart items declared here
function calculateCartItems(shoppingCart) {
    const cartProductCounter = document.getElementById('cart-product-counter')

    cartProductCounter.innerHTML = shoppingCart.reduce((count, item) => count += item.quantity, 0)
}

// function to add product to cart declared here
function addToCart(product) {
    let shoppingCart = JSON.parse(localStorage.getItem('shopping-cart')) || []

    if (shoppingCart) {
        const existingProduct = shoppingCart.find(cartProduct => cartProduct.id === product.id)

        if (existingProduct) {
            shoppingCart = shoppingCart.map(cartProduct => {
                if (cartProduct.id === product.id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1
                    }
                }

                return cartProduct
            })

            calculateCartItems(shoppingCart)
            localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart))

            alert('Product added to cart!!')
            return
        }

        shoppingCart.push({ ...product, quantity: 1 })
        calculateCartItems(shoppingCart)
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart))

        alert('Product added to cart!!')
        return
    }

    calculateCartItems(shoppingCart)
    localStorage.setItem('shopping-cart', JSON.stringify([{ ...product, quantity: 1 }]))
    alert('Product added to cart!!')
}

showProducts()
calculateCartItems(JSON.parse(localStorage.getItem('shopping-cart')) || [])