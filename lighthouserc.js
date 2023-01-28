module.exports = {
	ci: {
		assert: {
			preset: "lighthouse:no-pwa",
			assertions: {
				"tap-targets": "off",
				"non-composited-animations": "off",
				"button-name": "off",
				"color-contrast": "off",
				"cps-xss": "off",
				"errors-in-console": "off",
				"external-anchors-use-rel-noopener": "off",
				"heading-order": "off",
				"link-name": "off",
				"meta-description": "off",
				"uses-text-compression": "off",
			},
		},
	},
};
