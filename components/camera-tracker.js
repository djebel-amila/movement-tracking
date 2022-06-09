AFRAME.registerComponent('camera-tracker', {
        
        init: function () {
          this.tick = AFRAME.utils.throttleTick(this.camInfo, 500, this);
          this.gpsPos = {lat: '', lng: '', alt: ''};
          this.worldPos = new THREE.Vector3();
          this.onGpsPositionUpdate = this.onGpsPositionUpdate.bind(this);
          window.addEventListener('gps-position-update', this.onGpsPositionUpdate);
        },
        
        onGpsPositionUpdate: function (posEvt) {
          this.gpsPos = posEvt.detail;
        },
        
        camInfo: function () {
          // Cam world pos position
          this.el.object3D.getWorldPosition(this.worldPos);
          document.querySelector('#cam-pos-x').textContent = this.worldPos.x.toFixed(2);
          document.querySelector('#cam-pos-y').textContent = this.worldPos.y.toFixed(2);
          document.querySelector('#cam-pos-z').textContent = this.worldPos.z.toFixed(2);
          
          // Cam rotation
          // conversion radians to degrees
          const radians_to_degrees = rad => (rad * 180) / Math.PI;
          document.querySelector('#cam-pitch').textContent = (radians_to_degrees(this.el.object3D.rotation.x.toFixed(2))) * -1;
          document.querySelector('#cam-yaw').textContent = (radians_to_degrees(this.el.object3D.rotation.y.toFixed(2))) * -1;
          document.querySelector('#cam-roll').textContent = (radians_to_degrees(this.el.object3D.rotation.z.toFixed(2))) * -1;
          
          // WGS84 coordinates (ellipsoid)
          document.querySelector('#lat').textContent = this.gpsPos.latitude;
          document.querySelector('#lng').textContent = this.gpsPos.longitude;
          document.querySelector('#alt').textContent = this.gpsPos.altitude;
          
// WGS84 coordinates (cartesian)
// Transformation des coordonnées WGS84 ellipsoïdales (λ, φ, h) en coordonnées cartésiennes (x, y, z)
// conversion degrees to radians
const degrees_to_radians = deg => (deg * Math.PI) / 180.0;
// constante a : demi grand axe ellipsoïde (rayon de la terre à son acme)
const a = 6378.137000
// constante e : excentricité de l’ellipsoïde de la terre
const e = 0.08181919104281517

let φ = this.gpsPos.latitude;
let λ = this.gpsPos.longitude;
let h = (this.gpsPos.altitude)/1000;

// let φ = 46.5249234;
// let λ = 6.6337263;
// let h = 0.554;


// soit RN le rayon de courbure de la section normale à l’ellipsoïde. Nécessite a, e et φ (latitude)
// implémentation de RN(a,e,φ) = a : √((1 - e²) · sin² φ)
let RN = a / (Math.sqrt(1 - ((Math.pow(Math.sin(degrees_to_radians(φ)), 2)) * (Math.pow(e, 2)))));         




// coordonnée x (cartésienne) correspondant à λ (longitude)
// implémentation de x(λ,φ,h) = (RN + h) · cos φ · cos λ
let x = (RN + h) * Math.cos(degrees_to_radians(φ)) * Math.cos(degrees_to_radians(λ));
x *= 1000;
          
// coordonnée y (cartésienne) correspondant à φ (latitude)
// implémentation de y(λ,φ,h) = (RN + h) · cos φ · sin λ
let y = (RN + h) * Math.cos(degrees_to_radians(φ)) * Math.sin(degrees_to_radians(λ));
y *= 1000;

// coordonnée z (cartésienne) correspondant à h (altitude)
// implémentation de z(λ,φ,h) = [RN · (1 - e²) + h] · sin φ
let z = (RN * (1 - (Math.pow(e, 2))) + h) * Math.sin(degrees_to_radians(φ));
z *= 1000;

          document.querySelector('#lat-x').textContent = x; 
          document.querySelector('#lng-y').textContent = y; 
          document.querySelector('#alt-z').textContent = z; 



          

          // timestamp
          let today = new Date();
          const offset = today.getTimezoneOffset();
          today = new Date(today.getTime() - (offset * 60 * 1000));
          today = today.toISOString().split('T');
          document.querySelector('#date').textContent = today[0];
          document.querySelector('#hour').textContent = today[1].slice(0, -1);
        }

      });