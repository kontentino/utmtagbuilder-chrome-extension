const urlAddress = document.getElementById('urlAddress');
const utmSource = document.getElementById('utmSource');
const utmMedium = document.getElementById('utmMedium');
const utmCampaign = document.getElementById('utmCampaign');
const generatedUrl = document.getElementById('url');
const copyUrl = document.getElementById('copyUrl');
let finalUrl;

urlAddress.addEventListener('keyup', (event) => {
	const value = event.target.value;

	update(value, utmSource.value, utmMedium.value, utmCampaign.value);
});

utmSource.addEventListener('keyup', (event) => {
	const value = event.target.value;

	update(urlAddress.value, value, utmMedium.value, utmCampaign.value);
});

utmMedium.addEventListener('keyup', (event) => {
	const value = event.target.value;

	update(urlAddress.value, utmSource.value, value, utmCampaign.value);
});

utmCampaign.addEventListener('keyup', (event) => {
	const value = event.target.value;

	update(urlAddress.value, utmSource.value, utmMedium.value, value);
});

copyUrl.addEventListener('click', (event) => {
	event.preventDefault();
	const el = document.createElement('textarea');
	el.value = finalUrl;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
});

function update(url, source, medium, campaign) {
	try {
		finalUrl = new URL(url.startsWith('http') ? url : `https://${url}`);

		if (source.length > 0) {
			finalUrl.searchParams.set('utm_source', source);
		} else {
			finalUrl.searchParams.delete('utm_source');
		}

		if (medium.length > 0) {
			finalUrl.searchParams.set('utm_medium', medium);
		} else {
			finalUrl.searchParams.delete('utm_medium');
		}

		if (campaign.length > 0) {
			finalUrl.searchParams.set('utm_campaign', campaign);
		} else {
			finalUrl.searchParams.delete('utm_campaign');
		}

		generatedUrl.innerHTML = finalUrl.toString();
	} catch (err) {
		finalUrl = '';
		generatedUrl.innerHTML = err.message;
	}
}
