import styles from "./Legal.module.scss";

export default function Privacy() {
  return (
    <section className={styles.page}>
      <h1>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: April 1, 2026</p>

      <p>
        Cimurk ("we", "us", "our") is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, store, and protect
        your information when you use our platform.
      </p>

      <h2>1. Information We Collect</h2>

      <h3>1.1 Information You Provide</h3>
      <ul>
        <li>
          Account information: When you sign in via Google, we receive your
          name, email address, and profile picture from your Google account.
        </li>
        <li>
          Project submissions: Title, description, category, stage, timeline,
          budget estimate, and optionally your name.
        </li>
        <li>
          Comments: Text content you post in project discussions, along with
          your display name and timestamp.
        </li>
        <li>Votes: Your upvote or downvote actions on projects.</li>
      </ul>

      <h3>1.2 Information Collected Automatically</h3>
      <ul>
        <li>
          Usage data: Pages visited, features used, timestamps, and interaction
          patterns.
        </li>
        <li>
          Device information: Browser type, operating system, screen resolution,
          and language preferences.
        </li>
        <li>
          IP address: Collected for security, abuse prevention, and analytics
          purposes.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Provide, operate, and maintain the Platform.</li>
        <li>Display your name and comments in project discussions.</li>
        <li>Track and display vote counts on projects.</li>
        <li>Prevent abuse, fraud, and manipulation of the voting system.</li>
        <li>Improve the Platform's functionality and user experience.</li>
        <li>
          Communicate with you about Platform updates or policy changes, if
          applicable.
        </li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>3. Legal Basis for Processing</h2>
      <p>We process your personal data based on:</p>
      <ul>
        <li>
          Consent: By signing in and using the Platform, you consent to the
          collection and use of your data as described here.
        </li>
        <li>
          Legitimate interest: To operate, secure, and improve the Platform.
        </li>
        <li>Legal obligation: To comply with applicable laws and regulations.</li>
      </ul>

      <h2>4. Data Sharing and Disclosure</h2>
      <p>We do not sell your personal information. We may share data with:</p>
      <ul>
        <li>
          Service providers: Third-party services that help us operate the
          Platform (e.g., hosting, analytics), bound by confidentiality
          agreements.
        </li>
        <li>
          Authentication providers: Google, for the purpose of sign-in. Google's
          use of your data is governed by{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's Privacy Policy
          </a>
          .
        </li>
        <li>
          Legal authorities: If required by law, court order, or governmental
          request, or to protect the rights, safety, or property of Cimurk or
          others.
        </li>
      </ul>

      <h2>5. Public Information</h2>
      <p>
        The following information is publicly visible on the Platform and should
        be considered non-confidential:
      </p>
      <ul>
        <li>Project submissions (title, description, category, stage, timeline, budget, author name if provided).</li>
        <li>Comments and your display name in discussions.</li>
        <li>Vote counts (individual votes are not publicly attributed).</li>
      </ul>

      <h2>6. Data Retention</h2>
      <p>
        We retain your data for as long as your account is active or as needed
        to provide services. If you request deletion of your data, we will
        remove it within a reasonable timeframe, except where retention is
        required by law or for legitimate business purposes (e.g., abuse
        prevention).
      </p>

      <h2>7. Data Security</h2>
      <p>
        We implement reasonable technical and organizational measures to protect
        your data against unauthorized access, alteration, disclosure, or
        destruction. However, no method of transmission over the internet or
        electronic storage is 100% secure, and we cannot guarantee absolute
        security.
      </p>

      <h2>8. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request deletion of your data.</li>
        <li>Object to or restrict processing of your data.</li>
        <li>Request portability of your data.</li>
        <li>Withdraw consent at any time.</li>
      </ul>
      <p>
        To exercise any of these rights, please contact us through our social
        media channels or the Platform's contact mechanisms.
      </p>

      <h2>9. Cookies and Local Storage</h2>
      <p>
        The Platform may use cookies, local storage, or similar technologies to
        maintain session state, remember preferences, and improve user
        experience. You can control cookie settings through your browser, but
        disabling them may affect Platform functionality.
      </p>

      <h2>10. Children's Privacy</h2>
      <p>
        The Platform is not intended for children under 13 years of age. We do
        not knowingly collect personal information from children under 13. If we
        become aware that we have collected data from a child under 13, we will
        take steps to delete it promptly.
      </p>

      <h2>11. International Data Transfers</h2>
      <p>
        Your data may be transferred to and processed in countries other than
        your country of residence. These countries may have different data
        protection laws. By using the Platform, you consent to such transfers.
        We take appropriate safeguards to ensure your data remains protected.
      </p>

      <h2>12. Third-Party Links</h2>
      <p>
        The Platform may contain links to third-party websites or services. We
        are not responsible for the privacy practices of these third parties. We
        encourage you to review their privacy policies before providing any
        personal information.
      </p>

      <h2>13. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated "Last updated" date. Continued use
        of the Platform after changes constitutes acceptance of the revised
        policy.
      </p>

      <h2>14. Contact</h2>
      <p>
        If you have questions or concerns about this Privacy Policy or our data
        practices, please reach out to us through our social media channels or
        the Platform's contact mechanisms.
      </p>
    </section>
  );
}
