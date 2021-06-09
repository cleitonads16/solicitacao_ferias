$(window).load(function() {
	var ativ = $("#atividade").val();
	var atualUser = $("#usuarioAtual").val();

	// Desabilita botão excluir tabela coordenadores
	$(btn_excluir).attr('disabled', true);

	// Oculta div
	$(".div_clonado").hide();
	$(".div_checkCoord").hide();

	// Insere calendario nos campos datas
	var onlyTime = FLUIGC.calendar('.date', {
		pickDate : true,
		pickTime : false

	});
	if (ativ == 0 || ativ == 4) { // Solicitante
		scrollForm("#solicitante");
		// REQUISICAO AJAX PRA RETORNO DE DADOS DO USUARIO QUE FEZ LOGIN NO FLUIG
		$.ajax({  // url : parent.WCMAPI.getServerURL() + '/api/public/2.0/users/getCurrent',
			url : window.location.protocol + '//' + window.location.host + '/api/public/2.0/users/getCurrent',
			type : 'GET',
			dataType : 'json',
			async : false,
			crossDomain: true,
			contentType: "application/json; charset=utf-8",
			success : function(data) {
				console.log("Sucess Retorno: " + data.content.login);
				$("#rtApiFluigRetUserLogin").val(data.content.login);
				$("#rtApiFluigRetUserFullNm").val(data.content.fullName);
				$("#rtApiFluigRetUserIdpId").val(data.content.extData.idpId);
			},
			error : function(msg) {
				log.info("****Não funcionou********" + msg);
				return false;
			}
		});
		
		//CHAMA DATASET PRA CONSULTA DE RECURSOS PROTHEUS
		var dsRecursosRest = DatasetFactory.getDataset('dsConsultRestRecursos', null, null, null);// Dataset_de_Consulta
		var objeto = JSON.parse(dsRecursosRest.values[0].jsonString.replace( /\s\s+/g, ''));
		
		//CRIACAO DE FILTRO DENTRO DO JSON RETORNADO
		var arrayFiltro = objeto.recursos.filter (function(elemento){
			return elemento.codigo == $("#rtApiFluigRetUserIdpId").val() && elemento.status == "1=Ativo";
		})

		if(arrayFiltro.length == 0){
			FLUIGC.toast({
				title: "Atenção",
				message: 'Usuário não retornado da base de dados.',
				type: 'warning',
				timeout: 10000
			});
		}

		//PREENCHIMENTO DOS CAMPOS COM OS VALORES RETORNADOS DO JSON
		$("#sol_txt_codigo").val(arrayFiltro[0].codigo);
		$("#sol_txt_nome").val(arrayFiltro[0].nome);
		$("#sol_txt_area").val(arrayFiltro[0].area);
		$("#sol_txt_localRecurso").val(arrayFiltro[0].local);

	} else if (ativ == 15 || ativ == 45) { // Aprovacao Gerente
		if (!$('#collapseGerencia').hasClass('in')) {
			$('#collapseGerencia').collapse('show');
		}

		// Clona div
		$(".div_clone").clone().appendTo(".div_clonado");

		$(".gere_rd_aprov").change(function() {
			if (this.value == "nao") {
				$(".labelJustGer").html("Justifique a reprova\u00E7\u00E3o");
			} else {
				$(".labelJustGer").html("Observa\u00E7\u00F5es");
			}
		});
		cloneDiv();
		clearRadio();
		scrollForm("#gerencia");

	} else if (ativ == 5 || ativ == 40) {// Coordenadores validam data
		if (!$('#collapseDatas').hasClass('in')) {
			$('#collapseDatas').collapse('show');
		}

		// Oculta divi de botão enviar
		window.parent.$(".btn-group").hide();

		// Adciona Tabela
		$("#add_btn_tbCoord").on(
				"click",
				function() {
					window.parent.$(".btn-group").show();
					var index = wdkAddChild('tb_coordenacao');
					cloneDiv();
					$('#tab_txt_nome___' + index).val(atualUser);
					$('#btn_excluir___' + index).attr('disabled', false);
					$(".fluig-style-guide,.fs-display-block,.fs-md-space").css(
							"cssText", "padding: 1px !important;");
				});

		scrollForm("#coordenacao");

	}

	/*
	 * Mantem o colapse aberto se estiver preenchido: Analise de datas
	 * Coordenadores
	 */
	if ($.trim($('.coord_txt_nome').val()) != ""
			|| $.trim($('.coord_txt_nome').text()) != "") {
		if (!$('#collapseDatas').hasClass('in')) {
			$('#collapseDatas').collapse('show');
		}
	}
	/* Aprovacao Gerente */
	if ($.trim($('.gere_txt_nome').val()) != ""
			|| $.trim($('.gere_txt_nome').text()) != "") {
		if (!$('#collapseGerencia').hasClass('in')) {
			$('#collapseGerencia').collapse('show');
		}
	}

	/* Mantem divs ocultas ou visiveis em outras atividades */
	$(".gere_rd_aprov").each(
			function(i, e) {
				if (e.checked == true) {
					if (this.value == "nao") {
						$(".labelJustGer").html(
								"Justifique o motivo de n&atilde;o aprovar");
					} else {
						$(".labelJustGer").html("Observa&ccedil;&otilde;es");
					}
				}
			});

	// Funcao scroll
	function scrollForm(target) {
		$target = $(target);
		var x = setTimeout(function() {
			$('html, body').animate({
				scrollTop : $target.offset().top
			}, 1500), 'swing', function() {
				window.location.hash = target;
			};
		}, 600);
	}

	function clearRadio() {
		$('input[name="gere_rd_aprov"]').prop('checked', false);
	}

	function cloneDiv() {
		var tab = document.getElementById("tb_coordenacao");
		var linha = tab.rows;
		for (var i = 0; i < linha.length; i++) {
			if (i > 1) {
				$(".div_clonado").show();
				$(".div_checkCoord").show();
			}
		}
	}

});
//=======================================================================================
//CHAMA AJAX
//function recebDadosFluig() {};

// Remove linha de tabela coordenadores
function removTb(d) {
	$(d).closest("tr").remove();
}

// Transforma string em data
function gerarData(str) {
	var partes = str.split("/");
	return new Date(partes[2], partes[1] - 1, partes[0]);
}

// Faz a comparacao das datas
function comparaDatas() {

	var inicio = $('#sol_txt_dtIni').val();
	var termino = $('#sol_txt_dtTerm').val();

	if (gerarData(termino) <= gerarData(inicio)) {

		FLUIGC.message
				.alert({
					message : 'A data de T\u00E9rmino n\u00E3o pode ser igual ou inferior a data de In\u00EDcio do Per\u00EDodo de F\u00E9rias.',
					title : 'ALERTA!',
					label : 'OK'
				});
	}
}
