import { User } from "../api/User/User";
import { Product, ProductVariant } from "../api/Product/Product";

export type Cart = {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export function capitalize(text: string) {
  if (typeof text !== 'string') return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function validateNumber(value: string) {
  var isNumberRegex = /[0-9]|\./;
  return value !== '' ? isNumberRegex.test(value) : true;
}

export function getUserFromCookie(context: any) {
  try {
    if (!context) return null;
    const user_json = context.cookie.get('user');
    if (user_json) {
      return user_json as User;
    }
    return null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

/*
export function getUserCart(context: any) {
  try {
    if (!context) return [];
    const cart = context.cookie.get('cart');
    if (cart && cart !== 'null') {
      return cart as Cart[];
    }
    return [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
*/
export function getUserCart() {
  const cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

export function setUserCart(cart: Cart[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function doLogout(context: any) {
  try {
    context.cookie.set('user', null);
  } catch (error) {
    console.log(error.message);
  }
}

export function formatMoney(number: any, decPlaces?: number, decSep?: string, thouSep?: string) {
  decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "." : decSep;
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  let sign = number < 0 ? "-" : "";
  let i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
  let j = (i.length) > 3 ? i.length % 3 : 0;

  return sign +
    (j ? i.substr(0, j) + thouSep : "") +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    (decPlaces ? decSep + Math.abs(number - Number(i)).toFixed(decPlaces).slice(2) : "");
}