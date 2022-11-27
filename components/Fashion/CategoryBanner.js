import Link from 'next/link';

const CategoryBanner = () => {
    return(
        <>
            <div className="categories-banner-area">
                <div className="ui grid">
                    <div className="four wide column">
                        <div className="single-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1589823075/categories-img1.jpg" alt="category"/>

                            <div className="content text-white">
                                <span>Don’t Miss Today</span>
                                <h3>50% OFF</h3>
                                <Link href="/products?term=fashion">
                                    <a className="default-btn">Discover Now</a>
                                </Link>
                            </div>
                            <Link href="/products?term=fashion">
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1589823075/categories-img2.jpg" alt="category"/>
                            
                            <div className="content">
                                <span>New Collection</span>
                                <h3>Need Now</h3>
                                <Link href="/products?term=fashion">
                                    <a className="default-btn">Discover Now</a>
                                </Link>
                            </div>
                            <Link href="/products?term=fashion">
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1589823075/categories-img3.jpg" alt="category"/>
                            
                            <div className="content">
                                <span>Your Looks</span>
                                <h3>Must Haves</h3>
                                <Link href="/products?term=fashion">
                                    <a className="default-btn">Discover Now</a>
                                </Link>
                            </div>
                            <Link href="/products?term=fashion">
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-categories-box">
                            <img src="https://res.cloudinary.com/dev-empty/image/upload/v1589823075/categories-img4.jpg" alt="category"/>
                             
                            <div className="content text-white">
                                <span>Take 20% OFF</span>
                                <h3>Winter Spring!</h3>
                                <Link href="/products?term=fashion">
                                    <a className="default-btn">Discover Now</a>
                                </Link>
                            </div>
                            <Link href="/products?term=fashion">
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryBanner;