
document.addEventListener("DOMContentLoaded", () => {

  // نموذج التبرع بالأكل
  const donateForm = document.getElementById("donateForm");
  if (donateForm) {
    donateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const foodType = document.getElementById("foodType").value;
      const quantity = document.getElementById("quantity").value;
      const isAnon = document.getElementById("anonymous").checked;
      document.getElementById("msg").textContent =
        `تم استلام تبرع ${isAnon ? "سري 🤫" : ""} (${quantity} - ${foodType}). سيتم التواصل قريبًا.`;
      donateForm.reset();
    });
  }

  // عرض قائمة طعام وهمية في صفحة الأكل المتاح
  const foodList = document.getElementById("foodList");
  if (foodList) {
    const data = [
      { name: "وجبة أرز ودجاج", donor: "متبرع كريم", area: "الجيزة" },
      { name: "خضار مطبوخ", donor: "سري 🤫", area: "المهندسين" },
      { name: "بيتزا", donor: "مطعم الخير", area: "الدقي" },
    ];
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p>المنطقة: ${item.area}</p>
        <p>المتبرع: ${item.donor}</p>
        <button class="btn secondary">طلب استلام</button>
      `;
      foodList.appendChild(card);
    });
  }
});
