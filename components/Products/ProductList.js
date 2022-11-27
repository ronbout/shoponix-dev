import Link from 'next/link';
import ProductPagination from './ProductPagination';

function ProductList({ products, totalPages }) {
    // console.log(totalPages)

    const mapProductsToItem = (products) => {
        return products.length ? (products.map(product => (
            <Link href="/product/[id]" as={`/product/${product._id}`} key={product._id}>
                <a className="ui green fluid card single-products-box">
                    <div className="image">
                        <img src={product.mediaUrl} alt={product.name}/>
                    </div>
                    <div className="content">
                        <div className="header">{product.name}</div>
                        <div className="meta">${product.price}</div>
                    </div>
                </a>
            </Link>
        ))) : (
            <Link href="/products">
                <a className="ui green fluid card single-products-box">
                    <h1>Not Found!</h1>
                </a>
            </Link>
        )
    }

    return (
        <>
            <div className="hot-products-area">
                <div className="ui centered stackable four cards">
                    {mapProductsToItem(products)}
                </div>
                {totalPages > 1 ? <ProductPagination totalPages={totalPages} /> : null}
            </div>
        </>
    );
}

export default ProductList;