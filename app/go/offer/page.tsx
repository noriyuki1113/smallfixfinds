"use client";
// Static stand-in for the live site's /go/offer redirect.
// The live server redirected /go/offer?item=roll-up-drying-mat to the Amazon
// listing; with one find, this page sends every item value to that listing.
import { useEffect } from "react";
import { AMAZON_URL } from "../../../lib/content";

export default function OfferRedirect() {
  useEffect(() => {
    window.location.replace(AMAZON_URL);
  }, []);
  return (
    <article>
      <h1>Taking you to the listing…</h1>
      <p>
        If you are not redirected automatically,{" "}
        <a href={AMAZON_URL} rel="sponsored nofollow noopener">open the Amazon product page</a>.
      </p>
      <p>
        As an Amazon Associate I earn from qualifying purchases. Prices and availability may change;
        confirm the current listing before ordering.
      </p>
    </article>
  );
}
