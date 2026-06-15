/* =========================================================
   ROENE CAFE & RESTO — Menu, Cart, Checkout (WhatsApp)
   ========================================================= */

/* ---------- CONFIG ---------- */
const WA_NUMBER = "6281259669137";

/* Tema warna placeholder per kategori (selaras palet website) */
const CATEGORY_THEME = {
  makanan: { bg: "#c08b5c", accent: "#9e6b43", icon: "🍽" },
  minuman: { bg: "#a87b54", accent: "#7d5836", icon: "🥤" },
  snack:   { bg: "#d6a06b", accent: "#a8784a", icon: "🍟" }
};

/* Bungkus teks panjang jadi 2 baris di dalam SVG */
function wrapMenuName(name) {
  if (name.length <= 18) return [name];
  const words = name.split(" ");
  let line1 = "", line2 = "";
  for (const w of words) {
    if ((line1 + " " + w).trim().length <= 18 && !line2) {
      line1 = (line1 + " " + w).trim();
    } else {
      line2 = (line2 + " " + w).trim();
    }
  }
  return [line1, line2];
}

/* Generate placeholder SVG (data URI) on-brand sesuai kategori & nama menu */
function placeholderImg(menu) {
  const theme = CATEGORY_THEME[menu.category] || CATEGORY_THEME.makanan;
  const lines = wrapMenuName(menu.name);

  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${theme.bg}'/>
          <stop offset='100%' stop-color='${theme.accent}'/>
        </linearGradient>
      </defs>
      <rect width='400' height='300' fill='url(#g)'/>
      <circle cx='200' cy='115' r='52' fill='rgba(255,255,255,0.18)'/>
      <text x='200' y='133' text-anchor='middle'
        font-family='Segoe UI Emoji, Apple Color Emoji, sans-serif'
        font-size='52'>${theme.icon}</text>
      <text x='200' y='220' text-anchor='middle'
        font-family='Playfair Display, Georgia, serif'
        font-size='24' font-weight='700' fill='#fff'>${escapeXml(lines[0])}</text>
      ${lines[1] ? `<text x='200' y='250' text-anchor='middle'
        font-family='Playfair Display, Georgia, serif'
        font-size='24' font-weight='700' fill='#fff'>${escapeXml(lines[1])}</text>` : ""}
      <text x='200' y='280' text-anchor='middle'
        font-family='Poppins, sans-serif'
        font-size='12' letter-spacing='2' fill='rgba(255,255,255,0.85)'>ROENE CAFE &amp; RESTO</text>
    </svg>
  `.trim();

  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

function escapeXml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
  }[c]));
}

/* Fallback umum (dipakai onerror untuk gambar lokal yang gagal dimuat) */
const FALLBACK_IMG = placeholderImg({ category: "makanan", name: "Roene Cafe" });

/* Stub: data menu lama masih memanggil img(...). Sekarang return null
   agar renderer otomatis pakai placeholderImg sesuai kategori & nama. */
const img = () => null;

/* Pilih sumber gambar untuk satu menu */
function getMenuImage(menu) {
  return menu.image || placeholderImg(menu);
}

/* ---------- MENU DATA ---------- */
const menus = [
  /* ============ MAKANAN ============ */
  { id: "m1",  category: "makanan", name: "Nasi Goreng Roene",        price: 25000, image: "images/nasi_goreng.png" },
  { id: "m2",  category: "makanan", name: "Nasi Goreng Jawa",         price: 20000, image: "images/nasi_goreng_jawa.jpeg" },
  { id: "m3",  category: "makanan", name: "Sego Endok",               price: 13000, image: "images/sego-ndog.jpeg" },
  { id: "m4",  category: "makanan", name: "Sego Endok Usus",          price: 20000, image: "images/sego-ndog-usus.jpeg"  },
  { id: "m5",  category: "makanan", name: "Sego Endok Lele",          price: 20000, image: "images/sego-endog-lele.webp" },
  { id: "m6",  category: "makanan", name: "Sego Endok Ati Ampela",    price: 20000, image: "images/sego-endok-ati-ampela.jpeg" },
  { id: "m7",  category: "makanan", name: "Kremes Kampung",           price: 30000, image: "images/kremes-kampung.jpeg" },
  { id: "m8",  category: "makanan", name: "Kremes Potong",            price: 25000, image: "images/kremes-potong.jpg" },
  { id: "m9",  category: "makanan", name: "Rempah Potong",            price: 25000, image: "images/rempah-potong.jpg" },
  { id: "m10", category: "makanan", name: "Rempah Kampung",           price: 30000, image: "images/rempah-kampung.jpeg" },
  { id: "m11", category: "makanan", name: "Bakmi Kuah Jogja",         price: 18000, image: "images/bakmi_kuah_jogja.jpeg" },
  { id: "m12", category: "makanan", name: "Bakmi Goreng Jogja",       price: 18000, image: "images/bakmi-goreng-jawa.jpeg" },
  { id: "m13", category: "makanan", name: "Bihun Goreng",             price: 18000, image: "images/bihun-goreng.jpeg" },
  { id: "m14", category: "makanan", name: "Gurami Asam Manis",        price: 38000, image: "images/gurami-asam-manis.jpeg" },
  { id: "m15", category: "makanan", name: "Gurami Telur Asin",        price: 38000, image: "images/gurami-telur-asin.jpg" },
  { id: "m16", category: "makanan", name: "Gurami Dabu-Dabu",         price: 38000, image: "images/gurami-dabu-dabu.jpg" },
  { id: "m17", category: "makanan", name: "Gurami Goreng",            price: 38000, image: "images/gurami-goreng.jpg" },
  { id: "m18", category: "makanan", name: "Nasi Putih",               price: 5000,  image: "images/nasi-putih.jpg     " },

  /* ============ SNACK ============ */
  { id: "s1", category: "snack", name: "Dimsum",              price: 15000, image: "images/dimsum.jpg" },
  { id: "s2", category: "snack", name: "French Fries",        price: 15000, image: "images/french-fries.jpg" },
  { id: "s3", category: "snack", name: "Tahu Cabe Garam",     price: 15000, image: "images/tahu-cabe-garam.jpeg" },
  { id: "s4", category: "snack", name: "Tahu Walik",          price: 15000, image: "images/tahu-walik.jpg" },
  { id: "s5", category: "snack", name: "Snack Platter",       price: 25000, image: "images/snack-platter.jpeg" },
  { id: "s6", category: "snack", name: "Donut",               price: 15000, image: "images/donut.jpeg" },
  { id: "s7", category: "snack", name: "Pisang Coklat Keju",  price: 15000, image: "images/pisang-coklat-keju.jpg" },
  { id: "s8", category: "snack", name: "Tempe Mendoan",       price: 15000, image: "images/tempe-mendoan.jpg" },
  { id: "s9", category: "snack", name: "Tahu Petis",          price: 15000, image: "images/tahu-petis.jpeg" },

  /* ============ MINUMAN ============ */
  { id: "d1",  category: "minuman", name: "Coffee Latte",          price: 15000, image: "images/coffe-latte.jpeg" },
  { id: "d2",  category: "minuman", name: "Kopi Susu Gula Aren",   price: 15000, image: "images/es-kopi-susu-gula-aren.jpeg" },
  { id: "d3",  category: "minuman", name: "Popcorn Coffee",        price: 15000, image: "images/popcorn-coffe.jpeg" },
  { id: "d4",  category: "minuman", name: "Tiramisu Coffee",       price: 15000, image: "images/tiramisu-coffe.jpg" },
  { id: "d5",  category: "minuman", name: "Hazelnut Coffee",       price: 15000, image: "images/hazelnut-coffe.jpg" },
  { id: "d6",  category: "minuman", name: "Dirty Matcha",          price: 15000, image: "images/matcha.jpeg" },
  { id: "d7",  category: "minuman", name: "Butterscotch Latte",    price: 15000, image: "images/butterscoth.webp" },
  { id: "d8",  category: "minuman", name: "Caramel Latte",         price: 15000, image: "images/caramel-latte.jpg" },
  { id: "d9",  category: "minuman", name: "Lemonade Coffee",       price: 20000, image: "images/lemonade-coffe.jpg" },
  { id: "d10", category: "minuman", name: "Americano",             price: 10000, image: "images/americano.jpeg" },
  { id: "d11", category: "minuman", name: "Kopi Tubruk",           price: 12000, image: "images/kopi-tubruk.jpeg" },
  { id: "d12", category: "minuman", name: "Kopi Tubruk Jahe",      price: 15000, image: "images/kopi-tubruk-jahe.jpeg" },
  { id: "d13", category: "minuman", name: "Vietnam Drip",          price: 15000, image: "images/vietnam-drip.jpg" },
  { id: "d14", category: "minuman", name: "Mango Milk",            price: 15000, image: "images/mango-milk.webp" },
  { id: "d15", category: "minuman", name: "Melon Milk",            price: 15000, image: "images/melon-milk.jpg" },
  { id: "d16", category: "minuman", name: "Strawberry Milk",       price: 15000, image: "images/strawberry-milk.jpeg" },
  { id: "d17", category: "minuman", name: "Caramel Milk",          price: 15000, image: "images/caramel-milk.webp" },
  { id: "d18", category: "minuman", name: "Thaitea",               price: 15000, image: "images/thai-tea.jpeg" },
  { id: "d19", category: "minuman", name: "Taro",                  price: 15000, image: "images/taro.jpg" },
  { id: "d20", category: "minuman", name: "Red Velvet",            price: 15000, image: "images/red-velvet.webp" },
  { id: "d21", category: "minuman", name: "Chocolate",             price: 15000, image: "images/chocolate.jpg" },
  { id: "d22", category: "minuman", name: "Mineral Water",         price: 7000,  image: "images/mineral water.jpeg" },
  { id: "d23", category: "minuman", name: "Tea",                   price: 7000,  image: "images/hot-tea.jpeg" },
  { id: "d24", category: "minuman", name: "Lemon Tea",             price: 13000, image: "images/lemon-tea.jpg" },
  { id: "d25", category: "minuman", name: "Vanila Tea",            price: 13000, image: "images/vanilla-tea.jpg" },
  { id: "d26", category: "minuman", name: "Orange",                price: 15000, image: "images/orange.jpg" },
  { id: "d27", category: "minuman", name: "Milo Roene",            price: 15000, image: "images/milo.jpg" },
  { id: "d28", category: "minuman", name: "Lychee Tea",            price: 15000, image: "images/lychee-tea.jpeg" },
  { id: "d29", category: "minuman", name: "Strawberry Squash",     price: 15000, image: "images/strawberry squash.webp" },
  { id: "d30", category: "minuman", name: "Melon Squash",          price: 15000, image: "images/melon-squash.jpeg" },
  { id: "d31", category: "minuman", name: "Manggo Squash",         price: 15000, image: "images/mango-squash.webp" },
  { id: "d32", category: "minuman", name: "Lemon Squash",          price: 15000, image: "images/lemon-squash.jpeg" },
  { id: "d33", category: "minuman", name: "Wedang Jahe",           price: 13000, image: "images/wedang-jahe.jpg" },
  { id: "d34", category: "minuman", name: "Jahe Sereh",            price: 15000, image: "images/jahe-sereh.webp" },
  { id: "d35", category: "minuman", name: "Susu Jahe",             price: 15000, image: "images/susu-jahe.jpeg" },
  { id: "d36", category: "minuman", name: "Bir Pletok",            price: 15000, image: "images/bir-pletok.webp" }
];

/* ---------- STATE ---------- */
let activeCategory = "makanan";
const cart = {}; // { menuId: { ...menu, qty: number } }

/* ---------- DOM REFS ---------- */
const menuContainer  = document.getElementById("menuContainer");
const menuTabs       = document.getElementById("menuTabs");

const cartFab        = document.getElementById("cartFab");
const cartFabCount   = document.getElementById("cartFabCount");
const cartDrawer     = document.getElementById("cartDrawer");
const cartOverlay    = document.getElementById("cartOverlay");
const cartClose      = document.getElementById("cartClose");
const cartItemsEl    = document.getElementById("cartItems");
const cartTotalEl    = document.getElementById("cartTotal");
const checkoutBtn    = document.getElementById("checkoutBtn");

const checkoutModal  = document.getElementById("checkoutModal");
const checkoutClose  = document.getElementById("checkoutClose");
const checkoutForm   = document.getElementById("checkoutForm");

/* ---------- HELPERS ---------- */
const formatRp = (n) => "Rp " + n.toLocaleString("id-ID");

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

/* ---------- RENDER MENU ---------- */
function renderMenu() {
  const list = menus.filter((m) => m.category === activeCategory);

  menuContainer.innerHTML = list
    .map((m) => {
      const qty = cart[m.id]?.qty || 0;
      const src = getMenuImage(m);
      const fb = placeholderImg(m);
      return `
        <div class="menu-card" data-id="${m.id}">
          <img
            src="${escapeHtml(src)}"
            alt="${escapeHtml(m.name)}"
            loading="lazy"
            onerror="this.onerror=null;this.src=&quot;${fb}&quot;;"
          >
          <div class="menu-content">
            <h3>${escapeHtml(m.name)}</h3>
            <p class="price">${formatRp(m.price)}</p>
            <div class="menu-actions">
              <div class="qty-selector">
                <button type="button" data-action="dec" data-id="${m.id}" aria-label="Kurangi">−</button>
                <span class="qty-value" data-qty="${m.id}">${qty}</span>
                <button type="button" data-action="inc" data-id="${m.id}" aria-label="Tambah">+</button>
              </div>
              <button type="button" class="add-btn" data-action="add" data-id="${m.id}">
                Tambah ke Pesanan
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

/* ---------- TAB SWITCHING ---------- */
menuTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".menu-tab");
  if (!btn) return;
  document.querySelectorAll(".menu-tab").forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.category;
  renderMenu();
});

