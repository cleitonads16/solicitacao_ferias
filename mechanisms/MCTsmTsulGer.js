function resolve(process, colleague) {

    //VARIAVEL QUE IRA RECEBER O USUARIO QUE PERTENCE A ATIVIDADE
    var userList = new java.util.ArrayList();
    //VARIAVEL QUE VAI RECEBER A UNIDADE DO USUARIO CORRENTE
    try {
        var unidadeUsuario = hAPI.getCardValue("sol_selc_unidade");
    } catch (error) {
        var unidadeUsuario = "ERRO";
    } finally {
    }
    var papel;

    //PAPEIS REFERENTE AOS UNIDADES

        if (unidadeUsuario == "TSM") {
            papel = "2";
            userList.add('Pool:Role:' + papel);
        }
        if (unidadeUsuario == "TSUL") {
            papel = "17";
            userList.add('Pool:Role:' + papel);
        }
        
        // SE N�?O ENCONTRAR, ENVIA PARA O PAPEL ´SEM EXECUTOR´
        if (userList.size() == 0 || unidadeUsuario == "ERRO") {
            papel = "20";
            userList.add('Pool:Role:' + papel);
        }
    return userList;
}