import Link from 'next/link';

const Banner = () => {
    return(
        <>
            <div className="main-banner furniture-bg">
                <div className="main-banner-content">
                    <span className="sub-title">Summer Collections</span>
                    <h1>New Arrivals!</h1>
                    <p>Take 20% Off ‘Sale Must-Haves'</p>
                    <div className="btn-box">
                        <Link href="/products?term=furniture">
                            <a className="default-btn">Shop Now</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;