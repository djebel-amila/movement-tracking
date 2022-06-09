

// prototype: transformation de coordonnées ellipsoïdales (λ, φ, h) en coordonnées cartésiennes (x, y, z)
// constante a : demi grand axe ellipsoïde (rayon à son acme)
const a = 6378.137000
// constante e : excentricité de l’ellipsoïde de la terre
const e = 0.08181919104281517
// variable λ : longitude ellipsoïdale, parfois L
let λ = 6.648728210101417
// variable φ : latitude ellipsoïdale, parfois B
let φ = 46.78076769883481
// variable h : altitude en km
let h = 0.435

// fonction de conversion des degrés en radians
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
// ou alors const degrees_to_radians = deg => (deg * Math.PI) / 180.0;

// soit RN le rayon de courbure de la section normale à l’ellipsoïde. Nécessite a, e et φ (latitude)
// implémentation de RN(a,e,φ) = a : √((1 - e²) · sin² φ)
let RN = a / (Math.sqrt(1 - ((Math.pow(Math.sin(degrees_to_radians(φ)), 2)) * (Math.pow(e, 2)))));
console.log('RN: (en km) ' + RN);


// coordonnée x (cartésienne) correspondant à λ
// implémentation de x(λ,φ,h) = (RN + h) · cos φ · cos λ
let x = (RN + h) * Math.cos(degrees_to_radians(φ)) * Math.cos(degrees_to_radians(λ));
x *= 1000;
// coordonnée y (cartésienne) correspondant à φ
// implémentation de y(λ,φ,h) = (RN + h) · cos φ · sin λ
let y = (RN + h) * Math.cos(degrees_to_radians(φ)) * Math.sin(degrees_to_radians(λ));
y *= 1000;
// coordonnée z (cartésienne) correspondant à h
// implémentation de z(λ,φ,h) = [RN · (1 - e²) + h] · sin φ
let z = (RN * (1 - (Math.pow(e, 2))) + h) * Math.sin(degrees_to_radians(φ));
z *= 1000;
console.log(x, y, z);



      