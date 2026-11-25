// Data awal produk boneka (menggunakan gambar dari Unsplash)
const defaultProducts = [
    {
        id: 1,
        name: "Teddy Bear Klasik Coklat",
        price: 125000,
        image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=500&q=80",
        seller: "Admin Toko"
    },
    {
        id: 2,
        name: "Boneka Kelinci Putih Lembut",
        price: 95000,
        image: "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?auto=format&fit=crop&w=500&q=80",
        seller: "Admin Toko"
    },
    {
        id: 3,
        name: "Beruang Rajut Mini",
        price: 75000,
        image: "https://images.unsplash.com/photo-1562040506-a9b32cb51b94?auto=format&fit=crop&w=500&q=80",
        seller: "Admin Toko"
    },
    {
        id: 4,
        name: "Boneka Alpaca Pastel",
        price: 150000,
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=500&q=80",
        seller: "Admin Toko"
    }
];

// State aplikasi dari localStorage
let products = JSON.parse(localStorage.getItem('plushie_products')) || defaultProducts;
let cart = JSON.parse(localStorage.getItem('plushie_cart')) || [];
let currentUser = localStorage.getItem('plushie_user') || null;

// Format Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// Render Produk ke Halaman
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x220?text=Boneka+Lucu'">
            <div class="product-info">
                <div>
                    <div class="product-title">${product.name}</div>
                    <div class="product-seller">Penjual: ${product.seller}</div>
                    <div class="product-price">${formatRupiah(product.price)}</div>
                </div>
                <button class="btn btn-primary full-width" onclick="addToCart(${product.id})">
                    + Tambah ke Keranjang
                </button>
            </div>
        `;
        productList.appendChild(card);
    });
}

// Render Status Login
function updateAuthUI() {
    const authSection = document.getElementById('auth-section');
    const btnSell = document.getElementById('btn-sell');

    if (currentUser) {
        authSection.innerHTML = `
            <span class="user-badge">Halo, ${currentUser}</span>
            <button class="btn btn-danger" onclick="logout()">Logout</button>
        `;
        btnSell.classList.remove('hidden');
    } else {
        authSection.innerHTML = `
            <button class="btn btn-primary" onclick="openModal('login-modal')">Login</button>
        `;
        btnSell.classList.add('hidden');
    }
}

// Proses Login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    if (username) {
        currentUser = username;
        localStorage.setItem('plushie_user', currentUser);
        updateAuthUI();
        closeModal('login-modal');
        this.reset();
    }
});

// Proses Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('plushie_user');
    updateAuthUI();
}

// Proses Jual Boneka Baru
document.getElementById('sell-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!currentUser) return alert('Silakan login terlebih dahulu!');

    const name = document.getElementById('doll-name').value.trim();
    const price = parseInt(document.getElementById('doll-price').value);
    const image = document.getElementById('doll-image').value.trim();

    const newProduct = {
        id: Date.now(),
        name,
        price,
        image,
        seller: currentUser
    };

    products.unshift(newProduct);
    localStorage.setItem('plushie_products', JSON.stringify(products));
    
    renderProducts();
    closeModal('sell-modal');
    this.reset();
    alert('Boneka berhasil ditambahkan ke katalog!');
});

// Fitur Keranjang Belanja
function addToCart(productId) {
    if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk berbelanja!');
        openModal('login-modal');
        return;
    }

    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveAndRenderCart();
}

function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveAndRenderCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveAndRenderCart();
}

function saveAndRenderCart() {
    localStorage.setItem('plushie_cart', JSON.stringify(cart));
    
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = formatRupiah(totalPrice);

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; color:#636e72;">Keranjang belanja masih kosong.</p>';
        return;
    }

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <strong>${item.name}</strong>
                <div>${formatRupiah(item.price)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Hapus</button>
            </div>
        `;
        cartItems.appendChild(div);
    });
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang masih kosong!');
        return;
    }
    const total = document.getElementById('cart-total').textContent;
    alert(`Terima kasih ${currentUser}! Pesanan Anda sebesar ${total} berhasil diproses.`);
    cart = [];
    saveAndRenderCart();
    closeModal('cart-modal');
}

// Kontrol Modal
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Tutup modal jika klik di luar kotak
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
};

// Inisialisasi saat halaman dimuat
renderProducts();
updateAuthUI();
saveAndRenderCart();
