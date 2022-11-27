import React from "react";
import { Item, Label } from "semantic-ui-react";
import Link from "next/link";
import AddProductToCart from "./AddProductToCart";

const ProductSummary = ({
	name,
	mediaUrl,
	_id,
	price,
	sku,
	productType,
	user,
}) => {
	return (
		<>
			<Item.Group>
				<Item>
					<Item.Image size="large" src={mediaUrl} />
					<Item.Content>
						<Item.Header>{name}</Item.Header>
						<Item.Description>
							<p className="price">${price}</p>
							<Label>SKU: {sku}</Label>
						</Item.Description>

						<ul className="products-info">
							<li>
								<span>Vendor:</span>
								<Link href="#">
									<a onClick={(e) => e.preventDefault()}>
										Lereve
									</a>
								</Link>
							</li>
							<li>
								<span>Availability:</span>
								<Link href="#">
									<a onClick={(e) => e.preventDefault()}>
										In stock
									</a>
								</Link>
							</li>
							<li>
								<span>Products Type:</span>
								<Link href={`/products?term=${productType}`}>
									<a>{productType.toUpperCase()}</a>
								</Link>
							</li>
						</ul>

						<Item.Extra>
							<AddProductToCart user={user} productId={_id} />
						</Item.Extra>

						<div className="payment-method">
							<img src="/images/payment/expresscard.png" />
							<img src="/images/payment/mastercard.png" />
							<img src="/images/payment/mastercard2.png" />
							<img src="/images/payment/visa.png" />
							<img src="/images/payment/visa2.png" />
						</div>
					</Item.Content>
				</Item>
			</Item.Group>
		</>
	);
};

export default ProductSummary;
