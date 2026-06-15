const menus = [
  {
    name: "Bakmi Kuah Jogja",
    price: "Rp 25.000",
    image: "images/bakmi_kuah_jogja.jpeg"
  },

  {
    name: "Thai Tea",
    price: "Rp 10.000",
    image: "images/thai-tea.jpeg"
  },

  {
    name: "Matcha",
    price: "Rp 15.000",
    image: "images/matcha.jpeg"
  },

  {
    name: "Daun Bayam Krispi",
    price: "Rp 10.000",
    image: "images/daun_bayam_krispi.png"
  },

  {
    name: "Kopi Susu Gula Aren",
    price: "Rp 12.000",
    image: "images/es-kopi-susu-gula-aren.jpeg"
  },

  {
    name: "Nasi Daun Jeruk Kulit Ayam",
    price: "Rp 18.000",
    image: "images/nasi_daun_jeruk_kulit_ayam.png"
  },

  {
    name: "Lemon Squash",
    price: "Rp 7.000",
    image: "images/lemon-squash.jpeg"
  },

  {
    name: "Nasi Goreng",
    price: "Rp 22.000",
    image: "images/nasi_goreng.png"
  }
];

const menuContainer = document.getElementById("menuContainer");

menus.forEach(menu => {

  menuContainer.innerHTML += `
  
    <div class="menu-card">
    
      <img src="${menu.image}">
      
      <div class="menu-content">
      
        <h3>${menu.name}</h3>
        
        <p class="price">${menu.price}</p>
      
      </div>
    
    </div>
  
  `;
});