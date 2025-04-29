//插入Navbar
document.addEventListener("DOMContentLoaded", function () {
  const navbarTarget = document.getElementById("navbar-placeholder");

  if (navbarTarget) {
    fetch("../html/navbar.html")
      .then((res) => {
        if (!res.ok) throw new Error("Navbar HTML 載入失敗");
        return res.text();
      })
      .then((html) => {
        navbarTarget.innerHTML = html;

          // 漢堡按鈕控制側邊選單
        const menuIcon = document.getElementById('menuIcon');
        const sideMenu = document.getElementById('sideMenu');
        const overlay = document.getElementById('overlay');

        // 點擊漢堡圖示
        menuIcon.addEventListener('click', function () {
          sideMenu.classList.toggle('open');
          overlay.classList.toggle('active');
        });

        // 點擊 overlay 收合
        overlay.addEventListener('click', function () {
          sideMenu.classList.remove('open');
          overlay.classList.remove('active');
        });

        // 若點擊 nav-link 也要收合
        document.querySelectorAll('.side-menu a').forEach(link => {
          link.addEventListener('click', () => {
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
          });
        });
      })
      .catch((err) => {
        console.error("載入 navbar 發生錯誤：", err);
      });
  }

});




