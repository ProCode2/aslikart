import type { CartItem, CartStore } from '$lib/types';
import { writable, get } from 'svelte/store';

export const cart = writable<{ cart: CartStore }>(
	{ cart: new Map() as CartStore },
	(set) => {
		const token = window.localStorage.getItem('__token');
		if (!token) return;
		const cart = window.localStorage.getItem(token);
		if (!cart) return;
		const cartData: CartStore = new Map(Object.entries(JSON.parse(cart)));
		set({ cart: cartData });
	}
);

export function addToCart(item: CartItem) {
	const token = window.localStorage.getItem('__token');
	if (!token) return;

	cart.update((items) => {
		items.cart.set(item.productId.toString(), item);
		console.log(items);

		window.localStorage.setItem(
			token,
			JSON.stringify(Object.fromEntries(items.cart))
		);
		return items;
	});
}

export function removeFromCart(itemId: number) {
	const token = window.localStorage.getItem('__token');
	if (!token) return;
	cart.update((items) => {
		items.cart.delete(itemId.toString());

		window.localStorage.setItem(
			token,
			JSON.stringify(Object.fromEntries(get(cart).cart))
		);

		return items;
	});
}

export function clearCart() {
	cart.set({ cart: new Map<string, CartItem>() });
}
