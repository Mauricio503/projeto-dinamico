const CriarModel = require("../util/createModel");
const CriarRepository = require("../util/createRepository");
const CriarController = require("../util/createController");
const CriarPagina = require("../util/createPage");
const Colunms = require("../enum/TypesColumns");

module.exports = {
  async cria(req, res) {
    
    let sqlCriarTabelaSequence = "";
    let sqlLigacoes = "";
    const lista = req.body.lista;
    //criar sql primjerio criar todas as tabelas e sequence
    // depois as ligações
    
    for(var i=0;i<lista.length;i++){
      sqlCriarTabelaSequence += `CREATE SEQUENCE ${req.schema}.${lista[i].nome_tabela}_id_seq
      INCREMENT 1
      START 1
      MINVALUE 1
      MAXVALUE 9223372036854775807
      CACHE 1;

      CREATE TABLE ${req.schema}.${lista[i].nome_tabela}
          (
            ${lista[i].colunas.filter(cl => cl.tipo !== "lt").map((c,ic) => {
                return  (ic === 0 ? "":"           ")+ c.nome+" "+(c.tipo === "lg" ? "integer":c.tipo)+
                (c.tamanho !== null && c.escala === null ? `(${c.tamanho})`:"")+
                (c.tamanho !== null && c.escala !== null ? `(${c.tamanho},${c.escala})`:"")+
                (c.nome === "id" ? ` DEFAULT nextval('${req.schema}.${lista[i].nome_tabela}_id_seq')`:"")+
                (ic+1 === lista[i].colunas.filter(cl => cl.tipo !== "lt").length ? "," :"\n");
            })}
            CONSTRAINT ${lista[i].nome_tabela}_pkey PRIMARY KEY (id)
          );`;
      if(lista[i].colunas.filter(c => c.tipo === "lg").length > 0){
        for(var il=0;il<lista[i].colunas.filter(c => c.tipo === "lg").length;il++ ){
          const e = lista[i].colunas.filter(c => c.tipo === "lg")[il];
          sqlLigacoes += `ALTER TABLE ${req.schema}.${lista[i].nome_tabela} ADD CONSTRAINT ${lista[i].nome_tabela}_${e.nome}_id_fkey FOREIGN KEY (${e.nome})
          REFERENCES ${req.schema}.${e.tabela_ligacao} (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE RESTRICT;
          `
        }
      }
      if(lista[i].colunas.filter(c => c.tipo === "lt").length > 0){
        for(var ilt=0;ilt<lista[i].colunas.filter(c => c.tipo === "lt").length;ilt++ ){
          const e = lista[i].colunas.filter(c => c.tipo === "lt")[ilt];
          sqlCriarTabelaSequence += `CREATE SEQUENCE ${req.schema}.${lista[i].nome_tabela}_${e.tabela_ligacao}s_id_seq
          INCREMENT 1
          START 1
          MINVALUE 1
          MAXVALUE 9223372036854775807
          CACHE 1;
          CREATE TABLE ${req.schema}.${lista[i].nome_tabela}_${e.tabela_ligacao}s
          (
            id integer NOT NULL DEFAULT nextval('${req.schema}.${lista[i].nome_tabela}_${e.tabela_ligacao}s_id_seq'),
            ${lista[i].nome_tabela}_id integer NOT NULL,
            ${e.nome} integer NOT NULL, 
            CONSTRAINT ${lista[i].nome_tabela}_${e.tabela_ligacao}s_pkey PRIMARY KEY (id)
          );`;
          sqlLigacoes += `ALTER TABLE ${req.schema}.${lista[i].nome_tabela}_${e.tabela_ligacao}s ADD 
          CONSTRAINT ${lista[i].nome_tabela}_${e.tabela_ligacao}s_${lista[i].nome_tabela}_id_fkey FOREIGN KEY (${lista[i].nome_tabela}_id)
          REFERENCES ${req.schema}.${lista[i].nome_tabela} (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE RESTRICT;
          ALTER TABLE ${req.schema}.${lista[i].nome_tabela}_${e.tabela_ligacao}s ADD 
            CONSTRAINT ${lista[i].nome_tabela}_${e.tabela_ligacao}s_${e.nome}_fkey FOREIGN KEY (${e.nome})
            REFERENCES ${req.schema}.${e.tabela_ligacao} (id) MATCH SIMPLE
              ON UPDATE CASCADE
              ON DELETE RESTRICT;
          `
        }
      }
      
      CriarModel(req.body.lista[i]);
      CriarRepository(req.body.lista[i]);
      CriarController(req.body.lista[i]);
      //CriarPagina(req.body.page);
      if(i+1=== lista.length){
        const client = await req.connetion.connect();
        await client.query(sqlCriarTabelaSequence+sqlLigacoes).finally(() => {
          client.end();
          res.send("fechou");
        });
      }
    }
  }
};
