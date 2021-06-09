function resolve(process, colleague) {


    //VARIAVEL QUE IRA RECEBER O USUARIO QUE PERTENCE A ATIVIDADE
    var userList = new java.util.ArrayList();
    //VARIAVEL QUE VAI RECEBER O ESTADO DO USUARIO
    var estadoUsuario = "";
    //VARIAVEL QUE VAI RECEBER O PAPEL ESPOSA DO BLOCO
    var papel = "";
    try {
        estadoUsuario = hAPI.getCardValue("sol_selc_unidade");
    } catch (error) {
        estadoUsuario = "ERRO";
    } finally {
    }
    
    if (estadoUsuario == "TSM") {

    	papel = "3";
    }
    else{  

    	papel = "18";  

    	}

    //VARIAVEL QUE RECEBE O FILTRO DO CODIGO DO PAPEL LIDER DO BLOCO NO DATASET workflowColleagueRole
    var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", papel, papel, ConstraintType.MUST);

    var constraints = new Array(c1);
    var dataset = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);

    //BUSCA REGISTRO workflowColleague
    for (i = 0; i < dataset.rowsCount; i++) {

        //VARIAVEL QUE RECEBE O FILTRO DO CODIGO DO GRUPO X LOGIN DA ESPOSA DO BLOCO NO DATASET colleagueGroup
        var eC1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", dataset.getValue(i, "workflowColleagueRolePK.colleagueId"), dataset.getValue(i, "workflowColleagueRolePK.colleagueId"), ConstraintType.MUST);
        var eC2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", estadoUsuario, estadoUsuario, ConstraintType.MUST);

        var datasetHistory = new Array(eC1, eC2);
        var datasetHistory = DatasetFactory.getDataset("colleagueGroup", null, datasetHistory, null);

        //BUSCA REGISTRO colleagueGroup
        for (i2 = 0; i2 < datasetHistory.rowsCount; i2++) {
            //ADICIONA USUARIO NO MECANISMO DE ATRIBUICAO

            //(EVITAR DUPLICIDADE)
            if (!userList.contains(datasetHistory.getValue(i2, "colleagueGroupPK.colleagueId"))) {
                //ADICIONA LIDER DO BLOCO
                userList.add(datasetHistory.getValue(i2, "colleagueGroupPK.colleagueId"));
            }
        }
    }	


   /* //VARIAVEL QUE IRA RECEBER O USUARIO QUE PERTENCE A ATIVIDADE
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
            papel = "3";
            userList.add('Pool:Role:' + papel);
        }
        if (unidadeUsuario == "TSUL") {
            papel = "18";
            userList.add('Pool:Role:' + papel);
        }
     */   
        // SE N�?O ENCONTRAR, ENVIA PARA O PAPEL ´SEM EXECUTOR´
        if (userList.size() == 0 || unidadeUsuario == "ERRO") {
            papel = "20";
            userList.add('Pool:Role:' + papel);
        }
    return userList;
}