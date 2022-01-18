const fs = require("fs");

function primeiraLetraMaiuscula(value){
	return value.substring(0,1).toUpperCase()+value.substring(1,100);
}

module.exports = (data) => {
  const model = primeiraLetraMaiuscula(data.nome_tabela);
        fs.writeFileSync(__dirname+'/documentos/'+model+'Controller.java', `
        @Resource
@Path("/${data.nome_tabela}")
public class ${model}Controller {

	@Autowired
	private Result result;
  @Autowired
  private ${model}Repository ${data.nome_tabela}Repository;
  ${data.colunas.map(c => {
	  if(c.tipo === "list"){
		return `@Autowired
		private ${primeiraLetraMaiuscula(c.nome)}Repository ${c.nome}Repository;`;
	  }
  })}

	@Get("/lista")
	public void lista() {
		List<${model}> lista = ${data.nome_tabela}Repository.findAll();
		result.include("lista",lista);
	}

	@Get("/novo")
	public void novo() {
	}

	@Post("/novo")
	public void salvar(${model} entidade) {
		${data.nome_tabela}Repository.save(entidade);
    	result.redirectTo(this).lista();
	}

	@Get("/visualizar/{entidade.codigo}")
	public void visualizar(${model} entidade) {
		result.include("entidade", ${data.nome_tabela}Repository.findOne(entidade.getCodigo()));
	}

	@Delete("/visualizar/{entidade.codigo}")
	public void remover(${model} entidade) {
		${data.nome_tabela}Repository.delete(entidade);
		result.redirectTo(this).lista();
	}

	@Put("/visualizar/{entidade.codigo}")
	public void alterar(${model} entidade) {
		${data.nome_tabela}Repository.save(entidade);
		result.redirectTo(this).lista();
	}

	${data.colunas.map(c => {
		if(c.tipo === "list"){
		  return `@Get("/visualiza${primeiraLetraMaiuscula(c.nome)}/{${c.nome}.codigo}")
		public void visualiza${primeiraLetraMaiuscula(c.nome)}(${primeiraLetraMaiuscula(c.nome)} ${c.nome}) {
			result.include("${c.nome}", ${c.nome}Repository.findOne(${c.nome}.getCodigo()));
		}
	  
		@Post("/salvar${primeiraLetraMaiuscula(c.nome)}")
		public void salvar${primeiraLetraMaiuscula(c.nome)}(${model} entidade,${primeiraLetraMaiuscula(c.nome)} ${c.nome}) {
		  ${c.nome}Repository.save(${c.nome});
		  result.include("entidade",entidade);
		  if (entidade.getCodigo() != null) {
			  result.redirectTo(this).visualizar(entidade);
		  } else {
			  result.redirectTo(this).novo();
		  }
		}
		@Post("/adicionar${primeiraLetraMaiuscula(c.nome)}")
		public void adicionar${primeiraLetraMaiuscula(c.nome)}(${model} entidade,${primeiraLetraMaiuscula(c.nome)} ${c.nome}) {
		  ${c.nome}Repository.save(${c.nome});
		  entidade.get${primeiraLetraMaiuscula(c.nome)}().add(${c.nome});
		  result.include("entidade",entidade);
		  if (entidade.getCodigo() != null) {
				${data.nome_tabela}Repository.save(entidade);
			  result.redirectTo(this).visualizar(entidade);
		  } else {
			  result.redirectTo(this).novo();
		  }
		}
		@Post("/remover${primeiraLetraMaiuscula(c.nome)}")
		public void remover${primeiraLetraMaiuscula(c.nome)}(${model} entidade,${primeiraLetraMaiuscula(c.nome)} ${c.nome}) {
			entidade.remove${primeiraLetraMaiuscula(c.nome)}(${c.nome});
			result.include("entidade",entidade);
			if (entidade.getCodigo() != null) {
				${data.nome_tabela}Repository.save(entidade);
				result.redirectTo(this).visualizar(entidade);
			} else {
			result.redirectTo(this).novo();
			}
		}
		`;
		}
	})}
} `);
}