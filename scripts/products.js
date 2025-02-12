// function to load products from local JSON file declared here
function loadProducts() {
    fetch('../products.json')
        .then(res => res.json())
        .then(products => {
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
                        class="bg-blue-500 text-white w-full rounded-lg py-3 cursor-pointer hover:opacity-70 active:scale-95 duration-300">
                            <i class="fa-solid fa-cart-shopping"></i>
                            Add To Cart
                        </button>
                    </figcaption>
                `

                productsContainer.appendChild(productCard)
            });
        })
}

loadProducts()