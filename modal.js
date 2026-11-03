(() => {
	const images = document.querySelectorAll("img.enl");
	const videoTriggers = document.querySelectorAll(".yt-enl");
	if (!images.length && !videoTriggers.length) {
		return;
	}

	let modal = document.getElementById("myModal");
	let modalBg = document.getElementById("modal-bg");
	if (!modal) {
		modal = document.createElement("div");
		modal.id = "myModal";
		modal.className = "modal";
		const box = document.createElement("div");
		box.id = "modal-box";
		const close = document.createElement("div");
		close.className = "close";
		close.textContent = "×";
		const image = document.createElement("img");
		image.className = "modal-content";
		image.id = "img01";
		const caption = document.createElement("div");
		caption.id = "caption";
		box.append(close, image, caption);
		modal.append(box);
		document.body.append(modal);
	}

	if (!modalBg) {
		modalBg = document.createElement("div");
		modalBg.id = "modal-bg";
		modalBg.className = "modal-bg";
		document.body.append(modalBg);
	}

	const box = modal.querySelector("#modal-box");
	const close = modal.querySelector(".close");
	const modalImage = modal.querySelector("#img01");
	const caption = modal.querySelector("#caption");
	let modalVideo = modal.querySelector("#video01");
	if (!modalVideo) {
		modalVideo = document.createElement("iframe");
		modalVideo.id = "video01";
		modalVideo.className = "modal-content modal-video";
		modalVideo.title = "YouTube video player";
		modalVideo.allow = "autoplay; encrypted-media; picture-in-picture; web-share";
		modalVideo.referrerPolicy = "strict-origin-when-cross-origin";
		modalVideo.allowFullscreen = true;
		box.insertBefore(modalVideo, caption);
	}

	const stopVideo = () => {
		modalVideo.src = "about:blank";
		modalVideo.style.display = "none";
	};

	close.addEventListener("click", () => {
		modal.style.display = "none";
		modalBg.style.display = "none";
		stopVideo();
	});

	images.forEach((image) => {
		image.addEventListener("click", () => {
			stopVideo();
			modalImage.style.display = "block";
			modal.style.display = "block";
			modalBg.style.display = "block";
			modalImage.src = image.src;
			modalImage.alt = image.alt;
			const description = image.nextElementSibling;
			caption.innerHTML = description?.classList.contains("desc") ? description.innerHTML : "";
		});
	});

	videoTriggers.forEach((trigger) => {
		trigger.addEventListener("click", () => {
			const video = trigger.previousElementSibling;
			if (!(video instanceof HTMLIFrameElement)) {
				return;
			}
			const videoUrl = new URL(video.src, document.baseURI);
			videoUrl.searchParams.set("autoplay", "1");
			modalImage.style.display = "none";
			modalVideo.style.display = "block";
			modalVideo.src = videoUrl.href;
			modal.style.display = "block";
			modalBg.style.display = "block";
			const description = trigger.nextElementSibling;
			caption.innerHTML = description?.classList.contains("desc") ? description.innerHTML : "";
		});
	});
})();
