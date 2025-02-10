// Mobile navbar toggle
document.getElementById('btn').addEventListener('click', () => {
    document.getElementById('sideBar').classList.add('active');
  });
  document.getElementById('sideBarMenu').addEventListener('click', () => {
    document.getElementById('sideBar').classList.remove('active');
  });
  