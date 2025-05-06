// Aplicar máscara de telefone
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
        value = `(${value}`;
    }

    e.target.value = value;
});

// Enviar formulário
document.getElementById('proposalForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = this;
    const formData = new FormData(form);
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Desabilitar botão durante o envio
    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando...';

    // Ocultar mensagens anteriores
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    // Adicionar campos extras
    formData.append('_captcha', 'false');
    formData.append('_subject', 'Nova Proposta para Compra de Site: ' + formData.get('domain'));

    // Enviar dados
    fetch('https://formsubmit.co/ajax/dev.gabrielvcosta@gmail.com', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            form.reset();
            successMessage.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.innerText = 'Enviar Proposta';
        })
        .catch(error => {
            errorMessage.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.innerText = 'Enviar Proposta';
            console.error('Erro:', error);
        });
});