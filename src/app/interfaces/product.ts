export interface Product {
	id: number;
	item_name: string;
	stock_quantity: number;
	description: string;
	price: number;
	discount_price: number;
	image: string;
	quantity: number;
}

export interface ProductList {
	product: number;
	quantity: number;
}

export interface FinalOrder {
	address: string;
	product_list: ProductList;
}
