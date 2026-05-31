import Link from "next/link";

// E-E-A-T signal for search-arrival readers: a stranger who lands on a post
// from Google gets a who-wrote-this credential and a path back to the site.
const AuthorBio = () => (
    <aside className="author-bio" aria-label="About the author">
        <p className="author-bio-name">Luke Banicevic</p>
        <p className="author-bio-text">
            Software Engineer II at ResMed, working on the device-to-cloud comms
            layer between respiratory medical devices and the cloud. Mostly
            embedded, a bit of cloud, a lot of the protocol work in between.{" "}
            <Link href="/">More about me →</Link>
        </p>
    </aside>
);

export default AuthorBio;
