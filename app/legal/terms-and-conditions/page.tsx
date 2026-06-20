import React from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Terms & Conditions | EFT",
  description:
    "Terms and Conditions for EFT - Read our terms of service and trading rules.",
};

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-32">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms & <span className="text-green-600">Conditions</span>
          </h1>
          <p className="text-gray-400 text-sm">Effective as of May 2, 2026</p>
        </div>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <p>
              These Terms & Conditions (&quot;Terms&quot;) govern your use of
              the services provided by Epic Future Traders (&quot;the
              Company&quot;). By accessing or using our website, platform, or
              services, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              1. Services
            </h2>
            <p>
              Epic Future Traders provides simulated trading evaluation programs
              designed to assess trading skills. All accounts operate in a
              simulated environment unless explicitly stated otherwise. The
              Company does not provide brokerage services, investment services,
              or financial advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              2. Eligibility
            </h2>
            <p>By using our services, you confirm that:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li>You are at least 18 years old</li>
              <li>You have the legal capacity to enter into agreements</li>
              <li>
                You are not located in a jurisdiction where such services are
                restricted or prohibited
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              3. Account Usage
            </h2>
            <p>
              Each user is permitted to create and operate their own account.
              Sharing account credentials or allowing third-party access is
              strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              4. Trading Rules
            </h2>
            <p>
              The use of automated trading systems, bots, arbitrage strategies,
              or any form of manipulation or exploitation of system errors is
              not allowed unless explicitly approved by the Company. Users must
              comply with all trading rules, including but not limited to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li>Maximum daily loss limits</li>
              <li>Maximum overall drawdown limits</li>
              <li>Profit targets</li>
              <li>Any additional rules specified in the selected program</li>
            </ul>
            <p className="mt-2">
              Violation of any trading rule will result in account termination
              without refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              5. Evaluation and Funding
            </h2>
            <p>
              Successful completion of an evaluation does not guarantee funding.
              The Company reserves the right to review trading activity before
              granting a funded account. All funded accounts are subject to
              ongoing compliance with trading rules and risk management
              policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              6. Payouts
            </h2>
            <p>
              Payouts are discretionary and subject to compliance with all Terms
              and trading rules. The Company reserves the right to delay,
              adjust, or deny payouts in cases of:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li>Rule violations</li>
              <li>Suspicious trading activity</li>
              <li>Breach of these Terms</li>
            </ul>
            <p className="mt-2">
              Users are responsible for providing accurate payment details. The
              Company is not liable for failed transactions due to incorrect
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              7. Fees and Payments
            </h2>
            <p>
              All fees paid for challenges or services are non-refundable. The
              Company reserves the right to change pricing at any time without
              prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              8. Prohibited Conduct
            </h2>
            <p>Users agree not to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li>Engage in fraudulent activity</li>
              <li>Use exploits, latency abuse, or platform manipulation</li>
              <li>Provide false or misleading information</li>
              <li>Attempt to reverse engineer or disrupt the platform</li>
            </ul>
            <p className="mt-2">
              Any violation may result in immediate account termination and
              suspension from future services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              9. Intellectual Property
            </h2>
            <p>
              All content, branding, and materials on the platform are the
              property of Epic Future Traders and may not be copied, reproduced,
              or distributed without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              10. Limitation of Liability
            </h2>
            <p>
              The Company shall not be held liable for any direct or indirect
              losses arising from the use of its services. Users acknowledge
              that trading involves risk and that simulated performance does not
              guarantee real-world results.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              11. Modifications
            </h2>
            <p>
              The Company reserves the right to modify these Terms at any time.
              Continued use of the services constitutes acceptance of the
              updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              12. Termination
            </h2>
            <p>
              The Company reserves the right to suspend or terminate any account
              at its sole discretion for violation of these Terms or any
              applicable rules.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3 text-green-600">
              13. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and interpreted in accordance
              with the laws of the jurisdiction in which the Company is
              registered.
            </p>
          </section>

          <section className="border-t border-zinc-800 pt-6">
            <p className="text-gray-300 leading-relaxed">
              For any questions or concerns, please contact us at{" "}
              <a
                href="mailto:support@EFT.com"
                className="text-green-600 hover:text-green-500 underline"
              >
                support@EFT.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
