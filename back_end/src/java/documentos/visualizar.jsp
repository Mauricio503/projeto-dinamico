
  
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="layout" uri="http://faee.com.br/jsp/layout"%>

<layout:template>
	<jsp:body>
		<div class="page-header">
			<h3>HorasMaquina <small>Visualizar</small>
			</h3>
			<br />
			<form class="form-horizontal" action="${linkTo[HorasMaquinaController].alterar[entidade]}" method="post"
			id="form">

				<div class="row">
				<c:import url="campos.jsp" />
				</div>
				<div class="row">
					<div class="clearfix form-actions">
						<div class="pull-right">
							<a class="btn btn-default" type="button" href="${linkTo[HorasMaquinaController].novo}">Voltar</a>
							<button class="btn btn-primary" type="submit" name="_method" value="put">Salvar</button> 
							<button class="btn btn-danger" type="submit" name="_method" value="delete">Excluir</button>
						</div>
					</div>
				</div>
				
			</form>
				
		</div>
	</jsp:body>
</layout:template>