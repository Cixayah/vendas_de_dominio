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

    // Adicionar campos para o FormSubmit
    formData.append('_captcha', 'false');
    formData.append('_subject', 'Nova Proposta para Compra de Site: ' + formData.get('domain'));

    // Enviar os dados usando fetch
    fetch('https://formsubmit.co/ajax/dev.gabrielvcosta@gmail.com', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // Resetar o formulário
            form.reset();

            // Mostrar mensagem de sucesso
            successMessage.classList.remove('hidden');

            // Resetar o botão
            submitBtn.disabled = false;
            submitBtn.innerText = 'Enviar Proposta';
        })
        .catch(error => {
            // Mostrar mensagem de erro
            errorMessage.classList.remove('hidden');

            // Resetar o botão
            submitBtn.disabled = false;
            submitBtn.innerText = 'Enviar Proposta';

            console.error('Erro:', error);
        });
});