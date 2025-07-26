import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { mailerLiteService } from '@/services/api/mailerLiteService';
import { useSelector } from 'react-redux';

function Signup() {
const { isInitialized } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [newsletterSubscribe, setNewsletterSubscribe] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  
  useEffect(() => {
    if (isInitialized) {
      // Show signup UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showSignup("#authentication");
    }
  }, [isInitialized]);

  // Handle newsletter subscription after successful signup
  useEffect(() => {
    if (isAuthenticated && user && newsletterSubscribe && !subscribing) {
      handleNewsletterSubscription();
    }
  }, [isAuthenticated, user, newsletterSubscribe]);

  const handleNewsletterSubscription = async () => {
    if (!user?.emailAddress) return;

    setSubscribing(true);
    try {
      const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
      const companyName = user.accounts?.[0]?.companyName || '';
      
      await mailerLiteService.subscribeToNewsletter(
        user.emailAddress,
        fullName,
        companyName
      );
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setSubscribing(false);
      setNewsletterSubscribe(false); // Reset the flag
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-surface-800 rounded-lg shadow-md">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-700 text-white text-2xl 2xl:text-3xl font-bold">
            O
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-center text-lg xl:text-xl font-bold">
              Create Account
            </div>
            <div className="text-center text-sm text-gray-500">
              Please create an account to continue
            </div>
          </div>
        </div>
        <div id="authentication" />
        
        {/* Newsletter Subscription Option */}
        <div className="border-t border-gray-200 pt-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={newsletterSubscribe}
              onChange={(e) => setNewsletterSubscribe(e.target.checked)}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              disabled={subscribing}
            />
            <div className="text-sm">
              <div className="font-medium text-gray-900">
                Subscribe to our newsletter
              </div>
              <div className="text-gray-500">
                Get tips on operational excellence, assessment insights, and product updates.
              </div>
            </div>
          </label>
          {subscribing && (
            <div className="mt-2 text-sm text-primary-600 flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing to newsletter...
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;