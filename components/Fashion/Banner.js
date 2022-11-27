import Link from 'next/link';

const Banner = () => {
    return(
        <>
            <div className="main-banner">
                <div className="main-banner-content">
                    <span className="sub-title">Limited Time Offer!</span>
                    <h1>Winter-2020!</h1>
                    <p>Take 20% Off ‘Sale Must-Haves'</p>
                    
                    <div className="btn-box">
                        <Link href="/products?term=fashion">
                            <a className="default-btn">Shop Women's</a>
                        </Link>
                        <Link href="/products?term=fashion">
                            <a className="optional-btn">Shop Men's</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;