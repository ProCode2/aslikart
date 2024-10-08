import type { User } from '$lib/types';
import { writable } from 'svelte/store';

export const user = writable<User | undefined>(undefined, function(set) {
	const token = window.localStorage.getItem('__token');
	if (!token) return;
	fetch('https://dummyjson.com/auth/me', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
		.then((res) => res.json())
		.then((userData: User) => {
			set(userData);
		})
		.catch((err) => {
			console.error(err);
			window.localStorage.removeItem('__token');
			window.location.href = '/';
		});
});

export function login(userData: User) {
	user.set(userData);
	window.localStorage.setItem('__token', userData.token);
}

export function logout() {
	user.set(undefined);
	window.localStorage.removeItem('__token');
}
