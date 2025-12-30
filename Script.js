// مثال على زر التبرع بالسرية
document.addEventListener("DOMContentLoaded", function() {
  const donateButtons = document.querySelectorAll(".btn.primary");
  donateButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("توجه إلى صفحة التبرع بالأكل. يمكنك اختيار السرية عند رفع التبرع.");
    });
  });
});
