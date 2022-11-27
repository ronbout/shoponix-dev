import Link from 'next/link';

const CategoryBanner = () => {
    return(
        <>
            <div className="grocery-categories-banner-area">
                <div className="ui grid">
                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590076747/electronics-category1.jpg" alt="Categories" />

                            <div className="content">
                                <span>50% OFF</span>
                                <h3>Smart Watch</h3>
                                <Link href="/products?term=electronics">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590076770/electronics-category2.jpg" alt="Categories" />

                            <div className="content">
                                <span>40% OFF</span>
                                <h3>Mobile</h3>
                                <Link href="/products?term=electronics">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590076792/electronics-category3.jpg" alt="Categories" />

                            <div className="content">
                                <span>30% OFF</span>
                                <h3>Smart Devices</h3>
                                <Link href="/products?term=electronics">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590076817/electronics-category4.jpg" alt="Categories" />

                            <div className="content">
                                <span>20% OFF</span>
                                <h3>Headphone</h3>
                                <Link href="/products?term=electronics">
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