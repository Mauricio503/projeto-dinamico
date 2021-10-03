const DataTypes = require("../enum/TypesColumns");
// Métodos padrões demais métodos adicionar no repository do model
class Method {
 
    constructor(props) {
        this._props = props;
    }

    findAll = async(req,cb,where,include) => {
        const client = await req.connetion.connect()
        await client.query(`SELECT ${include === undefined || include === null ? "*":include.join(",") } FROM ${req.schema}.${this._props.name}`).then(await function (result) {
            cb(result.rows.length > 0 ? result.rows[0] : []);
        }).finally(() => {
            client.end();
        });
    }
    findBy = async(req,cb,where,include) => {
        //verificar se existe associação
        if(new this._props().association() && Object.keys(new this._props().association()).length > 0){
            let value = null;
            function cbValue(v){
                value = v;
            }
            function addValue(key,v){
                value[key] = v;
            }
            const client = await req.connetion.connect()
            //busca na tabela do model
            await client.query(`SELECT ${include === undefined || include === null ? `*`:include.join(",") } 
            FROM ${req.schema}.${this._props.name} WHERE ${where} ;
                `).then(await function (result) {
                cbValue(result.rows.length > 0 ? result.rows[0] : null);
            });
            //executa um for nas associações e seta o conteudo
            async function asyncForEach(array, callback) {
                for (let index = 0; index < array.length; index++) {
                  await callback(array[index], index, array);
                }
            }
            await asyncForEach(Object.entries(new this._props().association()), async (n,i,array) => {
                await client.query(`SELECT ${include === undefined || include === null ? 
                    `${n[0]}.*`:include.join(",") } 
                FROM ${req.schema}.${this._props.name}
                ${n[1] === DataTypes.LIST ? `
                    INNER JOIN ${this._props.name+"_"+n[0]+"s"}
                    ON ${this._props.name}.id = ${this._props.name+"_"+n[0]+"s"}.${this._props.name}_id
                    INNER JOIN ${n[0]}
                    ON ${n[0]}.id = ${this._props.name+"_"+n[0]+"s"}.${n[0]}_id
                `:`
                    INNER JOIN ${n[0]}
                    ON ${this._props.name}.id = ${n[0]}.${this._props.name}_id
                `};
                    `).then(await function (result) {
                    addValue(n[0]+(n[1] === DataTypes.LIST ?"s":""),result.rows.length > 0 ? result.rows : null);
                    if(i+1 === array.length){
                        cb(value);
                    }
                }).finally(() => {
                    if(i+1 === array.length){
                        client.end();
                    }
                });
            });
        }else{
            const client = await req.connetion.connect()
            await client.query(`SELECT ${include === undefined || include === null ? "*":include.join(",") }        
                FROM ${req.schema}.${this._props.name} WHERE ${where} ;
            `).then(await function (result) {
            cb(result.rows.length > 0 ? result.rows : null);
        }).finally(() => {
            client.end();
        });
        }
    }
    create = async(req,cb,value) => {
        let values = "";
        Object.keys(new this._props().model()).map((m,i) => {
            values = values + "'"+((value[m] !== undefined ? value[m].toString() : null)+"'" + (Object.keys(new this._props().model()).length !== i+1 ? "," : "")); 
         });
        const client = await req.connetion.connect();
        await client.query(`INSERT INTO ${req.schema}.${this._props.name} (${Object.keys(new this._props().model()).join(",")}) 
        VALUES (${values}) returning *;`).then(await function (result) {
            cb(result.rows.length > 0 ? result.rows[0] : null);
        }).finally(() => {
            client.end();
        });
    }
    createAll = async(req,cb,list) => {
        let values = "";
        list.map((c,index) => {
            values = values+
            "("+
            Object.keys(new this._props().model()).map((m,i) => {
                let val = "";
                if(c[m] !== undefined){
                    val = val + "'"+c[m]+"'";
                }else{
                    val = val + "null"; 
                }
                if(Object.keys(new this._props().model()).length === i+1){
                    val = val + ")"+(list.length !== index+1 ? ",":"");
                }
                return val; 
            });
        });
        const client = await req.connetion.connect()
        await client.query(`INSERT INTO ${req.schema}.${this._props.name} (${Object.keys(new this._props().model()).join(",")}) 
            VALUES ${values} returning *;`).then(await function (result) {
            cb(result.rows.length > 0 ? result.rows : null);
        }).finally(() => {
            client.end();
        });
    }
    update = async(req,cb,value,where) => {
        let values = [];
        Object.keys(new this._props().model()).map((m,i) => {
            if(value[m] !== undefined) {
                values.push(`${m}=${value[m]}`);
            }
         });
        const client = await req.connetion.connect()
        await client.query(`UPDATE ${req.schema}.${this._props.name} SET ${values.join().split(",")} ${where} returning *;`).then(await function (result) {
            cb(result.rows.length > 0 ? result.rows[0] : null);
        }).finally(() => {
            client.end();
        });
    }
}

module.exports = Method