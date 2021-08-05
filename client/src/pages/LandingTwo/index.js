import React, { Component } from "react";
import Features from "./Features";
import Reviews from "./Reviews";
import Section from "./Section";
import Team from "./Team";
import SectionTitle from "../../components/Shared/SectionTitle";
import BlogBox from "../../components/Shared/BlogBox";
import { Container, Row } from "reactstrap";

// Blog Images
import blog1 from "../../assets/images/blog/01.jpg";
import blog2 from "../../assets/images/blog/02.jpg";
import blog3 from "../../assets/images/blog/03.jpg";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [
        {
          id: 1,
          image: blog1,
          title: "Design your apps in your own way",
          like: "33",
          comment: "08",
          autor: "Calvin Carlo",
          date: "13th August, 2019",
        },
        {
          id: 2,
          image: blog2,
          title: "How apps is changing the IT world",
          like: "33",
          comment: "08",
          autor: "Calvin Carlo",
          date: "13th August, 2019",
        },
        {
          id: 3,
          image: blog3,
          title: "Smartest Applications for Business",
          like: "33",
          comment: "08",
          autor: "Calvin Carlo",
          date: "13th August, 2019",
        },
      ],
    };
  }
  componentDidMount() {
    document.body.classList = "";
    window.addEventListener("scroll", this.scrollNavigation, true);

    var featurebox = document.getElementsByName("featurebox");
    for (var i = 0; i < featurebox.length; i++) {
      if (i !== 0) {
        featurebox[i].classList.add("mt-5");
        featurebox[i].classList.add("mt-sm-0");
      }
    }
  }

  // Make sure to remove the DOM listener when the component is unmounted.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  render() {
    return (
      <React.Fragment>
        <section className="section bg-light">
          <Features />
        </section>
      </React.Fragment>
    );
  }
}