/* ---------- MENU CARD ACTIONS ---------- */
menuContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.action;

  if (action === "inc" || action === "add") {
    addToCart(id);
  } else if (action === "dec") {
    decrementCart(id);
  }
});

/* ---------- CART OPS ---------- */
function addToCart(id) {
  const menu = menus.find((m) => m.id === id);
  if (!menu) return;
  if (!cart[id]) {
    cart[id] = { ...menu, qty: 1 };
  } else {
    cart[id].qty += 1;
  }
  syncMenuQty(id);
  renderCart();
}

function decrementCart(id) {
  if (!cart[id]) return;
  cart[id].qty -= 1;
  if (cart[id].qty <= 0) delete cart[id];
  syncMenuQty(id);
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  syncMenuQty(id);
  renderCart();
}

function syncMenuQty(id) {
  const el = document.querySelector(`[data-qty="${id}"]`);
  if (el) el.textContent = cart[id]?.qty || 0;
}

/* ---------- RENDER CART ---------- */
function renderCart() {
  const items = Object.values(cart);
  const count = items.reduce((s, it) => s + it.qty, 0);
  const total = items.reduce((s, it) => s + it.qty * it.price, 0);

  cartFabCount.textContent = count;
  cartFabCount.style.display = count > 0 ? "flex" : "none";

  if (items.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Belum ada menu yang dipilih.</p>`;
    checkoutBtn.disabled = true;
  } else {
    cartItemsEl.innerHTML = items
      .map(
        (it) => {
          const src = getMenuImage(it);
          const fb = placeholderImg(it);
          return `
        <div class="cart-item">
          <img
            src="${escapeHtml(src)}"
            alt="${escapeHtml(it.name)}"
            onerror="this.onerror=null;this.src=&quot;${fb}&quot;;"
          >
          <div class="cart-item-info">
            <h4>${escapeHtml(it.name)}</h4>
            <p class="cart-item-price">${formatRp(it.price)}</p>
            <div class="qty-selector">
              <button type="button" data-cart-action="dec" data-id="${it.id}" aria-label="Kurangi">−</button>
              <span class="qty-value">${it.qty}</span>
              <button type="button" data-cart-action="inc" data-id="${it.id}" aria-label="Tambah">+</button>
            </div>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-subtotal">${formatRp(it.qty * it.price)}</span>
            <button type="button" class="cart-item-remove" data-cart-action="remove" data-id="${it.id}" aria-label="Hapus">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      `;
        }
      )
      .join("");
    checkoutBtn.disabled = false;
  }

  cartTotalEl.textContent = formatRp(total);
}

/* Cart drawer item actions */
cartItemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-cart-action]");
  if (!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.cartAction;
  if (action === "inc") addToCart(id);
  else if (action === "dec") decrementCart(id);
  else if (action === "remove") removeFromCart(id);
});

/* ---------- DRAWER OPEN/CLOSE ---------- */
function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

cartFab.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

/* ---------- CHECKOUT MODAL ---------- */
function openCheckout() {
  if (Object.keys(cart).length === 0) return;
  checkoutModal.classList.add("open");
  checkoutModal.setAttribute("aria-hidden", "false");
}

function closeCheckout() {
  checkoutModal.classList.remove("open");
  checkoutModal.setAttribute("aria-hidden", "true");
}

checkoutBtn.addEventListener("click", openCheckout);
checkoutClose.addEventListener("click", closeCheckout);
checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) closeCheckout();
});

/* ---------- WHATSAPP CHECKOUT ---------- */
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name   = checkoutForm.custName.value.trim();
  const wa     = checkoutForm.custWa.value.trim();
  const method = checkoutForm.orderMethod.value;
  const note   = checkoutForm.custNote.value.trim() || "-";

  if (!name || !wa) return;

  const items = Object.values(cart);
  if (items.length === 0) return;

  const total = items.reduce((s, it) => s + it.qty * it.price, 0);

  const lines = items
    .map((it) => `${it.name} x ${it.qty} - ${formatRp(it.qty * it.price)}`)
    .join("\n");

  const message =
    `Halo Roene Cafe & Resto, saya ingin memesan:\n\n` +
    `${lines}\n\n` +
    `Total: ${formatRp(total)}\n\n` +
    `Nama: ${name}\n` +
    `No. WA: ${wa}\n` +
    `Metode Pesanan: ${method}\n` +
    `Catatan: ${note}\n\n` +
    `Terima kasih.`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  closeCheckout();
});

/* ---------- INIT ---------- */
renderMenu();
renderCart();
