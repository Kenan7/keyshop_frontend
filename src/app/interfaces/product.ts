export interface Product {
	id: number;
	item_name: string;
	quantity: number;
	stock_number: number;
	description: string;
	price: number;
	discount_price: number;
	image: string;
}

export interface ProductList {
	product: number;
	quantity: number;
}

export interface FinalOrder {
	address: string;
	product_list: ProductList[];
	user: number;
}
