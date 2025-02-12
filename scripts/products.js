// function to load products from local JSON file declared here
function loadProducts() {
    fetch('../products.json')
        .then(res => res.json())
        .then(products => console.log(products))
}

loadProducts()