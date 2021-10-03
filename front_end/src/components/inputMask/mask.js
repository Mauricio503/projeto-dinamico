export function cep(e) {
    e.currentTarget.maxLength = 9;
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    e.target.value = value;
    return e;
  }
  
export function currency(e) {
  let value = e.target.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  
  e.target.value = value;
  return e;
}
  
export function cpf(e) {
  e.currentTarget.maxLength = 14;
  let value = e.target.value;
  if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
    e.target.value = value;
  }
  return e;
}

export function cnpj(e) {
  e.currentTarget.maxLength = 18;
  let value = e.target.value;
    value = value.replace(/\D/g, '')
    .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1.$2.$3/$4-$5");
    e.target.value = value;
  return e;
}