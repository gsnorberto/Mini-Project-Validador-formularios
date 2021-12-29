let FormValidator = {
    handleSubmit:(event) => {
        event.preventDefault(); //Previne o comportamento padrão. Que nesse caso é enviar o formulário. Isso porque primeiro é necessário fazer as validações do formulário.
        let send = true; 

        let inputs = form.querySelectorAll('input');

        FormValidator.clearErrors();

        for(let i=0; i < inputs.length; i++){
            let input = inputs[i];
            let check = FormValidator.checkInput(input);

            if(check !== true){
                send = false;
                FormValidator.showError(input, check)
            }
        }

        if(send){
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        // existe alguma regra criada dentro da tag input
        if (rules !== null) {
            //Verificar regras
            rules = rules.split('|'); //separa as regras colocando em um array
            for(let k in rules){
                let rDetails = rules[k].split('=')
                switch(rDetails[0]){
                    // Se o usuário deixou o campo em branco
                    case 'required':
                        if(input.value == ''){
                            return 'Campo não pode ser vazio';
                        }
                    break;
                    //Se o valor digitado pelo usuário é menor do que o mínimo requerido
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo deve ter pelo menos ' +rDetails[1]+' caracteres'
                        }
                    break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Campo de e-mail inválido!'
                            }

                        }
                    break;
                }
            }
        }

        return true;
    },
    showError: (input, msgError) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = msgError;

        //Direciona para o pai do input (o label) e insere as propriedades do "errorElement" antes do próximo elemento do label atual 
        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    clearErrors: () =>{
        //Evitar repetição da mensagem de erro
        let inputs = document.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i<errorElements.length; i++){
            errorElements[i].remove();
        }
    }
}

let form = document.querySelector('.form-validator');
form.addEventListener('submit', FormValidator.handleSubmit) // executa a função quando há um submit no formulário, para bloquear o click do botão antes de fazer a validação