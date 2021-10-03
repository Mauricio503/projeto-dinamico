module.exports = Object.freeze({"INTEGER":"integer","STRING":function (size) {return `character varying(${size})`},
    "LIST":"list","BOOLEAN":"boolean","LIGACAO":"ligacao","DATE":"date","BIGDECIMAL":function (size,decimal) {return `numeric(${size},${decimal})`}});
