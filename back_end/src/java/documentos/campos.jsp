
  
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="components" uri="http://faee.com.br/jsp/components"%>
<script type="text/javascript">
,,	

</script>

<input type="hidden" name="entidade.codigo" value="${entidade.codigo}" />
	undefined

,<components:inputNovo type="number" name="entidade.tempoCredito" id="" 
		label="tempoCredito" value="${entidade.tempoCredito}" divClass="col-sm-3"></components:inputNovo>

,<components:selectNovo label="moeda" i18n="false" id="" value="${entidade.moeda}" 
			name="entidade.moeda" itens="${moedaList}" divClass="col-sm-6"></components:selectNovo>



	,,	
