const fs = require("fs");

function criarParametros(parametro){
    if(parametro.tipo === "LocalDate") {
        return `@Temporal(TemporalType.DATE)
        @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
        private LocalDate`;
    }else if(parametro.tipo === "model"){
        return `    @ManyToOne(fetch = FetchType.EAGER)
        private ${parametro.nome.substring(0,1).toUpperCase()+parametro.nome.substring(1,100)}`;
    }else if(parametro.tipo === "list"){
        return `@OneToMany(fetch = FetchType.EAGER)
        private Set<${parametro.nome.substring(0,1).toUpperCase()+parametro.nome.substring(1,100)}>`;
    }else{
        return `    private ${parametro.tipo}`;
    }
}
module.exports = (data) => {
    const model = data.nome_tabela.substring(0,1).toUpperCase()+data.nome_tabela.substring(1,100)
    fs.writeFileSync(__dirname+'/documentos/'+model+'.java', 
        
`@Entity
public class ${model} implements EntidadePersistente<${model}>, LabelValue {
    
    @Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_${data.nome_tabela}")
	@SequenceGenerator(name = "seq_${data.nome_tabela}", sequenceName = "${data.nome_tabela}_seq",
		allocationSize = 1)
	private Long codigo;
    
    ${data.colunas.map((c,i) => {
        return criarParametros(c)+" "+c.nome+";\n\n";
    })}
}
    `);
}