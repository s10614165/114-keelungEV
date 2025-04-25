document.addEventListener('DOMContentLoaded', function () {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const prevStep3 = document.getElementById("prevStep3");

  let currentStep = 1;
  updateProgressUI(currentStep);

  nextBtn?.addEventListener("click", () => {
    step1.style.display = "none";
    step2.style.display = "block";
    currentStep = 2;
    updateProgressUI(currentStep);
  });

  prevBtn?.addEventListener("click", () => {
    step2.style.display = "none";
    step1.style.display = "block";
    currentStep = 1;
    updateProgressUI(currentStep);
  });

  const nextToStep3 = document.querySelector(
    "#step2 .form-nav button[type='button']:not(#prevBtn)"
  );
  nextToStep3?.addEventListener("click", () => {
    step2.style.display = "none";
    step3.style.display = "block";
    currentStep = 3;
    updateProgressUI(currentStep);
  });

  prevStep3?.addEventListener("click", () => {
    step3.style.display = "none";
    step2.style.display = "block";
    currentStep = 2;
    updateProgressUI(currentStep);
  });

  // 顯示上傳檔案名稱
  document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function () {
      const filenameSpan = document.getElementById(this.id + '-name');
      if (this.files.length > 0) {
        filenameSpan.textContent = this.files[0].name;
      } else {
        filenameSpan.textContent = '尚未選擇檔案';
      }
    });
  });

  // 表單驗證
  const url = "https://script.google.com/macros/s/AKfycbzOWeOKdJcmmS5eVdNTNhtuoq_EvDmQm1S_EeqbpG68TOo83a64Cq_KvV4PEfD6o76y/exec"; // 替換為你的 Apps Script Web App URL
  document.getElementById("subsidyForm").addEventListener("submit", async function (e) {
    const steps = [step1, step2, step3];
    let isValid = true;
    let isEmail = true;
    let firstInvalid = null;
    let firstEmailErr = null;

    for (const step of steps) {
      const fields = step.querySelectorAll('input, select, textarea');
      const checkedGroups = new Set();

      for (const field of fields) {
        const type = field.type;
        const tag = field.tagName;

        if (
          (type === 'text' || type === 'email' || type === 'tel' || type === 'number' || tag === 'TEXTAREA') &&
          !field.value.trim()
        ) {
          isValid = false;
          if (!firstInvalid) firstInvalid = field;
          break;
        }

        if (type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value.trim())) {
            isEmail = false;
            if (!firstEmailErr) firstEmailErr = field;
            break;
          }
        }

        if (type === 'file' && field.files.length === 0) {
          isValid = false;
          if (!firstInvalid) firstInvalid = field;
          break;
        }

        if ((type === 'radio' || type === 'checkbox') && !checkedGroups.has(field.name)) {
          const group = step.querySelectorAll(`input[name="${field.name}"]`);
          const anyChecked = Array.from(group).some(f => f.checked);
          if (!anyChecked) {
            isValid = false;
            if (!firstInvalid) firstInvalid = group[0];
            break;
          }
          checkedGroups.add(field.name);
        }

        if (tag === 'SELECT' && !field.value) {
          isValid = false;
          if (!firstInvalid) firstInvalid = field;
          break;
        }
      }

      if (!isValid) {
        e.preventDefault();
        step1.style.display = 'none';
        step2.style.display = 'none';
        step3.style.display = 'none';
        step.style.display = 'block';

        alert('請確認所有欄位皆已完整填寫。');
        if (typeof firstInvalid.scrollIntoView === 'function') {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
        return;
      }

      if(!isEmail) {
        e.preventDefault();
        step1.style.display = 'none';
        step2.style.display = 'none';
        step3.style.display = 'none';
        step.style.display = 'block';

        alert('請確認Email格式填寫正確。');
        if (typeof firstEmailErr.scrollIntoView === 'function') {
          firstEmailErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstEmailErr.focus();
        }
        return;

      }
    }

    // 若全部通過驗證，允許送出


    e.preventDefault();

    const form = e.target;
    const selectedBrands = Array.from(document.querySelectorAll('input[name="brand[]"]:checked'))
                        .map(checkbox => checkbox.value);

    console.log(selectedBrands); // 例如：["SANYANG 三陽", "KYMCO 光陽"]

    const file = document.getElementById("file-id").files[0];
    const reader = new FileReader();

    reader.onload = async function (event) {
        const base64Data = event.target.result.split(',')[1]; // 去除 data:mime/type;base64, 前綴

        const payload = {
            company: form.company.value,
            taxId: form.taxId.value,
            district: form.district.value,
            shop: form.shop.value,
            subsidyHistory: form.subsidyHistory.value,
            brands: selectedBrands,
            regAddress: form.regAddress.value,
            commAddress: form.commAddress.value,
            estDate: form.estDate.value,
            ownerName: form.ownerName.value,
            ownerPhone: form.ownerPhone.value,
            ownerEmail: form.ownerEmail.value,
            contactName: form.contactName.value,
            contactPhone: form.contactPhone.value,
            contactEmail: form.contactEmail.value,
            benefitEv: form.benefitEv.value,
            fileName: file.name,
            mimeType: file.type,
            fileData: base64Data,
        };

        const response = await fetch(url, {
            method: "POST",
            contentType: "application/json",
            body: JSON.stringify(payload),
        });

        const text = await response.text();
        alert(text); // 顯示成功或錯誤訊息

        // 成功送出後清除表單資料
        form.reset();

        // 清除顯示的檔案名稱
        document.querySelectorAll('span[id$="-name"]').forEach(span => {
          span.textContent = '尚未選擇檔案';
        });

        window.location.href = 'subsidy.html';
    };

    reader.readAsDataURL(file);
  });
  
});

// =======================
// 🔹 進度條狀態切換控制
// =======================
function updateProgressUI(currentStep) {
  const steps = document.querySelectorAll(".step-progress .step");

  steps.forEach((step, index) => {
    const stepNum = index + 1;
    step.classList.remove("finished", "current", "upcoming");

    // 移除舊的 .step-bar 或 .step-bar-wrapper（保險）
    const oldBar = step.querySelector(".step-bar, .step-bar-wrapper");
    if (oldBar) oldBar.remove();

    if (stepNum < currentStep) {
      step.classList.add("finished");

      // 加入已完成的 bar
      const finishedBar = document.createElement("div");
      finishedBar.classList.add("step-bar");
      step.insertBefore(finishedBar, step.querySelector(".step-label"));
    } else if (stepNum === currentStep) {
      step.classList.add("current");

      // 加入帶有騎士的 bar-wrapper
      const wrapper = document.createElement("div");
      wrapper.classList.add("step-bar-wrapper");

      const road = document.createElement("div");
      road.classList.add("step-road");

      const rider = document.createElement("img");
      rider.classList.add("step-rider");
      rider.src = "../asset/img/rider.png";
      rider.alt = "rider";

      wrapper.appendChild(road);
      wrapper.appendChild(rider);

      step.insertBefore(wrapper, step.querySelector(".step-label"));
    } else {
      step.classList.add("upcoming");

      // 加入尚未完成的 bar
      const upcomingBar = document.createElement("div");
      upcomingBar.classList.add("step-bar");
      step.insertBefore(upcomingBar, step.querySelector(".step-label"));
    }
  });
}

