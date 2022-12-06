import { Container, Icon } from "semantic-ui-react";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  return (
    <>
      <Container className="register">
        <div className="about-area bg-white">
          <h3></h3>
          <div className="ui grid mb-10">
            <div className="seven wide column">
              <q>
                MoShoppa is the best thing I've used in ages! I've been able to
                buy all of my children's kit and give back to the club at no
                extra cost!
              </q>
            </div>

            <div className="eight wide column">
              <div>
                <h3>Join Us!</h3>
                <p>Select the account type you want to register</p>
              </div>
              <Link
                href={{
                  pathname: "auth/signup",
                  query: { type: "club" },
                }}
              >
                <div className="register-type">
                  <div style={{ paddingLeft: "10px" }}>
                    <Image src="/images/shield.png" width={45} height={53} />
                  </div>
                  <div>
                    <h4>Club</h4>
                    <p>Own or work for a club? This is for you</p>
                  </div>
                </div>
              </Link>
              <Link
                href={{
                  pathname: "auth/signup",
                  query: { type: "parent" },
                }}
              >
                <div className="register-type">
                  <div>
                    <Icon size="huge" name="user outline" />
                  </div>
                  <div>
                    <h4>Parent</h4>
                    <p>Personal account to shop and donate!</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
