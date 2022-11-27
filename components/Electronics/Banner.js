import Link from 'next/link';

const Banner = () => {
    return(
        <>
            <div className="grocery-main-banner electronics-bg">
                <div className="grocery-banner-content">
                    <h1>Latest Best Devices</h1>
                    
                    <p>Trending products for sale!</p>

                    <h2>50% OFF</h2>

                    <Link href="/products?term=electronics">
                        <a className="default-btn">Shop Now</a>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Banner;