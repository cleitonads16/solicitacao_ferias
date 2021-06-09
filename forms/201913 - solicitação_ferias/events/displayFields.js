function displayFields(form, customHTML) {
	setEnabled(form, false);

	function setEnabled(form, lEnable) {
		var hpForm = new java.util.HashMap();

		hpForm = form.getCardData();

		var it = hpForm.keySet().iterator();

		while (it.hasNext()) {
			var key = it.next();
			form.setEnabled(key, lEnable);
		}
	}

	var modo = form.getFormMode();
	if (modo == "ADD" || modo == "MOD") {
		var numAtividade = getValue("WKNumState");
	} else {
		var numAtividade = null;
	}

	// Captura data atual
	var dataTemp = new Date();
	var date = dataTemp.getDate().toString();
	var mes = (dataTemp.getMonth() + 1).toString();
	var hora = dataTemp.getHours().toString() + ":"
			+ dataTemp.getMinutes().toString();
	if (date.length == 1) {
		date = 0 + date;
	}
	if (mes.length == 1) {
		mes = 0 + mes;
	}
	var dataAtual = date + "/" + mes + "/" + dataTemp.getFullYear();

	// Captura Nome do usuario
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",
			getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var constraints = new Array(c1);
	var colaborador = DatasetFactory.getDataset("colleague", null, constraints,
			null);
	var userAtual = getValue("WKUser");

	if (numAtividade == 0 || numAtividade == 4) {// Solicitante
		//campos hidden
		form.setEnabled("rtApiFluigRetUserLogin", true);
		form.setEnabled("rtApiFluigRetUserFullNm", true);
		form.setEnabled("rtApiFluigRetUserIdpId", true);
		
		form.setEnabled("sol_txt_area", true);
		form.setEnabled("sol_txt_localRecurso", true);
		// Nome do usuario
		//form.setValue('sol_txt_nome', colaborador.getValue(0, "colleagueName"));
		form.setEnabled("sol_txt_nome", true);
		// Data atual
		form.setValue('sol_txt_dt', dataAtual);
		// Habilitados
		form.setEnabled("sol_txt_login", true);
		form.setEnabled("sol_selc_unidade", true);
		form.setEnabled("sol_txt_codigo", true);
		form.setEnabled("sol_rd_tipoContr", true);
		form.setEnabled("sol_txt_dtIni", true);
		form.setEnabled("sol_txt_dtTerm", true);
		form.setEnabled("sol_txtArea_obs", true);

	} else if (numAtividade == 5 || numAtividade == 40) {// Coordenadores
		// Nome do usuario
		form.setValue('coord_txt_nome', colaborador
				.getValue(0, "colleagueName"));
		form.setValue("usuarioAtual", colaborador.getValue(0, "colleagueName"));
		// Data atual
		form.setValue('coord_txt_dt', dataAtual);
		// Habilitados
		form.setEnabled("tab_txt_nome", true);
		form.setEnabled("coord_rd_autorz", true);
		form.setEnabled("tab_txtArea_obs", true);

	} else if (numAtividade == 15 || numAtividade == 45) {// Gerentes
		// Nome do usuario
		form
				.setValue('gere_txt_nome', colaborador.getValue(0,
						"colleagueName"));
		// Data atual
		form.setValue('gere_txt_dt', dataAtual);
		// Habilitados
		form.setEnabled("gere_rd_aprov", true);
		form.setEnabled("ger_chk_coord", true);
		form.setEnabled("gere_txtArea_just", true);
	}

	form.setValue("atividade", numAtividade);
	form.setValue("loginUsuario", userAtual);

}