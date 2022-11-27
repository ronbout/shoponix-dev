import Link from 'next/link';

const OfferArea = () => {
    return(
        <>
            <section className="offer-area">
                <div className="offer-content">
                    <span className="sub-title">Limited Time Offer!</span>
                    <h2>-40% OFF</h2>
                    <p>Get The Best Deals Now</p>
                    <Link href="#">
                        <a onClick={e => e.preventDefault()} className="default-btn">Discover Now</a>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default OfferArea;