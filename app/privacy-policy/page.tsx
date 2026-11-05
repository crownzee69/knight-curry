import Layout from '@/components/Layout';
import HomepageBackground from '@/components/HomepageBackground';

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <HomepageBackground />
      
      <article className="relative z-10 min-h-screen">
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 sm:mb-12 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-primary mb-4">
                Privacy Policy
              </h1>
              <p className="text-sm sm:text-base text-neutral-600">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div 
              className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border-2 border-primary/20 p-6 sm:p-8 lg:p-12 space-y-6 sm:space-y-8"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.98) 0%, rgba(250, 240, 230, 0.95) 100%)',
              }}
            >
              <div className="prose prose-sm sm:prose-base max-w-none">
                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">
                    Introduction
                  </h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Knights Curry Express (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">
                    Information We Collect
                  </h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    We may collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Order details and preferences</li>
                    <li>Payment information (processed securely through third-party providers)</li>
                    <li>Feedback and reviews</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your orders and our services</li>
                    <li>Improve our menu and customer experience</li>
                    <li>Send you promotional offers (with your consent)</li>
                    <li>Respond to your inquiries and provide customer support</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">
                    Information Sharing
                  </h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    We do not sell your personal information. We may share your information only with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                    <li>Service providers who assist us in operating our business (payment processors, delivery services)</li>
                    <li>When required by law or to protect our rights</li>
                    <li>With your explicit consent</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">
                    Data Security
                  </h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">
                    Your Rights
                  </h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                    <li>Access and update your personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>File a complaint with relevant data protection authorities</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">
                    Cookies and Tracking
                  </h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie preferences through your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">
                    Changes to This Policy
                  </h2>
                  <p className="text-neutral-700 leading-relaxed mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 sm:mb-4">
                    Contact Us
                  </h2>
                  <p className="text-neutral-700 leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="text-neutral-700 leading-relaxed mt-2">
                    <strong>Knights Curry Express</strong><br />
                    Email: info@knightscurryexpress.com<br />
                    Phone: (407) XXX-XXXX
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}

