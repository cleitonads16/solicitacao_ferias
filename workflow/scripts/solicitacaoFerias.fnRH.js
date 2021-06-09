function fnRH(){
    if (hAPI.getCardValue("sol_rd_tipoContr")=="clt" && 
        hAPI.getCardValue("ger_chk_coord")=="on" && 
        hAPI.getCardValue("gere_rd_aprov")=="sim"){					
		return true;			
	}else{
		return false;
	}
}