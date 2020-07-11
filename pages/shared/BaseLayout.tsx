import React, { Component } from 'react';
import Navbar from './Navbar';
import { withCookie, Cookie } from 'next-cookie';
import Router from 'next/router';
import Footer from './Footer';

type Props = {
  children: any;
  cookie?: Cookie;
  navbarTheme?: 'light' | 'dark';
}
type State = {}

class BaseLayout extends Component<Props, State> {
  state = {
    userData: undefined
  }

  static async getInitialProps(request) {
    try {
      return {}
    } catch (error) {
      return {}
    }
  }

  componentDidMount() {
    this.scrollToTop();
  }

  scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // Chrome - Firefox
  }

  render() {
    const { cookie, navbarTheme = 'dark' } = this.props;

    return (<div id='top'>
      <Navbar
        elementId='top'
        cookie={cookie}
        theme={navbarTheme}
      />
      {this.props.children}
      <Footer />
    </div>);
  }
}

export default withCookie(BaseLayout);