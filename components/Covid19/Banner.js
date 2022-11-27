import Link from 'next/link';

const Banner = () => {
    return(
        <>
            <div className="covid-main-banner">
                <div className="covid-banner-content">
                    <div className="line"></div>

                    <span className="sub-title">Trending Collection</span>
                    
                    <h1>Hand Sanitizer</h1>

                    <p>Be Clean & Keep Clean, Maintain Social Distance, Avoid All Kinds of Crowds including Social Gathering, Protect Yourself and Others, Save Humankind!</p>

                    <Link href="/products?term=medical">
                        <a className="default-btn">Shop Now</a>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Banner;