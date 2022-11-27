import Link from 'next/link';

const HotProducts = ({products}) => {
    return(
        <>
            <div className="grocery-products-area">
                <div className="section-title">
                    <span className="sub-title">Products</span>
                    <h2>Our Hot Products</h2>
                </div>

                <div className="ui centered stackable four cards">
                    {products.map(product => (
                        <Link href="/product/[id]" as={`/product/${product._id}`} key={product._id}>
                            <a className="ui green fluid card single-grocery-products-box">
                                <div className="image">
                                    <img src={product.mediaUrl} alt={product.name} />
                                </div>
                                <div className="content">
                                    <div className="header">
                                        {product.name}
                                    </div>
                                    <div className="meta">
                                        ${product.price}
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HotProducts;