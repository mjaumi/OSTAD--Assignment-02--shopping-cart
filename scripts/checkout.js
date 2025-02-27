let promoCode = ''

// function to load cart products from local storage declared here
function loadCartProducts() {
    const cartProducts = JSON.parse(localStorage.getItem('shopping-cart')) || []

    const checkoutCartContainer = document.getElementById('checkout-cart-container')

    checkoutCartContainer.replaceChildren()

    if (cartProducts.length) {
        cartProducts.forEach(product => {
            const checkoutCard = document.createElement('div')

            checkoutCard.className = 'flex flex-col md:flex-row items-center justify-between gap-5 border-2 border-blue-400 rounded-xl p-2'

            checkoutCard.innerHTML = `
           <div class="flex flex-col md:flex-row text-center md:text-left items-center gap-2">
                <figure class="size-[100px]">
                    <img class="size-full object-contain"
                        src="${product.image}"
                        alt="image of ${product.name})">
                </figure>

                <figcaption>
                    <h2 class="text-xl font-semibold">${product.name}</h2>
                    <p class="text-sm text-gray-400">
                        ${product.description}
                    </p>
                </figcaption>
            </div>

            <div class="flex flex-col md:flex-row items-center gap-3 md:gap-5 lg:gap-10 pr-4">
                <div class="text-center">
                    <p class="text-xs lg:text-sm font-semibold">Unit Price</p>
                    <p class="text-2xl font-semibold text-emerald-400 text-nowrap">
                        <i class="fa-solid fa-dollar-sign"></i>
                        ${product.price}
                    </p>
                </div>

                <div>
                    <p class="text-xs lg:text-sm font-semibold text-center">Quantity</p>
                    <div
                        class="flex items-center justify-center border-2 border-blue-200 rounded-lg overflow-hidden">
                        <button
                            class="decrease-quantity size-[50px] bg-white text-blue-400 text-lg font-semibold cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-100 hover:bg-blue-300 active:scale-95 duration-300"
                            ${product.quantity === 0 ? 'disabled' : ''}
                        >
                            <i class="fa-solid fa-minus"></i>
                        </button>


                        <div
                            class="flex items-center justify-center h-[50px] min-w-[50px] px-2 bg-white font-bold text-center border-x-2 border-blue-200">
                            <p>
                                ${product.quantity}
                            </p>
                        </div>

                        <button
                            class="increase-quantity size-[50px] bg-white text-blue-400 text-lg font-semibold cursor-pointer hover:bg-blue-300 active:scale-95 duration-300">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>

                <div class="text-center">
                    <p class="text-xs lg:text-sm font-semibold">Sub Total</p>
                    <p class="text-2xl font-semibold text-blue-500 text-nowrap">
                        <i class="fa-solid fa-dollar-sign"></i>
                        ${product.price * product.quantity}
                    </p>
                </div>
            </div>
        `

            checkoutCard.querySelector('.decrease-quantity').addEventListener('click', () => updateCart(product.id, 'decrease'))
            checkoutCard.querySelector('.increase-quantity').addEventListener('click', () => updateCart(product.id, 'increase'))

            checkoutCartContainer.appendChild(checkoutCard)
        });

        const promoCodeDiv = document.createElement('div')

        promoCodeDiv.className = 'flex flex-col md:flex-row items-center justify-end gap-5 border-2 rounded-xl border-emerald-400 p-3'

        promoCodeDiv.innerHTML = `
            <input type="text" id="promo-code-input" class="border-2 border-emerald-400 rounded-md px-4 py-2"
               value="${promoCode}" placeholder="Enter promo code...">
            <button type="button"
                class="apply-promo w-full md:w-fit bg-emerald-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:opacity-70 active:scale-95 duration-300">Apply
                Promo Code</button>
        `

        promoCodeDiv.querySelector('.apply-promo').addEventListener('click', () => {
            const promoCodeInput = document.getElementById('promo-code-input')

            promoCode = promoCodeInput.value

            if (promoCode === 'ostad5' || promoCode === 'ostad10') {
                alert('Promo code applied successfully!!')
            } else {
                alert('Invalid promo code!!')
            }

            loadCartProducts()
        })

        checkoutCartContainer.appendChild(promoCodeDiv)

        const subTotalPriceDiv = document.createElement('div')

        subTotalPriceDiv.className = 'flex items-center justify-center md:justify-end gap-5 text-4xl font-bold border-t-2 p-3'

        subTotalPriceDiv.innerHTML = `
        <p>Sub Total</p>
        <p class="text-blue-400">
            <i class="fa-solid fa-dollar-sign"></i>
            ${cartProducts.reduce((total, product) => total += (product.price * product.quantity), 0)}
        </p>
    `

        checkoutCartContainer.appendChild(subTotalPriceDiv)

        const discountedPriceDiv = document.createElement('div')

        discountedPriceDiv.className = 'flex items-center justify-center md:justify-end gap-5 text-4xl font-bold border-t-2 p-3'



        const totalPriceDiv = document.createElement('div')

        totalPriceDiv.className = 'flex items-center justify-center md:justify-end gap-5 text-4xl font-bold border-t-2 p-3'



        if (promoCode) {
            if (promoCode === 'ostad5') {


                const { discountedPrice, totalPrice } = calculatePromoCode(cartProducts.reduce((total, product) => total += (product.price * product.quantity), 0), 5)

                discountedPriceDiv.innerHTML = `
            <p>Discounted Price</p>
            <p class="text-red-400">
                <i class="fa-solid fa-dollar-sign"></i>
                ${discountedPrice}
            </p>
        `

                totalPriceDiv.innerHTML = `
            <p>Total Price</p>
            <p class="text-emerald-400">
                <i class="fa-solid fa-dollar-sign"></i>
                ${totalPrice}
            </p>
        `
            } else if (promoCode === 'ostad10') {
                const { discountedPrice, totalPrice } = calculatePromoCode(cartProducts.reduce((total, product) => total += (product.price * product.quantity), 0), 10)

                discountedPriceDiv.innerHTML = `
            <p>Discounted Price</p>
            <p class="text-red-400">
                <i class="fa-solid fa-dollar-sign"></i>
                ${discountedPrice}
            </p>
        `

                totalPriceDiv.innerHTML = `
            <p>Total Price</p>
            <p class="text-emerald-400">
                <i class="fa-solid fa-dollar-sign"></i>
                ${totalPrice}
            </p>
        `
            } else {
                discountedPriceDiv.innerHTML = `
            <p>Discounted Price</p>
            <p class="text-red-400">
                <i class="fa-solid fa-dollar-sign"></i>
                0
            </p>
        `

                totalPriceDiv.innerHTML = `
            <p>Total Price</p>
            <p class="text-emerald-400">
                <i class="fa-solid fa-dollar-sign"></i>
                ${cartProducts.reduce((total, product) => total += (product.price * product.quantity), 0)}
            </p>
        `
            }
        } else {
            discountedPriceDiv.innerHTML = `
            <p>Discounted Price</p>
            <p class="text-red-400">
                <i class="fa-solid fa-dollar-sign"></i>
                0
            </p>
        `

            totalPriceDiv.innerHTML = `
            <p>Total Price</p>
            <p class="text-emerald-400">
                <i class="fa-solid fa-dollar-sign"></i>
                ${cartProducts.reduce((total, product) => total += (product.price * product.quantity), 0)}
            </p>
        `
        }



        checkoutCartContainer.appendChild(discountedPriceDiv)
        checkoutCartContainer.appendChild(totalPriceDiv)
    } else {
        const noCartProductMessage = document.createElement('p')
        const getBackButton = document.createElement('a')

        noCartProductMessage.className = 'text-center font-bold text-red-500 text-2xl'
        noCartProductMessage.innerText = 'The cart is empty!!'

        getBackButton.href = './index.html'
        getBackButton.className = 'w-fit mx-auto bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:opacity-70 active:scale-95 duration-300'
        getBackButton.innerText = 'Get back to home page'

        checkoutCartContainer.replaceChildren(...[noCartProductMessage, getBackButton])
    }
}

// function to update cart declared here
function updateCart(productId, increaseOrDecrease) {
    let cartProducts = JSON.parse(localStorage.getItem('shopping-cart')) || []

    if (increaseOrDecrease === 'increase') {
        cartProducts = cartProducts.map(cartItem => {
            if (cartItem.id === productId) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                }
            }

            return cartItem
        })

    } else {
        cartProducts = cartProducts.map(cartItem => {
            if (cartItem.id === productId && cartItem.quantity) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity - 1,
                }
            }

            return cartItem
        })
    }

    localStorage.setItem('shopping-cart', JSON.stringify(cartProducts))
    loadCartProducts()
}

// function to implement clear cart declared here
function clearCart() {
    localStorage.removeItem('shopping-cart')
    loadCartProducts()

    alert('Cart has been cleared successfully!!')
}

function calculatePromoCode(subTotal, percentage) {
    const discountedPrice = subTotal * (percentage / 100);
    const totalPrice = subTotal - discountedPrice;

    return { discountedPrice, totalPrice }
}

loadCartProducts()