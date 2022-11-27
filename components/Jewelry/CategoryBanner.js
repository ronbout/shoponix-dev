import Link from 'next/link';

const CategoryBanner = () => {
    return(
        <>
            <div className="grocery-categories-banner-area">
                <div className="ui grid">
                    <div className="four wide column">
                        <div className="single-grocery-categories-box jewelry-categorie">
                            <img src="/images/jewelry-category1.jpg" alt="Categories" />

                            <div className="content">
                                <span>50% OFF</span>
                                <h3>Rings</h3>
                                <Link href="/products?term=jewelry">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box jewelry-categorie overly">
                            <img src="/images/jewelry-category2.jpg" alt="Categories" />

                            <div className="content">
                                <span className="color-white">40% OFF</span>
                                <h3 className="color-white">Earrings</h3>
                                <Link href="/products?term=jewelry">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box jewelry-categorie overly">
                            <img src="/images/jewelry-category3.jpg" alt="Categories" />

                            <div className="content">
                                <span className="color-white">30% OFF</span>
                                <h3 className="color-white">Necklaces</h3>
                                <Link href="/products?term=jewelry">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column ">
                        <div className="single-grocery-categories-box jewelry-categorie overly">
                            <img src="/images/jewelry-category4.jpg" alt="Categories" />

                            <div className="content">
                                <span className="color-white">20% OFF</span>
                                <h3 className="color-white">Bracelets</h3>
                                <Link href="/products?term=jewelry">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryBanner;


 