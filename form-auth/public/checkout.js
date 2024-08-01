// This is your test secret API key.
const stripe = Stripe("pk_test_51PiYbnRthhVgjWx2k25mgWPF0RBPnJKQCGxjIQdjzJRda2uo1yA5PwlAFKAo6bBBA7oYIx6ZhNFChE1ueDc2WQW700BdH18DVK");

initialize();

// Create a Checkout Session
async function initialize() {
    const fetchClientSecret = async () => {
        const response = await fetch("/create-checkout-session", {
            method: "POST",
        });
        const { clientSecret } = await response.json();
        return clientSecret;
    };

    const checkout = await stripe.initEmbeddedCheckout({
        fetchClientSecret,
    });

    // Mount Checkout
    checkout.mount('#checkout');
}