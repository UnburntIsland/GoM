
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const fields = [
    { id: 'name', message: '請填寫姓名或單位。' },
    { id: 'email', message: '請填寫有效的 Email。', validate: value => /^\S+@\S+\.\S+$/.test(value) },
    { id: 'message', message: '請填寫需求內容。' }
  ];
  form.addEventListener('submit', event => {
    event.preventDefault();
    let valid = true;
    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const error = document.querySelector(`[data-error-for="${field.id}"]`);
      const value = input.value.trim();
      const passed = field.validate ? field.validate(value) : value.length > 0;
      if (error) error.textContent = passed ? '' : field.message;
      if (!passed) valid = false;
    });
    if (!valid) return;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const type = document.getElementById('type').value;
    const message = document.getElementById('message').value.trim();
    const subject = '【森循島】永續教育遊戲合作洽詢';
    const body = `姓名或單位：${name}\nEmail：${email}\n合作類型：${type}\n\n需求內容：\n${message}\n\n——\n此信件由森循島官網合作信件產生器建立。`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const result = document.getElementById('formMessage');
    if (result) {
      result.classList.add('show');
      result.textContent = '信件草稿已建立，請在電子郵件應用程式中確認內容後寄出。';
    }
  });
});
