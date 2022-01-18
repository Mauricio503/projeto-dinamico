const fs = require("fs");

module.exports = (data) => {
  const model = data.nome_tabela.substring(0,1).toUpperCase()+data.nome_tabela.substring(1,100);
  const linkLista= "${linkTo["+model+"Controller].lista}";
  const linkNovo= "${linkTo["+model+"Controller].novo}";
  const varLista="${lista}";
  const varCodigo="${e.codigo}";
  const linkVisualiza="${linkTo["+model+"Controller].visualizar[e]}";
  fs.writeFileSync(__dirname+'/documentos/lista.jsp', `
  
  <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="components" uri="http://faee.com.br/jsp/components"%>
<%@ taglib prefix="layout" uri="http://faee.com.br/jsp/layout"%>

<layout:template>
	<jsp:body>
			<div class="page-header" style="width: 100%; display: inline-block;">
				<h3><fmt:message key="${data.nome_tabela}s"/></a>
				</h3>
								
			</div>
				
			<div class="table-reponsive">
				<table class="table table-bordered table-hover">
					<thead>
						<tr class="well">
							<th style="width: 100px;"><fmt:message key="codigo"/></th>
							<th style="width: 36px;">
                <a class="btn btn-xs btn-success" href="${linkNovo}"><span
								  class="glyphicon glyphicon-plus"> </span></a></th>
						</tr>						
					</thead>
					<tbody>
						<c:forEach items="${varLista}" var="e">
							<tr>
								<td>${varCodigo}</td>
								<td>
									<a class="btn btn-xs btn-primary" type="button" href="${linkVisualiza}"><span
									class="glyphicon glyphicon-pencil"></span></a>
								</td>
							</tr>						
						</c:forEach>				
					</tbody>
				</table>
			</div>
	</jsp:body>

</layout:template>`);

const linkSalvar = "${linkTo["+model+"Controller].salvar}";
fs.writeFileSync(__dirname+'/documentos/novo.jsp', `
  
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
				<h3><fmt:message key="${data.nome_tabela}"/>  <small><fmt:message key="novo"/></small>
			</h3>
			</div>
			
			<form class="form-horizontal" action="${linkSalvar}" method="post"
			id="form">
				<div class="row">
				<c:import url="campos.jsp" />
				</div>
				<div class="row">
					<div class="clearfix form-actions">
						<div class="pull-right">
						<a class="btn btn-default" type="button" href="${linkLista}"><fmt:message key="btn.voltar"/></a>
							<button class="btn btn-primary" type="submit"><fmt:message key="btn.salvar"/></button>
						</div>
					</div>
				</div>
			</form>
		
	</jsp:body>
</layout:template>`);

const linkAlterar = "${linkTo["+model+"Controller].alterar[entidade]}";
fs.writeFileSync(__dirname+'/documentos/visualizar.jsp', `
  
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="layout" uri="http://faee.com.br/jsp/layout"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<layout:template>
	<jsp:body>
		<div class="page-header">
			<h3><fmt:message key="${data.nome_tabela}"/> <small><fmt:message key="visualizar"/></small></h3>
		</div>
			<br />
			<form class="form-horizontal" action="${linkAlterar}" method="post"
			id="form">

				<div class="row">
				<c:import url="campos.jsp" />
				</div>
				<div class="row">
					<div class="clearfix form-actions">
						<div class="pull-right">
							<a class="btn btn-default" type="button" href="${linkLista}"><fmt:message key="btn.voltar"/></a>
							<button class="btn btn-primary" type="submit" name="_method" value="put"><fmt:message key="btn.salvar"/></button> 
							<button class="btn btn-danger" type="submit" name="_method" value="delete"><fmt:message key="btn.excluir"/></button>
						</div>
					</div>
				</div>
				
			</form>
	</jsp:body>
</layout:template>`);

function criaVisualizacaoModal(m){
	const modelModal = m.nome_tabela.substring(0,1).toUpperCase()+m.nome_tabela.substring(1,100);
	const linkForm = "${linkTo["+model+"Controller].salvar"+modelModal+"}";
	const linkFormRemove = "${linkTo["+model+"Controller].remover"+modelModal+"}";
	const variavelCodigo = "${"+m.nome_tabela+".codigo}";
	fs.writeFileSync(__dirname+'/documentos/visualiza'+modelModal+'.jsp', `
	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
	<%@ taglib prefix="components" uri="http://faee.com.br/jsp/components"%>
	<%@ taglib prefix="layout" uri="http://faee.com.br/jsp/layout"%>
	  
	<script type="text/javascript">
	function salvar${modelModal}() {
		var f = document.getElementById('form');
			f.setAttribute("method", "Post");
			f.setAttribute("action", "${linkForm}");
			f.submit();
	}
	function excluir${modelModal}() {
		var f = document.getElementById('form');
			f.setAttribute("method", "Post");
			f.setAttribute("action", "${linkFormRemove}");
			f.submit();
	}
</script>

<div class="modal-conteudo" style="width: 60%; margin-left: 20%;margin-top: 1.8%; text-align: left;">
	<div class="form-horizontal" style="background-color: #fff; border-radius: 10px;">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4 class="modal-title" style="margin-left: 5px; text-align: left;"><fmt:message key="${m.nome_tabela}"/><small><fmt:message key="editar"/></small></h4>
		</div>
		<div class="modal-body row" >
		<input type="hidden" name="${m.nome_tabela}.codigo" value="${variavelCodigo}"/>
			${m.colunas.map(e => {
				return criarInputs(e,m.nome_tabela,true)+"\n\n";
			})}
		</div>
		<div class="modal-footer">
			<a href="#" data-dismiss="modal" class="btn btn-default" type="button"><fmt:message key="btn.cancelar"/></a> 
			<a onclick="javascript:salvar${modelModal}()" class="btn btn-primary" type="button"><fmt:message key="btn.salvar"/></a>
			<button class="btn btn-danger" onclick="javascript:excluir${modelModal}()" type="button" 
				name="_method" value="delete"><fmt:message key="btn.excluir"/></button>
		</div>
	</div>
</div>
	
`);
}

function criaNovoModal(m){
	const modelModal = m.nome_tabela.substring(0,1).toUpperCase()+m.nome_tabela.substring(1,100);
	const linkForm = "${linkTo["+model+"Controller].adicionar"+modelModal+"}";
	fs.writeFileSync(__dirname+'/documentos/modal'+modelModal+'.jsp', `
	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
	<%@ taglib prefix="components" uri="http://faee.com.br/jsp/components"%>

	<script type="text/javascript">
	function adicionar${modelModal}() {
		var f = document.getElementById('form');
			f.setAttribute("method", "Post");
			f.setAttribute("action", "${linkForm}");
			f.submit();
	}
</script>
<div class="modal fade" id="modal${modelModal}" tabindex="-1" role="dialog" aria-labelledby="modal${modelModal}Label" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
 		<div class="modal-content">
 			<div class="modal-header">
 				<h5 class="modal-title" id="exampleModalLongTitle"><fmt:message key="${m.nome_tabela}"/></h5>
 			</div>
			<div class="modal-body row">
			${m.colunas.map(e => {
				return criarInputs(e,m.nome_tabela,false)+"\n\n";
			})}
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal"><fmt:message key="btn.cancelar"/></button>
				<button type="button" class="btn btn-primary" name="method" onclick="adicionar${modelModal}()"><fmt:message key="btn.salvar"/></button>
			</div>
 		</div>
 	</div>
</div>
	
`);
}

function criarInputs(e,variavelModel,mostrarVariavelValue){
	const variavelValue = (mostrarVariavelValue?"${"+variavelModel+"."+e.nome+"}":"");
	const variavelValueSelect = (mostrarVariavelValue?"${"+variavelModel+"."+e.nome+".codigo}":"");
	const variavelListSelect = "${"+e.nome+"List}";
	if(e.tipo === "LocalDate"){
		return `<components:inputData name="${variavelModel}.${e.nome}" id="" 
		label="${e.nome}" value="${variavelValue}" divClass="col-sm-${e.tamanho}"></components:inputData>`;
	}else if(e.tipo === "model"){
		return `<components:select label="${e.nome}" i18n="false" id="" value="${variavelValueSelect}" 
			name="${variavelModel}.${e.nome}.codigo" itens="${variavelListSelect}" divClass="col-sm-${e.tamanho}"></components:select>`;
	}else if(e.tipo === "Integer" || e.tipo === "Long"){
		return `<components:input type="number" name="${variavelModel}.${e.nome}" id="" 
		label="${e.nome}" value="${variavelValue}" divClass="col-sm-${e.tamanho}"></components:input>`;
	}else if(e.tipo === "BigDecimal"){
		return `<components:inputMoney label="${e.nome}" id="" value="${variavelValue}" name="${variavelModel}.${e.nome}"
		divClass="col-sm-${e.tamanho}"></components:inputMoney>`;
	}else if(e.tipo === "String"){
		return `<components:input name="${variavelModel}.${e.nome}" id="" 
		label="${e.nome}" value="${variavelValue}" divClass="col-sm-${e.tamanho}"></components:input>`;
	}else if(e.tipo === "Boolean"){
			return `<components:checkbox name="${variavelModel}.${e.nome}" label="${e.nome}" value="${variavelValue}" 
			divClass="col-sm-${e.tamanho}" i18n="true"></components:checkbox>`;
	}else if(e.tipo === "Double"){
		return `<components:input type="number" name="${variavelModel}.${e.nome}" id="" 
		label="${e.nome}" value="${variavelValue}" divClass="col-sm-${e.tamanho}" extraHTML="step=0.01"></components:input>`;
	}else if(e.tipo === "list"){
		criaVisualizacaoModal(e);
		criaNovoModal(e);
		const coluna = e.nome.substring(0,1).toUpperCase()+e.nome.substring(1,100);
		const linkVisualizar = "${linkTo["+model+"Controller].visualiza"+coluna+"[e]}";
		const variavelLista = "${entidade."+e.nome+"}";
		return `<div class="table-reponsive">
		<table class="table table-bordered table-hover">
				<thead>
				<tr class="well">
					<th class="col-sm-2">Código</th>
					<th style="width: 41px;">
						<button type="button" class="btn btn-success btn-xs" 
							style="vertical-align: middle;height: 20px;" data-toggle="modal" data-target="#modal${coluna}">
							<span class="glyphicon glyphicon-plus "></span>
						</button>
					</th>
				</tr>						
			</thead>
			<tbody>
				<c:forEach items="${variavelLista}" var="e" varStatus="indice">
					<tr>
						<td></td>
						<td>
							<a class="btn  btn-primary btn-xs" data-toggle="modal" data-target="#ver${coluna}" 
								onclick="visualiza${coluna}()" href="${linkVisualizar}" >
								<span class="glyphicon glyphicon-pencil"></span>
							</a>
						</td>
					</tr>	
				</c:forEach>				
			</tbody>
		</table>
	</div>	
	`;
	}
}
const variavelValueCodigo = "${entidade.codigo}";
fs.writeFileSync(__dirname+'/documentos/campos.jsp', `
  
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="components" uri="http://faee.com.br/jsp/components"%>
<script type="text/javascript">
${data.colunas.map(e => {
	const modelModal = e.nome.substring(0,1).toUpperCase()+e.nome.substring(1,100);
	if(e.tipo === "list"){
		return `
		function visualiza${modelModal}() {
			var _url = $(this).data('url');
			var _hides = $(this).data('hides');
			if (_url) {
				$.ajax({
					url : _url,
					success : function(data) {
						$('#ver${modelModal} .modal-conteudo').html(data);
						if (_hides) {
							$.each(_hides.split(","), function(index, value) {
								$('#' + value).closest('.form-group').hide();
							});
						}
					}
				});
			}
		};
		$('#ver${modelModal}').on('hide.bs.modal', function(e) {
			$('#ver${modelModal} .modal-conteudo').html('<div class="modal-body"><fmt:message key="aguarde.carregando.dados" /></div>');
		});
		`;
	}
})}	

</script>

<input type="hidden" name="entidade.codigo" value="${variavelValueCodigo}" />
	${data.colunas.map(e => {
		return criarInputs(e,"entidade",true)+"\n\n";
	})}

	${data.colunas.map(e => {
		const modelModal = e.nome.substring(0,1).toUpperCase()+e.nome.substring(1,100);
		if(e.tipo === "list"){
			return `
			<div class="modal fade" id="ver${modelModal}" tabindex="-1" role="dialog" aria-labelledby="myTitle" aria-hidden="false">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-conteudo">
							<div class="modal-body"><fmt:message key="aguarde.carregando.dados" /></div>
						</div>
					</div>
				</div>
			</div>
				<c:import url="modal${modelModal}.jsp"></c:import>
			`;
		}
	})}	
`);
}