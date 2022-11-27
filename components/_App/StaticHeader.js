import React from 'react';
import Link from "next/link";
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { handleLogout } from '../../utils/auth';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const StaticHeader = ({ user, store }) => {
    const router = useRouter();
    const [menuActive, setMenuActive] = React.useState(false);
    const [search, setSearch] = React.useState({ search: '' })
    // console.log(user)
    // console.log(store)
    const isRoot = user && user.role == 'root';
    const isAdmin = user && user.role == 'admin';
    const isRootOrAdmin = isRoot || isAdmin;
    const hasStore = store && store.status == 'approved'
    // console.log(hasStore);

    const isActive = (route) => {
        return route == router.pathname;
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setSearch(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSearch = (e) => {
        Router.push({
            pathname: '/products',
            query: { term: search.search }
        })
    }

    const menuToggle = () => {
        setMenuActive(!menuActive)
    }

    return (
        <>
            <div className="ui grid navbar-area">
                <div className="computer tablet only row">
                    <div className="ui inverted fixed menu navbar page grid">
                        {/* <Link href="/">
                            <a className={`item ${isActive('/') ? 'active' : null}`}>
                                <i className="home icon"></i>
                                Home
                            </a>
                        </Link> */}

                        <div className="ui simple dropdown item">
                        <i className="home icon"></i>
                            Home Pages
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                <Link href="/">
                                    <a className={`item ${isActive('/') ? 'active' : null}`}>
                                        <i className="shopping basket icon"></i>
                                        Grocery Landing
                                    </a>
                                </Link>
                                <Link href="/covid19">
                                    <a className={`item ${isActive('/covid19') ? 'active' : null}`}>
                                        <i className="medrt icon"></i>
                                        Covid-19 Landing
                                    </a>
                                </Link>
                                <Link href="/furniture">
                                    <a className={`item ${isActive('/furniture') ? 'active' : null}`}>
                                        <i className="won icon"></i>
                                        Furniture Landing
                                    </a>
                                </Link>
                                <Link href="/electronics">
                                    <a className={`item ${isActive('/electronics') ? 'active' : null}`}>
                                        <i className="television icon"></i>
                                        Electronics Landing
                                    </a>
                                </Link>
                                <Link href="/fashion">
                                    <a className={`item ${isActive('/fashion') ? 'active' : null}`}>
                                        <i className="braille icon"></i>
                                        Fashion Landing
                                    </a>
                                </Link>
                                <Link href="/jewelry">
                                    <a className={`item ${isActive('/jewelry') ? 'active' : null}`}>
                                        <i className="certificate icon"></i>
                                        Jewelry Landing
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="ui simple dropdown item">
                            Products
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                <Link href="/products?term=grocery">
                                    <a className={`item`}>
                                        Groceries
                                    </a>
                                </Link>
                                <Link href="/products?term=medical">
                                    <a className={`item`}>
                                        Covid-19
                                    </a>
                                </Link>
                                <Link href="/products?term=furniture">
                                    <a className={`item`}>
                                        Furnitures
                                    </a>
                                </Link>
                                <Link href="/products?term=electronics">
                                    <a className={`item`}>
                                        Electronics
                                    </a>
                                </Link>
                                <Link href="/products?term=fashion">
                                    <a className={`item`}>
                                        Fashions
                                    </a>
                                </Link>
                                <Link href="/products?term=jewelry">
                                    <a className={`item`}>
                                        Jewelry
                                    </a>
                                </Link>
                                <Link href="/products">
                                    <a className={`item`}>
                                        All Products
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <Link href="/cart">
                            <a className={`item ${isActive('/cart') ? 'active' : null}`}>Cart</a>
                        </Link>
                        <Link href="/about">
                            <a className={`item ${isActive('/about') ? 'active' : null}`}>About</a>
                        </Link>
                        <Link href="/sale-request">
                            <a className={`item ${isActive('/sale-request') ? 'active' : null}`}>Sale?</a>
                        </Link>

                        <div className="right menu">
                            {user ? (
                                <>
                                    <div className="ui simple dropdown item">
                                        {user.name}
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            {isRootOrAdmin && (
                                                <Link href="/admin/dashboard">
                                                    <a className={`item ${isActive('/admin/dashboard') ? 'active' : null}`}>
                                                        <i className="dashboard icon"></i>
                                                        Dashboard
                                                    </a>
                                                </Link>
                                            )}

                                            <Link href="/profile">
                                                <a className={`item ${isActive('/profile') ? 'active' : null}`}>
                                                    <i className="user icon"></i>
                                                    My Profile
                                                </a>
                                            </Link>

                                            <Link href="/my-orders-history">
                                                <a className={`item ${isActive('/my-orders-history') ? 'active' : null}`}>
                                                    <i className="history icon"></i>
                                                    My Orders History
                                                </a>
                                            </Link>

                                            {hasStore && (
                                                <Link href="/stores/dashboard">
                                                    <a className={`item ${isActive('/stores/dashboard') ? 'active' : null}`}>
                                                        <i className="history icon"></i>
                                                        Store Dashboard
                                                    </a>
                                                </Link>
                                            )}

                                            <div className="divider"></div>

                                            <Link href="#">
                                                <a className={`item`} onClick={e => { e.preventDefault(); handleLogout() }}>
                                                    <i className="sign-out icon"></i>
                                                    Logout
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/auth/login">
                                        <a className={`item ${isActive('/auth/login') ? 'active' : null}`}>
                                            Login
                                        </a>
                                    </Link>

                                    <Link href="/auth/signup">
                                        <a className={`item ${isActive('/auth/signup') ? 'active' : null}`}>
                                            Signup
                                        </a>
                                    </Link>
                                </>
                            )}

                            <form className="ui form" onSubmit={e => { e.preventDefault(); handleSearch() }}>
                                <div className="ui transparent icon input">
                                    <input
                                        className="prompt"
                                        type="text"
                                        placeholder="Search..."
                                        name='search'
                                        value={search.search}
                                        onChange={handleOnChange}
                                    />
                                    <i onClick={e => { e.preventDefault(); handleSearch() }} className="search link icon"></i>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                <div className="mobile only row">
                    <div className="ui fixed inverted navbar menu">
                        <Link href="/">
                            <a className="brand item">Shoponix</a>
                        </Link>
                        <div className="right menu open">
                            <Link href="#">
                                <a onClick={e => { e.preventDefault(); menuToggle() }} className="menu item">
                                    <i className="align justify icon"></i>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className={`ui vertical navbar menu ${menuActive ? 'mobile-active-show' : 'mobile-active-hide'}`}>
                        <Link href="/">
                            <a className={`item ${isActive('/') ? 'active' : null}`} onClick={menuToggle}>
                                <i className="home icon"></i>
                                Home
                            </a>
                        </Link>
                        <div className="ui simple pointing left dropdown item">
                            Home Pages
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                <Link href="/">
                                    <a className={`item ${isActive('/') ? 'active' : null}`} onClick={menuToggle}>
                                        <i className="shopping basket icon"></i>
                                        Grocery Landing
                                    </a>
                                </Link>
                                <Link href="/covid19">
                                    <a className={`item ${isActive('/covid19') ? 'active' : null}`} onClick={menuToggle}>
                                        <i className="medrt icon"></i>
                                        Covid-19 Landing
                                    </a>
                                </Link>
                                <Link href="/furniture">
                                    <a className={`item ${isActive('/furniture') ? 'active' : null}`} onClick={menuToggle}>
                                        <i className="won icon"></i>
                                        Furniture Landing
                                    </a>
                                </Link>
                                <Link href="/electronics">
                                    <a className={`item ${isActive('/electronics') ? 'active' : null}`} onClick={menuToggle}>
                                        <i className="television icon"></i>
                                        Electronics Landing
                                    </a>
                                </Link>
                                <Link href="/fashion">
                                    <a className={`item ${isActive('/fashion') ? 'active' : null}`} onClick={menuToggle}>
                                        <i className="braille icon"></i>
                                        Fashion Landing
                                    </a>
                                </Link>
                                <Link href="/jewelry">
                                    <a className={`item ${isActive('/jewelry') ? 'active' : null}`} onClick={menuToggle}>
                                        <i className="certificate icon"></i>
                                        Jewelry Landing
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="ui simple pointing left dropdown item">
                            Products
                            <i className="dropdown icon"></i>
                            <div className="menu">
                                <Link href="/products?term=grocery">
                                    <a className={`item`} onClick={menuToggle}>
                                        Groceries
                                    </a>
                                </Link>
                                <Link href="/products?term=medical">
                                    <a className={`item`} onClick={menuToggle}>
                                        Covid-19
                                    </a>
                                </Link>
                                <Link href="/products?term=furniture">
                                    <a className={`item`} onClick={menuToggle}>
                                        Furnitures
                                    </a>
                                </Link>
                                <Link href="/products?term=electronics">
                                    <a className={`item`} onClick={menuToggle}>
                                        Electronics
                                    </a>
                                </Link>
                                <Link href="/products?term=fashion">
                                    <a className={`item`} onClick={menuToggle}>
                                        Fashions
                                    </a>
                                </Link>
                                <Link href="/products?term=jewelry">
                                    <a className={`item`} onClick={menuToggle}>
                                        Jewelry
                                    </a>
                                </Link>
                                <Link href="/products">
                                    <a className={`item`} onClick={menuToggle}>
                                        All Products
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <Link href="/cart">
                            <a className={`item ${isActive('/cart') ? 'active' : null}`} onClick={menuToggle}>Cart</a>
                        </Link>
                        <Link href="/about">
                            <a className={`item ${isActive('/about') ? 'active' : null}`} onClick={menuToggle}>About</a>
                        </Link>

                        <div className="menu root-user">
                            {user ? (
                                <>
                                    <div className="ui simple dropdown item">
                                        {user.name}
                                        <i className="dropdown icon"></i>
                                        <div className="menu">
                                            {isRootOrAdmin && (
                                                <Link href="/admin/dashboard">
                                                    <a className={`item ${isActive('/admin/dashboard') ? 'active' : null}`} onClick={menuToggle}>
                                                        <i className="dashboard icon"></i>
                                                        Dashboard
                                                    </a>
                                                </Link>
                                            )}

                                            <Link href="/profile">
                                                <a className={`item ${isActive('/profile') ? 'active' : null}`} onClick={menuToggle}>
                                                    <i className="user icon"></i>
                                                    My Profile
                                                </a>
                                            </Link>

                                            <Link href="/my-orders-history">
                                                <a className={`item ${isActive('/my-orders-history') ? 'active' : null}`} onClick={menuToggle}>
                                                    <i className="history icon"></i>
                                                    My Orders History
                                                </a>
                                            </Link>

                                            {hasStore && (
                                                <Link href="/stores/dashboard">
                                                    <a className={`item ${isActive('/stores/dashboard') ? 'active' : null}`}>
                                                        <i className="history icon"></i>
                                                        Store Dashboard
                                                    </a>
                                                </Link>
                                            )}

                                            <div className="divider"></div>

                                            <Link href="#">
                                                <a className={`item`} onClick={handleLogout} onClick={menuToggle}>
                                                    <i className="sign-out icon"></i>
                                                    Logout
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link href="/auth/login">
                                        <a className={`item ${isActive('/auth/login') ? 'active' : null}`} onClick={menuToggle}>
                                            Login
                                        </a>
                                    </Link>

                                    <Link href="/auth/signup">
                                        <a className={`item ${isActive('/auth/signup') ? 'active' : null}`} onClick={menuToggle}>
                                            Signup
                                        </a>
                                    </Link>
                                </>
                            )}
                            
                            <form className="ui form" onSubmit={e => { e.preventDefault(); handleSearch(); menuToggle() }}>
                                <div className="ui transparent icon input">
                                    <input
                                        className="prompt"
                                        type="text"
                                        placeholder="Search..."
                                        name='search'
                                        value={search.search}
                                        onChange={handleOnChange}
                                    />
                                    <i onClick={e => { e.preventDefault(); handleSearch(); menuToggle() }} className="search link icon"></i>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StaticHeader;