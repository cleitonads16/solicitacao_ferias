function fnPjCoopTsul(){
	if (hAPI.getCardValue("sol_selc_unidade")=="TSUL" && 
	    	hAPI.getCardValue("sol_rd_tipoContr")=="pj" && 
	        hAPI.getCardValue("ger_chk_coord")=="on" && 
	        hAPI.getCardValue("gere_rd_aprov")=="sim"){					
	        return true;			
	    }
	    if (hAPI.getCardValue("sol_selc_unidade")=="TSUL" &&
	    	hAPI.getCardValue("sol_rd_tipoContr")=="coop" && 
	        hAPI.getCardValue("ger_chk_coord")=="on" && 
	        hAPI.getCardValue("gere_rd_aprov")=="sim"){					
	        return true;			
	    }else{
	        return false;
	    }
}