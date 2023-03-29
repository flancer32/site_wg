const template = `
<h1 class="t-page-header">Privacy Policy</h1>

<div>At Wiredgeese Devs, we are committed to protecting the privacy and security of our users. This Privacy Policy outlines the types of information we collect, how we use and share it, and the steps we take to ensure its protection.</div>

<h2>Information Collection and Use</h2>
<ul>
<li>We collect information that you voluntarily provide to us through our website or other means, including your name, email address, and any other personal information you choose to share.</li>
<li>We use the information we collect to provide and improve our services, communicate with you, and personalize your experience on our website.</li>
<li>We also use Google Analytics to collect and analyze information about how our website is used. This information is collected and processed by Google and may be used to deliver other services to us.</li>
</ul>

<h2>Data Sharing and Disclosure</h2>
<ul>
<li>We do not sell, rent, or share your personal information with third parties for their marketing purposes without your consent.</li>
<li>We may disclose your information in response to a legal request, such as a court order or subpoena, or in special cases, such as a physical threat to you or others.</li>
<li>By using our website, you consent to the processing of your data by Google in accordance with their Privacy Policy and Terms of Service. If you do not wish for your data to be collected and processed by Google Analytics, you may opt out by using the Google Analytics Opt-out Browser Add-on.</li>
</ul>

<h2>Data Security</h2>
<ul>
<li>We take appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure or destruction of your personal information.</li>
<li>We regularly review and update our security measures to ensure the protection of your information.</li>
</ul>

<h2>Updates to this Privacy Policy</h2>
<ul>
<li>We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the updated Privacy Policy on our website.</li>
</ul>


<h2>Contact Us</h2>
<ul>
<li>If you have any questions or concerns about this Privacy Policy, please contact us at "<a href="mailto:info@wiredgeese.com">info@wiredgeese.com</a>".</li>
</ul>

<ui-footer/>
`;

export default {
    template,
    data() {
        return {}
    },
    mounted() {
        document.title = 'WGD: Privacy Policy';
    },
}