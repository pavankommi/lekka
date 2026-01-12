export default function Privacy() {
  return (
    <div className="flex-1 bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-gray-700 text-sm">
          <section>
            <h2 className="font-semibold text-gray-900 mb-2">What We Collect</h2>
            <p>When you sign in with Google, we collect your email address. When you add expenses, we store the description, amount, and date you provide.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">How We Use Your Data</h2>
            <p>Your data is used solely to provide the expense tracking functionality. We display your expenses back to you and allow you to manage them.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Data Storage</h2>
            <p>Your data is stored securely in our database (PocketBase). We use essential cookies to keep you signed in.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Data Sharing</h2>
            <p>We do not share, sell, or transfer your data to third parties. Your expense data is private and only accessible to you.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Your Rights</h2>
            <p>You can delete your expenses at any time by clicking on them. To delete your account and all associated data, please contact us.</p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-900 mb-2">Contact</h2>
            <p>Questions about privacy? Open an issue on our <a href="https://github.com/pavankommi/lekka" target="_blank" rel="noopener noreferrer" className="text-gray-900 underline hover:text-gray-600">GitHub repository</a>.</p>
          </section>

          <p className="text-xs text-gray-500 pt-4">Last updated: January 2026</p>
        </div>
      </div>
    </div>
  );
}
