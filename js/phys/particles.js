/**
 * Created by ashi on 2014-12-08.
 */

function Particle(position, mass, color, size, v) {
    this.position = position;
    this.mass = mass;
    this.color = color;
    this.size = size;
    this.v = (v) ? v : new Vector2(0, 0);

    this.isDoomed = false;
    this.timeToDoom = 0;
    this.lifeTime = null;
}

Particle.prototype.doom = function (time) {
    this.isDoomed = true;
    this.timeToDoom = (time) ? time : 0;
    this.lifeTime = this.timeToDoom;
};

Particle.prototype.tickDoom = function(delta) {
    this.timeToDoom -= delta;
    if (this.timeToDoom <= 0)
        this.timeToDoom = 0;
};

Particle.prototype.getColor = function() {
    return (this.lifeTime == null) ? this.color.toRGBA() : this.color.toRGBA(this.timeToDoom / this.lifeTime);
};

function ParticleEmitter(position, mass, velocity, spread, color, size, rate, lifeTime) {
    this.position = position;
    this.mass = mass;
    this.velocity = velocity;
    this.spread = spread;
    this.color = color;
    this.size = size || 4;
    this.rate = rate;
    this.lifeTime = lifeTime || null;
}

ParticleEmitter.prototype.emitParticle = function(out) {
    var angle = -this.spread / 2 + (Math.random() * this.spread);
    var particle;
    if (out) {
        out.position.setV(this.position);
        out.mass = this.mass;
        out.color = this.color;
        out.size = this.size;
        this.velocity.rotate(angle, out.v);
        particle = out;
    }
    else
        particle =  new Particle(this.position.clone(), this.mass, this.color, this.size, this.velocity.rotate(angle));
    if (this.lifeTime != null)
        particle.doom(this.lifeTime);
    return particle;
};