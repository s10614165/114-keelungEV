document.addEventListener('DOMContentLoaded', function () {
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const step4 = document.getElementById('step4');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const prevStep3 = document.getElementById('prevStep3');
  const prevStep4 = document.getElementById('prevStep4');

  // 第一步 → 第二步
  nextBtn.addEventListener('click', function () {
    step1.style.display = 'none';
    step2.style.display = 'block';
  });

  // 第二步 → 第一步
  prevBtn.addEventListener('click', function () {
    step2.style.display = 'none';
    step1.style.display = 'block';
  });

  // 第二步 → 第三步
  const nextToStep3 = document.createElement('button');
  nextToStep3.textContent = '下一步';
  nextToStep3.type = 'button';
  nextToStep3.addEventListener('click', function () {
    step2.style.display = 'none';
    step3.style.display = 'block';
  });

  // 插入第二步按鈕列中
  document.querySelector('#step2 .form-nav').insertBefore(nextToStep3, document.querySelector('#step2 .form-nav button[type="submit"]'));

  // 上一步 Step 3 → Step 2
  prevStep3.addEventListener('click', function () {
    step3.style.display = 'none';
    step2.style.display = 'block';
  });

  // 第三步 → 第四步
  const nextToStep4 = document.createElement('button');
  nextToStep4.textContent = '下一步';
  nextToStep4.type = 'button';
  nextToStep4.addEventListener('click', function () {
  step3.style.display = 'none';
  step4.style.display = 'block';
  });

  // 插入第三步按鈕列中
  document.querySelector('#step3 .form-nav').insertBefore(nextToStep4, document.querySelector('#step3 .form-nav button[type="submit"]'));

  // 上一步 Step 4 → Step 3
  prevStep4.addEventListener('click', function () {
    step4.style.display = 'none';
    step3.style.display = 'block';
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
  const url = "https://script.google.com/macros/s/AKfycbzr7aP0W9J6wP0kZFqydFdJSXbHN-lZpoRkxpaYBMFDd6aoCZTc_oE5dmvghK2awSIT/exec"; // Apps Script Web App URL
  document.getElementById("subsidyForm").addEventListener("submit", async function (e) {
    const steps = [step1, step2, step3, step4];
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
        step4.style.display = 'none';
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
        step4.style.display = 'none';
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

    const selectedApplied = Array.from(document.querySelectorAll('input[name="applied[]"]:checked'))
    .map(checkbox => {
        if (checkbox.value === "曾申請且核定通過") {
            return checkbox.value + ", " + document.querySelector('input[name="approvedYear"]').value + ", " + document.querySelector('input[name="approvedAgency"]').value + ", " + document.querySelector('input[name="approvedProject"]').value;
        } else if (checkbox.value === "曾申請但未通過") {
            return checkbox.value + ", " + document.querySelector('input[name="notApprovedYear"]').value + ", " + document.querySelector('input[name="notApprovedAgency"]').value + ", " + document.querySelector('input[name="notApprovedProject"]').value;
        } else {
            return checkbox.value;
        }
    });

    const selectedSupports = Array.from(document.querySelectorAll('input[name="tranSupport[]"]:checked'))
                        .map(checkbox => checkbox.value);

    const selectedApplyBrands = Array.from(document.querySelectorAll('input[name="applyBrand[]"]:checked'))
    .map(checkbox => checkbox.value);


    console.log(selectedBrands); // 例如：["SANYANG 三陽", "KYMCO 光陽"]


    // 收集所有 file input（設定有多個 input，每個 input 上傳一個檔案對應欄位）
    const fileInputs = [
      ...document.querySelectorAll('input[type="file"]')
    ];

    // 收集所有選取的檔案
    const allFiles = fileInputs.flatMap(input => Array.from(input.files));


    try {
        const filePayloads = await Promise.all(allFiles.map(readFileAsBase64));

        const payload = {
            company: form.company.value,
            taxId: form.taxId.value,
            district: form.district.value,
            shop: form.shop.value,
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
            subsidyHistory: form.subsidyHistory.value,
            applies: selectedApplied, 
            priority: form.priority.value,
            supports: selectedSupports,
            greenMobile: form.greenMobile.value,
            applyBrands: selectedApplyBrands,
            totalBudget: form.totalBudget.value,
            greenDesc: form.greenDesc.value,
            greenApply: form.greenApply.value,
            greenOther: form.greenOther.value,
            retainDesc: form.retainDesc.value,
            retainApply: form.retainApply.value,
            retainOther: form.retainOther.value,
            equipDesc: form.equipDesc.value,
            equipApply: form.equipApply.value,
            equipOther: form.equipOther.value,
            askCustomers: form.askCustomers.value,
            fixEvNum: form.fixEvNum.value,
            evTrainees: form.evTrainees.value,
            evStaffs: form.evStaffs.value,
            benefitEv: form.benefitEv.value,
            evHardware: form.evHardware.value,
            evSoftware: form.evSoftware.value,
            files: filePayloads, 
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
    } catch (error) {
      console.error("檔案讀取失敗", error);
      alert("檔案讀取失敗，請重新嘗試。");
    }

    reader.readAsDataURL(file);
  });
  
});

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
          const base64Data = event.target.result.split(',')[1];
          resolve({
              fileName: file.name,
              mimeType: file.type,
              fileData: base64Data,
          });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
  });
}

function toggleApproved(checkbox) {
  document.getElementById("approvedFields").style.display = checkbox.checked ? "block" : "none";
}
function toggleNotApproved(checkbox) {
  document.getElementById("notApprovedFields").style.display = checkbox.checked ? "block" : "none";
}


