// React Basic and Bootstrap
import React, { Component } from "react";

// Import Generic Components
import Section from "./section";

const LandingTwo = React.lazy(() => import("../LandingTwo/index"));
const Topbar = React.lazy(() => import("./Topbar"));
const Saas = React.lazy(() => import("../Saas/index"));
const Footer = React.lazy(() => import("../../components/Layout/Footer"));

class IndexMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.scrollNavigation = this.scrollNavigation.bind(this);
  }

  componentDidMount() {
    document.body.classList = "";
    window.addEventListener("scroll", this.scrollNavigation, true);
  }

  // Make sure to remove the DOM listener when the component is unmounted.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  //   scrollNavigation = () => {
  //     var doc = document.documentElement;
  //     var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  //     if (top > 80) {
  //       document.getElementById("topnav").classList.add("nav-sticky");
  //     } else {
  //       document.getElementById("topnav").classList.remove("nav-sticky");
  //     }
  //   };

  render() {
    return (
      <React.Fragment>
        <Topbar />
        {/* Home Section */}
        <Section />

        <LandingTwo />
        <Saas />
        <Footer />
      </React.Fragment>
    );
  }
}

export default IndexMain;
