import React from "react";
import App from "next/app";
import Link from "next/link";
import "../css/tailwind.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <div>
          <Link href="/">
            <a className="text-xl font-bold text-purple-800 px-8 hover:text-purple-400">
              Home8
            </a>
          </Link>
          <Link href="/test">
            <a className="text-xl font-bold text-purple-800 px-8 hover:text-purple-400">
              Test2
            </a>
          </Link>
        </div>
        <Component {...pageProps} />
      </div>
    );
  }
}

export default MyApp;
