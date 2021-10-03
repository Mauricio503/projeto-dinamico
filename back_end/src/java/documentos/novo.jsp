
  
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="components" uri="http://faee.com.br/jsp/components"%>
<%@ taglib prefix="layout" uri="http://faee.com.br/jsp/layout"%>

<layout:template>

	<jsp:attribute name="scriptsEspecificos">
		<script type="text/javascript">
			
		</script>
	</jsp:attribute>
	<jsp:body>
			<div class="page-header">
				<h3>HorasMaquina  <small>Novo</small>
			</h3>
			</div>
			
			<form class="form-horizontal" action="${linkTo[HorasMaquinaController].salvar}" method="post"
			id="form">
				<div class="row">
				<c:import url="campos.jsp" />
				</div>
				<div class="row">
					<div class="clearfix form-actions">
						<div class="pull-right">
						<a class="btn btn-default" type="button" href="${linkTo[HorasMaquinaController].novo}">Voltar</a>
							<button class="btn btn-primary" type="submit">Salvar</button>
						</div>
					</div>
				</div>
			</form>
		
	</jsp:body>
</layout:template>