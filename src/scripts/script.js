let B7Validator = { // objeto com várias funções
    handleSubmit:(event)=> { // recebe o evento
        event.preventDefault(); // parar o evento de submit. previne o comportamento padrão (que é enviar)
        let send = true; // vou enviar o form? sim

        let inputs = form.querySelectorAll('input'); // pegar os inputs dentro do formulário
        
        B7Validator.clearErrors();
        
        for(let i=0;i<inputs.length;i++) { // loop em cada um dos campos para verificar individualmente
            let input = inputs[i];
            let check = B7Validator.checkInput(input); // b7validator chama a função checkinput
            if (check !== true) { // se nao for true
                send = false; // envia falso, nao envia o formulário
                B7Validator.showError(input, check); // exibe o erro
            }
        }

        
        if(send) { // se for enviar o form
            form.submit(); // enviar o formulário
        }
    },
    checkInput:(input) => { // checa cada uma das regras específicas (se houver) nos inputs
        let rules = input.getAttribute('data-rules');
        if(rules !== null) { // se o rulles nao for vazio
            rules = rules.split('|'); // divide no | (arquivo HTML, poderia ser qualquer símbolo)
            for(let k in rules) { // passar em cada uma das regras
                let rDetails = rules[k].split('='); // como pode ter um valor associado a essa regra, dou um split no '='
                switch(rDetails[0]) { // aqui crio cada uma das minhas regras
                    case 'required': // caso o campo seja requerido
                        if(input.value == '') { // se o campo estiver vazio
                            return 'Campo não pode ser vazio.'; // mensagem de retorno
                        }
                    break;
                    case 'min': // caso minimo
                        if(input.value.length < rDetails[1]) {
                            return `Campo deve ter no mínimo ${rDetails[1]} caracteres.`
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                             let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                             if(!regex.test(input.value.toLowerCase())) { // se não for email - "!" negando
                                return 'Necessário digitar um e-mail válido.'
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },

    showError:(input, error) => { // função que exibe o erro
        input.style.borderColor = '#ff0000'; // colocar borda vermelha no campo

        let errorElement = document.createElement('div'); // cria uma div com o erro
        errorElement.classList.add('error'); 
        errorElement.innerHTML = error; // add no html o erro

        input.parentElement.insertBefore(errorElement, input.ElementSibling); // insere o erro antes, porém logo em seguida insere no próximo (sibling)
    },

    clearErrors:() => { // limpa os erros pra não ficar add toda vez que clica no submit
        let inputs = form.querySelectorAll('input');
        for(let i=0; i<inputs.length; i++) { // for para verificar todos os inputs e remover a borda
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error'); 
        for(let i=0; i<errorElements.length; i++) { // for para verificar todos os inputs e remover os erros caso seja preenchido
            errorElements[i].remove();
        }
    }
}

let form = document.querySelector('.b7validator'); // pegar o formulário com a class que precisamos
form.addEventListener('submit', B7Validator.handleSubmit); // Bloqueio no envio (monitorar quando ter um submit)