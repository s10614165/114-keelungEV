document.addEventListener('DOMContentLoaded', function () {
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  nextBtn.addEventListener('click', function () {
    step1.style.display = 'none';
    step2.style.display = 'block';
  });

  prevBtn.addEventListener('click', function () {
    step2.style.display = 'none';
    step1.style.display = 'block';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const prevStep3 = document.getElementById('prevStep3');

  // 第一步 → 第二步
  nextBtn.addEventListener('click', function () {
    step1.style.display = 'none';
    step2.style.display = 'block';
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

  // Step2 → Step1 回退（原有 prevBtn 已含）
  prevBtn.addEventListener('click', function () {
    step2.style.display = 'none';
    step1.style.display = 'block';
  });
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

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('subsidyForm');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');

  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const prevStep3 = document.getElementById('prevStep3');

  nextBtn.addEventListener('click', () => {
    step1.style.display = 'none';
    step2.style.display = 'block';
  });

  prevBtn.addEventListener('click', () => {
    step2.style.display = 'none';
    step1.style.display = 'block';
  });

  prevStep3.addEventListener('click', () => {
    step3.style.display = 'none';
    step2.style.display = 'block';
  });

  // 表單驗證
  const url = "https://script.google.com/macros/s/AKfycbwq_S6hZg-WLIUWGlQ8frX4kCD5K4pRzflYRVoZBydkdddHgCXsdMSKBsRGselwdxU/exec"; // 替換為你的 Apps Script Web App URL
    document.getElementById("subsidyForm").addEventListener("submit", async function (e) {
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
                shop: form.shop.value,
                subsidyHistory: form.subsidyHistory.value,
                brands: selectedBrands,
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
        };
    
        reader.readAsDataURL(file);
    });
});
