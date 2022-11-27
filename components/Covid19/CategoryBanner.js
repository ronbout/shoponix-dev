import Link from 'next/link';

const CategoryBanner = () => {
    return(
        <>
            <div className="grocery-categories-banner-area">
                <div className="ui grid">
                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590075846/covid-category1.jpg" alt="Categories" />

                            <div className="content">
                                <span>50% OFF</span>
                                <h3>Sanitizer</h3>
                                <Link href="/products?term=medical">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590075914/covid-category2.jpg" alt="Categories" />

                            <div className="content">
                                <span>40% OFF</span>
                                <h3>Masks</h3>
                                <Link href="/products?term=medical">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590075935/covid-category3.jpg" alt="Categories" />

                            <div className="content">
                                <span>30% OFF</span>
                                <h3>PPE</h3>
                                <Link href="/products?term=medical">
                                    <a className="default-btn">Shop Now</a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-grocery-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1590075960/covid-category4.jpg" alt="Categories" />

                            <div className="content">
                                <span>20% OFF</span>
                                <h3>Gloves</h3>
                                <Link href="/products?term=medical">
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