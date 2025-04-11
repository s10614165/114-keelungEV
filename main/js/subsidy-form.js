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
  form.addEventListener('submit', function (e) {
    const steps = [step1, step2, step3];
    let isValid = true;
    let firstInvalid = null;

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
    }

    // 若全部通過驗證，允許送出
  });
});
