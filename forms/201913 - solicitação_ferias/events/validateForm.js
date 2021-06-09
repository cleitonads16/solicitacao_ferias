function validateForm(form){

    var numAtiv = getValue("WKNumState");
    var logUsuario = getValue("WKUser");

    /*Solicitante*/
    if(numAtiv == 0 || numAtiv == 4){
        if(form.getValue("sol_selc_unidade")=="selecione"){
            throw "<b>Selecione a Unidade e tente enviar novamente.</b>";
        }
        if(form.getValue("sol_txt_codigo")==""){
            throw "<b>O campo C\u00F3digo do Recurso n\u00E3o foi preenchido, preencha o campo e tente enviar novamente.</b>";
        }
        if(form.getValue("sol_rd_tipoContr")==""){
            throw "<b>Selecione uma das op\u00E7\u00F5es em, Tipo de Contrata\u00E7\u00E3o e tente enviar novamente.</b>";
        }
        if(form.getValue("sol_txt_dtIni")==""){
            throw "<b>O campo In\u00EDcio do per\u00EDodo de f\u00E9rias n\u00E3o foi preenchido, preencha o campo e tente enviar novamente.</b>";
        }
        if(form.getValue("sol_txt_dtTerm")==""){
            throw "<b>O campo T\u00E9rmino n\u00E3o foi preenchido, preencha o campo e tente enviar novamente.</b>";
        }
    }
    /*Aprovacao Gerente*/
    if(numAtiv == 15 || numAtiv == 45){
        if(form.getValue("gere_rd_aprov")==""){
            throw "<b>Selecione uma das op\u00E7\u00F5es em, Per\u00EDodo de f\u00E9rias aprovado e tente enviar novamente.</b>";
        }
        if(form.getValue("gere_rd_aprov")=="nao"){
            if(form.getValue("gere_txtArea_just")==""){
                throw "<b>O campo Justifique a reprova\u00E7\u00E3o n\u00E3o foi preenchido, preencha o campo e tente enviar novamente.</b>";
            }
        }
        if(form.getValue("coord_txt_nome")!=""){
            if(form.getValue("ger_chk_coord")=="" || form.getValue("ger_chk_coord")== null){
                throw "<b>Selecione Ciente da decis\u00E3o dos coordenadores, e tente enviar novamente.</b>";
            }
        }
    }
    /*Aprovacao Coordenadores*/
    if(numAtiv == 5 || numAtiv == 40){

        var tabCoord = form.getChildrenIndexes("tb_coordenacao");

        if (tabCoord.length == 0) {
            throw "<b>Clique no Bot\u00E3o para Adicionar Tabela</b>";
        }
        
        for (var i = 0; i < tabCoord.length; i++) {
            if (form.getValue('tab_txt_nome___' + tabCoord[i])=="") {
                throw "<b>O campo Nome do Coordenador n\u00E3o foi preenchido, preencha o campo e tente enviar novamente.</b>";
            }else if (form.getValue('coord_rd_autorz___' + tabCoord[i])=="") {
                throw "<b>Selecione uma das op\u00E7\u00F5es em, Per\u00EDodo de f\u00E9rias aprovado e tente enviar novamente.</b>";
            }else if (form.getValue('coord_rd_autorz___' + tabCoord[i])=="nao") {
                if(form.getValue('tab_txtArea_obs___' + tabCoord[i])==""){
                    throw "<b>Descreva no campo Observa\u00E7\u00F5es o motivo de estar reprovando e tente enviar novamente.</b>";
                }
                    
            }
                
        }   
        
    }
   
}
