// static/js/scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Animación flip para formularios de login/registro
    const formFlip = document.querySelector('.form-flip');
    if (formFlip) {
        document.getElementById('showRegister')?.addEventListener('click', () => {
            formFlip.classList.add('flipped');
        });
        
        document.getElementById('showLogin')?.addEventListener('click', () => {
            formFlip.classList.remove('flipped');
        });
    }

    // 2. Toggle para mostrar/ocultar contraseña
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (targetInput) {
                if (targetInput.type === 'password') {
                    targetInput.type = 'text';
                    icon?.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    targetInput.type = 'password';
                    icon?.classList.replace('fa-eye-slash', 'fa-eye');
                }
            }
        });
    });

    // 3. Auto-ocultar mensajes flash
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        // Configura el timeout (5 segundos por defecto)
        const timeout = message.dataset.timeout || 5000;
        
        // Cierra al hacer click en la "X"
        const closeBtn = message.querySelector('.flash-close');
        closeBtn?.addEventListener('click', () => {
            fadeOutAndRemove(message);
        });
        
        // Auto-ocultar después del tiempo especificado
        setTimeout(() => {
            fadeOutAndRemove(message);
        }, parseInt(timeout));
    });

    // Función auxiliar para desvanecer y eliminar mensajes
    function fadeOutAndRemove(element) {
        element.style.transition = 'opacity 0.5s ease';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.remove();
            
            // Si no quedan mensajes, elimina el contenedor
            if (document.querySelectorAll('.flash-message').length === 0) {
                document.getElementById('flash-messages')?.remove();
            }
        }, 500);
    }

    // 4. [Opcional] Cerrar todos los mensajes con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.flash-message').forEach(fadeOutAndRemove);
        }
    });
});