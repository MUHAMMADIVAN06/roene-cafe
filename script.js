const menus = [
  {
    name: "Bakmi Kuah Jogja",
    price: "Rp 25.000",
    image: "images/bakmi_kuah_jogja.jpeg"
  },

  {
    name: "Daun Bayam Krispi",
    price: "Rp 10.000",
    image: "images/daun_bayam_krispi.png"
  },

  {
    name: "Nasi Daun Jeruk Kulit Ayam",
    price: "Rp 18.000",
    image: "images/nasi_daun_jeruk_kulit_ayam.png"
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