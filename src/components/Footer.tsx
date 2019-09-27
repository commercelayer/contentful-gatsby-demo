import * as React from 'react'

const Footer = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      <p>
        <strong>Like what you see? </strong>
        Read the step-by-step tutorial on the{' '}
        <a href="https://www.contentful.com/blog/2018/11/07/how-build-static-site-ecommerce-jekyll-contentful-commerce-layer/">
          Contentful's blog
        </a>
        .
      </p>
      © {new Date().getFullYear()} Made with 💖 by Commerce Layer
    </div>
  </footer>
)

export default Footer
