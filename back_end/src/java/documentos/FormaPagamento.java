@Entity
@Executivo
@Legislativo
@Cadastros
public class FormaPagamento implements EntidadePersistente, LabelValue {
    
    @Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_formaPagamento")
	@SequenceGenerator(name = "seq_formaPagamento", sequenceName = "formaPagamento_seq",
		allocationSize = 1)
	private Long codigo;
    
        private STRING(250) tipo;

,    private Integer tempoCredito;

,    @ManyToOne(fetch = FetchType.EAGER)
        private Moeda moeda;


}
    