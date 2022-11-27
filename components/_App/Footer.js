import Link from 'next/link';
import { useRouter } from 'next/router';

const Footer = ({ user }) => {
    const currentYear = new Date().getFullYear();

    const router = useRouter();
    // console.log(user)
    const isRoot = user && user.role == 'root';
    const isAdmin = user && user.role == 'admin';
    // const isRootOrAdmin = isRoot || isAdmin;

    const isActive = (route) => {
        return route == router.pathname;
    }
    return (
        <>
            <footer className="footer-area">
                <div className="ui grid">
                    <div className="four wide column">
                        <div className="single-footer-widget">
                            <h3>About The Store</h3>

                            <div className="about-the-store">
                                <p>The Store at Shoponix is an original voice, and one of the leading shopping destinations in New York City, offering a curated selection of well-executed contemporary artist-made objects and jewelry.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="four wide column">
                        <div className="single-footer-widget pl-4">
                            <h3>Quick Links</h3>

                            <ul className="quick-links">
                                <li>
                                    <Link href="/about">
                                        <a>About Us</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products">
                                        <a>Shop Now!</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products">
                                        <a>Cart</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-footer-widget">
                            <h3>Support Links</h3>

                            <ul className="customer-support">
                                {user ? (
                                    <>
                                        <li>
                                            <Link href="/profile">
                                                <a>My Profile</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/my-orders-history">
                                                <a>My Orders History</a>
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                    <li>
                                        <Link href="/auth/signup">
                                            <a>Signup</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/auth/login">
                                            <a>Login</a>
                                        </Link>
                                    </li>
                                    </>
                                )}
                                <li>
                                    <Link href="/">
                                        <a>Home</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="four wide column">
                        <div className="single-footer-widget">
                            <h3>Contact Info</h3>

                            <ul className="footer-contact-info">
                                <li><a href="#" target="_blank">Wonder Street, USA, New York</a></li>
                                <li><a href="tel:+01321654214">+01 321 654 214</a></li>
                                <li><a href="mailto:hello@shoponix.com">hello@shoponix.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-area">
                    <p>Copyright &copy; {currentYear} <a href="/">Shoponix</a> Designed By <a href="https://envytheme.com/" target="_blank">EnvyTheme</a> | All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;