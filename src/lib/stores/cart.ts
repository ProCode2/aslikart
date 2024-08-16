import type { CartItem, CartStore } from '$lib/types';
import { writable, get } from 'svelte/store';

export const cart = writable<{ cart: CartStore }>(
	{ cart: {} as CartStore },
	(set) => {
		const token = window.localStorage.getItem('__token');
		if (!token) return;
		const cart = window.localStorage.getItem(token);
		if (!cart) return;
		const cartData: CartStore = JSON.parse(cart);
		set({ cart: cartData });
	}
);

export function addToCart(item: CartItem) {
	const token = window.localStorage.getItem('__token');
	if (!token) return;

	cart.update((items) => {
		return { cart: { ...items.cart, [item.productId]: item } };
	});
	window.localStorage.setItem(token, JSON.stringify(get(cart).cart));
}

export function removeFromCart(itemId: number) {
	const token = window.localStorage.getItem('__token');
	if (!token) return;
	cart.update((items) => {
		items.cart.delete(itemId.toString());

		window.localStorage.setItem(token, JSON.stringify(get(cart).cart));
		return items;
	});
}

export function clearCart() {
	cart.set({ cart: {} as CartStore });
}
