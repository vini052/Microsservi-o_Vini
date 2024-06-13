document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');

    paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const paymentData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            cardNumber: document.getElementById('cardNumber').value,
            cardExpiration: document.getElementById('cardExpiration').value,
            cardOwner: document.getElementById('cardOwner').value,
            cvv: document.getElementById('cvv').value
        };

        try {
            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(paymentData)
            });

            if (response.ok) {
                alert('Pagamento Bem Efetuado');
                window.location.href = '/';
            } else {
                alert('Erro no pagamento, tente novamente');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro no pagamento, tente novamente');
        }
    });
});
