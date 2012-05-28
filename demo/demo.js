//demo.js

require({
    paths: {
        hm: '../../hm'
    }
});

require(["hm!alpha","lib/jquery"],
function (alpha) {

	var html = "";

	$('.gamma').append(alpha.gammaName);
	$('.beta').append(alpha.betaName);
	$('.beta2').append(alpha.betaFunc());
	$('.epsilon').append(JSON.stringify(alpha.epsilon));
	$('.alpha').append(JSON.stringify(alpha));

});