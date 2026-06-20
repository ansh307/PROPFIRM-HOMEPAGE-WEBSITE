import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Privacy Policy | EFT",
  description:
    "Privacy Policy for EFT - Learn how we protect and handle your personal information.",
};

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-32">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy <span className="text-green-600">Policy</span>
          </h1>
          <p className="text-gray-400 text-sm">Effective as of May 2, 2026</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <p>
              Epic Future Traders (“the Company”, “we”, “us”, or “our”) is
              committed to protecting your personal data and privacy. This
              Privacy Policy explains how we collect, use, store, and protect
              your information when you use our website, platform, and services.
              By accessing or using our services, you agree to the terms of this
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              1. Information We Collect
            </h2>
            <p>
              We may collect and process the following types of personal data:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing and payment information</li>
              <li>IP address and device information</li>
              <li>Trading activity and account data</li>
            </ul>
            <p className="mt-2">
              We may also collect additional information required for identity
              verification or compliance purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              2. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li>Provide and manage our services</li>
              <li>Process payments and transactions</li>
              <li>Verify your identity and prevent fraud</li>
              <li>Communicate with you regarding your account</li>
              <li>Improve our platform and user experience</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              3. Payment Processing
            </h2>
            <p>
              All payments are processed through secure third-party payment
              providers. We do not store full credit or debit card details on
              our servers. By making a payment, you agree to the terms and
              privacy policies of the respective payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              4. Data Sharing
            </h2>
            <p>
              We do not sell your personal data. However, we may share your
              information with:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li>Payment processors and financial institutions</li>
              <li>Service providers assisting in operations</li>
              <li>Legal or regulatory authorities when required</li>
            </ul>
            <p className="mt-2">
              All third parties are required to handle your data securely and in
              accordance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              5. Data Retention
            </h2>
            <p>
              We retain your personal data only for as long as necessary to
              fulfill the purposes outlined in this policy, including legal,
              accounting, and reporting requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              6. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your data from unauthorized access, misuse, loss, or
              disclosure. However, no system is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              7. Your Rights
            </h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
            </ul>
            <p className="mt-2">
              Requests can be made by contacting our support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              8. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar technologies to enhance user
              experience, analyze website traffic, and improve our services. By
              using our website, you consent to the use of cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              9. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of such websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              10. International Data Transfers
            </h2>
            <p>
              Your information may be transferred and stored in servers located
              outside your country. By using our services, you consent to such
              transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              11. Changes to This Policy
            </h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at
              any time. Continued use of our services constitutes acceptance of
              the updated policy.
            </p>
          </section>

          <section className="border-t border-zinc-800 pt-6">
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              12. Contact Information
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              you may contact us through the official support channels provided
              on our website or email us at{" "}
              <a
                href="mailto:support@EFT.com"
                className="text-green-600 hover:text-green-500 underline"
              >
                support@EFT.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
