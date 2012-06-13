//demo.js

require({
    paths: {
        hm: '../../../dist/hm'
    }
});

require(["hm!alpha","lib/jquery"],
function (alpha) {

	console.log(alpha);

	var html = "";

	$('.gamma').append(alpha.gammaName);
	$('.beta').append(alpha.betaName);
	$('.beta2').append(alpha.betaFunc());
	$('.epsilon').append(JSON.stringify(alpha.epsilon));
	$('.alpha').append(JSON.stringify(alpha));

	// Shared state testing
	alpha.shared.increment();
	alpha.shared.increment();
	$('.sharedState').append(alpha.shared.current());

	// Parameterization
	var safeDOM = alpha.SafeDOM;
	var instance = alpha.DOMMunger.make(safeDOM);
	instance.munge();

});