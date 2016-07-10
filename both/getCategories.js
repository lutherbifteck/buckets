var startupCategories = {
	"goal": [
		"DS Branded Products",
		"Exclusive Distribution",
		"Marketing Play",
		"E-Commerce",
		"Selling Products to New Market",
		"Capability Building",
		"Adapted Technology",
		"Resale",
		"Integration into Offering",
		"In-kind Services",
		"Co-Development"
	], "lob": [
		"TELS",
		"Aptura",
		"DSSI",
		"Products",
		"Technology",
		"DSMI",
		"Marketing",
		"DSI"
	], "stage": [
		"Alpha",
		"Pilot",
		"Exploratory",
		"Commercialization",
		"Ready to be Built",
		"Negotiating",
		"Proof-of-concept",
		"Build-in-progress",
		"Building Model",
		"Paused"
	]
};

var universityCategories = {
	"partnership": [
		"Co-Develop",
		"Test Solutions",
		"In-Kind Services",
		"Exploratory",
		"Paused"
	],
	"goal": [
		"Recruitment",
		"DS Branded Products",
		"Exclusive Distribution",
		"Marketing Play",
		"E-Commerce",
		"Selling Products to New Market",
		"Capability Building",
		"Adapted Technology",
		"Resale",
		"Integration into Offering",
		"In-kind Services",
		"Co-Development"
	]
};

var providerCategories = {
    "partnership": [
		"Co-Develop",
		"Test Solutions",
		"In-Kind Services",
		"Exploratory",
		"Paused"
    ],
	"goal": [
		"DS Branded Products",
		"Exclusive Distribution",
		"Marketing Play",
		"E-Commerce",
		"Selling Products to New Market",
		"Capability Building",
		"Adapted Technology",
		"Resale",
		"Integration into Offering",
		"In-kind Services",
		"Co-Development"
	]
};

export default function(bucket){
	if (bucket == 'startup')
		return startupCategories
	else if (bucket == 'university')
		return universityCategories
	else if (bucket == 'provider')
		return providerCategories
	else
		return {};
};