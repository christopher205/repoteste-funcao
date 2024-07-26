
$(document).ready(function () { 

    let isEditing = false;
    let editData = {};

    $('#CPFben').mask('000.000.000-00');

    //$('#CPF').mask('000.000.000-00');

    $('#modal').on('hidden.bs.modal', function () {
        $('#bodytb').empty()
    })

    $('#formBeneficiario').on('click', function (e) {

        e.preventDefault()

        if ($("#Nomeben").val() === "" || $("#CPFben").val() === "") {
            ModalDialog("Campos obrigatorios", "Preencha todos os campos.");
            return;
        }

        const url = window.location.href;
        const divide = url.split('/');
        $.ajax({
            url: urlIncluirBeneficiario,
            method: "POST",
            data: {
                "NOME": $("#Nomeben").val(),
                "CPF": $("#CPFben").val(),
                "IDCLIENTE": divide.pop() || divide.pop()
            },
            error:
                function (r) {
                    if (r.status == 400) { 
                       
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                        
                    }

                    else if (r.status == 500) {
                   
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                        
                    }
                        
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    $("#formben")[0].reset();
                    $('#bodytb').empty();
                    buscar();
                }

        })
    });

    $("#beneficiarios").on("click", buscar)

    $(document).on('click', '.editar', function () {
        if (!isEditing) {

            $('#CPF').unmask();

            var nome = $(this).data('nome');
            var cpf = $(this).data('cpf');
            $('#Nomeben').val(nome);
            $('#CPFben').val(cpf);

            $('#CPFben').mask('000.000.000-00');


            editData = {
                nome: nome,
                cpf: cpf,
                id: $(this).data('id')
            };

            $('#formBeneficiario').hide(); 
            $('#salvar-edicao').show(); 
            isEditing = true; 
        }
        else {

            $('#formBeneficiario').show(); 
            $('#salvar-edicao').hide(); 
            isEditing = false 
        }
    });

    $('#salvar-edicao').on('click', function (e) {
        e.preventDefault();   

        $.ajax({
            url: urleditarBeneficiario,
            method: "POST",
            data: {
                "ID": editData.id,
                "NOME": $("#Nomeben").val(),
                "CPF": $("#CPFben").val()
            },
            error:
                function (r) {
                    if (r.status == 400) { 
                        $('#formBeneficiario').show();
                        $('#salvar-edicao').hide(); 
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                        
                    }
                    else if (r.status == 500) { 
                        $('#formBeneficiario').show();
                        $('#salvar-edicao').hide(); 
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                        
                    }
                       
                },
            success:
                function (r) { 
                    $('#formBeneficiario').show();
                    $('#salvar-edicao').hide(); 
                    $('#bodytb').empty();
                    buscar();
                    ModalDialog("Sucesso!", r)
                    
                }

        })
    });

    $(document).on('click', '.excluir', function (e) {
        e.preventDefault();

        const id = $(this).data('id');
        const $linha = $(this).closest('tr'); 

        $.ajax({
            url: urlExcluirBeneficiario,
            method: "POST",
            data: {
                "ID": $(this).attr('data-id')
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    $linha.remove();
                    ModalDialog("Sucesso!", r)
                }

        })
    });

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function addLinhas(nome, cpf, id) {
    const html = `
          <tr>
            <td>${cpf}</td>
            <td>${nome}</td>
            <td align="right">
              <button type="button" class="btn btn-primary editar" data-nome="${nome}" data-cpf="${cpf}" data-id="${id}" >Editar</button>
              <button type="button" class="btn btn-primary excluir" data-id="${id}" >Excluir</button>
            </td>
          </tr>
        `;
    $('#bodytb').append(html);
}
function buscar() {
    $.ajax({
        url: urlBuscarTodosBeneficiarios,
        method: "POST",
        error:
            function (r) {
                if (r.status == 400)
                    console.log("erro", r.responseJSON)
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                r.Records.forEach(function (item) {
                    addLinhas(item.Nome, item.CPF, item.Id);
                });
            }

    })
}