export const metadata = { title: "Privacy Policy | Small Fix Finds" };

export default function PrivacyPage() {
  return (
    <article>
      <p style={{ letterSpacing: 2, fontSize: 13, color: "#666" }}>PRIVACY POLICY</p>
      <h1>Simple measurement, limited data.</h1>
      <p>Last updated October 9, 2026. This policy explains the information used to operate and improve Small Fix Finds.</p>
      <h2>What we record</h2>
      <p>We may record a visit source, referral page, campaign label, product page, outbound-link click, and the time of the event. This helps us understand which research pages are useful.</p>
      <h2>What we do not request</h2>
      <p>Our public pages do not ask visitors to create an account, enter payment information, or provide sensitive personal information. Purchases are completed on the retailer's website.</p>
      <h2>Visit attribution within a browser tab</h2>
      <p>We use browser session storage to keep the referral channel and campaign label as you move between pages in the same tab. This lets us connect a Pinterest visit with a later outbound-link click. These records describe site events, not a verified purchase or a unique visitor. Storage may be unavailable in some browsers; measurement remains optional and does not block browsing. Find search runs within our site and does not send your query to an external search provider.</p>
      <h2>Owner-only Pinterest integration</h2>
      <p>The site owner may connect the Small Fix Finds Pinterest business account through Pinterest's OAuth authorization page. This integration is available only in the owner's administration area. We do not ask for or store Pinterest passwords or Pinterest session cookies.</p>
      <ul>
        <li>We store encrypted OAuth access and refresh tokens on the server, together with the app configuration, granted permissions, token expiry and connection status. Saved tokens and app secrets are not returned to the browser.</li>
        <li>We retrieve account details and board lists live to verify the connection and let the owner choose a board. These response payloads are not stored. Trial access may request permission to create a Sandbox board after an explicit owner action.</li>
        <li>For each Pin, the owner or an owner-authorized review agent checks its image, title, description, destination, alt text and board before approval. Agent approval applies only to eligible verified product Pins with an owned PNG and is recorded with a review note. Those fields are sent to Pinterest to create the Pin. We keep our own draft, selected board ID, approval and publication records, returned Pin ID and timestamp to track the outcome and prevent duplicate submissions.</li>
        <li>The owner may request live performance metrics for Pins published through the app. These live API responses are used for the current report and are not written to the database. Existing historical performance records remain separate.</li>
      </ul>
      <p>Connection credentials remain in server storage until replaced or cleared by the operator; token expiry alone does not delete the stored connection. Drafts, publication receipts and audit records remain as operational history and have no automatic deletion schedule. The owner can revoke the app's authorization in Pinterest account settings to stop future authorized access; revocation does not delete Pins already created or the site's operational records.</p>
      <p>We do not sell Pinterest account data or provide this connection to other users. Pinterest processes the authorized API requests and published content under its own <a href="https://policy.pinterest.com/en/privacy-policy" rel="noopener" target="_blank">Privacy Policy</a>.</p>
      <h2>Third-party websites</h2>
      <p>Links may lead to Amazon or another retailer. Those services operate under their own privacy policies and may use cookies or similar technologies. Small Fix Finds does not control their checkout or account systems.</p>
      <ul>
        <li>Affiliate links may identify Small Fix Finds as the referring publisher.</li>
        <li>Campaign parameters may identify Pinterest or another traffic source.</li>
        <li>We use collected event information to review aggregate site performance.</li>
      </ul>
      <p>For Amazon's current privacy terms, visit <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ" rel="noopener" target="_blank">Amazon Privacy Notice</a>. Return to <a href="/about">About &amp; Affiliate Disclosure</a>.</p>
    </article>
  );
}
