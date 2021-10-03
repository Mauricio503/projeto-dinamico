module.exports = (req,tabela,colunas) => {
    const client = await req.connetion.connect()
    await client.query(`CREATE SEQUENCE ${req.schema}.${tabela}_id_seq
        INCREMENT 1
        START 1
        MINVALUE 1
        MAXVALUE 9223372036854775807
        CACHE 1;

        CREATE TABLE ${req.schema}.${tabela}
(
    ${colunas.map((c,i) => {
        return (i === 0 ? "":"           ")+ c.nome+": DataTypes."+c.tipo+(i+1 === colunas.length ? "" :"\n");
    })}
    CONSTRAINT ${tabela}_pkey PRIMARY KEY (id)
)
        `)
    .finally(() => {
        client.end();
    });
}