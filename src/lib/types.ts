// User types
export interface User {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: string;
	image: string;
	token: string;
}

// Product types
export interface ProductMeta {
	createdAt: string;
	updatedAt: string;
	barcode: string;
	qrCode: string;
}

export interface Review {
	rating: number;
	comment: string;
	date: string;
	reviewerName: string;
	reviewerEmail: string;
}

export interface ProductDimension {
	width: number;
	height: number;
	depth: number;
}

export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: string;
	tags: string[];
	brand: string;
	sku: string;
	weight: number;
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: Review[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: ProductMeta;
	thumbnail: string;
	images: string[];
	dimensions: ProductDimension;
}

// Cart
export interface CartItem {
	quantity: number;
	productId: number;
}

export type CartStore = Map<string, CartItem>;
