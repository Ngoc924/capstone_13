var idEdit = null;
var cart = [];
var productArr = [];

function fetchProductList() {
  turnOnLoading();
  axios({
    url: "https://654a4768e182221f8d52e086.mockapi.io/Products",
    method: "GET",
  })
  .then(function (res) {
    console.log('res: ', res);
    productArr = res.data;
    renderProductList(res.data);
    turnOffLoading();
  })
  .catch(function (err) {
    turnOffLoading();
    console.log("😀 - err", err);
  });
}



fetchProductList();

function deleteProduct(id) {
  turnOnLoading();
  axios({
      url: `https://654a4768e182221f8d52e086.mockapi.io/Products/${id}`,
      method: "DELETE",
    })
    .then(function (res) {
      
        fetchProductList();
        
      })
      .catch(function (err) {
        turnOffLoading();
      });
    }
    
    function createProduct() {
      console.log("yes");
      
      var product = getDataForm();
      axios({
        url: "https://654a4768e182221f8d52e086.mockapi.io/Products",
        method: "POST",
        data: product,
      })
      .then(function (res) {
        fetchProductList();
        $("#myModal").modal("hide");
      })
      .catch(function (err) {});
    }
    
    
    function editProduct(id) {
      
      idEdit = id;
      $("#myModal").modal("show");
      
      axios({
        url: `https://654a4768e182221f8d52e086.mockapi.io/Products/${id}`,
        method: "GET",
      })
      .then(function (res) {
        console.log(res.data);
        var product = res.data;
        
        document.getElementById("TenSP").value = product.name;
        document.getElementById("GiaSP").value = product.price;
        document.getElementById("ScreenSP").value = product.screen;
        document.getElementById("BackCameraSP").value = product.backCamera;
        document.getElementById("FrontCameraSP").value = product.frontCamera;
        document.getElementById("HinhSP").value = product.img;
      document.getElementById("MoTaSP").value = product.desc;
      document.getElementById("LoaiSP").value = product.type;
    })
    .catch(function (err) {
      console.log(err);
    });
  }
  
  function updateProduct() {
    var product = getDataForm();
    
    axios({
      url: `https://654a4768e182221f8d52e086.mockapi.io/Products/${idEdit}`,
      method: "PUT",
      data: product,
    })
    .then(function (res) {
      
      fetchProductList();
      $("#myModal").modal("hide");
      
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  

function fetchCart() {
  const cartDataFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
  return cartDataFromLocalStorage;
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify("cart",cart));
}

function addToCart(id) {
  
    const selectedProduct = productArr.find(product => product.id === id);

    if (!selectedProduct) {
        console.error(`Product with id ${id} not found.`);
        return;
    }

    const existingCartItem = cart.find(item => item.id === id);

    if (!existingCartItem) {
      
        const newCartItem = {
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            quantity: 1,
        };
        cart.push(newCartItem);
    } else {
        
        existingCartItem.quantity++;
    }

    
    saveCart(cart);

    
    renderCart(cart);
}


function removeFromCart(id) {
    const indexToRemove = cart.findIndex(item => item.id === id);

    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);
    }

     saveCart(cart);

    renderCart(cart);
}

function updateCartItemQuantity(id, newQuantity) {
    const existingCartItem = cart.find(item => item.id === id);

    if (existingCartItem) {
        existingCartItem.quantity = newQuantity;
    }

   
    saveCart(cart);

    
    renderCart(cart);
}
