import Link from 'next/link';

const CategoryBanner = () => {
    return(
        <>
            <div className="grocery-categories-banner-area">
                <div className="ui grid">
                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590006640/grocery-category1.jpg" alt="category"/>

                            <div className="content">
                                <span>50% OFF</span>
                                <h3>Vegetables</h3>
                                <Link href="/products?term=grocery">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590006666/grocery-category2.jpg" alt="category"/>

                            <div className="content">
                                <span>40% OFF</span>
                                <h3>Meats</h3>
                                <Link href="/products?term=grocery">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590006689/grocery-category3.jpg" alt="category"/>

                            <div className="content">
                                <span>30% OFF</span>
                                <h3>Fruits</h3>
                                <Link href="/products?term=grocery">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590006709/grocery-category4.jpg" alt="category"/>

                            <div className="content">
                                <span>20% OFF</span>
                                <h3>Eggs</h3>
                                <Link href="/products?term=grocery">
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