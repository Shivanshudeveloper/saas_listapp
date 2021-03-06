import React, { Component } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import ScrollspyNav from "./scrollSpy";
import logo from "../../assets/images/logo.png";

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        { id: 1, idnm: "", navheading: "Home" },
        { id: 2, idnm: "pricing", navheading: "Pricing" },
        { id: 3, idnm: "blogs", navheading: "Blogs" },
        { id: 4, idnm: "aboutus", navheading: "About Us" },
      ],
      isOpen: false,
    };
    this.toggleLine = this.toggleLine.bind(this);
  }

  toggleLine() {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    //Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
    let targetId = this.state.navItems.map((item) => {
      return item.idnm;
    });
    return (
      <React.Fragment>
        <header
          id="topnav"
          className="defaultscroll sticky"
          style={{ background: "white" }}
        >
          <Container>
            <Link className="logo" to="/">
              <img src={logo} width="70" alt="logo" />
            </Link>
            <div className="buy-button">
              <a
                href="https://saas-listapp-dashboard.vercel.app/auth/login-unprotected"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Go to console
              </a>
            </div>
            <div className="menu-extras">
              <div className="menu-item">
                <Link
                  to="#"
                  onClick={this.toggleLine}
                  className={
                    this.state.isOpen ? "navbar-toggle open" : "navbar-toggle"
                  }
                >
                  <div className="lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </Link>
              </div>
            </div>
            {/* <ScrollspyNav
              scrollTargetIds={targetId}
              scrollDuration="800"
              headerBackground="false"
              activeNavClass="active"
            > */}
            <div
              id="navigation"
              style={{ display: this.state.isOpen ? "block" : "none" }}
            >
              <ul className="navigation-menu">
                {this.state.navItems.map((item, key) => (
                  <li key={key} className="has-submenu">
                    <a href={`/${item.idnm}`}> {item.navheading}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* </ScrollspyNav> */}
          </Container>
        </header>
      </React.Fragment>
    );
  }
}

export default Topbar;
