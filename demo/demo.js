//demo.js

require({
    paths: {
        hm: '../../hm'
    }
});

require(["hm!alpha"],
function (alpha) {
	console.log('Module content loaded:', alpha);
	console.log(alpha.betaFunc());
	console.log(alpha.gammaName);
	console.log(alpha.epsilon.sigmaFunc())
});