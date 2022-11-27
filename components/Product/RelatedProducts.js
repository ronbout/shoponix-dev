import React from 'react';
import Link from 'next/link';

const RelatedProducts = ({related = []}) => {    
    return(
        <>
            <div className="related-products-area">
                <div className="section-title">
                    <h2>Related Products</h2>
                </div>

                <div className="ui centered stackable four cards">
                    {related.length ? (related.map(p => (
                        <Link href="/product/[id]" as={`/product/${p._id}`} key={p._id}>
                            <a className="ui green fluid card single-grocery-products-box">
                                <div className="image">
                                    <img src={p.mediaUrl} alt={p.name} />
                                </div>
                                <div className="content">
                                    <div className="header">
                                        {p.name}
                                    </div>
                                    <div className="meta">
                                        ${p.price}
                                    </div>
                                </div>
                            </a>
                        </Link>
                    ))): null}
                </div>
            </div>
        </>
    );
}

export default RelatedProducts;