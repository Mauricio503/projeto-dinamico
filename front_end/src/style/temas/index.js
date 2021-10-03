
const ListTemas = t => ({
    'flamengo':{primary:{background:"#070308", color:"white"},
                secondary:{background:"#c3281e", color:"white"},
                third:{background:"repeating-linear-gradient(0deg,#070308,#070308 3px,#c3281e 3px,#c3281e 6px)", color:"white"}},
    'padrao':{primary:{background:"white", color:"black"}}
})[t]
  

export default ListTemas(window.localStorage.getItem("tema_erp"));