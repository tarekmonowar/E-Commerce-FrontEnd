export interface FooterLinkData {
  id: string;
  title: string;
  content: string;
  image?: string;
}

export const footerLinksData: FooterLinkData[] = [
  {
    id: "about-us",
    title: "About Us",
    content: `
      
       <h2><strong>About Our Store</strong></h2>
      <p>We’re an e-commerce brand founded by Tarek Monowar, focused on quality products, fast delivery, and customer satisfaction. From fashion to gadgets — we bring you what you need, at the price you want.</p>

      <h3><strong>Why Shop With Us?</strong></h3>
      <ul>
        <li>Curated quality items !</li>
        <li>Affordable prices & frequent deals</li>
        <li>Fast worldwide delivery !</li>
        <li>Easy returns</li>
        <li>Secure checkout</li>
      </ul>
    `,
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    content: `
      
       <h2><strong>Your Privacy Matters</strong></h2>

      <p>We collect only essential info to fulfill your orders and improve your experience. Your data is never sold and is always secured.</p>
             <h2><strong>We Collect:</strong></h2>
      <ul>
        <li>Name, email, and shipping address</li>
        <li>Order history and preferences</li>
      </ul>

      
      <h2><strong>We Use It To:</strong></h2>
      
      <ul>
        <li>Deliver orders & provide support</li>
        <li>Improve your shopping experience</li>
      </ul>

      <p>Contact us at privacy@company.com with any questions.</p>
    `,
  },
  {
    id: "terms-conditions",
    title: "Terms & Conditions",
    content: `
     
       <h2><strong>Terms of Use</strong></h2>
      <p>By using our site, you agree to our terms — simple, clear, and built for fairness.</p>

      <ul>
        <li>We may update products or pricing anytime</li>
        <li>Orders may be canceled due to stock or fraud checks</li>
        <li>Returns accepted within 30 days of delivery</li>
      </ul>

      <p><strong>Use of this site is governed by Bangladeshi law. Questions? Contact legal@company.com</strong></p>
    `,
  },
  {
    id: "faqs",
    title: "Frequently Asked Questions",
    content: `
      <h2><strong>FAQs</strong></h2>

      <h3><strong>Do I need an account?</strong></h3>
      <p>Yes, to place orders and track deliveries.</p>

      <h3><strong>How long is delivery?</strong></h3>
      <p>3–7 business days for most locations.</p>

      <h3><strong>How do I return an item?</strong></h3>
      <p>Login to your account & request a return within 30 days.</p>

      <h3><strong>What payments do you accept?</strong></h3>
      <p>All major cards, bKash, Rocket, PayPal & mobile banking.</p>

      <h3><strong>Need help?</strong></h3>
      <p>Email us anytime at support@company.com</p>
    `,
  },
  {
    id: "order-tracking",
    title: "Order Tracking",
    content: `
      <h2><strong>Track Your Order</strong></h2>
      <p>After shipping, we’ll email you a tracking link. You can also check your account’s order history for live updates.</p>

      <h3>Order Status:</h3>
      <ul>
        <li><strong>Processing</strong>: We’re packing it</li>
        <li><strong>Shipped</strong>: On the way</li>
        <li><strong>Delivered</strong>: Order received</li>
      </ul>

      <p>Need help? Reach us at support@company.com or call 1-800-XXX-XXXX</p>
    `,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `
    <h2><strong>We’d Love to Hear From You</strong></h2>
    <p>Whether you have a question about your order, need help with a product, or just want to say hello — we’re here for you.</p>

    <h3><strong>Contact Channels</strong></h3>
    <ul>
      <li>Email: <a href="mailto:support@company.com">support@company.com</a></li>
      <li>Phone: +880-1XXX-XXXXXX</li>
      <li>Live Chat: Available 9 AM – 6 PM (GMT+6)</li>
      <li>Facebook: <a href="https://www.facebook.com/tarekmonowar53" target="_blank">facebook.com/tarkmonowar</a></li>
    </ul>

    <h3><strong>Visit Our Office</strong></h3>
    <p>123 Commerce Street, Sylhet, Bangladesh</p>

    <p><strong>Customer Support Hours:</strong><br />
    Saturday – Thursday: 9 AM – 6 PM<br />
    Friday: Closed</p>
  `,
  },
];
