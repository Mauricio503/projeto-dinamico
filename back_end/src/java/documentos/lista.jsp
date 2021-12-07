
  
  <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="components" uri="http://faee.com.br/jsp/components"%>
<%@ taglib prefix="layout" uri="http://faee.com.br/jsp/layout"%>

<layout:template>
	<jsp:body>
			<div class="page-header" style="width: 100%; display: inline-block;">
				<h3>FormaPagamentos</a>
				</h3>
								
			</div>
				
			<div class="table-reponsive">
				<table class="table table-bordered table-hover">
					<thead>
						<tr class="well">
							<th style="width: 100px;">Código</th>
							<th style="width: 36px;">
                <a class="btn btn-xs btn-success" href="${linkTo[FormaPagamentoController].novo}"><span
								  class="glyphicon glyphicon-plus"> </span></a></th>
						</tr>						
					</thead>
					<tbody>
						<c:forEach items="${lista}" var="e">
							<tr>
								<td>${e.codigo}</td>
								<td>
									<a class="btn btn-xs btn-primary" type="button" href="${linkTo[FormaPagamentoController].visualizar[e]}"><span
									class="glyphicon glyphicon-pencil"></span></a>
								</td>
							</tr>						
						</c:forEach>				
					</tbody>
				</table>
			</div>
	</jsp:body>

</layout:template>