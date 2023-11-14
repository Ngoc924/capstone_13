function renderProductList(productArr) {
    var contentHTML = "";
    for (var i = 0; i < productArr.length; i++) {
        var product = productArr[i];
        var trString = `
        <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.screen}</td>
        <td>${product.backCamera}</td>
        <td>${product.frontCamera}</td>
        <td>  <img src="${product.img}" alt="" style="width:100px"> </td>
        <td>${product.desc}</td>
        <td>${product.type}</td>
        <td>
            <button onclick="editProduct('${product.id}')" class="btn btn-warning">Edit</button>
            <button onclick="deleteProduct('${product.id}')" class="btn btn-danger">Delete</button>
            <button onclick="addToCart('${product.id}')" class="btn btn-success">Add to Cart</button>
        </td>
    </tr>
        `;
        contentHTML += trString;
    }
    document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}
function turnOnLoading() {
    document.getElementById("spinner").style.display = "block";
  }
  function turnOffLoading() {
    document.getElementById("spinner").style.display = "none";
  }
  function getDataForm() {
    var ten = document.getElementById("TenSP").value;
    var gia = document.getElementById("GiaSP").value*1;
    var screen = document.getElementById("ScreenSP").value;
    var backCamera = document.getElementById("BackCameraSP").value;
    var frontCamera = document.getElementById("FrontCameraSP").value;
    var hinhAnh = document.getElementById("HinhSP").value;
    var moTa = document.getElementById("MoTaSP").value;
    var loai = document.getElementById("LoaiSP").value;
    return {
      name: ten,
      price: gia,
      screen: screen,
      backCamera: backCamera,
      frontCamera: frontCamera,
      img: hinhAnh,
      desc: moTa,
      type:loai,
    };
  }
  
  
  function renderCart(cart) {
    console.log("yes");
    var contentHTML = "";
    var totalPrice = 0;

 
    if (!cart || cart.length === 0) {
       
        document.getElementById("cartTableBody").innerHTML = '<tr><td colspan="4">Cart is empty.</td></tr>';
        return;
    }

    for (var i = 0; i < cart.length; i++) {
        var cartItem = cart[i];
        var trString = `
            <tr>
                <td>${cartItem.name}</td>
                <td>${cartItem.price}</td>
                <td>
                    <button onclick="decreaseQuantity('${cartItem.id}')">-</button>
                    ${cartItem.quantity}
                    <button onclick="increaseQuantity('${cartItem.id}')">+</button>
                </td>
                <td>${cartItem.price * cartItem.quantity}</td>
            </tr>
        `;
        contentHTML += trString;
        totalPrice += cartItem.price * cartItem.quantity;
    }

    document.getElementById("cartTableBody").innerHTML = contentHTML;
    
    document.getElementById("totalPrice").innerText = totalPrice;
}

function decreaseQuantity(id) {
    const cartItem = cart.find(item => item.id === id);

    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        renderCart(cart);
    }
}

function increaseQuantity(id) {
    const cartItem = cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
        renderCart(cart);
    }
}
