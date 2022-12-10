import Image from "next/image";
import Link from "next/link";
import { handleLogout } from "../../utils/auth";

const MoHeader = ({ user }) => {
  // console.log("header user: ", user);
  return (
    <header className="mo-header">
      <nav>
        <div className="logo">
          <Link href="/">
            <a>
              <Image src="/images/moshoppa-logo.png" width={127} height={52} />
            </a>
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/about">Contact</Link>
          </li>
          {user ? (
            <li>
              <Link href="#">
                <a
                  className={`item`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  <i className="sign-out icon"></i>
                  Logout
                </a>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/auth/login">Sign In</Link>
              </li>
              <li>
                <Link href="/register">Start Now</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MoHeader;
