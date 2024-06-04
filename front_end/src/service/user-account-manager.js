export async function enableNotifications() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
            await subscribeUserToPush(registration);
        }
    }
}

async function subscribeUserToPush(registration) {
    try {
        const response = await fetch('http://localhost:3001/push/key');
        if (!response.ok) {
            throw new Error('Failed to fetch VAPID key');
        }

        const keys = await response.json();
        const applicationServerKey = urlBase64ToUint8Array(keys.pubkey);
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        });


        const subResponse = await fetch('http://localhost:3001/push/sub', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!subResponse.ok) {
            throw new Error('Failed to subscribe for push notifications');
        }


    } catch (error) {
        console.error('Error during push subscription:', error);
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
