import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import CountUp from "react-countup";
import classnames from "classnames";

//Import Images
import aboutus from "../../assets/images/company/aboutus.jpg";
import about2 from "../../assets/images/company/about2.png";
import amazon from "../../assets/images/client/amazon.svg";
import google from "../../assets/images/client/google.svg";
import lenovo from "../../assets/images/client/lenovo.svg";
import paypal from "../../assets/images/client/paypal.svg";
import shopify from "../../assets/images/client/shopify.svg";
import spotify from "../../assets/images/client/spotify.svg";
import WorkProcess from "../../components/Shared/WorkProcess";
import work1 from "../../assets/images/work/7.jpg";
import work2 from "../../assets/images/work/8.jpg";
import work3 from "../../assets/images/work/9.jpg";
import work4 from "../../assets/images/work/12.jpg";
import ExperienceTeam from "../CorporateBusiness/ExperienceTeam";

import Topbar from "../Home/Topbar";

export default class PageAboutusTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      partners: [
        {
          id: 1,
          img: amazon,
        },
        {
          id: 2,
          img: google,
        },
        {
          id: 3,
          img: lenovo,
        },
        {
          id: 4,
          img: paypal,
        },
        {
          id: 5,
          img: shopify,
        },
        {
          id: 6,
          img: spotify,
        },
      ],
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    this.setState({ activeTab: tab });
  }

  componentDidMount() {
    document.body.classList = "";
    document.getElementById("top-menu").classList.add("nav-light");
    document.getElementById("buyButton").className = "btn btn-light";
    window.addEventListener("scroll", this.scrollNavigation, true);
  }

  // Make sure to remove the DOM listener when the component is unmounted.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  scrollNavigation = () => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 80) {
      document.getElementById("topnav").classList.add("nav-sticky");
      document.getElementById("buyButton").className = "btn btn-primary";
    } else {
      document.getElementById("topnav").classList.remove("nav-sticky");
      document.getElementById("buyButton").className = "btn btn-light";
    }
  };
  render() {
    return (
      <React.Fragment>
        <Topbar />

        <section
          className="bg-half d-table w-100"
          style={{ background: `url(${aboutus})` }}
        >
          <div className="bg-overlay"></div>
          <Container>
            <Row className="justify-content-center">
              <Col lg={12} className="text-center">
                <div className="page-next-level title-heading">
                  <h1 className="text-white title-dark"> Aboutus </h1>
                  <p className="text-white-50 para-desc mb-0 mx-auto">
                    Start working with comapany name that can provide everything you
                    need to generate awareness, drive traffic, connect.
                  </p>
                  {/* <div className="page-next">
                    <nav aria-label="breadcrumb" className="d-inline-block">
                      <ul className="breadcrumb bg-white rounded shadow mb-0">
                        <li className="breadcrumb-item">
                          <Link to="/index">comapany name</Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link to="#">Company</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Aboutus
                        </li>
                      </ul>
                    </nav>
                  </div> */}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg
              viewBox="0 0 2880 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <section className="section">
          <Container>
            <Row className="align-items-center" id="counter">
              <Col md={6}>
                <img src={about2} className="img-fluid" alt="" />
              </Col>

              <Col md={6} className="mt-4 pt-2 mt-sm-0 pt-sm-0">
                <div className="ms-lg-4">
                  <div className="d-flex mb-4">
                    <span className="text-primary h1 mb-0">
                      <span className="counter-value display-1 fw-bold">
                        <CountUp start={0} end={15} duration={12} />
                      </span>
                      +
                    </span>
                    <span className="h6 align-self-end ms-2">
                      Years <br /> Experience
                    </span>
                  </div>
                  <div className="section-title">
                    <h4 className="title mb-4">Who we are ?</h4>
                    <p className="text-muted">
                      Start working with{" "}
                      <span className="text-primary fw-bold">comapany name</span>{" "}
                      that can provide everything you need to generate
                      awareness, drive traffic, connect. Dummy text is text that
                      is used in the publishing industry or by web designers to
                      occupy the space which will later be filled with 'real'
                      content. This is required when, for example, the final
                      text is not yet available. Dummy texts have been in use by
                      typesetters since the 16th century.
                    </p>
                    <Link to="#" className="btn btn-primary mt-3">
                      Contact us
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}
