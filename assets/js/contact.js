
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = [
    { id: 'name', message: '請填寫姓名或團隊名稱。' },
    { id: 'email', message: '請填寫有效的 Email。', validate: value => /^\S+@\S+\.\S+$/.test(value) },
    { id: 'message', message: '請填寫合作需求內容。' }
  ];

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const error = document.querySelector(`[data-error-for="${field.id}"]`);
      const value = input.value.trim();
      const passed = field.validate ? field.validate(value) : value.length > 0;
      error.textContent = field.message;
      error.classList.toggle('show', !passed);
      if (!passed) valid = false;
    });

    if (!valid) return;

    const result = document.getElementById('formMessage');
    result.classList.add('show');
    result.textContent = '表單驗證成功。這是展示版欄位，之後可串接 EmailJS、Google 表單、Formspree 或校內收件信箱正式使用。';
    form.reset();
  });
});
